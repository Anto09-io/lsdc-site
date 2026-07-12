import { NextResponse } from "next/server";

// Route d'inscription : relaie l'email (+ champs optionnels) vers l'API Beehiiv.
// La clé API n'est jamais exposée au client, elle reste côté serveur via
// les variables d'environnement BEEHIIV_API_KEY / BEEHIIV_PUB_ID.

type ListConfig = {
  automationEnv: string;
  automationFallbackEnv?: string;
  utm_source: string;
  utm_medium: string;
};

const LISTS: Record<string, ListConfig> = {
  waitinglist: {
    automationEnv: "BEEHIIV_AUTOMATION_WAITINGLIST_ID",
    utm_source: "waitinglist",
    utm_medium: "landing-page",
  },
  quiz: {
    // Tombe sur l'automation par défaut si l'ID dédié n'existe pas.
    automationEnv: "BEEHIIV_AUTOMATION_QUIZ_ID",
    automationFallbackEnv: "BEEHIIV_AUTOMATION_ID",
    utm_source: "quiz-profil-cycliste",
    utm_medium: "landing-page",
  },
  newsletter: {
    // Opt-in newsletter classique depuis /articles.
    automationEnv: "BEEHIIV_AUTOMATION_NEWSLETTER_ID",
    automationFallbackEnv: "BEEHIIV_AUTOMATION_ID",
    utm_source: "articles",
    utm_medium: "newsletter-optin",
  },
  default: {
    automationEnv: "BEEHIIV_AUTOMATION_ID",
    utm_source: "calculateur-gpx",
    utm_medium: "landing-page",
  },
};

// Liste blanche des custom fields acceptés depuis le quiz.
// ⚠️ Chaque clé doit exister comme Custom Field dans Beehiiv (Audience → Custom fields).
const ALLOWED_FIELDS = [
  "profil",
  "volume",
  "frustration",
  "wkg",
  "objectif",
  "contrainte",
  "niveau",
  "faiblesse",
  "profil_physio",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Anti-spam ──
// Rate limiting en mémoire par IP (fenêtre glissante). Par instance
// serverless — pas parfait en multi-instances, mais suffit à casser les
// soumissions en rafale d'un même bot.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  stamps.push(now);
  hits.set(ip, stamps);
  // Purge opportuniste pour borner la mémoire.
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (value.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return stamps.length > RATE_MAX;
}

export async function POST(request: Request) {
  let email: string;
  let list: string | undefined;
  let fields: Record<string, unknown> | undefined;
  let honeypot: string;

  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
    list = typeof body.list === "string" ? body.list : undefined;
    fields =
      body.fields && typeof body.fields === "object" ? body.fields : undefined;
    honeypot = String(body.website || "");
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot rempli = bot. On répond « succès » sans rien créer, pour ne
  // pas donner de signal au spammeur.
  if (honeypot) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessaie dans quelques minutes." },
      { status: 429 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 },
    );
  }

  const config = (list && LISTS[list]) || LISTS.default;

  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
  const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID;
  const BEEHIIV_AUTOMATION_ID =
    process.env[config.automationEnv] ||
    (config.automationFallbackEnv
      ? process.env[config.automationFallbackEnv]
      : undefined);

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
    console.error(
      "BEEHIIV_API_KEY ou BEEHIIV_PUB_ID manquant dans les variables d'environnement.",
    );
    return NextResponse.json(
      { error: "Configuration du serveur incomplète." },
      { status: 500 },
    );
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${BEEHIIV_API_KEY}`,
  };

  let custom_fields: { name: string; value: string }[] = [];
  if (fields) {
    custom_fields = ALLOWED_FIELDS.filter(
      (name) =>
        fields![name] !== undefined &&
        fields![name] !== null &&
        fields![name] !== "",
    ).map((name) => ({ name, value: String(fields![name]) }));
  }

  try {
    const subBody: Record<string, unknown> = {
      email,
      reactivate_existing: true,
      send_welcome_email: false,
      utm_source: config.utm_source,
      utm_medium: config.utm_medium,
    };
    if (custom_fields.length > 0) {
      subBody.custom_fields = custom_fields;
    }

    const subRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(subBody),
      },
    );

    const subData = await subRes.json().catch(() => ({}));

    if (!subRes.ok && subRes.status !== 201) {
      console.error("Beehiiv subscribe error:", subRes.status, JSON.stringify(subData));
      return NextResponse.json(
        { error: "Erreur création abonné", detail: subData },
        { status: 500 },
      );
    }

    // Déclenche l'automation associée, best-effort (ne bloque pas la réponse).
    if (BEEHIIV_AUTOMATION_ID) {
      const automationRes = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/automations/${BEEHIIV_AUTOMATION_ID}/journeys`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ email }),
        },
      );

      if (!automationRes.ok) {
        const automationData = await automationRes.json().catch(() => ({}));
        console.error(
          "Beehiiv automation error:",
          automationRes.status,
          JSON.stringify(automationData),
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Fetch error:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Erreur réseau", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}

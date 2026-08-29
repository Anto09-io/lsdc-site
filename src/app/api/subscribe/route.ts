import { NextResponse } from "next/server";

// Route d'inscription : relaie l'email (+ champs optionnels) vers l'API Lumail.
// La clé API n'est jamais exposée au client, elle reste côté serveur via
// la variable d'environnement LUMAIL_API_KEY.
//
// Chaque page de capture envoie un `list`. On le traduit en tag Lumail, et
// c'est l'ajout de ce tag qui déclenche la séquence de bienvenue correspondante
// (workflows « … — bienvenue »). Le tag reste posé sur l'abonné : il sert
// ensuite à savoir par quelle porte la personne est entrée.

const LUMAIL_ENDPOINT = "https://lumail.io/api/v2/tools/add_subscriber";

// list envoyé par le front → tag Lumail (= déclencheur de séquence)
const LIST_TAGS: Record<string, string> = {
  // /articles (ArticleGate) et le formulaire newsletter
  newsletter: "newsletter",
  // /quiz
  quiz: "quiz",
  // /outils/calculateur-glucides
  "calculateur-glucides": "calculateur-glucides",
  // landing JustPush — pas de séquence associée pour l'instant
  waitinglist: "justpush-waitinglist",
  // ToolGate et la landing calculateur GPX
  default: "calculateur-performance",
};

// Liste blanche des custom fields acceptés depuis le quiz.
// Lumail crée le champ à la volée s'il n'existe pas encore.
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
  let name: string | undefined;
  let fields: Record<string, unknown> | undefined;
  let honeypot: string;

  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
    list = typeof body.list === "string" ? body.list : undefined;
    name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : undefined;
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

  const LUMAIL_API_KEY = process.env.LUMAIL_API_KEY;
  if (!LUMAIL_API_KEY) {
    console.error("LUMAIL_API_KEY manquant dans les variables d'environnement.");
    return NextResponse.json(
      { error: "Configuration du serveur incomplète." },
      { status: 500 },
    );
  }

  const tag = (list && LIST_TAGS[list]) || LIST_TAGS.default;

  const customFields: Record<string, string> = {};
  if (fields) {
    for (const key of ALLOWED_FIELDS) {
      const value = fields[key];
      if (value !== undefined && value !== null && value !== "") {
        customFields[key] = String(value);
      }
    }
  }

  try {
    const res = await fetch(LUMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LUMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        ...(name ? { name } : {}),
        tags: [tag],
        ...(Object.keys(customFields).length > 0 ? { fields: customFields } : {}),
        // Ne jamais réabonner quelqu'un qui s'est désabonné : c'est lui qui
        // décide, et le réintégrer abîmerait la réputation du domaine.
        resubscribe: false,
        // C'est l'ajout du tag qui déclenche la séquence de bienvenue.
        triggerWorkflows: true,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Lumail subscribe error:", res.status, detail.slice(0, 500));
      return NextResponse.json(
        { error: "Erreur création abonné" },
        { status: 500 },
      );
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

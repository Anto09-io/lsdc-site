"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import HoneypotField from "@/components/HoneypotField";

// Landing page portée depuis legacy/acces-calculateur/index.html, réhabillée
// avec le design system dark + vert du site. Le gate email (Beehiiv, liste
// "default") ne débloque PAS l'outil sur place : l'accès arrive par email
// (lien vers /outils/calculateur-gpx/acces dans l'automation), pour forcer
// l'ouverture du mail.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEATURES = [
  "Créer tes stratégies de course",
  "Pulvériser tes chronos en bosse",
  "Pour utiliser ton capteur de puissance à 100%",
];

const SUBTOOLS = [
  {
    image: "/images/outils/calculateur-gpx-1.png",
    desc: "Ta stratégie de course depuis ton circuit GPX. Travail en kJ, cible de puissance, chrono.",
  },
  {
    image: "/images/outils/calculateur-gpx-2.png",
    desc: "L'outil pour voler des KOM Strava. Calcule tes meilleurs chronos possible à la seconde.",
  },
  {
    image: "/images/outils/calculateur-gpx-3.png",
    desc: "Analyse ton profil de coureur et maîtrise ta puissance. Découvre tous tes records de puissance et tes temps de soutien.",
  },
];

const BONUSES = [
  {
    title: "Le guide de l'entraînement Gran Fondo",
    desc: "Ta stratégie d'entraînement pour maximiser tes capacités physiologiques et arriver à 100% sur la ligne de départ.",
  },
  {
    title: "Accès illimité au logiciel",
    desc: "Tu peux charger autant de fichiers GPX que tu souhaites pour préparer n'importe quelle Gran Fondo — sans restriction.",
  },
  {
    title: "Un conseil d'entraînement par semaine jusqu'à l'EDT",
    desc: "Chaque dimanche je t'envoie un conseil clé à appliquer dans ta pratique pour tout casser cet été.",
  },
];

export default function CalculateurGpxLanding() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, list: "default", website }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          {sent ? (
            /* Thank-you : l'accès arrive par email, pas sur la page. */
            <div className="mx-auto max-w-lg text-center md:col-span-2" role="status">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/15 text-3xl">
                🎉
              </div>
              <h1 className="mt-6 font-display text-4xl italic sm:text-5xl">
                Bravo, ton accès est en route !
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-cream/70">
                Le lien du calculateur vient d'être envoyé dans{" "}
                <strong className="text-cream">ta boîte mail</strong>. Ouvre
                l'email et clique sur le lien pour accéder à l'outil.
              </p>
              <p className="mt-4 text-sm text-cream/50">
                Rien reçu d'ici 2-3 minutes ? Vérifie l'onglet Promotions ou
                tes spams — et ajoute-moi à tes contacts pour ne rien rater.
              </p>
            </div>
          ) : (
            <>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-green px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
                  LSDC Calculator
                </span>
                <h1 className="mt-6 font-display text-4xl italic leading-tight sm:text-5xl">
                  L'arme ultime pour :
                </h1>
                <ul className="mt-7 flex flex-col gap-3">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green text-xs font-bold text-ink">
                        ✓
                      </span>
                      <span className="text-sm font-medium text-cream">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 max-w-md text-cream/60">
                  Arrête de rouler à l'aveugle. Gagner des watts c'est dur,
                  alors commence par utiliser ce que tu as à 100%.
                </p>
              </div>

              <div>
                <div className="relative mb-10 h-[180px]">
                  <Image
                    src="/images/outils/calculateur-gpx-3.png"
                    alt="Aperçu de l'outil"
                    width={220}
                    height={160}
                    className="absolute left-0 top-4 w-[62%] -rotate-3 rounded-xl shadow-2xl"
                  />
                  <Image
                    src="/images/outils/calculateur-gpx-2.png"
                    alt="Aperçu de l'outil"
                    width={220}
                    height={160}
                    className="absolute left-1/2 top-2 w-[62%] -translate-x-1/2 rotate-1 rounded-xl shadow-2xl"
                  />
                  <Image
                    src="/images/outils/calculateur-gpx-1.png"
                    alt="Aperçu de l'outil"
                    width={220}
                    height={160}
                    className="absolute right-0 top-0 w-[62%] rotate-3 rounded-xl shadow-2xl"
                  />
                </div>

                <div className="rounded-2xl bg-surface p-7 ring-1 ring-white/10">
                  <p className="font-display text-xl italic text-cream">
                    Accède au calculateur gratuitement
                  </p>
                  <p className="mt-1 text-sm text-cream/60">
                    Entre ton email — tu reçois ton lien d'accès directement
                    dans ta boîte mail.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <HoneypotField value={website} onChange={setWebsite} />
                    <label htmlFor="gpx-gate-email" className="sr-only">
                      Ton adresse email
                    </label>
                    <input
                      id="gpx-gate-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      autoComplete="email"
                      className="min-h-[52px] flex-1 rounded-xl border-0 bg-ink px-4 text-base text-cream shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-green-light"
                    />
                    <Button type="submit" disabled={status === "loading"} className="min-h-[52px]">
                      {status === "loading" ? "…" : "Accès offert →"}
                    </Button>
                  </form>
                  {status === "error" && (
                    <p className="mt-3 text-sm text-red-400" role="alert">
                      Adresse invalide ou erreur réseau. Réessaie dans un instant.
                    </p>
                  )}
                  <p className="mt-4 text-xs text-cream/40">
                    Pas de spam. Désabonnement en 1 clic.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Aperçu / 3 sous-outils ── */}
      <section className="bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center">
            <span className="inline-block rounded-full bg-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              Aperçu de l'outil
            </span>
            <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">
              Un calculateur pensé pour les{" "}
              <span className="text-green">cyclistes sérieux</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/60">
              Pas d'estimation au doigt mouillé. Des chiffres issus de la
              physique, segment par segment.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {SUBTOOLS.map((t) => (
              <div key={t.image} className="flex flex-col items-center gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-sm leading-relaxed text-cream/70">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bonus ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center">
            <span className="inline-block rounded-full bg-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              Inclus avec le calculateur
            </span>
            <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">
              3 bonus offerts avec ton accès
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BONUSES.map((b, i) => (
              <div key={b.title} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
                <p className="text-xs font-bold uppercase tracking-wide text-cream/40">
                  Bonus #{i + 1}
                </p>
                <p className="mt-3 font-semibold text-cream">{b.title}</p>
                <p className="mt-2 text-sm text-cream/60">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

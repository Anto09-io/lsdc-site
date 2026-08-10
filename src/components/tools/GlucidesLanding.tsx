"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import HoneypotField from "@/components/HoneypotField";
import GlucidesCalculator from "@/components/tools/GlucidesCalculator";

// Page de capture du calculateur de glucides, sur le modèle de
// CalculateurGpxLanding. Différence assumée : le gate débloque l'outil SUR
// PLACE après un succès confirmé de /api/subscribe (liste
// "calculateur-glucides" → base Beehiiv), et le déverrouillage est mémorisé
// en localStorage — pas besoin d'automation email pour accéder à l'outil.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "lsdc_tool_unlocked_calculateur-glucides";

const FEATURES = [
  "Ta dose exacte en g/h, calculée sur TES watts et TON gabarit",
  "Ton facteur limitant : besoin, capacité, intestin ou durée",
  "Ton plan ravito concret : bidons, gels, barres, heure par heure",
];

const PREVIEWS = [
  {
    title: "Ta dose personnalisée",
    desc: "Pas un chiffre générique sorti d'un paquet de gels : la dose que ton corps peut réellement utiliser, avec sa fourchette, selon l'intensité et la durée de TA sortie.",
  },
  {
    title: "Ton facteur limitant",
    desc: "L'algorithme croise 4 plafonds — besoin, capacité d'utilisation, intestin, durée — et te montre lequel te bride. Inutile de pousser les autres tant que celui-ci ne bouge pas.",
  },
  {
    title: "Ton plan ravito",
    desc: "La dose traduite en bidons, gels et barres, heure par heure, avec le bon ratio glucose:fructose. Prêt à embarquer sur ta prochaine sortie.",
  },
];

const SCIENCE = [
  { k: "10+", label: "études scientifiques derrière l'algorithme" },
  { k: "78 g/h", label: "l'optimum mesuré par Smith 2013 (n=51)" },
  { k: "4", label: "plafonds physiologiques croisés pour ta dose" },
];

export default function GlucidesLanding() {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

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
        body: JSON.stringify({ email, list: "calculateur-glucides", website }),
      });
      if (res.ok) {
        window.localStorage.setItem(STORAGE_KEY, "1");
        setUnlocked(true);
        track("subscribe", { source: "calculateur-glucides" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // ── Outil débloqué : le calculateur remplace la landing ──
  if (unlocked) {
    return (
      <Container className="py-16">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-5xl italic">
            Ta dose optimale de <span className="text-green">glucides</span>{" "}
            pendant l'effort
          </h1>
          <p className="mt-4 text-lg text-cream/60">
            Un algorithme basé sur la littérature scientifique (Jeukendrup,
            Smith, King, Ijaz, Podlogar…) qui croise ta puissance, ton gabarit,
            la durée et l'intensité de ta sortie pour calculer ce que ton corps
            peut <em>réellement utiliser</em> — pas ce que le marketing te vend.
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-3xl">
          <GlucidesCalculator />
        </div>
      </Container>
    );
  }

  // ── Landing de capture ──
  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
              Calculateur Glucides
            </span>
            <h1 className="mt-6 font-display text-4xl italic leading-tight sm:text-5xl">
              Ta dose optimale de{" "}
              <span className="text-green">glucides</span> pendant l'effort
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
              90 g/h pour tout le monde, c'est du marketing. Ton corps a ses
              propres plafonds — l'algorithme les calcule à partir de la
              littérature scientifique, pas des étiquettes.
            </p>
          </div>

          <div>
            {/* Aperçu stylisé de l'outil (mock statique, non interactif) */}
            <div
              aria-hidden
              className="pointer-events-none mb-8 select-none rounded-2xl bg-surface p-6 ring-1 ring-white/10"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/50">
                Ta dose recommandée
              </p>
              <p className="mt-1 font-display text-6xl font-bold italic leading-none text-green">
                75<span className="text-2xl text-cream"> g/h</span>
              </p>
              <p className="mt-1 text-xs text-cream/50">fourchette 70–85 g/h</p>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  ["Ton besoin utilisable", "75", true],
                  ["Ta capacité d'utilisation", "92", false],
                  ["Le plafond intestinal", "90", false],
                ].map(([label, v, isMin]) => (
                  <div key={label as string} className="flex items-center gap-2 text-xs">
                    <span className={`w-40 flex-none ${isMin ? "font-bold text-green" : "text-cream/60"}`}>
                      {label}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink">
                      <span
                        className={`block h-full rounded-full ${isMin ? "bg-green" : "bg-cream/25"}`}
                        style={{ width: `${(Number(v) / 120) * 100}%` }}
                      />
                    </span>
                    <span className="w-12 text-right text-cream/70">{v} g/h</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-7 ring-1 ring-white/10">
              <p className="font-display text-xl italic text-cream">
                Accède au calculateur gratuitement
              </p>
              <p className="mt-1 text-sm text-cream/60">
                Entre ton email — l'outil se débloque immédiatement.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <HoneypotField value={website} onChange={setWebsite} />
                <label htmlFor="glucides-gate-email" className="sr-only">
                  Ton adresse email
                </label>
                <input
                  id="glucides-gate-email"
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
        </div>
      </section>

      {/* ── Aperçu : ce que l'outil calcule ── */}
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
              Pas de dose copiée sur les pros. Des chiffres issus de la
              physiologie, croisés sur ta sortie du jour.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PREVIEWS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
                <p className="font-display text-xl italic text-cream">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Caution scientifique ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center">
            <span className="inline-block rounded-full bg-green px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
              La science derrière l'outil
            </span>
            <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">
              Chaque règle de l'algorithme a une{" "}
              <span className="text-green">référence</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/60">
              Jeukendrup 2014, Smith 2013, King 2018-19, Ijaz 2025, Podlogar
              2022-25… Les sources sont citées dans l'outil, PubMed à l'appui —
              tu peux tout vérifier.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SCIENCE.map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface p-6 text-center ring-1 ring-white/10">
                <p className="font-display text-4xl font-bold italic text-green">{s.k}</p>
                <p className="mt-2 text-sm text-cream/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

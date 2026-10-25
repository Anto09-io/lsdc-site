import type { Metadata } from "next";
import Image from "next/image";
import KjOptin from "./KjOptin";

export const metadata: Metadata = {
  title: "Le Système kJ — ebook gratuit",
  description:
    "Comment atteindre TON meilleur niveau sur le vélo sans te prendre la tête. L'ebook gratuit Le Système kJ par Antonin Albouy.",
  alternates: { canonical: "/le-systeme-kj" },
};

// Page de capture de l'ebook gratuit « Le Système kJ ». Opt-in (liste
// "systeme-kj") puis thank-you : le PDF est livré par email (séquence Lumail).

const BENEFITS = [
  "Sache enfin quoi travailler en priorité, grâce à la pyramide des besoins d'entraînement de Stephen Seiler",
  "Fixe tes cibles sur TON profil de puissance record, pas sur une FTP extrapolée",
  "Connais ton temps de soutien à n'importe quelle puissance avec la loi de puissance",
  "Pilote ta charge en kilojoules : une seule unité simple pour progresser sans te cramer",
];

// Sommaire de l'ebook, phrases reprises telles quelles du PDF.
const SOMMAIRE = [
  {
    title: "Les bases",
    items: [
      "Le seul mécanisme responsable de la progression (le principe d'hormèse)",
      "La loi de la progression à vélo (accumuler le plus de travail possible sur 90 jours sans t'épuiser)",
      "La pyramide des besoins d'entraînement théorisée par Stephen Seiler",
      "La vraie utilité d'un capteur de puissance (99 % des cyclistes ont un capteur inutile)",
      "Le triangle des données d'entraînement (kJ, puissance, durée)",
    ],
  },
  {
    title: "Le système",
    items: [
      "Pilier 1 : les kJ",
      "Pilier 2 : la distribution des intensités optimale",
      "Pilier 3 : charge externe vs charge interne (le mécanisme de progression)",
      "Les résultats du système : étude de cas",
    ],
  },
  {
    title: "Bonus : les règles à intégrer",
    items: [
      "Les 7 règles à ne jamais oublier",
      "La checklist de départ à valider",
    ],
  },
];

export default function SystemeKjPage() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-8 text-center sm:pt-12">
        <span className="mb-4 inline-block rounded-full border border-violet/30 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-violet">
          Ebook gratuit
        </span>
        <h1 className="mx-auto max-w-3xl font-sans text-[clamp(1.75rem,4.6vw,3rem)] font-black leading-[1.1] tracking-[-0.02em]">
          Atteins <span className="text-violet">TON meilleur niveau</span> sur
          le vélo sans te prendre la tête
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-carbon/65 sm:text-lg">
          Le Système kJ : la méthode simple, appuyée sur la science, pour
          savoir quoi faire à chaque sortie et progresser saison après saison.
        </p>

        <div className="relative mx-auto mt-6 max-w-3xl">
          <Image
            src="/images/systeme-kj/mockup.webp"
            alt="Aperçu de l'ebook Le Système kJ sur tablette"
            width={2000}
            height={1250}
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
            // Fond gris du mockup fondu dans le blanc de la page
            style={{
              maskImage: "radial-gradient(closest-side, #000 75%, transparent)",
              WebkitMaskImage: "radial-gradient(closest-side, #000 75%, transparent)",
            }}
          />
        </div>

        <div className="mx-auto mt-2 grid max-w-4xl gap-10 text-left md:grid-cols-[1.15fr_1fr] md:items-center">
          <ul className="flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet text-xs font-bold text-paper">
                  ✓
                </span>
                <span className="text-[0.98rem] font-semibold leading-snug text-carbon">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          <KjOptin />
        </div>
      </section>

      <section className="border-t border-carbon/10 bg-surface/50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <span className="mb-3.5 inline-block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-violet">
              Ce qu'il y a dedans
            </span>
            <h2 className="font-sans text-[clamp(1.6rem,4vw,2.4rem)] font-black leading-[1.1] tracking-[-0.02em]">
              Le sommaire
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {SOMMAIRE.map((section, i) => (
              <div key={section.title} className="rounded-2xl bg-paper p-6 ring-1 ring-carbon/10 sm:p-7">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-violet">
                  Section {i + 1}
                </p>
                <h3 className="mt-1 font-sans text-xl font-extrabold tracking-[-0.01em] text-carbon">
                  {section.title}
                </h3>
                <ol className="mt-4 flex flex-col gap-3">
                  {section.items.map((item, j) => (
                    <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-snug text-carbon/80">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet/10 text-xs font-bold text-violet">
                        {j + 1}
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#optin"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-carbon px-7 text-sm font-semibold text-paper transition-colors hover:bg-violet"
            >
              Je veux l'ebook gratuit →
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-carbon/10 py-6 text-center text-xs text-carbon/40">
        © {new Date().getFullYear()} La Science du Cyclisme — Antonin Albouy
      </footer>
    </main>
  );
}

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
// "systeme-kj" → tag Lumail) puis téléchargement du PDF sur place.

const BENEFITS = [
  "Sache enfin quoi travailler en priorité, grâce à la pyramide des besoins d'entraînement de Stephen Seiler",
  "Fixe tes cibles sur TON profil de puissance record, pas sur une FTP extrapolée",
  "Connais ton temps de soutien à n'importe quelle puissance avec la loi de puissance",
  "Pilote ta charge en kilojoules : une seule unité simple pour progresser sans te cramer",
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

      <footer className="border-t border-carbon/10 py-6 text-center text-xs text-carbon/40">
        © {new Date().getFullYear()} La Science du Cyclisme — Antonin Albouy
      </footer>
    </main>
  );
}

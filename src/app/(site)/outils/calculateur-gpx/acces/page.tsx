import type { Metadata } from "next";
import Container from "@/components/Container";
import GpxCalculator from "@/components/tools/GpxCalculator";

// Page d'accès direct au calculateur, réservée au lien envoyé par email
// (automation Beehiiv « Tunnel Calculateur GF offert »). Pas de gate ici,
// mais noindex pour qu'elle ne soit pas trouvable hors du mail.
export const metadata: Metadata = {
  title: "Ton accès au Calculateur GPX",
  robots: { index: false, follow: false },
};

export default function AccesCalculateurPage() {
  return (
    <Container className="py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl italic sm:text-5xl">
          Ton Calculateur GPX
        </h1>
        <p className="mt-4 text-lg text-cream/60">
          Charge ton parcours GPX et calcule ta stratégie de course : travail
          mécanique, dépense énergétique et chrono, segment par segment.
        </p>
        <p className="mt-2 text-sm text-cream/40">
          Garde ce lien précieusement — c'est ton accès permanent à l'outil.
        </p>
      </header>

      <div className="mt-12">
        <GpxCalculator />
      </div>
    </Container>
  );
}

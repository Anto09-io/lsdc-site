import type { Metadata } from "next";
import Container from "@/components/Container";
import GlucidesCalculator from "@/components/tools/GlucidesCalculator";

// Page d'accès au calculateur de glucides, envoyée par email (automation
// Beehiiv) après l'opt-in sur /outils/calculateur-glucides. Volontairement
// non indexée et non liée depuis le site : c'est l'email qui donne l'accès.

export const metadata: Metadata = {
  title: "Calculateur de glucides — accès",
  description:
    "Calcule ta dose optimale de glucides pendant l'effort (g/h) selon ta puissance, ton gabarit, la durée et l'intensité de ta sortie.",
  robots: { index: false, follow: false },
};

export default function GlucidesAccesPage() {
  return (
    <Container className="py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-5xl italic">
          Ta dose optimale de <span className="text-violet">glucides</span>{" "}
          pendant l'effort
        </h1>
        <p className="mt-4 text-lg text-carbon/60">
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

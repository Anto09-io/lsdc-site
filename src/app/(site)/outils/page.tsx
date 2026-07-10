import type { Metadata } from "next";
import CalculateurGpxLanding from "@/components/tools/CalculateurGpxLanding";
import { getTool } from "@/lib/tools";

const tool = getTool("calculateur-gpx")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: "/outils" },
};

// Un seul outil pour l'instant : /outils affiche directement sa landing page
// de capture. Quand d'autres outils arriveront, cette page redeviendra une
// grille pointant vers /outils/[outil].
export default function OutilsPage() {
  return <CalculateurGpxLanding />;
}

// Registre des outils gratuits de /outils. Un seul outil pour l'instant ;
// la grille et les routes dynamiques sont prêtes à en accueillir d'autres.

export type ToolConfig = {
  slug: string;
  title: string;
  description: string;
};

export const TOOLS: ToolConfig[] = [
  {
    slug: "calculateur-gpx",
    title: "Calculateur GPX",
    description:
      "Charge ton parcours GPX et calcule le travail mécanique, la dépense énergétique et le temps estimé, segment par segment (montée, plat, descente).",
  },
];

export function getTool(slug: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

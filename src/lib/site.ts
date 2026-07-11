// Configuration centrale du site (branding, SEO, réseaux).

export const siteConfig = {
  name: "La Science du Cyclisme",
  shortName: "LSDC",
  // URL absolue de production. Surchargée par NEXT_PUBLIC_SITE_URL en déploiement.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://lascienceducyclisme.com",
  tagline: "Entraînement cycliste basé sur la science, méthode watt/kg",
  description:
    "Le blog de La Science du Cyclisme : entraînement cycliste basé sur la science. " +
    "Vulgarisation, méthode watt/kg, FTP, physiologie et nutrition pour cyclistes amateurs. Par Antonin Albouy.",
  author: {
    name: "Antonin Albouy",
    signature: "Par Antonin Albouy",
    bio: "Créateur de La Science du Cyclisme. Depuis plus de 5 ans, je démocratise l'approche scientifique de l'entraînement sur YouTube et par newsletter pour aider les cyclistes amateurs à atteindre leur meilleur niveau grâce à la méthode watt/kg.",
  },
  social: {
    youtube: "https://www.youtube.com/@lascienceducyclisme9032",
    instagram: "https://www.instagram.com/lascienceducyclisme_/",
  },
  // Liens offres / ressources. À ajuster si les URLs changent.
  links: {
    // Page de vente de la méthode watt/kg, sur le site.
    methode: "/systeme-watt-kg",
  },
  // Catégories éditoriales du blog (ordre = ordre d'affichage des filtres).
  categories: ["Entraînement", "Physiologie", "Nutrition", "Matériel"] as const,
} as const;

export type Category = (typeof siteConfig.categories)[number];

/** Construit une URL absolue à partir d'un chemin relatif. */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}

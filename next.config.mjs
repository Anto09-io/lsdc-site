/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Le link-in-bio historique vit en statique dans public/linkinbio/.
  async rewrites() {
    return [{ source: "/linkinbio", destination: "/linkinbio/index.html" }];
  },
  // Anciennes URLs du site statique encore présentes dans des bios/descriptions.
  async redirects() {
    return [
      { source: "/acces-calculateur", destination: "/outils", permanent: true },
    ];
  },
  images: {
    // Autorise les images distantes si besoin (ex : miniatures YouTube).
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    // Autorise l'optimisation des SVG locaux (placeholders de couverture).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

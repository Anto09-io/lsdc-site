/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pages statiques héritées servies depuis public/ : link-in-bio et
  // calculateur complet 3 volets (GPX / perf segment / puissance lim).
  async rewrites() {
    return [
      { source: "/linkinbio", destination: "/linkinbio/index.html" },
      { source: "/calculateur", destination: "/calculateur/calculateurlsdc.html" },
    ];
  },
  async redirects() {
    return [
      // Ancienne URL du site statique encore présente dans des bios/descriptions.
      { source: "/acces-calculateur", destination: "/outils", permanent: true },
      // L'accès envoyé par email pointe désormais sur le calculateur complet.
      {
        source: "/outils/calculateur-gpx/acces",
        destination: "/calculateur",
        permanent: false,
      },
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

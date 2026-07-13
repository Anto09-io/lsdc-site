// CSP : couvre Next (inline runtime), le calculateur statique (scripts
// inline + Chart.js cdnjs + Google Fonts), les embeds YouTube, les vidéos
// Mux et les avatars Senja (témoignages).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
  "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
  "img-src 'self' data: https:",
  "media-src 'self' https://stream.mux.com",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "connect-src 'self' https://stream.mux.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
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
      // Ancien chemin du calculateur (encore présent dans un lien d'email
      // Beehiiv et potentiellement d'anciens contenus).
      {
        source: "/lsdc-calculator/:path*",
        destination: "/calculateur/:path*",
        permanent: true,
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

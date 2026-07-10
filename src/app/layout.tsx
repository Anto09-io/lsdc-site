import type { Metadata } from "next";
import { Inter, Barlow_Condensed, Caveat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import CursorGlow from "@/components/CursorGlow";

// ── Typographie (next/font, self-hosted, zéro requête externe au runtime) ──
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"], // l'italique est la signature des gros titres
  variable: "--font-barlow",
  display: "swap",
});

// Police manuscrite pour les petites annotations griffonnées (ex. flèche CTA).
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Blog`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name }],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: siteConfig.name }],
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Blog`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Blog`,
    description: siteConfig.description,
  },
};

// Layout racine minimal (html/body/polices/metadata uniquement). Le chrome
// du site (Header/Footer) vit dans (site)/layout.tsx : le groupe de routes
// /quiz n'en hérite pas, pour une expérience plein écran sans menu.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${barlow.variable} ${caveat.variable}`}>
      <body className="min-h-screen">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}

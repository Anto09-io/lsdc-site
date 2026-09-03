import Link from "next/link";
import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import OfferBanner from "./OfferBanner";

// Police mono pour les petites étiquettes (style de la landing JustPush).
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Layout dédié à la page de vente : on sort du site. Pas de Header ni de
// Footer, pas de menu — seul le logo (retour accueil) et le bouton flottant
// « Rejoindre » (défini dans page.tsx) restent comme portes de sortie.
export default function MethodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jetbrains.variable} relative z-10 min-h-screen bg-paper text-carbon`}>
      <OfferBanner />

      {/* En-tête minimal : logo centré, retour accueil */}
      <header className="flex justify-center px-4 pb-2 pt-6">
        <Link
          href="/"
          aria-label="La Science du Cyclisme — accueil"
          className="opacity-90 transition-opacity hover:opacity-100"
        >
          <Image
            src="/lsdc-logo-noir.svg"
            alt="La Science du Cyclisme"
            width={150}
            height={42}
            priority
            className="h-7 w-auto"
          />
        </Link>
      </header>

      {children}
    </div>
  );
}

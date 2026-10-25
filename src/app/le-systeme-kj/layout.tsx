import Link from "next/link";
import Image from "next/image";

// Layout de la page de capture « Le Système kJ » : on sort du site, pas de
// Header ni de Footer — seul le logo (retour accueil) reste comme sortie.
export default function SystemeKjLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-screen bg-paper text-carbon">
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

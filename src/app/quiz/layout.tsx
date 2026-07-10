import Link from "next/link";
import Image from "next/image";

// Layout dédié au quiz : pas de Header/Footer du site, pas de menu — l'objectif
// est de garder l'utilisateur focus sur le parcours, sans porte de sortie
// autre que le logo (comme legacy/profil-cycliste).
export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-screen">
      <div className="flex justify-center pt-8">
        <Link href="/" aria-label="La Science du Cyclisme — accueil" className="opacity-80 transition-opacity hover:opacity-100">
          <Image
            src="/lsdc-logo-blanc.svg"
            alt="La Science du Cyclisme"
            width={150}
            height={42}
            priority
            className="h-6 w-auto"
          />
        </Link>
      </div>
      {children}
    </div>
  );
}

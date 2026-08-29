import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/articles", label: "Articles" },
  { href: "/outils", label: "Outils" },
  { href: "/systeme-watt-kg", label: "Système Watt/Kg" },
  { href: "/temoignages", label: "Témoignages" },
];

/**
 * Header : statique sur mobile (il défile avec la page pour libérer l'écran),
 * sticky à partir de md avec fond ink translucide + blur pour que le contenu
 * ne passe jamais « à travers » le logo au scroll.
 *
 * ⚠️ Hauteurs totales — mobile ≈146px, md ≈174px. La section hero de
 * l'accueil compense ces valeurs (-mt/pt) pour faire remonter son halo
 * derrière le header : les garder synchronisées si on change les dimensions.
 */
export default function Header() {
  return (
    <header className="z-40 bg-paper/75 backdrop-blur-md md:sticky md:top-0">
      <div className="mx-auto w-full max-w-6xl px-5 py-4 md:px-6 md:py-5">
        {/* Logo, centré */}
        <Link
          href="/"
          className="flex justify-center"
          aria-label="La Science du Cyclisme — accueil"
        >
          <Image
            src="/lsdc-logo-noir.svg"
            alt="La Science du Cyclisme"
            width={300}
            height={84}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        {/* Navigation en pilule — sur 2 lignes centrées en mobile, une
            seule ligne à partir de md (rien ne déborde de l'écran) */}
        <nav aria-label="Navigation principale" className="mt-3 md:mt-4">
          <div className="flex justify-center">
            <ul className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-3xl border border-carbon/15 bg-surface/60 p-1 text-sm font-medium md:w-max md:flex-nowrap md:rounded-full md:p-1.5 md:text-base">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block whitespace-nowrap rounded-full px-3.5 py-2.5 text-carbon transition-colors hover:bg-carbon/5 hover:text-violet md:px-5 md:py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

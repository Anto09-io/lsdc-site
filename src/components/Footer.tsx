import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-ink text-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-6">
        <Image
          src="/lsdc-logo-blanc.svg"
          alt="La Science du Cyclisme"
          width={150}
          height={42}
          className="h-9 w-auto"
        />

        <nav aria-label="Liens du pied de page">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <li>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-white"
              >
                YouTube
              </a>
            </li>
            <li>
              <Link
                href="/articles#newsletter"
                className="text-cream/70 transition-colors hover:text-white"
              >
                Newsletter
              </Link>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/40">
        © {year} {siteConfig.name}
      </div>
    </footer>
  );
}

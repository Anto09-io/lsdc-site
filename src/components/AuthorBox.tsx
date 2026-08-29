import Image from "next/image";
import { siteConfig } from "@/lib/site";

/** Bloc auteur (Antonin) affiché en bas des articles. */
export default function AuthorBox() {
  return (
    <aside className="flex flex-col items-center gap-5 rounded-2xl border border-carbon/10 bg-surface p-6 sm:flex-row sm:items-start">
      <Image
        src="/antonin.jpg"
        alt={siteConfig.author.name}
        width={80}
        height={80}
        className="h-20 w-20 flex-shrink-0 rounded-full object-cover object-top"
      />
      <div className="text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet">
          {siteConfig.author.signature}
        </p>
        <p className="mt-1 font-display text-2xl italic text-carbon">
          {siteConfig.author.name}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-carbon/60">
          {siteConfig.author.bio}
        </p>
      </div>
    </aside>
  );
}

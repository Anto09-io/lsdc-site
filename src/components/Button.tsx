import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:opacity-60 motion-reduce:transition-none motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  // Texte sombre sur vert clair : meilleur contraste qu'un texte blanc.
  primary:
    "bg-green text-ink shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:bg-green-light hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(34,197,94,0.45)]",
  outline:
    "border border-cream/25 text-cream hover:border-green/60 hover:bg-green/5 hover:text-green hover:-translate-y-0.5 hover:scale-[1.02]",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  /** Flèche qui glisse vers la droite au survol — pour les CTA de navigation. */
  withArrow?: boolean;
  /** Halo vert qui pulse en continu — à réserver au CTA principal de la page. */
  pulse?: boolean;
}

/* Reflet qui balaie le bouton au survol (invisible au repos). */
function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[250%] skew-x-[-20deg] bg-white/30 blur-sm transition-transform duration-700 group-hover:translate-x-[400%] motion-reduce:hidden"
    />
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
    >
      <path
        d="M4 12h16m0 0l-6-6m6 6l-6 6"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buttonClasses({
  variant,
  pulse,
  className,
}: {
  variant: Variant;
  pulse?: boolean;
  className?: string;
}) {
  return cn(
    base,
    variants[variant],
    pulse && "animate-pulse-glow motion-reduce:animate-none",
    className,
  );
}

/** Bouton lien (interne ou externe). */
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  withArrow,
  pulse,
}: CommonProps & { href: string; external?: boolean }) {
  const cls = buttonClasses({ variant, pulse, className });
  const content = (
    <>
      <Shine />
      {children}
      {withArrow && <Arrow />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Bouton natif (formulaires). */
export function Button({
  variant = "primary",
  className,
  children,
  withArrow,
  pulse,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={buttonClasses({ variant, pulse, className })}
      {...props}
    >
      <Shine />
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

import { cn } from "@/lib/cn";

/**
 * Carte générique : coins arrondis + effet hover subtil (translation/ombre),
 * dans l'esprit des cartes "offres" du link-in-bio LSDC.
 */
export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-white/10 bg-surface shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}

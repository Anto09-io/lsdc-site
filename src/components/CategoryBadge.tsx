import { cn } from "@/lib/cn";

/** Pastille catégorie (green discret). */
export default function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet",
        className,
      )}
    >
      {category}
    </span>
  );
}

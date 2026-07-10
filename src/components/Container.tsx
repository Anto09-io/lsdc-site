import { cn } from "@/lib/cn";

/** Conteneur centré avec marges responsive. */
export default function Container({
  children,
  className,
  size = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "prose";
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full px-5 sm:px-6",
        size === "prose" ? "max-w-3xl" : "max-w-5xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

/** Liste d'accordéons simples (une seule ouverture à la fois). */
export default function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.title} className="rounded-2xl bg-surface ring-1 ring-carbon/10">
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-carbon sm:text-base">
                {item.title}
              </span>
              <span
                className={cn(
                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet text-sm font-bold text-paper transition-transform",
                  open && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            {open && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-carbon/60">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

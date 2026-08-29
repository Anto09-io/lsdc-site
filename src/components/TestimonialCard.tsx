"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { cn } from "@/lib/cn";

export type Testimonial = {
  type: string;
  name: string;
  tagline: string | null;
  rating: number | null;
  date: string | null;
  text: string | null;
  avatar: string | null;
  videoUrl: string | null;
  posterUrl: string | null;
};

const monthYearFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
});

/* Au-delà de cette longueur, le témoignage est replié derrière "Lire la suite"
   pour garder une grille équilibrée. */
const CLAMP_LENGTH = 460;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden
          className={cn("h-4 w-4", i < rating ? "fill-violet" : "fill-white/15")}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Identity({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="flex items-center gap-3">
      {testimonial.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatars hébergés chez Senja, hors config next/image
        <img
          src={testimonial.avatar}
          alt=""
          loading="lazy"
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-carbon/10"
        />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet/10 text-sm font-semibold text-violet ring-1 ring-violet/20">
          {initials}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-carbon">{testimonial.name}</p>
        <p className="text-xs text-carbon/50">
          {testimonial.tagline ??
            (testimonial.date
              ? monthYearFormatter.format(new Date(testimonial.date))
              : "")}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [expanded, setExpanded] = useState(false);
  const text = testimonial.text ?? "";
  const isLong = text.length > CLAMP_LENGTH;
  const shown =
    isLong && !expanded ? `${text.slice(0, CLAMP_LENGTH).trimEnd()}…` : text;

  return (
    <Card className="mb-6 break-inside-avoid p-6">
      {testimonial.rating != null && <Stars rating={testimonial.rating} />}

      {testimonial.videoUrl ? (
        <video
          controls
          preload="none"
          poster={testimonial.posterUrl ?? undefined}
          src={testimonial.videoUrl}
          className="mt-4 aspect-video w-full rounded-xl bg-black object-cover"
        />
      ) : (
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-carbon/80">
          {shown}
        </p>
      )}

      {isLong && !testimonial.videoUrl && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 text-sm font-semibold text-violet hover:underline"
        >
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      )}

      <div className="mt-5">
        <Identity testimonial={testimonial} />
      </div>
    </Card>
  );
}

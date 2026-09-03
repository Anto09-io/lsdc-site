"use client";

import { useEffect, useState } from "react";

// Date de fin de l'offre (ISO, heure de Paris). null = pas de compte à rebours,
// le bandeau affiche seulement l'offre. Ex : "2026-09-15T23:59:59+02:00".
const OFFER_END: string | null = null;

function pad(n: number) {
  return String(Math.max(0, n));
}

function useCountdown(end: string | null) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!end) return;
    const target = new Date(end).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hrs: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

/**
 * Bandeau rouge en haut de la page de vente : point qui pulse + texte en
 * capitales. Avec OFFER_END renseignée, affiche « L'OFFRE SE TERMINE DANS :
 * 3 JOURS 18 H 6 MIN 4 S » ; sinon, rappelle simplement l'offre.
 */
export default function OfferBanner() {
  const cd = useCountdown(OFFER_END);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#7f0f14] via-[#c8161c] to-[#7f0f14] px-3 py-2.5 text-center sm:px-4 sm:py-3 text-paper shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,60,70,0.45),transparent_70%)]" />
      <p className="relative inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.72rem] font-extrabold uppercase tracking-[0.03em] sm:gap-x-3 sm:text-[0.95rem]">
        <span className="relative flex h-3 w-3 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d6d] opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#ff4d6d]" />
        </span>
        {cd ? (
          <>
            <span>L&apos;offre se termine dans :</span>
            <span className="tabular-nums">
              {pad(cd.days)} {cd.days > 1 ? "jours" : "jour"} {pad(cd.hrs)} h {pad(cd.mins)} min{" "}
              {pad(cd.secs)} s
            </span>
          </>
        ) : (
          <span>
            Offre spéciale : <span className="hidden sm:inline">la Méthode Watt/kg à </span>29 €{" "}
            <span className="font-semibold opacity-80">
              au lieu de <span className="line-through">49 €</span>
            </span>
          </span>
        )}
      </p>
    </div>
  );
}

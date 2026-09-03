"use client";

import { useEffect, useState } from "react";

/**
 * Barre d'achat collante en bas de l'écran, mobile uniquement (< sm).
 * Visible dès que le CTA du hero (#hero-cta) est sorti de l'écran, masquée
 * quand le bon de commande (#offre-card) est visible pour ne pas doubler le
 * bouton. Calcul direct sur scroll (deux getBoundingClientRect, React
 * regroupe les setState) : prévisible quel que soit le moment de l'hydratation.
 */
export default function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const offer = document.getElementById("offre-card");
    if (!hero || !offer) return;

    const update = () => {
      const h = hero.getBoundingClientRect();
      const o = offer.getBoundingClientRect();
      // Passé le CTA du hero (sorti par le haut) …
      setPastHero(h.bottom < 0);
      // … et bon de commande pas déjà à l'écran (au moins 15 % visible).
      const visible = Math.min(o.bottom, innerHeight) - Math.max(o.top, 0);
      setOfferVisible(visible > Math.min(o.height, innerHeight) * 0.15);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);

  const show = pastHero && !offerVisible;

  return (
    <div
      aria-hidden={!show}
      className={
        "fixed inset-x-0 bottom-0 z-50 border-t border-carbon/10 bg-paper/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden " +
        (show ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 leading-tight">
          <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-violet">
            Offre spéciale
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black tracking-tight text-carbon">29 €</span>
            <span className="text-sm font-bold text-carbon/40 line-through">49 €</span>
          </div>
        </div>
        <a
          href="#offre"
          tabIndex={show ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-carbon px-4 py-3.5 text-[0.95rem] font-extrabold text-paper shadow-[0_8px_24px_rgba(11,11,12,0.3)] active:scale-[0.98]"
        >
          Obtenir la méthode
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
            <path d="M12 4l-1.4 1.4 5.6 5.6H3v2h13.2l-5.6 5.6L12 20l8-8-8-8Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

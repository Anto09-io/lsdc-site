"use client";

import { useEffect, useRef } from "react";

/**
 * Lueur violette qui suit le curseur (effet "lampe torche"), en overlay léger
 * sur le fond clair du site. Position mise à jour via ref/transform (pas de
 * re-render React) pour rester fluide. Masqué sur tactile (pas de souris).
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let visible = false;

    function onMove(e: MouseEvent) {
      if (!visible) {
        ref.current?.style.setProperty("opacity", "1");
        visible = true;
      }
      const { clientX: x, clientY: y } = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
        raf = 0;
      });
    }

    function onLeave() {
      ref.current?.style.setProperty("opacity", "0");
      visible = false;
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
    >
      <div
        ref={ref}
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(159,1,255,0.18), rgba(159,1,255,0.06) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}

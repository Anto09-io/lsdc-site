"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import HoneypotField from "@/components/HoneypotField";

/**
 * Gate newsletter sur le corps des articles : le contenu reste dans le DOM
 * (SEO intact) et défilable, mais flouté et non sélectionnable tant que le
 * lecteur ne s'est pas inscrit. Le pop-up reste visible pendant le scroll
 * (sticky). Le déblocage est mémorisé en local : une inscription débloque
 * tous les articles du site sur ce navigateur.
 */
const STORAGE_KEY = "lsdc_newsletter_unlocked";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "error" | "success";

export default function ArticleGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, list: "newsletter", website }),
      });
      if (res.ok) {
        window.localStorage.setItem(STORAGE_KEY, "1");
        setStatus("success");
        // Petit délai pour laisser lire la confirmation avant de défloutter.
        window.setTimeout(() => setUnlocked(true), 900);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      {/* Contenu flouté : lisible par les moteurs, pas par le lecteur. */}
      <div aria-hidden className="pointer-events-none select-none blur-md">
        {children}
      </div>

      {/* Pop-up sticky par-dessus le contenu, suit le scroll. */}
      <div className="absolute inset-0">
        <div className="sticky top-24 px-2 pt-8 sm:top-32">
          <div className="mx-auto max-w-md rounded-3xl bg-surface p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-green/30 sm:p-9">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-2xl">
              🔒
            </div>
            <h2 className="mt-4 font-display text-2xl italic text-cream sm:text-3xl">
              Abonne-toi à la newsletter pour débloquer l'article
            </h2>
            <p className="mt-3 text-sm text-cream/60">
              Chaque semaine, un conseil d'entraînement basé sur la science
              pour rouler plus vite. Déjà suivi par 8 500 cyclistes. Gratuit.
            </p>

            {status === "success" ? (
              <p className="mt-6 font-medium text-green" role="status">
                C'est débloqué — bonne lecture ! 🎉
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <HoneypotField value={website} onChange={setWebsite} />
                <label htmlFor="article-gate-email" className="sr-only">
                  Ton adresse email
                </label>
                <input
                  id="article-gate-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  autoComplete="email"
                  className="rounded-full border-0 bg-ink px-5 py-3 text-base text-cream shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-green-light"
                />
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading"
                    ? "Un instant…"
                    : "Débloquer l'article"}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                Adresse invalide ou erreur réseau. Réessaie dans un instant.
              </p>
            )}

            {status !== "success" && (
              <p className="mt-4 text-xs text-cream/40">
                Aucun spam. Désinscription possible en 1 clic.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

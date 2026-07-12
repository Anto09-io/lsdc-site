"use client";

import { useState } from "react";
import { Button } from "./Button";
import HoneypotField from "@/components/HoneypotField";

type Status = "idle" | "loading" | "success" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "loading">, string> = {
  success: "C'est fait ! Vérifie ta boîte mail pour confirmer ton inscription.",
  error: "Oups, une erreur est survenue. Réessaie dans un instant.",
};

/**
 * Formulaire d'inscription newsletter, réutilisable.
 * Poste l'email vers /api/subscribe (liste "newsletter") qui relaie vers Beehiiv.
 *
 * Variantes :
 *  - "hero"  : pilule nue (email + bouton), centrée — pour le hero d'accueil.
 *  - "card"  : grand bloc avec titre/texte — fin d'article, bas de page.
 */
export default function NewsletterForm({
  variant = "card",
}: {
  variant?: "card" | "hero";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, list: "newsletter", website }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const done = status === "success";

  // ── Variante hero : pilule centrée (email + bouton sombre) ──
  if (variant === "hero") {
    return (
      <div className="mx-auto w-full max-w-xl">
        {done ? (
          <p
            className="rounded-full bg-green/10 px-6 py-4 text-center font-medium text-green"
            role="status"
          >
            {MESSAGES.success}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 rounded-3xl bg-surface p-2 shadow-card ring-1 ring-white/10 sm:flex-row sm:items-center sm:rounded-full"
          >
            <HoneypotField value={website} onChange={setWebsite} />
            <label htmlFor="newsletter-hero" className="sr-only">
              Ton adresse e-mail
            </label>
            <input
              id="newsletter-hero"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="flex-1 rounded-full border-0 bg-transparent px-5 py-3 text-base text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Inscription…" : "S'abonner"}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-center text-sm text-red-400" role="alert">
            {MESSAGES.error}
          </p>
        )}
      </div>
    );
  }

  // ── Variante card : grand bloc sombre, accent vert ──
  return (
    <div className="rounded-3xl bg-surface px-6 py-10 text-center text-cream ring-1 ring-green/20 sm:px-12">
      <h2 className="font-display text-3xl italic text-cream sm:text-4xl">
        La newsletter qui te fait <span className="text-green">progresser</span>
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">
        Chaque dimanche, mes meilleures recommandations d'entraînement basées sur
        la science. Méthode watt/kg, FTP, physiologie. Gratuit.
      </p>

      {done ? (
        <p className="mt-6 font-medium text-green" role="status">
          {MESSAGES.success}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
            <HoneypotField value={website} onChange={setWebsite} />
          <label htmlFor="newsletter-card" className="sr-only">
            Ton adresse email
          </label>
          <input
            id="newsletter-card"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            autoComplete="email"
            className="flex-1 rounded-full border-0 bg-ink px-5 py-3 text-base text-cream shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-green-light"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Inscription…" : "Je m'inscris"}
          </Button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {MESSAGES.error}
        </p>
      )}
    </div>
  );
}

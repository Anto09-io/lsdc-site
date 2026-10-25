"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";
import { Button } from "@/components/Button";
import HoneypotField from "@/components/HoneypotField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PDF_URL = "/ressources/le-systeme-kj.pdf";

// Formulaire d'opt-in : inscrit l'email (tag Lumail "systeme-kj") puis
// débloque le téléchargement du PDF sur place.
export default function KjOptin() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");

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
        body: JSON.stringify({ email, list: "systeme-kj", website }),
      });
      if (res.ok) {
        setStatus("done");
        track("subscribe", { source: "systeme-kj" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-surface p-6 text-center ring-1 ring-carbon/10" role="status">
        <p className="text-2xl">🎉</p>
        <p className="mt-2 text-lg font-extrabold text-carbon">C'est à toi !</p>
        <p className="mt-1 text-sm text-carbon/60">
          Ton ebook est prêt, télécharge-le maintenant.
        </p>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener"
          className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-full bg-carbon px-6 text-sm font-semibold text-paper transition-colors hover:bg-violet"
        >
          Télécharger Le Système kJ (PDF)
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface p-6 ring-1 ring-carbon/10">
      <p className="text-lg font-extrabold leading-snug text-carbon">
        Reçois l'ebook gratuitement
      </p>
      <p className="mt-1 text-sm text-carbon/60">
        Entre ton email, le PDF se débloque immédiatement.
      </p>
      <form onSubmit={handleSubmit} noValidate className="relative mt-5 flex flex-col gap-3">
        <HoneypotField value={website} onChange={setWebsite} />
        <label htmlFor="kj-email" className="sr-only">
          Ton adresse email
        </label>
        <input
          id="kj-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          autoComplete="email"
          className="min-h-[52px] rounded-xl border-0 bg-paper px-4 text-base text-carbon shadow-sm ring-1 ring-inset ring-carbon/10 focus:outline-none focus:ring-2 focus:ring-violet-light"
        />
        <Button type="submit" pulse disabled={status === "loading"} className="min-h-[52px] w-full">
          {status === "loading" ? "…" : "Je veux l'ebook gratuit →"}
        </Button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500" role="alert">
          Adresse invalide ou erreur réseau. Réessaie dans un instant.
        </p>
      )}
      <p className="mt-3 text-center text-xs text-carbon/40">
        Pas de spam. Désabonnement en 1 clic.
      </p>
    </div>
  );
}

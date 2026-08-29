"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import HoneypotField from "@/components/HoneypotField";

type Status = "idle" | "loading" | "error";

const STORAGE_PREFIX = "lsdc_tool_unlocked_";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Gate email stricte devant un outil gratuit : le contenu (children) n'est
 * révélé qu'après un succès confirmé de /api/subscribe (comme
 * legacy/acces-calculateur, contrairement au quiz qui révèle même en cas
 * d'échec). Le déverrouillage est mémorisé en local pour la session.
 */
export default function ToolGate({
  toolSlug,
  children,
}: {
  toolSlug: string;
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_PREFIX + toolSlug) === "1") {
      setUnlocked(true);
    }
  }, [toolSlug]);

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
        body: JSON.stringify({ email, list: "default", website }),
      });
      if (res.ok) {
        window.localStorage.setItem(STORAGE_PREFIX + toolSlug, "1");
        setUnlocked(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-surface p-8 text-center ring-1 ring-carbon/10">
      <h2 className="font-display text-2xl italic text-carbon">
        Accède à l'outil gratuitement
      </h2>
      <p className="mt-2 text-sm text-carbon/60">
        Entre ton email, l'outil se débloque immédiatement.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <HoneypotField value={website} onChange={setWebsite} />
        <label htmlFor="tool-gate-email" className="sr-only">
          Ton adresse email
        </label>
        <input
          id="tool-gate-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          autoComplete="email"
          className="rounded-full border-0 bg-paper px-5 py-3 text-base text-carbon shadow-sm ring-1 ring-inset ring-carbon/10 focus:outline-none focus:ring-2 focus:ring-violet-light"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Vérification…" : "Accès offert →"}
        </Button>
      </form>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          Adresse invalide ou erreur réseau. Réessaie dans un instant.
        </p>
      )}

      <p className="mt-4 text-xs text-carbon/40">
        Aucun spam. Désinscription possible en 1 clic.
      </p>
    </div>
  );
}

"use client";

import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import HoneypotField from "@/components/HoneypotField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Formulaire d'opt-in : inscrit l'email (liste "systeme-kj" → séquence Lumail
// qui livre le PDF) puis renvoie vers la thank-you. Le PDF n'est jamais donné
// sur la page : il faut ouvrir l'email, donc donner une vraie adresse.
export default function KjOptin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

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
        track("subscribe", { source: "systeme-kj" });
        router.push("/le-systeme-kj/merci");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="optin" className="scroll-mt-6 rounded-2xl bg-surface p-6 ring-1 ring-carbon/10">
      <p className="text-lg font-extrabold leading-snug text-carbon">
        Reçois l'ebook gratuitement
      </p>
      <p className="mt-1 text-sm text-carbon/60">
        Entre ton email, je te l'envoie tout de suite.
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

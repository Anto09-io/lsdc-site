import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ton ebook est en route — Le Système kJ",
  robots: { index: false, follow: false },
};

// Thank-you de la page de capture : le PDF n'est PAS donné ici. Il arrive
// par email (séquence Lumail « ManyChat — ebook Le système kJ »), ce qui
// oblige à donner une vraie adresse.

const MAILBOXES = [
  { label: "Ouvrir Gmail", href: "https://mail.google.com/mail/u/0/#search/lascienceducyclisme" },
  { label: "Ouvrir Outlook", href: "https://outlook.live.com/mail/0/" },
  { label: "Ouvrir Yahoo", href: "https://mail.yahoo.com/" },
];

export default function SystemeKjMerciPage() {
  return (
    <main className="mx-auto max-w-xl px-5 pb-20 pt-12 text-center sm:pt-16" role="status">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet/10 text-3xl">
        📩
      </div>
      <span className="mt-6 inline-block rounded-full border border-violet/30 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-violet">
        Dernière étape
      </span>
      <h1 className="mt-4 font-sans text-[clamp(1.75rem,4.6vw,2.6rem)] font-black leading-[1.1] tracking-[-0.02em]">
        Ton ebook t'attend dans <span className="text-violet">ta boîte mail</span>
      </h1>
      <p className="mt-5 text-base leading-relaxed text-carbon/65 sm:text-lg">
        Je viens de t'envoyer <strong className="text-carbon">Le Système kJ</strong>.
        Ouvre l&apos;email « Ton ebook Le système kJ est là » et clique sur le lien pour télécharger
        le PDF.
      </p>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
        {MAILBOXES.map((m, i) => (
          <a
            key={m.href}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              i === 0
                ? "inline-flex min-h-[52px] items-center justify-center rounded-full bg-carbon px-6 text-sm font-semibold text-paper transition-colors hover:bg-violet"
                : "inline-flex min-h-[52px] items-center justify-center rounded-full border border-carbon/25 px-6 text-sm font-semibold text-carbon transition-colors hover:border-violet hover:text-violet"
            }
          >
            {m.label} →
          </a>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-surface p-5 text-left ring-1 ring-carbon/10">
        <p className="text-sm font-bold text-carbon">Rien reçu d'ici 2-3 minutes ?</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm text-carbon/65">
          <li>• Regarde dans l'onglet <strong className="text-carbon">Promotions</strong> ou dans tes <strong className="text-carbon">spams</strong>.</li>
          <li>• Cherche l'expéditeur <strong className="text-carbon">antonin@hey.lascienceducyclisme.com</strong>.</li>
          <li>• Ajoute-moi à tes contacts pour recevoir la suite.</li>
        </ul>
      </div>
    </main>
  );
}

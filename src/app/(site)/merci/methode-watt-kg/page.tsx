import type { Metadata } from "next";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";

// Page d'arrivée après un paiement Stripe réussi : donne l'accès immédiat,
// pendant que le webhook déclenche l'email de livraison depuis Lumail.

export const metadata: Metadata = {
  title: "Merci — ta Méthode Watt/kg est prête",
  description:
    "Ton accès à la Méthode Watt/kg™. Télécharge le PDF et commence dès maintenant.",
  // Page de confirmation post-achat : rien à indexer.
  robots: { index: false, follow: false },
};

const PDF_URL = "/ebook/methode-watt-kg-c8792873a6c42708.pdf";

export default function MerciMethodeWattKgPage() {
  return (
    <Container size="prose" className="py-20 sm:py-28">
      <p className="text-sm uppercase tracking-widest text-violet">
        Paiement confirmé
      </p>

      <h1 className="mt-4 font-display text-4xl italic sm:text-5xl">
        Merci pour ta confiance.
      </h1>

      <p className="mt-6 text-lg text-carbon/70">
        Ta Méthode Watt/kg™ est prête. Télécharge-la tout de suite — tu la
        reçois aussi par email, dans la minute qui vient.
      </p>

      <div className="mt-10">
        <ButtonLink href={PDF_URL} variant="primary" withArrow external>
          Télécharger la méthode (PDF)
        </ButtonLink>
      </div>

      <div className="mt-14 rounded-3xl bg-surface p-8">
        <h2 className="font-display text-2xl italic">Par où commencer</h2>
        <p className="mt-4 text-carbon/70">
          Ne lis pas les 81 pages d&apos;un coup. Commence par la partie sur la
          charge d&apos;entraînement en kilojoules : c&apos;est le socle, tout
          le reste en découle.
        </p>
      </div>

      <p className="mt-10 text-sm text-carbon/50">
        L&apos;email n&apos;arrive pas ou le fichier refuse de s&apos;ouvrir ?
        Écris-moi à{" "}
        <a
          href="mailto:antonin@lascienceducyclisme.com"
          className="text-violet hover:underline"
        >
          antonin@lascienceducyclisme.com
        </a>
        , je réponds en personne.
      </p>
    </Container>
  );
}

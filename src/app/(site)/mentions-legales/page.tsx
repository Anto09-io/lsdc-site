import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site lascienceducyclisme.com.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

// ⚠️ Placeholders [ENTRE CROCHETS] à remplacer par les informations légales
// réelles d'Antonin avant communication officielle.
export default function MentionsLegalesPage() {
  return (
    <Container size="prose" className="prose-lsdc py-16">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>lascienceducyclisme.com</strong> est édité par :<br />
        <strong>[RAISON SOCIALE / NOM PRÉNOM]</strong> — [FORME JURIDIQUE :
        micro-entreprise, EI, SASU…]
        <br />
        SIRET : [NUMÉRO SIRET]
        <br />
        Siège social : [ADRESSE COMPLÈTE]
        <br />
        Email : <a href="mailto:anto.albouy@gmail.com">anto.albouy@gmail.com</a>
        <br />
        Directeur de la publication : Antonin Albouy
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca
        Ave #4133, Covina, CA 91723, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
        .
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus de ce site (textes, images, vidéos, logos,
        outils de calcul) est la propriété exclusive de l'éditeur, sauf mention
        contraire. Toute reproduction, distribution ou utilisation sans
        autorisation écrite préalable est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les contenus publiés (articles, outils, méthodes d'entraînement) sont
        fournis à titre informatif et pédagogique. Ils ne remplacent pas un
        avis médical : consulte un professionnel de santé avant d'entamer tout
        programme d'entraînement intensif.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site :{" "}
        <a href="mailto:anto.albouy@gmail.com">anto.albouy@gmail.com</a>
      </p>
    </Container>
  );
}

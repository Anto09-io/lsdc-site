import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et de protection des données personnelles de lascienceducyclisme.com.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false },
};

// ⚠️ Placeholders [ENTRE CROCHETS] à compléter avec les informations réelles.
export default function ConfidentialitePage() {
  return (
    <Container size="prose" className="prose-lsdc py-16">
      <h1>Politique de confidentialité</h1>
      <p>
        Dernière mise à jour : juillet 2026. Cette politique décrit comment{" "}
        <strong>[RAISON SOCIALE / NOM PRÉNOM]</strong> (« nous ») collecte et
        traite tes données personnelles sur lascienceducyclisme.com,
        conformément au Règlement général sur la protection des données (RGPD).
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Adresse email</strong> — lorsque tu t'inscris à la
          newsletter, débloques un article, utilises le calculateur ou passes
          le quiz.
        </li>
        <li>
          <strong>Réponses au quiz</strong> (profil de cycliste, volume
          d'entraînement, rapport W/kg déclaré…) — rattachées à ton email pour
          personnaliser les contenus envoyés.
        </li>
        <li>
          <strong>Données de navigation anonymes</strong> — mesure d'audience
          sans cookies et sans identifiant individuel (voir « Cookies »).
        </li>
      </ul>

      <h2>Finalités et base légale</h2>
      <p>
        Tes données servent exclusivement à : (1) t'envoyer la newsletter et
        les contenus demandés — base légale : ton consentement, donné au
        moment de la saisie de ton email ; (2) mesurer l'audience du site —
        base légale : intérêt légitime, via une solution sans données
        personnelles.
      </p>

      <h2>Destinataires et sous-traitants</h2>
      <ul>
        <li>
          <strong>Beehiiv Inc.</strong> (États-Unis) — hébergement de la liste
          email et envoi de la newsletter.
        </li>
        <li>
          <strong>Vercel Inc.</strong> (États-Unis) — hébergement du site et
          mesure d'audience anonyme.
        </li>
        <li>
          <strong>ThriveCart / Stripe</strong> — paiement des produits (tes
          données bancaires ne transitent jamais par notre site).
        </li>
      </ul>
      <p>
        Ces prestataires sont situés en partie hors de l'Union européenne ;
        les transferts sont encadrés par les clauses contractuelles types de
        la Commission européenne.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Ton email est conservé tant que tu es abonné. La désinscription
        (lien présent dans chaque email) supprime ton adresse de la liste
        active ; les données sont purgées au plus tard 3 ans après le dernier
        contact.
      </p>

      <h2>Cookies et mesure d'audience</h2>
      <p>
        Ce site n'utilise <strong>aucun cookie publicitaire ni traceur
        individuel</strong>. La mesure d'audience (Vercel Analytics) est
        agrégée et anonyme, sans cookie — elle est exemptée de consentement au
        sens des lignes directrices de la CNIL. C'est pourquoi tu ne vois pas
        de bandeau cookies sur ce site. Si des traceurs soumis à consentement
        étaient ajoutés un jour, un bandeau de consentement serait mis en
        place au préalable.
      </p>

      <h2>Tes droits</h2>
      <p>
        Tu disposes d'un droit d'accès, de rectification, d'effacement, de
        portabilité, de limitation et d'opposition sur tes données. Pour les
        exercer : <a href="mailto:anto.albouy@gmail.com">anto.albouy@gmail.com</a>.
        Tu peux aussi introduire une réclamation auprès de la CNIL
        (cnil.fr).
      </p>
    </Container>
  );
}

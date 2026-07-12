import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente des produits et programmes La Science du Cyclisme.",
  alternates: { canonical: "/cgv" },
  robots: { index: false },
};

// ⚠️ Placeholders [ENTRE CROCHETS] à compléter. À faire relire par un
// professionnel du droit avant de s'en prévaloir contractuellement.
export default function CgvPage() {
  return (
    <Container size="prose" className="prose-lsdc py-16">
      <h1>Conditions générales de vente</h1>
      <p>
        Dernière mise à jour : juillet 2026. Les présentes CGV régissent les
        ventes de produits numériques (ebooks, formations en ligne,
        programmes d'entraînement) proposés par{" "}
        <strong>[RAISON SOCIALE / NOM PRÉNOM]</strong>, SIRET [NUMÉRO SIRET],
        [ADRESSE] (« le Vendeur ») sur lascienceducyclisme.com.
      </p>

      <h2>1. Produits</h2>
      <p>
        Les produits vendus sont des contenus numériques : la méthode watt/kg
        (ebook), le Système Watt/kg (formation vidéo, librairie de séances,
        outils) et tout autre programme présenté sur le site. Les
        caractéristiques essentielles sont décrites sur la page de vente de
        chaque produit.
      </p>

      <h2>2. Prix et paiement</h2>
      <p>
        Les prix sont indiqués en euros toutes taxes comprises. [SI
        MICRO-ENTREPRISE : « TVA non applicable, art. 293 B du CGI. »] Le
        paiement s'effectue en ligne via ThriveCart/Stripe au moment de la
        commande. La commande est ferme à la validation du paiement.
      </p>

      <h2>3. Livraison</h2>
      <p>
        Les produits numériques sont livrés immédiatement après paiement, par
        email et/ou via un espace membre. En cas de non-réception, contacte{" "}
        <a href="mailto:anto.albouy@gmail.com">anto.albouy@gmail.com</a>.
      </p>

      <h2>4. Droit de rétractation</h2>
      <p>
        Conformément à l'article L221-28 1° du Code de la consommation, le
        droit de rétractation ne peut être exercé pour un contenu numérique
        fourni immédiatement après l'achat, dès lors que tu as expressément
        consenti à l'exécution immédiate et renoncé à ton droit de
        rétractation au moment de la commande. [SI GARANTIE COMMERCIALE :
        décrire ici la garantie « satisfait ou remboursé » éventuelle, sa
        durée et ses conditions.]
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les programmes d'entraînement sont fournis à titre informatif et
        pédagogique. Ils ne constituent pas un avis médical. L'acheteur
        reconnaît être apte à la pratique du cyclisme et s'engage à consulter
        un médecin en cas de doute. Le Vendeur ne garantit pas de résultat
        sportif déterminé.
      </p>

      <h2>6. Propriété intellectuelle</h2>
      <p>
        Les contenus vendus sont réservés à un usage strictement personnel.
        Toute revente, partage ou diffusion est interdite.
      </p>

      <h2>7. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans la{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>8. Litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige,
        une solution amiable sera recherchée en priorité. Conformément aux
        articles L611-1 et suivants du Code de la consommation, tu peux
        recourir gratuitement au médiateur de la consommation : [NOM ET
        COORDONNÉES DU MÉDIATEUR CHOISI].
      </p>
    </Container>
  );
}

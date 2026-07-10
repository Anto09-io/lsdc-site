import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import Container from "@/components/Container";
import NewsletterForm from "@/components/NewsletterForm";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Antonin Albouy, créateur de La Science du Cyclisme. Ma mission : démocratiser l'entraînement cycliste basé sur la science et la méthode watt/kg.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <Container size="prose" className="py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-green">
          {siteConfig.author.signature}
        </p>
        <h1 className="mt-4 font-display text-4xl italic leading-tight sm:text-5xl">
          Rendre la science de la performance accessible à tous les cyclistes
        </h1>

        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Image
            src="/antonin.jpg"
            alt="Antonin Albouy"
            width={140}
            height={140}
            className="h-32 w-32 flex-shrink-0 rounded-2xl object-cover object-top"
            priority
          />
          <div className="space-y-4 text-lg leading-relaxed text-cream/70">
            <p>
              Salut, moi c'est <strong className="text-cream">Antonin Albouy</strong>.
              Depuis plus de cinq ans, je vulgarise l'approche scientifique de
              l'entraînement cycliste sur YouTube et par newsletter.
            </p>
            <p>
              Aujourd'hui, plus de {""}
              <strong className="text-cream">22 000 abonnés</strong> me suivent sur
              YouTube et <strong className="text-cream">8 500 cyclistes</strong>{" "}
              reçoivent mes recommandations chaque dimanche.
            </p>
          </div>
        </div>

        <div className="prose-lsdc mt-12 max-w-none">
          <h2>La méthode watt/kg</h2>
          <p>
            La plupart des cyclistes amateurs s'entraînent à l'instinct, accumulent
            les kilomètres et finissent par stagner. Mon approche est différente :
            partir de la science de la performance pour transformer chaque sortie en
            progression mesurable. Le rapport poids/puissance — les fameux watt/kg —
            est l'indicateur qui résume le mieux ton niveau réel à vélo.
          </p>

          <h2>Ma mission avec LSDC</h2>
          <p>
            La Science du Cyclisme existe pour une raison simple : il y a trop de
            mythes et de croyances dans le monde de l'entraînement, et trop peu
            d'explications claires de ce que dit vraiment la recherche. Mon objectif,
            c'est de décrypter les études et de te donner des protocoles concrets,
            applicables dès ta prochaine sortie.
          </p>

          <h2>Ce blog</h2>
          <p>
            Tu trouveras ici mes articles de vulgarisation : entraînement,
            physiologie, nutrition et matériel. Tout est pensé pour t'aider à
            comprendre <em>pourquoi</em> tu fais les choses, pas seulement{" "}
            <em>quoi</em> faire.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.social.youtube} external>
            Ma chaîne YouTube
          </ButtonLink>
          <ButtonLink href="/articles" variant="outline">
            Lire les articles
          </ButtonLink>
        </div>
      </Container>

      <Container className="pb-20">
        <NewsletterForm variant="card" />
      </Container>
    </>
  );
}

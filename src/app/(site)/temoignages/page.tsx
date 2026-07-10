import type { Metadata } from "next";
import Container from "@/components/Container";
import TestimonialCard, { Testimonial } from "@/components/TestimonialCard";
import { ButtonLink } from "@/components/Button";
import temoignages from "@/data/temoignages.json";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Les résultats des membres de la méthode watt/kg et des différents programmes LSDC, racontés par eux-mêmes.",
  alternates: { canonical: "/temoignages" },
};

export default function TemoignagesPage() {
  // On ne met en avant que les avis 5 étoiles.
  const all = (temoignages as Testimonial[]).filter((t) => t.rating === 5);
  const videos = all.filter((t) => t.videoUrl);
  const texts = all.filter((t) => !t.videoUrl && t.text);

  return (
    <Container className="py-16">
      <header className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-4xl italic leading-tight sm:text-5xl">
          Voici les résultats des membres de la{" "}
          <span className="text-green">méthode watt/kg</span> et des différents
          programmes LSDC
        </h1>
        <p className="mt-6 text-lg text-cream/60">
          Des témoignages de cyclistes amateurs, dans leurs propres mots.
        </p>
      </header>

      {/* Témoignages vidéo */}
      <section className="mt-16">
        <h2 className="font-display text-3xl italic sm:text-4xl">
          Ils en parlent en vidéo
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Témoignages écrits, en colonnes façon masonry */}
      <section className="mt-16">
        <h2 className="font-display text-3xl italic sm:text-4xl">
          Les avis des membres
        </h2>
        <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {texts.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <ButtonLink href="/systeme-watt-kg">Découvrir la méthode</ButtonLink>
      </div>
    </Container>
  );
}

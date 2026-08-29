import type { Metadata } from "next";
import { getAllPostsMeta, getUsedCategories } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import Container from "@/components/Container";
import BlogIndex from "@/components/BlogIndex";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Tous les articles",
  description:
    "Tous les articles de La Science du Cyclisme : entraînement, physiologie, nutrition et matériel pour cyclistes amateurs.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const posts = getAllPostsMeta();
  // On affiche les filtres dans l'ordre défini, mais seulement ceux utilisés.
  const used = getUsedCategories();
  const categories = siteConfig.categories.filter((c) => used.includes(c));

  return (
    <>
      <Container className="py-16">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-5xl italic">LSDC Newsletter</h1>
          <p className="mt-4 text-lg text-carbon/60">
            Abonne-toi pour recevoir chaque semaine les meilleurs conseils
            d'entraînement et analyses pour atteindre ton meilleur niveau sur le
            vélo. Déjà suivie par 8 500 cyclistes amateurs.
          </p>
        </header>

        <div id="newsletter" className="mx-auto mt-10 max-w-xl scroll-mt-8 md:scroll-mt-[190px]">
          <NewsletterForm variant="hero" />
          <p className="mt-3 text-center text-xs text-carbon/40">
            Aucun spam. Désinscription possible en 1 clic.
          </p>
        </div>
      </Container>

      <Container className="pb-20">
        <BlogIndex posts={posts} categories={categories} />
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { formatDate, readingLabel } from "@/lib/format";
import { mdxComponents } from "@/components/MdxComponents";
import ArticleGate from "@/components/ArticleGate";
import Container from "@/components/Container";
import CategoryBadge from "@/components/CategoryBadge";
import AuthorBox from "@/components/AuthorBox";
import ArticleCard from "@/components/ArticleCard";
import MethodeCta from "@/components/MethodeCta";
import JsonLd from "@/components/JsonLd";

// Génère les pages statiquement au build (1 page par article publié).
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// ── Métadonnées SEO dynamiques par article ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) return {};

  const url = absoluteUrl(`/articles/${post.slug}`);
  const ogImage = post.ogImage || post.coverImage;
  const images = ogImage ? [{ url: absoluteUrl(ogImage) }] : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [siteConfig.author.name],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ogImage ? [absoluteUrl(ogImage)] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const related = getRelatedPosts(slug);
  const url = absoluteUrl(`/articles/${post.slug}`);

  // Compilation MDX résolue côté serveur (évite les soucis de streaming RSC).
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  // Données structurées Schema.org (BlogPosting) pour le SEO.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: siteConfig.author.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/lsdc-logo.svg") },
    },
    ...(post.coverImage
      ? { image: [absoluteUrl(post.coverImage)] }
      : {}),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        {/* En-tête article */}
        <Container size="prose" className="pt-12 sm:pt-16">
          <Link
            href="/articles"
            className="text-sm font-medium text-violet hover:underline"
          >
            ← Tous les articles
          </Link>

          <div className="mt-6">
            <CategoryBadge category={post.category} />
          </div>

          <h1 className="mt-4 font-display text-4xl italic leading-tight sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-carbon/60">{post.description}</p>

          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-carbon/50">
            <span>{siteConfig.author.signature}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{readingLabel(post.readingMinutes)}</span>
          </p>
        </Container>

        {/* Image de couverture */}
        {post.coverImage && (
          <Container size="prose" className="mt-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-violet/5">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </Container>
        )}

        {/* Corps MDX — flouté tant que le lecteur n'est pas abonné */}
        <Container size="prose" className="mt-12">
          <ArticleGate>
            <div className="prose-lsdc">{content}</div>
          </ArticleGate>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-carbon/5 px-3 py-1 text-xs text-carbon/60"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          {/* Bloc auteur */}
          <div className="mt-12">
            <AuthorBox />
          </div>

          {/* CTA Système Watt/kg en fin d'article — le lecteur a déjà donné
              son email pour débloquer l'article, on pousse l'offre. */}
          <div className="mt-12">
            <MethodeCta />
          </div>
        </Container>
      </article>

      {/* Articles liés */}
      {related.length > 0 && (
        <Container className="mt-20">
          <h2 className="mb-8 font-display text-3xl italic">À lire aussi</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

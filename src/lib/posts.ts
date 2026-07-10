// Pipeline de contenu MDX : lecture des fichiers, parsing du frontmatter,
// calcul du temps de lecture, tri par date et filtrage des brouillons.
//
// Aucune base de données : la source de vérité, ce sont les fichiers
// content/posts/*.mdx (frontmatter YAML + corps MDX).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  updated?: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  ogImage?: string;
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number; // temps de lecture estimé (minutes)
}

export interface Post extends PostMeta {
  content: string; // corps MDX brut
}

/** Liste les slugs disponibles (noms de fichiers .mdx sans extension). */
function getSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Lit et parse un article par son slug. Retourne null si introuvable. */
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    ...fm,
    slug,
    draft: fm.draft ?? false,
    tags: fm.tags ?? [],
    // readingTime calculé automatiquement à partir du corps.
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

/**
 * Tous les articles publiés (draft: false), triés du plus récent au plus ancien.
 * Utilisé pour l'accueil, l'index, le sitemap et le RSS.
 */
export function getAllPosts(): Post[] {
  return getSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null && p.draft !== true)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Métadonnées seules (sans le corps), pratique pour les listes. */
export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

/** Articles d'une catégorie donnée. */
export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.category === category);
}

/**
 * Articles liés : même catégorie, en excluant l'article courant.
 * Complète avec les plus récents si la catégorie est trop pauvre.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const all = getAllPostsMeta().filter((p) => p.slug !== slug);
  const sameCategory = all.filter((p) => p.category === current.category);
  const others = all.filter((p) => p.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}

/** Liste des catégories réellement présentes dans les articles publiés. */
export function getUsedCategories(): string[] {
  const used = new Set(getAllPostsMeta().map((p) => p.category));
  return Array.from(used);
}

import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

// Sitemap auto-généré. Les brouillons sont déjà exclus par getAllPosts().
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/articles"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/outils"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/temoignages"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/systeme-watt-kg"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/quiz"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/a-propos"), changeFrequency: "monthly", priority: 0.5 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/articles/${post.slug}`),
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tools: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: absoluteUrl(`/outils/${tool.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...posts, ...tools];
}

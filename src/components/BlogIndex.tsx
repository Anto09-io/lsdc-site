"use client";

import { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/lib/posts";

const PER_PAGE = 9;

/**
 * Index des articles avec filtre par catégorie et pagination « charger plus ».
 * Reçoit la liste complète déjà triée depuis le serveur.
 */
export default function BlogIndex({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("Tous");
  const [visible, setVisible] = useState(PER_PAGE);

  const filtered = useMemo(
    () => (active === "Tous" ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  );

  const filters = ["Tous", ...categories];

  return (
    <div>
      {/* Filtres catégorie */}
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {filters.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => {
              setActive(cat);
              setVisible(PER_PAGE);
            }}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
              active === cat
                ? "bg-violet text-paper"
                : "bg-surface text-carbon/70 ring-1 ring-inset ring-carbon/10 hover:bg-violet/5 hover:text-violet",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-carbon/60">Aucun article dans cette catégorie pour l'instant.</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>

          {visible < filtered.length && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                onClick={() => setVisible((v) => v + PER_PAGE)}
                className="border-violet/30 text-violet"
              >
                Charger plus d'articles
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

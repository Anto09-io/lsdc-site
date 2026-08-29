import Link from "next/link";
import Image from "next/image";
import Card from "./Card";
import CategoryBadge from "./CategoryBadge";
import { formatDate, readingLabel } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

/** Carte article pour les listes (accueil, index blog). */
export default function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/articles/${post.slug}`} className="flex h-full flex-col">
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-violet/5">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center gap-3">
            <CategoryBadge category={post.category} />
          </div>
          <h3 className="font-display text-2xl leading-tight text-carbon transition-colors group-hover:text-violet">
            {post.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-carbon/60">
            {post.description}
          </p>
          <p className="mt-2 text-xs text-carbon/50">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {" · "}
            {readingLabel(post.readingMinutes)}
          </p>
        </div>
      </Link>
    </Card>
  );
}

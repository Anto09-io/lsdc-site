import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

// Composants personnalisés injectés dans le rendu MDX.
// Liens internes via next/link ; images de contenu en <img> natif lazy
// (dimensions inconnues à l'import Beehiiv → on préserve le ratio réel, pas de
// déformation). Les images de couverture, elles, passent par next/image.

export const mdxComponents: MDXRemoteProps["components"] = {
  img: (props) => {
    const { src, alt } = props as { src?: string; alt?: string };
    if (!src) return null;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-2xl"
      />
    );
  },
  a: (props) => {
    const { href = "#", children } = props as {
      href?: string;
      children?: React.ReactNode;
    };
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href}>{children}</Link>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

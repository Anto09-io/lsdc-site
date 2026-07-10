import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { siteConfig } from "./site";

/**
 * Convertit le corps Markdown/MDX d'un article en HTML, pour <content:encoded>
 * du flux RSS.
 *
 * Note : les composants MDX custom ne sont pas exécutés ici — on ne traite que
 * le Markdown standard (titres, listes, tableaux, images, liens, citations),
 * ce qui suffit largement pour un rendu email.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  let html = String(file);

  // Transforme les chemins d'images/liens relatifs en URLs absolues
  // (obligatoire pour un email : pas de domaine relatif).
  html = html.replace(/(src|href)="\//g, `$1="${siteConfig.url}/`);

  return html;
}

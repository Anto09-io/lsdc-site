#!/usr/bin/env node
/**
 * Import des articles Beehiiv → fichiers MDX locaux.
 *
 * Récupère tous les posts publiés via l'API Beehiiv v2, convertit le HTML en
 * Markdown, télécharge les images en local (public/images/beehiiv/<slug>/), et
 * génère un fichier content/posts/<slug>.mdx par article.
 *
 * ── Sécurité ──
 * Les articles importés sont marqués `draft: true` par défaut : ils n'apparaissent
 * NI dans les listes, NI dans le sitemap, NI dans le flux RSS. Tu les relis,
 * ajustes la catégorie / la méta-description, puis tu passes `draft: false` quand
 * tu veux les publier (et donc déclencher l'envoi Brevo via le RSS).
 *
 * ── Utilisation ──
 *   1. Renseigne BEEHIIV_API_KEY dans .env.local (et BEEHIIV_PUBLICATION_ID si tu
 *      la connais ; sinon le script la détecte automatiquement).
 *   2. npm run import:beehiiv
 *      Options :
 *        --force     écrase les .mdx existants (par défaut : ne les touche pas)
 *        --publish   importe en draft: false (déconseillé : voir ci-dessus)
 *        --limit=N   n'importe que les N articles les plus récents (test)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// ── Chargement basique de .env.local (sans dépendance) ──
const ROOT = path.resolve(fileURLToPath(import.meta.url), "..", "..");
loadEnv(path.join(ROOT, ".env.local"));

const API_KEY = process.env.BEEHIIV_API_KEY;
let PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const PUBLISH = args.includes("--publish");
const LIMIT_ARG = args.find((a) => a.startsWith("--limit="));
const MAX_POSTS = LIMIT_ARG ? Number(LIMIT_ARG.split("=")[1]) : Infinity;

const POSTS_DIR = path.join(ROOT, "content", "posts");
const IMAGES_DIR = path.join(ROOT, "public", "images", "beehiiv");
const API_BASE = "https://api.beehiiv.com/v2";

// Catégories du blog (doivent matcher siteConfig.categories).
const CATEGORIES = ["Entraînement", "Physiologie", "Nutrition", "Matériel"];
const DEFAULT_CATEGORY = "Entraînement";

if (!API_KEY) {
  console.error(
    "❌ BEEHIIV_API_KEY manquante. Ajoute-la dans blog/.env.local :\n   BEEHIIV_API_KEY=ta_cle",
  );
  process.exit(1);
}

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
turndown.use(gfm);
// On retire les attributs de style inutiles ; on garde la structure.
turndown.remove(["style", "script"]);

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});

async function main() {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DIR, { recursive: true });

  if (!PUBLICATION_ID) {
    PUBLICATION_ID = await detectPublicationId();
    console.log(`ℹ️  Publication détectée : ${PUBLICATION_ID}`);
  }

  const posts = await fetchAllPosts();
  console.log(`📥 ${posts.length} article(s) publié(s) récupéré(s) depuis Beehiiv.\n`);

  let created = 0;
  let skipped = 0;

  for (const post of posts.slice(0, MAX_POSTS)) {
    const result = await importPost(post);
    if (result === "created") created++;
    else skipped++;
  }

  console.log(
    `\n✅ Terminé : ${created} créé(s), ${skipped} ignoré(s) (déjà présents).`,
  );
  if (created > 0 && !PUBLISH) {
    console.log(
      "ℹ️  Articles importés en draft: true. Relis-les, ajuste catégorie + méta-description,\n" +
        "   puis passe draft: false pour les publier (et déclencher l'envoi Brevo).",
    );
  }
}

/** Récupère la 1re publication du compte. */
async function detectPublicationId() {
  const data = await api(`/publications?limit=10`);
  const pub = data?.data?.[0];
  if (!pub) throw new Error("Aucune publication trouvée sur ce compte Beehiiv.");
  return pub.id;
}

/** Pagine sur tous les posts publiés (status=confirmed), avec le HTML web. */
async function fetchAllPosts() {
  const all = [];
  let page = 1;
  let totalPages = 1;

  do {
    const params = new URLSearchParams({
      status: "confirmed",
      limit: "100",
      page: String(page),
      order_by: "publish_date",
      direction: "asc",
    });
    // expand[] : on demande le contenu HTML de la version web.
    params.append("expand[]", "free_web_content");

    const data = await api(
      `/publications/${PUBLICATION_ID}/posts?${params.toString()}`,
    );
    all.push(...(data.data || []));
    totalPages = data.total_pages || 1;
    page++;
  } while (page <= totalPages);

  return all;
}

/** Génère le .mdx pour un post Beehiiv. */
async function importPost(post) {
  const slug = post.slug?.trim() || slugify(post.title || post.id);
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath) && !FORCE) {
    console.log(`⏭️  ${slug} — déjà présent (utilise --force pour écraser)`);
    return "skipped";
  }

  const html = post.content?.free?.web;
  if (!html) {
    console.log(`⚠️  ${slug} — pas de contenu web, ignoré.`);
    return "skipped";
  }

  const date = toISODate(post.publish_date || post.displayed_date || post.created);

  // Dossier d'images dédié à l'article.
  const assetDir = path.join(IMAGES_DIR, slug);

  // Image de couverture (thumbnail Beehiiv).
  let coverImage = "";
  if (post.thumbnail_url) {
    const local = await downloadImage(post.thumbnail_url, assetDir, "cover");
    if (local) coverImage = toPublicPath(local);
  }

  // Conversion HTML → Markdown.
  let markdown = turndown.turndown(html);

  // Téléchargement + réécriture des images du corps.
  markdown = await localizeImages(markdown, assetDir, slug);

  const frontmatter = buildFrontmatter({
    title: (post.title || "Sans titre").replace(/"/g, '\\"'),
    description: makeDescription(post),
    date,
    category: mapCategory(post.content_tags),
    tags: (post.content_tags || []).slice(0, 6),
    coverImage,
    draft: !PUBLISH,
    sourceUrl: post.web_url || "",
  });

  fs.writeFileSync(filePath, `${frontmatter}\n${markdown.trim()}\n`, "utf8");
  console.log(`📝 ${slug} — créé (${date})`);
  return "created";
}

/** Construit le bloc frontmatter YAML. */
function buildFrontmatter(d) {
  const tags = d.tags.length
    ? `[${d.tags.map((t) => `"${String(t).replace(/"/g, "")}"`).join(", ")}]`
    : "[]";
  return [
    "---",
    `title: "${d.title}"`,
    `description: "${d.description}"`,
    `date: "${d.date}"`,
    `updated: "${d.date}"`,
    // ⚠️ Catégorie déduite des tags Beehiiv : à vérifier manuellement.
    `category: "${d.category}"`,
    `tags: ${tags}`,
    d.coverImage ? `coverImage: "${d.coverImage}"` : `# coverImage: ""`,
    d.coverImage ? `ogImage: "${d.coverImage}"` : `# ogImage: ""`,
    `draft: ${d.draft}`,
    "readingTime: auto",
    d.sourceUrl ? `# source Beehiiv : ${d.sourceUrl}` : "",
    "---",
    "",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

/** Méta-description : meta_default_description > preview_text > subtitle (tronquée). */
function makeDescription(post) {
  const raw =
    post.meta_default_description ||
    post.preview_text ||
    post.subtitle ||
    "";
  return raw.replace(/\s+/g, " ").replace(/"/g, "'").trim().slice(0, 155);
}

/** Mappe les content_tags Beehiiv vers une catégorie du blog. */
function mapCategory(tags = []) {
  for (const tag of tags) {
    const match = CATEGORIES.find(
      (c) => c.toLowerCase() === String(tag).toLowerCase(),
    );
    if (match) return match;
  }
  return DEFAULT_CATEGORY;
}

/** Trouve les images Markdown, les télécharge, réécrit les chemins. */
async function localizeImages(markdown, assetDir, slug) {
  const imgRe = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const matches = [...markdown.matchAll(imgRe)];
  let i = 0;

  for (const m of matches) {
    const [full, alt, url] = m;
    if (!/^https?:\/\//.test(url)) continue;
    const local = await downloadImage(url, assetDir, `${slug}-${i++}`);
    if (local) {
      const publicPath = toPublicPath(local);
      markdown = markdown.replace(full, `![${alt}](${publicPath})`);
    }
  }
  return markdown;
}

/** Télécharge une image, retourne son chemin disque (ou null si échec). */
async function downloadImage(url, dir, baseName) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = guessExt(url, res.headers.get("content-type"));
    fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, `${baseName}${ext}`);
    fs.writeFileSync(filePath, buf);
    return filePath;
  } catch {
    return null;
  }
}

function guessExt(url, contentType) {
  const fromUrl = (url.split("?")[0].match(/\.(jpe?g|png|webp|gif|avif|svg)$/i) || [])[0];
  if (fromUrl) return fromUrl.toLowerCase();
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("gif")) return ".gif";
  if (contentType?.includes("svg")) return ".svg";
  return ".jpg";
}

/** Chemin disque public/... → URL publique /... */
function toPublicPath(filePath) {
  const pub = path.join(ROOT, "public");
  return filePath.replace(pub, "").split(path.sep).join("/");
}

function toISODate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  // Beehiiv renvoie des timestamps Unix (secondes).
  const ms = String(value).length <= 10 ? Number(value) * 1000 : Number(value);
  const d = new Date(ms);
  return Number.isNaN(d.getTime())
    ? new Date().toISOString().slice(0, 10)
    : d.toISOString().slice(0, 10);
}

function slugify(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Appel API Beehiiv authentifié. */
async function api(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `API Beehiiv ${res.status} sur ${endpoint}\n${body.slice(0, 300)}`,
    );
  }
  return res.json();
}

/** Charge un fichier .env (KEY=VALUE) dans process.env sans écraser l'existant. */
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}

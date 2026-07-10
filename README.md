# La Science du Cyclisme (LSDC)

Site Next.js (App Router + TypeScript + Tailwind) de **La Science du Cyclisme** :
accueil, articles (SEO + newsletter), outils d'entraînement gratuits gatés par
email, témoignages, page de vente du programme Système Watt/Kg, et quiz de
profil cycliste. Le contenu éditorial vit dans des fichiers **MDX locaux**
(pas de CMS, pas de base de données). Toute la collecte d'email (newsletter,
quiz, calculateurs) passe par **Beehiiv**.

---

## 🚀 Lancer en local

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement local
cp .env.example .env.local
# puis renseigner BEEHIIV_API_KEY et BEEHIIV_PUB_ID (voir plus bas)

# 3. Démarrer le serveur de développement
npm run dev
```

Le site tourne sur **http://localhost:3000**.

Autres commandes :

```bash
npm run build   # build de production (vérifie que tout compile)
npm run start   # sert le build de production en local
npm run lint    # vérifie le code
```

---

## ✍️ Ajouter un article

1. Crée un fichier `content/posts/mon-article.mdx`. Le **nom du fichier** devient
   l'URL : `content/posts/mon-article.mdx` → `/articles/mon-article`.
2. Ajoute le frontmatter en haut du fichier :

```yaml
---
title: "Titre de l'article"
description: "Méta-description SEO, ~150 caractères."
date: "2026-06-08"
updated: "2026-06-08"
category: "Entraînement"        # Entraînement | Physiologie | Nutrition | Matériel
tags: ["watt/kg", "FTP"]
coverImage: "/images/mon-article.jpg"
ogImage: "/images/mon-article-og.jpg"
draft: false                     # true = invisible (ni liste, ni sitemap, ni RSS)
readingTime: auto                # calculé automatiquement
---
```

3. Écris le corps en Markdown/MDX sous le frontmatter (titres `##`, listes,
   tableaux, citations `>`, images, liens…).
4. Place les images dans `public/images/` et référence-les en `/images/...`.
5. Commit + push : Vercel redéploie automatiquement.

> **Brouillons** : mets `draft: true` pour qu'un article reste invisible
> (absent des listes, du sitemap et du RSS).

Les catégories disponibles sont définies dans `src/lib/site.ts`
(`siteConfig.categories`).

---

## 📨 Importer ses articles depuis Beehiiv

Un script récupère tes posts publiés via l'**API Beehiiv v2**, convertit le HTML
en Markdown, **télécharge les images en local** (`public/images/beehiiv/<slug>/`)
et génère un `content/posts/<slug>.mdx` par article.

```bash
# 1. Récupère ta clé API : Beehiiv → Settings → API → Create new API key
# 2. Ajoute-la dans .env.local
echo 'BEEHIIV_API_KEY=ta_cle' >> .env.local

# 3. Lance l'import
npm run import:beehiiv
```

Options :

| Option | Effet |
| --- | --- |
| _(défaut)_ | Importe en `draft: true` ; n'écrase pas les fichiers existants |
| `--limit=3` | Teste sur les 3 articles les plus récents |
| `--force` | Réécrit les `.mdx` déjà présents |
| `--publish` | Importe en `draft: false` |

**Après import, pense à vérifier dans chaque `.mdx` :**

- `category` (déduite des tags Beehiiv ou mise sur « Entraînement » par défaut) ;
- `description` (méta SEO ~150 caractères) ;
- l'image de couverture et les liens internes.

---

## ☁️ Déploiement Vercel

1. Pousse ce repo sur **GitHub**.
2. Sur [vercel.com](https://vercel.com) → **Add New… > Project** → importe le
   dépôt GitHub.
3. **Root Directory** = racine du repo (le site Next.js vit à la racine, plus
   dans un sous-dossier `blog/`).
4. Framework détecté automatiquement : **Next.js**. Laisse les commandes par
   défaut (`next build`).
5. Ajoute les **variables d'environnement** (onglet *Settings > Environment
   Variables*) — voir la liste complète dans `.env.example` : au minimum
   `BEEHIIV_API_KEY`, `BEEHIIV_PUB_ID`, `NEXT_PUBLIC_SITE_URL`.
6. Déploie.

> ⚠️ Ce projet remplace l'ancien site statique (fichiers dans `legacy/`,
> conservés pour référence). Bascule Vercel/DNS à faire explicitement une fois
> le nouveau site validé — voir avec Antonin avant tout changement de config
> de production.

### Connexion du domaine

1. Dans le projet Vercel → **Settings > Domains** → ajoute ton domaine
   (`lascienceducyclisme.com`).
2. Vercel affiche un enregistrement DNS à créer chez ton registrar :
   - Sous-domaine → un **CNAME** vers `cname.vercel-dns.com`.
   - Domaine racine → un **A** vers l'IP fournie par Vercel.
3. Une fois le DNS propagé, le HTTPS est automatique.
4. Mets `NEXT_PUBLIC_SITE_URL` à jour avec ce domaine et redéploie (les URLs
   absolues du sitemap, du RSS et des balises canoniques en dépendent).

---

## 🔑 Variables d'environnement

Voir `.env.example` pour la liste complète et commentée (Beehiiv : clé API,
ID de publication, IDs d'automation par liste — quiz / newsletter /
waiting-list / défaut).

⚠️ **Ne commite jamais** de vraie clé. `.env.local` est ignoré par git ;
renseigne les valeurs en local et dans Vercel uniquement.

---

## 🗂️ Structure

```
content/posts/          Articles MDX (source de vérité)
public/                 Images, logos
legacy/                 Anciens prototypes HTML (référence, non servis)
src/app/                Pages : accueil, /articles, /articles/[slug],
                        /progresse, /progresse/[outil], /temoignages,
                        /systeme-watt-kg, /quiz, /quiz/resultat
src/app/api/subscribe   Route d'inscription Beehiiv (newsletter, quiz, outils)
src/app/rss.xml         Flux RSS
src/app/sitemap.ts      Sitemap auto-généré
src/app/robots.ts       robots.txt
src/components/         Composants UI (Header, Footer, cartes, NewsletterForm…)
src/lib/                Pipeline MDX, config site, helpers
```

---

## ⚠️ Note technique (versions)

Le projet est volontairement sur **Next.js 15.5.x** (et non 16). La librairie de
rendu MDX (`next-mdx-remote`) n'est pas compatible avec le streaming RSC de
Next 16 : la page article plante au runtime. Reste sur la branche 15.5.x
(corrigée pour les failles de sécurité connues) tant que `next-mdx-remote` n'a
pas publié de version compatible Next 16. `react`/`react-dom` doivent être en
**19.2+** (les 19.0.x provoquent une erreur de sérialisation RSC sur les pages
async).

---

## ✅ SEO inclus

- Métadonnées dynamiques par article (title, description, canonical).
- Open Graph + Twitter cards.
- Données structurées JSON-LD (`BlogPosting`) sur chaque article.
- `sitemap.xml` et `robots.txt` auto-générés.
- `lang="fr"`, images optimisées (`next/image`), URLs propres et stables.

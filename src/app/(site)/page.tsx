import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import VideoEmbed from "@/components/VideoEmbed";
import { ButtonLink } from "@/components/Button";
import { cn } from "@/lib/cn";

/* Emphases dans les textes de présentation : Hl = accent vert (chiffres,
   promesses), Strong = simple graisse claire (contexte). */
function Hl({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-violet">{children}</strong>;
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-carbon">{children}</strong>;
}

type Teaser = {
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: ReactNode[];
  cta?: { label: string; href: string };
  imageSide: "left" | "right";
};

const teasers: Teaser[] = [
  {
    title: "L'histoire de La Science du Cyclisme",
    image: "/images/methode-watt-kg/comparatif-apres.jpg",
    imageAlt: "Antonin Albouy",
    paragraphs: [
      <>
        Antonin a lancé le média La Science du Cyclisme en{" "}
        <Strong>octobre 2021</Strong>, alors qu'il était étudiant en{" "}
        <Strong>sciences de l'entraînement</Strong> à l'UFR STAPS de
        Montpellier. La chaîne YouTube est née de sa passion pour
        l'entraînement et la performance en cyclisme.
      </>,
      <>
        Depuis cinq ans, il vulgarise{" "}
        <Hl>l'approche scientifique de l'entraînement</Hl> pour les cyclistes
        amateurs en quête de progrès.
      </>,
      <>
        Son contenu est le fruit de son expérience{" "}
        <Strong>d'athlète et de coach</Strong>, de sa formation en{" "}
        <Strong>sciences du sport</Strong>, de ses{" "}
        <Strong>entretiens avec des experts</Strong>, et d'une curiosité qui
        l'a mené à développer ses propres méthodes.
      </>,
      <>
        Aujourd'hui, LSDC c'est <Hl>22 500 abonnés sur YouTube</Hl>,{" "}
        <Hl>8 500 lecteurs assidus</Hl> de la newsletter, un podcast, et{" "}
        <Hl>la méthode watt/kg</Hl> — suivie par des milliers de cyclistes —
        pour permettre à n'importe quel cycliste amateur d'atteindre son
        meilleur niveau physique.
      </>,
      <>
        La mission de LSDC : fournir des méthodes avancées aux cyclistes
        amateurs, pour leur permettre d'expérimenter une{" "}
        <Strong>forme exceptionnelle</Strong> et de débloquer{" "}
        <Hl>des sensations et des souvenirs inoubliables sur le vélo</Hl>.
      </>,
    ],
    imageSide: "left",
  },
  {
    title: "La méthode watt/kg",
    image: "/images/methode-watt-kg/ebook-cover.jpg",
    imageAlt: "Ebook La Méthode Watt/KG",
    paragraphs: [
      "La méthode pas à pas pour maîtriser ton entraînement sur le vélo de A à Z, à partir d'un capteur de puissance.",
      "Tous les outils dont tu as besoin, dans le bon ordre, pour relancer ta progression. Développe tes records de puissance et deviens durable pour rouler plus vite, plus longtemps.",
      "Le tout sans sacrifier ta vie perso et sans être épuisé au quotidien.",
    ],
    cta: { label: "Découvrir la méthode", href: "/systeme-watt-kg" },
    imageSide: "right",
  },
  {
    title: "La Newsletter",
    image: "/antonin-velo.jpg",
    imageAlt: "Antonin Albouy en maillot LSDC",
    paragraphs: [
      "Chaque semaine, je t'envoie un article avec un conseil pratique à appliquer directement pour booster tes performances. Déjà suivi par 8 500 cyclistes.",
      "Sois sûr d'adopter la bonne approche pour ne pas perdre de temps.",
    ],
    cta: { label: "Lire les articles", href: "/articles" },
    imageSide: "left",
  },
];

const channelVideos: { youtubeId: string; title: string }[] = [
  { youtubeId: "0vo1ob3v5_o", title: "Vidéo La Science du Cyclisme" },
  { youtubeId: "rEK569L82K8", title: "Vidéo La Science du Cyclisme" },
  { youtubeId: "ilTcDhIbFG8", title: "Vidéo La Science du Cyclisme" },
];

function YouTubeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M23.5 6.2a3 3 0 0 0-2.1-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.8Z"
        fill="#FF0000"
      />
      <path d="M9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" fill="#fff" />
    </svg>
  );
}

function StatsBand() {
  return (
    <section className="rounded-2xl bg-surface px-6 py-8 ring-1 ring-carbon/10 sm:px-10">
      {/* Mobile : les deux lignes partagent la même colonne d'icônes
          (w-fit centré, icônes en boîte fixe) pour rester alignées. */}
      <div className="mx-auto flex w-fit flex-col gap-8 sm:mx-0 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-16">
        <div className="flex items-center gap-4">
          <div className="flex w-14 flex-shrink-0 justify-center">
            <YouTubeLogo className="h-10 w-14" />
          </div>
          <div>
            <p className="text-3xl font-extrabold sm:text-4xl">+22,5k</p>
            <p className="text-sm text-carbon/60">abonnés YouTube</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-14 flex-shrink-0 justify-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-violet"
            >
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="m3 6 9 7 9-7" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold sm:text-4xl">8,5k</p>
            <p className="text-sm text-carbon/60">lecteurs de la newsletter</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelBand() {
  return (
    <section>
      <h2 className="font-display text-3xl italic sm:text-4xl">La chaîne YouTube</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-carbon/70">
        Chaque semaine, des vidéos et des podcasts pour débloquer ton meilleur
        niveau.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {channelVideos.map((video) => (
          <VideoEmbed key={video.youtubeId} youtubeId={video.youtubeId} title={video.title} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──
          Le header est translucide ; pour que son halo vert semble continu
          derrière lui, la section remonte de la hauteur du header (-mt) et
          compense avec un padding-top égal, afin que le contenu visible ne
          bouge pas mais que le fond, lui, remonte jusqu'en haut de la page.
          Compensation desktop uniquement : en mobile la nav passe sur 2
          lignes (hauteur variable), on laisse le flux normal.
          (hauteur md synchronisée avec Header.tsx : ≈174px) */}
      <section className="relative overflow-hidden md:-mt-[174px] md:pt-[174px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_80%_at_50%_0%,rgba(159,1,255,0.10),transparent_70%)]"
        />
        <Container className="py-12 text-center sm:py-28">
          <p className="mx-auto inline-block rounded-full bg-violet/10 px-4 py-1.5 text-xs font-semibold text-violet sm:text-sm">
            Pour les cyclistes amateurs qui veulent progresser
          </p>

          <h1 className="mx-auto mt-6 max-w-4xl font-sans text-3xl font-extrabold not-italic leading-[1.15] tracking-tight sm:text-5xl">
            Atteins ton <span className="text-violet">meilleur niveau physique</span> grâce à
            la science
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-xl font-semibold text-carbon/80 sm:text-2xl">
            Pousse plus de <span className="text-violet">watts</span> et deviens{" "}
            <span className="text-violet">durable</span>
          </p>

          <div className="relative mt-10 inline-flex items-center">
            <ButtonLink
              href="/quiz"
              withArrow
              pulse
              className="!text-white px-8 py-4 text-base uppercase tracking-wide"
            >
              Deviens rapide
            </ButtonLink>

            {/* Annotation griffonnée, desktop uniquement — ancrée en haut,
                au niveau du centre vertical du bouton, et grandit vers le bas. */}
            <div className="pointer-events-none absolute left-full top-1/2 ml-3 hidden w-64 items-start gap-2 lg:flex">
              <svg viewBox="0 0 80 60" fill="none" className="mt-1 h-8 w-14 flex-shrink-0 text-carbon/50">
                <path
                  d="M66 46C50 48 26 42 13 15"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M23 17L13 15L17 26"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <p className="font-script text-center text-xl leading-snug text-carbon/60">
                Clique ici pour découvrir ton profil et suivre une stratégie
                d'entraînement adaptée.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Teasers ── */}
      <Container className="flex flex-col gap-14 py-12 sm:gap-20 sm:py-20">
        {teasers.map((teaser, index) => (
          <div key={teaser.title} className="contents">
            <section className="flex flex-col gap-8 md:flex-row md:items-center">
              <div
                className={cn(
                  "relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-2xl bg-surface sm:max-w-sm md:w-2/5",
                  teaser.imageSide === "right" && "md:order-2",
                )}
              >
                <Image
                  src={teaser.image}
                  alt={teaser.imageAlt}
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className={cn(
                    "object-cover",
                    teaser.image.endsWith(".svg") && "object-contain p-12",
                  )}
                />
              </div>

              <div className="w-full md:w-3/5">
                <h2 className="font-display text-3xl italic sm:text-4xl">
                  {teaser.title}
                </h2>
                {teaser.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="mt-4 text-base leading-relaxed text-carbon/70">
                    {paragraph}
                  </p>
                ))}
                {teaser.cta && (
                  <div className="mt-6">
                    <ButtonLink href={teaser.cta.href} variant="outline" withArrow>
                      {teaser.cta.label}
                    </ButtonLink>
                  </div>
                )}
              </div>
            </section>

            {/* Bandeaux stats + chaîne YouTube, juste après l'histoire */}
            {index === 0 && (
              <>
                <StatsBand />
                <ChannelBand />
              </>
            )}
          </div>
        ))}
      </Container>
    </>
  );
}

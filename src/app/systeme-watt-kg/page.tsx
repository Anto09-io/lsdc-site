import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VideoEmbed from "@/components/VideoEmbed";

export const metadata: Metadata = {
  title: "Méthode Watt/kg — Deviens un cycliste puissant et durable",
  description:
    "Deviens un cycliste puissant et durable en appliquant un principe scientifique simple. L'ebook Méthode Watt/kg, offre spéciale 29 € au lieu de 49 €.",
  alternates: { canonical: "/systeme-watt-kg" },
};

// Page de vente de l'ebook « La Méthode Watt/kg » — un seul produit, un seul
// prix (29 € au lieu de 49 €). Style repris de la landing JustPush
// (templates/just-push-prevente-template.html) : Inter en graisses fortes,
// eyebrows en capitales espacées, cartes arrondies, FAQ en <details>.

const STRIPE_URL = "https://buy.stripe.com/6oU8wQ8Jf2D97V2ahtbo40i";

const TRUST = [
  { icon: "youtube", num: "23 681", label: "Abonnés YouTube" },
  { icon: "envelope", num: "10 276", label: "Lecteurs newsletter" },
  { icon: "users", num: "+2 700", label: "Cyclistes formés à la méthode" },
  { icon: "calendar", num: "5 ans", label: "De vulgarisation scientifique" },
] as const;

const TESTIMONIALS = [
  {
    name: "Brice",
    date: "2 oct. 2025",
    quote:
      "Méthode simple, claire et facile à utiliser. En terme de résultat, +20w FTP, durabilité largement accrue (+30/40w en col sur des cyclosportives de montagne, Pmax égalée après 180km, +50w sur 4h...). Sensation de facilité sur tous les efforts sous FTP.",
  },
  {
    name: "Esteban",
    date: "15 sept. 2025",
    quote:
      "Je suis actuellement compétiteur de XCO en junior 2. Avant de rejoindre la méthode je passais trop de temps en Z3 et j'étais donc tout le temps fatigué. Après avoir rejoint la méthode je suis passé de 6 à 10h d'entraînement hebdomadaire sans difficulté. J'ai également gagné 20w sur mon test 6min en moins d'un mois !!! Et mes sorties d'endurance sont passées de 2h30 à 4h…",
  },
  {
    name: "Jean-Pierre",
    date: "15 déc. 2025",
    quote:
      "Je suis un coureur de 60 ans en Access 1. En suivant la méthode Watts/Kg, j'ai remis en place de la régularité dans mes entraînements pour cumuler des KJ, 3x de HT et deux routes par semaine. […] Ma FTP est remontée de 270 à 290W sans forcément faire des efforts intenses. Mes séances d'endurance sont passées de 165 à 195w de moyenne sur 4 à 6h sans dérive cardiaque.",
  },
];

// Extraits des meilleurs avis du site (src/data/temoignages.json), affichés
// juste au-dessus du bon de commande. Coupes marquées par […].
const CHECKOUT_TESTIMONIALS = [
  {
    name: "Florian",
    context: "Cycliste amateur",
    result: "280 → 330 W de FTP",
    quote:
      "J'avais aucune connaissance de comment m'entraîner, je roulais tout le temps à fond. Avec ta méthode je sais exactement quoi faire à quel moment. J'ai explosé tous mes records de puissance, en passant par exemple de 280 W à 330 W de FTP.",
  },
  {
    name: "Nicolas",
    context: "53 ans · FFC Open 2",
    result: "+11 % de FTP (328 W)",
    quote:
      "À 53 ans, la Méthode Watts/kg m'a permis de continuer à évoluer et performer en FFC catégorie Open 2. Augmentation de ma FTP +11 % (328 W), du temps de soutien en HI +20 %, de ma VO2 +15 %, diminution de la masse grasse, meilleure récupération.",
  },
  {
    name: "Thibaut",
    context: "Ancien compétiteur cadet",
    result: "+0,6 W/kg en 4 mois",
    quote:
      "Je roulais pour le plaisir et j'avais atteint un plateau depuis des années. Depuis la méthode Watt/kg : des sensations jamais connues auparavant, beaucoup moins de fatigue. Je suis passé de 331 W sur 4' à 346 W sur 10', soit un gain de 0,6 W/kg en seulement 4 mois.",
  },
  {
    name: "Michel",
    context: "41 ans · reprise après 15 ans",
    result: "166 → 205 W de FTP",
    quote:
      "J'avais laissé tomber le vélo depuis plus de 15 ans. Début 2025, j'ai repris avec la méthode watt/kg : 166 W de FTP au départ, 205 W aujourd'hui. Sur l'Alsacienne, 21e sur 165, et dans le dernier col je ne me suis pas fait doubler une seule fois.",
  },
  {
    name: "Bertrand",
    context: "43 ans · courses Access",
    result: "+20 W · 2 podiums",
    quote:
      "J'utilise la méthode W/kg depuis avril. […] J'ai gagné une vingtaine de watts de FTP, perdu 2 kg et je suis moins fatigué. Cette année, top 5 sur mes deux courses Access et deux podiums en catégorie d'âge en cyclosportives.",
  },
  {
    name: "Fred",
    context: "59 ans · sorties de groupe",
    result: "Ne fait plus attendre le groupe",
    quote:
      "Après une légère augmentation du volume, les résultats ont vite grimpé en flèche : moyenne horaire, puissance moyenne et sensations. Roulant souvent avec plus costauds que moi, dorénavant je ne fais plus attendre le groupe et je rentre des sorties sans être épuisé.",
  },
];

const CURRICULUM = [
  "Les fondations de la méthode, pourquoi ça fonctionne ?",
  "Relance ta progression en 3 étapes",
  "Maîtrise l'art de la planification hebdomadaire",
  "Sélectionne tes séances et l'exécution élite",
  "La gestion de la charge d'entraînement et de ta progression",
  "L'atteinte du pic de forme",
  "La récupération et la nutrition",
  "Les secrets de la progression sur le long terme",
  "Le mental",
  "Les boosters de progression",
];

const STEPS = [
  {
    title: "Étudie la méthode watt/kg",
    desc: "Tu vas étudier l'intégralité du processus d'entraînement. Rien n'a été laissé au hasard.",
  },
  {
    title: "Réalise tes tests de performance",
    desc: "Réalise les tests afin de calibrer tes zones d'entraînement de la bonne manière.",
  },
  {
    title: "Planifie ta première semaine",
    desc: "En suivant la méthode, tu calibres ta première semaine d'entraînement. C'est le premier pas de ta transformation.",
  },
  {
    title: "Analyse tes résultats",
    desc: "Analyse les résultats de ta première semaine et réajuste ton plan selon la méthode. Un entraînement qui marche est une succession de semaines réussies, rien de plus, rien de moins.",
  },
  {
    title: "Place ta progression sur auto-pilote",
    desc: "Après quelques semaines, tu maîtrises pleinement la méthode : ta progression est sur autopilote. Tu peux utiliser les boosters de progression à l'approche des compétitions.",
  },
  {
    title: "Reste consistant et profite",
    desc: "À ce moment-là, ton seul objectif est de rester régulier dans ta pratique tout en profitant de ton nouveau palier de performance.",
  },
];

const FOR_YOU = [
  ["Tu as un capteur de puissance", "et tu veux enfin l'utiliser à 100 %, pas seulement regarder des chiffres."],
  ["Tu stagnes depuis des mois", "malgré des heures de selle, et tu veux comprendre pourquoi."],
  ["Tu veux gagner 20, 30, 50 W", "sans sacrifier ta vie perso ni être épuisé au quotidien."],
  ["Master, compétiteur ou loisir :", "la méthode s'adapte à ton niveau et à ton volume d'entraînement."],
];

const NOT_FOR_YOU = [
  ["Tu cherches un plan tout fait", "à suivre aveuglément, sans comprendre ce que tu fais."],
  ["Tu veux des résultats sans régularité :", "la méthode marche si tu l'appliques semaine après semaine."],
  ["Tu n'as pas envie de lire", "81 pages qui vont transformer ta vision de l'entraînement."],
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Est-ce que c'est un cours vidéo ? Un ebook ?",
    a: "Un ebook au format PDF de 81 pages, en 9 sections. Tu y accèdes immédiatement après le paiement, tu le lis sur ton téléphone, ta tablette ou ton ordinateur, et il est à toi à vie.",
  },
  {
    q: "Combien de pages fait l'ebook ?",
    a: "81 pages, sans remplissage. Chaque section correspond à une étape du processus : les fondations, la planification de ta semaine, le choix des séances, la gestion de la charge, le pic de forme, la récupération et la nutrition, le long terme, le mental, et les protocoles boosters.",
  },
  {
    q: "Je suis en catégorie master, est-ce que la méthode watt/kg est faite pour moi ?",
    a: "Oui. L'âge moyen des cyclistes qui suivent la méthode est de 48 ans. La méthode repose sur une dose de stress adaptée à ce que ton corps tolère, pas sur des séances à s'arracher les jambes. Avec la bonne charge, la bonne récupération et une nutrition correcte, on progresse encore à 50 ou 60 ans, mes clients le prouvent chaque saison.",
  },
  {
    q: "Je suis compétiteur, est-ce que c'est fait pour moi ?",
    a: "Oui, si tu veux passer un cap durable. La méthode décrit 5 paliers de progression jusqu'aux 1 000 h par an, le passage du modèle polarisé au modèle pyramidal, la préparation du pic de forme, et les protocoles boosters (30/15 de Rønnestad, périodisation par blocs, force lourde) pour faire exploser ton profil de puissance record avant les objectifs.",
  },
  {
    q: "Je pratique pour le loisir, est-ce que c'est fait pour moi ?",
    a: "Oui. Les deux premiers paliers de la méthode s'adressent justement aux cyclistes qui roulent pour le plaisir : rouler régulièrement, garder 80 % de structure pour 20 % de liberté, et sentir des progrès sans transformer ta passion en corvée. Le processus est l'objectif, les résultats viennent avec.",
  },
  {
    q: "Est-ce que ça prend du temps de suivre la méthode ?",
    a: "Non, elle rentabilise le temps que tu as déjà. Tu planifies ta semaine en 10 minutes le dimanche, puis tu exécutes. Sept séances de 1 h 30 valent mieux que trois de 3 h : la méthode t'apprend à répartir ta charge sur les heures dont tu disposes, que ce soit 6 ou 12 h par semaine.",
  },
  {
    q: "Combien de temps pour voir des résultats ?",
    a: "Les premières sensations arrivent en quelques semaines, le premier palier de forme après 8 semaines d'entraînement régulier et bien dosé. En appliquant correctement les principes, l'objectif est +0,5 W/kg en 3 mois : c'est ce que j'ai fait moi-même en passant de 5,1 à 5,7 W/kg sur 20 minutes.",
  },
  {
    q: "Est-ce qu'il y a besoin d'un capteur de puissance ?",
    a: "Il est fortement recommandé : la métrique centrale de la méthode est ta charge en kilojoules, qu'un capteur mesure directement. Sans capteur, tu peux démarrer avec les heures de selle, la fréquence cardiaque et le ressenti, mais pour exploiter la méthode à 100 % et calibrer tes séances, le capteur fait la différence.",
  },
  {
    q: "J'ai déjà suivi des plans d'entraînement gratuits, en quoi cette méthode est différente ?",
    a: "Un plan te dit quoi faire pendant 8 semaines, puis tu es seul. La méthode t'apprend pourquoi ça marche : comment doser ta charge, distribuer tes intensités, gérer ta fatigue et adapter ta semaine à ta vie. Tu deviens capable de construire tes propres plans, saison après saison. Aucun secret, aucune magie, juste les principes de base maîtrisés.",
  },
];

/* ── Icônes SVG inline (remplacent Font Awesome du template) ── */
const ICONS: Record<string, React.ReactNode> = {
  youtube: (
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l6 3.1-6 3.1Z" />
  ),
  envelope: (
    <path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 3.2V18h18V7.2l-9 6-9-6ZM4.4 6l7.6 5.1L19.6 6H4.4Z" />
  ),
  users: (
    <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-7 1.7-7 4v2h14v-2c0-2.3-3.7-4-7-4Zm8-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-.6 0-1.2.1-1.8.2 1.7 1 2.8 2.4 2.8 3.8v2h6v-2c0-2.2-3.5-4-7-4Z" />
  ),
  calendar: (
    <path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2Zm13 8H4v10h16V10ZM6 12h4v4H6v-4Z" />
  ),
  check: <path d="M20.3 5.7 9 17 3.7 11.7l1.4-1.4L9 14.2 18.9 4.3l1.4 1.4Z" />,
  x: <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3 1.4 1.4Z" />,
  book: (
    <path d="M4 3h13a3 3 0 0 1 3 3v15H7a3 3 0 0 1-3-3V3Zm2 2v11.2A3 3 0 0 1 7 16h11V6a1 1 0 0 0-1-1H6Zm1 13a1 1 0 0 0 0 2h11v-2H7Z" />
  ),
  infinity: (
    <path d="M18.2 7A5 5 0 0 0 14.7 8.5L12 11.2 9.3 8.5a5 5 0 1 0 0 7L12 12.8l2.7 2.7a5 5 0 1 0 3.5-8.5Zm-10.4 7a3 3 0 1 1 0-4.2L10 12l-2.2 2.1Zm10.4.1a3 3 0 0 1-2.1-.9L14 12l2.1-2.1a3 3 0 1 1 2.1 5.1Z" />
  ),
  lock: (
    <path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm3 8V7a3 3 0 1 0-6 0v3h6Z" />
  ),
  bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  arrow: <path d="M12 4l-1.4 1.4 5.6 5.6H3v2h13.2l-5.6 5.6L12 20l8-8-8-8Z" />,
};

function Icon({ name, className = "h-4 w-4" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      {ICONS[name]}
    </svg>
  );
}

/* ── Briques de style (reprises du template) ── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3.5 inline-block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-violet">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-[clamp(1.6rem,4vw,2.4rem)] font-black leading-[1.15] tracking-[-0.02em] text-carbon">
      {children}
    </h2>
  );
}

function Accent({ children }: { children: React.ReactNode }) {
  return <span className="italic text-violet">{children}</span>;
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle>{title}</SectionTitle>
      {sub && <p className="mt-3.5 text-base leading-relaxed text-carbon/60">{sub}</p>}
    </div>
  );
}

const BTN =
  "inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-extrabold leading-tight transition-all duration-150";
const BTN_PRIMARY =
  BTN +
  " bg-carbon text-paper shadow-[0_14px_40px_-10px_rgba(11,11,12,0.45)] hover:-translate-y-0.5 hover:bg-violet hover:shadow-[0_14px_40px_-10px_rgba(159,1,255,0.5)]";

function Cta({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <a href="#offre" className={BTN_PRIMARY + " w-full animate-pulse-glow motion-reduce:animate-none sm:w-auto"}>
        {children} <Icon name="arrow" />
      </a>
      {note && <p className="text-[0.78rem] text-carbon/45">{note}</p>}
    </div>
  );
}

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={"px-4 py-14 sm:px-5 sm:py-[72px] " + className}>
      <div className="mx-auto max-w-[1100px]">{children}</div>
    </section>
  );
}

export default function MethodeWattKgPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="mx-auto max-w-[1000px] px-4 pb-12 pt-8 text-center sm:px-5 sm:pb-14">
        <span className="mb-5 inline-block rounded-full border border-violet/30 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-violet">
          Pour les cyclistes amateurs qui refusent de stagner
        </span>
        <h1 className="mx-auto font-sans text-[clamp(1.6rem,4.2vw,2.625rem)] font-black leading-[1.15] tracking-[-0.02em] text-carbon">
          <span className="block md:whitespace-nowrap">
            Deviens un Cycliste <span className="text-violet">Puissant et Durable</span>
          </span>
          <span className="block md:whitespace-nowrap">
            En appliquant un <span className="text-violet">Principe Scientifique</span> simple
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-[clamp(0.95rem,2.2vw,1.1rem)] leading-relaxed text-carbon/60">
          <span aria-hidden>👇</span> Suis ce processus d'entraînement pour gagner 20, 30, 50 W sur
          l'ensemble de ton PPR. Regarde la vidéo pour découvrir la Méthode Watt/kg{" "}
          <span aria-hidden>👇</span>
        </p>
        <Link
          href="/temoignages"
          className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-carbon/40 underline-offset-4 transition-colors hover:text-violet hover:underline"
        >
          <span className="text-violet">★★★★★</span> — +109 témoignages
        </Link>

        <div className="mx-auto mt-7 max-w-[760px] overflow-hidden rounded-[20px] shadow-[0_30px_80px_-20px_rgba(11,11,12,0.35)]">
          <VideoEmbed youtubeId="lEZUs6JQYWg" title="La Méthode Watt/kg — présentation" />
        </div>

        <div className="mt-8">
          <Cta note="49 € → 29 € · Paiement unique · Accès immédiat · PDF à vie">
            Je veux la Méthode Watt/kg à 29 €
          </Cta>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="border-y border-carbon/10 bg-surface px-4 py-8 sm:px-5 sm:py-9">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-6 text-[0.95rem] text-carbon/60">
            Par <strong className="font-bold text-carbon">La Science du Cyclisme</strong> — établie
            depuis 2021
          </p>
          <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-violet/10 text-violet">
                  <Icon name={t.icon} className="h-5 w-5" />
                </div>
                <div className="text-[1.15rem] font-extrabold tracking-[-0.01em] text-carbon">
                  {t.num}
                </div>
                <div className="text-[0.78rem] leading-snug text-carbon/60">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREUVE SOCIALE ── */}
      <Section>
        <SectionHead
          eyebrow="Les résultats"
          title={
            <>
              Oui, ça marche <Accent>vraiment.</Accent>
            </>
          }
          sub="Voici les résultats des cyclistes qui ont suivi la Méthode Watt/kg™."
        />

        <div className="mx-auto max-w-[720px] rounded-[20px] border border-carbon/10 bg-surface p-5 sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/methode-watt-kg/comparatif-avant.jpg"
                  alt="Avant — septembre 2024"
                  fill
                  sizes="(max-width: 640px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.12em] text-carbon/40">
                Septembre 2024
              </p>
            </div>
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 ring-violet">
                <Image
                  src="/images/methode-watt-kg/comparatif-apres.jpg"
                  alt="Après — décembre 2024"
                  fill
                  sizes="(max-width: 640px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.12em] text-violet">
                Décembre 2024
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
            <div className="text-center">
              <p className="text-2xl font-black tracking-tight text-carbon sm:text-3xl">352 W</p>
              <p className="mt-1 text-xs text-carbon/50">Test 20 min · 69 kg</p>
              <p className="mt-0.5 text-xs text-carbon/50">5,1 W/kg</p>
            </div>
            <Icon name="arrow" className="h-7 w-7 text-violet sm:h-9 sm:w-9" />
            <div className="text-center">
              <p className="text-2xl font-black tracking-tight text-violet sm:text-3xl">
                375 W <span className="text-base font-bold">+23 W</span>
              </p>
              <p className="mt-1 text-xs text-carbon/50">Test 20 min · 65,8 kg</p>
              <p className="mt-0.5 text-xs font-semibold text-violet">5,7 W/kg (+0,6 W/kg)</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-[20px] border border-carbon/10 bg-surface p-6 transition-colors hover:border-violet/50"
            >
              <p className="text-sm text-violet">★★★★★</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-carbon/70">{t.quote}</p>
              <p className="mt-4 text-sm font-bold text-carbon">{t.name}</p>
              <p className="text-xs text-carbon/40">{t.date}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── LE LIVRE ── */}
      <Section className="border-y border-carbon/10 bg-surface">
        <SectionHead
          eyebrow="Ce que tu obtiens"
          title={
            <>
              Un ebook. <Accent>Une méthode complète.</Accent>
            </>
          }
          sub="La partie théorique pour transformer ta vision de l'entraînement et débloquer tes 3 leviers de progression."
        />

        <div className="mx-auto grid max-w-[900px] items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-sm">
            <Image
              src="/images/methode-watt-kg/ebook-cover.jpg"
              alt="Ebook La Méthode Watt/kg"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-contain drop-shadow-[0_30px_40px_rgba(11,11,12,0.25)]"
            />
          </div>

          <div>
            <p className="mb-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.15em] text-violet">
              PDF · 81 pages · 9 sections
            </p>
            <h3 className="font-sans text-2xl font-extrabold tracking-[-0.01em] text-carbon">
              L'ebook Méthode Watt/kg™
            </h3>
            <p className="mt-3 leading-relaxed text-carbon/60">
              Le cœur de la méthode. 9 sections, 0 détour : chaque étape te permet de remettre ton
              entraînement sur les rails en débloquant des % de progression.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Créer tes plans d'entraînement",
                "Pulvériser tes chronos en bosse et sur le plat",
                "Utiliser ton capteur de puissance à 100 %",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[0.95rem] font-semibold text-carbon">
                  <span className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Cta note="49 € → 29 € · Accès immédiat">Obtenir la méthode à 29 €</Cta>
        </div>
      </Section>

      {/* ── CURRICULUM ── */}
      <Section>
        <SectionHead
          eyebrow="Le curriculum"
          title={
            <>
              Tout ce qu'il y a <Accent>à l'intérieur</Accent>
            </>
          }
          sub="Un parcours étape par étape pour t'amener à ton meilleur niveau physique en 2026."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CURRICULUM.map((title, i) => (
            <article
              key={title}
              className="relative rounded-[20px] border border-carbon/10 bg-surface px-6 pb-6 pt-8 transition-all hover:-translate-y-1 hover:border-violet"
            >
              <span className="absolute -top-3.5 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-violet text-[0.85rem] font-black text-paper">
                {i}
              </span>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-carbon/40">
                Partie {i}
              </p>
              <h3 className="mt-1.5 font-sans text-[1.05rem] font-extrabold leading-snug tracking-[-0.01em] text-carbon">
                {title}
              </h3>
            </article>
          ))}
        </div>
      </Section>

      {/* ── ÉTAPES ── */}
      <Section className="border-y border-carbon/10 bg-surface">
        <SectionHead
          eyebrow="Comment ça marche"
          title={
            <>
              Voici comment tu vas gagner <Accent>+0,5 W/kg</Accent> de FTP en 2026/2027
            </>
          }
        />

        <div className="mx-auto grid max-w-[960px] gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-violet text-sm font-black text-paper">
                {i + 1}
              </div>
              <div>
                <h4 className="font-sans text-[0.98rem] font-extrabold leading-snug text-carbon">
                  {s.title}
                </h4>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-carbon/60">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[700px] rounded-[14px] border border-violet/25 bg-violet/5 p-5 text-center text-[0.92rem] leading-relaxed text-carbon/70">
          Ce n'est pas de l'ingénierie spatiale — c'est une méthode simple qui demande à être
          exécutée. <strong className="text-carbon">Tu appliques. Tu progresses.</strong> Il n'y a pas
          de hasard.
        </div>

        <div className="mt-10">
          <Cta note="49 € → 29 € · Accès immédiat">Obtenir la méthode à 29 €</Cta>
        </div>
      </Section>

      {/* ── POUR TOI / PAS POUR TOI ── */}
      <Section>
        <SectionHead
          eyebrow="Avant d'acheter"
          title={
            <>
              C'est <Accent>pour toi</Accent> si…
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <div className="rounded-[20px] border border-carbon/10 bg-surface p-6 sm:p-8">
            <h3 className="mb-5 flex items-center gap-2.5 font-sans text-[1.1rem] font-extrabold text-green-600">
              <Icon name="check" className="h-5 w-5" /> La méthode est pour toi si :
            </h3>
            <ul className="flex flex-col gap-3.5">
              {FOR_YOU.map(([strong, rest]) => (
                <li key={strong} className="flex gap-3 text-[0.94rem] leading-relaxed">
                  <span className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-carbon/60">
                    <strong className="font-bold text-carbon">{strong}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border border-carbon/10 bg-surface p-6 sm:p-8">
            <h3 className="mb-5 flex items-center gap-2.5 font-sans text-[1.1rem] font-extrabold text-red-500">
              <Icon name="x" className="h-5 w-5" /> Ce n'est pas pour toi si :
            </h3>
            <ul className="flex flex-col gap-3.5">
              {NOT_FOR_YOU.map(([strong, rest]) => (
                <li key={strong} className="flex gap-3 text-[0.94rem] leading-relaxed">
                  <span className="mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
                    <Icon name="x" className="h-3 w-3" />
                  </span>
                  <span className="text-carbon/60">
                    <strong className="font-bold text-carbon">{strong}</strong> {rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── OFFRE (encadré prix unique) ── */}
      <Section id="offre" className="scroll-mt-4 border-t border-carbon/10 bg-gradient-to-b from-paper to-surface">
        <SectionHead
          eyebrow="Offre spéciale rentrée 2026"
          title={
            <>
              Rejoins les cyclistes <Accent>en pleine progression</Accent>
            </>
          }
          sub={
            <Link
              href="/temoignages"
              className="underline-offset-4 transition-colors hover:text-violet hover:underline"
            >
              <span className="text-violet">★★★★★</span> — +109 témoignages
            </Link>
          }
        />

        {/* Meilleurs avis, juste avant le bon de commande */}
        <div className="mx-auto mb-10 max-w-[1000px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKOUT_TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-[16px] border border-carbon/10 bg-paper p-5"
              >
                <span className="inline-block self-start rounded-full bg-violet/10 px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-violet">
                  {t.result}
                </span>
                <blockquote className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-carbon/70">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-3 text-xs">
                  <span className="text-violet">★★★★★</span>{" "}
                  <span className="font-bold text-carbon">{t.name}</span>
                  <span className="text-carbon/40"> · {t.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-center text-sm">
            <Link
              href="/temoignages"
              className="font-semibold text-violet underline-offset-4 hover:underline"
            >
              Voir les +109 témoignages →
            </Link>
          </p>
        </div>

        <div className="mx-auto max-w-[520px] rounded-[20px] border border-violet bg-paper p-6 shadow-[0_30px_80px_-20px_rgba(159,1,255,0.25)] sm:p-8">
          <h3 className="text-center font-sans text-[1.6rem] font-black leading-tight tracking-[-0.02em] text-carbon sm:text-[1.9rem]">
            Ce que tu reçois
          </h3>

          <ul className="mt-5 flex flex-col">
            <li className="flex items-center justify-between gap-4 border-b border-dashed border-carbon/15 py-2.5 text-[0.92rem]">
              <span className="flex items-center gap-2.5 font-semibold text-carbon">
                <Icon name="book" className="h-4 w-4 flex-shrink-0 text-violet" />
                <span>
                  L'ebook Méthode Watt/kg™
                  <span className="block text-[0.78rem] font-normal text-carbon/50">
                    Format PDF · 81 pages · 9 sections
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap text-[0.85rem] font-bold text-carbon/60">valeur 49 €</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-dashed border-carbon/15 py-2.5 text-[0.92rem]">
              <span className="flex items-center gap-2.5 font-semibold text-carbon">
                <Icon name="bolt" className="h-4 w-4 flex-shrink-0 text-violet" /> Conférence FAQ sur la méthode
              </span>
              <span className="whitespace-nowrap text-[0.85rem] font-bold text-carbon/60">inclus</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-dashed border-carbon/15 py-2.5 text-[0.92rem]">
              <span className="flex items-center gap-2.5 font-semibold text-carbon">
                <Icon name="lock" className="h-4 w-4 flex-shrink-0 text-violet" /> Accès immédiat après paiement
              </span>
              <span className="whitespace-nowrap text-[0.85rem] font-bold text-carbon/60">inclus</span>
            </li>
            <li className="flex items-center justify-between gap-4 py-2.5 text-[0.92rem]">
              <span className="flex items-center gap-2.5 font-semibold text-carbon">
                <Icon name="infinity" className="h-4 w-4 flex-shrink-0 text-violet" /> Accès illimité à vie
              </span>
              <span className="whitespace-nowrap text-[0.85rem] font-bold text-carbon/60">inclus</span>
            </li>
          </ul>

          <div className="mt-5 border-t-2 border-carbon/10 pt-5 text-center">
            <div className="text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-violet">
              Offre spéciale
            </div>
            <div className="mt-1.5 flex items-baseline justify-center gap-3">
              <span className="text-[clamp(2.4rem,6vw,3.2rem)] font-black leading-none tracking-[-0.02em] text-violet">
                29 €
              </span>
              <span className="text-[1.35rem] font-black text-carbon/35 line-through">49 €</span>
            </div>
            <div className="mt-2 text-[0.85rem] text-carbon/60">
              Paiement unique · Accès immédiat · Format PDF
            </div>
            <div className="mt-1 text-[0.82rem] font-bold text-violet">
              Soit 20 € de réduction sur le prix normal
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-2.5">
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={BTN_PRIMARY + " w-full animate-pulse-glow motion-reduce:animate-none"}
            >
              Obtenir la méthode à 29 € <Icon name="arrow" />
            </a>
            <p className="text-center text-[0.76rem] text-carbon/45">
              Paiement sécurisé par Stripe · Tu reçois le PDF par email dans la minute
            </p>
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section>
        <SectionHead
          eyebrow="Foire aux questions"
          title={
            <>
              Tes <Accent>questions</Accent>, mes réponses
            </>
          }
          sub={
            <>
              Une autre question ? Écris à{" "}
              <a href="mailto:anto.albouy@gmail.com" className="font-semibold text-violet hover:underline">
                anto.albouy@gmail.com
              </a>
            </>
          }
        />

        <div className="mx-auto max-w-[760px]">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group mb-3 rounded-[14px] border border-carbon/10 bg-surface transition-colors open:border-carbon/25"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[0.95rem] font-bold text-carbon sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet text-sm font-bold leading-none text-paper transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-[0.93rem] leading-relaxed text-carbon/60 sm:px-6">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* ── CTA FINAL ── */}
      <section className="border-t border-carbon/10 bg-surface px-4 py-16 text-center sm:px-5 sm:py-20">
        <h2 className="mx-auto max-w-[720px] font-sans text-[clamp(1.6rem,4vw,2.4rem)] font-black leading-[1.15] tracking-[-0.02em] text-carbon">
          Ta progression <Accent>commence ici.</Accent>
        </h2>
        <p className="mx-auto mb-7 mt-4 max-w-[540px] text-base text-carbon/60">
          Rejoins les cyclistes qui appliquent la Méthode Watt/kg et débloque ton prochain palier de
          performance.
        </p>
        <Cta note="49 € → 29 € · Paiement unique · Accès immédiat · PDF à vie">
          Obtenir la méthode à 29 €
        </Cta>
      </section>

      {/* ── FOOTER minimal ── */}
      <footer className="border-t border-carbon/10 bg-surface px-4 pb-24 pt-8 text-center text-[0.8rem] text-carbon/40">
        <p>© {new Date().getFullYear()} La Science du Cyclisme · Tous droits réservés</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[0.78rem]">
          <Link href="/" className="hover:text-carbon">
            Site LSDC
          </Link>
          <Link href="/mentions-legales" className="hover:text-carbon">
            Mentions légales
          </Link>
          <Link href="/cgv" className="hover:text-carbon">
            CGV
          </Link>
        </div>
      </footer>

      {/* ── Bouton flottant « Rejoindre » ── */}
      <a
        href="#offre"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-carbon px-5 py-3.5 text-sm font-extrabold text-paper shadow-[0_8px_28px_rgba(11,11,12,0.35)] transition-all hover:-translate-y-0.5 hover:bg-violet motion-safe:animate-pulse-glow sm:bottom-6 sm:right-6 sm:px-6 sm:text-base"
      >
        Rejoindre <Icon name="arrow" className="h-4 w-4" />
      </a>
    </>
  );
}

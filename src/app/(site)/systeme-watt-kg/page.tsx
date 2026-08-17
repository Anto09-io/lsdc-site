import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import VideoEmbed from "@/components/VideoEmbed";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Méthode Watt/Kg",
  description:
    "La méthode watt/kg : le programme d'entraînement basé sur la science pour gagner des watts et rouler plus vite, durablement.",
  alternates: { canonical: "/systeme-watt-kg" },
};

// ⚠️ Contenu porté depuis la page de vente Kajabi existante (PDF fourni par
// Antonin). Les réponses FAQ et le détail du curriculum sont en attente du
// texte réel (accordéons non capturés dans l'export PDF) — placeholders
// clairement marqués ci-dessous, à remplacer.

const FEATURES = [
  "Créer tes stratégies de course",
  "Pulvériser tes chronos en bosse",
  "Pour utiliser ton capteur de puissance à 100%",
];

const TESTIMONIALS = [
  {
    name: "Brice",
    date: "2 oct. 2025",
    quote:
      "Méthode simple, claire et facile à utiliser. En terme de résultat, +20w FTP, durabilité largement accrue (+30/40w en col sur des cyclosportives de montagne, Pmax égalée après 180km, +50w sur 4h...). Sensation de facilité sur tous les efforts sous FTP.",
  },
  {
    name: "Arthur Genty",
    date: "18 sept. 2025",
    quote:
      "Bonjour Antonin, je pratique le cyclisme depuis 3 ans maintenant avec mes 2 premières années en dent de scie. La dernière année j'ai commencé à suivre la formation « L'ascension », en moins d'un an j'ai gagné près de 50w sur ma FTP et j'ai pris énormément de plaisir sur le vélo. J'ai voulu acheter la méthode watt/kg afin…",
  },
  {
    name: "Esteban",
    date: "15 sept. 2025",
    quote:
      "Je suis actuellement compétiteur de XCO en junior 2. Avant de rejoindre la méthode je passais trop de temps en Z3 et j'étais donc tout le temps fatigué. Après avoir rejoint la méthode je suis passé de 6 à 10h d'entraînement hebdomadaire sans difficulté. J'ai également gagné 20w sur mon test 6min en moins d'un mois !!! Et mes sorties d'endurance sont passées de 2h30 à 4h…",
  },
];

const SYSTEM_TOOLS = [
  {
    title: "Cours vidéo étape par étape",
    desc: "Je t'aide à appliquer la méthode pas à pas en utilisant le logiciel intervals.icu. À la fin du cours tu seras confiant : dans ta capacité à planifier tes séances, maîtriser ton capteur de puissance, tes allures, gérer ta charge d'entraînement, ta nutrition… en suivant les principes de la méthode watt/kg.",
  },
  {
    title: "La librairie de séances intervals",
    desc: "Accède à ma librairie complète de séances scientifiques sur le logiciel intervals.icu. Tu fais glisser les séances dans ton calendrier et tes cibles de puissance sont calculées automatiquement. Tu pourras suivre ta séance en direct sur ton compteur par la suite. (plus de 150 séances pour planifier ton année)",
  },
  {
    title: "Le tracker de performance",
    desc: "Le tracker est un outil qui te permettra de mesurer tes progrès chaque semaine. À partir d'une observation simple, tu pourras faire évoluer ta charge d'entraînement dans la bonne direction. La puissance du système watt/kg réside dans cet outil.",
  },
  {
    title: "Le challenge 60 jours",
    desc: "Je te donne un plan de route à suivre sur 60 jours. Tu appliques la méthode dès demain et tu t'engages à la suivre sur 60j. Pourquoi 60 jours ? Après 8 semaines d'entraînement régulier et de qualité on peut observer un premier palier significatif de forme. Quelle que soit la période de l'année, tu vas passer un cap physique.",
  },
];

const STEPS = [
  {
    title: "Étape 1 : Étudie la méthode watt/kg",
    desc: "Tu vas étudier l'intégralité du processus d'entraînement. Rien n'a été laissé au hasard.",
  },
  {
    title: "Étape 2 : Réalise tes tests de performance",
    desc: "Réalise les tests afin de calibrer tes zones d'entraînement de la bonne manière.",
  },
  {
    title: "Étape 3 : Planifie ta première semaine d'entraînement",
    desc: "En suivant la méthode et en utilisant la bibliothèque de séances, tu vas calibrer ta première semaine. C'est le premier pas de ta transformation.",
  },
  {
    title: "Étape 4 : Analyse tes résultats",
    desc: "Analyse les résultats de ta première semaine, complète ton tracker de performance et réajuste ton plan selon la méthode. Un entraînement qui marche est une succession de semaines réussies, rien de plus, rien de moins.",
  },
  {
    title: "Étape 5 : Place ta progression sur auto-pilote",
    desc: "Après quelques semaines, tu maîtriseras pleinement la méthode et les outils, ta progression est donc sur autopilote. Tu peux réaliser des protocoles boosters lorsque tu souhaites accélérer tes progrès à l'approche des compétitions.",
  },
  {
    title: "Étape 6 : Reste consistant et profite",
    desc: "À ce moment-là, ton seul objectif est de rester régulier et consistant dans ta pratique tout en profitant de ton nouveau palier de performance.",
  },
];

// Contenu détaillé en attente (texte réel à fournir).
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
].map((title, i) => ({
  title: `Partie ${i} : ${title}`,
  content: "Contenu détaillé à venir.",
}));

// Réponses en attente (texte réel à fournir).
const FAQ = [
  "Je suis en catégorie master, est-ce que le système watt/kg est fait pour moi ?",
  "Je suis compétiteur, est-ce que c'est fait pour moi ?",
  "Je pratique pour le loisir, est-ce que c'est fait pour moi ?",
  "Est-ce facile de planifier ses séances sur Intervals.icu ?",
  "Est-ce que c'est un cours vidéo ? Un ebook ?",
  "Est-ce que je peux suivre les séances sur mon compteur ?",
  "Est-ce que ça prend du temps de suivre la méthode ?",
  "Combien de temps pour voir des résultats ?",
  "Est-ce qu'il y a besoin d'un capteur de puissance ?",
  "Combien de pages fait l'ebook ?",
  "J'ai déjà suivi des plans d'entraînement gratuits, en quoi cette méthode est différente ?",
].map((q) => ({ title: q, content: "Réponse à venir." }));

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <ButtonLink
        href="#checkout"
        withArrow
        pulse
        className="w-full px-8 py-4 text-base sm:w-auto"
      >
        {children}
      </ButtonLink>
      <p className="mt-3 text-sm text-cream/40">Parce que je veux gagner des watts cette année.</p>
    </div>
  );
}

export default function SystemeWattKgPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Container className="py-16 text-center sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-cream/40">
          ★★★★★ — +109 témoignages
        </p>
        <p className="mx-auto mt-5 inline-block rounded-full bg-green/10 px-4 py-1.5 text-xs font-semibold text-green">
          Pour les cyclistes amateurs qui refusent de stagner
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl italic leading-tight sm:text-5xl">
          Voici la meilleure méthode pour{" "}
          <span className="text-green">
            gagner des watts et rouler plus vite en 2026
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-cream/60">
          Suis ce processus simple pour gagner 20, 30, 50w en 2026.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <VideoEmbed youtubeId="lEZUs6JQYWg" title="La méthode watt/kg — présentation" />
        </div>

        <div className="mt-10">
          <CtaButton>Oui, je veux rejoindre la méthode watt/kg™</CtaButton>
        </div>
      </Container>

      {/* ── Preuve sociale ── */}
      <Container className="py-16">
        <h2 className="text-center font-display text-3xl italic sm:text-4xl">
          Oui, ça marche <span className="text-green">vraiment.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-cream/60">
          Voici les résultats des cyclistes qui ont suivi la méthode watt/kg™.
        </p>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-surface p-6 ring-1 ring-white/10 sm:p-8">
          <div className="grid grid-cols-2 gap-6">
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
              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wide text-cream/40">
                Septembre 2024
              </p>
            </div>
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 ring-green">
                <Image
                  src="/images/methode-watt-kg/comparatif-apres.jpg"
                  alt="Après — décembre 2024"
                  fill
                  sizes="(max-width: 640px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wide text-cream/40">
                Décembre 2024
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
            <div className="text-center">
              <p className="font-display text-3xl italic text-cream">352 W</p>
              <p className="mt-1 text-xs text-cream/50">Test 20min · Pdc 69 kg</p>
              <p className="mt-1 text-xs text-cream/50">Rapport 5,1 w/kg</p>
            </div>

            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 flex-shrink-0 text-green sm:h-9 sm:w-9">
              <path
                d="M4 12h16m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="text-center">
              <p className="font-display text-3xl italic text-green">
                375 W <span className="text-base">+23w</span>
              </p>
              <p className="mt-1 text-xs text-cream/50">Test 20min · Pdc 65,8 kg</p>
              <p className="mt-1 text-xs text-green">Rapport 5,7 w/kg (+0,6 w/kg)</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
              <p className="text-green">★★★★★</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{t.quote}</p>
              <p className="mt-4 text-xs font-semibold text-cream">{t.name}</p>
              <p className="text-xs text-cream/40">{t.date}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* ── Ce que tu obtiens ── */}
      <Container className="py-16">
        <h2 className="text-center font-display text-3xl italic sm:text-4xl">
          Voici ce que tu obtiens à l'intérieur
        </h2>

        <div className="mx-auto mt-10 max-w-xl text-center">
          <p className="font-display text-2xl italic text-green">1/ La méthode</p>
          <p className="mx-auto mt-2 max-w-md text-cream/60">
            La partie théorique pour transformer ta vision de l'entraînement
            et débloquer tes 3 leviers de progression.
          </p>

          <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-sm">
            <Image
              src="/images/methode-watt-kg/ebook-cover.jpg"
              alt="Ebook La Méthode Watt/KG"
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-contain"
            />
          </div>

          <div className="mt-8 rounded-2xl bg-surface p-6 text-left ring-1 ring-white/10">
            <p className="font-semibold text-cream">L'ebook méthode watt/kg</p>
            <p className="mt-2 text-sm text-cream/60">
              Le cœur de la méthode. 9 sections, 0 détour : chaque étape te
              permet de remettre ton entraînement sur les rails en débloquant
              des % de progression (voir le curriculum plus bas).
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <p className="text-center font-display text-2xl italic text-green">
            2/ Le Système
          </p>
          <p className="mx-auto mt-2 max-w-xl text-center text-cream/60">
            Tous les outils qui te permettront d'appliquer la méthode dès
            demain. Transforme ton savoir en actions concrètes, avec des
            tutoriels vidéo, des séances clé en main, un tracker de
            performance et un challenge.
          </p>

          <div className="relative mx-auto mt-8 aspect-[16/10] w-full max-w-2xl">
            <Image
              src="/images/methode-watt-kg/systeme-mockup.jpg"
              alt="Le Système Watt/KG — cours, librairie de séances, tracker, challenge 60 jours"
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-contain"
            />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {SYSTEM_TOOLS.map((tool, i) => (
              <div key={tool.title} className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                  {i + 1}/
                </p>
                <p className="mt-2 font-semibold text-cream">{tool.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <CtaButton>Oui, je veux rejoindre la méthode watt/kg™</CtaButton>
        </div>
      </Container>

      {/* ── Curriculum ── */}
      <Container className="py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-green/10 px-3.5 py-1.5 text-xs font-semibold text-green">
            Le Curriculum
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl italic sm:text-4xl">
            Un cours étape par étape et des outils pour t'amener à ton
            meilleur niveau physique en 2026.
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <Accordion items={CURRICULUM} />
        </div>

        <div className="mt-10">
          <CtaButton>Oui, je veux rejoindre la méthode watt/kg™</CtaButton>
        </div>
      </Container>

      {/* ── Étapes ── */}
      <Container className="py-16">
        <h2 className="text-center font-display text-3xl italic sm:text-4xl">
          Voici comment tu vas gagner +0,5 w/kg de FTP en 2026
        </h2>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-8">
          {STEPS.map((s) => (
            <div key={s.title}>
              <p className="font-semibold text-cream">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{s.desc}</p>
            </div>
          ))}

          <p className="text-sm leading-relaxed text-cream/60">
            Ce n'est pas de l'ingénierie spatiale — c'est une méthode simple
            qui demande à être exécutée.
            <br />
            Tu appliques. Tu progresses. Il n'y a pas de hasard.
            <br />
            La méthode watt/kg te donne tout pour transformer ton niveau sur
            le vélo, que tu sois débutant ou déjà avancé.
          </p>
        </div>

        <div className="mt-10">
          <CtaButton>Oui, je veux rejoindre la méthode watt/kg™</CtaButton>
        </div>
      </Container>

      {/* ── Checkout : 2 offres ── */}
      <Container id="checkout" className="scroll-mt-8 py-16 md:scroll-mt-[190px]">
        <div className="text-center">
          <span className="inline-block rounded-full bg-green/10 px-3.5 py-1.5 text-xs font-semibold text-green">
            Offre spéciale 2026
          </span>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl italic sm:text-4xl">
            Rejoins les cyclistes en pleine progression
          </h2>
          <p className="mt-3 text-cream/60">★★★★★ — +109 témoignages</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Offre 1 : ebook seul */}
          <div className="flex flex-col rounded-3xl bg-surface p-8 ring-1 ring-white/10">
            <p className="font-display text-xl italic text-cream">Version ebook</p>
            <p className="mt-1 text-xs text-cream/40">Accès immédiat — 20€ de réduction</p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl italic text-cream">29€</span>
              <span className="text-lg text-cream/40 line-through">49€</span>
            </p>

            <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <span className="text-green">★</span> Accès E-Book méthode watt/kg™
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span> Accès immédiat, format .pdf
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span> Conférence FAQ sur la méthode
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span> Accès illimité à vie
              </li>
            </ul>

            <div className="mt-8">
              <ButtonLink
                href="https://lsdc-newsletter-e6a9c4.beehiiv.com/products/la-m-thode-watt-kg"
                external
                variant="outline"
                withArrow
                className="w-full justify-center py-3.5"
              >
                Achète maintenant
              </ButtonLink>
            </div>
          </div>

          {/* Offre 2 : système complet — mise en avant */}
          <div className="relative flex flex-col rounded-3xl bg-surface p-8 ring-2 ring-green">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
              Le plus choisi
            </span>

            <p className="mt-2 font-display text-xl italic text-cream">
              Système watt/kg™
            </p>
            <p className="mt-1 text-xs text-cream/40">Accès immédiat — 50€ de réduction</p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl italic text-green">249€</span>
              <span className="text-lg text-cream/40 line-through">299€</span>
            </p>

            <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <span className="text-green">★</span> Idem version ebook
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span>{" "}
                <span>
                  <strong className="text-cream">Formation vidéo</strong> le
                  Système watt/kg™ pour appliquer la méthode pas à pas
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span>{" "}
                <span>
                  <strong className="text-cream">La librairie de séances scientifiques</strong>{" "}
                  (+150 séances calibrées)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span>{" "}
                <span>
                  <strong className="text-cream">Le fichier de tracking</strong> de progression
                  (format .xlsx)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green">★</span>{" "}
                <span>
                  <strong className="text-cream">Le challenge 60 jours</strong> (obtiens tes
                  premiers résultats en 2 mois)
                </span>
              </li>
              <li className="flex items-start gap-2 pt-2 text-cream/50">
                <span className="text-green">BONUS</span> Appel de coaching 20min, je t'aide à
                appliquer la stratégie
              </li>
              <li className="flex items-start gap-2 text-cream/50">
                <span className="text-green">BONUS</span> 4 guides privés — nutrition de
                l'effort, entraînement 40 ans et +, routine d'échauffement secrète, séance de
                renforcement sans matériel spéciale cycliste
              </li>
            </ul>

            <div className="mt-8">
              <ButtonLink
                href="https://lascienceducyclisme.thrivecart.com/le-systme-wattkg/"
                external
                withArrow
                pulse
                className="w-full justify-center py-3.5 text-base"
              >
                Achète maintenant
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      {/* ── FAQ ── */}
      <Container className="py-16 pb-24">
        <h2 className="text-center font-display text-3xl italic sm:text-4xl">
          <span className="text-green">Questions</span> fréquemment posées
        </h2>
        <p className="mt-3 text-center text-cream/60">
          Une autre question ? Écris à{" "}
          <a href="mailto:anto.albouy@gmail.com" className="text-green hover:underline">
            anto.albouy@gmail.com
          </a>
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <Accordion items={FAQ} />
        </div>
      </Container>
    </>
  );
}

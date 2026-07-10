// Moteur du quiz "Quel est ton profil de cycliste ?", porté depuis
// legacy/profil-cycliste/index.html (copie et formules identiques).

export type Question = {
  id: string;
  title: string;
  hint: string;
  options: { v: string; t: string; d: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: "niveau",
    title: "Tu te décris comment ?",
    hint: "Sois honnête — sans te survendre, ni te sous-estimer.",
    options: [
      { v: "loisir", t: "Cycliste loisir", d: "Je roule pour le plaisir et la forme." },
      { v: "cyclosport", t: "Cyclosportif", d: "Je vise des cyclos / Gran Fondo." },
      { v: "competiteur", t: "Compétiteur", d: "Je cours : route, gravel, piste…" },
      { v: "reprise", t: "En reprise", d: "Je remonte la pente après une coupure." },
    ],
  },
  {
    id: "volume",
    title: "Combien d'heures de vélo par semaine ?",
    hint: "Sur un mois normal, pas ta meilleure semaine.",
    options: [
      { v: "moins3", t: "Moins de 3h", d: "Quelques sorties, sans régularité." },
      { v: "3a6", t: "3 à 6h", d: "Je roule un peu chaque semaine." },
      { v: "6a10", t: "6 à 10h", d: "Entraînement régulier et sérieux." },
      { v: "plus10", t: "Plus de 10h", d: "Gros volume, semaine bien remplie." },
    ],
  },
  {
    id: "contrainte",
    title: "Ce qui limite le plus ton entraînement ?",
    hint: "Le vrai goulot d'étranglement, pas l'excuse facile.",
    options: [
      { v: "temps", t: "Le temps", d: "Peu de créneaux, et souvent courts." },
      { v: "recup", t: "La récupération", d: "J'accumule la fatigue, je récupère mal." },
      { v: "methode", t: "La méthode", d: "Je roule sans vrai plan structuré." },
      { v: "regul", t: "La régularité", d: "J'enchaîne les stop & go." },
    ],
  },
  {
    id: "faiblesse",
    title: "Sur le vélo, où ça coince en premier ?",
    hint: "Le moment où tu sens que tu n'as plus rien.",
    options: [
      { v: "bosse", t: "Dans les bosses", d: "Je passe dans le rouge dès que ça monte." },
      { v: "longue", t: "Sur les sorties longues", d: "Je m'éteins sur la durée." },
      { v: "intense", t: "Sur les efforts intenses", d: "Relances, attaques, seuil." },
      { v: "partout", t: "Un peu partout", d: "Pas de point fort vraiment marqué." },
    ],
  },
  {
    id: "frustration",
    title: "Ce qui te frustre vraiment, c'est…",
    hint: "Sois cash. C'est cette phrase qui tourne dans ta tête.",
    options: [
      { v: "bosse", t: "Me faire lâcher en montée", d: "Dès que la route s'élève, je décroche." },
      { v: "longue", t: "Rentrer cramé", d: "Épuisé sur chaque sortie longue." },
      { v: "course", t: "Exploser au mauvais moment", d: "En course ou sur les relances." },
      { v: "stagne", t: "Stagner malgré tout", d: "Je m'entraîne beaucoup et je plafonne." },
    ],
  },
  {
    id: "trajectoire",
    title: "Sur les 12 derniers mois, ton niveau…",
    hint: "Pas sur la dernière sortie. Sur la durée.",
    options: [
      { v: "progresse", t: "Je progresse", d: "Mais je veux accélérer." },
      { v: "plateau", t: "Je plafonne", d: "Je tourne en rond au même niveau." },
      { v: "regresse", t: "Je recule", d: "Je sens que je perds du terrain." },
      { v: "inconnu", t: "Aucune idée", d: "Je ne mesure rien." },
    ],
  },
  {
    id: "objectif",
    title: "Ton objectif n°1 pour les 6 prochains mois ?",
    hint: "Celui qui compte vraiment pour toi.",
    options: [
      { v: "grimper", t: "Tenir dans les bosses", d: "Sans exploser à chaque montée." },
      { v: "finir", t: "Finir une cyclo / Gran Fondo", d: "Arriver en forme, pas à l'agonie." },
      { v: "courir", t: "Performer en course", d: "Sur les segments ou en peloton." },
      { v: "mieux", t: "Progresser, tout simplement", d: "Me sentir plus fort sur le vélo." },
    ],
  },
  // La perf (poids + puissance) est une étape dédiée, gérée à part.
];

export type Profile = {
  key: string;
  name: string;
  tagline: string;
  diag: string;
  leverTitle: string;
  lever: string;
  angle: string;
};

// Clé = réponse à la question "frustration".
export const PROFILES: Record<string, Profile> = {
  bosse: {
    key: "grimpeur-bride",
    name: "Le Grimpeur Bridé",
    tagline:
      "Le moteur est là. C'est le rapport poids-puissance qui te plafonne en montée.",
    diag: "Tu n'es pas “mauvais en bosse” : tu manques de watts par kilo au seuil. Dès que la pente s'installe, tu dépasses ton seuil sans même le savoir, tu produis trop d'acide trop tôt, et tu exploses pendant que les autres tiennent. Le problème n'est pas ton mental. C'est un nombre : tes W/kg au seuil.",
    leverTitle: "Faire monter tes W/kg au seuil.",
    lever: "Travailler spécifiquement ta puissance au seuil (FTP) et l'alléger en watts/kg — pas rouler plus, rouler juste. C'est le seul levier qui change ce qui se passe quand ça monte.",
    angle: "La Méthode Watt/kg construit exactement ça : faire monter ta puissance au seuil sans noyer tes semaines de volume inutile.",
  },
  longue: {
    key: "fondeur-fragile",
    name: "Le Fondeur Fragile",
    tagline: "Tu as du cœur, mais ton réservoir aérobie se vide trop vite sur la durée.",
    diag: "Tu tiens 1h, parfois 2. Puis le mur. Ce n'est pas un manque de volonté : ta base aérobie et ta capacité à tenir une intensité dans le temps (ta “durability”) ne sont pas assez construites. Tu roules souvent dans une zone grise — trop dur pour de l'endurance, trop mou pour progresser — et ton corps ne sait pas durer.",
    leverTitle: "Construire la base, puis ancrer ton seuil.",
    lever: "Reconstruire une vraie base aérobie ET ancrer ton seuil, pour que ton allure “facile” devienne enfin facile et que la fin de sortie arrête de te coûter cher.",
    angle: "La Méthode Watt/kg t'apprend à doser tes zones et à monter ton seuil pour que la distance arrête de te casser en deux.",
  },
  course: {
    key: "puncheur-court",
    name: "Le Puncheur à Court de Jus",
    tagline: "Tu as du punch sur un coup. Mais tu n'as pas la caisse pour le répéter.",
    diag: "Une relance, ça passe. La troisième, tu es dans le rouge et tu ne reviens plus. Tu as de l'explosivité mais pas la capacité à enchaîner les efforts intenses : ton seuil est trop bas pour “éponger” entre deux coups durs. Résultat, tu te grilles au mauvais moment et la course se décide sans toi.",
    leverTitle: "Élever ton seuil pour pouvoir répéter.",
    lever: "Élever ton seuil pour transformer chaque effort intense en effort “sous-maximal” — plus de marge, plus de répétitions, et la lucidité pour placer ton coup au bon moment.",
    angle: "La Méthode Watt/kg cible ta puissance au seuil : la base qui te permet enfin d'encaisser et de répéter sans te cramer.",
  },
  stagne: {
    key: "travailleur-plafond",
    name: "Le Travailleur au Plafond",
    tagline: "Tu fais les heures. Mais le volume sans direction ne te fait plus progresser.",
    diag: "Tu t'entraînes sérieusement, et c'est précisément ça le piège : tu accumules des kilomètres dans une zone confortable qui ne stresse plus assez ton organisme pour le forcer à s'adapter. Plus de volume, mêmes watts. Tu as atteint le plafond de ce que “rouler plus” peut t'apporter. La suite, c'est rouler mieux.",
    leverTitle: "Structurer autour du seuil, pas du volume.",
    lever: "Arrêter d'empiler du volume gris et structurer ton entraînement autour de ta puissance au seuil — la variable qui détermine vraiment ton niveau à vélo.",
    angle: "La Méthode Watt/kg remplace le volume sans cap par un système clair pour faire remonter tes W/kg et débloquer ton plateau.",
  },
};

export function currentProfile(frustration: string | undefined): Profile {
  return (frustration && PROFILES[frustration]) || PROFILES.stagne;
}

export type WkgBand = { name: string; pos: number };

export function wkgBand(wkg: number | null): WkgBand | null {
  if (wkg == null) return null;
  if (wkg < 2.5) return { name: "Découverte", pos: 8 };
  if (wkg < 3.2) return { name: "Intermédiaire", pos: 32 };
  if (wkg < 3.8) return { name: "Confirmé", pos: 55 };
  if (wkg < 4.5) return { name: "Performant", pos: 75 };
  return { name: "Élite amateur", pos: 93 };
}

export type PowerPoint = { T: number; P: number };
export type PowerLawModel = { E: number; S: number };

// Ajustement log-log de la relation puissance-durée : P(T) = S · T^(E-1).
export function powerLawModel(points: PowerPoint[]): PowerLawModel {
  const xs = points.map((p) => Math.log(p.T));
  const ys = points.map((p) => Math.log(p.P));
  const n = xs.length;
  const sx = xs.reduce((a, b) => a + b, 0);
  const sy = ys.reduce((a, b) => a + b, 0);
  const sxy = xs.reduce((acc, x, i) => acc + x * ys[i], 0);
  const sx2 = xs.reduce((acc, x) => acc + x * x, 0);
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / n;
  return { E: slope + 1, S: Math.exp(intercept) };
}

export function powerAtT(T: number, S: number, E: number): number {
  return S * Math.pow(T, E - 1);
}

export type PhysioProfile = { key: string; label: string; desc: string };

export function physioProfile(E: number): PhysioProfile {
  if (E < 0.88)
    return {
      key: "sprinteur",
      label: "Sprinteur",
      desc: "Ta puissance s'effondre vite avec la durée : gros moteur sur les efforts courts, mais l'endurance est ton chantier.",
    };
  if (E < 0.92)
    return {
      key: "all-round",
      label: "All-round",
      desc: "Profil équilibré : ni pur sprinteur, ni pur rouleur. Tu peux jouer sur plusieurs terrains, sans pic marqué.",
    };
  if (E < 0.95)
    return {
      key: "rouleur-grimpeur",
      label: "Rouleur-grimpeur",
      desc: "Ta puissance tient bien dans le temps. Tu es taillé pour les efforts longs et soutenus, les cols et le tempo.",
    };
  return {
    key: "ultra-endurance",
    label: "Ultra-endurance",
    desc: "Ta courbe est très plate : tu tiens des heures sans t'effondrer. Le long et le très long, c'est ta force.",
  };
}

export type PerfState = {
  poids: number | null;
  puissance: number | null;
  wkg: number | null;
  points: PowerPoint[];
  model: PowerLawModel | null;
  profile: PhysioProfile | null;
  ftp: number | null;
  p3h: number | null;
};

export const EMPTY_PERF: PerfState = {
  poids: null,
  puissance: null,
  wkg: null,
  points: [],
  model: null,
  profile: null,
  ftp: null,
  p3h: null,
};

export function computePerf(
  poidsInput: number | null,
  p1: number | null,
  p5: number | null,
  p20: number | null,
): PerfState {
  const poids = poidsInput && poidsInput >= 35 && poidsInput <= 160 ? poidsInput : null;
  const points: PowerPoint[] = [];
  if (p1) points.push({ T: 60, P: p1 });
  if (p5) points.push({ T: 300, P: p5 });
  if (p20) points.push({ T: 1200, P: p20 });

  const perf: PerfState = { ...EMPTY_PERF, poids, points };

  if (points.length >= 2) {
    const m = powerLawModel(points);
    perf.model = m;
    perf.profile = physioProfile(m.E);
    perf.ftp = Math.round(powerAtT(3600, m.S, m.E));
    perf.p3h = Math.round(powerAtT(10800, m.S, m.E));
    if (poids) perf.wkg = Math.round((perf.ftp / poids) * 100) / 100;
  } else if (points.length === 1 && poids) {
    perf.puissance = points[0].P;
    perf.wkg = Math.round((points[0].P / poids) * 100) / 100;
  }

  return perf;
}

export type QuizAnswers = Record<string, string>;

export type QuizResultData = {
  profile: Profile;
  perf: PerfState;
};

export const QUIZ_RESULT_STORAGE_KEY = "lsdc_quiz_result";

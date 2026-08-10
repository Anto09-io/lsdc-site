// Calculateur de dose optimale de glucides exogènes (g/h) pendant l'effort.
// Algorithme validé — spec de référence : PASSATION-calculateur-glucides.md.
// Ne pas modifier les règles chiffrées sans consulter Antonin : les 9 cas de
// test de la passation doivent rester verts.
//
// Dose = min( besoin utilisable, capacité d'utilisation, plafond intestinal,
// plafond durée ), puis garde-fou surdosage, puis arrondi à 5 g/h.

export type GlucidesInputs = {
  poids: number; // kg
  ftp: number; // W
  puiss: number; // W — puissance moyenne prévue
  duree: number; // heures
  gut: boolean; // intestin entraîné (≥ 5 semaines de gut training hebdo)
  profil: number; // multiplicateur métabolique : 1 neutre, 0.92 flexible, 1.08 peu flexible
};

export type LimitKey = "besoin" | "capa" | "absorb" | "duree";

export type Limit = {
  key: LimitKey;
  v: number;
  label: string;
  why: string;
};

export type GlucidesResult = {
  dose: number; // g/h, arrondie à 5
  pctFTP: number;
  pctVO2: number;
  kcalH: number;
  frac: number; // fraction glucidique de la dépense
  besoinTotal: number; // g/h de glucides brûlés
  demandCap: number; // besoin utilisable en exogène
  capacity: number; // capacité d'utilisation
  absorption: number; // plafond intestinal
  durCap: number; // plafond durée
  limits: Limit[];
  binding: Limit; // le facteur limitant
  multInt: number;
};

const FTP_TO_VO2 = 0.77; // %VO2max ≈ %FTP × 0,77 (Coyle 1988, Borszcz 2019)
const KCAL_PER_W = 4.0; // kcal/h = W × 4,0 (efficience brute ≈ 21,5 % — Moseley & Jeukendrup 2001)
const KCAL_PER_G = 4.1; // kcal par g de glucide oxydé
const CAP_PER_KG = 0.7; // g/kg/h — oxydation exogène pic, glucose seul (Ijaz 2025)
const MULT_FRUCTOSE = 1.5; // mélange glucose:fructose (Wallis 2005, Jentjens 2004)
const MULT_GUT = 1.17; // adaptation gut training / régime riche en glucides (Cox 2010)
const OX_EFFICIENCY = 0.8; // fraction de l'ingéré réellement oxydée (Podlogar 2025)
const DEMAND_SHARE = 0.75; // l'exogène couvre au max ~75 % de la dépense glucidique

// Fraction glucidique de la dépense énergétique vs %VO2max — crossover
// (Romijn 1993, van Loon 2001, Achten & Jeukendrup 2002)
const FRAC_ANCHORS: Array<[number, number]> = [
  [0.3, 0.2],
  [0.45, 0.45],
  [0.57, 0.51],
  [0.65, 0.55],
  [0.72, 0.76],
  [0.85, 0.84],
  [0.9, 0.95],
  [1.0, 1.0],
];

// Courbe dose-réponse performance : 0–78 mesuré par Smith 2013 (optimum +4,7 %
// à 78 g/h), déclin > 90 reconstitué depuis King 2018-19.
export const CURVE: Array<[number, number]> = [
  [0, 0],
  [9, 1],
  [19, 2],
  [31, 3],
  [48, 4],
  [60, 4.4],
  [78, 4.7],
  [90, 4.5],
  [100, 3.7],
  [112, 2.6],
  [120, 1.8],
];

export function lerp(anchors: Array<[number, number]>, x: number): number {
  if (x <= anchors[0][0]) return anchors[0][1];
  if (x >= anchors[anchors.length - 1][0]) return anchors[anchors.length - 1][1];
  for (let i = 1; i < anchors.length; i++) {
    const [x1, y1] = anchors[i - 1];
    const [x2, y2] = anchors[i];
    if (x <= x2) return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  }
  return anchors[anchors.length - 1][1];
}

export function curveGain(dose: number): number {
  return lerp(CURVE, Math.min(120, Math.max(0, dose)));
}

// Plafond par durée d'effort (Jeukendrup 2014, ACSM 2016)
export function durationCap(d: number, pctFTP: number): number {
  if (d < 1) return pctFTP >= 0.8 ? 15 : 0; // < 1 h : rinçage / petites quantités
  if (d < 2) return 60;
  if (d < 2.5) return 80;
  if (d < 3) return 90;
  return 120;
}

export function computeDose(inp: GlucidesInputs): GlucidesResult {
  const { poids, ftp, puiss, duree, gut, profil } = inp;
  const pctFTP = puiss / ftp;
  const pctVO2 = Math.min(1.05, pctFTP * FTP_TO_VO2);
  const kcalH = puiss * KCAL_PER_W;
  let frac = lerp(FRAC_ANCHORS, pctVO2) * profil;
  frac = Math.min(1, Math.max(0.15, frac));
  const besoinTotal = (kcalH * frac) / KCAL_PER_G; // g/h de glucides brûlés
  const demandCap = DEMAND_SHARE * besoinTotal; // besoin utilisable en exogène
  const multInt = pctVO2 > 0.85 ? 0.9 : 1.0; // débit splanchnique réduit à haute intensité (Pirnay 1982)
  const capacity =
    (CAP_PER_KG * poids * MULT_FRUCTOSE * (gut ? MULT_GUT : 1) * multInt) /
    OX_EFFICIENCY;
  const absorption = gut ? 120 : 90; // plafond intestinal
  const durCap = durationCap(duree, pctFTP);

  let dose = Math.min(capacity, absorption, durCap, demandCap);
  // Garde-fou surdosage : > 90 g/h uniquement si > 3 h ET intestin entraîné
  // (King 2018-19, Podlogar 2022)
  if (dose > 90 && !(duree > 3 && gut)) dose = 90;
  dose = Math.max(0, Math.round(dose / 5) * 5);

  const limits: Limit[] = [
    {
      key: "besoin",
      v: demandCap,
      label: "Ton besoin utilisable",
      why: "l'intensité du jour ne demande pas plus",
    },
    {
      key: "capa",
      v: capacity,
      label: "Ta capacité d'utilisation",
      why: "ton gabarit et ton niveau d'adaptation",
    },
    {
      key: "absorb",
      v: absorption,
      label: "Le plafond intestinal",
      why: "l'absorption sature (SGLT1 + GLUT5)",
    },
    {
      key: "duree",
      v: durCap,
      label: "La durée de la sortie",
      why: "les guidelines par durée d'effort",
    },
  ];
  const binding = limits.reduce((a, b) => (b.v < a.v ? b : a));

  return {
    dose,
    pctFTP,
    pctVO2,
    kcalH,
    frac,
    besoinTotal,
    demandCap,
    capacity,
    absorption,
    durCap,
    limits,
    binding,
    multInt,
  };
}

export function zoneLabel(pctFTP: number): string {
  if (pctFTP < 0.56) return "Z1–Z2 · endurance basse";
  if (pctFTP < 0.76) return "Z2–Z3 · endurance / tempo";
  if (pctFTP < 0.9) return "Z3–Z4 · tempo / sweetspot";
  if (pctFTP <= 1.05) return "Z4 · seuil";
  return "> FTP · supra-seuil";
}

export function fmtDuree(d: number): string {
  const h = Math.floor(d);
  const m = Math.round((d - h) * 60);
  return `${h} h ${String(m).padStart(2, "0")}`;
}

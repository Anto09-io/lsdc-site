// Moteur de calcul du "Calculateur GPX", porté depuis
// legacy/lsdc-calculator/calculateurlsdc.html (logique identique, extraite en
// fonctions pures pour un composant React).

export type GpxPoint = { lat: number; lon: number; ele: number };
export type Phase = "up" | "flat" | "down";
export type Segment = { dist: number; dEle: number; grade: number; phase: Phase };

export type EffortInputs = {
  wBody: number; // kg
  wBike: number; // kg
  vUp: number; // km/h
  vFlat: number; // km/h
  vDown: number; // km/h
};

export type ProfilePoint = { distKm: number; ele: number; phase: Phase };

export type EffortResult = {
  totalDistKm: number;
  dPlus: number;
  dMinus: number;
  altMax: number;
  totalKJ: number;
  kcal: number;
  avgW: number;
  wUp: number;
  wFlat: number;
  durationHours: number;
  distUp: number;
  distFlat: number;
  distDown: number;
  durUp: number;
  durFlat: number;
  durDown: number;
  kjGrav: number;
  kjAero: number;
  kjRoll: number;
  profile: ProfilePoint[];
};

// ── Hypothèses physiques (identiques à l'original, non éditables) ──
const G = 9.81; // gravité, m/s²
const CDA = 0.35; // traînée aérodynamique, m²
const RHO = 1.2; // densité de l'air, kg/m³
const CR = 0.004; // résistance au roulement
const EFF = 0.23; // rendement métabolique
const GRADE_THRESHOLD = 0.02; // seuil montée/descente : ±2%

export function haversineKm(a: GpxPoint, b: GpxPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(x));
}

export function parseGpx(xmlText: string): GpxPoint[] {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  if (xml.querySelector("parsererror")) {
    throw new Error("Fichier GPX invalide.");
  }
  const pts = [...xml.querySelectorAll("trkpt")];
  if (!pts.length) throw new Error("Aucun point trouvé dans le fichier GPX.");

  return pts.map((pt) => ({
    lat: parseFloat(pt.getAttribute("lat") || "0"),
    lon: parseFloat(pt.getAttribute("lon") || "0"),
    ele: parseFloat(pt.querySelector("ele")?.textContent ?? "0"),
  }));
}

export function smoothElevation(points: GpxPoint[], w = 5): GpxPoint[] {
  return points.map((pt, i) => {
    const start = Math.max(0, i - w);
    const end = Math.min(points.length - 1, i + w);
    let sum = 0;
    for (let j = start; j <= end; j++) sum += points[j].ele;
    return { ...pt, ele: sum / (end - start + 1) };
  });
}

export function buildSegments(points: GpxPoint[]): Segment[] {
  const segs: Segment[] = [];
  for (let i = 1; i < points.length; i++) {
    const dist = haversineKm(points[i - 1], points[i]);
    const dEle = points[i].ele - points[i - 1].ele;
    const grade = dist > 0 ? dEle / (dist * 1000) : 0;
    let phase: Phase = "flat";
    if (grade > GRADE_THRESHOLD) phase = "up";
    else if (grade < -GRADE_THRESHOLD) phase = "down";
    segs.push({ dist, dEle, grade, phase });
  }
  return segs;
}

export function fmtDuration(hours: number): string {
  const hh = Math.floor(hours);
  const mm = Math.round((hours - hh) * 60);
  return `${hh}:${mm < 10 ? "0" : ""}${mm}`;
}

export function computeEffort(
  points: GpxPoint[],
  { wBody, wBike, vUp, vFlat, vDown }: EffortInputs,
): EffortResult {
  const w = wBody + wBike;
  const vUpMs = vUp / 3.6;
  const vFlatMs = vFlat / 3.6;
  const vDownMs = vDown / 3.6;

  const smoothed = smoothElevation(points);
  const segs = buildSegments(smoothed);

  let distUp = 0,
    distFlat = 0,
    distDown = 0;
  let dPlus = 0,
    dMinus = 0;
  let kjGrav = 0,
    kjAero = 0,
    kjRoll = 0;
  let kjUp = 0,
    kjFlat = 0;
  let duration = 0,
    durUp = 0,
    durFlat = 0,
    durDown = 0;
  let totalDist = 0;

  for (const s of segs) {
    const distM = s.dist * 1000;
    totalDist += s.dist;

    if (s.phase === "up") {
      distUp += s.dist;
      dPlus += Math.max(0, s.dEle);
      const grav = (w * G * Math.max(0, s.dEle)) / 1000;
      const aero = (0.5 * CDA * RHO * vUpMs * vUpMs * distM) / 1000;
      const roll = (CR * w * G * distM) / 1000;
      kjGrav += grav;
      kjAero += aero;
      kjRoll += roll;
      kjUp += grav + aero + roll;
      const dt = s.dist / vUp;
      duration += dt;
      durUp += dt;
    } else if (s.phase === "flat") {
      distFlat += s.dist;
      const aero = (0.5 * CDA * RHO * vFlatMs * vFlatMs * distM) / 1000;
      const roll = (CR * w * G * distM) / 1000;
      kjAero += aero;
      kjRoll += roll;
      kjFlat += aero + roll;
      const dt = s.dist / vFlat;
      duration += dt;
      durFlat += dt;
    } else {
      distDown += s.dist;
      dMinus += Math.abs(Math.min(0, s.dEle));
      kjRoll += (CR * w * G * distM) / 1000;
      const dt = s.dist / vDown;
      duration += dt;
      durDown += dt;
    }
  }

  const total = kjGrav + kjAero + kjRoll;
  const avgW = duration > 0 ? Math.round((total * 1000) / (duration * 3600)) : 0;
  const wUp = durUp > 0 ? Math.round((kjUp * 1000) / (durUp * 3600)) : 0;
  const wFlat = durFlat > 0 ? Math.round((kjFlat * 1000) / (durFlat * 3600)) : 0;
  const kcal = Math.round(total / EFF / 4.18);
  const altMax = Math.round(Math.max(...smoothed.map((p) => p.ele)));

  // Profil d'altitude, sous-échantillonné pour l'affichage (≤200 points).
  const step = Math.max(1, Math.floor(smoothed.length / 200));
  const profile: ProfilePoint[] = [];
  let cumDist = 0;
  for (let i = 0; i < smoothed.length; i += step) {
    if (i > 0) {
      for (let j = Math.max(1, i - step + 1); j <= i; j++) {
        cumDist += haversineKm(smoothed[j - 1], smoothed[j]);
      }
    }
    const seg = segs[Math.min(i, segs.length - 1)];
    profile.push({
      distKm: cumDist,
      ele: Math.round(smoothed[i].ele),
      phase: seg?.phase ?? "flat",
    });
  }

  return {
    totalDistKm: totalDist,
    dPlus: Math.round(dPlus),
    dMinus: Math.round(dMinus),
    altMax,
    totalKJ: Math.round(total),
    kcal,
    avgW,
    wUp,
    wFlat,
    durationHours: duration,
    distUp,
    distFlat,
    distDown,
    durUp,
    durFlat,
    durDown,
    kjGrav: Math.round(kjGrav),
    kjAero: Math.round(kjAero),
    kjRoll: Math.round(kjRoll),
    profile,
  };
}

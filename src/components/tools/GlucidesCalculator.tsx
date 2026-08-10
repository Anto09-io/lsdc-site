"use client";

import { useMemo, useState } from "react";
import {
  computeDose,
  curveGain,
  fmtDuree,
  zoneLabel,
  type GlucidesInputs,
  type GlucidesResult,
} from "@/lib/glucides-calculator";
import { cn } from "@/lib/cn";

const SLIDERS = [
  { key: "poids" as const, label: "Poids", unit: "kg", min: 45, max: 110, step: 1 },
  { key: "ftp" as const, label: "FTP", unit: "W", min: 120, max: 450, step: 5,
    hint: "Si tu ne la connais pas : ~ta meilleure puissance moyenne sur 40–60 min." },
  { key: "puiss" as const, label: "Puissance moyenne prévue", unit: "W", min: 60, max: 400, step: 5 },
  { key: "duree" as const, label: "Durée de la sortie", unit: "", min: 0.5, max: 8, step: 0.25 },
];

const DEFAULT_INPUTS: GlucidesInputs = {
  poids: 70,
  ftp: 250,
  puiss: 175,
  duree: 3,
  gut: false,
  profil: 1,
};

export default function GlucidesCalculator() {
  const [inputs, setInputs] = useState<GlucidesInputs>(DEFAULT_INPUTS);
  const r = useMemo(() => computeDose(inputs), [inputs]);

  return (
    <div className="flex flex-col gap-6">
      <InputsCard inputs={inputs} setInputs={setInputs} result={r} />
      <ResultCard inputs={inputs} r={r} />
      <LimitsCard r={r} />
      <CurveCard r={r} />
      <PlanCard inputs={inputs} r={r} />
      <CalcDetails inputs={inputs} r={r} />
      <RulesDetails />
      <RefsDetails />
      <p className="border-t border-white/10 pt-5 text-xs leading-relaxed text-cream/40">
        ⚠️ Outil pédagogique — La Science du Cyclisme. Ceci n'est pas un conseil
        médical ou nutritionnel individualisé : teste toujours ta stratégie à
        l'entraînement avant de l'utiliser en course, et pense à rincer à l'eau
        après les gels (l'érosion dentaire est le risque le mieux documenté du
        high-carb — Needleman 2013).
      </p>
    </div>
  );
}

/* ── Entrées ── */

function InputsCard({
  inputs,
  setInputs,
  result,
}: {
  inputs: GlucidesInputs;
  setInputs: React.Dispatch<React.SetStateAction<GlucidesInputs>>;
  result: GlucidesResult;
}) {
  return (
    <section className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
      <h2 className="font-display text-2xl italic text-cream">Ta sortie du jour</h2>
      <div className="mt-5 grid gap-x-7 gap-y-5 sm:grid-cols-2">
        {SLIDERS.map((s) => (
          <label key={s.key} className="flex flex-col gap-1.5 text-sm">
            <span className="flex items-baseline justify-between text-cream/70">
              <span className="font-medium">{s.label}</span>
              <span className="font-display text-xl italic text-green">
                {s.key === "duree"
                  ? fmtDuree(inputs.duree)
                  : `${inputs[s.key]} ${s.unit}`}
              </span>
            </span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={inputs[s.key]}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, [s.key]: parseFloat(e.target.value) }))
              }
              className="accent-green"
            />
            {s.key === "puiss" ? (
              <span className="text-xs text-cream/50">
                Intensité : {Math.round(result.pctFTP * 100)} % FTP —{" "}
                {zoneLabel(result.pctFTP)}
              </span>
            ) : (
              "hint" in s && <span className="text-xs text-cream/50">{s.hint}</span>
            )}
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-dashed border-white/10 pt-5">
        <label className="flex cursor-pointer select-none items-center gap-3">
          <input
            type="checkbox"
            checked={inputs.gut}
            onChange={(e) => setInputs((p) => ({ ...p, gut: e.target.checked }))}
            className="peer sr-only"
          />
          <span className="relative h-6 w-[42px] flex-none rounded-full bg-white/15 transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-cream after:shadow after:transition-all peer-checked:bg-green peer-checked:after:left-[21px]" />
          <span className="text-sm font-medium text-cream">
            Intestin entraîné
            <span className="block text-xs font-normal text-cream/50">
              ≥ 5 semaines de gut training / régime riche en glucides
            </span>
          </span>
        </label>

        <label className="flex items-center gap-3 text-sm">
          <span className="font-medium text-cream">
            Profil métabolique
            <span className="block text-xs font-normal text-cream/50">
              optionnel — mesuré en labo
            </span>
          </span>
          <select
            value={inputs.profil}
            onChange={(e) => setInputs((p) => ({ ...p, profil: parseFloat(e.target.value) }))}
            className="rounded-lg border-0 bg-ink px-3 py-2 text-sm text-cream ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-green-light"
          >
            <option value={1}>Inconnu (neutre)</option>
            <option value={0.92}>Très flexible — gros brûleur de graisses</option>
            <option value={1.08}>Peu flexible — bascule tôt sur les glucides</option>
          </select>
        </label>
      </div>
    </section>
  );
}

/* ── Résultat ── */

function ResultCard({ inputs, r }: { inputs: GlucidesInputs; r: GlucidesResult }) {
  const lo = Math.max(0, Math.round((r.dose * 0.9) / 5) * 5);
  const hi = Math.round((r.dose * 1.1) / 5) * 5;
  const optimal = inputs.duree >= 2 && r.dose >= 65 && r.dose <= 85;

  const alerts: Array<{ warn?: boolean; m: string }> = [];
  if (inputs.duree < 1 && r.pctFTP >= 0.8)
    alerts.push({ m: "Effort < 1 h : un simple rinçage de bouche avec une boisson glucidée (5–10 s, sans avaler) suffit pour l'effet système nerveux central." });
  else if (inputs.duree < 1)
    alerts.push({ m: "Effort < 1 h à intensité modérée : tes réserves de glycogène suffisent largement, aucun apport nécessaire." });
  if (r.pctFTP > 1.0)
    alerts.push({ warn: true, m: "Puissance > FTP : intenable en continu sur cette durée — vérifie tes watts ou ta FTP." });
  if (r.dose >= 85 && !inputs.gut)
    alerts.push({ warn: true, m: "À ce niveau d'apport, 5–10 semaines de gut training hebdomadaire sont nécessaires pour l'assimiler sans troubles digestifs." });
  if (r.dose > 90)
    alerts.push({ warn: true, m: "Au-delà de 90 g/h : ratio 1:0,8 obligatoire, bénéfice performance non démontré vs 90 g/h (Podlogar 2022) — à réserver aux très longues épreuves, et à tester en amont." });
  if (r.binding.key === "besoin" && inputs.duree >= 2.5)
    alerts.push({ m: "Ton intensité du jour est basse : inutile de copier les 90–120 g/h des pros, ton corps n'en brûlerait pas autant." });

  return (
    <section className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
      <h2 className="font-display text-2xl italic text-cream">Ta dose recommandée</h2>
      <div className="mt-4 grid items-center gap-6 sm:grid-cols-[auto_1fr]">
        <div>
          <p className="whitespace-nowrap font-display text-[88px] font-bold italic leading-[0.9] text-green">
            {r.dose}
            <span className="text-3xl text-cream"> g/h</span>
          </p>
          <p className="mt-2 text-sm text-cream/60">
            {r.dose === 0 ? "aucun apport nécessaire" : `fourchette ${lo}–${hi} g/h`}
          </p>
          {optimal && (
            <span className="mt-2 inline-block rounded-full bg-green px-3 py-1 text-xs font-semibold text-ink">
              ✓ dans la zone optimale mesurée (Smith 2013)
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Kpi label="Total sortie" value={`${Math.round(r.dose * inputs.duree)} g`} />
          <Kpi
            label="Ratio conseillé"
            value={r.dose === 0 ? "—" : r.dose <= 60 ? "glucose seul OK" : "1:0,8 glc:fru"}
            small
          />
          <Kpi label="Dépense glucidique" value={`${Math.round(r.besoinTotal)} g/h brûlés`} />
          <Kpi label="Dépense énergie" value={`${Math.round(r.kcalH)} kcal/h`} />
        </div>
      </div>

      {r.dose > 0 && (
        <p className="mt-4 text-sm text-cream/70">
          Facteur limitant :{" "}
          <b className="text-green">{r.binding.label.toLowerCase()}</b> —{" "}
          {r.binding.why}.
        </p>
      )}

      {alerts.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {alerts.map((a, i) => (
            <p
              key={i}
              className={cn(
                "rounded-r-lg border-l-2 px-3 py-2 text-[13.5px] text-cream/80",
                a.warn ? "border-amber-500 bg-amber-500/10" : "border-green bg-green/10",
              )}
            >
              {a.m}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

function Kpi({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-xl bg-ink p-3 ring-1 ring-white/10">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-cream/50">
        {label}
      </p>
      <p className={cn("mt-0.5 font-display italic text-cream", small ? "text-base" : "text-xl")}>
        {value}
      </p>
    </div>
  );
}

/* ── Graphique 1 : les 4 plafonds ── */

function LimitsCard({ r }: { r: GlucidesResult }) {
  const W = 800;
  const rowH = 40;
  const top = 8;
  const left = 250;
  const right = 70;
  const maxV = Math.max(130, ...r.limits.map((l) => l.v)) * 1.05;
  const sc = (v: number) => (v / maxV) * (W - left - right);
  const xd = left + sc(r.dose);

  return (
    <section className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
      <h2 className="font-display text-2xl italic text-cream">Ton facteur limitant</h2>
      <p className="mt-1 text-sm text-cream/60">
        Ta dose = le plus bas de ces quatre plafonds. Inutile de pousser les
        autres tant que celui-ci ne bouge pas.
      </p>
      <svg
        viewBox={`0 0 ${W} 200`}
        className="mt-4 w-full"
        role="img"
        aria-label="Comparaison des quatre plafonds qui déterminent la dose"
      >
        {r.limits.map((l, i) => {
          const y = top + i * rowH + 6;
          const w = Math.max(4, sc(l.v));
          const isMin = l.key === r.binding.key;
          return (
            <g key={l.key}>
              <text
                x={left - 12}
                y={y + 15}
                textAnchor="end"
                fontSize={13}
                fontWeight={isMin ? 700 : 500}
                fill={isMin ? "#22C55E" : "rgba(245,241,232,0.8)"}
              >
                {l.label}
              </text>
              <rect
                x={left}
                y={y}
                width={w}
                height={22}
                rx={4}
                fill={isMin ? "#22C55E" : "rgba(245,241,232,0.25)"}
              />
              <text
                x={left + w + 8}
                y={y + 15}
                fontSize={13}
                fontWeight={600}
                fill="rgba(245,241,232,0.9)"
              >
                {Math.round(l.v)} g/h
              </text>
            </g>
          );
        })}
        <line
          x1={xd}
          y1={2}
          x2={xd}
          y2={top + 4 * rowH}
          stroke="rgba(245,241,232,0.9)"
          strokeDasharray="4 4"
          strokeWidth={1.4}
        />
        <text
          x={xd}
          y={top + 4 * rowH + 18}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill="rgba(245,241,232,0.9)"
        >
          ta dose : {r.dose} g/h
        </text>
      </svg>
    </section>
  );
}

/* ── Graphique 2 : courbe dose-réponse ── */

function CurveCard({ r }: { r: GlucidesResult }) {
  const W = 800;
  const H = 260;
  const m = { t: 18, r: 24, b: 42, l: 52 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const X = (d: number) => m.l + (d / 120) * iw;
  const Y = (g: number) => m.t + ih - ((g + 0.2) / 5.4) * ih;

  const pts: string[] = [];
  for (let d = 0; d <= 120; d += 2) {
    pts.push(`${d === 0 ? "M" : "L"} ${X(d).toFixed(1)} ${Y(curveGain(d)).toFixed(1)}`);
  }
  const g = curveGain(r.dose);

  return (
    <section className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
      <h2 className="font-display text-2xl italic text-cream">
        Où tu te situes sur la courbe dose-performance
      </h2>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Courbe dose-réponse entre glucides ingérés et gain de performance"
      >
        {[0, 1, 2, 3, 4].map((gv) => (
          <g key={gv}>
            <line
              x1={m.l}
              y1={Y(gv)}
              x2={W - m.r}
              y2={Y(gv)}
              stroke="rgba(245,241,232,0.12)"
              strokeWidth={1}
            />
            <text x={m.l - 8} y={Y(gv) + 4} textAnchor="end" fontSize={11} fill="rgba(245,241,232,0.5)">
              +{gv}%
            </text>
          </g>
        ))}
        {[0, 30, 60, 90, 120].map((d) => (
          <text
            key={d}
            x={X(d)}
            y={H - m.b + 18}
            textAnchor="middle"
            fontSize={11}
            fill="rgba(245,241,232,0.5)"
          >
            {d}
          </text>
        ))}
        <text
          x={(m.l + W - m.r) / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize={11.5}
          fill="rgba(245,241,232,0.5)"
        >
          glucides ingérés (g/h)
        </text>
        <path d={pts.join(" ")} fill="none" stroke="#22C55E" strokeWidth={2.5} strokeLinejoin="round" />
        <line
          x1={X(78)}
          y1={Y(4.7)}
          x2={X(78)}
          y2={m.t + ih}
          stroke="rgba(245,241,232,0.3)"
          strokeDasharray="3 4"
          strokeWidth={1}
        />
        <text
          x={X(78)}
          y={Y(4.7) - 10}
          textAnchor="middle"
          fontSize={11.5}
          fontWeight={600}
          fill="rgba(245,241,232,0.6)"
        >
          optimum 78 g/h
        </text>
        {r.dose > 0 && (
          <g>
            <circle cx={X(r.dose)} cy={Y(g)} r={7} fill="#22C55E" stroke="#18181B" strokeWidth={2.5} />
            <text
              x={X(r.dose)}
              y={Y(g) + 26}
              textAnchor="middle"
              fontSize={12.5}
              fontWeight={700}
              fill="#4ADE80"
            >
              toi : {r.dose} g/h
            </text>
          </g>
        )}
      </svg>
      <p className="mt-3 text-xs text-cream/50">
        Courbe reconstituée d'après Smith 2013 (n=51, optimum +4,7 % à 78 g/h
        sur ~2 h 20 d'effort) et King 2018–2019 pour le déclin au-delà de
        90 g/h. Le point vert = ta dose.
      </p>
    </section>
  );
}

/* ── Plan ravito ── */

function PlanCard({ inputs, r }: { inputs: GlucidesInputs; r: GlucidesResult }) {
  const GEL = 30;
  const BIDON = 40;
  const BARRE = 25;

  let cells: Array<{ title: string; body: string }>;
  let note = "";
  if (r.dose === 0) {
    cells = [
      {
        title: "Rien à embarquer",
        body: "De l'eau, et éventuellement un rinçage de bouche glucidique si l'effort est intense.",
      },
    ];
  } else {
    const nBidon = Math.min(1, Math.floor(r.dose / BIDON));
    let reste = r.dose - nBidon * BIDON;
    const nGel = Math.floor(reste / GEL);
    reste -= nGel * GEL;
    const nBarre = Math.round((reste / BARRE) * 10) / 10 >= 0.5 ? 1 : 0;
    const items: string[] = [];
    if (nBidon) items.push(`${nBidon} bidon dosé (~${BIDON} g)`);
    if (nGel) items.push(`${nGel} gel${nGel > 1 ? "s" : ""} (~${GEL} g)`);
    if (nBarre) items.push(`1 barre / banane (~${BARRE} g)`);
    cells = [
      {
        title: `${r.dose} g/h`,
        body: `soit par heure : ${items.join(" + ") || "un demi-bidon dosé"}`,
      },
      {
        title: `${Math.round(r.dose * inputs.duree)} g au total`,
        body: "à répartir dès les 15 premières minutes, puis toutes les 15–20 min",
      },
      {
        title: r.dose <= 60 ? "Glucose / malto seul OK" : "Mélange 1:0,8",
        body:
          r.dose <= 60
            ? "le fructose reste un plus pour le confort"
            : "vérifie le ratio glucose:fructose sur l'étiquette",
      },
    ];
    note =
      inputs.duree >= 2.5
        ? "Équivalences indicatives : gel ≈ 25–35 g, bidon 500 ml dosé ≈ 40 g, barre ≈ 20–30 g. Commence à t'alimenter tôt — pas quand la fringale arrive."
        : "Équivalences indicatives : gel ≈ 25–35 g, bidon 500 ml dosé ≈ 40 g.";
  }

  return (
    <section className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
      <h2 className="font-display text-2xl italic text-cream">Ton plan ravito, par heure</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {cells.map((c) => (
          <div key={c.title} className="rounded-xl bg-ink p-4 ring-1 ring-white/10">
            <p className="font-display text-lg italic text-green">{c.title}</p>
            <p className="mt-1 text-[13.5px] text-cream/70">{c.body}</p>
          </div>
        ))}
      </div>
      {note && <p className="mt-3 text-xs text-cream/50">{note}</p>}
    </section>
  );
}

/* ── Détails repliables ── */

function Details({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl bg-surface ring-1 ring-white/10">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-display text-lg italic text-cream [&::-webkit-details-marker]:hidden">
        {summary}
        <span className="text-2xl text-green transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="px-6 pb-5">{children}</div>
    </details>
  );
}

const td = "border-b border-white/10 px-2.5 py-2 text-left";
const th = "border-b border-white/10 px-2.5 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-cream/50";

function CalcDetails({ inputs, r }: { inputs: GlucidesInputs; r: GlucidesResult }) {
  const rows: Array<[string, string, string]> = [
    ["Intensité relative", `${Math.round(r.pctFTP * 100)} % FTP ≈ ${Math.round(r.pctVO2 * 100)} % VO₂max`, "%VO₂max = %FTP × 0,77"],
    ["Dépense énergétique", `${Math.round(r.kcalH)} kcal/h`, "W × 4,0 (GE ≈ 21,5 %)"],
    ["Fraction glucidique", `${Math.round(r.frac * 100)} %`, "crossover — Romijn 93, van Loon 01"],
    ["Glucides brûlés (total)", `${Math.round(r.besoinTotal)} g/h`, "kcal/h × fraction ÷ 4,1"],
    ["→ Besoin utilisable en exogène", `${Math.round(r.demandCap)} g/h`, "75 % du total (le glycogène et les graisses font le reste)"],
    ["→ Capacité d'utilisation", `${Math.round(r.capacity)} g/h`, `0,7 g/kg/h × 1,5 (fructose) ${inputs.gut ? "× 1,17 (adapté) " : ""}÷ 0,8 — Ijaz 2025`],
    ["→ Plafond intestinal", `${r.absorption} g/h`, inputs.gut ? "intestin entraîné" : "sans gut training"],
    ["→ Plafond durée", `${r.durCap} g/h`, "Jeukendrup 2014 / ACSM 2016"],
    ["Dose retenue", `${r.dose} g/h`, "minimum des quatre, arrondi à 5"],
  ];
  return (
    <Details summary="Le détail du calcul">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13.5px] text-cream/80">
          <thead>
            <tr>
              <th className={th}>Étape</th>
              <th className={th}>Valeur</th>
              <th className={th}>Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((x) => (
              <tr key={x[0]}>
                <td className={td}>{x[0]}</td>
                <td className={cn(td, "font-semibold tabular-nums text-cream")}>{x[1]}</td>
                <td className={cn(td, "text-cream/50")}>{x[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Details>
  );
}

function RulesDetails() {
  const rules: Array<[string, string]> = [
    ["Dépense énergétique", "kcal/h = W × 4,0 (efficience brute ≈ 21,5 %)"],
    ["Fraction glucidique", "interpolée sur %VO₂max (%VO₂max ≈ %FTP × 0,77) — crossover"],
    ["Besoin utilisable", "75 % de la dépense glucidique totale (l'exogène ne couvre jamais tout)"],
    ["Capacité d'utilisation", "0,7 g/kg/h (glucose) × 1,5 (mélange fructose) × 1,17 (si adapté) ÷ 0,8 (rendement)"],
    ["Plafond intestinal", "90 g/h — 120 g/h si intestin entraîné"],
    ["Plafond durée", "<1 h : 0 · 1–2 h : 60 · 2–2,5 h : 80 · 2,5–3 h : 90 · >3 h : 120"],
    ["Garde-fou surdosage", ">90 g/h seulement si >3 h ET intestin entraîné (sinon perte de perf)"],
    ["Ratio glucose:fructose", "≤60 g/h : glucose/malto seul possible · >60 g/h : 1:0,8 obligatoire"],
  ];
  return (
    <Details summary="Les règles de l'algorithme">
      <p className="mb-3 text-sm font-semibold text-cream">
        Dose = min( besoin utilisable, capacité d'utilisation, plafond
        intestinal, plafond durée )
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13.5px] text-cream/80">
          <thead>
            <tr>
              <th className={th}>Règle</th>
              <th className={th}>Formule / seuil</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((x) => (
              <tr key={x[0]}>
                <td className={td}>{x[0]}</td>
                <td className={cn(td, "tabular-nums text-cream/60")}>{x[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Details>
  );
}

function RefsDetails() {
  const refs: Array<{ text: string; url?: string; pmid?: string }> = [
    { text: "Jeukendrup AE. A step towards personalized sports nutrition: carbohydrate intake during exercise. Sports Med 2014.", url: "https://pubmed.ncbi.nlm.nih.gov/24791914/", pmid: "24791914" },
    { text: "Smith JW et al. Curvilinear dose-response relationship of carbohydrate (0–120 g/h) and performance. MSSE 2013.", url: "https://pubmed.ncbi.nlm.nih.gov/22968309/", pmid: "22968309" },
    { text: "King AJ et al. Carbohydrate dose influences liver and muscle glycogen oxidation and performance. Physiol Rep 2018 · Eur J Appl Physiol 2019.", url: "https://pubmed.ncbi.nlm.nih.gov/29333721/", pmid: "29333721" },
    { text: "Ijaz A, Gonzalez JT et al. Exogenous glucose oxidation during exercise is positively related to body size. IJSNEM 2025.", url: "https://pubmed.ncbi.nlm.nih.gov/39332815/", pmid: "39332815" },
    { text: "O'Brien WJ & Rowlands DS. Fructose-maltodextrin ratio governs exogenous CHO oxidation and performance. MSSE 2013.", url: "https://pubmed.ncbi.nlm.nih.gov/23949097/", pmid: "23949097" },
    { text: "Jentjens RL et al. Oxidation of combined ingestion of glucose and fructose. J Appl Physiol 2004.", url: "https://pubmed.ncbi.nlm.nih.gov/14657042/", pmid: "14657042" },
    { text: "Cox GR et al. Daily training with high carbohydrate availability increases exogenous CHO oxidation. J Appl Physiol 2010.", url: "https://pubmed.ncbi.nlm.nih.gov/20466803/", pmid: "20466803" },
    { text: "Podlogar T & Wallis GA. New horizons in carbohydrate research. Sports Med 2022 — 120 vs 90 g/h : pas d'épargne de glycogène supplémentaire." },
    { text: "Podlogar T et al. Personalized carbohydrate intake — proof of concept. Performance Nutrition 2025 : dose individualisée 49–80 g/h." },
    { text: "van Loon LJC et al. J Physiol 2001 · Romijn JA et al. Am J Physiol 1993 · Achten & Jeukendrup 2002 (crossover, fatmax)." },
    { text: "Fell JM et al. From metabolism to medals. J Nutr 2026 — plafond 120 g/h chez athlètes entraînés." },
  ];
  return (
    <Details summary="Références scientifiques">
      <ul className="flex list-disc flex-col gap-2 pl-4 text-[12.5px] text-cream/60">
        {refs.map((ref) => (
          <li key={ref.text}>
            {ref.text}{" "}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-light underline-offset-2 hover:underline"
              >
                PMID {ref.pmid}
              </a>
            )}
          </li>
        ))}
      </ul>
    </Details>
  );
}

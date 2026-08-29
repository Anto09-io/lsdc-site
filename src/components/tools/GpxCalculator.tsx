"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  computeEffort,
  fmtDuration,
  parseGpx,
  type EffortResult,
  type GpxPoint,
} from "@/lib/gpx-calculator";
import { cn } from "@/lib/cn";

const fmt = (n: number) => n.toLocaleString("fr-FR");

const SLIDERS = [
  { key: "wBody" as const, label: "Poids du corps", unit: "kg", min: 45, max: 110, step: 1, default: 70 },
  { key: "wBike" as const, label: "Poids du vélo + équipement", unit: "kg", min: 5, max: 15, step: 0.5, default: 8 },
  { key: "vUp" as const, label: "Vitesse cible en montée", unit: "km/h", min: 8, max: 25, step: 1, default: 16 },
  { key: "vFlat" as const, label: "Vitesse cible sur le plat", unit: "km/h", min: 20, max: 45, step: 1, default: 30 },
  { key: "vDown" as const, label: "Vitesse cible en descente", unit: "km/h", min: 30, max: 75, step: 1, default: 50 },
];

type Inputs = {
  wBody: number;
  wBike: number;
  vUp: number;
  vFlat: number;
  vDown: number;
};

const DEFAULT_INPUTS: Inputs = {
  wBody: 70,
  wBike: 8,
  vUp: 16,
  vFlat: 30,
  vDown: 50,
};

export default function GpxCalculator() {
  const [points, setPoints] = useState<GpxPoint[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const result: EffortResult | null = useMemo(() => {
    if (!points) return null;
    return computeEffort(points, inputs);
  }, [points, inputs]);

  const handleFile = useCallback((file: File | undefined) => {
    if (!file || !file.name.toLowerCase().endsWith(".gpx")) {
      setError("Merci de déposer un fichier .gpx.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseGpx(String(e.target?.result ?? ""));
        setPoints(parsed);
        setFileName(file.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de lecture du fichier GPX.");
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      {/* ── Sidebar : upload + réglages ── */}
      <aside className="flex flex-col gap-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-colors",
            dragOver ? "border-violet bg-violet/5" : "border-carbon/15 bg-surface hover:border-carbon/30",
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".gpx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <p className="font-medium text-carbon">
            {fileName || "Dépose ton fichier GPX"}
          </p>
          <p className="mt-1 text-xs text-carbon/50">
            {points ? `${points.length.toLocaleString("fr-FR")} points GPS` : "ou clique pour parcourir"}
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 ring-1 ring-carbon/10">
          {SLIDERS.map((s) => (
            <label key={s.key} className="flex flex-col gap-1.5 text-sm">
              <span className="flex items-center justify-between text-carbon/70">
                <span>{s.label}</span>
                <span className="font-semibold text-carbon">
                  {s.step < 1 ? inputs[s.key].toFixed(1) : inputs[s.key]} {s.unit}
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
                className="accent-violet"
              />
            </label>
          ))}
        </div>

        <p className="text-xs leading-relaxed text-carbon/40">
          CdA = 0,35 m² · Cr = 0,004 · ρ = 1,2 kg/m³ · rendement = 23%
          <br />
          Seuil montée/descente : pente &gt; ±2%. En descente : travail pédalé
          considéré nul.
        </p>
      </aside>

      {/* ── Résultats ── */}
      <div>
        {!result ? (
          <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl bg-surface p-10 text-center ring-1 ring-carbon/10">
            <p className="text-carbon/50">
              Charge un parcours GPX pour voir l'estimation d'effort.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Stats parcours */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Distance" value={`${result.totalDistKm.toFixed(1)} km`} />
              <Stat label="D+" value={`${fmt(result.dPlus)} m`} />
              <Stat label="D-" value={`${fmt(result.dMinus)} m`} />
              <Stat label="Altitude max" value={`${fmt(result.altMax)} m`} />
            </div>

            {/* Résultats principaux */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Stat big label="Travail total" value={`${fmt(result.totalKJ)} kJ`} />
              <Stat big label="Dépense" value={`${fmt(result.kcal)} kcal`} />
              <Stat big label="Durée estimée" value={fmtDuration(result.durationHours)} />
              <Stat label="Puissance moyenne" value={`${result.avgW} W`} />
              <Stat label="Puissance en montée" value={`${result.wUp} W`} />
              <Stat label="Puissance sur le plat" value={`${result.wFlat} W`} />
            </div>

            {/* Répartition par phase */}
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-carbon/10">
              <h3 className="text-sm font-semibold text-carbon">Répartition du parcours</h3>
              <div className="mt-4 flex flex-col gap-3">
                <PhaseBar
                  label="Montée"
                  distKm={result.distUp}
                  duration={result.durUp}
                  total={result.totalDistKm}
                  color="bg-violet"
                />
                <PhaseBar
                  label="Plat"
                  distKm={result.distFlat}
                  duration={result.durFlat}
                  total={result.totalDistKm}
                  color="bg-carbon/50"
                />
                <PhaseBar
                  label="Descente"
                  distKm={result.distDown}
                  duration={result.durDown}
                  total={result.totalDistKm}
                  color="bg-violet-light"
                />
              </div>
            </div>

            {/* Répartition énergétique */}
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-carbon/10">
              <h3 className="text-sm font-semibold text-carbon">Répartition de l'effort</h3>
              <div className="mt-4 flex flex-col gap-3">
                <EnergyBar label="Gravité" kj={result.kjGrav} total={result.totalKJ} color="bg-violet" />
                <EnergyBar label="Aérodynamique" kj={result.kjAero} total={result.totalKJ} color="bg-carbon/50" />
                <EnergyBar label="Roulement" kj={result.kjRoll} total={result.totalKJ} color="bg-violet-light" />
              </div>
            </div>

            <ElevationProfile profile={result.profile} />
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="rounded-2xl bg-surface p-4 ring-1 ring-carbon/10">
      <p className="text-xs text-carbon/50">{label}</p>
      <p className={cn("mt-1 font-display italic text-carbon", big ? "text-3xl" : "text-xl")}>
        {value}
      </p>
    </div>
  );
}

function PhaseBar({
  label,
  distKm,
  duration,
  total,
  color,
}: {
  label: string;
  distKm: number;
  duration: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (distKm / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-carbon/60">
        <span>{label}</span>
        <span>
          {distKm.toFixed(1)} km · {fmtDuration(duration)}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-carbon/10">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function EnergyBar({
  label,
  kj,
  total,
  color,
}: {
  label: string;
  kj: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (kj / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-carbon/60">
        <span>{label}</span>
        <span>{fmt(kj)} kJ</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-carbon/10">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ElevationProfile({
  profile,
}: {
  profile: { distKm: number; ele: number; phase: string }[];
}) {
  if (profile.length < 2) return null;

  const W = 600;
  const H = 160;
  const padL = 36;
  const padB = 20;
  const eles = profile.map((p) => p.ele);
  const distMax = profile[profile.length - 1].distKm || 1;
  const eleMin = Math.min(...eles);
  const eleMax = Math.max(...eles);
  const eleRange = Math.max(1, eleMax - eleMin);

  const x = (d: number) => padL + (d / distMax) * (W - padL - 8);
  const y = (e: number) => H - padB - ((e - eleMin) / eleRange) * (H - padB - 8);

  const linePath = profile
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.distKm).toFixed(1)},${y(p.ele).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${x(profile[profile.length - 1].distKm).toFixed(1)},${H - padB} L${x(0).toFixed(1)},${H - padB} Z`;

  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-carbon/10">
      <h3 className="text-sm font-semibold text-carbon">Profil d'altitude</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label="Profil d'altitude du parcours">
        <path d={areaPath} fill="rgba(159,1,255,0.15)" />
        <path d={linePath} fill="none" stroke="#9F01FF" strokeWidth={2} />
        <text x={4} y={y(eleMax) + 4} className="fill-current text-carbon/50" fontSize={10}>
          {Math.round(eleMax)} m
        </text>
        <text x={4} y={H - padB} className="fill-current text-carbon/50" fontSize={10}>
          {Math.round(eleMin)} m
        </text>
        <text x={x(distMax) - 24} y={H - 4} className="fill-current text-carbon/50" fontSize={10}>
          {distMax.toFixed(0)} km
        </text>
      </svg>
    </div>
  );
}

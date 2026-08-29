"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { siteConfig } from "@/lib/site";
import {
  powerAtT,
  wkgBand,
  QUIZ_RESULT_STORAGE_KEY,
  type Profile,
  type PerfState,
} from "@/lib/quiz";

type StoredResult = { profile: Profile; perf: PerfState };

export default function QuizResult() {
  const [data, setData] = useState<StoredResult | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);
    setData(raw ? JSON.parse(raw) : null);
  }, []);

  if (data === undefined) return null;

  if (data === null) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-carbon/60">
          Ton bilan n'est pas disponible. Refais le quiz pour découvrir ton
          profil.
        </p>
        <div className="mt-6">
          <ButtonLink href="/quiz">Refaire le quiz</ButtonLink>
        </div>
      </div>
    );
  }

  const { profile, perf } = data;

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
      <div className="mb-9">
        <p className="text-xs font-medium uppercase tracking-widest text-carbon/40">
          Ton profil de cycliste
        </p>
        <h1 className="mt-3 font-display text-5xl italic leading-tight sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg text-carbon/70 sm:text-xl">{profile.tagline}</p>
      </div>

      <ResultCard label="Le diagnostic">
        <p>{profile.diag}</p>
      </ResultCard>

      <PerfPanel perf={perf} />

      <ResultCard label="Ton levier n°1" accent>
        <p className="mb-3 font-display text-2xl font-bold italic text-carbon sm:text-3xl">
          {profile.leverTitle}
        </p>
        <p>{profile.lever}</p>
      </ResultCard>

      <div className="mt-4 rounded-2xl bg-carbon p-7 text-paper sm:p-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-paper/50">
          L'étape suivante
        </p>
        <h3 className="font-display text-2xl italic leading-tight sm:text-4xl">
          Fais grimper tes W/kg, méthodiquement.
        </h3>
        <p className="mt-3 text-paper/70">
          {profile.angle} Un système clair, basé sur la science, pour arrêter
          de rouler au hasard et faire monter le seul chiffre qui compte.
        </p>
        <Link
          href={siteConfig.links.methode}
          className="mt-6 flex min-h-[62px] w-full items-center justify-center rounded-2xl bg-carbon px-8 text-base font-semibold text-paper transition-opacity hover:opacity-90"
        >
          Découvrir La Méthode Watt/kg →
        </Link>
        <p className="mt-4 text-center text-xs text-paper/50">
          Tu vas aussi recevoir mes conseils d'entraînement chaque semaine par
          mail.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="border-b border-carbon/20 text-sm text-carbon/50 hover:text-carbon">
          Retour à La Science du Cyclisme
        </Link>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  accent,
  children,
}: {
  label: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mb-4 rounded-2xl p-6 sm:p-8 ${
        accent ? "bg-violet/[0.06] ring-1 ring-violet/30" : "bg-surface ring-1 ring-carbon/10"
      }`}
    >
      <p
        className={`mb-3 text-xs font-medium uppercase tracking-widest ${
          accent ? "text-carbon" : "text-carbon/50"
        }`}
      >
        {label}
      </p>
      <div className="leading-relaxed text-carbon/80">{children}</div>
    </div>
  );
}

function PerfPanel({ perf }: { perf: PerfState }) {
  if (perf.model && perf.profile && perf.ftp != null && perf.p3h != null) {
    const bigVal = perf.wkg != null ? perf.wkg.toFixed(2) : String(perf.ftp);
    const bigUnit = perf.wkg != null ? "W/kg" : "W";
    return (
      <ResultCard label="Ta loi de puissance">
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="text-5xl font-bold italic leading-none text-carbon sm:text-6xl">
            {bigVal}
          </span>
          <span className="text-lg text-carbon/50">{bigUnit}</span>
          <span className="rounded-full border border-carbon/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-carbon">
            {perf.profile.label}
          </span>
        </div>
        <p className="mt-4">
          Ton exposant d'endurance est de{" "}
          <strong className="text-carbon">{perf.model.E.toFixed(2)}</strong>.{" "}
          {perf.profile.desc}
        </p>

        <PowerCurve model={perf.model} points={perf.points} />

        <div className="mt-6 flex flex-wrap gap-4 border-t border-carbon/10 pt-6">
          <PlStat
            label="Seuil ~1h"
            value={`${perf.ftp} W`}
            sub={perf.wkg != null ? `${perf.wkg.toFixed(2)} W/kg` : "ta FTP estimée"}
          />
          <PlStat
            label="Endurance 3h"
            value={`${perf.p3h} W`}
            sub={`${Math.round((perf.p3h / perf.ftp) * 100)}% de ton seuil`}
          />
          <PlStat
            label="Exposant"
            value={perf.model.E.toFixed(2)}
            sub={`profil ${perf.profile.label.toLowerCase()}`}
          />
        </div>
      </ResultCard>
    );
  }

  if (perf.wkg != null && perf.puissance != null && perf.poids != null) {
    const band = wkgBand(perf.wkg)!;
    return (
      <ResultCard label="Ton rapport poids-puissance">
        <div className="flex flex-wrap items-baseline gap-4">
          <span className="text-5xl font-bold italic leading-none text-carbon sm:text-6xl">
            {perf.wkg.toFixed(2)}
          </span>
          <span className="text-lg text-carbon/50">W/kg</span>
          <span className="rounded-full border border-carbon/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-carbon">
            {band.name}
          </span>
        </div>
        <div className="relative mt-5 h-1.5 rounded-full bg-carbon/10">
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-carbon"
            style={{ left: `${band.pos}%`, transform: "translate(-50%, -50%)" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-carbon/40">
          <span>2.0</span>
          <span>3.0</span>
          <span>4.0</span>
          <span>5.0+</span>
        </div>
        <p className="mt-5">
          À {perf.puissance} W pour {perf.poids} kg. Avec un deuxième record de
          puissance, on traçait ta loi de puissance complète — mais ton W/kg
          dit déjà l'essentiel : c'est le chiffre qui se travaille en
          priorité.
        </p>
      </ResultCard>
    );
  }

  return (
    <ResultCard label="Ta loi de puissance">
      <p>
        Sans capteur de puissance, on ne peut pas encore tracer ta courbe — et
        c'est justement le premier angle mort à lever. Ta{" "}
        <strong className="text-carbon">loi de puissance</strong> (ton W/kg au
        seuil et ta capacité à le tenir dans la durée) est ce qui dicte ton
        niveau réel à vélo. La mesurer, puis la faire grimper, c'est le point
        de départ de toute vraie progression.
      </p>
    </ResultCard>
  );
}

function PlStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="min-w-[110px] flex-1">
      <p className="text-[11px] font-medium uppercase tracking-wide text-carbon/40">{label}</p>
      <p className="mt-2 font-display text-2xl italic text-carbon sm:text-3xl">{value}</p>
      <p className="mt-1.5 text-xs text-carbon/50">{sub}</p>
    </div>
  );
}

function PowerCurve({
  model,
  points,
}: {
  model: { S: number; E: number };
  points: { T: number; P: number }[];
}) {
  const W = 600;
  const H = 180;
  const padL = 8;
  const padR = 8;
  const padT = 14;
  const padB = 26;
  const tMin = 60;
  const tMax = 14400;
  const lxMin = Math.log(tMin);
  const lxMax = Math.log(tMax);
  const x = (T: number) => padL + ((Math.log(T) - lxMin) / (lxMax - lxMin)) * (W - padL - padR);

  let pHi = powerAtT(tMin, model.S, model.E);
  let pLo = powerAtT(tMax, model.S, model.E);
  points.forEach((p) => {
    pHi = Math.max(pHi, p.P);
    pLo = Math.min(pLo, p.P);
  });
  const span = pHi - pLo || 10;
  const padY = span * 0.14;
  const yHi = pHi + padY;
  const yLo = Math.max(0, pLo - padY);
  const y = (P: number) => padT + ((yHi - P) / (yHi - yLo)) * (H - padT - padB);

  let d = "";
  for (let i = 0; i <= 60; i++) {
    const T = Math.exp(lxMin + ((lxMax - lxMin) * i) / 60);
    d += `${i === 0 ? "M" : "L"}${x(T).toFixed(1)} ${y(powerAtT(T, model.S, model.E)).toFixed(1)} `;
  }
  const area = `${d}L${x(tMax).toFixed(1)} ${y(yLo).toFixed(1)} L${x(tMin).toFixed(1)} ${y(yLo).toFixed(1)} Z`;

  const ticks = [
    { T: 60, l: "1min" },
    { T: 300, l: "5min" },
    { T: 1200, l: "20min" },
    { T: 3600, l: "1h" },
    { T: 10800, l: "3h" },
  ];

  return (
    <div className="mt-5 h-[180px]">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full">
        <path d={area} fill="rgba(159,1,255,0.12)" />
        <path d={d} fill="none" stroke="#9F01FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={x(p.T)} cy={y(p.P)} r={4.5} fill="#9F01FF" stroke="#FFFFFF" strokeWidth={2} />
        ))}
        {ticks.map((t, i) => (
          <text
            key={t.T}
            x={x(t.T)}
            y={H - 7}
            fill="#6A6A6A"
            fontSize={12}
            textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}
          >
            {t.l}
          </text>
        ))}
      </svg>
    </div>
  );
}

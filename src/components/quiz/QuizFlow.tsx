"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import {
  computePerf,
  currentProfile,
  QUESTIONS,
  QUIZ_RESULT_STORAGE_KEY,
  type QuizAnswers,
} from "@/lib/quiz";

const TOTAL_STEPS = QUESTIONS.length + 1; // +1 = étape perf

type Stage = "intro" | "question" | "perf" | "gate";

function stageFor(step: number): Stage {
  if (step === 0) return "intro";
  const i = step - 1;
  if (i < QUESTIONS.length) return "question";
  if (i === QUESTIONS.length) return "perf";
  return "gate";
}

export default function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [poids, setPoids] = useState("");
  const [p1, setP1] = useState("");
  const [p5, setP5] = useState("");
  const [p20, setP20] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const stage = stageFor(step);
  const progressPct = stage === "question" ? Math.round(((step) / TOTAL_STEPS) * 100) : null;

  function answer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function num(v: string): number | null {
    const n = parseFloat(v);
    return n > 0 ? n : null;
  }

  function submitPerf() {
    setStep((s) => s + 1);
  }

  function skipPerf() {
    setPoids("");
    setP1("");
    setP5("");
    setP20("");
    setStep((s) => s + 1);
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Merci d'entrer une adresse email valide.");
      return;
    }
    setEmailError("");
    setSubmitting(true);

    const perf = computePerf(num(poids), num(p1), num(p5), num(p20));
    const profile = currentProfile(answers.frustration);

    const payload = {
      email,
      list: "quiz",
      fields: {
        profil: profile.key,
        niveau: answers.niveau || "",
        volume: answers.volume || "",
        contrainte: answers.contrainte || "",
        faiblesse: answers.faiblesse || "",
        frustration: answers.frustration || "",
        objectif: answers.objectif || "",
        wkg: perf.wkg != null ? String(perf.wkg) : "",
        profil_physio: perf.profile ? perf.profile.key : "",
      },
    };

    const reveal = () => {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          QUIZ_RESULT_STORAGE_KEY,
          JSON.stringify({ profile, perf }),
        );
      }
      router.push("/quiz/resultat");
    };

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // best-effort : on révèle le résultat même si l'appel échoue.
    }
    reveal();
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
      {progressPct !== null && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-white/10">
          <div
            className="h-full bg-cream transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      {stage === "intro" && (
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
            2 min · 8 questions · bilan offert
          </p>
          <h1 className="mt-5 font-display text-4xl italic leading-tight sm:text-6xl">
            Quel est ton profil de cycliste&nbsp;?
          </h1>
          <p className="mt-5 max-w-lg text-lg text-cream/60">
            La plupart des cyclistes stagnent pour une seule raison qu'ils n'ont
            jamais nommée. Réponds à 8 questions&nbsp;: tu repars avec ton
            profil, ton rapport W/kg estimé et le levier n°1 pour débloquer ta
            progression.
          </p>
          <div className="mt-10">
            <Button onClick={() => setStep(1)} className="w-full sm:w-auto">
              Découvrir mon profil →
            </Button>
          </div>
          <p className="mt-5 text-sm text-cream/40">
            Gratuit. Aucune carte. Désabonnement en 1 clic.
          </p>
        </div>
      )}

      {stage === "question" && (
        <QuestionStep
          index={step - 1}
          answers={answers}
          onAnswer={answer}
          onBack={goBack}
        />
      )}

      {stage === "perf" && (
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
            Question {TOTAL_STEPS} / {TOTAL_STEPS}
          </p>
          <h2 className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl">
            Tes meilleures puissances.
          </h2>
          <p className="mt-3 max-w-lg text-cream/60">
            On en déduit ta <strong className="text-cream">loi de puissance</strong>
            &nbsp;: ton profil physiologique, ton seuil et ton temps limite.
            Poids + au moins 2 efforts (Strava ou ton capteur te les donnent).
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <PerfField label="Poids" unit="kg" value={poids} onChange={setPoids} placeholder="72" />
            <PerfField label="Max 1 min" unit="W" value={p1} onChange={setP1} placeholder="480" />
            <PerfField label="Max 5 min" unit="W" value={p5} onChange={setP5} placeholder="330" />
            <PerfField label="Max 20 min" unit="W" value={p20} onChange={setP20} placeholder="280" />
          </div>
          <p className="mt-3 text-sm text-cream/40">
            Tes records de puissance sur ces durées. Deux suffisent — trois
            affinent ta courbe.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4">
            <Button onClick={submitPerf}>Voir mon profil →</Button>
            <button
              onClick={skipPerf}
              className="border-b border-white/20 text-sm text-cream/50 transition-colors hover:text-cream"
            >
              Je n'ai pas de capteur de puissance
            </button>
          </div>

          <BackLink onClick={goBack} />
        </div>
      )}

      {stage === "gate" && (
        <div>
          <div className="rounded-2xl bg-surface p-8 ring-1 ring-white/10 sm:p-11">
            <div className="mb-8 text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
                ✓ Ton bilan est prêt
              </p>
              <p className="mt-3 select-none text-4xl font-bold italic text-cream blur-[11px] sm:text-5xl">
                {currentProfile(answers.frustration).name}
              </p>
              <p className="mt-3 text-cream/60">
                Ton profil, ton W/kg et ton levier n°1 t'attendent.
              </p>
            </div>

            <form onSubmit={submitEmail} className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="quiz-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="quiz-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                autoComplete="email"
                className="min-h-[60px] flex-1 rounded-2xl border border-white/10 bg-ink px-5 text-base text-cream outline-none focus:border-cream"
              />
              <Button type="submit" disabled={submitting} className="min-h-[60px]">
                {submitting ? "…" : "Débloquer"}
              </Button>
            </form>
            {emailError && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {emailError}
              </p>
            )}
            <p className="mt-4 text-xs text-cream/40">
              Je t'envoie ton bilan + des conseils utiles. Pas de spam,
              désabo en 1 clic.
            </p>
          </div>

          <BackLink onClick={goBack} />
        </div>
      )}
    </div>
  );
}

function QuestionStep({
  index,
  answers,
  onAnswer,
  onBack,
}: {
  index: number;
  answers: QuizAnswers;
  onAnswer: (id: string, value: string) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[index];
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-cream/40">
        Question {index + 1} / {TOTAL_STEPS}
      </p>
      <h2 className="mt-4 font-display text-3xl italic leading-tight sm:text-4xl">
        {q.title}
      </h2>
      <p className="mt-3 text-cream/60">{q.hint}</p>

      <div className="mt-8 flex flex-col gap-3">
        {q.options.map((o) => {
          const selected = answers[q.id] === o.v;
          return (
            <button
              key={o.v}
              onClick={() => onAnswer(q.id, o.v)}
              className={`flex items-start gap-5 rounded-2xl border p-5 text-left transition-colors ${
                selected
                  ? "border-cream bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <span
                className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-[1.6px] ${
                  selected ? "border-cream bg-cream" : "border-white/30"
                }`}
              />
              <span>
                <span className="block text-lg font-semibold text-cream">{o.t}</span>
                <span className="mt-1 block text-sm text-cream/50">{o.d}</span>
              </span>
            </button>
          );
        })}
      </div>

      <BackLink onClick={onBack} />
    </div>
  );
}

function PerfField({
  label,
  unit,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.025] focus-within:border-cream">
      <label className="flex min-w-[120px] items-center self-stretch border-r border-white/10 px-5 text-xs font-medium uppercase tracking-wide text-cream/50">
        {label}
      </label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[64px] flex-1 min-w-0 bg-transparent px-5 text-xl font-semibold text-cream outline-none placeholder:text-cream/30"
      />
      <span className="px-5 text-sm text-cream/40">{unit}</span>
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-10">
      <button
        onClick={onClick}
        className="text-xs uppercase tracking-widest text-cream/40 transition-colors hover:text-cream"
      >
        ← Retour
      </button>
    </div>
  );
}

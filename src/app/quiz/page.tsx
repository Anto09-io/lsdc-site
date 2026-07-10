import type { Metadata } from "next";
import QuizFlow from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "Quel est ton profil de cycliste ?",
  description:
    "Découvre ton profil de cycliste en 2 minutes : ton point de blocage n°1 et le levier qui débloque ta progression. Bilan personnalisé offert.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return <QuizFlow />;
}

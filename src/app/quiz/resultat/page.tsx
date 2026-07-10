import type { Metadata } from "next";
import QuizResult from "@/components/quiz/QuizResult";

export const metadata: Metadata = {
  title: "Ton profil de cycliste",
  description: "Ton bilan personnalisé : profil, rapport watt/kg et levier n°1 de progression.",
  robots: { index: false, follow: true },
};

export default function QuizResultPage() {
  return <QuizResult />;
}

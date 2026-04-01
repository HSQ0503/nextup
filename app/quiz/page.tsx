import type { Metadata } from "next";
import QuizEngine from "@/components/quiz-engine";

export const metadata: Metadata = {
  title: "Career Quiz — Career Compass",
  description: "Take our career quiz to discover the career paths that match your interests and strengths.",
};

export default function QuizPage() {
  return <QuizEngine />;
}

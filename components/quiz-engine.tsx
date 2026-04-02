"use client";

import { useState, useEffect, useRef } from "react";
import { questions } from "@/lib/quiz-data";
import { categories, type CareerCategory } from "@/lib/career-categories";
import { generateResultsPdf, type QuizResult } from "@/components/result-pdf";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckSquare,
  FileText,
  Download,
  RotateCcw,
  Compass,
  Sparkles,
} from "lucide-react";
import Aurora from "@/components/aurora";
import ThreadsBg from "@/components/threads-bg";

type QuizState = "intro" | "active" | "results";

function CountUp({ target, delay }: { target: number; delay: number }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      started.current = true;
      const start = performance.now();
      const duration = 800;
      function tick() {
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <>{value}</>;
}

const CONFETTI_PIECES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  const dist = 60 + Math.random() * 120;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 40,
    r: Math.random() * 360,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 0.3,
    round: Math.random() > 0.5,
    opacity: 0.6 + Math.random() * 0.4,
  };
});

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {CONFETTI_PIECES.map((p, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/3"
          style={{
            width: p.size,
            height: p.size,
            borderRadius: p.round ? "50%" : "1px",
            background: `rgba(201,168,76,${p.opacity})`,
            "--confetti-x": `${p.x}px`,
            "--confetti-y": `${p.y}px`,
            "--confetti-r": `${p.r}deg`,
            animation: `confetti-fall 1.5s ease-out ${p.delay}s both`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function QuizEngine() {
  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [results, setResults] = useState<QuizResult[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  function selectOption(optionIndex: number) {
    const next = [...answers];
    next[currentQ] = optionIndex;
    setAnswers(next);
  }

  function goNext() {
    if (answers[currentQ] === null) return;
    if (currentQ < questions.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQ(currentQ + 1);
        setTransitioning(false);
      }, 250);
    } else {
      calculateResults();
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQ(currentQ - 1);
        setTransitioning(false);
      }, 250);
    }
  }

  function calculateResults() {
    const scores: Record<CareerCategory, number> = {
      healthcare: 0, finance: 0, engineering: 0, "creative-arts": 0,
      law: 0, education: 0, technology: 0, business: 0,
    };
    const maxScores: Record<CareerCategory, number> = {
      healthcare: 0, finance: 0, engineering: 0, "creative-arts": 0,
      law: 0, education: 0, technology: 0, business: 0,
    };

    for (const q of questions) {
      for (const cat of Object.keys(scores) as CareerCategory[]) {
        const maxForCat = Math.max(...q.options.map((o) => o.scores[cat] ?? 0));
        maxScores[cat] += maxForCat;
      }
    }

    for (let i = 0; i < questions.length; i++) {
      const chosen = answers[i];
      if (chosen === null) continue;
      const option = questions[i].options[chosen];
      for (const [cat, pts] of Object.entries(option.scores)) {
        scores[cat as CareerCategory] += pts;
      }
    }

    const ranked = (Object.keys(scores) as CareerCategory[])
      .map((cat) => ({
        category: categories.find((c) => c.id === cat)!,
        percentage: maxScores[cat] > 0 ? Math.round((scores[cat] / maxScores[cat]) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    setResults(ranked);
    setState("results");
  }

  function retake() {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQ(0);
    setResults([]);
    setState("intro");
  }

  // ===== INTRO STATE =====
  if (state === "intro") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-10">
        <Aurora />
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          }}
        />

        <div className="relative z-[2] mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div
            className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[22px] border border-gold/15 bg-gold/[0.08]"
            style={{ animation: "compass-pulse 2.5s ease-in-out infinite" }}
          >
            <Compass size={36} className="text-gold" />
          </div>

          {/* Heading */}
          <h1 className="mb-4 font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            Discover Your
            <br />
            <span className="bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-md text-[1.05rem] font-light leading-relaxed text-white/55">
            15 quick questions about your interests, strengths, and
            preferences — matched to real career paths that fit who you are.
          </p>

          {/* Meta pills */}
          <div className="mb-9 flex justify-center gap-4">
            {[
              { icon: <Clock size={14} />, text: "~5 minutes" },
              { icon: <CheckSquare size={14} />, text: "15 questions" },
              { icon: <FileText size={14} />, text: "PDF results" },
            ].map((m) => (
              <div
                key={m.text}
                className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-xs text-white/55"
              >
                <span className="text-gold">{m.icon}</span>
                {m.text}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setState("active")}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gold px-8 py-4 font-heading text-[15px] font-bold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.25)] cursor-pointer"
          >
            Start Quiz
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Category preview */}
          <div className="mt-14">
            <div className="mb-4 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white/30">
              <Sparkles size={12} className="text-gold/40" />
              Explore 8 career fields
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-white/40 transition-colors hover:border-gold/15 hover:text-white/60"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== ACTIVE QUESTION STATE =====
  if (state === "active") {
    const q = questions[currentQ];
    const progress = ((currentQ + (answers[currentQ] !== null ? 1 : 0)) / questions.length) * 100;

    return (
      <div className="mx-auto max-w-xl px-6 pt-32 pb-20">
        <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-400"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(201,168,76,0.3)" }}
          />
        </div>
        <div className={`transition-all duration-250 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
          <div className="mb-6 text-xs text-white/55 font-heading">
            Question <span className="font-semibold text-gold">{currentQ + 1}</span> of {questions.length}
          </div>
          <h2 className="mb-7 font-heading text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            {q.question}
          </h2>
          <div className="flex flex-col gap-2.5">
            {q.options.map((opt, i) => {
              const selected = answers[currentQ] === i;
              return (
                <button
                  key={opt.label}
                  onClick={() => selectOption(i)}
                  className={`flex items-center gap-3.5 rounded-[14px] border px-5 py-4 text-left transition-all cursor-pointer ${
                    selected
                      ? "border-gold bg-gold/[0.08] scale-[1.02]"
                      : "border-white/[0.06] bg-white/[0.03] hover:border-gold/20 hover:bg-gold/[0.04] scale-100"
                  }`}
                  style={{ transitionDuration: "200ms" }}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-heading text-[13px] font-semibold ${
                      selected ? "bg-gold text-navy-deep" : "bg-white/5 text-white/55"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className="text-[0.95rem] leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/[0.04] pt-5">
          <button
            onClick={goBack}
            disabled={currentQ === 0}
            className="flex items-center gap-1.5 text-[13px] text-white/55 disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            onClick={goNext}
            disabled={answers[currentQ] === null}
            className="inline-flex items-center gap-2 rounded-[10px] bg-gold px-6 py-2.5 font-heading text-sm font-semibold text-navy-deep transition-all disabled:opacity-40 hover:bg-gold-light cursor-pointer disabled:cursor-default"
          >
            {currentQ === questions.length - 1 ? "See Results" : "Next"}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // ===== RESULTS STATE =====
  return (
    <div className="relative mx-auto max-w-2xl px-6 pt-32 pb-20">
      <ThreadsBg />
      <Confetti />
      <div className="relative z-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Your Career Matches
          </h1>
          <p className="text-sm text-white/55">
            Based on your answers, here are the career paths that best fit your profile.
          </p>
        </div>
        <div className="mb-7 flex flex-col gap-3">
          {results.map((r, i) => (
            <div
              key={r.category.id}
              className="flex items-start gap-4 rounded-2xl border border-gold/[0.08] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              style={{
                borderLeft: i === 0 ? "3px solid #C9A84C" : i === 1 ? "2px solid rgba(201,168,76,0.6)" : "1px solid rgba(201,168,76,0.35)",
                animation: "fade-up 500ms ease-out both",
                animationDelay: `${i * 150}ms`,
              }}
            >
              <span
                className="font-heading text-[28px] font-extrabold leading-none"
                style={{ color: i === 0 ? "#C9A84C" : i === 1 ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.35)" }}
              >
                #{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-base font-semibold mb-1">{r.category.name}</h3>
                <p className="text-[0.85rem] leading-relaxed text-white/55">{r.category.description}</p>
              </div>
              <span className="shrink-0 rounded-md bg-gold/10 px-2.5 py-1 font-heading text-xs font-semibold text-gold">
                <CountUp target={r.percentage} delay={i * 150 + 500} />% match
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2.5" style={{ animation: "fade-up 500ms ease-out both", animationDelay: "500ms" }}>
          <button
            onClick={() => generateResultsPdf(results)}
            className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-gold px-5 py-3 font-heading text-sm font-semibold text-navy-deep transition-all hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(201,168,76,0.25)] cursor-pointer"
          >
            <Download size={16} /> Download as PDF
          </button>
          <button
            onClick={retake}
            className="flex items-center justify-center gap-2 rounded-[10px] border border-white/10 px-5 py-3 font-heading text-sm font-medium text-white/55 transition-all hover:border-white/20 hover:text-white cursor-pointer"
          >
            <RotateCcw size={14} /> Retake
          </button>
        </div>
      </div>
    </div>
  );
}

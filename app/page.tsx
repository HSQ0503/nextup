import Link from "next/link";
import { ArrowRight, Edit3, BarChart3, CheckCircle2, User } from "lucide-react";
import Aurora from "@/components/aurora";
import Compass from "@/components/compass";
import SectionLabel from "@/components/section-label";

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16">
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
        <div className="relative z-[2] mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gold/[0.08] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.05em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" style={{ animation: "badge-pulse 2s ease-in-out infinite" }} />
              Helping students find direction
            </div>
            <h1 className="font-heading text-[clamp(2.75rem,5.5vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em] mb-5">
              Find the career
              <br />
              that{" "}
              <span className="bg-gradient-to-br from-gold to-gold-light bg-clip-text text-transparent">
                fits you
              </span>
            </h1>
            <p className="mb-9 max-w-[440px] text-lg font-light leading-relaxed text-white/55">
              Take a short quiz, discover career paths matched to your strengths,
              and get a clear roadmap to make it happen.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/quiz"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gold px-8 py-4 font-heading text-[15px] font-bold text-navy-deep transition-all hover:shadow-[0_8px_32px_rgba(201,168,76,0.25)] hover:-translate-y-0.5 cursor-pointer"
              >
                Take the Career Quiz
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#mission"
                className="inline-flex items-center gap-2 px-6 py-4 font-heading text-[15px] font-medium text-white/55 transition-colors hover:text-white cursor-pointer"
              >
                Learn more
              </Link>
            </div>
          </div>
          {/* Compass */}
          <div className="hidden items-center justify-center lg:flex">
            <Compass />
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 text-white/55">
          <div
            className="h-10 w-px bg-gradient-to-b from-gold to-transparent"
            style={{ animation: "pulse-line 2s ease-in-out infinite" }}
          />
          <span className="text-[11px] uppercase tracking-[0.1em]">scroll</span>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <div className="h-20 bg-gradient-to-b from-navy-darker to-cream" />
      <section
        id="mission"
        className="relative bg-cream px-6 py-32 text-navy-darker"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(201,168,76,0.06), transparent)" }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Our Mission</SectionLabel>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-snug tracking-tight mb-6 text-navy-darker">
            Not just career goals.
            <br />
            A plan to achieve them.
          </h2>
          <p className="text-lg leading-[1.85] text-[#506070]">
            NextStep provides high school students with personalized career
            guidance and actionable pathways to make informed decisions about their
            future. We don&apos;t just help you figure out what you want to do — we
            help you get there.
          </p>
          <div className="mx-auto mt-9 h-[3px] w-12 rounded-full bg-gradient-to-r from-gold to-transparent" />
        </div>
      </section>
      <div className="h-20 bg-gradient-to-b from-cream to-navy" />

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-navy px-6 py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-20 text-center">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
              Three steps to clarity
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { num: "01", title: "Take the Quiz", desc: "Answer questions about your interests, strengths, and what kind of work environment excites you.", icon: <Edit3 size={20} className="text-gold" /> },
              { num: "02", title: "Get Your Results", desc: "See your top 2–3 career paths with detailed descriptions. Download them as a PDF to keep.", icon: <BarChart3 size={20} className="text-gold" /> },
              { num: "03", title: "Take Action", desc: "Join a chapter, attend events, connect with mentors, and start building toward your future.", icon: <CheckCircle2 size={20} className="text-gold" /> },
            ].map((step) => (
              <div
                key={step.num}
                className="group relative overflow-hidden rounded-[20px] border border-gold/[0.08] bg-white/[0.03] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-[0_24px_48px_rgba(0,0,0,0.25),0_0_16px_rgba(201,168,76,0.06)] cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-[10px] bg-gold/[0.08]">
                  {step.icon}
                </div>
                <div className="mb-5 bg-gradient-to-b from-gold/15 to-transparent bg-clip-text font-heading text-[64px] font-black leading-none text-transparent transition-all duration-300 group-hover:from-gold/30">
                  {step.num}
                </div>
                <h3 className="mb-3 font-heading text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[0.95rem] font-light leading-relaxed text-white/55">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <div className="h-16 bg-gradient-to-b from-navy to-navy-darker" />
      <section className="relative overflow-hidden bg-navy-darker px-6 py-28">
        <div
          className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto grid max-w-[900px] items-center gap-14 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-3xl border border-gold/[0.12] bg-gradient-to-br from-navy to-navy-light md:mx-0">
            <User size={72} className="text-white/15" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/10" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                Meet the Founder
              </span>
              <span className="h-px flex-1 bg-gold/20" />
            </div>
            <h3 className="mb-4 font-heading text-[2rem] font-bold tracking-tight">
              Gabriel Rossi Nunciaroni
            </h3>
            <p className="mb-5 text-[1.05rem] font-light leading-[1.8] text-white/55">
              A high school student in Orlando, Florida, Gabriel started NextStep
              with one goal: help students who feel lost about their future find
              direction — and a real plan to get there.
            </p>
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-5 w-5 min-w-5 text-gold">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-[0.95rem] italic leading-relaxed text-white/40">
                I&apos;ve always had the goal to help other students discover their
                path and take real steps toward it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

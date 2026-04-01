# Career Compass Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Career Compass V1 website — 5 pages with a client-side career quiz, PDF download, and Resend-powered contact form.

**Architecture:** Static Next.js 16 App Router site. All pages are server components except the quiz (client component with useState-driven state machine) and navbar (client component for mobile menu toggle). Contact form uses a Server Action that calls Resend. No database.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript, jsPDF, lucide-react, Resend

**Design Spec:** `docs/superpowers/specs/2026-04-01-career-compass-website-design.md`

---

## File Structure

```
app/
├── layout.tsx              # Root layout: Outfit + Work Sans fonts, metadata, navbar + footer
├── globals.css             # Tailwind 4 imports, CSS custom properties, keyframe animations
├── page.tsx                # Homepage (4 sections)
├── quiz/
│   └── page.tsx            # Quiz page wrapper (server component)
├── team/
│   └── page.tsx            # Our Team page
├── volunteer/
│   └── page.tsx            # Get Involved page
├── contact/
│   ├── page.tsx            # Contact page
│   └── action.ts           # Server Action: send email via Resend
components/
├── navbar.tsx              # Floating glass navbar (client component for mobile menu)
├── footer.tsx              # Site footer
├── section-label.tsx       # Reusable gold section label with flanking lines
├── page-hero.tsx           # Reusable page hero (centered heading + subtitle)
├── compass.tsx             # Animated compass hero element (client component)
├── aurora.tsx              # Aurora gradient blobs background
├── quiz-engine.tsx         # Quiz state machine: intro → questions → results (client component)
├── result-pdf.ts           # PDF generation utility (jsPDF)
lib/
├── quiz-data.ts            # 15 questions, options, scoring weights per career category
├── career-categories.ts    # 8 category definitions with descriptions
├── team-data.ts            # Team member array (name, role, bio, isFounder)
```

---

## Task 1: Install Dependencies and Configure Design Tokens

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Install new dependencies**

```bash
npm install lucide-react jspdf
```

- [ ] **Step 2: Replace `app/globals.css` with design token configuration**

Replace the entire file with:

```css
@import "tailwindcss";

@theme inline {
  /* Colors */
  --color-navy: #224A6F;
  --color-navy-deep: #162F4A;
  --color-navy-darker: #0E1F33;
  --color-navy-light: #2D5F8A;
  --color-gold: #C9A84C;
  --color-gold-light: #DBBE66;
  --color-cream: #FBF6EC;

  /* Font families */
  --font-heading: "Outfit", sans-serif;
  --font-body: "Work Sans", sans-serif;
}

/* Animated aurora blobs */
@keyframes aurora-float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
  100% { transform: translate(30px, -10px) scale(1.02); }
}

/* Slow compass ring rotation */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Compass needle drift */
@keyframes needle-drift {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}

/* Floating card bob */
@keyframes float-card {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Badge pulse */
@keyframes badge-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 0 6px transparent; }
}

/* Scroll indicator pulse */
@keyframes pulse-line {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background: var(--color-navy-darker);
  color: #ffffff;
}
```

- [ ] **Step 3: Update `app/layout.tsx` with Outfit + Work Sans fonts and metadata**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Career Compass — Find the Career That Fits You",
  description:
    "Career Compass helps high school students discover career paths through a personalized quiz and actionable guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify the build compiles**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx package.json package-lock.json
git commit -m "Configure design tokens, fonts, and install dependencies"
```

---

## Task 2: Build Shared Components (Navbar, Footer, SectionLabel, PageHero)

**Files:**
- Create: `components/navbar.tsx`
- Create: `components/footer.tsx`
- Create: `components/section-label.tsx`
- Create: `components/page-hero.tsx`
- Modify: `app/layout.tsx` (add Navbar + Footer)

- [ ] **Step 1: Create `components/section-label.tsx`**

```tsx
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-6 bg-gold/40" />
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
        {children}
      </span>
      <span className="h-px w-6 bg-gold/40" />
    </div>
  );
}
```

- [ ] **Step 2: Create `components/page-hero.tsx`**

```tsx
export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center px-6 pt-32 pb-10 max-w-3xl mx-auto">
      <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-white/55 text-lg leading-relaxed font-light max-w-md mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/team", label: "Team" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-6 right-6 z-50 flex items-center justify-between rounded-2xl border border-gold/[0.08] bg-navy-deep/60 px-7 py-3.5 backdrop-blur-[24px] backdrop-saturate-150">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/logo/image.png"
          alt="Career Compass logo"
          width={120}
          height={28}
          priority
        />
      </Link>

      {/* Desktop nav */}
      <div className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[13.5px] text-white/55 transition-colors hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/quiz"
          className="rounded-[10px] bg-gold px-5 py-2 text-[13px] font-semibold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5 cursor-pointer"
        >
          Take the Quiz
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white/55 cursor-pointer"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-2xl border border-gold/[0.08] bg-navy-deep/90 p-4 backdrop-blur-[24px] md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-gold px-4 py-3 text-center text-sm font-semibold text-navy-deep"
          >
            Take the Quiz
          </Link>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 4: Create `components/footer.tsx`**

```tsx
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/team", label: "Team" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-navy-darker px-6 py-8 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-[13px] text-white/25">
          &copy; {new Date().getFullYear()} Career Compass
        </span>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/25 transition-colors hover:text-gold cursor-pointer"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Update `app/layout.tsx` to include Navbar and Footer**

Add imports and wrap children:

```tsx
import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Career Compass — Find the Career That Fits You",
  description:
    "Career Compass helps high school students discover career paths through a personalized quiz and actionable guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add components/ app/layout.tsx
git commit -m "Add shared components: navbar, footer, section-label, page-hero"
```

---

## Task 3: Build Homepage — Hero Section with Animated Compass

**Files:**
- Create: `components/aurora.tsx`
- Create: `components/compass.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/aurora.tsx`**

```tsx
export default function Aurora() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.3), transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute top-[20%] -right-[15%] h-[600px] w-[600px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(45,95,138,0.5), transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s ease-in-out infinite alternate",
          animationDelay: "-5s",
        }}
      />
      <div
        className="absolute -bottom-[10%] left-[30%] h-[500px] w-[500px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.15), transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s ease-in-out infinite alternate",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create `components/compass.tsx`**

```tsx
"use client";

export default function Compass() {
  return (
    <div className="relative h-[340px] w-[340px] lg:h-[380px] lg:w-[380px]">
      {/* Outer rings */}
      <div
        className="absolute inset-0 rounded-full border border-gold/[0.12]"
        style={{ animation: "spin-slow 60s linear infinite" }}
      >
        {/* Tick marks */}
        <span className="absolute -top-px left-1/2 h-3 w-0.5 -translate-x-1/2 bg-gold/40" />
        <span className="absolute -bottom-px left-1/2 h-3 w-0.5 -translate-x-1/2 bg-gold/40" />
      </div>
      <div
        className="absolute inset-5 rounded-full border border-gold/[0.08]"
        style={{ animation: "spin-slow 45s linear infinite reverse" }}
      />
      <div className="absolute inset-10 rounded-full border border-gold/[0.18]" />

      {/* Glass center */}
      <div className="absolute inset-[60px] flex flex-col items-center justify-center rounded-full border border-gold/[0.12] bg-navy/30 shadow-[0_0_80px_rgba(201,168,76,0.06),inset_0_0_60px_rgba(34,74,111,0.2)] backdrop-blur-[30px] backdrop-saturate-150">
        {/* Needle */}
        <div
          className="relative h-[100px] w-1"
          style={{ animation: "needle-drift 8s ease-in-out infinite" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 border-x-[8px] border-b-[50px] border-x-transparent border-b-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-x-[6px] border-t-[40px] border-x-transparent border-t-white/15" />
        </div>
        {/* Center dot */}
        <div className="absolute h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_20px_rgba(201,168,76,0.4)]" />
      </div>

      {/* Cardinal points */}
      <span className="absolute top-[50px] left-1/2 -translate-x-1/2 font-heading text-[13px] font-semibold text-gold tracking-wide">
        N
      </span>
      <span className="absolute bottom-[50px] left-1/2 -translate-x-1/2 font-heading text-[13px] font-semibold text-gold/50 tracking-wide">
        S
      </span>
      <span className="absolute right-[50px] top-1/2 -translate-y-1/2 font-heading text-[13px] font-semibold text-gold/50 tracking-wide">
        E
      </span>
      <span className="absolute left-[50px] top-1/2 -translate-y-1/2 font-heading text-[13px] font-semibold text-gold/50 tracking-wide">
        W
      </span>

      {/* Floating stat cards */}
      <div
        className="absolute -right-10 top-2.5 rounded-[14px] border border-gold/10 bg-navy-deep/60 px-[18px] py-3.5 backdrop-blur-[20px]"
        style={{ animation: "float-card 6s ease-in-out infinite" }}
      >
        <span className="block font-heading text-xl font-bold text-gold">8+</span>
        <span className="text-[11px] text-white/55">Career Fields</span>
      </div>
      <div
        className="absolute -left-[30px] bottom-[30px] rounded-[14px] border border-gold/10 bg-navy-deep/60 px-[18px] py-3.5 backdrop-blur-[20px]"
        style={{ animation: "float-card 6s ease-in-out infinite", animationDelay: "-2s" }}
      >
        <span className="block font-heading text-xl font-bold text-gold">15</span>
        <span className="text-[11px] text-white/55">Quiz Questions</span>
      </div>
      <div
        className="absolute -bottom-2.5 right-0 rounded-[14px] border border-gold/10 bg-navy-deep/60 px-[18px] py-3.5 backdrop-blur-[20px]"
        style={{ animation: "float-card 6s ease-in-out infinite", animationDelay: "-4s" }}
      >
        <span className="block font-heading text-xl font-bold text-gold">PDF</span>
        <span className="text-[11px] text-white/55">Download Results</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx` with the full homepage**

```tsx
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
      <section
        id="mission"
        className="-mt-10 bg-cream px-6 py-32 text-navy-darker"
        style={{ clipPath: "polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)" }}
      >
        <div className="mx-auto max-w-[720px] text-center">
          <SectionLabel>Our Mission</SectionLabel>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-snug tracking-tight mb-6 text-navy-darker">
            Not just career goals.
            <br />
            A plan to achieve them.
          </h2>
          <p className="text-lg leading-[1.85] text-[#506070]">
            Career Compass provides high school students with personalized career
            guidance and actionable pathways to make informed decisions about their
            future. We don&apos;t just help you figure out what you want to do — we
            help you get there.
          </p>
          <div className="mx-auto mt-9 h-[3px] w-12 rounded-full bg-gradient-to-r from-gold to-transparent" />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="-mt-10 bg-navy px-6 py-28">
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
                className="group relative overflow-hidden rounded-[20px] border border-gold/[0.08] bg-white/[0.03] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] cursor-pointer"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-[10px] bg-gold/[0.08]">
                  {step.icon}
                </div>
                <div className="mb-5 bg-gradient-to-b from-gold/15 to-transparent bg-clip-text font-heading text-[64px] font-black leading-none text-transparent">
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
              A high school student in Orlando, Florida, Gabriel started Career
              Compass with one goal: help students who feel lost about their
              future find direction — and a real plan to get there.
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
```

- [ ] **Step 4: Verify build and visually check dev server**

```bash
npm run build
```

Expected: Build succeeds. Run `npm run dev` and check `localhost:3000` — all 4 homepage sections should render with correct styling.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/aurora.tsx components/compass.tsx
git commit -m "Build homepage with hero, mission, how-it-works, and founder sections"
```

---

## Task 4: Build Quiz Data and Career Categories

**Files:**
- Create: `lib/career-categories.ts`
- Create: `lib/quiz-data.ts`

- [ ] **Step 1: Create `lib/career-categories.ts`**

```ts
export type CareerCategory =
  | "healthcare"
  | "finance"
  | "engineering"
  | "creative-arts"
  | "law"
  | "education"
  | "technology"
  | "business";

export type CategoryInfo = {
  id: CareerCategory;
  name: string;
  description: string;
};

export const categories: CategoryInfo[] = [
  {
    id: "healthcare",
    name: "Healthcare & Medicine",
    description:
      "Careers in medicine, nursing, public health, physical therapy, or biomedical research. Ideal for people who want to help others stay healthy and solve medical challenges.",
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    description:
      "Careers in banking, investing, financial planning, or accounting. Great for analytical minds who enjoy working with numbers and solving financial puzzles.",
  },
  {
    id: "engineering",
    name: "Engineering",
    description:
      "Careers in mechanical, civil, electrical, or aerospace engineering. Perfect for problem-solvers who love building things and understanding how systems work.",
  },
  {
    id: "creative-arts",
    name: "Creative Arts & Design",
    description:
      "Careers in graphic design, UX/UI, film, animation, writing, or creative direction. For people who think visually and love making things.",
  },
  {
    id: "law",
    name: "Law & Public Policy",
    description:
      "Careers in law, government, advocacy, or public policy. Suited for strong communicators who care about justice and systemic change.",
  },
  {
    id: "education",
    name: "Education & Counseling",
    description:
      "Careers in teaching, school counseling, curriculum design, or educational technology. Ideal for those who love mentoring and helping others grow.",
  },
  {
    id: "technology",
    name: "Technology & Software",
    description:
      "Careers in software engineering, data science, cybersecurity, or product management. Great for logical thinkers who enjoy building digital products.",
  },
  {
    id: "business",
    name: "Business & Entrepreneurship",
    description:
      "Careers in management, marketing, startups, or consulting. For natural leaders who enjoy strategy, communication, and building organizations.",
  },
];
```

- [ ] **Step 2: Create `lib/quiz-data.ts`**

```ts
import type { CareerCategory } from "./career-categories";

export type QuizOption = {
  label: string;
  text: string;
  scores: Partial<Record<CareerCategory, number>>;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

export const questions: QuizQuestion[] = [
  {
    question: "What type of school subject do you enjoy the most?",
    options: [
      { label: "A", text: "Biology or Chemistry", scores: { healthcare: 3, engineering: 1 } },
      { label: "B", text: "Math or Economics", scores: { finance: 3, engineering: 1 } },
      { label: "C", text: "Art, Music, or Creative Writing", scores: { "creative-arts": 3, education: 1 } },
      { label: "D", text: "History, Government, or Debate", scores: { law: 3, business: 1 } },
    ],
  },
  {
    question: "How do you prefer to spend a free afternoon?",
    options: [
      { label: "A", text: "Tinkering with gadgets or building something", scores: { engineering: 3, technology: 2 } },
      { label: "B", text: "Drawing, designing, or making videos", scores: { "creative-arts": 3 } },
      { label: "C", text: "Reading about current events or debating with friends", scores: { law: 2, business: 2 } },
      { label: "D", text: "Volunteering or tutoring someone", scores: { education: 3, healthcare: 1 } },
    ],
  },
  {
    question: "What type of work environment do you see yourself thriving in?",
    options: [
      { label: "A", text: "A structured office with clear goals and deadlines", scores: { finance: 2, business: 2 } },
      { label: "B", text: "A creative studio where ideas flow freely", scores: { "creative-arts": 3 } },
      { label: "C", text: "A lab or research setting, solving complex problems", scores: { healthcare: 2, engineering: 2, technology: 1 } },
      { label: "D", text: "Out in the community, working with people face-to-face", scores: { education: 2, law: 1, healthcare: 1 } },
    ],
  },
  {
    question: "Which of these strengths describes you best?",
    options: [
      { label: "A", text: "I'm great at analyzing data and spotting patterns", scores: { finance: 2, technology: 2, engineering: 1 } },
      { label: "B", text: "I'm a natural communicator and persuader", scores: { law: 2, business: 2 } },
      { label: "C", text: "I'm creative and think outside the box", scores: { "creative-arts": 3, technology: 1 } },
      { label: "D", text: "I'm empathetic and good at helping others", scores: { healthcare: 2, education: 2 } },
    ],
  },
  {
    question: "What kind of impact do you want your career to have?",
    options: [
      { label: "A", text: "Save lives or improve people's health", scores: { healthcare: 3 } },
      { label: "B", text: "Build products or systems that millions of people use", scores: { technology: 3, engineering: 1 } },
      { label: "C", text: "Fight for justice and make society fairer", scores: { law: 3, education: 1 } },
      { label: "D", text: "Create something beautiful or inspiring", scores: { "creative-arts": 3 } },
    ],
  },
  {
    question: "How do you feel about working with technology?",
    options: [
      { label: "A", text: "I love coding, apps, and learning new tech", scores: { technology: 3, engineering: 1 } },
      { label: "B", text: "I use it as a tool but it's not my passion", scores: { business: 1, finance: 1, law: 1 } },
      { label: "C", text: "I like using design or creative software", scores: { "creative-arts": 2, technology: 1 } },
      { label: "D", text: "I prefer working with people more than screens", scores: { education: 2, healthcare: 1 } },
    ],
  },
  {
    question: "Which project sounds most interesting to you?",
    options: [
      { label: "A", text: "Designing a marketing campaign for a new product", scores: { business: 3, "creative-arts": 1 } },
      { label: "B", text: "Developing a mobile app that solves a real problem", scores: { technology: 3, engineering: 1 } },
      { label: "C", text: "Organizing a community health awareness event", scores: { healthcare: 2, education: 2 } },
      { label: "D", text: "Writing a persuasive essay on a social issue", scores: { law: 2, "creative-arts": 1, education: 1 } },
    ],
  },
  {
    question: "How do you approach group projects?",
    options: [
      { label: "A", text: "I take charge and delegate tasks", scores: { business: 3, law: 1 } },
      { label: "B", text: "I focus on the research and data", scores: { finance: 2, engineering: 2 } },
      { label: "C", text: "I handle the design and presentation", scores: { "creative-arts": 3 } },
      { label: "D", text: "I make sure everyone is heard and on track", scores: { education: 2, healthcare: 1, business: 1 } },
    ],
  },
  {
    question: "What do you value most in a career?",
    options: [
      { label: "A", text: "Financial stability and growth potential", scores: { finance: 3, business: 1 } },
      { label: "B", text: "Creative freedom and self-expression", scores: { "creative-arts": 3 } },
      { label: "C", text: "Making a direct difference in people's lives", scores: { healthcare: 2, education: 2 } },
      { label: "D", text: "Solving challenging intellectual problems", scores: { engineering: 2, technology: 2, law: 1 } },
    ],
  },
  {
    question: "Which of these roles sounds most appealing?",
    options: [
      { label: "A", text: "Doctor, nurse, or physical therapist", scores: { healthcare: 3 } },
      { label: "B", text: "Software engineer or data scientist", scores: { technology: 3 } },
      { label: "C", text: "Lawyer, judge, or policy advisor", scores: { law: 3 } },
      { label: "D", text: "Teacher, counselor, or mentor", scores: { education: 3 } },
    ],
  },
  {
    question: "How do you handle stressful situations?",
    options: [
      { label: "A", text: "I stay calm and think logically through the problem", scores: { engineering: 2, healthcare: 2 } },
      { label: "B", text: "I talk it out with someone and brainstorm solutions", scores: { education: 2, business: 1 } },
      { label: "C", text: "I channel the stress into something creative", scores: { "creative-arts": 3 } },
      { label: "D", text: "I research the situation and prepare a plan", scores: { finance: 2, law: 1, technology: 1 } },
    ],
  },
  {
    question: "What kind of content do you consume online the most?",
    options: [
      { label: "A", text: "Science, health, or nature documentaries", scores: { healthcare: 2, engineering: 1 } },
      { label: "B", text: "Business, finance, or investing content", scores: { finance: 3, business: 1 } },
      { label: "C", text: "Design inspiration, art, or music", scores: { "creative-arts": 3 } },
      { label: "D", text: "Tech reviews, coding tutorials, or gadgets", scores: { technology: 3 } },
    ],
  },
  {
    question: "If you could start a club at school, what would it be?",
    options: [
      { label: "A", text: "Robotics or science olympiad", scores: { engineering: 3, technology: 1 } },
      { label: "B", text: "Mock trial or debate", scores: { law: 3, business: 1 } },
      { label: "C", text: "Art, film, or creative writing club", scores: { "creative-arts": 3 } },
      { label: "D", text: "Peer tutoring or mentoring program", scores: { education: 3 } },
    ],
  },
  {
    question: "What's your approach to learning something new?",
    options: [
      { label: "A", text: "Watch tutorials and try it hands-on immediately", scores: { technology: 2, engineering: 2 } },
      { label: "B", text: "Read about it thoroughly before starting", scores: { law: 2, finance: 1 } },
      { label: "C", text: "Learn by teaching it to someone else", scores: { education: 3 } },
      { label: "D", text: "Experiment creatively until something clicks", scores: { "creative-arts": 2, business: 1 } },
    ],
  },
  {
    question: "Where do you see yourself in 10 years?",
    options: [
      { label: "A", text: "Running my own company or leading a team", scores: { business: 3, technology: 1 } },
      { label: "B", text: "Working in a hospital, clinic, or research lab", scores: { healthcare: 3 } },
      { label: "C", text: "Creating art, designs, or media that inspires people", scores: { "creative-arts": 3 } },
      { label: "D", text: "Working in government, law, or education to drive change", scores: { law: 2, education: 2 } },
    ],
  },
];
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds (files are importable, types check out).

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "Add quiz questions, scoring weights, and career category definitions"
```

---

## Task 5: Build Quiz Engine and Results PDF

**Files:**
- Create: `components/result-pdf.ts`
- Create: `components/quiz-engine.tsx`
- Create: `app/quiz/page.tsx`

- [ ] **Step 1: Create `components/result-pdf.ts`**

```ts
import jsPDF from "jspdf";
import type { CategoryInfo } from "@/lib/career-categories";

export type QuizResult = {
  category: CategoryInfo;
  percentage: number;
};

export function generateResultsPdf(results: QuizResult[]) {
  const doc = new jsPDF();
  const navy = "#0E1F33";
  const gold = "#C9A84C";
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header background
  doc.setFillColor(14, 31, 51);
  doc.rect(0, 0, pageWidth, 50, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Career Compass", pageWidth / 2, 22, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Your Career Quiz Results", pageWidth / 2, 34, { align: "center" });

  // Date
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.text(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), pageWidth / 2, 44, { align: "center" });

  // Results
  let y = 68;
  results.forEach((result, i) => {
    // Rank number
    doc.setTextColor(201, 168, 76);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(`#${i + 1}`, 20, y);

    // Category name
    doc.setTextColor(14, 31, 51);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(result.category.name, 42, y - 2);

    // Match percentage
    doc.setFontSize(11);
    doc.setTextColor(201, 168, 76);
    doc.text(`${result.percentage}% match`, pageWidth - 20, y - 2, { align: "right" });

    // Description
    doc.setTextColor(80, 96, 112);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(result.category.description, pageWidth - 62);
    doc.text(lines, 42, y + 8);

    y += 16 + lines.length * 5 + 16;

    // Separator
    if (i < results.length - 1) {
      doc.setDrawColor(220, 220, 220);
      doc.line(20, y - 10, pageWidth - 20, y - 10);
    }
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text("Generated by Career Compass — careercompassorlando.com", pageWidth / 2, footerY, { align: "center" });

  doc.save("career-compass-results.pdf");
}
```

- [ ] **Step 2: Create `components/quiz-engine.tsx`**

```tsx
"use client";

import { useState } from "react";
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
} from "lucide-react";

type QuizState = "intro" | "active" | "results";

export default function QuizEngine() {
  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [results, setResults] = useState<QuizResult[]>([]);

  function selectOption(optionIndex: number) {
    const next = [...answers];
    next[currentQ] = optionIndex;
    setAnswers(next);
  }

  function goNext() {
    if (answers[currentQ] === null) return;
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResults();
    }
  }

  function goBack() {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  }

  function calculateResults() {
    const scores: Record<CareerCategory, number> = {
      healthcare: 0,
      finance: 0,
      engineering: 0,
      "creative-arts": 0,
      law: 0,
      education: 0,
      technology: 0,
      business: 0,
    };

    const maxScores: Record<CareerCategory, number> = {
      healthcare: 0,
      finance: 0,
      engineering: 0,
      "creative-arts": 0,
      law: 0,
      education: 0,
      technology: 0,
      business: 0,
    };

    // Calculate max possible scores per category
    for (const q of questions) {
      for (const cat of Object.keys(scores) as CareerCategory[]) {
        const maxForCat = Math.max(
          ...q.options.map((o) => o.scores[cat] ?? 0)
        );
        maxScores[cat] += maxForCat;
      }
    }

    // Calculate actual scores
    for (let i = 0; i < questions.length; i++) {
      const chosen = answers[i];
      if (chosen === null) continue;
      const option = questions[i].options[chosen];
      for (const [cat, pts] of Object.entries(option.scores)) {
        scores[cat as CareerCategory] += pts;
      }
    }

    // Rank and take top 3
    const ranked = (Object.keys(scores) as CareerCategory[])
      .map((cat) => ({
        category: categories.find((c) => c.id === cat)!,
        percentage: maxScores[cat] > 0
          ? Math.round((scores[cat] / maxScores[cat]) * 100)
          : 0,
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
      <div className="mx-auto max-w-lg px-6 pt-32 pb-20 text-center">
        <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-gold/15 bg-gold/[0.08]">
          <Compass size={32} className="text-gold" />
        </div>
        <h1 className="mb-3 font-heading text-3xl font-bold tracking-tight">
          Career Quiz
        </h1>
        <p className="mb-7 text-[0.95rem] font-light leading-relaxed text-white/55">
          Answer 15 quick questions about your interests, strengths, and
          preferences. We&apos;ll match you with career paths that fit.
        </p>
        <div className="mb-8 flex justify-center gap-6">
          {[
            { icon: <Clock size={14} />, text: "~5 minutes" },
            { icon: <CheckSquare size={14} />, text: "15 questions" },
            { icon: <FileText size={14} />, text: "PDF results" },
          ].map((m) => (
            <div
              key={m.text}
              className="flex items-center gap-1.5 text-xs text-white/55"
            >
              <span className="text-gold">{m.icon}</span>
              {m.text}
            </div>
          ))}
        </div>
        <button
          onClick={() => setState("active")}
          className="inline-flex items-center gap-2.5 rounded-xl bg-gold px-7 py-4 font-heading text-[15px] font-bold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5 cursor-pointer"
        >
          Start Quiz
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // ===== ACTIVE QUESTION STATE =====
  if (state === "active") {
    const q = questions[currentQ];
    const progress = ((currentQ + (answers[currentQ] !== null ? 1 : 0)) / questions.length) * 100;

    return (
      <div className="mx-auto max-w-xl px-6 pt-32 pb-20">
        {/* Progress bar */}
        <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question count */}
        <div className="mb-6 text-xs text-white/55 font-heading">
          Question <span className="font-semibold text-gold">{currentQ + 1}</span> of{" "}
          {questions.length}
        </div>

        {/* Question text */}
        <h2 className="mb-7 font-heading text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
          {q.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-2.5">
          {q.options.map((opt, i) => {
            const selected = answers[currentQ] === i;
            return (
              <button
                key={opt.label}
                onClick={() => selectOption(i)}
                className={`flex items-center gap-3.5 rounded-[14px] border px-5 py-4 text-left transition-all cursor-pointer ${
                  selected
                    ? "border-gold bg-gold/[0.08]"
                    : "border-white/[0.06] bg-white/[0.03] hover:border-gold/20 hover:bg-gold/[0.04]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-heading text-[13px] font-semibold ${
                    selected
                      ? "bg-gold text-navy-deep"
                      : "bg-white/5 text-white/55"
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-[0.95rem] leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-white/[0.04] pt-5">
          <button
            onClick={goBack}
            disabled={currentQ === 0}
            className="flex items-center gap-1.5 text-[13px] text-white/55 disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            <ArrowLeft size={14} />
            Back
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
    <div className="mx-auto max-w-2xl px-6 pt-32 pb-20">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Your Career Matches
        </h1>
        <p className="text-sm text-white/55">
          Based on your answers, here are the career paths that best fit your
          profile.
        </p>
      </div>

      <div className="mb-7 flex flex-col gap-3">
        {results.map((r, i) => (
          <div
            key={r.category.id}
            className="flex items-start gap-4 rounded-2xl border border-gold/[0.08] bg-white/[0.03] p-5"
          >
            <span
              className="font-heading text-[28px] font-extrabold leading-none"
              style={{ color: i === 0 ? "#C9A84C" : i === 1 ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.35)" }}
            >
              #{i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-base font-semibold mb-1">
                {r.category.name}
              </h3>
              <p className="text-[0.85rem] leading-relaxed text-white/55">
                {r.category.description}
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-gold/10 px-2.5 py-1 font-heading text-xs font-semibold text-gold">
              {r.percentage}% match
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5">
        <button
          onClick={() => generateResultsPdf(results)}
          className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-gold px-5 py-3 font-heading text-sm font-semibold text-navy-deep transition-all hover:bg-gold-light cursor-pointer"
        >
          <Download size={16} />
          Download as PDF
        </button>
        <button
          onClick={retake}
          className="flex items-center justify-center gap-2 rounded-[10px] border border-white/10 px-5 py-3 font-heading text-sm font-medium text-white/55 transition-all hover:border-white/20 hover:text-white cursor-pointer"
        >
          <RotateCcw size={14} />
          Retake
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/quiz/page.tsx`**

```tsx
import type { Metadata } from "next";
import QuizEngine from "@/components/quiz-engine";

export const metadata: Metadata = {
  title: "Career Quiz — Career Compass",
  description: "Take our career quiz to discover the career paths that match your interests and strengths.",
};

export default function QuizPage() {
  return <QuizEngine />;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Run `npm run dev`, navigate to `/quiz`, go through all 15 questions, see results, and test PDF download.

- [ ] **Step 5: Commit**

```bash
git add components/result-pdf.ts components/quiz-engine.tsx app/quiz/
git commit -m "Build career quiz with 15 questions, scoring engine, and PDF download"
```

---

## Task 6: Build Team Page

**Files:**
- Create: `lib/team-data.ts`
- Create: `app/team/page.tsx`

- [ ] **Step 1: Create `lib/team-data.ts`**

```ts
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  isFounder?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Gabriel Rossi Nunciaroni",
    role: "Founder",
    bio: "High school student in Orlando, FL. Started Career Compass to help students find direction.",
    isFounder: true,
  },
  {
    name: "Daniel Lopez",
    role: "Title TBD",
    bio: "Bio coming soon.",
  },
  {
    name: "Team Member",
    role: "Title TBD",
    bio: "Bio coming soon.",
  },
  {
    name: "Team Member",
    role: "Title TBD",
    bio: "Bio coming soon.",
  },
];
```

- [ ] **Step 2: Create `app/team/page.tsx`**

```tsx
import type { Metadata } from "next";
import { User } from "lucide-react";
import PageHero from "@/components/page-hero";
import { team } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "Our Team — Career Compass",
  description: "Meet the team behind Career Compass.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Meet the Team"
        subtitle="The people behind Career Compass — students helping students find their path."
      />
      <div className="mx-auto grid max-w-[1100px] gap-5 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <div
            key={i}
            className={`group rounded-[20px] border p-8 text-center transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] cursor-pointer ${
              member.isFounder
                ? "border-gold/15 bg-gold/[0.04] hover:border-gold/25"
                : "border-gold/[0.06] bg-white/[0.03] hover:border-gold/15 hover:bg-gold/[0.04]"
            }`}
          >
            <div
              className={`mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border-2 bg-gradient-to-br from-navy to-navy-light ${
                member.isFounder
                  ? "border-gold/30 shadow-[0_0_24px_rgba(201,168,76,0.1)]"
                  : "border-gold/10"
              }`}
            >
              <User size={36} className="text-white/15" />
            </div>
            <h3 className="mb-1 font-heading text-base font-semibold tracking-tight">
              {member.name}
            </h3>
            <p className="mb-3 text-xs font-medium text-gold tracking-wide">
              {member.role}
            </p>
            <p className="text-[0.85rem] leading-relaxed text-white/55">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add lib/team-data.ts app/team/
git commit -m "Add team page with member cards and placeholder data"
```

---

## Task 7: Build Volunteer Page

**Files:**
- Create: `app/volunteer/page.tsx`

- [ ] **Step 1: Create `app/volunteer/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Users, Calendar, BookOpen } from "lucide-react";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Get Involved — Career Compass",
  description: "Volunteer with Career Compass and help students discover their career paths.",
};

const perks = [
  {
    icon: <Users size={16} className="text-gold" />,
    title: "Lead a Chapter",
    desc: "Start a Career Compass chapter at your school",
  },
  {
    icon: <Calendar size={16} className="text-gold" />,
    title: "Organize Events",
    desc: "Help plan guest speaker sessions and career workshops",
  },
  {
    icon: <BookOpen size={16} className="text-gold" />,
    title: "Mentoring",
    desc: "Guide students through their career exploration journey",
  },
];

// Replace with the actual Google Form URL when available
const GOOGLE_FORM_URL = "";

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        subtitle="Want to help students find their path? Join Career Compass as a volunteer."
      />
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-6 pb-20 lg:grid-cols-2">
        {/* Left: info */}
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold tracking-tight sm:text-2xl">
            Why Volunteer?
          </h2>
          <p className="mb-7 text-[0.95rem] font-light leading-relaxed text-white/55">
            Career Compass is growing, and we need passionate people to help us
            reach more students. Whether you want to mentor, organize events, or
            help run a chapter at your school — there&apos;s a place for you.
          </p>
          <div className="flex flex-col gap-3.5">
            {perks.map((p) => (
              <div key={p.title} className="flex gap-3 items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-gold/[0.12] bg-gold/[0.08]">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-[0.9rem] font-semibold font-heading">
                    {p.title}
                  </h4>
                  <p className="text-[0.82rem] text-white/55 leading-snug">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Google Form */}
        <div className="rounded-[20px] border border-gold/[0.06] bg-white/[0.03] p-8">
          <div className="mb-4 flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.08em] text-gold">
            <BookOpen size={14} />
            Volunteer Application
          </div>
          {GOOGLE_FORM_URL ? (
            <iframe
              src={GOOGLE_FORM_URL}
              title="Volunteer Application Form"
              className="h-[500px] w-full rounded-[14px] border-0"
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-white/[0.08] bg-white/[0.03] px-6 py-16 text-center">
              <BookOpen size={40} className="mb-3 text-white/10" />
              <p className="text-[0.85rem] text-white/55 mb-1">
                Google Form will be embedded here
              </p>
              <span className="text-xs text-white/25">
                Fields: Name, Email, School, Grade, How They&apos;d Like to Help
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/volunteer/
git commit -m "Add volunteer page with Google Form embed placeholder"
```

---

## Task 8: Build Contact Page (UI only, no Resend yet)

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/contact/action.ts` (placeholder)

- [ ] **Step 1: Create `app/contact/action.ts` as a placeholder Server Action**

```ts
"use server";

export type ContactFormState = {
  success: boolean;
  error: string;
};

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // TODO: Replace with Resend integration when API key is ready
  // For now, log the submission and return success
  console.log("Contact form submission:", { name, email, subject, message });

  return { success: true, error: "" };
}
```

- [ ] **Step 2: Create `app/contact/page.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { Mail, MapPin, Send, Instagram, Linkedin } from "lucide-react";
import PageHero from "@/components/page-hero";
import { sendContactEmail, type ContactFormState } from "./action";

const initialState: ContactFormState = { success: false, error: "" };

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState);

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Have a question, partnership idea, or want to bring a guest speaker? We'd love to hear from you."
      />
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 px-6 pb-20 lg:grid-cols-2">
        {/* Contact form */}
        <form
          action={formAction}
          className="rounded-[20px] border border-gold/[0.06] bg-white/[0.03] p-9"
        >
          {state.success && (
            <div className="mb-5 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
              Message sent! We&apos;ll get back to you soon.
            </div>
          )}
          {state.error && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <div className="mb-4 grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What's this about?"
              className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/55 font-heading tracking-wide">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Write your message here..."
              className="w-full resize-y rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-gold/40"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-5 py-3.5 font-heading text-[15px] font-bold text-navy-deep transition-all hover:bg-gold-light disabled:opacity-60 cursor-pointer disabled:cursor-default"
          >
            <Send size={16} />
            {pending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact info */}
        <div className="pt-2">
          <h2 className="mb-2 font-heading text-xl font-bold tracking-tight sm:text-2xl">
            Other Ways to Reach Us
          </h2>
          <p className="mb-8 text-[0.95rem] font-light leading-relaxed text-white/55">
            Whether you want to partner, volunteer, or just say hello — we&apos;re
            here.
          </p>

          <div className="mb-9 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/[0.08]">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.06em] text-white/55 font-medium">
                  Email
                </span>
                <p className="text-[0.9rem]">contact@careercompass.org</p>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/[0.08]">
                <MapPin size={18} className="text-gold" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.06em] text-white/55 font-medium">
                  Location
                </span>
                <p className="text-[0.9rem]">Orlando, Florida</p>
              </div>
            </div>
          </div>

          <p className="mb-3.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
            Follow Us
          </p>
          <div className="flex gap-2.5">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all hover:border-gold/20 hover:bg-gold/[0.06] hover:text-gold cursor-pointer"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all hover:border-gold/20 hover:bg-gold/[0.06] hover:text-gold cursor-pointer"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Contact form renders, validation works, shows success message on submit.

- [ ] **Step 4: Commit**

```bash
git add app/contact/
git commit -m "Add contact page with form UI and placeholder server action"
```

---

## Task 9: Lint, Build Verification, and Final Cleanup

**Files:**
- Modify: `.gitignore` (add `.superpowers/`)
- Possibly fix any lint errors

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Append to `.gitignore`:

```
# Superpowers brainstorm files
.superpowers/
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Fix any errors that appear.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds with zero errors.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "Add .superpowers to gitignore and verify clean build"
```

---

## Task 10: Integrate Resend for Contact Form (LAST STEP)

> **Prerequisite:** Gabriel provides Resend API key and verified sending domain.

**Files:**
- Modify: `app/contact/action.ts`
- Create: `.env.local` (not committed)

- [ ] **Step 1: Install Resend**

```bash
npm install resend
```

- [ ] **Step 2: Create `.env.local` with Resend credentials**

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxx
CONTACT_EMAIL=gabriel@careercompass.org
```

Verify `.env.local` is in `.gitignore` (Next.js includes it by default).

- [ ] **Step 3: Update `app/contact/action.ts` with Resend integration**

Replace the entire file with:

```ts
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  error: string;
};

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const { error } = await resend.emails.send({
    from: "Career Compass <noreply@careercompassorlando.com>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }

  return { success: true, error: "" };
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Test the contact form end-to-end**

Run `npm run dev`, submit the contact form, verify the email arrives in Gabriel's inbox.

- [ ] **Step 6: Commit**

```bash
git add app/contact/action.ts package.json package-lock.json
git commit -m "Integrate Resend for contact form email delivery"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Design tokens, fonts, dependencies | `globals.css`, `layout.tsx`, `package.json` |
| 2 | Shared components (navbar, footer, section-label, page-hero) | `components/` |
| 3 | Homepage (hero + compass + mission + how-it-works + founder) | `app/page.tsx`, `components/aurora.tsx`, `components/compass.tsx` |
| 4 | Quiz data and career categories | `lib/quiz-data.ts`, `lib/career-categories.ts` |
| 5 | Quiz engine + PDF generation | `components/quiz-engine.tsx`, `components/result-pdf.ts`, `app/quiz/page.tsx` |
| 6 | Team page | `lib/team-data.ts`, `app/team/page.tsx` |
| 7 | Volunteer page | `app/volunteer/page.tsx` |
| 8 | Contact page (UI + placeholder action) | `app/contact/page.tsx`, `app/contact/action.ts` |
| 9 | Lint, build verification, cleanup | `.gitignore` |
| 10 | Resend integration (last) | `app/contact/action.ts`, `.env.local` |

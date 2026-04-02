# Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visually refresh NextStep's section transitions, quiz experience, card/hover states, and inner pages while keeping the existing navy/gold palette and all current functionality intact.

**Architecture:** Pure CSS upgrades for transitions, cards, and inner pages. One new `ogl`-powered WebGL component (`ThreadsBg`) for quiz results celebration. All changes are styling-only — no logic, routing, or data changes.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, `ogl` (new dep, ~28KB)

**Important:** This project uses Next.js 16 which may have breaking changes from your training data. If you encounter any issues with imports or APIs, check `node_modules/next/dist/docs/` for current documentation. The project uses Tailwind CSS v4 which uses `@theme inline` blocks in CSS instead of `tailwind.config.js`.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/globals.css` | Modify | New keyframes (`compass-pulse`, `fade-up`, `confetti-fall`) |
| `app/page.tsx` | Modify | Section transitions + How It Works card upgrades |
| `components/threads-bg.tsx` | Create | OGL Threads WebGL background component |
| `components/quiz-engine.tsx` | Modify | Quiz intro pulse, question transitions, results celebration |
| `components/page-hero.tsx` | Modify | Gold gradient + decorative divider |
| `app/team/page.tsx` | Modify | Card hover upgrades, founder glow, avatar ring |
| `app/volunteer/page.tsx` | Modify | Perk icon hover, placeholder border |
| `app/contact/page.tsx` | Modify | Input focus, info hover, social icon hover |

---

### Task 1: Add CSS Keyframes to globals.css

**Files:**
- Modify: `app/globals.css:54-63` (insert before the `@media (prefers-reduced-motion)` rule)

- [ ] **Step 1: Add new keyframes to globals.css**

Add these keyframes **before** the existing `@media (prefers-reduced-motion: reduce)` block (before line 57). The existing `prefers-reduced-motion` rule uses `*, *::before, *::after` selectors which will automatically apply to these new keyframes — no extra work needed.

```css
/* Quiz intro compass pulse */
@keyframes compass-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.3); }
  50% { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
}

/* Results card staggered entrance */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Confetti burst particles */
@keyframes confetti-fall {
  0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
  100% { opacity: 0; transform: translate(var(--confetti-x), var(--confetti-y)) rotate(var(--confetti-r)) scale(0); }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add compass-pulse, fade-up, confetti-fall keyframes"
```

---

### Task 2: Section Transitions on Homepage

**Files:**
- Modify: `app/page.tsx:76-96` (mission section) and `app/page.tsx:137-174` (founder section)

- [ ] **Step 1: Update mission section**

In `app/page.tsx`, replace the mission section (the `<section id="mission" ...>` block around lines 76-96). Remove `clipPath`, remove `-mt-10`, add gradient transition divs above and below, add radial gold glow.

Replace this:
```tsx
      {/* ===== MISSION ===== */}
      <section
        id="mission"
        className="-mt-10 bg-cream px-6 py-32 text-navy-darker"
        style={{ clipPath: "polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)" }}
      >
```

With this:
```tsx
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
```

After the closing `</section>` of the mission section, add the bottom gradient transition:
```tsx
      <div className="h-20 bg-gradient-to-b from-cream to-navy" />
```

- [ ] **Step 2: Update How It Works section**

Remove `-mt-10` from the How It Works section. Change:
```tsx
      <section className="-mt-10 bg-navy px-6 py-28">
```
To:
```tsx
      <section className="bg-navy px-6 py-28">
```

- [ ] **Step 3: Update Founder section**

Remove the `overflow-hidden` (keep it clean) but more importantly, add a gradient transition before the founder section. Change the founder section opening from:
```tsx
      <section className="relative overflow-hidden bg-navy-darker px-6 py-28">
```
To:
```tsx
      <div className="h-16 bg-gradient-to-b from-navy to-navy-darker" />
      <section className="relative overflow-hidden bg-navy-darker px-6 py-28">
```

- [ ] **Step 4: Update How It Works card hover styles**

In the same file, update the How It Works card `div` class. Replace:
```tsx
                className="group relative overflow-hidden rounded-[20px] border border-gold/[0.08] bg-white/[0.03] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] cursor-pointer"
```
With:
```tsx
                className="group relative overflow-hidden rounded-[20px] border border-gold/[0.08] bg-white/[0.03] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-[0_24px_48px_rgba(0,0,0,0.25),0_0_16px_rgba(201,168,76,0.06)] cursor-pointer"
```

Also update the step number gradient to brighten on hover. Replace:
```tsx
                <div className="mb-5 bg-gradient-to-b from-gold/15 to-transparent bg-clip-text font-heading text-[64px] font-black leading-none text-transparent">
```
With:
```tsx
                <div className="mb-5 bg-gradient-to-b from-gold/15 to-transparent bg-clip-text font-heading text-[64px] font-black leading-none text-transparent transition-all duration-300 group-hover:from-gold/30">
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: smooth section transitions and card hover upgrades on homepage"
```

---

### Task 3: Install ogl and Create ThreadsBg Component

**Files:**
- Create: `components/threads-bg.tsx`
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install ogl**

Run: `npm install ogl`

- [ ] **Step 2: Create the ThreadsBg component**

Create `components/threads-bg.tsx`. This is a TypeScript port of the ReactBits Threads component. It uses OGL to render flowing Perlin-noise thread lines via a WebGL fragment shader.

```tsx
"use client";

import { useEffect, useRef } from "react";

type ThreadsBgProps = {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
};

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
  vec2 Pi = floor(P);
  vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
  vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
  Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
  Pt += vec2(26.0, 161.0).xyxy;
  Pt *= Pt;
  Pt = Pt.xzxz * Pt.yyww;
  vec4 hash_x = fract(Pt * (1.0 / 951.135664));
  vec4 hash_y = fract(Pt * (1.0 / 642.949883));
  vec4 grad_x = hash_x - 0.49999;
  vec4 grad_y = hash_y - 0.49999;
  vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
      * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
  grad_results *= 1.4142135623730950;
  vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
             * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
  vec4 blend2 = vec4(blend, vec2(1.0 - blend));
  return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
  return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
  float split_offset = (perc * 0.4);
  float split_point = 0.1 + split_offset;
  float amplitude_normal = smoothstep(split_point, 0.7, st.x);
  float amplitude_strength = 0.5;
  float finalAmplitude = amplitude_normal * amplitude_strength
                         * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);
  float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
  float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;
  float xnoise = mix(
      Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
      Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
      st.x * 0.3
  );
  float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;
  float line_start = smoothstep(
      y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
      y,
      st.y
  );
  float line_end = smoothstep(
      y,
      y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
      st.y
  );
  return clamp(
      (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
      0.0,
      1.0
  );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  float line_strength = 1.0;
  for (int i = 0; i < u_line_count; i++) {
    float p = float(i) / float(u_line_count);
    line_strength *= (1.0 - lineFn(
        uv,
        u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
        p,
        (PI * 1.0) * p,
        uMouse,
        iTime,
        uAmplitude,
        uDistance
    ));
  }
  float colorVal = 1.0 - line_strength;
  fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export default function ThreadsBg({
  color = [0.79, 0.66, 0.3],
  amplitude = 0.6,
  distance = 0,
  enableMouseInteraction = false,
}: ThreadsBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let gl: WebGLRenderingContext;
    let program: ReturnType<typeof import("ogl").Program extends new (...args: infer A) => infer R ? (...args: A) => R : never> | null = null;
    let renderer: InstanceType<typeof import("ogl").Renderer> | null = null;
    let mesh: InstanceType<typeof import("ogl").Mesh> | null = null;

    async function init() {
      const { Renderer, Program, Mesh, Triangle, Color } = await import("ogl");

      renderer = new Renderer({ alpha: true });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      container!.appendChild(gl.canvas);

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          iTime: { value: 0 },
          iResolution: {
            value: new Color(
              gl.canvas.width,
              gl.canvas.height,
              gl.canvas.width / gl.canvas.height
            ),
          },
          uColor: { value: new Color(...color) },
          uAmplitude: { value: amplitude },
          uDistance: { value: distance },
          uMouse: { value: new Float32Array([0.5, 0.5]) },
        },
      });

      mesh = new Mesh(gl, { geometry, program });

      function resize() {
        if (!container || !renderer || !program) return;
        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight);
        program.uniforms.iResolution.value.r = clientWidth;
        program.uniforms.iResolution.value.g = clientHeight;
        program.uniforms.iResolution.value.b = clientWidth / clientHeight;
      }
      window.addEventListener("resize", resize);
      resize();

      let currentMouse = [0.5, 0.5];
      let targetMouse = [0.5, 0.5];

      function handleMouseMove(e: MouseEvent) {
        const rect = container!.getBoundingClientRect();
        targetMouse = [
          (e.clientX - rect.left) / rect.width,
          1.0 - (e.clientY - rect.top) / rect.height,
        ];
      }
      function handleMouseLeave() {
        targetMouse = [0.5, 0.5];
      }

      if (enableMouseInteraction) {
        container!.addEventListener("mousemove", handleMouseMove);
        container!.addEventListener("mouseleave", handleMouseLeave);
      }

      function update(t: number) {
        if (!program || !renderer || !mesh) return;
        if (enableMouseInteraction) {
          const smoothing = 0.05;
          currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
          currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
          program.uniforms.uMouse.value[0] = currentMouse[0];
          program.uniforms.uMouse.value[1] = currentMouse[1];
        } else {
          program.uniforms.uMouse.value[0] = 0.5;
          program.uniforms.uMouse.value[1] = 0.5;
        }
        program.uniforms.iTime.value = t * 0.001;
        renderer.render({ scene: mesh! });
        animationFrameId.current = requestAnimationFrame(update);
      }
      animationFrameId.current = requestAnimationFrame(update);

      return () => {
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        window.removeEventListener("resize", resize);
        if (enableMouseInteraction) {
          container!.removeEventListener("mousemove", handleMouseMove);
          container!.removeEventListener("mouseleave", handleMouseLeave);
        }
        if (container!.contains(gl.canvas)) container!.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((c) => {
      cleanup = c;
    });

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      cleanup?.();
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. The component uses dynamic `import("ogl")` to avoid SSR issues — OGL needs the browser's WebGL context.

- [ ] **Step 4: Commit**

```bash
git add components/threads-bg.tsx package.json package-lock.json
git commit -m "feat: add ThreadsBg component using ogl for quiz results background"
```

---

### Task 4: Quiz Experience Upgrades

**Files:**
- Modify: `components/quiz-engine.tsx` (entire file — intro, active, results states)

This is the largest task. It modifies all three quiz states with visual enhancements. No quiz logic changes.

- [ ] **Step 1: Add imports and new state**

At the top of `components/quiz-engine.tsx`, add the `ThreadsBg` import and `useEffect`/`useCallback` to the existing React import. Replace:

```tsx
import { useState } from "react";
```

With:

```tsx
import { useState, useEffect, useCallback, useRef } from "react";
```

Add a new import after the existing imports:

```tsx
import ThreadsBg from "@/components/threads-bg";
```

- [ ] **Step 2: Add transitioning state and question transition logic**

Inside the `QuizEngine` component, after the existing state declarations (after the `results` state line), add:

```tsx
  const [transitioning, setTransitioning] = useState(false);
```

Replace the `goNext` function:

```tsx
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
```

Replace the `goBack` function:

```tsx
  function goBack() {
    if (currentQ > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQ(currentQ - 1);
        setTransitioning(false);
      }, 250);
    }
  }
```

- [ ] **Step 3: Update quiz intro state**

In the intro state return block, update the compass icon container. Replace:

```tsx
        <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-gold/15 bg-gold/[0.08]">
```

With:

```tsx
        <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-gold/15 bg-gold/[0.08]" style={{ animation: "compass-pulse 2.5s ease-in-out infinite" }}>
```

- [ ] **Step 4: Update quiz active state — progress bar glow**

In the active state, update the progress bar fill div. Replace:

```tsx
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
```

With:

```tsx
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-400"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(201,168,76,0.3)" }}
          />
```

- [ ] **Step 5: Update quiz active state — question transition**

Wrap the question content in a transitioning container. Find the `<div className="mb-6 text-xs` line (the "Question X of Y" indicator) and wrap everything from that line through the nav buttons in a transition div.

Replace the question counter, question heading, and options container (lines starting from `<div className="mb-6 text-xs` through the closing of the options `</div>`) by wrapping them:

```tsx
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
```

Note the `scale-[1.02]` added to selected options and `scale-100` to unselected for the tactile feedback.

- [ ] **Step 6: Update quiz results state — full celebration**

Replace the entire results return block (the final `return (` at the bottom of the component) with:

```tsx
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
```

- [ ] **Step 7: Add CountUp and Confetti helper components**

Add these two components **before** the `export default function QuizEngine()` line in the same file:

```tsx
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
            background: `rgba(201,168,76,${0.6 + Math.random() * 0.4})`,
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
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
git add components/quiz-engine.tsx
git commit -m "feat: quiz celebration — threads bg, staggered reveals, confetti, count-up"
```

---

### Task 5: PageHero Upgrade

**Files:**
- Modify: `components/page-hero.tsx`

- [ ] **Step 1: Update PageHero component**

Replace the entire contents of `components/page-hero.tsx`:

```tsx
export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative text-center px-6 pt-36 pb-14 max-w-3xl mx-auto">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.06), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative">
        <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-white/55 text-lg leading-relaxed font-light max-w-md mx-auto">
          {subtitle}
        </p>
        <div className="mx-auto mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-gold to-transparent" />
      </div>
    </div>
  );
}
```

Changes: added `relative` positioning, radial gold gradient pseudo-element, decorative divider, increased top padding from `pt-32` to `pt-36` and bottom from `pb-10` to `pb-14`.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/page-hero.tsx
git commit -m "feat: PageHero gold gradient and decorative divider"
```

---

### Task 6: Team Page Card Upgrades

**Files:**
- Modify: `app/team/page.tsx:18-48` (card grid)

- [ ] **Step 1: Update team card styles**

In `app/team/page.tsx`, replace the card `div` and its children. Replace the entire card mapping block (from `{team.map(` through its closing `))}`):

```tsx
        {team.map((member, i) => (
          <div
            key={i}
            className={`group relative rounded-[20px] border p-8 text-center transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
              member.isFounder
                ? "border-gold/15 bg-gold/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_24px_rgba(201,168,76,0.08)] hover:border-gold/25 hover:shadow-[0_24px_48px_rgba(0,0,0,0.25),0_0_16px_rgba(201,168,76,0.06)]"
                : "border-gold/[0.06] bg-white/[0.03] hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-[0_24px_48px_rgba(0,0,0,0.25),0_0_16px_rgba(201,168,76,0.06)]"
            }`}
          >
            {member.isFounder && (
              <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-[20px] bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            )}
            <div
              className={`mx-auto mb-5 flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border-2 bg-gradient-to-br from-navy to-navy-light transition-all duration-300 ${
                member.isFounder
                  ? "border-gold/30 shadow-[0_0_24px_rgba(201,168,76,0.1)] group-hover:ring-2 group-hover:ring-gold/20"
                  : "border-gold/10 group-hover:ring-2 group-hover:ring-gold/20"
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/team/page.tsx
git commit -m "feat: team card hover upgrades, founder glow, avatar ring"
```

---

### Task 7: Volunteer Page Polish

**Files:**
- Modify: `app/volunteer/page.tsx:47-58` (perk icons) and `app/volunteer/page.tsx:73-80` (placeholder)

- [ ] **Step 1: Update perk icon hover**

In `app/volunteer/page.tsx`, replace the perk icon container div. Replace:

```tsx
              <div key={p.title} className="flex gap-3 items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-gold/[0.12] bg-gold/[0.08]">
                  {p.icon}
                </div>
```

With:

```tsx
              <div key={p.title} className="flex gap-3 items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-gold/[0.12] bg-gold/[0.08] transition-transform duration-200 hover:scale-105">
                  {p.icon}
                </div>
```

- [ ] **Step 2: Update placeholder border**

Replace the placeholder dashed border. Replace:

```tsx
            <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-white/[0.08] bg-white/[0.03] px-6 py-16 text-center">
```

With:

```tsx
            <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-gold/15 bg-white/[0.03] px-6 py-16 text-center">
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/volunteer/page.tsx
git commit -m "feat: volunteer perk icon hover and placeholder border polish"
```

---

### Task 8: Contact Page Polish

**Files:**
- Modify: `app/contact/page.tsx:37-51` (form inputs), `app/contact/page.tsx:61-78` (info items), `app/contact/page.tsx:82-87` (social icons)

- [ ] **Step 1: Update form input styles**

In `app/contact/page.tsx`, update all four form input/textarea elements. There are 3 `<input>` elements and 1 `<textarea>`.

For each input, replace the className. The pattern to find is:
```
border-white/[0.08] bg-white/[0.04]
```
Replace with:
```
border-white/[0.12] bg-white/[0.04] focus:bg-white/[0.06] focus:ring-1 focus:ring-gold/20
```

This applies to all 4 form fields (name input, email input, subject input, message textarea). The existing `focus:border-gold/40` stays — just add the ring and bg shift.

- [ ] **Step 2: Update info items with hover effect**

Replace the email info item div. Replace:

```tsx
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/[0.08]">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.06em] text-white/55 font-medium">Email</span>
                <p className="text-[0.9rem]">contact@nextstep.org</p>
              </div>
            </div>
```

With:

```tsx
            <div className="flex items-center gap-3.5 rounded-xl p-2 -m-2 transition-all duration-300 hover:bg-white/[0.03]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/10 bg-gold/[0.08]">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.06em] text-white/55 font-medium">Email</span>
                <p className="text-[0.9rem]">contact@nextstep.org</p>
              </div>
            </div>
```

Do the same for the MapPin/Location info item — add `rounded-xl p-2 -m-2 transition-all duration-300 hover:bg-white/[0.03]` to its outer div.

- [ ] **Step 3: Update social icon buttons**

Replace the social icon links. Replace:

```tsx
            <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all hover:border-gold/20 hover:bg-gold/[0.06] hover:text-gold cursor-pointer">
              <Share2 size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all hover:border-gold/20 hover:bg-gold/[0.06] hover:text-gold cursor-pointer">
              <Globe size={18} />
            </a>
```

With:

```tsx
            <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all duration-300 hover:border-gold/20 hover:bg-gold/[0.12] hover:text-gold cursor-pointer">
              <Share2 size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] text-white/55 transition-all duration-300 hover:border-gold/20 hover:bg-gold/[0.12] hover:text-gold cursor-pointer">
              <Globe size={18} />
            </a>
```

Changes: added `duration-300`, changed `hover:bg-gold/[0.06]` to `hover:bg-gold/[0.12]`.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: contact form focus rings, info hover, social icon polish"
```

---

### Task 9: Final Verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with zero errors and zero warnings related to our changes.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 3: Manual smoke test**

Run: `npm run dev`

Verify in the browser:
1. **Homepage:** Smooth gradient transitions between sections (no clipPath polygon). How It Works cards have gold glow on hover.
2. **Quiz:** Compass icon pulses on intro. Progress bar glows. Options scale on select. Questions crossfade. Results show Threads background, staggered card reveals, confetti burst, count-up percentages.
3. **Team:** Cards have glassy edge, founder has persistent glow, avatars get ring on hover.
4. **Volunteer:** Perk icons scale on hover. Placeholder has gold-tinted border.
5. **Contact:** Inputs have visible borders + focus rings. Info items highlight on hover. Social icons have stronger gold hover.
6. **All pages:** PageHero has gold gradient and divider.

# NextStep Visual Refresh — Design Spec

## Overview

Visual refresh of the NextStep career quiz website. Same navy/gold/cream palette, same content and features. Upgrades to section transitions, quiz experience, card/hover states, and inner page polish. One new dependency: `ogl` (~28KB) for a Threads WebGL background on quiz results.

**Scope:** Sections transitions, quiz experience, cards & hover states, inner pages (Team, Volunteer, Contact).  
**Out of scope:** Hero section (keep current aurora), quiz logic/scoring, page layouts/structure, content changes.

---

## 1. Section Transitions

### Problem
The cream mission section uses `clipPath: polygon(0 40px, 100% 0, 100% calc(100% - 40px), 0 100%)` which creates a hard diagonal break. Transitions between dark → light → dark sections feel abrupt.

### Changes

**Mission section (`app/page.tsx`):**
- Remove `clipPath` from the mission section's `style` prop
- Remove the negative top margin (`-mt-10`) hack that compensated for the polygon
- Add gradient transition zones above and below the cream section:
  - Above: a `div` with `bg-gradient-to-b from-navy-darker to-cream` spanning ~80px
  - Below: a `div` with `bg-gradient-to-b from-cream to-navy` spanning ~80px
- Add a subtle radial gold glow at the top center of the cream section: `radial-gradient(ellipse 60% 30% at 50% 0%, rgba(201,168,76,0.06), transparent)`

**How It Works → Founder transition:**
- Remove the `-mt-10` from the Founder section
- Add the same gradient transition approach: a small zone that blends `navy` → `navy-darker`

**Inner page transitions:**
- Consistent `py-28` vertical spacing on all major sections across Team, Volunteer, Contact pages

---

## 2. Quiz Experience

### 2a. Quiz Intro (`components/quiz-engine.tsx`, intro state)
- Add a CSS pulsing gold ring animation around the compass icon container:
  ```css
  box-shadow: 0 0 0 0 rgba(201,168,76,0.3);
  animation: compass-pulse 2.5s ease-in-out infinite;
  ```
  ```css
  @keyframes compass-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.3); }
    50% { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
  }
  ```

### 2b. Quiz Active (question state)
- **Progress bar glow:** Add `box-shadow: 0 0 12px rgba(201,168,76,0.3)` to the progress bar fill element
- **Option select feedback:** When an option is selected, apply a brief scale pulse via CSS transition: `transform: scale(1.02)` that settles back to `scale(1)` over 200ms
- **Question transition:** Add a `transitioning` boolean state. When `currentQ` changes (via `goNext` or `goBack`), set `transitioning = true`, wait 250ms (during which the question container has `opacity-0 translate-y-2`), then update `currentQ` and set `transitioning = false` (container returns to `opacity-100 translate-y-0`). Use Tailwind transition classes: `transition-all duration-250`

### 2c. Quiz Results (the celebration moment)

**Threads background:**
- Install `ogl` as a dependency
- Port the ReactBits Threads component to a new file `components/threads-bg.tsx`
  - TypeScript conversion with proper types
  - Props: `color` (default `[0.79, 0.66, 0.3]` — gold RGB normalized), `amplitude` (default `0.6`), `distance` (default `0`), `enableMouseInteraction` (default `false`)
  - Wrap in a `div` with `position: absolute; inset: 0; z-index: 0; opacity: 0.4` behind the results content
  - The component renders a full-bleed canvas with flowing gold thread lines
  - No mouse interaction to keep the background calm and non-distracting
- Render `<ThreadsBg />` only when `state === "results"` to avoid unnecessary GPU usage during the quiz

**Staggered card reveal:**
- Each result card gets a fade-up entrance animation:
  ```css
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  ```
- Card #1: `animation-delay: 0ms`, Card #2: `150ms`, Card #3: `300ms`
- Animation duration: `500ms` with `ease-out`

**Result card left accent border:**
- Card #1: `border-left: 3px solid #C9A84C`
- Card #2: `border-left: 2px solid rgba(201,168,76,0.6)`
- Card #3: `border-left: 1px solid rgba(201,168,76,0.35)`

**Match percentage count-up:**
- Animate the percentage number from `0` to the final value over `800ms` using `requestAnimationFrame` with an ease-out curve
- Triggered when each card's entrance animation completes (staggered with cards)

**CSS confetti burst:**
- ~20 small gold particles (`4px` squares and circles) positioned absolutely in the results container
- Fire once on mount via a CSS animation: scatter outward from center, fade out over 1.5s
- Use `@keyframes confetti-fall` with random-ish positions via `nth-child` selectors for variety
- Particles are purely decorative `div` elements, removed from DOM after animation via `animation-fill-mode: forwards; opacity: 0`

**Download button:**
- Hover state adds `box-shadow: 0 8px 24px rgba(201,168,76,0.25)`

---

## 3. Cards & Hover States

### Universal Card System

All cards across the site get these baseline improvements:

**At rest:**
- `border: 1px solid rgba(201,168,76,0.08)` (unchanged)
- `background: rgba(255,255,255,0.03)` (unchanged)
- Add `box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)` — subtle top glassy edge
- `transition: all 300ms ease-out` (standardized)

**On hover:**
- `border-color: rgba(201,168,76,0.2)` (consistent across all cards)
- `background: rgba(201,168,76,0.04)` (consistent)
- `transform: translateY(-4px)` (slight increase from current `-1`)
- `box-shadow: 0 24px 48px rgba(0,0,0,0.25), 0 0 16px rgba(201,168,76,0.06)` — shadow + faint gold glow

### How It Works Cards (`app/page.tsx`)
- The large step numbers (`01`, `02`, `03`) gradient brightens on hover: from `gold/15` opacity to `gold/30`
- Top accent line behavior stays as-is (opacity 0 → 1 on hover)

### Team Cards (`app/team/page.tsx`)
- Avatar circle gets `ring-2 ring-gold/20` on hover (via group-hover)
- Founder card: persistent `shadow-[0_0_24px_rgba(201,168,76,0.08)]` at rest

### Contact Form Inputs (`app/contact/page.tsx`)
- Rest state border: `border-white/[0.12]` (up from `0.08`)
- Focus state: `border-gold/40 ring-1 ring-gold/20`
- Focus background shift: `bg-white/[0.06]` (up from `0.04`)

---

## 4. Inner Pages

### PageHero Component (`components/page-hero.tsx`)
- Add centered radial gold gradient behind title: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.06), transparent)` as a pseudo-element or wrapper div
- Add decorative gold divider below subtitle: `mx-auto mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-gold to-transparent` (matches mission section style)
- Increase vertical padding slightly for more breathing room

### Team Page (`app/team/page.tsx`)
- Card hover upgrades from Section 3
- Founder card gold top-border glow: `before` pseudo-element with `bg-gradient-to-r from-transparent via-gold/30 to-transparent` positioned at top, `opacity-0 group-hover:opacity-100`

### Volunteer Page (`app/volunteer/page.tsx`)
- Perk icon containers: `hover:scale-105` with `transition-transform duration-200`
- Google Form placeholder dashed border: `border-gold/15` instead of `border-white/[0.08]`

### Contact Page (`app/contact/page.tsx`)
- Form input upgrades from Section 3
- Email/Location info items: add subtle hover effect — border-glow matching card system
- Social icon buttons: hover fills with gold background `bg-gold/[0.12]` and icon color transitions to full gold

---

## Dependencies

| Package | Size | Purpose |
|---------|------|---------|
| `ogl` | ~28KB gzipped | WebGL rendering for Threads background on quiz results |

No other new dependencies. All other effects are CSS-only.

---

## New Files

| File | Purpose |
|------|---------|
| `components/threads-bg.tsx` | Threads WebGL background component (ported from ReactBits, TypeScript) |

---

## Modified Files

| File | Changes |
|------|---------|
| `app/globals.css` | New keyframes: `compass-pulse`, `fade-up`, `confetti-fall`. Updated card transition defaults. |
| `app/page.tsx` | Remove clipPath + negative margins from mission/founder sections. Add gradient transition zones. Update How It Works card hover styles. |
| `app/quiz/page.tsx` | No changes (thin wrapper). |
| `app/team/page.tsx` | Card hover upgrades, founder card glow, avatar ring on hover. |
| `app/volunteer/page.tsx` | Perk icon hover scale, placeholder border color. |
| `app/contact/page.tsx` | Input focus upgrades, info item hover, social icon hover. |
| `components/quiz-engine.tsx` | Intro compass pulse, progress bar glow, option select feedback, question crossfade, results celebration (Threads bg, staggered cards, accent borders, count-up, confetti, download button glow). |
| `components/page-hero.tsx` | Radial gold gradient, decorative divider. |

---

## Accessibility

- All animations respect `prefers-reduced-motion: reduce` (already in globals.css — applies to new keyframes automatically)
- Threads WebGL background is behind content at `opacity: 0.4` and `z-index: 0` — does not interfere with readability
- Confetti particles are decorative only (`aria-hidden="true"`)
- Form focus states are enhanced (ring + border), not removed
- No content is conveyed through animation alone — all information is static text

---

## Performance Considerations

- Threads component only mounts when quiz results are showing — no GPU usage during quiz-taking
- `ogl` is ~28KB gzipped vs Three.js at ~150KB+ — minimal bundle impact
- CSS confetti uses `transform` and `opacity` only (GPU-composited properties)
- No continuous animations on pages without WebGL (all CSS animations are triggered, not perpetual)
- Staggered card animations complete in under 1s total

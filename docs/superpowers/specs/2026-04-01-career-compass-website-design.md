# Career Compass Website — Design Spec

**Date:** 2026-04-01
**Client:** Gabriel Rossi Nunciaroni (Founder)
**Built by:** Brightlaunch (Han)
**Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

---

## Overview

Career Compass is a student-run organization that helps high school students in Orlando, FL discover career paths through a guided quiz and community chapters. This spec covers the V1 website: 5 pages, no backend database, client-side quiz with PDF download, and a contact form powered by Resend.

**Target audience:** High school students (freshmen–seniors), primarily in Orlando.

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#224A6F` | Primary backgrounds, cards |
| `navy-deep` | `#162F4A` | Deeper sections, navbar glass tint |
| `navy-darker` | `#0E1F33` | Darkest backgrounds (hero, founder) |
| `navy-light` | `#2D5F8A` | Lighter navy accents, gradients |
| `gold` | `#C9A84C` | Primary accent, CTAs, highlights |
| `gold-light` | `#DBBE66` | Hover states, gradient endpoints |
| `gold-glow` | `rgba(201,168,76,0.4)` | Box shadows, glow effects |
| `cream` | `#FBF6EC` | Mission section background |
| `white` | `#FFFFFF` | Primary text on dark |
| `text-muted` | `rgba(255,255,255,0.55)` | Secondary text, descriptions |

### Typography

- **Headings:** Outfit (Google Fonts), weights 300–900
- **Body:** Work Sans (Google Fonts), weights 300–600
- **Heading style:** Tight letter-spacing (`-0.025em` to `-0.035em`), heavy weight (700–800)
- **Body style:** Light weight (300–400), generous line-height (1.7–1.85)

### Iconography

- All SVG icons — no emojis anywhere in the UI
- Icon source: Lucide (stroke-based, 24x24 viewBox, stroke-width 2)
- Gold color (`#C9A84C`) for accent icons, `text-muted` for secondary

### Visual Style

**Exaggerated Minimalism + Aurora Glassmorphism:**
- Oversized typography with dramatic whitespace
- Aurora gradient blobs (animated radial gradients) behind hero
- Glassmorphism cards and navbar (backdrop-filter blur, translucent backgrounds)
- Faint gold grid overlay on hero (radially masked)
- Animated compass element as hero visual centerpiece
- Progressive gold intensity on step indicators
- Clip-path angled section transitions
- Shimmer effect on primary CTA hover
- `prefers-reduced-motion` respected globally

### Shared Components

**Floating Glass Navbar:**
- Fixed, inset from edges (`top: 16px`, `left/right: 24px`)
- `backdrop-filter: blur(24px) saturate(150%)`, translucent navy background
- Rounded corners (`border-radius: 16px`)
- Logo (from `public/logo/image.png`) + nav links + gold "Take the Quiz" CTA
- Mobile: hamburger menu

**Section Label:**
- 11px Outfit, 600 weight, uppercase, `letter-spacing: 0.15em`
- Gold color with flanking horizontal lines
- Used above section headings throughout the site

**Page Hero (inner pages):**
- Centered layout, oversized heading + muted subtitle
- Consistent across Team, Volunteer, and Contact pages

**Footer:**
- Simple bottom bar: copyright left, nav links right
- Subtle top border (`rgba(255,255,255,0.04)`)

---

## Pages

### Page 1: Homepage (`/`)

**Hero Section:**
- Split layout: text left, animated compass right
- Text side: gold pill badge ("Helping students find direction" with pulsing dot), oversized headline with gradient gold text ("Find the career that fits you"), subtitle, two buttons (gold primary CTA "Take the Career Quiz" + ghost "Learn more")
- Visual side: animated compass with 3 rotating concentric rings, drifting needle, cardinal points (N/S/E/W), glowing gold center dot, 3 floating glass stat cards orbiting it ("8+ Career Fields", "15 Quiz Questions", "PDF Download Results")
- Background: 3 aurora gradient blobs with slow float animation + faint gold grid overlay
- Scroll indicator at bottom: pulsing gold line + "scroll" text

**Mission Section:**
- Cream background (`#FBF6EC`) with `clip-path: polygon()` creating angled top/bottom edges
- Section label "Our Mission" with gold flanking lines
- Headline: "Not just career goals. A plan to achieve them."
- Body text: the mission statement from the spec
- Gold accent bar below

**How It Works Section:**
- Navy background
- 3 glass cards in a row, each with:
  - SVG icon in top-right gold-tinted box
  - Large faded step number (`01`, `02`, `03`)
  - Title + description
  - Hover: gold top-border reveal, lift with shadow
- Steps: Take the Quiz → Get Your Results → Take Action

**About the Founder Section:**
- Dark navy background with subtle gold radial glow
- Grid layout: rounded-rect photo frame (left) + text (right)
- Name, bio, and italic pull quote with gold quote mark + left border
- Photo placeholder until Gabriel provides headshot

### Page 2: Career Questionnaire (`/quiz`)

Single client component with 3 states:

**State 1 — Intro:**
- Centered layout with compass icon, title "Career Quiz", description
- Metadata chips: ~5 minutes, 15 questions, PDF results
- "Start Quiz" gold CTA button

**State 2 — Active Question:**
- Gold progress bar (fills as user advances)
- Question counter ("Question 6 of 15")
- Question text in large Outfit font
- 4 multiple choice options (A/B/C/D) as glass cards
  - Unselected: subtle border, dark background
  - Selected: gold border, gold-tinted background, gold letter badge
- Back/Next navigation at bottom

**State 3 — Results:**
- "Your Career Matches" header
- Top 3 career paths as ranked cards:
  - Rank number (#1, #2, #3) with decreasing gold intensity
  - Career name, description, match percentage badge
- Two action buttons: "Download as PDF" (gold primary) + "Retake Quiz" (ghost)

**Quiz Engine (client-side):**
- 15 multiple-choice questions covering: interests, strengths, preferred work environment, subjects enjoyed
- Each answer option maps to 1–3 career categories with weighted scores
- 8 career categories: Healthcare, Finance, Engineering, Creative Arts, Law, Education, Technology, Business/Entrepreneurship
- After completion: categories ranked by total score, top 3 shown
- Match percentage = (category score / max possible for that category) × 100
- State stored in React useState — no backend

**PDF Generation (client-side):**
- Generated via jsPDF
- Contents: Career Compass logo, student's top 3 results, match percentages, career descriptions
- Branded with navy/gold colors
- Download triggered by "Download as PDF" button

### Page 3: Our Team (`/team`)

- Page hero: "Meet the Team" + subtitle
- 4-column card grid (responsive: 2 cols on tablet, 1 on mobile)
- Each card: circular photo, name, role (gold), 1–2 sentence bio
- Founder card: subtle gold border accent to distinguish
- Hover: lift + shadow + border color shift
- Team data stored as a static TypeScript array
- Placeholder photos (person icon) until real headshots provided

**Team members (from spec):**
1. Gabriel Rossi Nunciaroni — Founder
2. Daniel Lopez — Title TBD
3. Team Member 3 — TBD
4. Team Member 4 — TBD

### Page 4: Get Involved / Volunteer (`/volunteer`)

- Page hero: "Get Involved" + subtitle
- Split layout (responsive: stacks on mobile):
  - **Left:** "Why Volunteer?" heading, description paragraph, 3 perks with icon cards:
    1. Lead a Chapter — start at your school
    2. Organize Events — plan guest speakers & workshops
    3. Mentoring — guide students on their journey
  - **Right:** Styled container with embedded Google Form via iframe
    - Form fields: Name, Email, School, Grade, How They'd Like to Help
    - Google Form URL to be provided by Gabriel
    - Responses go directly to Gabriel's Google account

### Page 5: Contact (`/contact`)

- Page hero: "Get in Touch" + subtitle
- Split layout (responsive: stacks on mobile):
  - **Left:** Contact form in glass card
    - Fields: Name + Email (side by side), Subject, Message (textarea)
    - Gold "Send Message" submit button with send icon
    - Form submits via Next.js Server Action → Resend API route
    - Server-side validation (all fields required, email format check)
    - Success/error feedback via toast notification
  - **Right:** Contact info
    - Email channel with icon
    - Location: Orlando, Florida
    - Social links: Instagram, LinkedIn (icon buttons with hover gold accent)
    - Social URLs to be provided by Gabriel

**Resend Integration:**
- Single API route (`/api/contact` or Server Action)
- Sends email to Gabriel's inbox with form contents
- Resend API key + verified domain configured as env vars
- Setup deferred to final implementation step

---

## File Structure

```
app/
├── layout.tsx          # Root layout: fonts, metadata, shared navbar + footer
├── globals.css         # Tailwind imports, CSS custom properties, aurora animations
├── page.tsx            # Homepage
├── quiz/
│   └── page.tsx        # Career Questionnaire (client component)
├── team/
│   └── page.tsx        # Our Team
├── volunteer/
│   └── page.tsx        # Get Involved
├── contact/
│   └── page.tsx        # Contact (Server Action for form)
│   └── action.ts       # Server Action: send email via Resend
components/
├── navbar.tsx          # Floating glass navbar
├── footer.tsx          # Site footer
├── section-label.tsx   # Reusable "OUR MISSION" style label
├── compass.tsx         # Animated compass hero element (client component)
├── quiz-engine.tsx     # Quiz state machine + scoring logic (client component)
├── result-pdf.ts       # PDF generation utility (jsPDF)
lib/
├── quiz-data.ts        # Questions, options, scoring weights
├── career-categories.ts # Category definitions + descriptions
├── team-data.ts        # Team member array
public/
├── logo/
│   └── image.png       # Career Compass logo
```

---

## Dependencies (additions to existing)

| Package | Purpose | Notes |
|---------|---------|-------|
| `jspdf` | Client-side PDF generation | Quiz results download |
| `resend` | Email API for contact form | Setup last, needs API key + domain |
| `lucide-react` | SVG icon library | Consistent icon set |

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< 640px) | Single column, hamburger nav, stacked layouts |
| Tablet (640–1024px) | 2-column grids, adjusted padding |
| Desktop (> 1024px) | Full layouts as designed |

---

## Accessibility

- All images have descriptive alt text
- Form inputs have proper labels
- Minimum 4.5:1 color contrast ratio for text
- `prefers-reduced-motion` disables all animations
- Keyboard navigation: visible focus rings on all interactive elements
- Tab order matches visual order
- Smooth scroll on anchor links (`scroll-behavior: smooth`)

---

## Out of Scope (V1)

These are planned for post-launch (from the spec's "Future Pages"):
- Events & Photos page
- Case Studies & Testimonials page
- Chapters directory page
- User accounts / authentication
- Server-side quiz result storage
- Analytics on quiz completions

---

## Open Items (require Gabriel's input)

- [ ] Team member titles and bios (Daniel Lopez + 2 others)
- [ ] Team headshot photos
- [ ] Gabriel's headshot for founder section
- [ ] Google Form URL for volunteer page
- [ ] Social media URLs (Instagram, LinkedIn)
- [ ] Contact email address to display publicly
- [ ] Resend API key + verified sending domain (last step)
- [ ] Final domain name confirmation

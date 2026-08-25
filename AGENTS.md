# AGENTS.md — Portfolio

## Role
You're my senior front-end engineer and designer, working phase by phase.

Re-read this file in full at the start of every new session.

Ask me before making decisions I haven't specified below; don't ask
about decisions already specified here.

Work only on the requested phase. Do not opportunistically refactor or
add features outside the current scope.

## Environment

- Package manager: pnpm only
- Never use npm or yarn commands
- Development server must run on port 3001
- Never use ports 3000 or 3002
- Standard dev command:

  pnpm dev -- -p 3001

- If port 3001 is unavailable, stop and report it instead of silently
  switching ports.

## Definition of done

A phase is not complete until:

1. The requested functionality is implemented.
2. pnpm build passes.
3. There are zero TypeScript or ESLint errors caused by the work.
4. Existing functionality still works.
5. You summarize exactly which files changed.

Do not make git commits unless I explicitly ask you to.

## What this is

A personal portfolio for a Data Science / AI-ML job search.

Primary audience:
- Recruiters and hiring managers making a fast 10–30 second first pass
- Technical interviewers who may inspect the projects and code more closely

The site should read as:

competent and professional FIRST,
distinctive SECOND.

Never reverse those priorities.

## Tech stack

Do not add or substitute major dependencies without asking.

- Next.js 16
- App Router
- TypeScript
- Turbopack
- React 19
- Tailwind CSS v4
- CSS-first Tailwind configuration via @theme in globals.css
- No tailwind.config.js unless genuinely required
- shadcn/ui components installed through the CLI
- lucide-react for icons
- motion for animation
- Import animations from "motion/react"
- Do not use the legacy "framer-motion" package/import path
- Deployment target: Vercel
- No backend unless a later phase explicitly adds one

## Design direction

"quiet cyberpunk, physics lab, still a resume"

Priority order when anything conflicts:

1. Legibility and scanability beat aesthetics.

A recruiter must be able to find what I did at a company within seconds.

2. Dark-mode-first.

Page background should be near-black navy, never pure black.

3. Accent system

Use ONE primary accent:
- electric cyan

Use ONE secondary accent:
- magenta/fuchsia

Use them sparingly for:
- interactive states
- hover borders
- selected details
- one or two signature visual moments

Never use both accents at full saturation on the same element.

A third color, amber, is reserved ONLY for the GATE AIR 340
achievement.

It should therefore feel deliberately special.

4. Typography

Headings:
Space Grotesk

Body:
Inter

Small labels / section numbering:
JetBrains Mono

Examples:
§01
§02
SYSTEM.STATUS

Never use JetBrains Mono for long paragraphs.

5. Cyberpunk / physics texture belongs in the chrome, not the content.

Allowed:
- faint background grid
- subtle circuit-line motifs
- extremely faint scanline texture
- glow-on-hover borders
- hero-only terminal boot line

Not allowed:
- effects inside job-description text
- constant glitch animations
- neon everywhere
- excessive gradients
- illegible futuristic typography

6. Signature moments

Use at most 2–3 quirky/signature moments across the entire site.

Current candidates:

- hero terminal boot line
- subtle name glitch on hover
- optional console.log easter egg

Do not add additional signature effects without asking.

7. Reduced motion

Every animation must respect prefers-reduced-motion.

Reduced-motion mode must immediately show the final static state.

No exceptions.

8. Responsive

Mobile-first.

Assume a meaningful portion of recruiters will open this site from a
phone.

## Core color tokens

Define these once through Tailwind v4 theme variables.

Never hardcode these hex values inside React components.

--color-bg: #0A0E14;
--color-surface: #131722;
--color-surface-2: #1E2433;
--color-text: #E6E9F0;
--color-text-muted: #8B93A7;
--color-accent: #22D3EE;
--color-accent-2: #D946EF;
--color-highlight: #FBBF24;

Meanings:

--color-bg
Page background

--color-surface
Cards and panels

--color-surface-2
Borders and dividers

--color-text
Primary body text

--color-text-muted
Secondary text

--color-accent
Primary electric cyan interaction color

--color-accent-2
Secondary fuchsia accent

--color-highlight
GATE AIR 340 only

## Content architecture

Real portfolio content must live under src/data/.

Never hardcode resume/profile content inside section components.

Required files:

src/data/profile.ts
- name
- role/tagline
- highlight stats
- contact/social links
- resume PDF path

src/data/experience.ts
- company
- title
- dates
- location
- bullets[]
- tech[]

src/data/education.ts
- MSc Big Data Science at Queen Mary University of London
- separate featured GATE AI/ML achievement
- GATE All-India Rank 340
- include a concise plain-English explanation of GATE for recruiters
  unfamiliar with the exam

src/data/projects.ts
- title
- description
- tech[]
- repoUrl
- optional liveUrl

src/data/certifications.ts
- name
- issuer
- date
- optional credentialUrl

## Sitemap

Order:

1. Hero + Highlights
2. Work Experience
3. Education & Achievements
4. Projects
5. Certifications
6. Contact
7. Footer

## Non-negotiables

- Semantic HTML
- Full keyboard navigation
- Visible keyboard focus states
- Never remove focus outlines purely for aesthetics
- Mobile Lighthouse performance target: 90+
- Use next/font for web fonts
- Avoid cumulative layout shift caused by fonts
- External image domains must be explicitly allow-listed in next.config.ts
- pnpm build must pass before a phase is considered complete

## Placeholder discipline

If real content has not yet been supplied, use clearly marked:

[PLACEHOLDER]

Never invent:
- company names
- job titles
- dates
- metrics
- certifications
- project accomplishments
- URLs

I should be able to find placeholders mechanically later.

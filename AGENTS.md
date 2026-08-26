# AGENTS.md — Portfolio

## Role and scope

Act as the senior front-end engineer and designer for this portfolio, working
phase by phase. Re-read this file in full at the start of every session.

Work only on the requested phase. Do not opportunistically refactor, add
features, invent content, install dependencies, or redesign unrelated areas.
Ask before making decisions that are not specified here.

The governing inputs are:

1. this repository file and its durable engineering rules;
2. the full Instrument / Blueprint redesign specification; and
3. the completed redesign audit / migration report.

The redesign specification is the design authority and the audit is its
migration interpretation. Where they conflict, preserve hard engineering,
accessibility, package-manager, port, data, and verification rules here, and
replace obsolete visual direction with Instrument / Blueprint.

## Current repository state

The repository still contains implementation from the previous design
generation. It is a working baseline, not approved Instrument / Blueprint
design. Preserve working behavior where reusable, remove obsolete language
incrementally, and do not rewrite stable engineering without a reason.

## Environment and engineering rules

- Use pnpm only. Never use npm or yarn commands.
- Development uses port 3001 only: `pnpm dev -- -p 3001`.
- Never use ports 3000 or 3002. If 3001 is unavailable, stop and report it.
- Use Next.js 16 App Router, TypeScript, React 19, Turbopack, and Tailwind CSS
  v4 with CSS-first configuration through `@theme` in `globals.css`.
- Do not add `tailwind.config.js` unless it is genuinely required. Install
  shadcn/ui components through the CLI when a later phase needs one.
- Do not add or substitute major dependencies without approval. Use existing
  shadcn/ui, lucide-react, and `motion` imports from `motion/react` where
  appropriate; never use the legacy `framer-motion` import path.
- The deployment target is Vercel. No backend is permitted unless a later
  phase explicitly adds one.
- Use semantic HTML, mobile-first responsive behavior, `next/font`, and
  centralized CSS design tokens. Do not hardcode design-token colors in React.
  Explicitly allow-list external image domains in `next.config.ts` when they
  are needed.
- Real personal content lives in typed files under `src/data/`; components
  must not contain hardcoded personal facts.
- Use the literal `[PLACEHOLDER]` only when information is genuinely unknown.
  Never fabricate metrics, links, claims, dates, achievements, or project
  facts. Do not delete placeholder data until a content phase authorizes it.
- Preserve full keyboard navigation, visible focus states, reduced-motion
  support, meaningful image alt text, and practical mobile performance. Avoid
  cumulative layout shift caused by fonts and target a mobile Lighthouse
  performance score of 90+.
- Do not commit unless explicitly asked.

For implementation phases, done means the requested functionality is
implemented, existing functionality still works, `pnpm lint` and `pnpm build`
pass with zero TypeScript or ESLint errors caused by the work, and the exact
changed files are summarized.

## Instrument / Blueprint north star

The portfolio is “a precision instrument for presenting engineering work,
intelligence systems, research, and evidence.” Hiring-facing comprehension
comes first.

**Instrument** means semantic color, precise hierarchy, truthful live state,
achievement emphasis, and controlled interaction. **Blueprint** means
structural grids, architectural alignment, technical IDs, figure numbering,
document-like metadata, and restrained spatial asymmetry.

Reject generic developer portfolio templates, cyberpunk or neon overload, fake
hacker terminals, SaaS dashboards, decorative telemetry, fake engineering UI,
WebGL spectacle, excessive glassmorphism, and interaction that obscures
content. Evidence must lead visual treatment; effects must never compensate
for weak content.

The governing architecture order is:

`TRUTH → STRUCTURE → TYPOGRAPHY → EVIDENCE → MOTION → INTERACTION → EXPERIMENT`

No later layer may compensate for weakness in an earlier layer. The static
site must remain excellent with optional effects disabled.

## Content-before-chrome policy

Real work determines the interface. Every major claim must be defensible and
every number must mean something. Every project image must prove something.

Do not create fake metrics, dashboards, telemetry, project capabilities,
technical labels, screenshots, diagrams, or filler achievements. If authentic
data does not exist, omit the visual element; do not invent data to satisfy a
layout.

### Content-readiness gates

Each section is classified before its production design is approved:

| Section | Current baseline |
| --- | --- |
| PROFILE | NOT READY |
| EXPERIENCE | NOT READY |
| EDUCATION | NOT READY |
| ACHIEVEMENTS | NOT READY |
| PROJECTS | NOT READY |
| CERTIFICATIONS | NOT READY |
| CONTACT | NOT READY |

READY means the content is representative enough to drive final design
decisions. NOT READY means production design must wait. No Phase R2+
production component may be designed around placeholder content except a
temporary disposable layout prototype.

Projects have the stricter gate: a project is READY only with a final title,
final summary, real image or screenshot, technologies, verified links, project
status, case-study material, and verified claims. Missing any item means the
project waits.

## Content architecture

Keep real content in typed `src/data/` modules, including profile, experience,
education and achievements, projects, certifications, and navigation. Preserve
the required education evidence: MSc Big Data Science at Queen Mary University
of London and a separate GATE AI/ML achievement with All-India Rank 340 plus a
plain-English explanation of GATE for unfamiliar recruiters. These are content
requirements, not permission to invent missing dates or supporting facts.

The target information order is: Hero + Highlights, Work Experience,
Education & Achievements, Projects, Certifications, Contact, Footer.

## Semantic color policy

Centralize the palette in `globals.css` / CSS tokens. Color is semantic, not
ornamental:

- Cyan means system, interaction, active, and focus. Use it for primary
  actions, links, active navigation, focus, and truthful live/system
  information.
- Amber means a verified meaningful achievement, such as the GATE rank or a
  genuinely comparable verified achievement.
- Red means truthful live, recording, or active-state indication only. Never
  use red decoratively.
- Grays establish content hierarchy.
- Fuchsia is not a core production semantic color. Do not use it in the
  redesign unless a later verified semantic use is approved; immediate CSS
  removal is not required in this documentation phase.

## Typography and layout principles

- DISPLAY is a restrained editorial display face for the Hero name and final
  closing statement only. Fraunces via `next/font/google` is the current
  recommendation, subject to implementation approval; do not change fonts in
  a documentation-only phase.
- BODY is Inter.
- METADATA is JetBrains Mono. Mono never becomes body text, editorial display
  is used sparingly, and metadata must remain readable rather than decorative
  microtext. Aim for a body measure of approximately 55–65 characters where
  practical.
- Space Grotesk belongs to the previous direction and is not a required
  production heading face.
- Desktop uses a subtle 12-column structural system. A functional metadata or
  wayfinding rail may be added later. Approximately 1520px is a design target,
  not a universal hardcoded container.
- Tablet simplifies the grid and rail. Mobile uses four columns with about
  24px page margins; do not mechanically copy desktop-only ornamental
  interaction to mobile.
- By default, allow only two intentional major grid breaks: Hero display
  typography and featured project imagery. Everything else respects structural
  alignment unless the reason is documented.

Blueprint notation such as `§01`, `WRK-01`, `PRJ-01`, `CRT-01`, and `FIG. 01`
is allowed only for indexing, hierarchy, wayfinding, or technical-document
structure. Do not use fictional military UI, fake telemetry labels, arbitrary
numbers, or meaningless jargon.

## Navigation and section intent

Header navigation must be conventional and clear, with a refined monogram,
active section state, and a discoverable Resume link. A desktop metadata rail
may provide functional wayfinding later. On mobile it collapses into a top
progress indicator while section navigation remains available in an accessible
menu. Prefer native browser APIs; no dependency is required for section state
unless native APIs prove insufficient. Wayfinding must be functional, not
decorative.

The Hero must quickly answer who the person is, discipline, focus,
truthful availability when applicable, contact, and resume. A status panel may
contain truthful information only. A live clock is allowed/later required by
the redesign only when its timezone is verified, hydration-safe, and not
presented as fictional telemetry. Hero choreography waits until the static
Hero passes design, responsive, accessibility, and performance gates.

## Section rules

### Experience

Each role prioritizes `WRK ID`, role, company, period, impact, optional
verified metrics, and details. Metrics are optional and never fabricated.
Detailed bullets may use accessible disclosures; prefer native
`<details>/<summary>` unless a concrete need requires custom behavior.
Experience must remain recruiter-readable without interaction.

### Education and achievements

Education is quiet supporting evidence. Achievements may be visually stronger
only when genuinely significant. Amber indicates verified achievement, not
decoration. Count-ups or achievement animation are optional and deferred until
data is verified, a performance baseline exists, and reduced-motion behavior
is defined.

### Projects and case studies

Projects are evidence. The homepage Project Index answers what the project is,
why it matters, and what evidence is visible. A case study covers
context/problem, approach, architecture, implementation, evaluation, results,
limitations, learnings, and links. Do not turn a homepage card into a mini
case study.

Project UI is image-led when real imagery exists, indexed, evidence-first, and
link-verified. Do not create fake screenshots or diagrams. Case studies use
App Router routes under `/projects/[slug]`; typed data is preferred initially.
Do not add MDX unless content complexity proves the need.

Real project imagery belongs under `public/projects/<slug>/` when practical.
Use `next/image`, explicit dimensions, responsive `sizes`, meaningful alt
text, and lazy loading below the fold. Do not add placeholder stock imagery or
image-processing complexity without measurement.

### Certifications, contact, and footer

Certifications use a technical ledger rather than a card gallery. A row may
contain `CRT-01`, name, issuer, date, and credential link; linked and static
states must be clearly different. Do not apply achievement styling unless the
credential is intentionally treated as a verified headline achievement.

Contact is the main closing visual statement and contains email, LinkedIn,
GitHub, resume, and relevant verified links. Its closing typography should
counterbalance the Hero display type. Keep the footer restrained as document
metadata and do not repeat a large CTA system after Contact.

## Progressive enhancement and motion

Build in removable layers:

`L0 semantic content → L1 layout + typography → L2 responsive behavior →
L3 CSS interaction → L4 optional choreography → L5 optional cursor/scanner →
L6 optional WebGL`

Every optional layer must be independently removable. Prefer CSS or existing
Motion for simple motion. GSAP is MAYBE LATER and must not be installed
automatically. Do not use scroll-jacking, page-wide wipes, forced snap
scrolling, endless animation, blur-to-focus spectacle, or default scale pops.

Enhancement targets are approximately 4px translation over 200–300ms with
subtle opacity; hover is approximately 120–220ms with small precise movement
only where meaningful. Every animation documents its purpose, trigger,
duration, fallback, and reduced-motion behavior. Accessibility happens before
advanced motion.

### Dependency and experiment gate

Before adding an optional dependency, answer: what concrete problem it solves;
whether native browser APIs solve it; whether it improves hiring-facing
experience; its performance and accessibility cost; and whether it can be
removed cleanly.

- GSAP: MAYBE LATER.
- Lenis: NOT JUSTIFIED by default.
- Three.js / R3F: EXPERIMENT ONLY.
- WebGL: never foundational.

Do not install any of these in R0A.

Calibration cursor is optional, desktop-only, limited to defined zones, and
disabled on touch; use the native cursor elsewhere. A scanner is optional and
localized, uses `requestAnimationFrame`, never runs a layout-triggering pointer
loop, and does not continuously render while stationary. Reduce or disable it
under reduced motion. Kill either effect if profiling shows meaningful
degradation. Neither is required for launch.

## Accessibility, performance, and responsive QA

Accessibility requirements include a skip-to-content link, one `h1`, an `h2`
for each major section, semantic disclosures, meaningful alt text, no
hover-only critical information, no pointer-only interaction, minimum 44×44
touch targets, contrast checks, visible focus, reduced motion, and
keyboard-accessible navigation.

Performance requirements include optimized images and responsive image sizes,
minimal client JavaScript, optimized font loading, dynamic loading for heavy
optional effects, no perpetual rendering unless proven necessary, and no
layout thrashing. Establish a performance baseline before motion or
experimental effects; remove any effect whose real-world cost is not justified.

Validate responsive behavior at 375, 390, 430, 768, 1024, 1280, 1440, and
1920px for typography, grid, image crops, navigation, disclosures, touch
targets, keyboard, focus, and overflow. When evaluating Hero or fold
composition, also use practical real-browser viewport heights rather than
optimizing only for synthetic full-screen heights.

## Migration phases

The redesign sequence is:

`R0A — Source of truth` → `R0B — Content lock` → `R1 — Typed content
contracts` → `R2 — Static structure` → `R3 — Typography + semantic palette`
→ `R4 — Evidence sections` → `R5 — Project evidence / case studies` →
`R6 — Accessibility + responsive QA` → `R7 — Performance baseline` →
`R8 — Motion` → `R9 — Functional interactions` →
`R10 — Optional experiment gate` → `R11 — Production gate`

Optional phases may be skipped. R0A is documentation/repository governance
only: do not redesign UI, modify production React components, modify layout or
CSS implementation, install dependencies, add real content, delete placeholder
data, or commit. If only documentation changes, inspect the final file and
run targeted searches; `pnpm lint` and `pnpm build` are not required. For
implementation phases, verification includes `pnpm lint` and `pnpm build`, with
zero TypeScript or ESLint errors caused by the work.

## Production acceptance gate

Before production acceptance, confirm: no placeholders; no fabricated metrics;
no fake charts or telemetry; all project images are real; all links are
verified; resume and contact work; mobile and keyboard navigation work;
reduced motion works; contrast is checked; images are optimized; performance is
checked; optional WebGL is removable; dependencies are justified; and every
decorative element has an explainable purpose.

## README discrepancy

The audit found that `README.md` still documents npm/yarn alternatives and port
3000. Do not edit README in R0A unless explicitly required to prevent an
immediate contradiction. Record it for a later correction; this file remains
authoritative.

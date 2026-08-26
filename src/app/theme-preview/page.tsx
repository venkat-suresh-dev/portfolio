import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const palette = [
  { name: "--bg-base", className: "bg-bg", hex: "#08090C" },
  {
    name: "--bg-surface-1",
    className: "bg-surface",
    hex: "#101218",
  },
  {
    name: "--bg-surface-2",
    className: "bg-surface-2",
    hex: "#161922",
  },
  {
    name: "--text-primary",
    className: "bg-text",
    hex: "#EDEEF1",
  },
  {
    name: "--text-secondary",
    className: "bg-text-muted",
    hex: "#969BA7",
  },
  {
    name: "--text-tertiary",
    className: "bg-text-tertiary",
    hex: "#5B606C",
  },
  {
    name: "--accent-system",
    className: "bg-accent",
    hex: "#4FE0D4",
    note: "Interactive / focus",
  },
  {
    name: "--accent-achievement",
    className: "bg-accent-achievement",
    hex: "#D9A94E",
    note: "Verified achievement only",
  },
  {
    name: "--accent-live",
    className: "bg-accent-live",
    hex: "#FF5C5C",
    note: "Token only — unused in production",
  },
] as const;

function SpecimenHeading({
  index,
  headingId,
  children,
}: {
  index: string;
  headingId: string;
  children: ReactNode;
}) {
  return (
    <header className="mb-6">
      <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
        {index}
      </p>
      <h2
        id={headingId}
        className="mt-2 text-[1.25rem] font-medium tracking-[-0.02em] text-text"
      >
        {children}
      </h2>
    </header>
  );
}

export default function ThemePreviewPage() {
  return (
    <main id="content" tabIndex={-1} className="page-shell py-12 sm:py-16">
      <header className="mb-14 max-w-2xl border-b border-hairline pb-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          Internal QA · sample-only
        </p>
        <h1 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-text">
          Visual system specimens
        </h1>
        <p className="mt-3 text-[1.0625rem] leading-[1.65] text-text-muted">
          Palette, type roles, controls, focus, achievement color, and
          hairlines. Content on this page is sample-only and is not portfolio
          evidence.
        </p>
      </header>

      <section aria-labelledby="palette-heading" className="mb-16">
        <SpecimenHeading index="QA-01" headingId="palette-heading">
          Semantic palette
        </SpecimenHeading>
        <ul className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
          {palette.map((swatch) => (
            <li key={swatch.name} className="bg-bg">
              <div className={cn("h-16 border-b border-hairline", swatch.className)} />
              <div className="px-3 py-3">
                <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-text">
                  {swatch.name}
                </p>
                <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.08em] text-text-muted">
                  {swatch.hex}
                </p>
                {"note" in swatch && swatch.note ? (
                  <p className="mt-1 text-[0.75rem] text-text-muted">{swatch.note}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type-heading" className="mb-16">
        <SpecimenHeading index="QA-02" headingId="type-heading">
          Typography
        </SpecimenHeading>
        <div className="space-y-10 border-t border-hairline pt-8">
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
              DISPLAY · Fraunces · Hero / closing only
            </p>
            <p className="hero-name mt-3">Specimen</p>
          </div>
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
              BODY · Inter · ~1.0625rem / 1.65
            </p>
            <p className="measure mt-3 text-[1.0625rem] leading-[1.65] text-text">
              Body copy should read as a technical publication: measured,
              high contrast, and free of marketing-landing inflation. Recruiters
              scan this first.
            </p>
            <p className="measure mt-3 text-[0.9375rem] leading-[1.7] text-text-muted">
              Secondary supporting copy uses the gray hierarchy, not a second
              accent color.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
              METADATA · JetBrains Mono · 0.6875–0.75rem
            </p>
            <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
              §03 · WRK-01 · PRJ-01 · CRT-01 · FIG. 01
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="hierarchy-heading" className="mb-16">
        <SpecimenHeading index="QA-03" headingId="hierarchy-heading">
          Section header
        </SpecimenHeading>
        <div className="border border-hairline px-5 py-6">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
            §03
          </p>
          <p className="mt-2 text-[1.25rem] font-medium tracking-[-0.02em] text-text">
            Education
          </p>
        </div>
      </section>

      <section aria-labelledby="controls-heading" className="mb-16">
        <SpecimenHeading index="QA-04" headingId="controls-heading">
          Controls and links
        </SpecimenHeading>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#focus-test" className="text-control gap-1.5">
            GitHub
            <span aria-hidden="true" className="text-control-glyph">
              ↗
            </span>
          </a>
          <a href="#focus-test" className="legend-link">
            Credential
            <span aria-hidden="true">↗</span>
          </a>
          <button type="button" className="instrument-btn instrument-btn-primary">
            Primary
          </button>
          <button type="button" className="instrument-btn instrument-btn-secondary">
            Secondary
          </button>
        </div>
      </section>

      <section aria-labelledby="achievement-heading" className="mb-16">
        <SpecimenHeading index="QA-05" headingId="achievement-heading">
          Achievement color
        </SpecimenHeading>
        <div className="gate-feature px-5 py-6">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
            Sample · not production evidence
          </p>
          <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
            Sample rank
          </p>
          <p className="gate-rank mt-2">000</p>
        </div>
      </section>

      <section aria-labelledby="borders-heading" className="mb-16">
        <SpecimenHeading index="QA-06" headingId="borders-heading">
          Hairlines
        </SpecimenHeading>
        <div className="space-y-0 border-t border-hairline">
          <div className="border-b border-hairline py-4 text-[0.9375rem] text-text">
            Structural row
          </div>
          <div className="border-b border-hairline py-4 text-[0.9375rem] text-text-muted">
            Neutral 1px separators — not cards
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-heading" className="mb-8">
        <SpecimenHeading index="QA-07" headingId="focus-heading">
          Focus states
        </SpecimenHeading>
        <p id="focus-test" className="mb-4 text-[0.9375rem] text-text-muted">
          Tab through these controls. Focus rings must remain visible and use
          --focus-ring.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#content" className="text-control">
            Text control
          </a>
          <button type="button" className="instrument-btn instrument-btn-secondary">
            Instrument button
          </button>
          <a href="#content" className="legend-link">
            Legend link
          </a>
        </div>
      </section>
    </main>
  );
}

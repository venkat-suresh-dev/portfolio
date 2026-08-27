import type { ReactNode } from "react";

import { FieldSpecimen } from "@/components/field/FieldSpecimen";
import { FigureFrame } from "@/components/layout/FigureFrame";
import { PrototypeControl } from "@/components/layout/PrototypeControl";
import { EvidenceAperture } from "@/components/projects/EvidenceAperture";
import { EvidenceFigure } from "@/components/projects/EvidenceFigure";
import { EvidencePlane } from "@/components/projects/EvidencePlane";
import { ProjectEvidenceView } from "@/components/projects/ProjectEvidenceView";
import { TechnicalCaption } from "@/components/projects/TechnicalCaption";
import { ObservationTelemetry } from "@/components/sections/ObservationTelemetry";
import {
  ArchitectureFlow,
  DataDistribution,
  EmbeddingSpace,
  MetricPlot,
  ModelEvaluation,
  SystemParticle,
} from "@/components/visualization";
import {
  DEMO_ARCHITECTURE_STAGES,
  DEMO_CATEGORIES,
  DEMO_CONFUSION,
  DEMO_DENSITY,
  DEMO_EMBEDDING_CLUSTERS,
  DEMO_EMBEDDING_POINTS,
  DEMO_EVALUATION_METRICS,
  DEMO_HISTOGRAM,
  DEMO_METRIC_POINTS,
  DEMO_MODEL_COMPARISON,
  DEMO_NOTICE,
  DEMO_SCATTER,
} from "@/components/visualization/demo-data";
import { prototypeProjects } from "@/data/prototype/projects";
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
              §03 · WRK-01 · ACD-01 · PRJ-01 · CRT-01
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

      <section aria-labelledby="focus-heading" className="mb-16">
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

      <section aria-labelledby="evidence-heading" className="mb-16">
        <SpecimenHeading index="QA-08" headingId="evidence-heading">
          Evidence metrics
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          Sample · not production evidence
        </p>
        <div className="academic-lead">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
            ACD-00 · Sample designation
          </p>
          <p className="mt-3 text-[1.35rem] font-medium tracking-tight text-text">
            Sample academic entry
          </p>
          <dl className="evidence-metrics">
            <div className="evidence-metric">
              <dt>Sample metric</dt>
              <dd>0.0000</dd>
            </div>
            <div className="evidence-metric">
              <dt>Sample rate</dt>
              <dd>00%</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="academic-index-heading" className="mb-16">
        <SpecimenHeading index="QA-09" headingId="academic-index-heading">
          Academic index
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          Sample · not production evidence
        </p>
        <ol className="academic-index m-0 max-w-xl list-none p-0">
          <li>
            <article className="academic-index-row">
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
                ACD-00
              </p>
              <p className="mt-2 text-[1.0625rem] font-medium tracking-[-0.015em] text-text">
                Sample supporting entry
              </p>
              <dl className="evidence-metrics-inline">
                <div className="evidence-metric-inline">
                  <dt>Sample validation accuracy</dt>
                  <dd>00%</dd>
                </div>
              </dl>
            </article>
          </li>
        </ol>
      </section>

      <section aria-labelledby="ledger-heading" className="mb-8">
        <SpecimenHeading index="QA-10" headingId="ledger-heading">
          Certification ledger
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          Sample · not production evidence
        </p>
        <div className="credential-ledger">
          <div className="credential-legend page-grid" aria-hidden="true">
            <p className="col-span-4 md:col-span-1 lg:col-span-2">ID</p>
            <p className="col-span-4 md:col-span-4 lg:col-span-5">
              Certification
            </p>
            <p className="col-span-4 md:col-span-2 lg:col-span-3">Issuer</p>
            <p className="col-span-4 md:col-span-1 md:text-right lg:col-span-2">
              Credential
            </p>
          </div>
          <div className="credential-row" data-interactive="true">
            <div className="page-grid items-start gap-y-1 md:items-center">
              <p className="col-span-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted md:col-span-1 lg:col-span-2">
                CRT-00
              </p>
              <p className="col-span-4 text-[1.0625rem] font-medium tracking-[-0.015em] text-text md:col-span-4 lg:col-span-5">
                Sample certification
              </p>
              <p className="col-span-4 text-[0.8125rem] text-text-muted md:col-span-2 lg:col-span-3">
                Sample issuer
              </p>
              <a
                href="#focus-test"
                className="legend-link col-span-4 min-h-11 md:col-span-1 md:justify-self-end lg:col-span-2"
              >
                Credential
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="status-heading" className="mb-16">
        <SpecimenHeading index="QA-11" headingId="status-heading">
          Status panel
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · PROTOTYPE specimen
        </p>
        <div className="status-panel max-w-md">
          <p className="status-panel-kicker">
            <span>Status</span>
          </p>
          <dl>
            <div className="status-row">
              <dt className="status-key">Availability</dt>
              <dd className="status-value status-value--placeholder">
                [PLACEHOLDER] Availability
              </dd>
            </div>
            <div className="status-row">
              <dt className="status-key">Local time</dt>
              <dd className="status-value status-value--placeholder">
                [PLACEHOLDER]
              </dd>
            </div>
            <div className="status-row">
              <dt className="status-key">Location</dt>
              <dd className="status-value">SAMPLE location</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="rail-heading" className="mb-16">
        <SpecimenHeading index="QA-12" headingId="rail-heading">
          Wayfinding rail
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · static rail fragment
        </p>
        <div className="flex gap-8 border border-hairline px-5 py-6">
          <nav className="wayfinding-index" aria-label="Sample section index">
            <span className="wayfinding-link">§01</span>
            <span className="wayfinding-link" aria-current="location">
              §02
            </span>
            <span className="wayfinding-link">§03</span>
          </nav>
          <div className="wayfinding-progress" style={{ pointerEvents: "auto" }}>
            <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary">
              §02
            </p>
            <div className="wayfinding-progress-track" aria-hidden="true">
              <span
                className="wayfinding-progress-fill"
                style={{ transform: "scaleY(0.35)" }}
              />
            </div>
            <p className="font-mono text-[0.6875rem] text-text-tertiary">
              WRK-01
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="disclosure-heading" className="mb-16">
        <SpecimenHeading index="QA-13" headingId="disclosure-heading">
          Experience disclosure
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · native details
        </p>
        <details className="experience-details max-w-xl" open>
          <summary>Details</summary>
          <p className="placeholder-copy mt-2 text-[0.95rem] leading-[1.7]">
            [PLACEHOLDER] Supporting detail. Sample only.
          </p>
        </details>
      </section>

      <section aria-labelledby="figure-heading" className="mb-16">
        <SpecimenHeading index="QA-14" headingId="figure-heading">
          Project figure
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · hover/focus the plate
        </p>
        <div className="max-w-xl">
          <FigureFrame
            figureId="FIG. 00"
            kind="PROJECT EVIDENCE"
            mediaMeta="16∶9 · CROP"
            caption="[PLACEHOLDER] Sample figure"
            label={"[PLACEHOLDER]\nREAL PROJECT IMAGE"}
            featured
          />
        </div>
      </section>

      <section aria-labelledby="row-heading" className="mb-16">
        <SpecimenHeading index="QA-15" headingId="row-heading">
          Secondary project figure
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · PROTOTYPE
        </p>
        <article className="project-index-item max-w-md border-t border-hairline pt-6">
          <FigureFrame
            figureId="FIG. 00"
            kind="PROJECT EVIDENCE"
            mediaMeta="16∶11 · CROP"
            caption="[PLACEHOLDER] Sample figure"
            label={"[PLACEHOLDER]\nREAL PROJECT IMAGE"}
          />
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
              PRJ-00
            </p>
            <p className="mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-text">
              [PLACEHOLDER] Project 00
            </p>
            <p className="placeholder-copy mt-2 text-[0.95rem] leading-[1.7]">
              [PLACEHOLDER] Short summary. Sample only.
            </p>
          </div>
        </article>
      </section>

      <section aria-labelledby="document-heading" className="mb-16">
        <SpecimenHeading index="QA-17" headingId="document-heading">
          Documentary plate
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · PROTOTYPE · not a real credential image
        </p>
        <div className="max-w-xl">
          <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted uppercase">
            DOC. 00 · Degree / Award document
          </p>
          <FigureFrame
            figureId="DOC. 00"
            caption="[PLACEHOLDER] Sample award document"
            label={"[PLACEHOLDER]\nDEGREE DOCUMENT"}
            alt="Prototype placeholder for future degree document"
            interactive={false}
            variant="document"
          />
        </div>
      </section>

      <section aria-labelledby="motion-heading" className="mb-16">
        <SpecimenHeading index="QA-16" headingId="motion-heading">
          Motion / reduced motion
        </SpecimenHeading>
        <p className="measure text-[0.9375rem] leading-[1.7] text-text-muted">
          SAMPLE: Hero uses a clip/reveal on load. Scroll sections travel 4px
          over ~240ms. Project figures pan 2–4px on hover. Under
          prefers-reduced-motion, content is visible immediately, hero staging
          is skipped, and figure pans are disabled. Use the OS reduced-motion
          setting to verify.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <PrototypeControl
            label="Sample unavailable action"
            className="instrument-btn instrument-btn-primary"
          >
            Prototype control
          </PrototypeControl>
        </div>
      </section>

      <section aria-labelledby="vocabulary-heading" className="mb-16">
        <SpecimenHeading index="QA-18" headingId="vocabulary-heading">
          System vocabulary
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · each concept has one job
        </p>
        <dl className="max-w-xl border-t border-hairline">
          {[
            ["Particle", "Attention / state / transmission"],
            ["Trajectory", "Progression through time"],
            ["Measurement", "Evidence / project data"],
            ["Network", "Technical relationships"],
            ["State", "Interaction changes"],
            ["Field", "Computational playground"],
          ].map(([term, job]) => (
            <div
              key={term}
              className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-3 border-b border-hairline py-3"
            >
              <dt className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-tertiary uppercase">
                {term}
              </dt>
              <dd className="m-0 text-[0.9375rem] text-text-muted">{job}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="observation-heading" className="mb-16">
        <SpecimenHeading index="QA-19" headingId="observation-heading">
          Observation telemetry
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          LIVE viewport and scroll on this page · section idle without homepage
          anchors
        </p>
        <div className="max-w-sm border-t border-hairline pt-4">
          <ObservationTelemetry className="observation--preview" />
        </div>
      </section>

      <section aria-labelledby="particle-heading" className="mb-16">
        <SpecimenHeading index="QA-20" headingId="particle-heading">
          Canonical particle
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · white-hot center · cyan edge · controlled halo
        </p>
        <div className="particle-specimen border-t border-hairline pt-6">
          <SystemParticle />
          <SystemParticle size="sm" />
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary">
            Intro / active trajectory node / contact transmission
          </p>
        </div>
      </section>

      <section aria-labelledby="arch-heading" className="mb-16">
        <SpecimenHeading index="QA-21" headingId="arch-heading">
          Architecture flow
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          {DEMO_NOTICE}
        </p>
        <ArchitectureFlow
          figureId="FIG. P1"
          caption="Prototype request path. Not a production architecture."
          source="Theme preview · synthetic stages"
          status="synthetic"
          alt="Prototype architecture flow from client through API and service to cache."
          stages={[...DEMO_ARCHITECTURE_STAGES]}
        />
      </section>

      <section aria-labelledby="metric-heading" className="mb-16">
        <SpecimenHeading index="QA-22" headingId="metric-heading">
          Metric plot
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          {DEMO_NOTICE}
        </p>
        <MetricPlot
          figureId="FIG. P2"
          caption="Synthetic series with a reference threshold. Not measured results."
          source="Theme preview · synthetic series"
          status="synthetic"
          alt="Prototype line plot decreasing from 1.00 to 0.20 over 32 steps, with a reference line at 0.30."
          points={[...DEMO_METRIC_POINTS]}
          unit="arb."
          xLabel="step"
          yLabel="Synthetic loss units"
          threshold={0.3}
          thresholdLabel="ref"
        />
      </section>

      <section aria-labelledby="eval-heading" className="mb-16">
        <SpecimenHeading index="QA-23" headingId="eval-heading">
          Model evaluation
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          {DEMO_NOTICE}
        </p>
        <ModelEvaluation
          figureId="FIG. P3"
          caption="Prototype metrics, confusion counts, and model comparison. Not academic evidence."
          source="Theme preview · round synthetic values"
          status="synthetic"
          alt="Prototype evaluation with F1 0.80, a four-cell confusion matrix, and three model scores."
          metrics={[...DEMO_EVALUATION_METRICS]}
          confusion={{ ...DEMO_CONFUSION }}
          comparison={[...DEMO_MODEL_COMPARISON]}
        />
      </section>

      <section aria-labelledby="dist-heading" className="mb-16">
        <SpecimenHeading index="QA-24" headingId="dist-heading">
          Data distribution
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          {DEMO_NOTICE}
        </p>
        <div className="space-y-12">
          <DataDistribution
            figureId="FIG. P4"
            caption="Prototype histogram. Bin values are synthetic."
            source="Theme preview · synthetic bins"
            status="synthetic"
            alt="Prototype histogram with six bins peaking at 14."
            variant="histogram"
            bins={[...DEMO_HISTOGRAM]}
            yLabel="Synthetic counts"
          />
          <DataDistribution
            figureId="FIG. P5"
            caption="Prototype category distribution."
            source="Theme preview · synthetic categories"
            status="synthetic"
            alt="Prototype category bars for A B C and D."
            variant="category"
            bins={[...DEMO_CATEGORIES]}
          />
          <DataDistribution
            figureId="FIG. P6"
            caption="Prototype density-like polyline. Not a fitted kernel."
            source="Theme preview · synthetic density"
            status="synthetic"
            alt="Prototype density-like curve rising then falling across seven points."
            variant="density"
            points={[...DEMO_DENSITY]}
            yLabel="Synthetic density"
          />
          <DataDistribution
            figureId="FIG. P7"
            caption="Prototype scatter distribution."
            source="Theme preview · synthetic points"
            status="synthetic"
            alt="Prototype scatter of ten unlabeled points."
            variant="scatter"
            points={[...DEMO_SCATTER]}
          />
        </div>
      </section>

      <section aria-labelledby="embed-heading" className="mb-16">
        <SpecimenHeading index="QA-25" headingId="embed-heading">
          Embedding / vector space
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          {DEMO_NOTICE}
        </p>
        <EmbeddingSpace
          figureId="FIG. P8"
          caption="Prototype clusters for layout only. Not a computed embedding."
          source="Theme preview · synthetic points"
          status="synthetic"
          alt="Prototype vector space with three labeled clusters. Select a point to read its sample metadata."
          points={[...DEMO_EMBEDDING_POINTS]}
          clusters={[...DEMO_EMBEDDING_CLUSTERS]}
        />
      </section>

      <section aria-labelledby="scrollbar-heading" className="mb-16">
        <SpecimenHeading index="QA-26" headingId="scrollbar-heading">
          Scrollbar
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · Option B · 1px cyan measurement edge · desktop ≥1024
        </p>
        <div className="flex items-start gap-8 border-t border-hairline pt-6">
          <div className="scrollbar-specimen" aria-hidden="true">
            <div className="scrollbar-specimen-track">
              <div className="scrollbar-specimen-thumb" />
            </div>
          </div>
          <div className="max-w-md text-[0.9375rem] leading-[1.7] text-text-muted">
            <p>
              Track is a hairline rail. Thumb is graphite with a 1px cyan
              measurement edge. Firefox uses a muted graphite/cyan mix. Mobile
              keeps the native overlay scrollbar.
            </p>
            <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary">
              Wayfinding = section identity · Scrollbar = page position
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="field-heading" className="mb-16">
        <SpecimenHeading index="QA-27" headingId="field-heading">
          Field / 01
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · canonical particle · trail · measurement frame · parameter ·
          state
        </p>
        <FieldSpecimen />
      </section>

      <section aria-labelledby="spread-heading" className="mb-16">
        <SpecimenHeading index="QA-28" headingId="spread-heading">
          Featured project spread
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · PROTOTYPE · not production evidence
        </p>
        <div className="qa-project-spread">
          <p className="project-folio" aria-hidden="true">
            01
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
            PRJ-01 · PROTOTYPE
          </p>
          <p className="project-featured-title">
            <span className="project-title-placeholder">[PLACEHOLDER]</span>
            <span className="project-title-text">Featured Project</span>
          </p>
          <p className="project-featured-summary placeholder-copy">
            [PLACEHOLDER] Spread specimen for layout QA. Not a real claim.
          </p>
        </div>
      </section>

      <section aria-labelledby="aperture-heading" className="mb-16">
        <SpecimenHeading index="QA-29" headingId="aperture-heading">
          Media aperture
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · rest versus inspect · prototype plane
        </p>
        <div className="grid gap-8 lg:grid-cols-2">
          {prototypeProjects[0]?.evidence?.[2] ? (
            <>
              <div>
                <p className="mb-3 font-mono text-[0.625rem] tracking-[0.14em] text-text-tertiary uppercase">
                  Rest
                </p>
                <EvidenceAperture
                  figure={prototypeProjects[0].evidence[2]}
                  className="qa-aperture-rest"
                >
                  <ProjectEvidenceView
                    figure={prototypeProjects[0].evidence[2]}
                  />
                </EvidenceAperture>
              </div>
              <div>
                <p className="mb-3 font-mono text-[0.625rem] tracking-[0.14em] text-text-tertiary uppercase">
                  Inspect
                </p>
                <EvidenceAperture
                  figure={prototypeProjects[0].evidence[2]}
                  className="qa-aperture-active"
                >
                  <ProjectEvidenceView
                    figure={prototypeProjects[0].evidence[2]}
                  />
                </EvidenceAperture>
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="selector-heading" className="mb-16">
        <SpecimenHeading index="QA-30" headingId="selector-heading">
          Figure selector
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · technical report index · prototype figures
        </p>
        {prototypeProjects[0]?.evidence ? (
          <EvidencePlane figures={prototypeProjects[0].evidence} />
        ) : null}
      </section>

      <section aria-labelledby="caption-heading" className="mb-16">
        <SpecimenHeading index="QA-31" headingId="caption-heading">
          Technical caption
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · publication caption structure
        </p>
        <figure className="max-w-xl">
          <TechnicalCaption
            figureId="FIG.00"
            title="SYSTEM ARCHITECTURE"
            caption="Prototype system-flow specimen. Synthetic structure for layout validation."
            source="PROTOTYPE / SYNTHETIC"
          />
        </figure>
      </section>

      <section aria-labelledby="cover-heading" className="mb-16">
        <SpecimenHeading index="QA-32" headingId="cover-heading">
          Case-study cover
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · technical report cover fragment
        </p>
        <header className="case-study-cover max-w-3xl">
          <p className="case-study-cover-kicker">
            <span>PRJ-01</span>
            <span>Technical report</span>
            <span className="prototype-mark">PROTOTYPE</span>
          </p>
          <p className="case-study-cover-status">PROTOTYPE</p>
          <p className="case-study-cover-title">
            <span className="project-title-placeholder">[PLACEHOLDER]</span>
            <span className="project-title-text">Featured Project</span>
          </p>
          <p className="case-study-cover-thesis placeholder-copy">
            [PLACEHOLDER] Cover specimen. Not a real thesis.
          </p>
        </header>
      </section>

      <section aria-labelledby="frame-heading" className="mb-8">
        <SpecimenHeading index="QA-33" headingId="frame-heading">
          Project evidence frame
        </SpecimenHeading>
        <p className="mb-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
          SAMPLE · labeled placeholder plane · not a fake screenshot
        </p>
        {prototypeProjects[0]?.evidence?.[2] ? (
          <div className="max-w-3xl">
            <EvidenceFigure figure={prototypeProjects[0].evidence[2]} />
          </div>
        ) : null}
      </section>
    </main>
  );
}

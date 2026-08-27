import { DocumentFigure } from "@/components/layout/DocumentFigure";
import { InViewOnce } from "@/components/layout/InViewOnce";
import { TechLegend } from "@/components/layout/TechLegend";
import type { AcademicProject, EducationDocument } from "@/data/education";
import type { Metric } from "@/data/types";
import { cn } from "@/lib/utils";

function academicDocId(index: number) {
  return `ACD-${String(index + 1).padStart(2, "0")}`;
}

function EvidenceMetrics({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <dl className="evidence-metrics">
      {metrics.map((metric) => (
        <div key={metric.label} className="evidence-metric">
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function InlineEvidenceMetrics({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <dl className="evidence-metrics-inline">
      {metrics.map((metric) => (
        <div key={metric.label} className="evidence-metric-inline">
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function AcademicKicker({
  docId,
  designation,
}: {
  docId: string;
  designation?: string;
}) {
  return (
    <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
      {docId}
      {designation ? (
        <>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span>{designation}</span>
        </>
      ) : null}
    </p>
  );
}

function LeadAcademicItem({
  project,
  index,
}: {
  project: AcademicProject;
  index: number;
}) {
  const docId = academicDocId(index);
  const headingId = `${project.id}-title`;
  const heading = project.headline ?? project.title;
  const technologies = project.technologies ?? [];
  const metrics = project.metrics ?? [];
  const showBibliographicTitle = Boolean(project.headline);

  return (
    <article
      aria-labelledby={headingId}
      className="min-w-0"
      data-doc-id={docId}
    >
      <div className="academic-lead-copy">
        <AcademicKicker docId={docId} designation={project.designation} />
        <h4
          id={headingId}
          className="mt-3 text-[1.35rem] font-medium tracking-tight text-text sm:text-[1.5rem]"
        >
          {heading}
        </h4>
        {showBibliographicTitle ? (
          <p className="academic-source mt-3">{project.title}</p>
        ) : null}
        <p className="measure mt-4 text-[0.9375rem] leading-[1.7] text-text-muted">
          {project.summary}
        </p>
        {project.collaborators ? (
          <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.08em] text-text-muted">
            {project.collaborators}
          </p>
        ) : null}
        {technologies.length > 0 ? (
          <TechLegend labels={technologies} className="mt-5 uppercase" />
        ) : null}
        {metrics.length > 0 ? (
          <div className="academic-lead-evidence">
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
              Evaluation
            </p>
            <EvidenceMetrics metrics={metrics} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function SupportingAcademicItem({
  project,
  index,
}: {
  project: AcademicProject;
  index: number;
}) {
  const docId = academicDocId(index);
  const headingId = `${project.id}-title`;
  const heading = project.headline ?? project.title;
  const technologies = project.technologies ?? [];
  const metrics = project.metrics ?? [];

  return (
    <article
      aria-labelledby={headingId}
      className="academic-index-row"
      data-doc-id={docId}
    >
      <AcademicKicker docId={docId} designation={project.designation} />
      <h4
        id={headingId}
        className="mt-2 text-[1.0625rem] font-medium tracking-[-0.015em] text-text"
      >
        {heading}
      </h4>
      {project.collaborators ? (
        <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.08em] text-text-muted">
          {project.collaborators}
        </p>
      ) : null}
      <p className="mt-2 text-[0.875rem] leading-[1.65] text-text-muted">
        {project.summary}
      </p>
      {metrics.length > 0 ? (
        <InlineEvidenceMetrics metrics={metrics} />
      ) : null}
      {technologies.length > 0 ? (
        <TechLegend labels={technologies} className="mt-3 uppercase" />
      ) : null}
    </article>
  );
}

export function AcademicWork({
  headingId,
  projects,
  documents = [],
}: {
  headingId: string;
  projects: readonly AcademicProject[];
  documents?: readonly EducationDocument[];
}) {
  if (projects.length === 0 && documents.length === 0) {
    return null;
  }

  const [lead, ...supporting] = projects;
  const continued = Boolean(lead && documents.length > 0);

  return (
    <section aria-labelledby={headingId} className="academic-work">
      <header className="mb-8 sm:mb-10">
        <p className="academic-work-kicker font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
          Master&apos;s <span aria-hidden="true">·</span> Research record
        </p>
        <h3
          id={headingId}
          className="mt-2 text-[1.25rem] font-medium tracking-[-0.02em] text-text sm:text-[1.375rem]"
        >
          Academic work
        </h3>
      </header>

      <div
        className={cn(
          "academic-composition",
          continued && "academic-composition--continued"
        )}
      >
        {lead ? (
          <InViewOnce className="academic-lead">
            <LeadAcademicItem project={lead} index={0} />
          </InViewOnce>
        ) : null}

        {supporting.length > 0 ? (
          <InViewOnce className="academic-supporting" simplifyOnMobile>
            {supporting.map((project, index) => (
              <SupportingAcademicItem
                key={project.id}
                project={project}
                index={index + 1}
              />
            ))}
          </InViewOnce>
        ) : null}

        {documents.map((document) => (
          <div key={document.id} className="academic-document-cell">
            <DocumentFigure document={document} />
          </div>
        ))}
      </div>
    </section>
  );
}

import { ExperienceDisclosure } from "@/components/sections/ExperienceDisclosure";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { TechLegend } from "@/components/layout/TechLegend";
import { PrototypeMark } from "@/components/layout/PrototypeControl";
import {
  resolvedExperience,
  SHOW_PROTOTYPE_CONTENT,
} from "@/data/resolved";
import type { ExperienceEntry } from "@/data/experience";
import { cn } from "@/lib/utils";

function workDocId(entry: ExperienceEntry, index: number) {
  return entry.docId ?? `WRK-${String(index + 1).padStart(2, "0")}`;
}

function ExperienceRole({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const details = entry.details ?? [];
  const technologies = entry.technologies ?? [];
  const metrics = entry.metrics ?? [];
  const workId = workDocId(entry, index);
  const emphasis = entry.emphasis ?? (index === 0 ? "lead" : "standard");
  const isLead = emphasis === "lead";

  return (
    <li
      className={cn(
        "timeline-entry",
        emphasis === "lead" && "experience-entry--lead",
        emphasis === "standard" && "experience-entry--standard",
        emphasis === "quiet" && "experience-entry--quiet"
      )}
    >
      <article
        aria-labelledby={`${entry.id}-title`}
        data-doc-id={workId}
        className="grid grid-cols-[0.7rem_minmax(0,1fr)] gap-x-3 md:grid-cols-[6.75rem_0.85rem_minmax(0,1fr)] md:gap-x-5"
      >
        <p className="hidden pt-[0.4rem] text-right font-mono text-[0.7rem] leading-snug tracking-[0.06em] text-text-muted md:block">
          {entry.period}
        </p>

        <div className="timeline-rail" aria-hidden="true">
          <span className="timeline-node" />
        </div>

        <div className="timeline-content min-w-0">
          <header className="experience-heading">
            <p className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
              <span>{workId}</span>
              {entry.prototype ? <PrototypeMark /> : null}
            </p>
            <h3
              id={`${entry.id}-title`}
              className="experience-role mt-2 font-medium tracking-[-0.02em] text-text"
            >
              {entry.role}
            </h3>
            <p className="experience-company">
              {entry.company}
            </p>
            {entry.location ? (
              <p className="experience-meta">
                <span className="md:hidden">{entry.period}</span>
                <span className="mx-2 md:hidden" aria-hidden="true">
                  ·
                </span>
                <span>{entry.location}</span>
              </p>
            ) : (
              <p className="experience-meta md:hidden">{entry.period}</p>
            )}
          </header>

          {entry.impact ? (
            <div className="experience-impact">
              {isLead ? (
                <p className="experience-kicker">Impact</p>
              ) : null}
              <p className="placeholder-copy experience-impact-copy">
                {entry.impact}
              </p>
            </div>
          ) : null}

          {metrics.length > 0 ? (
            <dl className="experience-metrics">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd className="placeholder-copy">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {details.length > 0 ? (
            <ExperienceDisclosure lead={isLead}>
              <summary>{isLead ? "Role details" : "Details"}</summary>
              <ul className="timeline-bullets mt-1 max-w-2xl space-y-2.5">
                {details.map((detail, detailIndex) => (
                  <li
                    key={`${entry.id}-detail-${detailIndex}`}
                    className="placeholder-copy text-[0.95rem] leading-[1.7]"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </ExperienceDisclosure>
          ) : null}

          {technologies.length > 0 ? (
            <div className="experience-stack">
              {isLead ? (
                <p className="experience-kicker">Technologies</p>
              ) : null}
              <TechLegend labels={technologies} />
            </div>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export function Experience() {
  if (resolvedExperience.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="page-section page-section--experience"
    >
      <div className="page-shell">
        <SectionHeader
          index="§02"
          title="Work Experience"
          headingId="experience-heading"
        />
        {SHOW_PROTOTYPE_CONTENT ? (
          <p className="mb-8 max-w-xl font-mono text-[0.75rem] tracking-[0.08em] text-text-muted">
            PROTOTYPE · Roles below are layout fixtures, not employment history.
          </p>
        ) : null}

        <ScrollReveal>
          <div className="page-grid">
            <ol className="col-span-4 m-0 list-none p-0 md:col-span-8 xl:col-span-10">
              {resolvedExperience.map((entry, index) => (
                <ExperienceRole key={entry.id} entry={entry} index={index} />
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

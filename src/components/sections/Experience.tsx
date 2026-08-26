import { SectionHeader } from "@/components/layout/SectionHeader";
import { TechLegend } from "@/components/layout/TechLegend";
import { experience, type ExperienceEntry } from "@/data/experience";

function ExperienceRole({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const details = entry.details ?? [];
  const technologies = entry.technologies ?? [];
  const workId = `WRK-${String(index + 1).padStart(2, "0")}`;

  return (
    <li className="timeline-entry">
      <article
        aria-labelledby={`${entry.id}-title`}
        className="grid grid-cols-[0.7rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-[6.75rem_0.85rem_minmax(0,1fr)] lg:gap-x-5"
      >
        <p className="hidden pt-[0.4rem] text-right font-mono text-[0.7rem] leading-snug tracking-[0.06em] text-text-muted lg:block">
          {entry.period}
        </p>

        <div className="timeline-rail" aria-hidden="true">
          <span className="timeline-node" />
        </div>

        <div className="timeline-content min-w-0">
          <header>
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
              {workId}
            </p>
            <h3
              id={`${entry.id}-title`}
              className="mt-1 text-xl font-medium tracking-[-0.02em] text-text sm:text-[1.35rem]"
            >
              {entry.role}
            </h3>
            <p className="mt-0.5 text-[0.95rem] text-text sm:text-base">
              {entry.company}
            </p>
            <p className="mt-1 font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
              <span className="lg:hidden">{entry.period}</span>
              {entry.location ? (
                <>
                  <span className="mx-2 lg:hidden" aria-hidden="true">
                    ·
                  </span>
                  <span>{entry.location}</span>
                </>
              ) : null}
            </p>
          </header>

          {entry.impact ? (
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.7] text-text">
              {entry.impact}
            </p>
          ) : null}

          {details.length > 0 ? (
            <ul className="timeline-bullets mt-3.5 max-w-2xl space-y-2.5">
              {details.map((detail, detailIndex) => (
                <li
                  key={`${entry.id}-detail-${detailIndex}`}
                  className="text-[0.95rem] leading-[1.7] text-text"
                >
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}

          {technologies.length > 0 ? (
            <TechLegend labels={technologies} className="mt-3.5" />
          ) : null}
        </div>
      </article>
    </li>
  );
}

export function Experience() {
  if (experience.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="page-section"
    >
      <div className="page-shell">
        <SectionHeader
          index="§02"
          title="Work Experience"
          headingId="experience-heading"
        />

        <div className="page-grid">
          <ol className="col-span-4 m-0 list-none p-0 md:col-span-8 lg:col-span-10">
            {experience.map((entry, index) => (
              <ExperienceRole key={entry.id} entry={entry} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

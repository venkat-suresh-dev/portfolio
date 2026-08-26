import { SectionHeader } from "@/components/layout/SectionHeader";
import {
  achievements,
  education,
  type Achievement,
  type EducationEntry,
} from "@/data/education";

function EducationItem({ entry }: { entry: EducationEntry }) {
  const modules = entry.modules ?? [];
  const period = entry.end ? `${entry.start} – ${entry.end}` : entry.start;

  return (
    <li>
      <article
        aria-labelledby={`${entry.id}-title`}
        className="academic-block"
      >
        <h3
          id={`${entry.id}-title`}
          className="text-[1.25rem] font-medium tracking-[-0.02em] text-text sm:text-[1.375rem]"
        >
          {entry.degree}
        </h3>
        <p className="mt-1 text-[1.0625rem] text-text-muted">
          {entry.institution}
        </p>

        {entry.outcome ? (
          <p className="mt-4 text-[1.0625rem] leading-[1.65] font-medium text-text">
            {entry.outcome}
          </p>
        ) : null}

        <p className="mt-3 font-mono text-[0.7rem] tracking-[0.1em] text-text-muted">
          <time>{period}</time>
          {entry.location ? (
            <>
              <span className="mx-2" aria-hidden="true">
                ·
              </span>
              <span>{entry.location}</span>
            </>
          ) : null}
        </p>

        {modules.length > 0 ? (
          <ul className="module-list mt-5">
            {modules.map((module) => (
              <li key={`${entry.id}-${module}`}>{module}</li>
            ))}
          </ul>
        ) : null}
      </article>
    </li>
  );
}

function GateFeature({ achievement }: { achievement: Achievement }) {
  const headingLabel = achievement.label
    ? `${achievement.label} ${achievement.value}`
    : `${achievement.name} ${achievement.value}`;

  return (
    <article
      aria-labelledby={`${achievement.id}-heading`}
      className="gate-feature mt-12 px-5 py-6 sm:mt-16 sm:px-8 sm:py-8"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:items-end md:gap-10 lg:gap-14">
        <div className="min-w-0">
          <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
            {achievement.name}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <time dateTime={achievement.year}>{achievement.year}</time>
          </p>
          <h3
            id={`${achievement.id}-heading`}
            aria-label={headingLabel}
            className="mt-3"
          >
            {achievement.label ? (
              <span className="mb-2 block font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted uppercase">
                {achievement.label}
              </span>
            ) : null}
            <span className="gate-rank">{achievement.value}</span>
          </h3>
        </div>

        {achievement.context ? (
          <p className="measure max-w-xl text-[0.9375rem] leading-[1.7] text-text-muted md:pb-1">
            {achievement.context}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function Education() {
  const featuredAchievements = achievements.filter(
    (achievement) => achievement.featured
  );

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="page-section"
    >
      <div className="page-shell">
        <SectionHeader
          index="§03"
          title="Education"
          headingId="education-heading"
        />

        <div className="page-grid">
          <ol className="col-span-4 m-0 list-none p-0 md:col-span-8 lg:col-span-8">
            {education.map((entry) => (
              <EducationItem key={entry.id} entry={entry} />
            ))}
          </ol>
        </div>

        {featuredAchievements.map((achievement) => (
          <GateFeature key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}

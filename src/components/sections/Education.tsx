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
          className="font-heading text-[1.35rem] font-medium tracking-[-0.02em] text-text sm:text-[1.55rem]"
        >
          {entry.degree}
        </h3>
        <p className="mt-1 text-base text-text sm:text-[1.05rem]">
          {entry.institution}
        </p>
        <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
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

        {entry.outcome ? (
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.7] text-text">
            {entry.outcome}
          </p>
        ) : null}

        {modules.length > 0 ? (
          <ul className="mt-4 grid max-w-2xl grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-8">
            {modules.map((module) => (
              <li
                key={`${entry.id}-${module}`}
                className="text-[0.95rem] leading-[1.7] text-text"
              >
                {module}
              </li>
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
      className="gate-feature mt-10 px-5 py-5 sm:mt-12 sm:px-7 sm:py-6"
    >
      <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-8 lg:gap-10">
        <div className="min-w-0">
          <h3
            id={`${achievement.id}-heading`}
            aria-label={headingLabel}
            className="text-highlight"
          >
            {achievement.label ? (
              <span className="block font-mono text-[0.72rem] tracking-[0.14em] uppercase">
                {achievement.label}
              </span>
            ) : null}
            <span className="mt-1.5 block font-heading text-[clamp(2.5rem,9vw,4.35rem)] leading-none font-medium tracking-[-0.03em] tabular-nums">
              {achievement.value}
            </span>
          </h3>
        </div>

        <div className="min-w-0 md:pt-1">
          <p className="font-heading text-lg font-medium tracking-[-0.02em] text-text">
            {achievement.name}
          </p>
          <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
            <time dateTime={achievement.year}>{achievement.year}</time>
          </p>
          {achievement.context ? (
            <p className="mt-3 max-w-xl text-[0.95rem] leading-[1.7] text-text">
              {achievement.context}
            </p>
          ) : null}
        </div>
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
          label="Education"
          title="Education & Achievements"
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

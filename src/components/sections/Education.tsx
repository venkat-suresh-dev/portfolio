import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import {
  achievements,
  education,
  type AchievementEntry,
  type EducationEntry,
} from "@/data/education";

function EducationItem({ entry }: { entry: EducationEntry }) {
  const details = entry.details ?? [];

  return (
    <li className="timeline-entry">
      <article
        aria-labelledby={`${entry.id}-title`}
        className="grid grid-cols-[0.7rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-[6.75rem_0.85rem_minmax(0,1fr)] lg:gap-x-5"
      >
        <p className="hidden pt-[0.4rem] text-right font-mono text-xs leading-snug tracking-wide text-text-muted lg:block">
          {entry.dates}
        </p>

        <div className="timeline-rail" aria-hidden="true">
          <span className="timeline-node" />
        </div>

        <div className="timeline-content min-w-0">
          <header>
            <h3
              id={`${entry.id}-title`}
              className="font-heading text-xl font-medium tracking-tight text-text sm:text-[1.35rem]"
            >
              {entry.degree}
            </h3>
            <p className="mt-1 text-[0.95rem] text-text/85 sm:text-base">
              {entry.institution}
            </p>
            <p className="mt-1.5 font-mono text-xs tracking-wide text-text-muted">
              <span className="lg:hidden">{entry.dates}</span>
              <span className="mx-2 lg:hidden" aria-hidden="true">
                ·
              </span>
              <span>{entry.location}</span>
            </p>
          </header>

          {details.length > 0 ? (
            <ul className="timeline-bullets mt-5 max-w-2xl space-y-2.5">
              {details.map((detail, index) => (
                <li
                  key={`${entry.id}-detail-${index}`}
                  className="text-[0.95rem] leading-relaxed text-text"
                >
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    </li>
  );
}

function GateFeature({ achievement }: { achievement: AchievementEntry }) {
  return (
    <article
      aria-labelledby={`${achievement.id}-heading`}
      className="gate-feature mt-10 px-5 py-5 sm:mt-12 sm:px-8 sm:py-7"
    >
      <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-8 lg:gap-12">
        <div className="min-w-0">
          <h3
            id={`${achievement.id}-heading`}
            aria-label={`${achievement.subtitle} ${achievement.value}`}
            className="text-highlight"
          >
            <span className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase">
              {achievement.subtitle}
            </span>
            <span className="mt-2 block font-heading text-[clamp(2.75rem,14vw,5.25rem)] leading-none font-medium tracking-[-0.04em] tabular-nums">
              {achievement.value}
            </span>
          </h3>
        </div>

        <div className="min-w-0 sm:pt-1">
          <p className="font-heading text-lg font-medium tracking-tight text-text">
            {achievement.title}
          </p>
          <p className="mt-1.5 font-mono text-xs tracking-wide text-text-muted">
            {achievement.year}
          </p>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-text">
            All-India Rank {achievement.value}. {achievement.description}
          </p>
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
      className="relative px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionReveal>
          <header className="mb-10 sm:mb-12">
            <SectionKicker index="§03" label="Education" />
            <h2
              id="education-heading"
              className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
            >
              Education & Achievements
            </h2>
          </header>

          <ol className="m-0 list-none p-0">
            {education.map((entry) => (
              <EducationItem key={entry.id} entry={entry} />
            ))}
          </ol>
        </SectionReveal>

        {featuredAchievements.map((achievement) => (
          <SectionReveal key={achievement.id} delay={0.1}>
            <GateFeature achievement={achievement} />
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

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
          {entry.dates}
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span>{entry.location}</span>
        </p>

        {details.length > 0 ? (
          <ul className="mt-3 max-w-2xl space-y-2">
            {details.map((detail, index) => (
              <li
                key={`${entry.id}-detail-${index}`}
                className="text-[0.95rem] leading-[1.7] text-text"
              >
                {detail}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </li>
  );
}

function GateFeature({ achievement }: { achievement: AchievementEntry }) {
  return (
    <article
      aria-labelledby={`${achievement.id}-heading`}
      className="gate-feature mt-10 px-5 py-5 sm:mt-12 sm:px-7 sm:py-6"
    >
      <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-8 lg:gap-10">
        <div className="min-w-0">
          <h3
            id={`${achievement.id}-heading`}
            aria-label={`${achievement.subtitle} ${achievement.value}`}
            className="text-highlight"
          >
            <span className="block font-mono text-[0.72rem] tracking-[0.14em] uppercase">
              {achievement.subtitle}
            </span>
            <span className="mt-1.5 block font-heading text-[clamp(2.5rem,9vw,4.35rem)] leading-none font-medium tracking-[-0.03em] tabular-nums">
              {achievement.value}
            </span>
          </h3>
        </div>

        <div className="min-w-0 sm:pt-1">
          <p className="font-heading text-lg font-medium tracking-[-0.02em] text-text">
            {achievement.title}
          </p>
          <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
            {achievement.year}
          </p>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-[1.7] text-text">
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
      className="relative px-4 pt-12 pb-14 sm:px-6 sm:pt-14 sm:pb-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <SectionReveal>
          <header className="mb-5 sm:mb-6">
            <SectionKicker index="§03" label="Education" />
            <h2
              id="education-heading"
              className="mt-2.5 font-heading text-2xl font-medium tracking-[-0.02em] text-text sm:text-[1.75rem]"
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

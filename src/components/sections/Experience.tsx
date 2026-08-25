import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { TechLegend } from "@/components/layout/TechLegend";
import { experience, type ExperienceEntry } from "@/data/experience";

function ExperienceRole({ entry }: { entry: ExperienceEntry }) {
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
              {entry.title}
            </h3>
            <p className="mt-0.5 text-[0.95rem] text-text/85 sm:text-base">
              {entry.company}
            </p>
            <p className="mt-1 font-mono text-xs tracking-wide text-text-muted">
              <span className="lg:hidden">{entry.dates}</span>
              <span className="mx-2 lg:hidden" aria-hidden="true">
                ·
              </span>
              <span>{entry.location}</span>
            </p>
          </header>

          <ul className="timeline-bullets mt-3.5 max-w-2xl space-y-2">
            {entry.bullets.map((bullet, index) => (
              <li
                key={`${entry.id}-bullet-${index}`}
                className="text-[0.95rem] leading-relaxed text-text"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <TechLegend labels={entry.tech} className="mt-3.5" />
        </div>
      </article>
    </li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative px-4 pt-14 pb-12 sm:px-6 sm:pt-16 sm:pb-14"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <header className="mb-6 sm:mb-7">
          <SectionKicker index="§02" label="Experience" />
          <h2
            id="experience-heading"
            className="mt-2.5 font-heading text-2xl font-medium tracking-tight text-text sm:text-[1.75rem]"
          >
            Work Experience
          </h2>
        </header>

        <ol className="m-0 list-none p-0">
          {experience.map((entry) => (
            <ExperienceRole key={entry.id} entry={entry} />
          ))}
        </ol>
      </SectionReveal>
    </section>
  );
}

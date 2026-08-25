import { experience, type ExperienceEntry } from "@/data/experience";

function TechTags({ labels }: { labels: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
      {labels.map((label, index) => (
        <li key={`${label}-${index}`}>
          <span className="inline-flex max-w-full items-center rounded-sm border border-surface-2 px-2 py-[0.28rem] font-mono text-[0.65rem] leading-none tracking-wide text-text-muted">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceRole({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className="experience-entry">
      <article
        aria-labelledby={`${entry.id}-title`}
        className="grid grid-cols-[0.7rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-[6.75rem_0.85rem_minmax(0,1fr)] lg:gap-x-5"
      >
        <p className="hidden pt-[0.4rem] text-right font-mono text-xs leading-snug tracking-wide text-text-muted lg:block">
          {entry.dates}
        </p>

        <div className="experience-rail" aria-hidden="true">
          <span className="experience-node" />
        </div>

        <div className="experience-content min-w-0">
          <header>
            <h3
              id={`${entry.id}-title`}
              className="font-heading text-xl font-medium tracking-tight text-text sm:text-[1.35rem]"
            >
              {entry.title}
            </h3>
            <p className="mt-1 text-[0.95rem] text-text/85 sm:text-base">
              {entry.company}
            </p>
            <p className="mt-1.5 font-mono text-xs tracking-wide text-text-muted">
              <span className="lg:hidden">{entry.dates}</span>
              <span className="mx-2 lg:hidden" aria-hidden="true">
                ·
              </span>
              <span>{entry.location}</span>
            </p>
          </header>

          <ul className="experience-bullets mt-5 max-w-2xl space-y-2.5">
            {entry.bullets.map((bullet, index) => (
              <li
                key={`${entry.id}-bullet-${index}`}
                className="text-[0.95rem] leading-relaxed text-text"
              >
                {bullet}
              </li>
            ))}
          </ul>

          <TechTags labels={entry.tech} />
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
      className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-10 sm:mb-12">
          <p className="font-mono text-[0.65rem] tracking-[0.22em] text-text-muted uppercase">
            §02 · Experience
          </p>
          <h2
            id="experience-heading"
            className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
          >
            Work Experience
          </h2>
        </header>

        <ol className="m-0 list-none p-0">
          {experience.map((entry) => (
            <ExperienceRole key={entry.id} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}

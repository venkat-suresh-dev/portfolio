import { ArrowUpRight, FolderGit2 } from "lucide-react";

import { GlowCard } from "@/components/layout/GlowCard";
import { CoordinateMotif } from "@/components/layout/CoordinateMotif";
import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const projectLinkClassName = cn(
  "group inline-flex min-h-11 items-center gap-1.5 rounded-sm",
  "font-mono text-xs tracking-wide text-text-muted",
  "transition-colors duration-200 hover:text-accent",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "motion-reduce:transition-none"
);

const outboundIconClassName = cn(
  "outbound-icon size-3.5 shrink-0 transition-transform duration-200 ease-out",
  "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  "motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
);

function TechTags({
  labels,
  className,
}: {
  labels: string[];
  className?: string;
}) {
  return (
    <ul
      className={cn("flex flex-wrap gap-1.5", className)}
      aria-label="Technologies"
    >
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

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-4">
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Repository for ${project.title}`}
        className={projectLinkClassName}
      >
        <FolderGit2 aria-hidden="true" className="size-3.5 shrink-0" />
        Repository
      </a>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live demo of ${project.title}`}
          className={projectLinkClassName}
        >
          <ArrowUpRight aria-hidden="true" className={outboundIconClassName} />
          Live demo
        </a>
      ) : null}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isFeatured = Boolean(project.featured);
  const marker = String(index + 1).padStart(2, "0");
  const titleId = `${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className="h-full min-w-0">
      <GlowCard
        className={cn(
          "relative flex h-full min-w-0 flex-col",
          isFeatured && "project-featured rounded-sm px-5 py-5 sm:px-6 sm:py-5"
        )}
      >
        {isFeatured ? (
          <span
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-0 w-0.5 bg-accent/70 sm:top-5 sm:bottom-5"
          />
        ) : null}

        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col",
            isFeatured &&
              "lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(13rem,0.8fr)] lg:items-stretch lg:gap-10"
          )}
        >
          <header className="min-w-0">
            <p className="font-mono text-[0.65rem] tracking-[0.22em] text-text-muted uppercase">
              {isFeatured ? `${marker} · Featured` : marker}
            </p>
            {isFeatured ? (
              <CoordinateMotif className="mt-2 h-4 w-48" variant="project" />
            ) : null}
            <h3
              id={titleId}
              className={cn(
                "mt-2.5 font-heading font-medium tracking-tight text-text",
                isFeatured
                  ? "text-xl sm:text-[1.45rem]"
                  : "text-lg sm:text-[1.25rem]"
              )}
            >
              {project.title}
            </h3>
            <p
              className={cn(
                "mt-2.5 text-[0.95rem] leading-relaxed text-text",
                isFeatured ? "max-w-xl" : "max-w-prose"
              )}
            >
              {project.description}
            </p>
          </header>

          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col",
              isFeatured ? "mt-4 lg:mt-0" : "mt-4"
            )}
          >
            <TechTags
              labels={project.tech}
              className={isFeatured ? "lg:pt-1" : undefined}
            />
            <ProjectLinks project={project} />
          </div>
        </div>
      </GlowCard>
    </article>
  );
}

export function Projects() {
  const ordered = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative px-4 pt-14 pb-14 sm:px-6 sm:pt-16 sm:pb-16"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <header className="mb-8 sm:mb-9">
          <SectionKicker index="§04" label="Projects" />
          <h2
            id="projects-heading"
            className="mt-2.5 font-heading text-2xl font-medium tracking-tight text-text sm:text-[1.75rem]"
          >
            Projects
          </h2>
          <CoordinateMotif className="mt-4 h-5 w-full max-w-md" />
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2 md:gap-4">
          {ordered.map((project, index) => (
            <li
              key={project.id}
              className={cn("min-w-0", project.featured && "md:col-span-2")}
            >
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  );
}

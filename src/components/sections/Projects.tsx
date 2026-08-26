import { ArrowUpRight, FolderGit2 } from "lucide-react";

import { CoordinateMotif } from "@/components/layout/CoordinateMotif";
import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { TechLegend } from "@/components/layout/TechLegend";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const projectLinkClassName = "legend-link min-h-11";

const outboundIconClassName = "outbound-icon size-3.5 shrink-0";

function ProjectLinks({
  project,
  stacked = false,
}: {
  project: Project;
  stacked?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex",
        stacked
          ? "flex-col items-start gap-0"
          : "mt-auto flex-wrap items-center gap-x-5 gap-y-0 pt-3"
      )}
    >
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

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const marker = String(index + 1).padStart(2, "0");
  const titleId = `${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className="project-featured">
      <div className="grid gap-6 lg:grid-cols-[minmax(9.5rem,0.85fr)_minmax(0,1.45fr)_minmax(11rem,0.8fr)] lg:items-start lg:gap-x-10 lg:gap-y-0">
        <header className="min-w-0">
          <p className="project-index" aria-hidden="true">
            {marker}
          </p>
          <h3
            id={titleId}
            className="mt-3 font-heading text-[1.35rem] font-medium tracking-tight text-text sm:text-[1.65rem]"
          >
            {project.title}
          </h3>
        </header>

        <p className="max-w-xl text-[0.95rem] leading-[1.7] text-text lg:pt-1">
          {project.description}
        </p>

        <aside className="flex min-w-0 flex-col gap-4 lg:pt-1" aria-label="Project details">
          <TechLegend labels={project.tech} />
          <ProjectLinks project={project} stacked />
        </aside>
      </div>
    </article>
  );
}

function SecondaryProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const marker = String(index + 1).padStart(2, "0");
  const titleId = `${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className="project-secondary">
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
        {marker}
      </p>
      <h3
        id={titleId}
        className="mt-2 font-heading text-[1.125rem] font-medium tracking-[-0.02em] text-text sm:text-[1.2rem]"
      >
        {project.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-[1.7] text-text">
        {project.description}
      </p>
      <TechLegend labels={project.tech} className="mt-3" />
      <ProjectLinks project={project} />
    </article>
  );
}

function secondaryGridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 3) return "grid-cols-1 lg:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2";
}

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);
  const featuredCount = featured.length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative px-4 pt-12 pb-12 sm:px-6 sm:pt-14 sm:pb-14"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <header className="mb-6 sm:mb-7">
          <SectionKicker index="§04" label="Projects" />
          <h2
            id="projects-heading"
            className="mt-3 font-heading text-2xl font-medium tracking-[-0.022em] text-text sm:text-[1.85rem]"
          >
            Projects
          </h2>
          <CoordinateMotif className="mt-3.5 h-5 w-full max-w-md" />
        </header>

        <div className="flex flex-col gap-6">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
            />
          ))}

          {secondary.length > 0 ? (
            <ul
              className={cn(
                "m-0 grid list-none gap-3 p-0",
                secondaryGridClass(secondary.length)
              )}
            >
              {secondary.map((project, index) => (
                <li key={project.id} className="min-w-0">
                  <SecondaryProject
                    project={project}
                    index={featuredCount + index}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </SectionReveal>
    </section>
  );
}

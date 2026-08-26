import { ArrowUpRight, FolderGit2 } from "lucide-react";

import { SectionHeader } from "@/components/layout/SectionHeader";
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
  if (!project.repositoryUrl && !project.demoUrl) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex",
        stacked
          ? "flex-col items-start gap-0"
          : "mt-auto flex-wrap items-center gap-x-5 gap-y-0 pt-3"
      )}
    >
      {project.repositoryUrl ? (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Repository for ${project.title}`}
          className={projectLinkClassName}
        >
          <FolderGit2 aria-hidden="true" className="size-3.5 shrink-0" />
          Repository
        </a>
      ) : null}
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
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
  const marker = `PRJ-${String(index + 1).padStart(2, "0")}`;
  const titleId = `${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className="project-featured">
      <div className="page-grid items-start gap-y-6">
        <header className="col-span-4 md:col-span-3 lg:col-span-3">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
            {marker}
          </p>
          <h3
            id={titleId}
            className="mt-3 text-[1.35rem] font-medium tracking-tight text-text sm:text-[1.65rem]"
          >
            {project.title}
          </h3>
        </header>

        <p className="col-span-4 max-w-xl text-[0.95rem] leading-[1.7] text-text md:col-span-5 lg:col-span-6">
          {project.summary}
        </p>

        <aside
          className="col-span-4 flex min-w-0 flex-col gap-4 md:col-span-8 lg:col-span-3"
          aria-label="Project details"
        >
          <TechLegend labels={project.technologies} />
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
  const marker = `PRJ-${String(index + 1).padStart(2, "0")}`;
  const titleId = `${project.id}-title`;

  return (
    <article aria-labelledby={titleId} className="project-secondary">
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
        {marker}
      </p>
      <h3
        id={titleId}
        className="mt-2 text-[1.125rem] font-medium tracking-[-0.02em] text-text sm:text-[1.2rem]"
      >
        {project.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-[1.7] text-text">
        {project.summary}
      </p>
      <TechLegend labels={project.technologies} className="mt-3" />
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
  if (projects.length === 0) {
    return null;
  }

  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);
  const featuredCount = featured.length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="page-section"
    >
      <div className="page-shell">
        <SectionHeader
          index="§04"
          title="Projects"
          headingId="projects-heading"
        />

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
      </div>
    </section>
  );
}

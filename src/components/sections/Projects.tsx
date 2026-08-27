import Link from "next/link";

import { FigureFrame } from "@/components/layout/FigureFrame";
import {
  PrototypeControl,
  PrototypeMark,
} from "@/components/layout/PrototypeControl";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TechLegend } from "@/components/layout/TechLegend";
import {
  resolvedProjects,
  SHOW_PROTOTYPE_CONTENT,
} from "@/data/resolved";
import type { Project } from "@/data/projects";

function projectDocId(project: Project, index: number) {
  return project.docId ?? `PRJ-${String(index + 1).padStart(2, "0")}`;
}

function figureIdFor(index: number) {
  return `FIG. ${String(index + 1).padStart(2, "0")}`;
}

function ProjectAction({
  href,
  label,
  external = false,
}: {
  href?: string;
  label: string;
  external?: boolean;
}) {
  if (href) {
    const className = "legend-link min-h-11";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {label}
          <span aria-hidden="true" className="text-control-glyph">
            ↗
          </span>
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={className}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {label}
        <span aria-hidden="true" className="text-control-glyph">
          ↗
        </span>
      </a>
    );
  }

  return (
    <PrototypeControl label={label} className="legend-link min-h-11">
      {label}
      <span aria-hidden="true" className="text-control-glyph">
        ↗
      </span>
    </PrototypeControl>
  );
}

function ProjectActions({ project }: { project: Project }) {
  const caseStudyHref = project.caseStudy
    ? `/projects/${project.slug}`
    : undefined;

  return (
    <div className="project-actions">
      <ProjectAction href={caseStudyHref} label="Case study" />
      <ProjectAction
        href={project.repositoryUrl}
        label="Repository"
        external
      />
      <ProjectAction href={project.demoUrl} label="Live" external />
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
  const marker = projectDocId(project, index);
  const titleId = `${project.id}-title`;
  const figureId = figureIdFor(index);

  return (
    <article
      aria-labelledby={titleId}
      className="project-featured"
      data-doc-id={marker}
    >
      <div className="page-grid items-start gap-y-8">
        <header className="col-span-4 md:col-span-3 xl:col-span-3">
          <p className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
            <span>{marker}</span>
            {project.prototype ? <PrototypeMark /> : null}
          </p>
          <h3
            id={titleId}
            className="mt-3 text-[1.5rem] font-medium tracking-tight text-text sm:text-[1.85rem]"
          >
            {project.title}
          </h3>
          {project.role ? (
            <p className="placeholder-copy mt-3 font-mono text-[0.75rem] tracking-[0.08em]">
              {project.role}
            </p>
          ) : null}
        </header>

        <div className="col-span-4 md:col-span-5 xl:col-span-5">
          <p className="placeholder-copy max-w-xl text-[0.95rem] leading-[1.7]">
            {project.summary}
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary uppercase">
            {project.statusLabel ?? project.status}
          </p>
          <TechLegend labels={project.technologies} className="mt-4" />
          <ProjectActions project={project} />
        </div>

        <div className="col-span-4 md:col-span-8 xl:col-span-12">
          <FigureFrame
            figureId={figureId}
            kind="PROJECT EVIDENCE"
            mediaMeta="16∶9 · CROP"
            caption="[PLACEHOLDER] Featured project figure"
            label={"[PLACEHOLDER]\nREAL PROJECT IMAGE"}
            featured
          />
        </div>
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
  const marker = projectDocId(project, index);
  const titleId = `${project.id}-title`;
  const figureId = figureIdFor(index);

  return (
    <article
      aria-labelledby={titleId}
      className="project-index-item"
      data-doc-id={marker}
    >
      <FigureFrame
        figureId={figureId}
        kind="PROJECT EVIDENCE"
        mediaMeta="16∶11 · CROP"
        caption="[PLACEHOLDER] Project figure"
        label={"[PLACEHOLDER]\nREAL PROJECT IMAGE"}
      />
      <div className="project-index-copy min-w-0">
        <p className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
          <span>{marker}</span>
          {project.prototype ? <PrototypeMark /> : null}
        </p>
        <h3
          id={titleId}
          className="mt-2 text-[1.2rem] font-medium tracking-[-0.02em] text-text sm:text-[1.3125rem]"
        >
          {project.title}
        </h3>
        <p className="placeholder-copy mt-2 text-[0.95rem] leading-[1.7]">
          {project.summary}
        </p>
        <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary uppercase">
          {project.statusLabel ?? project.status}
        </p>
        <TechLegend labels={project.technologies} className="mt-3" />
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  if (resolvedProjects.length === 0) {
    return null;
  }

  const featured = resolvedProjects.filter((project) => project.featured);
  const secondary = resolvedProjects.filter((project) => !project.featured);
  const featuredCount = featured.length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="page-section page-section--projects"
    >
      <div className="page-shell">
        <SectionHeader
          index="§04"
          title="Projects"
          headingId="projects-heading"
        />
        {SHOW_PROTOTYPE_CONTENT ? (
          <p className="mb-8 max-w-xl font-mono text-[0.75rem] tracking-[0.08em] text-text-muted">
            PROTOTYPE · Index fixtures for the final project system. Not
            production evidence.
          </p>
        ) : null}

        <ScrollReveal>
          <div className="project-stage">
            {featured.map((project, index) => (
              <FeaturedProject
                key={project.id}
                project={project}
                index={index}
              />
            ))}

            {secondary.length > 0 ? (
              <ul className="project-index">
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
        </ScrollReveal>
      </div>
    </section>
  );
}

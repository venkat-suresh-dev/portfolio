import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FigureFrame } from "@/components/layout/FigureFrame";
import {
  PrototypeControl,
  PrototypeMark,
} from "@/components/layout/PrototypeControl";
import { TechLegend } from "@/components/layout/TechLegend";
import { getProjectBySlug, resolvedProjects } from "@/data/resolved";

const CASE_STUDY_SECTIONS = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["context", "Context"],
  ["approach", "Approach"],
  ["architecture", "Architecture"],
  ["implementation", "Implementation"],
  ["evaluation", "Evaluation"],
  ["results", "Results"],
  ["limitations", "Limitations"],
  ["learnings", "Learnings"],
] as const;

type CaseStudyKey = (typeof CASE_STUDY_SECTIONS)[number][0];

export function generateStaticParams() {
  return resolvedProjects
    .filter((project) => project.caseStudy)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Prototype case study" };
  }
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const caseStudy = project.caseStudy;
  const docId = project.docId ?? "PRJ-01";
  const figures = caseStudy.figures ?? [];
  const architectureFigure = figures[0];
  const evaluationFigure = figures[1];

  return (
    <main id="content" tabIndex={-1} className="page-section">
      <article className="page-shell">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
          <Link href="/#projects" className="legend-link min-h-11">
            ← Projects
          </Link>
        </p>

        <header className="mt-8 max-w-3xl">
          <p className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted">
            <span>{docId}</span>
            {project.prototype ? <PrototypeMark /> : null}
          </p>
          <h1 className="mt-4 text-[2rem] font-medium tracking-[-0.03em] text-text sm:text-[2.75rem]">
            {project.title}
          </h1>
          <p className="placeholder-copy mt-4 max-w-[62ch] text-[1.0625rem] leading-[1.65]">
            {project.summary}
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary uppercase">
            {project.statusLabel ?? project.status}
            {project.role ? ` · ${project.role}` : null}
          </p>
          <TechLegend labels={project.technologies} className="mt-4" />
        </header>

        <div className="mt-14">
          {CASE_STUDY_SECTIONS.map(([key, heading]) => {
            const body = caseStudy[key as CaseStudyKey];
            if (!body) return null;

            return (
              <section
                key={key}
                className="case-study-block"
                aria-labelledby={`case-${key}`}
              >
                <h2 id={`case-${key}`}>{heading}</h2>
                <p className="placeholder-copy">{body}</p>

                {key === "architecture" && architectureFigure ? (
                  <div className="mt-8 max-w-3xl">
                    <FigureFrame
                      figureId={architectureFigure.id}
                      caption={architectureFigure.caption}
                      label="[PLACEHOLDER] Architecture figure"
                      interactive={false}
                    />
                  </div>
                ) : null}

                {key === "evaluation" && evaluationFigure ? (
                  <div className="mt-8 max-w-3xl">
                    <FigureFrame
                      figureId={evaluationFigure.id}
                      caption={evaluationFigure.caption}
                      label="[PLACEHOLDER] Evaluation figure"
                      interactive={false}
                    />
                  </div>
                ) : null}
              </section>
            );
          })}

          <section className="case-study-block" aria-labelledby="case-links">
            <h2 id="case-links">Links</h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-5">
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legend-link min-h-11"
                >
                  Repository
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <PrototypeControl
                  label="Repository"
                  className="legend-link min-h-11"
                >
                  Repository
                  <span aria-hidden="true">↗</span>
                </PrototypeControl>
              )}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legend-link min-h-11"
                >
                  Live
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <PrototypeControl label="Live" className="legend-link min-h-11">
                  Live
                  <span aria-hidden="true">↗</span>
                </PrototypeControl>
              )}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}

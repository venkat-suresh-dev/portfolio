import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InViewOnce } from "@/components/layout/InViewOnce";
import { PrototypeMark } from "@/components/layout/PrototypeControl";
import { TechLegend } from "@/components/layout/TechLegend";
import { CaseStudyIndex } from "@/components/projects/CaseStudyIndex";
import { EvidenceFigure } from "@/components/projects/EvidenceFigure";
import { ProjectActions } from "@/components/projects/ProjectActions";
import { getProjectBySlug, resolvedProjects } from "@/data/resolved";
import {
  projectDocId,
  projectEvidenceByIds,
  projectStatusLabel,
  splitProjectTitle,
} from "@/lib/projects";

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
  const docId = projectDocId(project, 0);
  const status = projectStatusLabel(project);
  const { placeholder, text } = splitProjectTitle(project.title);
  const coverFigure = project.evidence?.[0];

  return (
    <main id="content" tabIndex={-1} className="page-section case-study-page">
      <article className="page-shell case-study-document">
        <p className="case-study-back">
          <Link href="/#projects" className="project-action project-action--secondary">
            ← Projects
          </Link>
        </p>

        <header className="case-study-cover">
          <p className="case-study-cover-kicker">
            <span>{docId}</span>
            <span>Technical report</span>
            {project.prototype ? <PrototypeMark /> : null}
          </p>
          <p className="case-study-cover-status">{status}</p>
          <h1 className="case-study-cover-title">
            {placeholder ? (
              <>
                <span className="project-title-placeholder">{placeholder}</span>
                <span className="project-title-text">{text}</span>
              </>
            ) : (
              project.title
            )}
          </h1>
          <p className="case-study-cover-thesis placeholder-copy">
            {project.summary}
          </p>
          <dl className="case-study-cover-meta">
            {project.role ? (
              <div className="project-meta-field">
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            ) : null}
            <div className="project-meta-field">
              <dt>Status</dt>
              <dd>{status}</dd>
            </div>
            {project.year ? (
              <div className="project-meta-field">
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            ) : null}
            <div className="project-meta-field project-meta-field--stack">
              <dt>Stack</dt>
              <dd>
                <TechLegend labels={project.technologies} />
              </dd>
            </div>
          </dl>
          <ProjectActions project={project} showCaseStudy={false} />
        </header>

        {coverFigure ? (
          <InViewOnce className="case-study-cover-figure" amount={0.18}>
            <EvidenceFigure figure={coverFigure} featured />
          </InViewOnce>
        ) : null}

        <CaseStudyIndex sections={caseStudy.sections} />

        <div className="case-study-body">
          {caseStudy.sections.map((section) => {
            const figures = projectEvidenceByIds(project, section.figureIds);

            return (
              <section
                key={section.id}
                id={`case-${section.id}`}
                className="case-study-block"
                aria-labelledby={`case-heading-${section.id}`}
              >
                <h2 id={`case-heading-${section.id}`}>
                  <span>{section.index}</span>
                  {section.heading}
                </h2>
                <p className="placeholder-copy">{section.body}</p>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="placeholder-copy">
                    {paragraph}
                  </p>
                ))}
                {figures.map((figure) => (
                  <EvidenceFigure
                    key={`${section.id}-${figure.id}`}
                    figure={figure}
                    className="case-study-block-figure"
                  />
                ))}
              </section>
            );
          })}
        </div>
      </article>
    </main>
  );
}

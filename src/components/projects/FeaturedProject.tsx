import { InViewOnce } from "@/components/layout/InViewOnce";
import { PrototypeMark } from "@/components/layout/PrototypeControl";
import { TechLegend } from "@/components/layout/TechLegend";
import { EvidencePlane } from "@/components/projects/EvidencePlane";
import { ProjectActions } from "@/components/projects/ProjectActions";
import type { Project } from "@/data/projects";
import {
  projectDocId,
  projectFolio,
  projectStatusLabel,
  splitProjectTitle,
} from "@/lib/projects";

export function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const marker = projectDocId(project, index);
  const folio = projectFolio(project, index);
  const titleId = `${project.id}-title`;
  const { placeholder, text } = splitProjectTitle(project.title);
  const evidence = project.evidence ?? [];
  const status = projectStatusLabel(project);

  return (
    <InViewOnce
      as="article"
      className="project-featured"
      aria-labelledby={titleId}
      data-doc-id={marker}
      amount={0.16}
      simplifyOnMobile
    >
      <div className="project-featured-spread">
        <div className="project-featured-identity">
          <p className="project-folio" aria-hidden="true">
            {folio}
          </p>
          <header className="project-featured-heading">
            <p className="project-featured-kicker">
              <span>{marker}</span>
              {project.prototype ? <PrototypeMark /> : null}
            </p>
            <h3 id={titleId} className="project-featured-title">
              {placeholder ? (
                <>
                  <span className="project-title-placeholder">
                    {placeholder}
                  </span>
                  <span className="project-title-text">{text}</span>
                </>
              ) : (
                project.title
              )}
            </h3>
          </header>
          <p className="project-featured-summary placeholder-copy">
            {project.summary}
          </p>
          <dl className="project-featured-metadata">
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
          {project.resultSummary ? (
            <p className="project-featured-result placeholder-copy">
              <span className="project-meta-kicker">Result</span>
              {project.resultSummary}
            </p>
          ) : null}
          <ProjectActions project={project} />
        </div>

        <div className="project-featured-evidence">
          {evidence.length > 0 ? (
            <EvidencePlane figures={evidence} featured />
          ) : null}
        </div>
      </div>
    </InViewOnce>
  );
}

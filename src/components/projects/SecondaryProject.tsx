import { InViewOnce } from "@/components/layout/InViewOnce";
import { PrototypeMark } from "@/components/layout/PrototypeControl";
import { TechLegend } from "@/components/layout/TechLegend";
import { EvidenceFigure } from "@/components/projects/EvidenceFigure";
import { ProjectActions } from "@/components/projects/ProjectActions";
import type { Project } from "@/data/projects";
import {
  projectDocId,
  projectFolio,
  projectStatusLabel,
  splitProjectTitle,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

export function SecondaryProject({
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
  const figure = project.evidence?.[0];
  const status = projectStatusLabel(project);
  const composition = project.composition === "text" ? "text" : "media";

  return (
    <InViewOnce
      as="article"
      className={cn(
        "project-secondary",
        `project-secondary--${composition}`
      )}
      aria-labelledby={titleId}
      data-doc-id={marker}
      simplifyOnMobile
    >
      <div className="project-secondary-copy">
        <p className="project-secondary-kicker">
          <span className="project-folio project-folio--index" aria-hidden="true">
            {folio}
          </span>
          <span>{marker}</span>
          {project.prototype ? <PrototypeMark /> : null}
        </p>
        <h3 id={titleId} className="project-secondary-title">
          {placeholder ? (
            <>
              <span className="project-title-placeholder">{placeholder}</span>
              <span className="project-title-text">{text}</span>
            </>
          ) : (
            project.title
          )}
        </h3>
        <p className="placeholder-copy project-secondary-summary">
          {project.summary}
        </p>
        <p className="project-secondary-status">{status}</p>
        <TechLegend labels={project.technologies} className="mt-3" />
        <ProjectActions project={project} />
      </div>
      {figure ? (
        <div className="project-secondary-figure">
          <EvidenceFigure figure={figure} />
        </div>
      ) : null}
    </InViewOnce>
  );
}

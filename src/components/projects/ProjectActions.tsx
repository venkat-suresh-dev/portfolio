import Link from "next/link";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function ActionGlyph({
  external,
  disabled,
}: {
  external?: boolean;
  disabled?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "project-action-glyph",
        disabled && "project-action-glyph--muted"
      )}
    >
      {external ? "↗" : "→"}
    </span>
  );
}

function DisabledAction({
  label,
  external,
  className,
}: {
  label: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled
      aria-label={`${label} — prototype control, destination not available`}
      className={cn("project-action project-action--disabled", className)}
    >
      {label}
      <ActionGlyph external={external} disabled />
    </button>
  );
}

function LiveAction({
  href,
  label,
  external,
  primary,
}: {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
}) {
  const className = cn(
    "project-action",
    primary ? "project-action--primary" : "project-action--secondary"
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
        <ActionGlyph />
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      <ActionGlyph external={external} />
    </a>
  );
}

export function ProjectActions({
  project,
  className,
  showCaseStudy = true,
}: {
  project: Project;
  className?: string;
  showCaseStudy?: boolean;
}) {
  const caseStudyHref = project.caseStudy
    ? `/projects/${project.slug}`
    : undefined;

  return (
    <div className={cn("project-actions", className)}>
      {showCaseStudy ? (
        caseStudyHref ? (
          <LiveAction href={caseStudyHref} label="Case study" primary />
        ) : (
          <DisabledAction
            label="Case study"
            className="project-action--primary"
          />
        )
      ) : null}
      {project.repositoryUrl ? (
        <LiveAction
          href={project.repositoryUrl}
          label="Repository"
          external
        />
      ) : (
        <DisabledAction label="Repository" external />
      )}
      {project.demoUrl ? (
        <LiveAction href={project.demoUrl} label="Live" external />
      ) : (
        <DisabledAction label="Live" external />
      )}
    </div>
  );
}

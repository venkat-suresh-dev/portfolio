export type ProjectStatus = "in-progress" | "private" | "completed";

export type ProjectFigure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectCaseStudy = {
  problem?: string;
  context?: string;
  approach?: string;
  architecture?: string;
  implementation?: string;
  evaluation?: string;
  results?: string;
  limitations?: string;
  learnings?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  technologies: readonly string[];
  role?: string;
  tags?: readonly string[];
  repositoryUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  figures?: readonly ProjectFigure[];
  caseStudy?: ProjectCaseStudy;
  claims?: readonly string[];
};

/** Empty until verified portfolio projects are supplied. */
export const projects: readonly Project[] = [];

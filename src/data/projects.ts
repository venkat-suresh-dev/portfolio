export type Metric = {
  label: string;
  value: string;
};

export type ProjectStatus =
  | "prototype"
  | "live"
  | "in-progress"
  | "private"
  | "archived"
  | "case-study"
  | "completed";

export type ProjectReadiness = "not-ready" | "prototype" | "ready";

export type ProjectComposition = "featured" | "media" | "text";

export type ProjectEvidenceMode =
  | "architecture"
  | "metric-plot"
  | "evaluation"
  | "distribution"
  | "embedding"
  | "screenshot"
  | "placeholder";

export type ProjectFigureStatus = "prototype" | "synthetic" | "verified";

export type ProjectArchitectureStage = {
  id: string;
  label: string;
};

export type ProjectMetricPoint = {
  x: number;
  y: number;
  label?: string;
};

export type ProjectEvaluationMetric = {
  label: string;
  value: string;
};

export type ProjectConfusionMatrix = {
  actualPos: string;
  actualNeg: string;
  predPos: string;
  predNeg: string;
  tp: string;
  tn: string;
  fp: string;
  fn: string;
};

export type ProjectModelComparison = {
  model: string;
  score: number;
  display: string;
};

export type ProjectDistributionBin = {
  label: string;
  value: number;
};

export type ProjectDistributionPoint = {
  x: number;
  y: number;
};

export type ProjectEmbeddingPoint = {
  id: string;
  x: number;
  y: number;
  cluster?: string;
  label: string;
  meta?: string;
};

export type ProjectEmbeddingCluster = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type ProjectEvidenceFigure = {
  id: string;
  mode: ProjectEvidenceMode;
  title: string;
  selectorLabel: string;
  caption: string;
  source: string;
  stamp: string;
  alt: string;
  status: ProjectFigureStatus;
  statusLabel?: string;
  kind?: string;
  placeholderLabel?: string;
  media?: {
    src: string;
    width: number;
    height: number;
  };
  architecture?: {
    stages: readonly ProjectArchitectureStage[];
    animate?: boolean;
  };
  metric?: {
    points: readonly ProjectMetricPoint[];
    unit?: string;
    xLabel?: string;
    yLabel?: string;
    threshold?: number;
    thresholdLabel?: string;
  };
  evaluation?: {
    metrics?: readonly ProjectEvaluationMetric[];
    confusion?: ProjectConfusionMatrix;
    comparison?: readonly ProjectModelComparison[];
  };
  distribution?: {
    variant: "histogram" | "category" | "density" | "scatter";
    bins?: readonly ProjectDistributionBin[];
    points?: readonly ProjectDistributionPoint[];
    yLabel?: string;
  };
  embedding?: {
    points: readonly ProjectEmbeddingPoint[];
    clusters?: readonly ProjectEmbeddingCluster[];
  };
};

export type ProjectCaseStudySectionId =
  | "overview"
  | "problem"
  | "system"
  | "implementation"
  | "evidence"
  | "result"
  | "reflection";

export type ProjectCaseStudySection = {
  id: ProjectCaseStudySectionId;
  index: string;
  heading: string;
  body: string;
  paragraphs?: readonly string[];
  figureIds?: readonly string[];
};

export type ProjectCaseStudy = {
  sections: readonly ProjectCaseStudySection[];
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  statusLabel?: string;
  technologies: readonly string[];
  role?: string;
  year?: string;
  tags?: readonly string[];
  repositoryUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  composition?: ProjectComposition;
  resultSummary?: string;
  readiness?: ProjectReadiness;
  evidence?: readonly ProjectEvidenceFigure[];
  caseStudy?: ProjectCaseStudy;
  claims?: readonly string[];
  docId?: string;
  prototype?: boolean;
};

/** Empty until verified portfolio projects are supplied. */
export const projects: readonly Project[] = [];

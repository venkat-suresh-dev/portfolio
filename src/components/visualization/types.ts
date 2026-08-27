export type FigureStatus = "prototype" | "synthetic" | "verified";

export type ProjectFigureMeta = {
  figureId: string;
  caption: string;
  source?: string;
  kind?: string;
  status?: FigureStatus;
  statusLabel?: string;
  alt: string;
  chrome?: boolean;
};

export type ArchitectureStage = {
  id: string;
  label: string;
};

export type MetricPoint = {
  x: number;
  y: number;
  label?: string;
};

export type EvaluationMetric = {
  label: string;
  value: string;
};

export type ConfusionMatrix = {
  actualPos: string;
  actualNeg: string;
  predPos: string;
  predNeg: string;
  tp: string;
  tn: string;
  fp: string;
  fn: string;
};

export type ModelComparisonRow = {
  model: string;
  score: number;
  display: string;
};

export type DistributionBin = {
  label: string;
  value: number;
};

export type DistributionPoint = {
  x: number;
  y: number;
};

export type EmbeddingPoint = {
  id: string;
  x: number;
  y: number;
  cluster?: string;
  label: string;
  meta?: string;
};

export type EmbeddingCluster = {
  id: string;
  label: string;
  x: number;
  y: number;
};

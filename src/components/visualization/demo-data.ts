/**
 * Theme-preview / architecture specimens only.
 * Not project evidence. Not measured results.
 */
export const DEMO_NOTICE = "PROTOTYPE · SYNTHETIC DATA · NOT PROJECT EVIDENCE";

export const DEMO_ARCHITECTURE_STAGES = [
  { id: "client", label: "CLIENT" },
  { id: "api", label: "API" },
  { id: "service", label: "SERVICE" },
  { id: "cache", label: "CACHE" },
] as const;

export const DEMO_METRIC_POINTS = [
  { x: 0, y: 1 },
  { x: 4, y: 0.72 },
  { x: 8, y: 0.54 },
  { x: 12, y: 0.41 },
  { x: 16, y: 0.33 },
  { x: 20, y: 0.28 },
  { x: 24, y: 0.24 },
  { x: 28, y: 0.22 },
  { x: 32, y: 0.2 },
] as const;

export const DEMO_EVALUATION_METRICS = [
  { label: "F1", value: "0.80" },
  { label: "Precision", value: "0.78" },
  { label: "Recall", value: "0.82" },
  { label: "Balanced accuracy", value: "0.79" },
] as const;

export const DEMO_CONFUSION = {
  actualPos: "Actual +",
  actualNeg: "Actual −",
  predPos: "Pred +",
  predNeg: "Pred −",
  tp: "80",
  tn: "75",
  fp: "20",
  fn: "18",
} as const;

export const DEMO_MODEL_COMPARISON = [
  { model: "Model A", score: 0.8, display: "0.80" },
  { model: "Model B", score: 0.74, display: "0.74" },
  { model: "Model C", score: 0.61, display: "0.61" },
] as const;

export const DEMO_HISTOGRAM = [
  { label: "0", value: 4 },
  { label: "1", value: 9 },
  { label: "2", value: 14 },
  { label: "3", value: 11 },
  { label: "4", value: 7 },
  { label: "5", value: 3 },
] as const;

export const DEMO_CATEGORIES = [
  { label: "A", value: 42 },
  { label: "B", value: 28 },
  { label: "C", value: 18 },
  { label: "D", value: 12 },
] as const;

export const DEMO_DENSITY = [
  { x: 0, y: 0.08 },
  { x: 1, y: 0.18 },
  { x: 2, y: 0.36 },
  { x: 3, y: 0.52 },
  { x: 4, y: 0.4 },
  { x: 5, y: 0.22 },
  { x: 6, y: 0.1 },
] as const;

export const DEMO_SCATTER = [
  { x: 0.12, y: 0.22 },
  { x: 0.18, y: 0.31 },
  { x: 0.27, y: 0.19 },
  { x: 0.33, y: 0.38 },
  { x: 0.41, y: 0.28 },
  { x: 0.58, y: 0.62 },
  { x: 0.66, y: 0.54 },
  { x: 0.71, y: 0.7 },
  { x: 0.79, y: 0.58 },
  { x: 0.84, y: 0.73 },
] as const;

export const DEMO_EMBEDDING_CLUSTERS = [
  { id: "A", label: "Cluster A", x: 0.24, y: 0.32 },
  { id: "B", label: "Cluster B", x: 0.72, y: 0.28 },
  { id: "C", label: "Cluster C", x: 0.52, y: 0.72 },
] as const;

export const DEMO_EMBEDDING_POINTS = [
  { id: "a1", x: 0.18, y: 0.26, cluster: "A", label: "A1", meta: "Prototype sample" },
  { id: "a2", x: 0.24, y: 0.34, cluster: "A", label: "A2", meta: "Prototype sample" },
  { id: "a3", x: 0.3, y: 0.22, cluster: "A", label: "A3", meta: "Prototype sample" },
  { id: "a4", x: 0.22, y: 0.4, cluster: "A", label: "A4", meta: "Prototype sample" },
  { id: "b1", x: 0.66, y: 0.22, cluster: "B", label: "B1", meta: "Prototype sample" },
  { id: "b2", x: 0.74, y: 0.3, cluster: "B", label: "B2", meta: "Prototype sample" },
  { id: "b3", x: 0.8, y: 0.24, cluster: "B", label: "B3", meta: "Prototype sample" },
  { id: "b4", x: 0.7, y: 0.36, cluster: "B", label: "B4", meta: "Prototype sample" },
  { id: "c1", x: 0.46, y: 0.66, cluster: "C", label: "C1", meta: "Prototype sample" },
  { id: "c2", x: 0.54, y: 0.74, cluster: "C", label: "C2", meta: "Prototype sample" },
  { id: "c3", x: 0.58, y: 0.64, cluster: "C", label: "C3", meta: "Prototype sample" },
  { id: "c4", x: 0.48, y: 0.78, cluster: "C", label: "C4", meta: "Prototype sample" },
] as const;

import Image from "next/image";

import {
  ArchitectureFlow,
  DataDistribution,
  EmbeddingSpace,
  MetricPlot,
  ModelEvaluation,
} from "@/components/visualization";
import type { ProjectEvidenceFigure } from "@/data/projects";

function PlaceholderPlane({ figure }: { figure: ProjectEvidenceFigure }) {
  return (
    <p className="evidence-plane-label">
      {figure.placeholderLabel ?? "[PLACEHOLDER]\nEVIDENCE PLANE"}
    </p>
  );
}

export function ProjectEvidenceView({
  figure,
}: {
  figure: ProjectEvidenceFigure;
}) {
  if (figure.mode === "architecture" && figure.architecture) {
    return (
      <ArchitectureFlow
        figureId={figure.id}
        caption={figure.caption}
        source={figure.source}
        kind={figure.kind ?? "ARCHITECTURE FLOW"}
        status={figure.status}
        statusLabel={figure.statusLabel}
        alt={figure.alt}
        stages={figure.architecture.stages}
        animate={figure.architecture.animate ?? true}
        chrome={false}
      />
    );
  }

  if (figure.mode === "metric-plot" && figure.metric) {
    return (
      <MetricPlot
        figureId={figure.id}
        caption={figure.caption}
        source={figure.source}
        kind={figure.kind ?? "METRIC PLOT"}
        status={figure.status}
        statusLabel={figure.statusLabel}
        alt={figure.alt}
        points={figure.metric.points}
        unit={figure.metric.unit}
        xLabel={figure.metric.xLabel}
        yLabel={figure.metric.yLabel}
        threshold={figure.metric.threshold}
        thresholdLabel={figure.metric.thresholdLabel}
        chrome={false}
      />
    );
  }

  if (figure.mode === "evaluation" && figure.evaluation) {
    return (
      <ModelEvaluation
        figureId={figure.id}
        caption={figure.caption}
        source={figure.source}
        kind={figure.kind ?? "MODEL EVALUATION"}
        status={figure.status}
        statusLabel={figure.statusLabel}
        alt={figure.alt}
        metrics={figure.evaluation.metrics}
        confusion={figure.evaluation.confusion}
        comparison={figure.evaluation.comparison}
        chrome={false}
      />
    );
  }

  if (figure.mode === "distribution" && figure.distribution) {
    return (
      <DataDistribution
        figureId={figure.id}
        caption={figure.caption}
        source={figure.source}
        kind={figure.kind ?? "DATA DISTRIBUTION"}
        status={figure.status}
        statusLabel={figure.statusLabel}
        alt={figure.alt}
        variant={figure.distribution.variant}
        bins={figure.distribution.bins}
        points={figure.distribution.points}
        yLabel={figure.distribution.yLabel}
        chrome={false}
      />
    );
  }

  if (figure.mode === "embedding" && figure.embedding) {
    return (
      <EmbeddingSpace
        figureId={figure.id}
        caption={figure.caption}
        source={figure.source}
        kind={figure.kind ?? "EMBEDDING / VECTOR SPACE"}
        status={figure.status}
        statusLabel={figure.statusLabel}
        alt={figure.alt}
        points={figure.embedding.points}
        clusters={figure.embedding.clusters}
        chrome={false}
      />
    );
  }

  if (figure.mode === "screenshot" && figure.media) {
    return (
      <Image
        src={figure.media.src}
        alt={figure.alt}
        width={figure.media.width}
        height={figure.media.height}
        className="evidence-plane-image"
        sizes="(min-width: 1280px) 52rem, 100vw"
      />
    );
  }

  return <PlaceholderPlane figure={figure} />;
}

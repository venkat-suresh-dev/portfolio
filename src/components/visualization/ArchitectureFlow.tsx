"use client";

import type { CSSProperties } from "react";

import { InViewOnce } from "@/components/layout/InViewOnce";
import { ProjectFigure } from "./ProjectFigure";
import type { ArchitectureStage, ProjectFigureMeta } from "./types";

export function ArchitectureFlow({
  figureId,
  caption,
  source,
  kind = "ARCHITECTURE FLOW",
  status,
  statusLabel,
  alt,
  stages,
  animate = true,
}: ProjectFigureMeta & {
  stages: readonly ArchitectureStage[];
  animate?: boolean;
}) {
  const count = stages.length;
  const start = 8;
  const end = 92;
  const xs =
    count <= 1
      ? [50]
      : stages.map((_, index) => start + ((end - start) * index) / (count - 1));

  return (
    <ProjectFigure
      figureId={figureId}
      caption={caption}
      source={source}
      kind={kind}
      status={status}
      statusLabel={statusLabel}
      alt={alt}
    >
      <InViewOnce
        className="arch-flow"
        style={
          {
            "--arch-start": `${xs[0]}%`,
            "--arch-end": `${xs[xs.length - 1]}%`,
          } as CSSProperties
        }
        amount={0.28}
      >
        <div className="arch-flow-plot" aria-hidden="true">
          <svg
            className="arch-flow-svg"
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
          >
            <line
              className="arch-flow-line"
              x1={xs[0]}
              y1="12"
              x2={xs[xs.length - 1]}
              y2="12"
              vectorEffect="non-scaling-stroke"
            />
            {xs.map((x) => (
              <circle
                key={x}
                className="arch-flow-tick"
                cx={x}
                cy="12"
                r="1.1"
              />
            ))}
          </svg>
          {animate ? (
            <span className="arch-flow-particle system-particle" />
          ) : (
            <span
              className="arch-flow-particle system-particle arch-flow-particle--static"
            />
          )}
        </div>
        <ol className="arch-flow-labels">
          {stages.map((stage, index) => (
            <li
              key={stage.id}
              style={{ left: `${xs[index]}%` } as CSSProperties}
            >
              {stage.label}
            </li>
          ))}
        </ol>
      </InViewOnce>
    </ProjectFigure>
  );
}

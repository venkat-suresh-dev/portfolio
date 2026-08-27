"use client";

import { useState } from "react";

import { ProjectFigure } from "./ProjectFigure";
import type {
  EmbeddingCluster,
  EmbeddingPoint,
  ProjectFigureMeta,
} from "./types";

const VIEW_W = 640;
const VIEW_H = 280;
const PAD = 18;

export function EmbeddingSpace({
  figureId,
  caption,
  source,
  kind = "EMBEDDING / VECTOR SPACE",
  status,
  statusLabel,
  alt,
  chrome = true,
  points,
  clusters,
}: ProjectFigureMeta & {
  points: readonly EmbeddingPoint[];
  clusters?: readonly EmbeddingCluster[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    points[0]?.id ?? null
  );
  const selected = points.find((point) => point.id === selectedId) ?? null;

  const mapX = (x: number) => PAD + x * (VIEW_W - PAD * 2);
  const mapY = (y: number) => PAD + y * (VIEW_H - PAD * 2);

  return (
    <ProjectFigure
      figureId={figureId}
      caption={caption}
      source={source}
      kind={kind}
      status={status}
      statusLabel={statusLabel}
      alt={alt}
      chrome={chrome}
    >
      <div className="embedding-space">
        <svg
          className="embedding-svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="group"
          aria-label="Vector space points"
        >
          <rect
            className="embedding-frame"
            x={PAD}
            y={PAD}
            width={VIEW_W - PAD * 2}
            height={VIEW_H - PAD * 2}
          />
          {clusters?.map((cluster) => (
            <text
              key={cluster.id}
              className="embedding-cluster-label"
              x={mapX(cluster.x)}
              y={mapY(cluster.y) - 16}
              textAnchor="middle"
            >
              {cluster.label}
            </text>
          ))}
          {points.map((point) => {
            const isSelected = point.id === selectedId;
            return (
              <circle
                key={point.id}
                className={
                  isSelected
                    ? "embedding-point embedding-point--selected"
                    : "embedding-point"
                }
                cx={mapX(point.x)}
                cy={mapY(point.y)}
                r={isSelected ? 5 : 2.6}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`${point.label}${point.cluster ? `, cluster ${point.cluster}` : ""}${point.meta ? `. ${point.meta}` : ""}`}
                onClick={() => setSelectedId(point.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedId(point.id);
                  }
                }}
              />
            );
          })}
        </svg>
        <p className="embedding-readout">
          {selected ? (
            <>
              <span>{selected.label}</span>
              {selected.cluster ? <span>Cluster {selected.cluster}</span> : null}
              {selected.meta ? <span>{selected.meta}</span> : null}
            </>
          ) : (
            <span>Select a point</span>
          )}
        </p>
        {clusters && clusters.length > 0 ? (
          <ul className="embedding-legend">
            {clusters.map((cluster) => (
              <li key={cluster.id}>{cluster.label}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </ProjectFigure>
  );
}

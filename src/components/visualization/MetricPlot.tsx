import { ProjectFigure } from "./ProjectFigure";
import type { MetricPoint, ProjectFigureMeta } from "./types";

const VIEW_W = 640;
const VIEW_H = 220;
const PAD = { l: 8, r: 8, t: 12, b: 8 };

function bounds(points: readonly MetricPoint[], threshold?: number) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const dataMinY = Math.min(...ys);
  const dataMaxY = Math.max(...ys);
  const minY = threshold === undefined ? dataMinY : Math.min(dataMinY, threshold);
  const maxY = threshold === undefined ? dataMaxY : Math.max(dataMaxY, threshold);
  return {
    minX,
    maxX: maxX === minX ? minX + 1 : maxX,
    minY,
    maxY: maxY === minY ? minY + 1 : maxY,
  };
}

function sx(x: number, minX: number, maxX: number) {
  return PAD.l + ((x - minX) / (maxX - minX)) * (VIEW_W - PAD.l - PAD.r);
}

function sy(y: number, minY: number, maxY: number) {
  return PAD.t + (1 - (y - minY) / (maxY - minY)) * (VIEW_H - PAD.t - PAD.b);
}

export function MetricPlot({
  figureId,
  caption,
  source,
  kind = "METRIC PLOT",
  status,
  statusLabel,
  alt,
  points,
  unit,
  xLabel,
  yLabel,
  threshold,
  thresholdLabel,
}: ProjectFigureMeta & {
  points: readonly MetricPoint[];
  unit?: string;
  xLabel?: string;
  yLabel?: string;
  threshold?: number;
  thresholdLabel?: string;
}) {
  if (points.length < 2) {
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
        <p className="viz-empty">No series provided.</p>
      </ProjectFigure>
    );
  }

  const { minX, maxX, minY, maxY } = bounds(points, threshold);
  const mapped = points.map((point) => ({
    ...point,
    px: sx(point.x, minX, maxX),
    py: sy(point.y, minY, maxY),
  }));
  const line = mapped
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.px.toFixed(1)} ${point.py.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${mapped[mapped.length - 1].px.toFixed(1)} ${VIEW_H - PAD.b} L ${mapped[0].px.toFixed(1)} ${VIEW_H - PAD.b} Z`;
  const thresholdY =
    threshold === undefined ? null : sy(threshold, minY, maxY);

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
      <div className="metric-plot">
        <div className="metric-plot-y">
          <span>
            {maxY.toFixed(2)}
            {unit ? ` ${unit}` : ""}
          </span>
          <span>
            {minY.toFixed(2)}
            {unit ? ` ${unit}` : ""}
          </span>
        </div>
        <svg
          className="metric-plot-svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="presentation"
        >
          <line
            className="viz-axis"
            x1={PAD.l}
            y1={VIEW_H - PAD.b}
            x2={VIEW_W - PAD.r}
            y2={VIEW_H - PAD.b}
          />
          <path className="metric-plot-area" d={area} />
          <path className="metric-plot-line" d={line} fill="none" />
          {thresholdY !== null ? (
            <line
              className="metric-plot-threshold"
              x1={PAD.l}
              y1={thresholdY}
              x2={VIEW_W - PAD.r}
              y2={thresholdY}
            />
          ) : null}
          {mapped.map((point) => (
            <circle
              key={`${point.x}-${point.y}`}
              className="metric-plot-point"
              cx={point.px}
              cy={point.py}
              r="2.2"
            />
          ))}
        </svg>
        <div className="metric-plot-x">
          <span>{xLabel ? `${xLabel} ${minX}` : minX}</span>
          {thresholdY !== null && threshold !== undefined ? (
            <span className="metric-plot-ref">
              {thresholdLabel ?? "ref"} {threshold}
              {unit ? ` ${unit}` : ""}
            </span>
          ) : null}
          <span>{xLabel ? `${xLabel} ${maxX}` : maxX}</span>
        </div>
        {yLabel ? <p className="metric-plot-unit">{yLabel}</p> : null}
      </div>
    </ProjectFigure>
  );
}

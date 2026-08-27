import { ProjectFigure } from "./ProjectFigure";
import type {
  DistributionBin,
  DistributionPoint,
  ProjectFigureMeta,
} from "./types";

type DistributionVariant = "histogram" | "category" | "density" | "scatter";

const VIEW_W = 640;
const VIEW_H = 180;
const PAD = { l: 8, r: 8, t: 10, b: 8 };

export function DataDistribution({
  figureId,
  caption,
  source,
  kind = "DATA DISTRIBUTION",
  status,
  statusLabel,
  alt,
  variant,
  bins,
  points,
  yLabel,
}: ProjectFigureMeta & {
  variant: DistributionVariant;
  bins?: readonly DistributionBin[];
  points?: readonly DistributionPoint[];
  yLabel?: string;
}) {
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
      {variant === "scatter" ? (
        <ScatterPlot points={points ?? []} />
      ) : variant === "density" ? (
        <DensityPlot points={points ?? []} yLabel={yLabel} />
      ) : (
        <BinPlot bins={bins ?? []} variant={variant} yLabel={yLabel} />
      )}
    </ProjectFigure>
  );
}

function BinPlot({
  bins,
  variant,
  yLabel,
}: {
  bins: readonly DistributionBin[];
  variant: "histogram" | "category";
  yLabel?: string;
}) {
  if (bins.length === 0) {
    return <p className="viz-empty">No distribution provided.</p>;
  }

  const max = Math.max(...bins.map((bin) => bin.value), 1);
  const innerW = VIEW_W - PAD.l - PAD.r;
  const innerH = VIEW_H - PAD.t - PAD.b;
  const gap = variant === "histogram" ? 0.28 : 0.38;
  const slot = innerW / bins.length;
  const barW = slot * (1 - gap);

  return (
    <div className="dist-plot">
      {yLabel ? <p className="dist-plot-unit">{yLabel}</p> : null}
      <svg className="dist-plot-svg" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="presentation">
        <line
          className="viz-axis"
          x1={PAD.l}
          y1={VIEW_H - PAD.b}
          x2={VIEW_W - PAD.r}
          y2={VIEW_H - PAD.b}
        />
        {bins.map((bin, index) => {
          const height = (bin.value / max) * innerH;
          const x = PAD.l + index * slot + (slot - barW) / 2;
          const y = VIEW_H - PAD.b - height;
          return (
            <rect
              key={bin.label}
              className="dist-bar"
              x={x}
              y={y}
              width={barW}
              height={Math.max(height, 0.5)}
            />
          );
        })}
      </svg>
      <ol className="dist-plot-labels">
        {bins.map((bin) => (
          <li key={bin.label}>
            <span>{bin.label}</span>
            <span>{bin.value}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DensityPlot({
  points,
  yLabel,
}: {
  points: readonly DistributionPoint[];
  yLabel?: string;
}) {
  if (points.length < 2) {
    return <p className="viz-empty">No density series provided.</p>;
  }

  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const maxY = Math.max(...points.map((point) => point.y), 0.001);
  const innerW = VIEW_W - PAD.l - PAD.r;
  const innerH = VIEW_H - PAD.t - PAD.b;
  const mapped = points.map((point) => {
    const px = PAD.l + ((point.x - minX) / (maxX - minX || 1)) * innerW;
    const py = PAD.t + (1 - point.y / maxY) * innerH;
    return { px, py };
  });
  const d = mapped
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.px.toFixed(1)} ${point.py.toFixed(1)}`)
    .join(" ");

  return (
    <div className="dist-plot">
      {yLabel ? <p className="dist-plot-unit">{yLabel}</p> : null}
      <svg className="dist-plot-svg" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="presentation">
        <line
          className="viz-axis"
          x1={PAD.l}
          y1={VIEW_H - PAD.b}
          x2={VIEW_W - PAD.r}
          y2={VIEW_H - PAD.b}
        />
        <path className="dist-density" d={d} fill="none" />
        {mapped.map((point, index) => (
          <circle
            key={index}
            className="dist-density-point"
            cx={point.px}
            cy={point.py}
            r="1.8"
          />
        ))}
      </svg>
    </div>
  );
}

function ScatterPlot({ points }: { points: readonly DistributionPoint[] }) {
  if (points.length === 0) {
    return <p className="viz-empty">No points provided.</p>;
  }

  return (
    <div className="dist-plot">
      <svg className="dist-plot-svg" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="presentation">
        <line
          className="viz-axis"
          x1={PAD.l}
          y1={VIEW_H - PAD.b}
          x2={VIEW_W - PAD.r}
          y2={VIEW_H - PAD.b}
        />
        <line
          className="viz-axis"
          x1={PAD.l}
          y1={PAD.t}
          x2={PAD.l}
          y2={VIEW_H - PAD.b}
        />
        {points.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}-${index}`}
            className="dist-scatter-point"
            cx={PAD.l + point.x * (VIEW_W - PAD.l - PAD.r)}
            cy={PAD.t + (1 - point.y) * (VIEW_H - PAD.t - PAD.b)}
            r="2.4"
          />
        ))}
      </svg>
    </div>
  );
}

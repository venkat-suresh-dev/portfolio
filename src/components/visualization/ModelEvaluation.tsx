import { ProjectFigure } from "./ProjectFigure";
import type {
  ConfusionMatrix,
  EvaluationMetric,
  ModelComparisonRow,
  ProjectFigureMeta,
} from "./types";

export function ModelEvaluation({
  figureId,
  caption,
  source,
  kind = "MODEL EVALUATION",
  status,
  statusLabel,
  alt,
  metrics,
  confusion,
  comparison,
}: ProjectFigureMeta & {
  metrics?: readonly EvaluationMetric[];
  confusion?: ConfusionMatrix;
  comparison?: readonly ModelComparisonRow[];
}) {
  const hasMetrics = Boolean(metrics && metrics.length > 0);
  const hasComparison = Boolean(comparison && comparison.length > 0);

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
      <div className="model-eval">
        {hasMetrics ? (
          <dl className="model-eval-metrics">
            {metrics!.map((metric) => (
              <div key={metric.label} className="model-eval-metric">
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {confusion ? (
          <table className="model-eval-matrix">
            <caption className="sr-only">
              Confusion matrix. {confusion.actualPos} {confusion.predPos}{" "}
              {confusion.tp}; {confusion.actualPos} {confusion.predNeg}{" "}
              {confusion.fn}; {confusion.actualNeg} {confusion.predPos}{" "}
              {confusion.fp}; {confusion.actualNeg} {confusion.predNeg}{" "}
              {confusion.tn}.
            </caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Actual \ Predicted</span>
                </th>
                <th scope="col">{confusion.predPos}</th>
                <th scope="col">{confusion.predNeg}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{confusion.actualPos}</th>
                <td>{confusion.tp}</td>
                <td>{confusion.fn}</td>
              </tr>
              <tr>
                <th scope="row">{confusion.actualNeg}</th>
                <td>{confusion.fp}</td>
                <td>{confusion.tn}</td>
              </tr>
            </tbody>
          </table>
        ) : null}

        {hasComparison ? (
          <ul className="model-eval-compare">
            {comparison!.map((row) => (
              <li key={row.model}>
                <span className="model-eval-compare-name">{row.model}</span>
                <span
                  className="model-eval-compare-track"
                  aria-hidden="true"
                >
                  <span
                    className="model-eval-compare-fill"
                    style={{ width: `${Math.min(100, Math.max(0, row.score * 100))}%` }}
                  />
                </span>
                <span className="model-eval-compare-value">{row.display}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {!hasMetrics && !confusion && !hasComparison ? (
          <p className="viz-empty">No evaluation values provided.</p>
        ) : null}
      </div>
    </ProjectFigure>
  );
}

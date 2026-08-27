import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { FigureStatus, ProjectFigureMeta } from "./types";

function statusText(
  status?: FigureStatus,
  statusLabel?: string
): string | undefined {
  if (statusLabel) return statusLabel;
  if (status === "synthetic" || status === "prototype") {
    return "PROTOTYPE · SYNTHETIC DATA";
  }
  if (status === "verified") return "VERIFIED EVIDENCE";
  return undefined;
}

export function ProjectFigure({
  figureId,
  caption,
  source,
  kind,
  status,
  statusLabel,
  alt,
  chrome = true,
  children,
  className,
}: ProjectFigureMeta & {
  children: ReactNode;
  className?: string;
}) {
  const resolvedStatus = statusText(status, statusLabel);

  if (!chrome) {
    return (
      <div className={cn("viz-figure viz-figure--embedded", className)}>
        <div className="viz-figure-plate viz-figure-plate--embedded">
          {children}
        </div>
        <p className="sr-only">{alt}</p>
      </div>
    );
  }

  return (
    <figure className={cn("viz-figure", className)}>
      <div className="viz-figure-index">
        <span>{figureId}</span>
        {kind ? <span>{kind}</span> : null}
        {resolvedStatus ? (
          <span className="viz-figure-status">{resolvedStatus}</span>
        ) : null}
      </div>
      <div className="viz-figure-plate">{children}</div>
      <figcaption className="viz-figure-caption">
        <span>{figureId}</span>
        <span>{caption}</span>
      </figcaption>
      {source ? <p className="viz-figure-source">{source}</p> : null}
      <p className="sr-only">{alt}</p>
    </figure>
  );
}

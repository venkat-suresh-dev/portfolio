import type { ReactNode } from "react";

import type { ProjectEvidenceFigure } from "@/data/projects";
import { cn } from "@/lib/utils";

export function EvidenceAperture({
  figure,
  featured = false,
  children,
  className,
}: {
  figure: ProjectEvidenceFigure;
  featured?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "evidence-aperture",
        featured && "evidence-aperture--featured",
        className
      )}
      tabIndex={0}
      data-mode={figure.mode}
      aria-label={`${figure.id} ${figure.title}. ${figure.stamp}.`}
    >
      <p className="evidence-aperture-index">
        <span>{figure.id}</span>
        <span>{figure.title}</span>
        <span className="evidence-aperture-status">
          {figure.statusLabel ?? "PROTOTYPE"}
        </span>
      </p>
      <div className="evidence-aperture-shutter">
        <div className="evidence-aperture-crop" aria-hidden="true">
          <span className="evidence-mark evidence-mark--tl" />
          <span className="evidence-mark evidence-mark--tr" />
          <span className="evidence-mark evidence-mark--bl" />
          <span className="evidence-mark evidence-mark--br" />
          <span className="evidence-mark evidence-mark--base" />
        </div>
        <p className="evidence-stamp">{figure.stamp}</p>
        <div className="evidence-aperture-plane">{children}</div>
      </div>
    </div>
  );
}

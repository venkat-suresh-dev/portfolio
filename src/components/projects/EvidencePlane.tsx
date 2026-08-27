"use client";

import { useState } from "react";

import { EvidenceAperture } from "@/components/projects/EvidenceAperture";
import { FigureSelector } from "@/components/projects/FigureSelector";
import { ProjectEvidenceView } from "@/components/projects/ProjectEvidenceView";
import { TechnicalCaption } from "@/components/projects/TechnicalCaption";
import type { ProjectEvidenceFigure } from "@/data/projects";
import { cn } from "@/lib/utils";

export function EvidencePlane({
  figures,
  featured = false,
  className,
}: {
  figures: readonly ProjectEvidenceFigure[];
  featured?: boolean;
  className?: string;
}) {
  const [activeId, setActiveId] = useState(figures[0]?.id ?? "");
  const active = figures.find((figure) => figure.id === activeId) ?? figures[0];

  if (!active) return null;

  const showSelector = figures.length > 1;

  return (
    <figure className={cn("evidence-figure", className)}>
      <div
        id={showSelector ? `figure-panel-${active.id}` : undefined}
        role={showSelector ? "tabpanel" : undefined}
        aria-labelledby={
          showSelector ? `figure-tab-${active.id}` : undefined
        }
      >
        <EvidenceAperture key={active.id} figure={active} featured={featured}>
          <ProjectEvidenceView figure={active} />
        </EvidenceAperture>
      </div>
      {showSelector ? (
        <FigureSelector
          figures={figures}
          activeId={active.id}
          onSelect={setActiveId}
        />
      ) : null}
      <TechnicalCaption
        figureId={active.id}
        title={active.title}
        caption={active.caption}
        source={active.source}
      />
    </figure>
  );
}

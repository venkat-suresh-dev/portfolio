import { EvidenceAperture } from "@/components/projects/EvidenceAperture";
import { ProjectEvidenceView } from "@/components/projects/ProjectEvidenceView";
import { TechnicalCaption } from "@/components/projects/TechnicalCaption";
import type { ProjectEvidenceFigure } from "@/data/projects";
import { cn } from "@/lib/utils";

export function EvidenceFigure({
  figure,
  featured = false,
  className,
}: {
  figure: ProjectEvidenceFigure;
  featured?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("evidence-figure", className)}>
      <EvidenceAperture figure={figure} featured={featured}>
        <ProjectEvidenceView figure={figure} />
      </EvidenceAperture>
      <TechnicalCaption
        figureId={figure.id}
        title={figure.title}
        caption={figure.caption}
        source={figure.source}
      />
    </figure>
  );
}

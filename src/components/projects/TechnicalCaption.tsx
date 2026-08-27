import { cn } from "@/lib/utils";

export function TechnicalCaption({
  figureId,
  title,
  caption,
  source,
  className,
}: {
  figureId: string;
  title: string;
  caption: string;
  source: string;
  className?: string;
}) {
  return (
    <figcaption className={cn("technical-caption", className)}>
      <p className="technical-caption-id">
        <span>{figureId}</span>
        <span>{title}</span>
      </p>
      <p className="technical-caption-body">{caption}</p>
      <p className="technical-caption-source">
        <span>SOURCE</span>
        <span>{source}</span>
      </p>
    </figcaption>
  );
}

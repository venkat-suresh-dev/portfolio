import { cn } from "@/lib/utils";

export function FigureFrame({
  figureId,
  caption,
  label = "[PLACEHOLDER]\nREAL PROJECT IMAGE",
  kind,
  mediaMeta,
  featured = false,
  interactive = true,
  variant = "media",
  alt = "Prototype placeholder for future project image",
  className,
}: {
  figureId: string;
  caption: string;
  label?: string;
  kind?: string;
  mediaMeta?: string;
  featured?: boolean;
  interactive?: boolean;
  variant?: "media" | "document";
  alt?: string;
  className?: string;
}) {
  const showIndex = Boolean(kind || mediaMeta);

  return (
    <figure
      className={cn(
        "figure-frame",
        featured && "figure-frame--featured",
        interactive && "figure-frame--interactive",
        variant === "document" && "figure-frame--document",
        className
      )}
      aria-label={alt}
    >
      <div
        className="figure-frame-plate"
        tabIndex={interactive ? 0 : undefined}
      >
        {showIndex ? (
          <p className="figure-frame-index">
            <span>{figureId}</span>
            {kind ? <span>{kind}</span> : null}
            {mediaMeta ? (
              <span className="figure-frame-meta">{mediaMeta}</span>
            ) : null}
          </p>
        ) : null}
        <div className="figure-frame-crop" aria-hidden="true" />
        <div className="figure-frame-treat">
          <p className="figure-frame-label">{label}</p>
        </div>
      </div>
      <figcaption className="figure-frame-caption">
        <span>{figureId}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

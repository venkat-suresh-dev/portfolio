import Image from "next/image";

import { FigureFrame } from "@/components/layout/FigureFrame";
import { PrototypeMark } from "@/components/layout/PrototypeControl";
import { SHOW_PROTOTYPE_CONTENT } from "@/data/resolved";
import type { EducationDocument } from "@/data/education";

export function DocumentFigure({
  document,
}: {
  document: EducationDocument;
}) {
  const hasImage = Boolean(document.src && document.width && document.height);

  if (!hasImage && !SHOW_PROTOTYPE_CONTENT) {
    return null;
  }

  return (
    <div className="document-plate" data-doc-id={document.id}>
      <p className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-text-muted uppercase">
        <span>{document.id}</span>
        <span aria-hidden="true">·</span>
        <span>{document.title}</span>
        {!hasImage ? <PrototypeMark /> : null}
      </p>

      {hasImage && document.src && document.width && document.height ? (
        <figure className="mt-4 document-inspect">
          <a
            href={document.src}
            target="_blank"
            rel="noopener noreferrer"
            className="document-plate-link"
          >
            <Image
              src={document.src}
              alt={
                document.alt ?? `${document.title}. ${document.caption}`
              }
              width={document.width}
              height={document.height}
              className="document-plate-image"
              sizes="(min-width: 1280px) 52rem, (min-width: 768px) 70vw, 100vw"
            />
            <span className="sr-only">Open full document image</span>
          </a>
          <figcaption className="figure-frame-caption">
            <span>{document.id}</span>
            <span>{document.caption}</span>
          </figcaption>
        </figure>
      ) : (
        <div className="mt-4 document-inspect">
          <FigureFrame
            figureId={document.id}
            caption={document.caption}
            label={"[PLACEHOLDER]\nDEGREE DOCUMENT"}
            alt="Prototype placeholder for future degree document"
            interactive
            variant="document"
          />
        </div>
      )}
    </div>
  );
}

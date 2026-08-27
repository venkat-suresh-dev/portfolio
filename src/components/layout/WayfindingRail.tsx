"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDocumentChrome } from "@/lib/document-chrome";
import { WAYFINDING_SECTIONS } from "@/lib/sections";

export function WayfindingRail() {
  const pathname = usePathname();
  const { activeId, progress, contextId } = useDocumentChrome();

  if (pathname !== "/") {
    return null;
  }

  const current = WAYFINDING_SECTIONS.find((section) => section.id === activeId);
  const percent = Math.round(progress * 100);

  return (
    <aside
      className="wayfinding-rail"
      aria-label="Document wayfinding"
      style={{ "--doc-progress": String(progress) } as CSSProperties}
    >
      <p className="wayfinding-kicker">DOC / INDEX</p>
      <nav className="wayfinding-index" aria-label="Section index">
        {WAYFINDING_SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={section.href}
            className="wayfinding-link"
            aria-current={activeId === section.id ? "location" : undefined}
          >
            <span className="wayfinding-tick" aria-hidden="true" />
            {section.index}
          </Link>
        ))}
      </nav>

      <div className="wayfinding-progress">
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary">
          {current ? current.index : "§01"}
        </p>
        <div className="wayfinding-progress-track" aria-hidden="true">
          <span className="wayfinding-progress-fill" />
        </div>
        <p className="font-mono text-[0.6875rem] tabular-nums tracking-[0.08em] text-text-tertiary">
          {String(percent).padStart(2, "0")}
        </p>
      </div>

      {contextId ? (
        <p className="wayfinding-context">
          <span className="sr-only">Current document </span>
          {contextId}
        </p>
      ) : null}
    </aside>
  );
}

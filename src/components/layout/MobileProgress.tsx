"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { useDocumentChrome } from "@/lib/document-chrome";

export function MobileProgress() {
  const pathname = usePathname();
  const { progress } = useDocumentChrome();

  if (pathname !== "/" && !pathname.startsWith("/projects/")) {
    return null;
  }

  return (
    <div
      className="doc-progress"
      aria-hidden="true"
      style={{ "--doc-progress": String(progress) } as CSSProperties}
    >
      <span className="doc-progress-bar" />
    </div>
  );
}

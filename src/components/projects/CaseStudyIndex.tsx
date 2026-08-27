"use client";

import { useEffect, useState } from "react";

import type { ProjectCaseStudySection } from "@/data/projects";
import { cn } from "@/lib/utils";

export function CaseStudyIndex({
  sections,
}: {
  sections: readonly ProjectCaseStudySection[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(`case-${section.id}`))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        const next = visible[0]?.target.id.replace(/^case-/, "");
        if (next) setActiveId(next);
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="case-study-index" aria-label="Report sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#case-${section.id}`}
          className={cn(
            "case-study-index-link",
            activeId === section.id && "case-study-index-link--active"
          )}
          aria-current={activeId === section.id ? "location" : undefined}
        >
          <span>{section.index}</span>
          <span>{section.heading}</span>
        </a>
      ))}
    </nav>
  );
}

"use client";

import type { KeyboardEvent } from "react";

import type { ProjectEvidenceFigure } from "@/data/projects";
import { cn } from "@/lib/utils";

export function FigureSelector({
  figures,
  activeId,
  onSelect,
}: {
  figures: readonly ProjectEvidenceFigure[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const index = figures.findIndex((figure) => figure.id === activeId);

  function move(offset: number) {
    if (figures.length === 0) return;
    const next = (index + offset + figures.length) % figures.length;
    onSelect(figures[next].id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      onSelect(figures[0].id);
    }
    if (event.key === "End") {
      event.preventDefault();
      onSelect(figures[figures.length - 1].id);
    }
  }

  return (
    <div
      className="figure-selector"
      role="tablist"
      aria-label="Prototype figures"
      onKeyDown={onKeyDown}
    >
      {figures.map((figure) => {
        const selected = figure.id === activeId;
        return (
          <button
            key={figure.id}
            type="button"
            role="tab"
            id={`figure-tab-${figure.id}`}
            aria-selected={selected}
            aria-controls={`figure-panel-${figure.id}`}
            tabIndex={selected ? 0 : -1}
            className={cn(
              "figure-selector-item",
              selected && "figure-selector-item--active"
            )}
            onClick={() => onSelect(figure.id)}
          >
            <span>{figure.id}</span>
            <span>{figure.selectorLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

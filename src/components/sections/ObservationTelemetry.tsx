"use client";

import { useEffect, useRef } from "react";

import {
  getDocumentChromeState,
  subscribeDocumentChrome,
} from "@/lib/document-chrome";
import {
  formatScrollPercent,
  formatSectionToken,
  formatViewport,
} from "@/lib/observation";
import { cn } from "@/lib/utils";

export function ObservationTelemetry({
  className,
}: {
  className?: string;
}) {
  const viewportRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    const sectionEl = sectionRef.current;
    const scrollEl = scrollRef.current;
    if (!viewportEl || !sectionEl || !scrollEl) return;

    let frame = 0;
    let lastVw = -1;
    let lastVh = -1;
    let lastPct = -1;
    let lastSection = "";

    const write = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { progress, activeId } = getDocumentChromeState();
      const pct = Math.round(progress * 100);
      const section = formatSectionToken(activeId);

      if (vw !== lastVw || vh !== lastVh) {
        lastVw = vw;
        lastVh = vh;
        viewportEl.textContent = formatViewport(vw, vh);
      }

      if (pct !== lastPct) {
        lastPct = pct;
        scrollEl.textContent = formatScrollPercent(pct);
      }

      if (section !== lastSection) {
        lastSection = section;
        sectionEl.textContent = section;
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        write();
      });
    };

    write();
    const unsubscribe = subscribeDocumentChrome(schedule);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn("observation", className)}
      aria-hidden="true"
    >
      <p className="observation-kicker">Observation</p>
      <dl className="observation-list">
        <div className="observation-row">
          <dt>Viewport</dt>
          <dd ref={viewportRef}>—</dd>
        </div>
        <div className="observation-row">
          <dt>Section</dt>
          <dd ref={sectionRef}>—</dd>
        </div>
        <div className="observation-row">
          <dt>Scroll</dt>
          <dd ref={scrollRef}>—</dd>
        </div>
      </dl>
    </div>
  );
}

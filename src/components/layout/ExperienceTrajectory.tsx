"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export function ExperienceTrajectory({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [plot, setPlot] = useState({ d: "", width: 0, height: 0 });

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = [
      ...root.querySelectorAll<HTMLElement>("[data-trajectory-node]"),
    ];
    const box = root.getBoundingClientRect();
    if (nodes.length === 0) {
      setPlot({ d: "", width: box.width, height: box.height });
      return;
    }

    const points = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - box.left,
        y: rect.top + rect.height / 2 - box.top,
      };
    });

    setPlot({
      width: box.width,
      height: box.height,
      d: points
        .map((point, index) => {
          const command = index === 0 ? "M" : "L";
          return `${command} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
        })
        .join(" "),
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.addEventListener("toggle", measure, true);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      root.removeEventListener("toggle", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    if (reduce || mobile) {
      root.dataset.resolved = "true";
      return;
    }

    root.dataset.enhanced = "true";
    root.dataset.resolved = "false";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.dataset.resolved = "true";
          io.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      <svg
        className="trajectory-svg"
        aria-hidden="true"
        viewBox={`0 0 ${Math.max(plot.width, 1)} ${Math.max(plot.height, 1)}`}
        preserveAspectRatio="none"
      >
        <path d={plot.d} pathLength={1} />
      </svg>
      {children}
    </div>
  );
}

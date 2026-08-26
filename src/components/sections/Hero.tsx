"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ArrowDownToLine, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

import { SectionKicker } from "@/components/layout/SectionKicker";
import { CoordinateMotif } from "@/components/layout/CoordinateMotif";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const BOOT_LINES = [
  "initializing_profile...",
  "loading_experience_graph...",
  "status: ready",
] as const;

const LINE_STAGGER_MS = 380;
const SETTLE_MS = 220;
const BOOT_TOTAL_MS =
  BOOT_LINES.length * LINE_STAGGER_MS + SETTLE_MS;

type BootStatus = "pending" | "running" | "done";

export function Hero() {
  const [systemReduceMotion, setSystemReduceMotion] = useState(false);
  const [bootStatus, setBootStatus] = useState<BootStatus>("pending");
  const [visibleLines, setVisibleLines] = useState(0);
  const timersRef = useRef<number[]>([]);
  const bootStatusRef = useRef<BootStatus>("pending");

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const completeBoot = useCallback(() => {
    if (bootStatusRef.current === "done") return;
    clearTimers();
    bootStatusRef.current = "done";
    setVisibleLines(BOOT_LINES.length);
    setBootStatus("done");
  }, [clearTimers]);

  useEffect(() => {
    bootStatusRef.current = bootStatus;
  }, [bootStatus]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      completeBoot();
      return;
    }

    let cancelled = false;

    const startId = window.setTimeout(() => {
      if (cancelled || bootStatusRef.current === "done") return;

      bootStatusRef.current = "running";
      setBootStatus("running");
      setVisibleLines(0);

      const lineTimers = BOOT_LINES.map((_, index) =>
        window.setTimeout(() => {
          if (cancelled || bootStatusRef.current === "done") return;
          setVisibleLines(index + 1);
        }, (index + 1) * LINE_STAGGER_MS)
      );

      const doneTimer = window.setTimeout(() => {
        if (cancelled) return;
        completeBoot();
      }, BOOT_TOTAL_MS);

      timersRef.current = [...lineTimers, doneTimer];
    }, 0);

    timersRef.current = [startId];

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [systemReduceMotion, completeBoot, clearTimers]);

  useEffect(() => {
    if (bootStatus !== "running") return;

    const onKeyDown = () => {
      completeBoot();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [bootStatus, completeBoot]);

  const skipBoot = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (bootStatusRef.current !== "running") return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button")) return;

      completeBoot();
    },
    [completeBoot]
  );

  const motionOff = systemReduceMotion;
  const isResolving = bootStatus === "done";
  const linesToShow = bootStatus === "done" ? BOOT_LINES.length : visibleLines;
  const dataBoot = bootStatus;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-section relative overflow-hidden px-4 sm:px-6"
      data-boot={dataBoot}
      onClick={skipBoot}
    >
      <div className="shell-wide relative">
        <div className="hero-stage relative grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(16.5rem,1fr)] lg:items-start lg:gap-x-8">
          <motion.div
            className="hero-identity flex min-w-0 flex-col"
            initial={false}
            animate={
              isResolving
                ? { opacity: 1, y: 0 }
                : { opacity: 0.55, y: 6 }
            }
            transition={
              motionOff
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <SectionKicker index="§01" label="Profile" />

            <h1
              id="hero-heading"
              className="hero-name mt-3 font-heading text-text"
            >
              {profile.name}
            </h1>

            <p className="hero-role mt-2.5 font-heading text-text">
              {profile.discipline}
            </p>

            {profile.summary ? (
              <p className="hero-lede mt-2">{profile.summary}</p>
            ) : null}

            <div className="hero-actions mt-6 flex flex-wrap items-center gap-2.5">
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className="instrument-btn instrument-btn-primary"
                >
                  <ArrowDownToLine aria-hidden="true" className="size-3.5" />
                  Download Resume
                </a>
              ) : null}
              <a
                href="#contact"
                className="instrument-btn instrument-btn-secondary"
              >
                <MessageSquare aria-hidden="true" className="size-3.5" />
                Get in Touch
              </a>
            </div>
          </motion.div>

          <aside
            className="hero-status flex flex-col border-t border-surface-2 pt-5 lg:border-t-0 lg:pt-0"
            aria-label="Profile status"
          >
            <div className="hero-status-head space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-text-muted uppercase">
                  PROFILE.STATUS
                </p>
                {profile.availability ? (
                  <p className="font-mono text-[0.8rem] tracking-[0.12em] text-accent uppercase">
                    {profile.availability}
                  </p>
                ) : null}
              </div>

              <dl className="hero-status-meta grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-[0.08em]">
                {profile.location ? (
                  <>
                    <dt className="text-text-muted">LOC</dt>
                    <dd className="min-w-0 text-text">{profile.location}</dd>
                  </>
                ) : null}
                {profile.focus && profile.focus.length > 0 ? (
                  <>
                    <dt className="text-text-muted">FOCUS</dt>
                    <dd className="min-w-0 text-text">
                      {profile.focus.join(" · ")}
                    </dd>
                  </>
                ) : null}
              </dl>
            </div>

            <div
              className="hero-plot mt-3 hidden lg:block"
              aria-hidden="true"
            >
              <CoordinateMotif className="hero-plot-canvas" variant="hero" />
            </div>

            <div
              className="hero-boot mt-3 font-mono text-[0.7rem] leading-relaxed tracking-[0.04em] text-text-muted"
              aria-hidden="true"
            >
              {BOOT_LINES.map((line, index) => {
                const shown = bootStatus === "done" || index < linesToShow;

                return (
                  <p
                    key={line}
                    className={cn(
                      "hero-boot-line transition-opacity duration-200 motion-reduce:transition-none",
                      shown ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <span className="text-text-muted/70">{">"}</span> {line}
                  </p>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

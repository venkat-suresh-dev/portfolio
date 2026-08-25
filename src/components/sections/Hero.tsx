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
import { buttonVariants } from "@/components/ui/button";
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

function Highlights() {
  return (
    <ul
      aria-label="Highlights"
      className="hero-highlights grid grid-cols-2 gap-x-0 gap-y-4 sm:grid-cols-4"
    >
      {profile.highlights.map((item) => (
        <li
          key={item.id}
          className={cn(
            "hero-highlight relative px-2 sm:px-2.5",
            "first:pl-0 sm:first:pl-0",
            item.featured && "hero-highlight--featured"
          )}
        >
          <p
            className={cn(
              "hero-highlight-value font-heading tracking-tight",
              item.featured ? "text-highlight" : "text-text"
            )}
          >
            {item.value}
          </p>
          <p
            className={cn(
              "mt-0.5 font-mono text-[0.65rem] tracking-widest uppercase",
              item.featured ? "text-highlight/80" : "text-text-muted"
            )}
          >
            {item.label}
          </p>
          {item.detail ? (
            <p
              className={cn(
                "mt-0.5 text-xs leading-snug",
                item.featured ? "text-highlight/60" : "text-text-muted/80"
              )}
            >
              {item.detail}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

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
              className="hero-name mt-3 font-heading font-medium tracking-[-0.04em] text-text"
            >
              {profile.name}
            </h1>

            <p className="hero-role mt-2.5 font-heading tracking-tight text-text">
              {profile.role}
            </p>

            <p className="hero-lede mt-2 max-w-[34ch] text-[0.95rem] leading-relaxed text-text/80">
              {profile.tagline}
            </p>

            <p className="hero-intro mt-1.5 max-w-sm">
              {profile.shortIntro}
            </p>

            <div className="hero-actions mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={profile.resumePath}
                download
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "hero-cta-primary min-h-11 gap-2 px-3.5"
                )}
              >
                <ArrowDownToLine aria-hidden="true" className="size-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "min-h-11 gap-2 px-3.5 hover:border-accent/45"
                )}
              >
                <MessageSquare aria-hidden="true" className="size-4" />
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
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-text-muted uppercase">
                  PROFILE.STATUS
                </p>
                <p className="font-mono text-sm tracking-wide text-accent">
                  AVAILABLE
                </p>
              </div>

              <dl className="hero-status-meta grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-3 gap-y-1 font-mono text-[0.7rem] tracking-wide">
                <dt className="text-text-muted/70">LOC</dt>
                <dd className="min-w-0 text-text-muted">
                  {profile.location ?? "[PLACEHOLDER]"}
                </dd>
                <dt className="text-text-muted/70">FOCUS</dt>
                <dd className="min-w-0 text-text-muted">[PLACEHOLDER]</dd>
                <dt className="text-text-muted/70">SIGNAL</dt>
                <dd className="min-w-0 text-text-muted">[PLACEHOLDER]</dd>
              </dl>
            </div>

            <div
              className="hero-plot mt-3 hidden lg:block"
              aria-hidden="true"
            >
              <CoordinateMotif className="hero-plot-canvas" variant="hero" />
            </div>

            <div
              className="hero-boot mt-3 font-mono text-[0.7rem] leading-snug tracking-wide text-text-muted/85"
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
                    <span className="text-text-muted/55">{">"}</span> {line}
                  </p>
                );
              })}
            </div>
          </aside>
        </div>

        <motion.div
          className="hero-highlights-panel relative mt-6 pt-4 sm:mt-6 sm:pt-4"
          initial={false}
          animate={
            isResolving
              ? { opacity: 1, y: 0 }
              : { opacity: 0.4, y: 8 }
          }
          transition={
            motionOff
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
          }
        >
          <Highlights />
        </motion.div>
      </div>
    </section>
  );
}

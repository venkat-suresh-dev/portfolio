"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { ArrowDownToLine, MessageSquare } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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
    <ul className="hero-highlights grid grid-cols-2 gap-x-0 gap-y-6 sm:grid-cols-4">
      {profile.highlights.map((item) => (
        <li
          key={item.id}
          className={cn(
            "hero-highlight relative px-3 sm:px-4",
            "first:pl-0 sm:first:pl-0",
            item.featured && "hero-highlight--featured"
          )}
        >
          <p
            className={cn(
              "font-heading text-2xl tracking-tight sm:text-[1.65rem]",
              item.featured ? "text-highlight" : "text-text"
            )}
          >
            {item.value}
          </p>
          <p
            className={cn(
              "mt-1 font-mono text-[0.65rem] tracking-widest uppercase",
              item.featured ? "text-highlight/80" : "text-text-muted"
            )}
          >
            {item.label}
          </p>
          {item.detail ? (
            <p
              className={cn(
                "mt-1 text-xs leading-snug",
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
  const prefersReducedMotion = useReducedMotion();
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
    // Reduced-motion users never enter the timed sequence; derived UI stays "done".
    if (prefersReducedMotion !== false) {
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
  }, [prefersReducedMotion, completeBoot, clearTimers]);

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

  const motionOff = prefersReducedMotion === true;
  const isResolving = motionOff || bootStatus === "done";
  const linesToShow = motionOff ? BOOT_LINES.length : visibleLines;
  const dataBoot: BootStatus = motionOff ? "done" : bootStatus;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-section relative scroll-mt-20 overflow-hidden px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20"
      data-boot={dataBoot}
      onClick={skipBoot}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-8 right-0 hidden w-px bg-linear-to-b from-transparent via-surface-2 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-[12%] hidden size-24 rounded-full border border-surface-2/40 lg:block"
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:items-start lg:gap-14">
          <motion.div
            className="hero-identity min-w-0"
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
            <p className="font-mono text-[0.65rem] tracking-[0.22em] text-text-muted uppercase">
              §01 · Profile
            </p>

            <h1
              id="hero-heading"
              className="hero-name mt-5 font-heading text-[clamp(2.35rem,6vw,3.75rem)] leading-[1.05] font-medium tracking-[-0.03em] text-text"
            >
              {profile.name}
            </h1>

            <p className="mt-4 text-lg text-accent sm:text-xl">{profile.role}</p>

            <p className="mt-2 max-w-xl text-base leading-relaxed text-text-muted sm:text-[1.05rem]">
              {profile.tagline}
            </p>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-text-muted/90 sm:text-[0.95rem]">
              {profile.shortIntro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={profile.resumePath}
                download
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "gap-2 px-4"
                )}
              >
                <ArrowDownToLine aria-hidden="true" className="size-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 px-4 hover:border-accent/35"
                )}
              >
                <MessageSquare aria-hidden="true" className="size-4" />
                Get in Touch
              </a>
            </div>
          </motion.div>

          <aside
            className="hero-status relative flex min-h-38 flex-col justify-between gap-8 border-t border-surface-2 pt-6 lg:min-h-64 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8"
            aria-label="Profile status"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-text-muted uppercase">
                  PROFILE.STATUS
                </p>
                <p className="font-mono text-sm tracking-wide text-accent">
                  AVAILABLE
                </p>
              </div>

              <dl className="space-y-2 font-mono text-[0.7rem] tracking-wide text-text-muted">
                <div className="flex gap-3">
                  <dt className="shrink-0 text-text-muted/70">LOC</dt>
                  <dd>{profile.location ?? "[PLACEHOLDER]"}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0 text-text-muted/70">FOCUS</dt>
                  <dd>[PLACEHOLDER]</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0 text-text-muted/70">SIGNAL</dt>
                  <dd>[PLACEHOLDER]</dd>
                </div>
              </dl>
            </div>

            <div
              className="hero-boot font-mono text-[0.7rem] leading-relaxed tracking-wide text-text-muted"
              aria-hidden="true"
            >
              {BOOT_LINES.map((line, index) => {
                const shown = motionOff || bootStatus === "done" || index < linesToShow;

                return (
                  <p
                    key={line}
                    className={cn(
                      "hero-boot-line transition-opacity duration-200 motion-reduce:transition-none",
                      shown ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <span className="text-accent/70">{">"}</span> {line}
                  </p>
                );
              })}
            </div>
          </aside>
        </div>

        <motion.div
          className="mt-14 border-t border-surface-2 pt-8 sm:mt-16"
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
          <p className="mb-6 font-mono text-[0.65rem] tracking-[0.2em] text-text-muted uppercase">
            Highlights
          </p>
          <Highlights />
        </motion.div>
      </div>
    </section>
  );
}

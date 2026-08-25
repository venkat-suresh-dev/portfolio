"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_DURATION_S = 0.45;
const REVEAL_Y_PX = 16;

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [animateFromOffset, setAnimateFromOffset] = useState(false);
  const inView = useInView(rootRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -8% 0px",
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      if (media.matches) {
        setMotionAllowed(false);
        setAnimateFromOffset(false);
        return;
      }

      setMotionAllowed(true);

      const node = rootRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const alreadyVisible =
        rect.top < window.innerHeight * 0.9 && rect.bottom > 80;

      setAnimateFromOffset(!alreadyVisible);
    };

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  const showFinal = !motionAllowed || !animateFromOffset || inView;
  const playReveal = motionAllowed && animateFromOffset && showFinal;

  return (
    <motion.div
      ref={rootRef}
      className={cn(className)}
      initial={false}
      animate={
        showFinal ? { opacity: 1, y: 0 } : { opacity: 0.85, y: REVEAL_Y_PX }
      }
      transition={
        playReveal
          ? { duration: REVEAL_DURATION_S, ease: REVEAL_EASE, delay }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}

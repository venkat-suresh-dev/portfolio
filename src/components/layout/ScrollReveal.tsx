"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

function subscribeNever() {
  return () => {};
}

function clientTrue() {
  return true;
}

function serverFalse() {
  return false;
}

export function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribeNever,
    clientTrue,
    serverFalse
  );

  if (reduceMotion || !hydrated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.4, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

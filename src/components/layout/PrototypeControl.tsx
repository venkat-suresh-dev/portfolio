import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PrototypeMark({ className }: { className?: string }) {
  return <span className={cn("prototype-mark", className)}>PROTOTYPE</span>;
}

export function PrototypeControl({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-disabled="true"
      aria-label={`${label} — prototype control, destination not available`}
      data-prototype="true"
      className={cn("prototype-control", className)}
    >
      {children}
    </span>
  );
}

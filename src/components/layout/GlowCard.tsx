import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type GlowCardProps = ComponentProps<"div"> & {
  interactive?: boolean;
};

export function GlowCard({
  className,
  children,
  interactive = true,
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-surface-2 bg-surface p-4",
        interactive && [
          "glow-card-interactive",
          "transition-[border-color,background-color] duration-200 ease-out",
          "hover:border-accent/40 hover:bg-surface-2/35",
          "focus-within:border-accent/40 focus-within:bg-surface-2/35",
          "motion-reduce:transition-none",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

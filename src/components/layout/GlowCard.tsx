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
        "rounded-lg border border-surface-2 bg-surface p-6",
        interactive && [
          "glow-card-interactive",
          "transition-[border-color,box-shadow,transform] duration-200 ease-out",
          "hover:-translate-y-0.5 hover:border-accent/45",
          "hover:shadow-[0_0_28px_-8px_color-mix(in_srgb,var(--color-accent)_48%,transparent)]",
          "focus-within:-translate-y-0.5 focus-within:border-accent/45",
          "focus-within:shadow-[0_0_28px_-8px_color-mix(in_srgb,var(--color-accent)_48%,transparent)]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

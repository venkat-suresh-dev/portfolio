import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type GlowCardProps = ComponentProps<"div">;

export function GlowCard({ className, children, ...props }: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-surface-2 bg-surface p-6",
        "transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none",
        "hover:border-accent/35 hover:shadow-[0_0_24px_-10px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]",
        "focus-within:border-accent/35 focus-within:shadow-[0_0_24px_-10px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function SystemParticle({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "system-particle",
        size === "sm" && "system-particle--sm",
        className
      )}
      aria-hidden="true"
    />
  );
}

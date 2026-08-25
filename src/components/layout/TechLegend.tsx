import { cn } from "@/lib/utils";

export function TechLegend({
  labels,
  className,
}: {
  labels: string[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-baseline font-mono text-[0.65rem] leading-5 tracking-[0.08em] text-text-muted",
        className
      )}
      aria-label="Technologies"
    >
      {labels.map((label, index) => (
        <li key={`${label}-${index}`} className="flex min-w-0 items-baseline">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="mx-2 text-text-muted/35 select-none"
            >
              ·
            </span>
          ) : null}
          <span className="min-w-0">{label}</span>
        </li>
      ))}
    </ul>
  );
}

import { cn } from "@/lib/utils";

type CoordinateMotifProps = {
  className?: string;
  variant?: "hero" | "rule" | "project";
};

export function CoordinateMotif({
  className,
  variant = "rule",
}: CoordinateMotifProps) {
  if (variant === "hero") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 6 360 184"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        className={cn(
          "coordinate-motif coordinate-motif--hero block",
          className
        )}
      >
        <g className="text-surface-2" stroke="currentColor" strokeWidth="1">
          <path d="M28 16V176M28 176H344" />
          <path
            d="M91 16V176M154 16V176M217 16V176M280 16V176"
            strokeDasharray="2 7"
            opacity="0.5"
          />
          <path
            d="M28 56H344M28 96H344M28 136H344"
            strokeDasharray="2 7"
            opacity="0.5"
          />
          <path d="M22 56H34M22 96H34M22 136H34" opacity="0.9" />
          <path d="M91 172V180M154 172V180M217 172V180M280 172V180" />
        </g>
        <path
          d="M28 148C70 146 86 110 122 118C164 128 176 60 226 70C260 78 288 46 344 50"
          className="text-accent"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M28 130C74 128 92 142 128 104C172 62 200 94 248 82C280 74 308 68 344 70"
          className="text-text-muted"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.5"
        />
        <circle
          cx="226"
          cy="70"
          r="3.5"
          className="fill-bg stroke-accent"
          strokeWidth="1.5"
        />
        <circle
          cx="248"
          cy="82"
          r="2.5"
          className="fill-bg stroke-accent-2"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  const markerClass =
    variant === "project"
      ? "fill-bg stroke-accent-2"
      : "fill-bg stroke-accent";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 24"
      fill="none"
      className={cn(
        "coordinate-motif block",
        variant === "project"
          ? "coordinate-motif--project"
          : "coordinate-motif--rule",
        className
      )}
    >
      <path className="text-surface-2" d="M0 12H320" stroke="currentColor" />
      <path
        className="text-accent"
        d="M0 12H74"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="text-surface-2"
        d="M95 5V19M155 8V16M215 5V19M275 8V16"
        stroke="currentColor"
      />
      <circle
        cx="74"
        cy="12"
        r="3"
        className={markerClass}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

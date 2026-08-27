export const G_DEFAULT = 0.8;
export const G_MIN = 0.35;
export const G_MAX = 1.45;

export const TIME_SCALE_DEFAULT = 1;
export const TIME_SCALE_MIN = 0.25;
export const TIME_SCALE_MAX = 2.25;

export const TRAIL_DEFAULT = 0.72;
export const TRAIL_MIN = 0;
export const TRAIL_MAX = 1;

/** Plummer softening length in world units. Prevents singular accelerations. */
export const SOFTENING = 0.05;

/** Velocity Verlet timestep in simulation seconds. */
export const FIXED_DT = 1 / 120;

/** Discard oversized frame gaps instead of integrating a stall. */
export const MAX_FRAME_DT = 0.05;

/** Spiral-of-death cap. At 2.25× and 120 Hz this is still under 12. */
export const MAX_STEPS_PER_FRAME = 10;

export const WORLD_HALF = 1.18;

export const IMPULSE_RADIUS = 0.42;
export const IMPULSE_STRENGTH = 0.22;
export const IMPULSE_MARK_MS = 420;

export const TRAIL_CAPACITY_DESKTOP = 280;
export const TRAIL_CAPACITY_COMPACT = 110;
export const TRAIL_CAPACITY_TEASER = 48;
export const TRAIL_STRIDE = 2;

export function trailCapacityFor(
  quality: "full" | "compact" | "teaser",
  amount: number
) {
  const base =
    quality === "teaser"
      ? TRAIL_CAPACITY_TEASER
      : quality === "compact"
        ? TRAIL_CAPACITY_COMPACT
        : TRAIL_CAPACITY_DESKTOP;
  return Math.max(2, Math.round(base * Math.min(1, Math.max(0, amount))));
}

export const DPR_CAP_DESKTOP = 2;
export const DPR_CAP_COMPACT = 1.5;

export const TELEMETRY_MS = 250;
export const ENTER_MS = 520;

export const COMPACT_MQ = "(max-width: 639px)";
export const REDUCE_MQ = "(prefers-reduced-motion: reduce)";

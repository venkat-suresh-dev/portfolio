"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

import {
  COMPACT_MQ,
  ENTER_MS,
  FIXED_DT,
  G_DEFAULT,
  IMPULSE_MARK_MS,
  IMPULSE_RADIUS,
  IMPULSE_STRENGTH,
  MAX_FRAME_DT,
  MAX_STEPS_PER_FRAME,
  REDUCE_MQ,
  TELEMETRY_MS,
  TRAIL_STRIDE,
  trailCapacityFor,
} from "@/lib/field/constants";
import {
  advanceField,
  applyImpulse,
  clearTrails,
  computeAccelerations,
  createTrails,
  recordTrails,
  stepField,
} from "@/lib/field/nbody";
import { createPresetState, createTeaserState } from "@/lib/field/presets";
import {
  drawField,
  fieldDpr,
  isCompactViewport,
  readFieldPalette,
  resizeCanvas,
  viewToWorld,
  viewTransform,
} from "@/lib/field/render";
import type {
  FieldPalette,
  FieldPresetId,
  FieldState,
  ImpulseMark,
  RenderQuality,
  TrailBuffer,
  Vec2,
} from "@/lib/field/types";
import { cn } from "@/lib/utils";

type Variant = "full" | "teaser" | "specimen";

export function NBodyField({
  variant,
  presetId = "orbital",
  gravity = G_DEFAULT,
  timeScale = 1,
  trail = 0.72,
  playing = false,
  interactive = false,
  epoch = 0,
  fieldId = "FLD-01",
  className,
  onTelemetry,
}: {
  variant: Variant;
  presetId?: FieldPresetId;
  gravity?: number;
  timeScale?: number;
  trail?: number;
  playing?: boolean;
  interactive?: boolean;
  epoch?: number;
  fieldId?: string;
  className?: string;
  onTelemetry?: (next: { time: number; bodyCount: number }) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<FieldState | null>(null);
  const trailsRef = useRef<TrailBuffer[]>([]);
  const marksRef = useRef<ImpulseMark[]>([]);
  const paletteRef = useRef<FieldPalette | null>(null);
  const pointerRef = useRef<Vec2 | null>(null);
  const pointerStartRef = useRef<Vec2 | null>(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const accRef = useRef(0);
  const enterAtRef = useRef(0);
  const lastTelemetryRef = useRef(0);
  const visibleRef = useRef(true);
  const pageVisibleRef = useRef(true);
  const reduceRef = useRef(false);
  const compactRef = useRef(false);
  const playingRef = useRef(playing);
  const gravityRef = useRef(gravity);
  const timeScaleRef = useRef(timeScale);
  const trailRef = useRef(trail);
  const presetRef = useRef(presetId);
  const variantRef = useRef(variant);
  const onTelemetryRef = useRef(onTelemetry);
  const tickRef = useRef<(now: number) => void>(() => {});

  useEffect(() => {
    playingRef.current = playing;
    gravityRef.current = gravity;
    timeScaleRef.current = timeScale;
    trailRef.current = trail;
    presetRef.current = presetId;
    variantRef.current = variant;
    onTelemetryRef.current = onTelemetry;
  });

  const qualityFor = (): RenderQuality => {
    if (variantRef.current === "teaser") return "teaser";
    if (variantRef.current === "specimen") return "full";
    return compactRef.current ? "compact" : "full";
  };

  const emitTelemetry = () => {
    onTelemetryRef.current?.({
      time: stateRef.current?.time ?? 0,
      bodyCount: stateRef.current?.bodies.length ?? 0,
    });
  };

  const loadState = useCallback(() => {
    const quality = qualityFor();
    const state =
      variantRef.current === "teaser"
        ? createTeaserState()
        : createPresetState(presetRef.current);
    computeAccelerations(state.bodies, gravityRef.current);
    stateRef.current = state;
    trailsRef.current = createTrails(
      state.bodies.length,
      trailCapacityFor(quality, trailRef.current)
    );
    marksRef.current = [];
    accRef.current = 0;
    if (variantRef.current === "specimen") {
      advanceField(state, gravityRef.current, 3.5, FIXED_DT, (next) => {
        if (next.stepCount % TRAIL_STRIDE === 0) {
          recordTrails(trailsRef.current, next.bodies);
        }
      });
    }
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const state = stateRef.current;
    const palette = paletteRef.current;
    if (!canvas || !wrap || !state || !palette) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const quality = qualityFor();
    const ctx = resizeCanvas(canvas, rect.width, rect.height, fieldDpr(quality));
    if (!ctx) return;
    const view = viewTransform(rect.width, rect.height);
    const now = performance.now();

    let frameAlpha = 1;
    let bodyAlpha = 1;
    if (variantRef.current === "full" && !reduceRef.current && enterAtRef.current) {
      const elapsed = now - enterAtRef.current;
      frameAlpha = Math.min(1, elapsed / 200);
      bodyAlpha = Math.min(1, Math.max(0, (elapsed - 140) / 340));
    }

    marksRef.current = marksRef.current.filter(
      (mark) => now - mark.born < IMPULSE_MARK_MS
    );

    drawField({
      ctx,
      view,
      palette,
      state,
      trails: trailsRef.current,
      quality,
      frameAlpha,
      bodyAlpha,
      pointer: pointerRef.current,
      marks: marksRef.current,
      now,
      fieldId,
    });
  }, [fieldId]);

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const shouldAnimate = useCallback(() => {
    if (!visibleRef.current || !pageVisibleRef.current) return false;
    if (variantRef.current === "specimen") return false;
    if (variantRef.current === "teaser" && reduceRef.current) return false;
    const now = performance.now();
    if (marksRef.current.some((mark) => now - mark.born < IMPULSE_MARK_MS)) {
      return true;
    }
    if (
      variantRef.current === "full" &&
      !reduceRef.current &&
      enterAtRef.current &&
      now - enterAtRef.current < ENTER_MS
    ) {
      return true;
    }
    return playingRef.current;
  }, []);

  const tick = useCallback(
    (now: number) => {
      rafRef.current = 0;
      if (!shouldAnimate()) {
        draw();
        return;
      }

      const last = lastTimeRef.current || now;
      lastTimeRef.current = now;
      const frameDt = Math.min((now - last) / 1000, MAX_FRAME_DT);
      const state = stateRef.current;
      const entering =
        variantRef.current === "full" &&
        !reduceRef.current &&
        enterAtRef.current &&
        now - enterAtRef.current < ENTER_MS;

      if (state && playingRef.current && !entering) {
        accRef.current += frameDt * timeScaleRef.current;
        let steps = 0;
        while (accRef.current >= FIXED_DT && steps < MAX_STEPS_PER_FRAME) {
          stepField(state, gravityRef.current, FIXED_DT);
          accRef.current -= FIXED_DT;
          steps += 1;
          if (trailRef.current > 0.04 && state.stepCount % TRAIL_STRIDE === 0) {
            recordTrails(trailsRef.current, state.bodies);
          }
        }
        if (now - lastTelemetryRef.current >= TELEMETRY_MS) {
          lastTelemetryRef.current = now;
          emitTelemetry();
        }
      }

      draw();
      rafRef.current = requestAnimationFrame((next) => tickRef.current(next));
    },
    [draw, shouldAnimate]
  );

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const ensureLoop = useCallback(() => {
    if (rafRef.current) return;
    if (!shouldAnimate()) {
      draw();
      return;
    }
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame((now) => tickRef.current(now));
  }, [draw, shouldAnimate]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    reduceRef.current = window.matchMedia(REDUCE_MQ).matches;
    compactRef.current = isCompactViewport();
    paletteRef.current = readFieldPalette(wrap);
    pageVisibleRef.current = document.visibilityState === "visible";
    enterAtRef.current =
      variant === "full" && !reduceRef.current ? performance.now() : 0;

    loadState();
    emitTelemetry();
    draw();

    const resize = new ResizeObserver(() => {
      compactRef.current = isCompactViewport();
      paletteRef.current = readFieldPalette(wrap);
      draw();
      ensureLoop();
    });
    resize.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const rect = entry.boundingClientRect;
        const viewH = window.innerHeight || 0;
        const visible =
          rect.width > 1 &&
          rect.height > 1 &&
          rect.bottom > 0 &&
          rect.top < viewH;
        visibleRef.current = visible;
        if (visible) ensureLoop();
        else stopLoop();
      },
      { threshold: [0, 0.02, 0.2] }
    );
    io.observe(wrap);

    const onVisibility = () => {
      pageVisibleRef.current = document.visibilityState === "visible";
      if (pageVisibleRef.current) {
        lastTimeRef.current = performance.now();
        accRef.current = 0;
        ensureLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const reduceMq = window.matchMedia(REDUCE_MQ);
    const compactMq = window.matchMedia(COMPACT_MQ);
    const onReduce = () => {
      reduceRef.current = reduceMq.matches;
      draw();
      if (shouldAnimate()) ensureLoop();
      else stopLoop();
    };
    const onCompact = () => {
      compactRef.current = compactMq.matches;
      const state = stateRef.current;
      if (state) {
        trailsRef.current = createTrails(
          state.bodies.length,
          trailCapacityFor(qualityFor(), trailRef.current)
        );
      }
      draw();
    };
    reduceMq.addEventListener("change", onReduce);
    compactMq.addEventListener("change", onCompact);

    ensureLoop();

    return () => {
      stopLoop();
      resize.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", onReduce);
      compactMq.removeEventListener("change", onCompact);
    };
    // Observers bind once per mount. Draw/loop identities are stable enough
    // for this canvas; preset reloads happen in the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadState();
    lastTimeRef.current = performance.now();
    emitTelemetry();
    draw();
    ensureLoop();
  }, [draw, ensureLoop, epoch, loadState, presetId]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    computeAccelerations(state.bodies, gravity);
    draw();
  }, [draw, gravity]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    trailsRef.current = createTrails(
      state.bodies.length,
      trailCapacityFor(qualityFor(), trail)
    );
    if (trail <= 0.04) clearTrails(trailsRef.current);
    draw();
  }, [draw, trail]);

  useEffect(() => {
    if (playing) ensureLoop();
    else if (!shouldAnimate()) {
      stopLoop();
      draw();
    }
  }, [draw, ensureLoop, playing, shouldAnimate, stopLoop]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerStartRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    if (!rafRef.current) draw();
  };

  const onPointerLeave = () => {
    pointerRef.current = null;
    pointerStartRef.current = null;
    if (!rafRef.current) draw();
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    const state = stateRef.current;
    if (!start || !state) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (Math.hypot(x - start.x, y - start.y) > 12) return;
    const view = viewTransform(rect.width, rect.height);
    const world = viewToWorld(x, y, view);
    applyImpulse(
      state.bodies,
      world.x,
      world.y,
      IMPULSE_STRENGTH,
      IMPULSE_RADIUS
    );
    computeAccelerations(state.bodies, gravityRef.current);
    marksRef.current.push({ x: world.x, y: world.y, born: performance.now() });
    ensureLoop();
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "field-viewport",
        interactive && "field-viewport--live",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}

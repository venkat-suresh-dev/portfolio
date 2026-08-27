"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";

import { FieldControls } from "@/components/field/FieldControls";
import { FieldTelemetry } from "@/components/field/FieldTelemetry";
import { NBodyField } from "@/components/field/NBodyField";
import {
  ENTER_MS,
  G_DEFAULT,
  getPreset,
  REDUCE_MQ,
  TIME_SCALE_DEFAULT,
  TRAIL_DEFAULT,
  type FieldPresetId,
  type FieldRunState,
} from "@/lib/field";

export function FieldChamber() {
  const [presetId, setPresetId] = useState<FieldPresetId>("orbital");
  const [playing, setPlaying] = useState(false);
  const [runState, setRunState] = useState<FieldRunState>("RESET");
  const [timeScale, setTimeScale] = useState(TIME_SCALE_DEFAULT);
  const [gravity, setGravity] = useState(G_DEFAULT);
  const [trail, setTrail] = useState(TRAIL_DEFAULT);
  const [simTime, setSimTime] = useState(0);
  const [bodyCount, setBodyCount] = useState(4);
  const [epoch, setEpoch] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const allowAutoplay = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia(REDUCE_MQ);
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    if (mq.matches) {
      allowAutoplay.current = false;
      return () => mq.removeEventListener("change", sync);
    }

    const id = window.setTimeout(() => {
      if (!allowAutoplay.current) return;
      setPlaying(true);
      setRunState("RUNNING");
    }, ENTER_MS);

    return () => {
      mq.removeEventListener("change", sync);
      window.clearTimeout(id);
    };
  }, []);

  const preset = getPreset(presetId);

  const onTelemetry = useCallback((next: { time: number; bodyCount: number }) => {
    setSimTime(next.time);
    setBodyCount(next.bodyCount);
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying((current) => {
      const next = !current;
      setRunState(next ? "RUNNING" : "PAUSED");
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    allowAutoplay.current = false;
    setEpoch((value) => value + 1);
    setPlaying(false);
    setRunState("RESET");
    setSimTime(0);
  }, []);

  const onPreset = useCallback(
    (id: FieldPresetId) => {
      setPresetId(id);
      setEpoch((value) => value + 1);
      setSimTime(0);
      setBodyCount(getPreset(id).bodyCount);
      if (runState === "RESET") {
        setPlaying(false);
      }
    },
    [runState]
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (event.key === " " || event.code === "Space") {
      if (target.closest("button, input, a, textarea, select")) return;
      event.preventDefault();
      togglePlay();
    }
    if (event.key === "r" || event.key === "R") {
      if (target.closest("input, textarea")) return;
      event.preventDefault();
      reset();
    }
  };

  return (
    <div className="field-page">
      <div className="page-shell field-page-shell">
        <p className="field-back">
          <Link href="/#field" className="legend-link min-h-11">
            ← Index
          </Link>
        </p>

        <header className="field-page-header">
          <p className="field-kicker">FIELD / 01</p>
          <h1 id="field-heading" className="field-heading">
            Computational Playground
          </h1>
          <p className="field-system">N-BODY SYSTEM</p>
        </header>
      </div>

      <div
        className="field-instrument"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-labelledby="field-heading"
      >
        <div className="page-shell field-stage">
          <NBodyField
            variant="full"
            presetId={presetId}
            gravity={gravity}
            timeScale={timeScale}
            trail={trail}
            playing={playing}
            interactive
            epoch={epoch}
            onTelemetry={onTelemetry}
          />
          <p className="sr-only">
            Observation field for a small gravitational N-body system. Click or
            tap inside the field to apply a brief local impulse. Play, pause,
            and reset are available in the controls.
          </p>
        </div>

        <div className="page-shell field-console">
          <FieldControls
            playing={playing}
            reducedMotion={reducedMotion}
            presetId={presetId}
            timeScale={timeScale}
            gravity={gravity}
            trail={trail}
            onTogglePlay={togglePlay}
            onReset={reset}
            onPreset={onPreset}
            onTimeScale={setTimeScale}
            onGravity={setGravity}
            onTrail={setTrail}
          />
          <FieldTelemetry
            runState={runState}
            timeScale={timeScale}
            gravity={gravity}
            bodyCount={bodyCount}
            simTime={simTime}
            presetLabel={preset.label}
          />
        </div>
      </div>

      <div className="page-shell field-notes">
        <p className="measure field-explain">
          A small computational playground for interacting with motion, force,
          and emergent trajectories. Click or tap the field to perturb the
          system.
        </p>
        <p className="field-technical">
          Pairwise Newtonian gravity. Velocity Verlet integration. Softened
          close approaches. An interactive visualization, not a precision
          model.
        </p>
      </div>
    </div>
  );
}

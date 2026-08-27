import {
  FIELD_PRESETS,
  formatGravity,
  formatTimeScale,
  G_MAX,
  G_MIN,
  TIME_SCALE_MAX,
  TIME_SCALE_MIN,
  TRAIL_MAX,
  TRAIL_MIN,
} from "@/lib/field";
import type { FieldPresetId } from "@/lib/field";
import { cn } from "@/lib/utils";

export function FieldControls({
  playing,
  reducedMotion,
  presetId,
  timeScale,
  gravity,
  trail,
  onTogglePlay,
  onReset,
  onPreset,
  onTimeScale,
  onGravity,
  onTrail,
}: {
  playing: boolean;
  reducedMotion: boolean;
  presetId: FieldPresetId;
  timeScale: number;
  gravity: number;
  trail: number;
  onTogglePlay: () => void;
  onReset: () => void;
  onPreset: (id: FieldPresetId) => void;
  onTimeScale: (value: number) => void;
  onGravity: (value: number) => void;
  onTrail: (value: number) => void;
}) {
  const playLabel = reducedMotion && !playing ? "Run simulation" : playing ? "Pause" : "Play";

  return (
    <div className="field-controls">
      <div className="field-controls-actions">
        <button
          type="button"
          className="field-action"
          onClick={onTogglePlay}
          aria-pressed={playing}
        >
          {playLabel}
        </button>
        <button type="button" className="field-action" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="field-presets" role="group" aria-label="Initial condition presets">
        {FIELD_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={cn("field-preset", presetId === preset.id && "is-active")}
            aria-pressed={presetId === preset.id}
            onClick={() => onPreset(preset.id)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="field-params">
        <label className="field-param">
          <span className="field-param-label">
            Time scale
            <span className="field-param-value">{formatTimeScale(timeScale)}</span>
          </span>
          <input
            type="range"
            className="field-range"
            min={TIME_SCALE_MIN}
            max={TIME_SCALE_MAX}
            step={0.05}
            value={timeScale}
            onChange={(event) => onTimeScale(Number(event.target.value))}
          />
        </label>
        <label className="field-param">
          <span className="field-param-label">
            Gravity
            <span className="field-param-value">{formatGravity(gravity)}</span>
          </span>
          <input
            type="range"
            className="field-range"
            min={G_MIN}
            max={G_MAX}
            step={0.05}
            value={gravity}
            onChange={(event) => onGravity(Number(event.target.value))}
          />
        </label>
        <label className="field-param">
          <span className="field-param-label">
            Trail
            <span className="field-param-value">{trail.toFixed(2)}</span>
          </span>
          <input
            type="range"
            className="field-range"
            min={TRAIL_MIN}
            max={TRAIL_MAX}
            step={0.02}
            value={trail}
            onChange={(event) => onTrail(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

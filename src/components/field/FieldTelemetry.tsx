import { formatBodyCount, formatGravity, formatSimTime, formatTimeScale } from "@/lib/field";
import type { FieldRunState } from "@/lib/field";

export function FieldTelemetry({
  runState,
  timeScale,
  gravity,
  bodyCount,
  simTime,
  presetLabel,
}: {
  runState: FieldRunState;
  timeScale: number;
  gravity: number;
  bodyCount: number;
  simTime: number;
  presetLabel: string;
}) {
  return (
    <div className="field-telemetry" aria-live="polite">
      <p className="field-telemetry-kicker">FIELD STATE</p>
      <dl className="field-telemetry-list">
        <div className="field-telemetry-row">
          <dt>STATE</dt>
          <dd data-state={runState.toLowerCase()}>{runState}</dd>
        </div>
        <div className="field-telemetry-row">
          <dt>PRESET</dt>
          <dd>{presetLabel}</dd>
        </div>
        <div className="field-telemetry-row">
          <dt>TIME SCALE</dt>
          <dd>{formatTimeScale(timeScale)}</dd>
        </div>
        <div className="field-telemetry-row">
          <dt>GRAVITY</dt>
          <dd>{formatGravity(gravity)}</dd>
        </div>
        <div className="field-telemetry-row">
          <dt>BODIES</dt>
          <dd>{formatBodyCount(bodyCount)}</dd>
        </div>
        <div className="field-telemetry-row">
          <dt>T</dt>
          <dd>{formatSimTime(simTime)}</dd>
        </div>
      </dl>
    </div>
  );
}

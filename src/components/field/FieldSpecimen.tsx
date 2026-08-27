"use client";

import { NBodyField } from "@/components/field/NBodyField";
import { SystemParticle } from "@/components/visualization";
import { G_DEFAULT, TRAIL_DEFAULT } from "@/lib/field";

export function FieldSpecimen() {
  return (
    <div className="field-specimen">
      <div className="particle-specimen mb-4">
        <SystemParticle />
        <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary">
          Canonical field body
        </p>
      </div>
      <NBodyField
        variant="specimen"
        playing={false}
        interactive={false}
        trail={TRAIL_DEFAULT}
        gravity={G_DEFAULT}
        fieldId="FLD-01"
        className="field-specimen-view"
      />
      <div className="field-specimen-meta">
        <div className="field-param field-param--static">
          <span className="field-param-label">
            Time scale
            <span className="field-param-value">1.00×</span>
          </span>
          <span className="field-range-track" aria-hidden="true">
            <span className="field-range-thumb" />
          </span>
        </div>
        <div className="field-specimen-states" aria-label="Field state samples">
          <p className="field-state-chip" data-state="running">
            <span>FIELD STATE</span>
            <strong>RUNNING</strong>
          </p>
          <p className="field-state-chip" data-state="paused">
            <span>FIELD STATE</span>
            <strong>PAUSED</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

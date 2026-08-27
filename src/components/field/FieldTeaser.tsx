"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { NBodyField } from "@/components/field/NBodyField";
import { REDUCE_MQ } from "@/lib/field/constants";

export function FieldTeaser() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(REDUCE_MQ);
    const sync = () => setPlaying(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="field"
      aria-labelledby="field-teaser-heading"
      className="page-section page-section--field"
    >
      <div className="page-shell">
        <div className="field-teaser page-grid">
          <div className="field-teaser-copy col-span-4 md:col-span-4 xl:col-span-5">
            <p className="field-kicker">FIELD / 01</p>
            <h2 id="field-teaser-heading" className="field-teaser-title">
              N-body system
            </h2>
            <p className="field-teaser-line">
              A small computational playground for interacting with motion,
              force, and emergent trajectories.
            </p>
            <Link href="/field" className="text-control field-teaser-enter">
              Enter field
              <span aria-hidden="true" className="text-control-glyph">
                →
              </span>
            </Link>
          </div>

          <Link
            href="/field"
            className="field-teaser-plate col-span-4 md:col-span-4 xl:col-span-7"
            aria-label="Enter field 01, N-body system"
          >
            <NBodyField
              variant="teaser"
              playing={playing}
              trail={0.55}
              interactive={false}
              fieldId="FLD-01"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { DisplayName } from "@/components/layout/DisplayName";
import {
  PrototypeControl,
  PrototypeMark,
} from "@/components/layout/PrototypeControl";
import { SectionKicker } from "@/components/layout/SectionKicker";
import { LocalClock } from "@/components/sections/LocalClock";
import { profile } from "@/data/profile";
import {
  resolvedClock,
  resolvedProfile,
  SHOW_PROTOTYPE_CONTENT,
} from "@/data/resolved";
import { cn } from "@/lib/utils";
import Link from "next/link";

function StatusPanel() {
  const availability = resolvedProfile.availability ?? "[PLACEHOLDER]";
  const focus = resolvedProfile.focus?.[0] ?? "[PLACEHOLDER] Focus";
  const timezoneLabel = resolvedProfile.timezoneLabel ?? "[PLACEHOLDER]";

  return (
    <div className="status-panel" aria-label="Profile status">
      <p className="status-panel-kicker">
        <span>Status</span>
        {SHOW_PROTOTYPE_CONTENT ? <PrototypeMark /> : null}
      </p>

      <dl>
        <div className="status-row">
          <dt className="status-key">Availability</dt>
          <dd
            className={cn(
              "status-value",
              !profile.availability && "status-value--placeholder"
            )}
          >
            {availability}
          </dd>
        </div>
        <div className="status-row">
          <dt className="status-key">Local time</dt>
          <dd className="status-value status-value--placeholder">
            {resolvedClock ? (
              <>
                <LocalClock timeZone={resolvedClock.timeZone} provisional />
                <span className="mt-1 block text-[0.6875rem] tracking-[0.08em] text-text-tertiary">
                  {resolvedClock.caption} · {timezoneLabel}
                </span>
              </>
            ) : (
              timezoneLabel
            )}
          </dd>
        </div>
        <div className="status-row">
          <dt className="status-key">Location</dt>
          <dd className="status-value">{profile.location}</dd>
        </div>
        <div className="status-row">
          <dt className="status-key">Focus</dt>
          <dd
            className={cn(
              "status-value",
              !profile.focus && "status-value--placeholder"
            )}
          >
            {focus}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="page-section page-section--hero hero-stage"
    >
      <div className="page-shell">
        <div className="page-grid">
          <div className="hero-reveal hero-reveal--kicker col-span-4 md:col-span-8 xl:col-span-12">
            <SectionKicker index="§01" label="Profile" />
          </div>

          <div className="hero-reveal hero-reveal--name col-span-4 min-w-0 md:col-span-8 xl:col-span-12">
            <DisplayName
              name={profile.name}
              as="h1"
              id="hero-heading"
              className="hero-name mt-4"
            />
          </div>

          <div className="hero-reveal hero-reveal--summary col-span-4 mt-6 md:col-span-5 md:mt-8 xl:col-span-7 xl:mt-8">
            <p className="hero-role">{profile.discipline}</p>
            {resolvedProfile.summary ? (
              <p className="hero-lede placeholder-copy mt-4">
                {resolvedProfile.summary}
              </p>
            ) : null}
            {profile.location ? (
              <p className="mt-4 font-mono text-[0.75rem] tracking-[0.1em] text-text-muted">
                {profile.location}
              </p>
            ) : null}

            <div className="hero-reveal hero-reveal--cta mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className="instrument-btn instrument-btn-primary"
                >
                  Download résumé
                </a>
              ) : (
                <PrototypeControl
                  label="Download résumé"
                  className="instrument-btn instrument-btn-primary"
                >
                  Download résumé
                </PrototypeControl>
              )}

              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="instrument-btn instrument-btn-secondary"
                >
                  Get in touch
                </a>
              ) : (
                <Link href="/#contact" className="instrument-btn instrument-btn-secondary">
                  Get in touch
                </Link>
              )}

              {profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-control gap-1.5"
                >
                  GitHub
                  <span aria-hidden="true" className="text-control-glyph">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
            {SHOW_PROTOTYPE_CONTENT && !profile.resumeUrl ? (
              <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.1em] text-text-tertiary">
                PROTOTYPE · Résumé file not attached
              </p>
            ) : null}

            <Link href="/#experience" className="scroll-cue mt-8">
              <span className="scroll-cue-line" aria-hidden="true" />
              <span className="scroll-cue-label">Scroll</span>
            </Link>
          </div>

          <div className="hero-reveal hero-reveal--status col-span-4 mt-10 md:col-span-3 md:col-start-6 md:mt-8 xl:col-span-5 xl:col-start-8 xl:mt-8">
            <StatusPanel />
          </div>
        </div>
      </div>
    </section>
  );
}

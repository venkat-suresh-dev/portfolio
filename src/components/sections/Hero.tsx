import { DisplayName } from "@/components/layout/DisplayName";
import { SectionKicker } from "@/components/layout/SectionKicker";
import { profile } from "@/data/profile";

export function Hero() {
  const hasActions = Boolean(
    profile.email ||
      profile.github ||
      profile.linkedin ||
      profile.resumeUrl
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="page-section page-section--hero"
    >
      <div className="page-shell">
        <div className="page-grid">
          <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-12">
            <SectionKicker index="§01" label="Profile" />

            <DisplayName
              name={profile.name}
              as="h1"
              id="hero-heading"
              className="hero-name mt-5"
            />
          </div>

          <div className="col-span-4 mt-8 md:col-span-6 md:mt-10 lg:col-span-6 lg:mt-12">
            <p className="hero-role">{profile.discipline}</p>

            {profile.summary ? (
              <p className="hero-lede mt-4">{profile.summary}</p>
            ) : null}

            {profile.location ? (
              <p className="mt-5 font-mono text-[0.75rem] tracking-[0.1em] text-text-muted">
                {profile.location}
              </p>
            ) : null}

            {hasActions ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1">
                {profile.resumeUrl ? (
                  <a
                    href={profile.resumeUrl}
                    download
                    className="instrument-btn instrument-btn-primary"
                  >
                    Resume
                  </a>
                ) : null}
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="instrument-btn instrument-btn-primary"
                  >
                    Email
                  </a>
                ) : null}
                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-control gap-1.5"
                  >
                    LinkedIn
                    <span aria-hidden="true" className="text-control-glyph">
                      ↗
                    </span>
                  </a>
                ) : null}
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
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

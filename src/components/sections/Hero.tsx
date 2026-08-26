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
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <SectionKicker index="§01" label="Profile" />

            <h1
              id="hero-heading"
              className="hero-name mt-3 font-heading text-text"
            >
              {profile.name}
            </h1>

            <p className="hero-role mt-3 font-heading text-text">
              {profile.discipline}
            </p>

            {profile.summary ? (
              <p className="hero-lede mt-3">{profile.summary}</p>
            ) : null}

            {profile.location ? (
              <p className="mt-4 font-mono text-[0.75rem] tracking-[0.08em] text-text-muted">
                {profile.location}
              </p>
            ) : null}

            {hasActions ? (
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
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
                    className="instrument-btn instrument-btn-secondary"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {profile.github ? (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instrument-btn instrument-btn-secondary"
                  >
                    GitHub
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

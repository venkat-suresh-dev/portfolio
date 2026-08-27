import { DisplayName } from "@/components/layout/DisplayName";
import { InViewOnce } from "@/components/layout/InViewOnce";
import { PrototypeControl } from "@/components/layout/PrototypeControl";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { profile } from "@/data/profile";
import { resolvedContact } from "@/data/resolved";

export function Contact() {
  const closing = resolvedContact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="page-section page-section--contact"
    >
      <div className="page-shell">
        <SectionHeader
          index="§06"
          title="Contact"
          headingId="contact-heading"
        />

        <p className="contact-communication-label">ESTABLISH COMMUNICATION</p>

        <InViewOnce className="contact-finale" simplifyOnMobile>
          <div className="page-grid contact-composition">
            <div className="contact-signal" aria-hidden="true">
              <span className="contact-signal-line" />
              <span className="contact-signal-track">
                <span className="contact-signal-particle" />
              </span>
              <span className="contact-signal-node" />
            </div>

            <div className="contact-statement col-span-4 min-w-0 md:col-span-8 xl:col-span-8">
              {closing ? (
                <>
                  <p className="contact-eyebrow">{closing.closingEyebrow}</p>
                  <p className="contact-close mt-4">
                    {closing.closingStatement.split("\n").map((line) => (
                      <span key={line} className="contact-close-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </>
              ) : (
                <DisplayName name={profile.name} className="contact-close" />
              )}
            </div>

            <div className="contact-details col-span-4 mt-10 md:col-span-6 md:col-start-3 xl:col-span-4 xl:col-start-9">
              <p className="text-[1.0625rem] text-text-muted">
                {profile.discipline}
              </p>
              {profile.location ? (
                <p className="mt-3 font-mono text-[0.75rem] tracking-[0.1em] text-text-muted">
                  {profile.location}
                </p>
              ) : null}

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1">
                <li>
                  {profile.email ? (
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-control gap-1.5"
                    >
                      Email
                    </a>
                  ) : (
                    <PrototypeControl
                      label="Email"
                      className="text-control gap-1.5"
                    >
                      Email
                    </PrototypeControl>
                  )}
                </li>
                <li>
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
                  ) : (
                    <PrototypeControl
                      label="LinkedIn"
                      className="text-control gap-1.5"
                    >
                      LinkedIn
                      <span aria-hidden="true" className="text-control-glyph">
                        ↗
                      </span>
                    </PrototypeControl>
                  )}
                </li>
                <li>
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
                  ) : (
                    <PrototypeControl
                      label="GitHub"
                      className="text-control gap-1.5"
                    >
                      GitHub
                      <span aria-hidden="true" className="text-control-glyph">
                        ↗
                      </span>
                    </PrototypeControl>
                  )}
                </li>
                <li>
                  {profile.resumeUrl ? (
                    <a
                      href={profile.resumeUrl}
                      download
                      className="text-control gap-1.5"
                    >
                      Résumé
                      <span aria-hidden="true" className="text-control-glyph">
                        ↘
                      </span>
                    </a>
                  ) : (
                    <PrototypeControl
                      label="Résumé"
                      className="text-control gap-1.5"
                    >
                      Résumé
                      <span aria-hidden="true" className="text-control-glyph">
                        ↘
                      </span>
                    </PrototypeControl>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </InViewOnce>
      </div>
    </section>
  );
}

import { Mail } from "lucide-react";

import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const secondaryActionClassName = cn("text-control gap-1.5");

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="contact-stage relative px-4 pt-10 pb-8 sm:px-6 sm:pt-12 sm:pb-8"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <header className="min-w-0">
            <SectionKicker index="§06" label="Contact" />
            <h2
              id="contact-heading"
              className="mt-3 max-w-lg font-heading text-[1.85rem] leading-[1.18] font-medium tracking-[-0.028em] text-text sm:text-[2.15rem]"
            >
              Contact
            </h2>
          </header>

          <div
            className="flex min-w-0 flex-col items-start gap-3"
            aria-label="Contact actions"
          >
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="instrument-btn instrument-btn-primary"
              >
                <Mail aria-hidden="true" className="size-3.5" />
                Get in Touch
              </a>
            ) : null}

            <div className="flex flex-wrap items-center gap-x-5">
              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryActionClassName}
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
                  className={secondaryActionClassName}
                >
                  GitHub
                  <span aria-hidden="true" className="text-control-glyph">
                    ↗
                  </span>
                </a>
              ) : null}
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  download
                  className={secondaryActionClassName}
                >
                  Resume
                  <span aria-hidden="true" className="text-control-glyph">
                    ↘
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

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
              className="mt-3 max-w-lg font-heading text-[1.85rem] font-medium tracking-tight text-text sm:text-[2.15rem]"
            >
              {profile.contactHeading}
            </h2>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-text-muted">
              {profile.contactStatement}
            </p>
          </header>

          <div
            className="flex min-w-0 flex-col items-start gap-3"
            aria-label="Contact actions"
          >
            <a
              href={`mailto:${profile.email}`}
              className="instrument-btn instrument-btn-primary"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              Get in Touch
            </a>

            <div className="flex flex-wrap items-center gap-x-5">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryActionClassName}
              >
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryActionClassName}
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.resumePath}
                download
                className={secondaryActionClassName}
              >
                Resume
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

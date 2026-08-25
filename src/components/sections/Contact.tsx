import {
  ArrowDownToLine,
  ArrowUpRight,
  Mail,
  createLucideIcon,
} from "lucide-react";

import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const Github = createLucideIcon("github", [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef",
    },
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }],
]);

const Linkedin = createLucideIcon("linkedin", [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f",
    },
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }],
]);

const actionLinkClassName = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "w-full justify-center gap-2 px-4 hover:border-accent/35 sm:w-auto lg:w-full"
);

const outboundIconClassName = cn(
  "outbound-icon size-3.5 opacity-60 transition-transform duration-200 ease-out",
  "group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5",
  "motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0 motion-reduce:group-hover/button:translate-y-0"
);

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <div className="border-t border-surface-2 pt-12 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17.5rem)] lg:items-start lg:gap-16">
            <header className="min-w-0">
              <SectionKicker index="§06" label="Contact" />
              <h2
                id="contact-heading"
                className="mt-3 max-w-lg font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
              >
                {profile.contactHeading}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted sm:text-[1.05rem]">
                {profile.contactStatement}
              </p>
            </header>

            <div
              className="flex min-w-0 flex-col gap-3"
              aria-label="Contact actions"
            >
              <a
                href={`mailto:${profile.email}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full justify-center gap-2 px-4 sm:w-auto lg:w-full"
                )}
              >
                <Mail aria-hidden="true" className="size-4" />
                Get in Touch
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={actionLinkClassName}
              >
                <Linkedin aria-hidden="true" className="size-4" />
                LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  className={outboundIconClassName}
                />
              </a>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={actionLinkClassName}
              >
                <Github aria-hidden="true" className="size-4" />
                GitHub
                <ArrowUpRight
                  aria-hidden="true"
                  className={outboundIconClassName}
                />
              </a>

              <a
                href={profile.resumePath}
                download
                className={actionLinkClassName}
              >
                <ArrowDownToLine aria-hidden="true" className="size-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

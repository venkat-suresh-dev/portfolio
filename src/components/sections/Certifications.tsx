import { ArrowUpRight } from "lucide-react";

import { GlowCard } from "@/components/layout/GlowCard";
import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import {
  certifications,
  type Certification,
} from "@/data/certifications";
import { cn } from "@/lib/utils";

const credentialLinkClassName = cn(
  "group mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-sm",
  "font-mono text-xs tracking-wide text-text-muted",
  "transition-colors duration-200 hover:text-accent",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "motion-reduce:transition-none"
);

const outboundIconClassName = cn(
  "outbound-icon size-3.5 shrink-0 transition-transform duration-200 ease-out",
  "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  "motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
);

function CertificationBody({
  certification,
  nameId,
}: {
  certification: Certification;
  nameId: string;
}) {
  return (
    <>
      <h3
        id={nameId}
        className="font-heading text-base font-medium tracking-tight text-text sm:text-[1.05rem]"
      >
        {certification.name}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-text/80">
        {certification.issuer}
      </p>
      <p className="mt-2 font-mono text-xs tracking-wide text-text-muted">
        {certification.date}
      </p>
    </>
  );
}

function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  const nameId = `${certification.id}-name`;
  const hasCredential = Boolean(certification.credentialUrl);

  return (
    <article
      aria-labelledby={nameId}
      className="h-full min-w-0"
      data-interactive={hasCredential ? "true" : "false"}
    >
      <GlowCard
        interactive={hasCredential}
        className="flex h-full min-w-0 flex-col p-4 sm:p-5"
      >
        <CertificationBody
          certification={certification}
          nameId={nameId}
        />

        {hasCredential && certification.credentialUrl ? (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View credential for ${certification.name}`}
            className={cn(credentialLinkClassName, "mt-auto pt-1")}
          >
            View credential
            <ArrowUpRight aria-hidden="true" className={outboundIconClassName} />
          </a>
        ) : null}
      </GlowCard>
    </article>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative px-4 py-16 sm:px-6 sm:py-20"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <header className="mb-8 sm:mb-10">
          <SectionKicker index="§05" label="Certifications" />
          <h2
            id="certifications-heading"
            className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
          >
            Certifications
          </h2>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {certifications.map((certification) => (
            <li key={certification.id} className="min-w-0">
              <CertificationCard certification={certification} />
            </li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  );
}

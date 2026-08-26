import { ArrowUpRight } from "lucide-react";

import { SectionKicker } from "@/components/layout/SectionKicker";
import { SectionReveal } from "@/components/layout/SectionReveal";
import {
  certifications,
  type Certification,
} from "@/data/certifications";

const credentialLinkClassName = "legend-link mt-1.5 min-h-9";

const outboundIconClassName = "outbound-icon size-3 shrink-0";

function CertificationItem({
  certification,
}: {
  certification: Certification;
}) {
  const nameId = `${certification.id}-name`;
  const hasCredential = Boolean(certification.credentialUrl);

  return (
    <article
      aria-labelledby={nameId}
      className="credential-row"
      data-interactive={hasCredential ? "true" : "false"}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          id={nameId}
          className="min-w-0 font-heading text-base font-medium tracking-[-0.015em] text-text"
        >
          {certification.name}
        </h3>
        {certification.date ? (
          <p className="shrink-0 pt-0.5 font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
            {certification.date}
          </p>
        ) : null}
      </div>
      <p className="mt-0.5 text-[0.8125rem] leading-snug text-text-muted">
        {certification.issuer}
      </p>

      {hasCredential && certification.credentialUrl ? (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View credential for ${certification.name}`}
          className={credentialLinkClassName}
        >
          Credential
          <ArrowUpRight aria-hidden="true" className={outboundIconClassName} />
        </a>
      ) : null}
    </article>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative px-4 pt-8 pb-8 sm:px-6 sm:pt-10 sm:pb-10"
    >
      <SectionReveal className="mx-auto w-full max-w-5xl">
        <header className="mb-4 sm:mb-5">
          <SectionKicker index="§05" label="Certifications" />
          <h2
            id="certifications-heading"
            className="mt-2 font-heading text-xl font-medium tracking-[-0.015em] text-text sm:text-[1.45rem]"
          >
            Certifications
          </h2>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-0 border-t border-surface-2/70 p-0 sm:grid-cols-2 sm:gap-x-8">
          {certifications.map((certification) => (
            <li key={certification.id} className="min-w-0">
              <CertificationItem certification={certification} />
            </li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";

import { ScrollReveal } from "@/components/layout/ScrollReveal";
import { SectionHeader } from "@/components/layout/SectionHeader";
import {
  certifications,
  type Certification,
} from "@/data/certifications";

const credentialLinkClassName = "legend-link min-h-11 md:justify-self-end";

const outboundIconClassName = "outbound-icon size-3 shrink-0";

function certificationDocId(index: number) {
  return `CRT-${String(index + 1).padStart(2, "0")}`;
}

function CertificationItem({
  certification,
  index,
}: {
  certification: Certification;
  index: number;
}) {
  const nameId = `${certification.id}-name`;
  const hasCredential = Boolean(certification.credentialUrl);
  const crtId = certificationDocId(index);

  return (
    <article
      aria-labelledby={nameId}
      className="credential-row"
      data-interactive={hasCredential ? "true" : "false"}
      data-doc-id={crtId}
    >
      <div className="page-grid items-start gap-y-1 md:items-center">
        <p className="col-span-4 font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted md:col-span-1 xl:col-span-2">
          {crtId}
        </p>

        <div className="col-span-4 min-w-0 md:col-span-4 xl:col-span-5">
          <h3
            id={nameId}
            className="text-[1.0625rem] font-medium tracking-[-0.015em] text-text"
          >
            {certification.name}
          </h3>
        </div>

        <div className="col-span-4 md:col-span-2 xl:col-span-3">
          <p className="text-[0.8125rem] leading-snug text-text-muted">
            {certification.issuer}
          </p>
          {certification.date ? (
            <p className="mt-1 font-mono text-[0.7rem] tracking-[0.1em] text-text-muted">
              <time>{certification.date}</time>
            </p>
          ) : null}
        </div>

        {hasCredential && certification.credentialUrl ? (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View credential for ${certification.name} (opens in a new tab)`}
            className={`${credentialLinkClassName} col-span-4 md:col-span-1 xl:col-span-2`}
          >
            Credential
            <ArrowUpRight aria-hidden="true" className={outboundIconClassName} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="page-section page-section--certs"
    >
      <div className="page-shell">
        <SectionHeader
          index="§05"
          title="Certifications"
          headingId="certifications-heading"
        />

        <ScrollReveal>
        <div className="credential-ledger">
          <div
            className="credential-legend page-grid"
            aria-hidden="true"
          >
            <p className="col-span-4 md:col-span-1 xl:col-span-2">ID</p>
            <p className="col-span-4 md:col-span-4 xl:col-span-5">
              Certification
            </p>
            <p className="col-span-4 md:col-span-2 xl:col-span-3">Issuer</p>
            <p className="col-span-4 md:col-span-1 md:text-right xl:col-span-2">
              Credential
            </p>
          </div>

          <ul className="m-0 list-none border-t border-hairline p-0 md:border-t-0">
            {certifications.map((certification, index) => (
              <li key={certification.id} className="min-w-0">
                <CertificationItem
                  certification={certification}
                  index={index}
                />
              </li>
            ))}
          </ul>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

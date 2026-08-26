import { DisplayName } from "@/components/layout/DisplayName";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { profile } from "@/data/profile";

type ContactLink = {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
};

function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];

  if (profile.email) {
    links.push({ href: `mailto:${profile.email}`, label: "Email" });
  }

  if (profile.linkedin) {
    links.push({
      href: profile.linkedin,
      label: "LinkedIn",
      external: true,
    });
  }

  if (profile.github) {
    links.push({
      href: profile.github,
      label: "GitHub",
      external: true,
    });
  }

  if (profile.resumeUrl) {
    links.push({
      href: profile.resumeUrl,
      label: "Resume",
      download: true,
    });
  }

  return links;
}

export function Contact() {
  const links = getContactLinks();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="page-section"
    >
      <div className="page-shell">
        <SectionHeader
          index="§06"
          title="Contact"
          headingId="contact-heading"
        />

        <div className="page-grid">
          <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-12">
            <DisplayName
              name={profile.name}
              className="contact-close"
            />
          </div>

          <div className="col-span-4 mt-8 md:col-span-6 lg:col-span-6">
            <p className="text-[1.0625rem] text-text-muted">
              {profile.discipline}
            </p>

            {links.length > 0 ? (
              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-control gap-1.5"
                      {...(link.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      {...(link.download ? { download: true } : {})}
                    >
                      {link.label}
                      {link.external ? (
                        <span aria-hidden="true" className="text-control-glyph">
                          ↗
                        </span>
                      ) : null}
                      {link.download ? (
                        <span aria-hidden="true" className="text-control-glyph">
                          ↘
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

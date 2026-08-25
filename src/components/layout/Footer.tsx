import { Mail, createLucideIcon } from "lucide-react";

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

const COPYRIGHT_YEAR = 2026;

const iconLinkClassName = cn(
  "inline-flex size-10 items-center justify-center rounded-sm text-text-muted",
  "transition-colors duration-200 hover:text-accent",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "motion-reduce:transition-none"
);

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-surface-2/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-text-muted">[PLACEHOLDER]</p>

        <div className="flex items-center gap-1">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconLinkClassName}
          >
            <Github aria-hidden="true" className="size-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconLinkClassName}
          >
            <Linkedin aria-hidden="true" className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className={iconLinkClassName}
          >
            <Mail aria-hidden="true" className="size-4" />
          </a>
        </div>

        <p className="font-mono text-xs text-text-muted sm:text-right">
          © {COPYRIGHT_YEAR} {profile.name}
        </p>
      </div>
    </footer>
  );
}

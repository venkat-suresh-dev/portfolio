import { profile } from "@/data/profile";
import { SHOW_PROTOTYPE_CONTENT } from "@/data/resolved";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-hairline">
      <div className="page-shell flex flex-wrap items-center justify-between gap-3 py-4">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-text-muted">
          {profile.initials}
        </p>
        <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-text-muted">
          © {COPYRIGHT_YEAR}
          {SHOW_PROTOTYPE_CONTENT ? " · DOC.PROTOTYPE" : null}
        </p>
      </div>
    </footer>
  );
}

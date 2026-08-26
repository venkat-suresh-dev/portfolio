import { profile } from "@/data/profile";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-surface-2/45">
      <div className="page-shell flex items-center justify-between gap-4 py-3">
        <p className="font-mono text-[0.7rem] tracking-[0.14em] text-text-muted">
          {profile.initials}
        </p>
        <p className="font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
          © {COPYRIGHT_YEAR}
        </p>
      </div>
    </footer>
  );
}

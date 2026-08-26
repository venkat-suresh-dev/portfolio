import { profile } from "@/data/profile";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-surface-2/45">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.14em] text-text-muted">
          <span aria-hidden="true" className="h-3 w-px bg-surface-2" />
          {profile.initials}
        </p>
        <p className="font-mono text-[0.7rem] tracking-[0.06em] text-text-muted">
          © {COPYRIGHT_YEAR}
        </p>
      </div>
    </footer>
  );
}

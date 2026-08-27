"use client";

import {
  useState,
  useSyncExternalStore,
  type ReactNode,
  type ToggleEvent,
} from "react";

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia("(min-width: 1024px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isDesktop() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export function ExperienceDisclosure({
  lead,
  children,
}: {
  lead: boolean;
  children: ReactNode;
}) {
  const desktop = useSyncExternalStore(
    subscribeDesktop,
    isDesktop,
    () => false
  );
  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const open = userOverride ?? (desktop && lead);

  return (
    <details
      className="experience-details"
      open={open}
      suppressHydrationWarning
      onToggle={(event: ToggleEvent<HTMLDetailsElement>) => {
        const next = event.currentTarget.open;
        if (next !== open) {
          setUserOverride(next);
        }
      }}
    >
      {children}
    </details>
  );
}

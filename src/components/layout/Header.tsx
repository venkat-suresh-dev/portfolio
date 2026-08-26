"use client";

import { useState, useSyncExternalStore } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD_PX = 12;
const SECTION_IDS = navigationItems.map((item) => item.href.slice(1));
const ACTIVE_LINE_PX = 220;

type HeaderScrollState = {
  scrolled: boolean;
  activeId: string | null;
};

const SERVER_SNAPSHOT: HeaderScrollState = {
  scrolled: false,
  activeId: null,
};

let clientSnapshot: HeaderScrollState = SERVER_SNAPSHOT;

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("resize", onStoreChange);
  document.addEventListener("click", onStoreChange);

  const observer = new IntersectionObserver(onStoreChange, {
    rootMargin: "-72px 0px -45% 0px",
    threshold: 0,
  });

  for (const id of SECTION_IDS) {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  }

  onStoreChange();

  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
    document.removeEventListener("click", onStoreChange);
    observer.disconnect();
  };
}

function readScrollState(): HeaderScrollState {
  const scrolled = window.scrollY > SCROLL_THRESHOLD_PX;
  let activeId: string | null = null;

  for (const id of SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) continue;
    if (element.getBoundingClientRect().top <= ACTIVE_LINE_PX) {
      activeId = id;
    }
  }

  const doc = document.documentElement;
  const atBottom =
    window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
  if (atBottom) {
    activeId = SECTION_IDS.at(-1) ?? null;
  }

  if (window.scrollY < 40) {
    activeId = null;
  }

  return { scrolled, activeId };
}

function getScrollSnapshot() {
  const next = readScrollState();
  if (
    next.scrolled === clientSnapshot.scrolled &&
    next.activeId === clientSnapshot.activeId
  ) {
    return clientSnapshot;
  }
  clientSnapshot = next;
  return clientSnapshot;
}

function getServerScrollSnapshot() {
  return SERVER_SNAPSHOT;
}

const navLinkClassName = cn(
  "nav-legend py-1",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
);

const mobileNavLinkClassName = cn(
  "nav-legend min-h-11 w-full justify-start px-1 py-3 text-[0.8rem]",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
);

function IdentityMark({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="#hero"
      onClick={onClick}
      className={cn(
        "identity-mark group inline-flex min-h-9 shrink-0 items-center gap-2.5",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-3 w-px bg-text-muted/70 transition-colors duration-150 group-hover:bg-accent motion-reduce:transition-none"
      />
      <span className="font-mono text-[0.7rem] tracking-[0.16em] text-text transition-colors duration-150 group-hover:text-accent motion-reduce:transition-none">
        {profile.initials}
      </span>
      <span
        aria-hidden="true"
        className="hidden h-px w-7 bg-surface-2 transition-colors duration-150 group-hover:bg-accent/50 sm:block motion-reduce:transition-none"
      />
    </a>
  );
}

function ResumeLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={profile.resumePath}
      download
      onClick={onClick}
      className={cn("text-control", className)}
    >
      Resume
      <span aria-hidden="true" className="text-control-glyph text-[0.85em] leading-none">
        ↘
      </span>
    </a>
  );
}

export function Header() {
  const { scrolled, activeId } = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        "transition-[background-color,border-color,backdrop-filter] duration-200",
        "motion-reduce:transition-none",
        scrolled
          ? "border-surface-2/80 bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="px-4 sm:px-6">
        <div className="shell-wide flex h-14 items-center justify-between gap-3">
          <IdentityMark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 md:flex lg:gap-7"
          >
            {navigationItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeId === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(navLinkClassName, isActive && "text-accent")}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="nav-legend-tick"
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ResumeLink className="hidden md:inline-flex" />

            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="menu-trigger cursor-pointer rounded-sm text-text md:hidden hover:bg-transparent hover:text-accent focus-visible:border-transparent focus-visible:ring-0"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu aria-hidden="true" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72 border-surface-2 bg-surface p-0 sm:max-w-xs"
              >
                <SheetHeader>
                  <SheetTitle className="font-mono text-[0.7rem] tracking-[0.16em] text-text-muted uppercase">
                    Navigation
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Page section links and resume
                  </SheetDescription>
                </SheetHeader>
                <nav
                  aria-label="Mobile"
                  className="flex flex-col gap-0.5 px-4 pb-6"
                >
                  {navigationItems.map((item) => {
                    const sectionId = item.href.slice(1);
                    const isActive = activeId === sectionId;

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          mobileNavLinkClassName,
                          isActive && "text-accent"
                        )}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {item.label}
                        <span aria-hidden="true" className="nav-legend-tick" />
                      </a>
                    );
                  })}
                  <ResumeLink
                    className="mt-3"
                    onClick={() => setMobileNavOpen(false)}
                  />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

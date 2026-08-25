"use client";

import { useState, useSyncExternalStore } from "react";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
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
  "relative rounded-sm px-2 py-1 text-sm text-text-muted transition-colors duration-200",
  "hover:text-accent",
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "motion-reduce:transition-none"
);

const mobileNavLinkClassName = cn(
  navLinkClassName,
  "block w-full px-2 py-3 text-base"
);

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
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "hover:border-accent/45",
        className
      )}
    >
      Resume
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
        <a
          href="#hero"
          className={cn(
            "inline-flex shrink-0 items-center rounded-sm border border-surface-2 px-2 py-1",
            "font-mono text-xs tracking-wider text-text",
            "transition-colors duration-200 hover:border-accent/45 hover:text-accent",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            "motion-reduce:transition-none"
          )}
        >
          {profile.initials}
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex lg:gap-2"
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
                  className={cn(
                    "pointer-events-none absolute inset-x-2 -bottom-px h-px bg-accent",
                    "transition-opacity duration-200 motion-reduce:transition-none",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ResumeLink className="hidden md:inline-flex" />

          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
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
                <SheetTitle className="font-mono text-xs tracking-widest text-text-muted uppercase">
                  Navigation
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Page section links and resume
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-6">
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
                    </a>
                  );
                })}
                <ResumeLink
                  className="mt-4 w-full"
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

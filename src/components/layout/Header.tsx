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

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD_PX;
}

function getServerScrollSnapshot() {
  return false;
}

const navLinkClassName = cn(
  "rounded-sm px-2 py-1 text-sm text-text-muted transition-colors",
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
        "hover:border-accent/35",
        className
      )}
    >
      Resume
    </a>
  );
}

export function Header() {
  const scrolled = useSyncExternalStore(
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
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#hero"
          className={cn(
            "inline-flex shrink-0 items-center rounded-sm border border-surface-2 px-2 py-1",
            "font-mono text-xs tracking-wider text-text",
            "transition-colors hover:border-accent/35 hover:text-accent",
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
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className={navLinkClassName}>
              {item.label}
            </a>
          ))}
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
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={mobileNavLinkClassName}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <ResumeLink
                  className="mt-4 w-full"
                  onClick={() => setMobileNavOpen(false)}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

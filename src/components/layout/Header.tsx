"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { PrototypeControl } from "@/components/layout/PrototypeControl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getVisibleNavigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { SHOW_PROTOTYPE_CONTENT } from "@/data/resolved";
import { useDocumentChrome } from "@/lib/document-chrome";
import { cn } from "@/lib/utils";

const visibleNavigationItems = getVisibleNavigationItems();

const navLinkClassName = cn(
  "nav-legend py-1",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
);

const mobileNavLinkClassName = cn(
  "nav-legend min-h-11 w-full justify-start px-1 py-3 text-[0.75rem]",
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
    <Link
      href="/#hero"
      onClick={onClick}
      className={cn(
        "identity-mark group inline-flex min-h-11 shrink-0 items-center gap-2.5",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-3 w-px bg-text-tertiary transition-colors duration-150 group-hover:bg-accent motion-reduce:transition-none"
      />
      <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-text transition-colors duration-150 group-hover:text-accent motion-reduce:transition-none">
        {profile.initials}
      </span>
    </Link>
  );
}

function ResumeControl({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  if (profile.resumeUrl) {
    return (
      <a
        href={profile.resumeUrl}
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

  if (!SHOW_PROTOTYPE_CONTENT) {
    return null;
  }

  return (
    <PrototypeControl label="Resume" className={cn("text-control", className)}>
      Resume
      <span aria-hidden="true" className="text-control-glyph text-[0.85em] leading-none">
        ↘
      </span>
    </PrototypeControl>
  );
}

function sectionIdFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex >= 0) {
    return href.slice(hashIndex + 1);
  }
  return href.replace(/^\//, "");
}

export function Header() {
  const { scrolled, navActiveId } = useDocumentChrome();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="site-header" data-scrolled={scrolled ? "true" : "false"}>
      <div className="page-shell flex h-full items-center justify-between gap-3">
        <IdentityMark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          {visibleNavigationItems.map((item) => {
            const sectionId = sectionIdFromHref(item.href);
            const isActive = navActiveId === sectionId;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={navLinkClassName}
              >
                {item.label}
                <span aria-hidden="true" className="nav-legend-tick" />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <span className="hidden md:inline-flex">
            <ResumeControl />
          </span>

          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="menu-trigger min-h-11 min-w-11 cursor-pointer rounded-sm text-text md:hidden hover:bg-transparent hover:text-accent focus-visible:border-transparent focus-visible:ring-0"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-hairline bg-surface p-0 sm:max-w-xs"
            >
              <SheetHeader>
                <SheetTitle className="font-mono text-[0.6875rem] tracking-[0.16em] text-text-muted uppercase">
                  Navigation
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Page section links
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-0.5 px-4 pb-6"
              >
                {visibleNavigationItems.map((item) => {
                  const sectionId = sectionIdFromHref(item.href);
                  const isActive = navActiveId === sectionId;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={mobileNavLinkClassName}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {item.label}
                      <span aria-hidden="true" className="nav-legend-tick" />
                    </Link>
                  );
                })}
                <ResumeControl
                  className="mt-3"
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

"use client";

import { useSyncExternalStore } from "react";

import { NAV_SECTION_IDS, WAYFINDING_SECTIONS } from "@/lib/sections";

export type DocumentChromeState = {
  scrolled: boolean;
  activeId: string | null;
  navActiveId: string | null;
  progress: number;
  contextId: string | null;
};

const SERVER_SNAPSHOT: DocumentChromeState = {
  scrolled: false,
  activeId: null,
  navActiveId: null,
  progress: 0,
  contextId: null,
};

const ACTIVE_LINE_PX = 220;
const SCROLL_THRESHOLD_PX = 12;

let clientSnapshot: DocumentChromeState = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();
let attached = false;
let observer: IntersectionObserver | null = null;

function readState(): DocumentChromeState {
  const scrolled = window.scrollY > SCROLL_THRESHOLD_PX;
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  const progress = Math.round((window.scrollY / max) * 1000) / 1000;

  let activeId: string | null = null;
  for (const section of WAYFINDING_SECTIONS) {
    const element = document.getElementById(section.id);
    if (!element) continue;
    if (element.getBoundingClientRect().top <= ACTIVE_LINE_PX) {
      activeId = section.id;
    }
  }

  const atBottom =
    window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
  if (atBottom) {
    activeId = WAYFINDING_SECTIONS.at(-1)?.id ?? null;
  }

  if (window.scrollY < 40) {
    activeId = "hero";
  }

  const navActiveId =
    window.scrollY >= 40 &&
    activeId &&
    (NAV_SECTION_IDS as readonly string[]).includes(activeId)
      ? activeId
      : null;

  let contextId: string | null = null;
  const nodes = document.querySelectorAll<HTMLElement>("[data-doc-id]");
  for (const node of nodes) {
    if (node.getBoundingClientRect().top <= 280) {
      contextId = node.dataset.docId ?? null;
    }
  }

  return { scrolled, activeId, navActiveId, progress, contextId };
}

function emit() {
  const next = readState();
  if (
    next.scrolled === clientSnapshot.scrolled &&
    next.activeId === clientSnapshot.activeId &&
    next.navActiveId === clientSnapshot.navActiveId &&
    next.progress === clientSnapshot.progress &&
    next.contextId === clientSnapshot.contextId
  ) {
    return;
  }
  clientSnapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  if (!attached) {
    attached = true;
    window.addEventListener("scroll", emit, { passive: true });
    window.addEventListener("resize", emit);
    window.addEventListener("hashchange", emit);
    observer = new IntersectionObserver(emit, {
      rootMargin: "-88px 0px -45% 0px",
      threshold: 0,
    });
    for (const section of WAYFINDING_SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    emit();
  }

  return () => {
    listeners.delete(onStoreChange);
  };
}

function getSnapshot() {
  return clientSnapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function useDocumentChrome() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { profile } from "@/data/profile";
import {
  applyIntroInert,
  INTRO_DURATION_MS,
  markIntroComplete,
  shouldPlayIntro,
} from "@/lib/intro";

export function IntroIgnition() {
  const pathname = usePathname();
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    markIntroComplete();
    applyIntroInert(false);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    if (!shouldPlayIntro()) {
      return;
    }

    applyIntroInert(true);

    const skipLink = document.querySelector(".skip-link");
    const onSkipToContent = () => finish();
    skipLink?.addEventListener("click", onSkipToContent);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);

    const failsafe = window.setTimeout(finish, INTRO_DURATION_MS + 80);

    return () => {
      skipLink?.removeEventListener("click", onSkipToContent);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(failsafe);
      applyIntroInert(false);
    };
  }, [finish, pathname]);

  if (pathname !== "/") {
    return null;
  }

  return (
    <div
      className="intro-ignition"
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.animationName === "intro-exit") {
          finish();
        }
      }}
    >
      <div className="intro-visual" aria-hidden="true">
        <div className="intro-stage">
          <div className="intro-field">
            <svg
              className="intro-orbits"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                className="intro-orbit intro-orbit--c"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                cx="160"
                cy="160"
                rx="56"
                ry="56"
              />
              <ellipse
                className="intro-orbit intro-orbit--b"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                cx="160"
                cy="160"
                rx="84"
                ry="34"
                transform="rotate(36 160 160)"
              />
              <ellipse
                className="intro-orbit intro-orbit--a"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                cx="160"
                cy="160"
                rx="122"
                ry="46"
                transform="rotate(-22 160 160)"
              />
              <ellipse
                className="intro-orbit intro-orbit--live"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                cx="160"
                cy="160"
                rx="122"
                ry="46"
                transform="rotate(-22 160 160)"
              />
              <circle className="intro-nucleus" cx="160" cy="160" r="2.7" />
            </svg>
            <div className="intro-electron-track">
              <span className="intro-electron intro-electron--trail intro-electron--trail-2" />
              <span className="intro-electron intro-electron--trail intro-electron--trail-1" />
              <span className="intro-electron" />
            </div>
          </div>
          <p className="intro-mark">{profile.initials}</p>
        </div>
      </div>

      <button type="button" className="intro-skip" onClick={finish}>
        Skip intro
        <span aria-hidden="true"> →</span>
      </button>
    </div>
  );
}

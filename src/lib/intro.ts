export const INTRO_STORAGE_KEY = "vs-intro-played";
export const INTRO_STYLE_ID = "intro-gate-style";

export const INTRO_DURATION_MS = 1580;

const INTRO_INERT_SELECTOR =
  "header.site-header, #content, footer, .wayfinding-rail, .doc-progress";

export const INTRO_BOOTSTRAP_SCRIPT = `(function(){
  try {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    var home = location.pathname === "/" || location.pathname === "";
    if (!home) return;

    var navType = "navigate";
    try {
      var nav = performance.getEntriesByType("navigation")[0];
      if (nav && nav.type) {
        navType = nav.type;
      } else if (performance.navigation && performance.navigation.type === 1) {
        navType = "reload";
      }
    } catch (e) {}

    var played = false;
    try { played = sessionStorage.getItem("${INTRO_STORAGE_KEY}") === "1"; } catch (e) {}

    if (navType !== "reload" && played) return;

    var style = document.createElement("style");
    style.id = "${INTRO_STYLE_ID}";
    document.head.appendChild(style);
  } catch (e) {}
})();`;

export function markIntroComplete() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
  document.getElementById(INTRO_STYLE_ID)?.remove();
}

export function applyIntroInert(on: boolean) {
  document.querySelectorAll(INTRO_INERT_SELECTOR).forEach((node) => {
    if (on) {
      node.setAttribute("inert", "");
    } else {
      node.removeAttribute("inert");
    }
  });
}

export function shouldPlayIntro() {
  if (typeof document === "undefined") return false;
  return Boolean(document.getElementById(INTRO_STYLE_ID));
}

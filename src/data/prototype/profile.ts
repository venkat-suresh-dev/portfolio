/**
 * PROTOTYPE gaps only. Verified name, discipline, location, and GitHub
 * stay in src/data/profile.ts and are never replaced from here.
 */
export const prototypeProfileGaps = {
  summary:
    "[PLACEHOLDER] One-line summary of engineering focus. Prototype copy — not a biographical claim.",
  availability: "[PLACEHOLDER] Availability",
  focus: ["[PLACEHOLDER] Focus"] as const,
  timezoneLabel: "[PLACEHOLDER]",
};

/**
 * PROTOTYPE clock only. Timezone is not a verified personal fact.
 * Used so the status-panel clock can be reviewed as UI, not evidence.
 */
export const prototypeClock = {
  timeZone: "Asia/Kolkata",
  caption: "PROTOTYPE TZ",
  note: "Timezone unverified. Clock exists for layout review only.",
} as const;

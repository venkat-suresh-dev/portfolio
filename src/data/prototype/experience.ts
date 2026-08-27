import type { ExperienceEntry } from "@/data/experience";

/**
 * PROTOTYPE work history for layout review.
 * Not employment evidence. Every field is explicitly marked.
 */
export const prototypeExperience: readonly ExperienceEntry[] = [
  {
    id: "prototype-wrk-01",
    docId: "WRK-01",
    role: "[PLACEHOLDER] Role",
    company: "[PLACEHOLDER] Company",
    period: "[PLACEHOLDER] Period",
    location: "[PLACEHOLDER] Location",
    impact:
      "[PLACEHOLDER] Impact — a single sentence describing the role’s effect. Prototype copy only.",
    metrics: [{ label: "[PLACEHOLDER] Metric", value: "[PLACEHOLDER]" }],
    details: [
      "[PLACEHOLDER] Supporting detail. Not a real responsibility or outcome.",
      "[PLACEHOLDER] Supporting detail. Not a real responsibility or outcome.",
      "[PLACEHOLDER] Supporting detail. Not a real responsibility or outcome.",
    ],
    technologies: ["[PLACEHOLDER] Technology", "[PLACEHOLDER] Technology"],
    emphasis: "lead",
    prototype: true,
  },
  {
    id: "prototype-wrk-02",
    docId: "WRK-02",
    role: "[PLACEHOLDER] Role",
    company: "[PLACEHOLDER] Company",
    period: "[PLACEHOLDER] Period",
    impact:
      "[PLACEHOLDER] Impact — shorter supporting entry for rhythm. Prototype copy only.",
    details: [
      "[PLACEHOLDER] Supporting detail. Not a real responsibility or outcome.",
      "[PLACEHOLDER] Supporting detail. Not a real responsibility or outcome.",
    ],
    technologies: ["[PLACEHOLDER] Technology"],
    emphasis: "standard",
    prototype: true,
  },
  {
    id: "prototype-wrk-03",
    docId: "WRK-03",
    role: "[PLACEHOLDER] Role",
    company: "[PLACEHOLDER] Company",
    period: "[PLACEHOLDER] Period",
    details: [
      "[PLACEHOLDER] Supporting detail. Not a real responsibility or outcome.",
    ],
    emphasis: "quiet",
    prototype: true,
  },
];

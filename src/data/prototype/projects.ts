import type { Project } from "@/data/projects";

/**
 * PROTOTYPE portfolio projects for visual review.
 * Academic MSc work is not included here.
 * Evidence payloads are layout specimens — not claimed systems or results.
 */
const prototypeArchitectureStages = [
  { id: "client", label: "CLIENT" },
  { id: "api", label: "API" },
  { id: "service", label: "SERVICE" },
  { id: "data", label: "DATA" },
] as const;

/** Non-monotonic specimen series. Not a measured curve. */
const prototypeMetricSpecimen = [
  { x: 0, y: 0.42 },
  { x: 1, y: 0.71 },
  { x: 2, y: 0.28 },
  { x: 3, y: 0.64 },
  { x: 4, y: 0.19 },
  { x: 5, y: 0.53 },
  { x: 6, y: 0.37 },
] as const;

export const prototypeProjects: readonly Project[] = [
  {
    id: "prototype-prj-01",
    docId: "PRJ-01",
    slug: "prototype-featured",
    title: "[PLACEHOLDER] Featured Project",
    summary:
      "[PLACEHOLDER] What this project is, why it matters, and what evidence would appear here. Prototype copy — not a real claim.",
    status: "prototype",
    role: "[PLACEHOLDER] Role",
    technologies: [
      "[PLACEHOLDER] Stack",
      "[PLACEHOLDER] Layer",
      "[PLACEHOLDER] Tool",
    ],
    featured: true,
    composition: "featured",
    prototype: true,
    readiness: "prototype",
    resultSummary:
      "[PLACEHOLDER] Result would be stated here. No outcome invented.",
    evidence: [
      {
        id: "FIG.01",
        mode: "architecture",
        title: "SYSTEM ARCHITECTURE",
        selectorLabel: "SYSTEM",
        kind: "ARCHITECTURE FLOW",
        caption:
          "Prototype system-flow specimen. Synthetic structure for layout validation.",
        source: "PROTOTYPE / SYNTHETIC",
        stamp: "PROTOTYPE / SYNTHETIC ARCHITECTURE EXAMPLE",
        status: "synthetic",
        statusLabel: "PROTOTYPE · SYNTHETIC",
        alt: "Prototype architecture flow from client through API and service to data. Synthetic example, not a claimed system.",
        architecture: {
          stages: prototypeArchitectureStages,
          animate: true,
        },
      },
      {
        id: "FIG.02",
        mode: "metric-plot",
        title: "MEASUREMENT",
        selectorLabel: "MEASUREMENT",
        kind: "METRIC PLOT",
        caption:
          "Synthetic series for layout validation. Values are not measurements.",
        source: "PROTOTYPE / SYNTHETIC",
        stamp: "PROTOTYPE / SYNTHETIC DATA · NOT PROJECT EVIDENCE",
        status: "synthetic",
        statusLabel: "PROTOTYPE · SYNTHETIC DATA · NOT PROJECT EVIDENCE",
        alt: "Prototype metric plot with synthetic non-monotonic specimen values in arbitrary units. Not project evidence.",
        metric: {
          points: prototypeMetricSpecimen,
          unit: "arb.",
          xLabel: "specimen",
          yLabel: "Synthetic units · not measured",
        },
      },
      {
        id: "FIG.03",
        mode: "placeholder",
        title: "INTERFACE",
        selectorLabel: "INTERFACE",
        kind: "PRODUCT MEDIA",
        caption:
          "Reserved for a real screenshot or product frame. No media supplied.",
        source: "PROTOTYPE / NO MEDIA",
        stamp: "PROTOTYPE / NO MEDIA",
        status: "prototype",
        statusLabel: "PROTOTYPE · PLACEHOLDER PLANE",
        alt: "Prototype placeholder plane reserved for a future real product screenshot.",
        placeholderLabel: "[PLACEHOLDER]\nPRODUCT MEDIA PLANE",
      },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          index: "01",
          heading: "Overview",
          body: "[PLACEHOLDER] Overview. Prototype case-study copy — not a description of a real system.",
        },
        {
          id: "problem",
          index: "02",
          heading: "Problem",
          body: "[PLACEHOLDER] Problem. The constraint or question the work would address.",
          paragraphs: [
            "[PLACEHOLDER] Context. Setting, users, or system environment — not a real engagement.",
          ],
        },
        {
          id: "system",
          index: "03",
          heading: "System",
          body: "[PLACEHOLDER] Architecture. Structural intent for the figure below — not a real diagram.",
          paragraphs: [
            "[PLACEHOLDER] Approach. How the work would be structured, without fabricated method claims.",
          ],
        },
        {
          id: "implementation",
          index: "04",
          heading: "Implementation",
          body: "[PLACEHOLDER] Implementation. What would be built, without naming unreleased product details.",
        },
        {
          id: "evidence",
          index: "05",
          heading: "Evidence",
          body: "[PLACEHOLDER] Evaluation. How the work would be judged — no fabricated scores.",
          figureIds: ["FIG.02", "FIG.03"],
        },
        {
          id: "result",
          index: "06",
          heading: "Result",
          body: "[PLACEHOLDER] Results. Outcomes would be recorded here. No metrics invented.",
        },
        {
          id: "reflection",
          index: "07",
          heading: "Reflection",
          body: "[PLACEHOLDER] Limitations. Known bounds of the work, when real evidence exists.",
          paragraphs: [
            "[PLACEHOLDER] Learnings. What the work would change about later decisions.",
          ],
        },
      ],
    },
  },
  {
    id: "prototype-prj-02",
    docId: "PRJ-02",
    slug: "prototype-02",
    title: "[PLACEHOLDER] Project 02",
    summary:
      "[PLACEHOLDER] Short summary for a secondary index row. Prototype copy — not a real claim.",
    status: "prototype",
    technologies: ["[PLACEHOLDER] Stack", "[PLACEHOLDER] Layer"],
    composition: "media",
    prototype: true,
    readiness: "prototype",
    evidence: [
      {
        id: "FIG.01",
        mode: "placeholder",
        title: "PROJECT FRAME",
        selectorLabel: "FRAME",
        kind: "PROJECT EVIDENCE",
        caption: "Media-led index frame. Reserved for a real project image.",
        source: "PROTOTYPE / NO MEDIA",
        stamp: "PROTOTYPE / NO MEDIA",
        status: "prototype",
        statusLabel: "PROTOTYPE · PLACEHOLDER PLANE",
        alt: "Prototype placeholder plane for a future project image on PRJ-02.",
        placeholderLabel: "[PLACEHOLDER]\nPROJECT IMAGE PLANE",
      },
    ],
  },
  {
    id: "prototype-prj-03",
    docId: "PRJ-03",
    slug: "prototype-03",
    title: "[PLACEHOLDER] Project 03",
    summary:
      "[PLACEHOLDER] Short summary for a secondary index row. Prototype copy — not a real claim.",
    status: "prototype",
    technologies: ["[PLACEHOLDER] Stack"],
    composition: "text",
    prototype: true,
    readiness: "prototype",
    evidence: [
      {
        id: "FIG.01",
        mode: "placeholder",
        title: "SIDE FIGURE",
        selectorLabel: "FRAME",
        kind: "PROJECT EVIDENCE",
        caption: "Text-led index figure. Reserved for a compact evidence frame.",
        source: "PROTOTYPE / NO MEDIA",
        stamp: "PROTOTYPE / NO MEDIA",
        status: "prototype",
        statusLabel: "PROTOTYPE · PLACEHOLDER PLANE",
        alt: "Prototype placeholder side figure for PRJ-03.",
        placeholderLabel: "[PLACEHOLDER]\nEVIDENCE PLANE",
      },
    ],
  },
];

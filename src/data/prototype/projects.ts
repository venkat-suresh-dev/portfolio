import type { Project } from "@/data/projects";

const prototypeOverview =
  "[PLACEHOLDER] Overview. Prototype case-study copy — not a description of a real system.";

/**
 * PROTOTYPE portfolio projects for visual review.
 * Academic MSc work is not included here.
 */
export const prototypeProjects: readonly Project[] = [
  {
    id: "prototype-prj-01",
    docId: "PRJ-01",
    slug: "prototype-featured",
    title: "[PLACEHOLDER] Featured Project",
    summary:
      "[PLACEHOLDER] What this project is, why it matters, and what evidence would appear here. Prototype copy — not a real claim.",
    status: "in-progress",
    statusLabel: "[PLACEHOLDER] Status",
    role: "[PLACEHOLDER] Role",
    technologies: [
      "[PLACEHOLDER] Stack",
      "[PLACEHOLDER] Layer",
      "[PLACEHOLDER] Tool",
    ],
    featured: true,
    prototype: true,
    caseStudy: {
      overview: prototypeOverview,
      problem:
        "[PLACEHOLDER] Problem. The constraint or question the work would address.",
      context:
        "[PLACEHOLDER] Context. Setting, users, or system environment — not a real engagement.",
      approach:
        "[PLACEHOLDER] Approach. How the work would be structured, without fabricated method claims.",
      architecture:
        "[PLACEHOLDER] Architecture. Structural intent for the figure below — not a real diagram.",
      implementation:
        "[PLACEHOLDER] Implementation. What would be built, without naming unreleased product details.",
      evaluation:
        "[PLACEHOLDER] Evaluation. How the work would be judged — no fabricated scores.",
      results:
        "[PLACEHOLDER] Results. Outcomes would be recorded here. No metrics invented.",
      limitations:
        "[PLACEHOLDER] Limitations. Known bounds of the work, when real evidence exists.",
      learnings:
        "[PLACEHOLDER] Learnings. What the work would change about later decisions.",
      figures: [
        {
          id: "FIG. 01",
          caption: "[PLACEHOLDER] Architecture figure",
        },
        {
          id: "FIG. 02",
          caption: "[PLACEHOLDER] Evaluation figure",
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
    status: "in-progress",
    statusLabel: "[PLACEHOLDER] Status",
    technologies: ["[PLACEHOLDER] Stack", "[PLACEHOLDER] Layer"],
    prototype: true,
  },
  {
    id: "prototype-prj-03",
    docId: "PRJ-03",
    slug: "prototype-03",
    title: "[PLACEHOLDER] Project 03",
    summary:
      "[PLACEHOLDER] Short summary for a secondary index row. Prototype copy — not a real claim.",
    status: "private",
    statusLabel: "[PLACEHOLDER] Status",
    technologies: ["[PLACEHOLDER] Stack"],
    prototype: true,
  },
];

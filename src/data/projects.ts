export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "[PLACEHOLDER]",
    description:
      "[PLACEHOLDER] wrapping-check: this featured description is two to three sentences so recruiters can scan what the project does on a wide card. A longer second sentence confirms comfortable reading length without inventing a real summary. [PLACEHOLDER]",
    tech: [
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
    ],
    repoUrl: "https://example.invalid/[PLACEHOLDER]",
    liveUrl: "https://example.invalid/[PLACEHOLDER]",
    featured: true,
  },
  {
    id: "project-2",
    title: "[PLACEHOLDER]",
    description:
      "[PLACEHOLDER] wrapping-check: a second project with a live demo link and a two-sentence description for scanability. [PLACEHOLDER]",
    tech: ["[PLACEHOLDER]", "[PLACEHOLDER]", "[PLACEHOLDER]"],
    repoUrl: "https://example.invalid/[PLACEHOLDER]",
    liveUrl: "https://example.invalid/[PLACEHOLDER]",
  },
  {
    id: "project-3",
    title: "[PLACEHOLDER]",
    description:
      "[PLACEHOLDER] wrapping-check: this card has no live demo URL. The layout should still look complete with only a repository link. [PLACEHOLDER]",
    tech: ["[PLACEHOLDER]", "[PLACEHOLDER]"],
    repoUrl: "https://example.invalid/[PLACEHOLDER]",
  },
  {
    id: "project-4",
    title: "[PLACEHOLDER]",
    description:
      "[PLACEHOLDER] wrapping-check: a fourth card without a live URL, used to confirm the remaining-grid leftover cell and tag wrapping. [PLACEHOLDER]",
    tech: [
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
    ],
    repoUrl: "https://example.invalid/[PLACEHOLDER]",
  },
];

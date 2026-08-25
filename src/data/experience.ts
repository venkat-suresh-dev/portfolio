export type ExperienceEntry = {
  id: string;
  company: string;
  title: string;
  dates: string;
  location: string;
  bullets: string[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "role-1",
    company: "[PLACEHOLDER]",
    title: "[PLACEHOLDER]",
    dates: "[PLACEHOLDER]",
    location: "[PLACEHOLDER]",
    bullets: [
      "[PLACEHOLDER]",
      "[PLACEHOLDER] wrapping-check: this line is intentionally long so desktop measure and mobile wrapping can be verified without shrinking type.",
      "[PLACEHOLDER]",
      "[PLACEHOLDER] wrapping-check: a second long placeholder bullet to confirm comfortable reading length on laptop widths.",
      "[PLACEHOLDER]",
    ],
    tech: [
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
      "[PLACEHOLDER]",
    ],
  },
  {
    id: "role-2",
    company: "[PLACEHOLDER]",
    title: "[PLACEHOLDER]",
    dates: "[PLACEHOLDER]",
    location: "[PLACEHOLDER]",
    bullets: ["[PLACEHOLDER]", "[PLACEHOLDER]", "[PLACEHOLDER]"],
    tech: ["[PLACEHOLDER]", "[PLACEHOLDER]"],
  },
];

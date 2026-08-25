export type SocialLinks = {
  github: string;
  linkedin: string;
};

export type Highlight = {
  id: string;
  label: string;
  value: string;
  detail?: string;
  featured?: boolean;
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  shortIntro: string;
  location?: string;
  resumePath: string;
  email: string;
  socials: SocialLinks;
  contactHeading: string;
  contactStatement: string;
  highlights: Highlight[];
};

export const profile: Profile = {
  name: "[PLACEHOLDER]",
  initials: "[PLACEHOLDER]",
  role: "[PLACEHOLDER]",
  tagline: "[PLACEHOLDER]",
  shortIntro: "[PLACEHOLDER]",
  location: "[PLACEHOLDER]",
  // [PLACEHOLDER] — local path only; public/resume.pdf is not present yet.
  resumePath: "/resume.pdf",
  email: "[PLACEHOLDER]",
  socials: {
    github: "[PLACEHOLDER]",
    linkedin: "[PLACEHOLDER]",
  },
  contactHeading: "[PLACEHOLDER]",
  contactStatement: "[PLACEHOLDER]",
  highlights: [
    {
      id: "degree",
      label: "[PLACEHOLDER]",
      value: "[PLACEHOLDER]",
      detail: "[PLACEHOLDER]",
    },
    {
      id: "experience",
      label: "[PLACEHOLDER]",
      value: "[PLACEHOLDER]",
      detail: "[PLACEHOLDER]",
    },
    {
      id: "projects",
      label: "[PLACEHOLDER]",
      value: "[PLACEHOLDER]",
      detail: "[PLACEHOLDER]",
    },
    {
      id: "gate-rank",
      label: "[PLACEHOLDER] GATE AIR",
      value: "[PLACEHOLDER] 340",
      detail: "[PLACEHOLDER]",
      featured: true,
    },
  ],
};

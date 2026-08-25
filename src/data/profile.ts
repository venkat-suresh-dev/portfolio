export type SocialLinks = {
  github: string;
  linkedin: string;
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  resumePath: string;
  email: string;
  socials: SocialLinks;
};

export const profile: Profile = {
  name: "[PLACEHOLDER]",
  initials: "[PLACEHOLDER]",
  role: "[PLACEHOLDER]",
  // [PLACEHOLDER] — local path only; public/resume.pdf is not present yet.
  resumePath: "/resume.pdf",
  email: "[PLACEHOLDER]",
  socials: {
    github: "[PLACEHOLDER]",
    linkedin: "[PLACEHOLDER]",
  },
};

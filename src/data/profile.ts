export type Profile = {
  name: string;
  initials: string;
  discipline: string;
  summary?: string;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  availability?: string;
  focus?: readonly string[];
  timezone?: string;
};

export const profile: Profile = {
  name: "Venkataramanan Suresh",
  initials: "VS",
  discipline: "Full Stack Developer · AI Engineer",
  location: "Chennai, India",
  github: "https://github.com/venkat-suresh-dev",
};

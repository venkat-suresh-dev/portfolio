export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  dates: string;
  location: string;
  details?: string[];
};

export type AchievementEntry = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  year: string;
  description: string;
  featured: boolean;
};

export const education: EducationEntry[] = [
  {
    id: "msc-qmul",
    institution: "Queen Mary University of London",
    degree: "MSc Big Data Science",
    dates: "[PLACEHOLDER]",
    location: "[PLACEHOLDER]",
  },
];

export const achievements: AchievementEntry[] = [
  {
    id: "gate-air-340",
    title: "GATE AI/ML",
    value: "340",
    subtitle: "All-India Rank",
    year: "[PLACEHOLDER]",
    description:
      "GATE is a highly competitive national postgraduate entrance exam in India.",
    featured: true,
  },
];

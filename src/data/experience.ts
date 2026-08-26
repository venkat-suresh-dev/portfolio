import type { Metric } from "./types";

export type { Metric };

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  impact?: string;
  metrics?: readonly Metric[];
  details?: readonly string[];
  technologies?: readonly string[];
};

/** Empty until verified roles are supplied. */
export const experience: readonly ExperienceEntry[] = [];

import type { Metric } from "./types";

export type { Metric };

export type ExperienceEmphasis = "lead" | "standard" | "quiet";

export type ExperienceEntry = {
  id: string;
  docId?: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  impact?: string;
  metrics?: readonly Metric[];
  details?: readonly string[];
  technologies?: readonly string[];
  emphasis?: ExperienceEmphasis;
  prototype?: boolean;
};

/** Empty until verified roles are supplied. */
export const experience: readonly ExperienceEntry[] = [];

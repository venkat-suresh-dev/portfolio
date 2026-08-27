import { SHOW_PROTOTYPE_CONTENT } from "@/data/prototype/flag";
import { prototypeContact } from "@/data/prototype/contact";
import { prototypeExperience } from "@/data/prototype/experience";
import {
  prototypeClock,
  prototypeProfileGaps,
} from "@/data/prototype/profile";
import { prototypeProjects } from "@/data/prototype/projects";
import { experience as verifiedExperience } from "@/data/experience";
import { profile as verifiedProfile, type Profile } from "@/data/profile";
import { projects as verifiedProjects } from "@/data/projects";

export { SHOW_PROTOTYPE_CONTENT };

export type ResolvedProfile = Profile & {
  timezoneLabel?: string;
};

export const resolvedProfile: ResolvedProfile = SHOW_PROTOTYPE_CONTENT
  ? {
      ...verifiedProfile,
      summary: verifiedProfile.summary ?? prototypeProfileGaps.summary,
      availability:
        verifiedProfile.availability ?? prototypeProfileGaps.availability,
      focus: verifiedProfile.focus ?? prototypeProfileGaps.focus,
      timezoneLabel: prototypeProfileGaps.timezoneLabel,
    }
  : verifiedProfile;

export const resolvedExperience = SHOW_PROTOTYPE_CONTENT
  ? verifiedExperience.length > 0
    ? verifiedExperience
    : prototypeExperience
  : verifiedExperience;

export const resolvedProjects = SHOW_PROTOTYPE_CONTENT
  ? verifiedProjects.length > 0
    ? verifiedProjects
    : prototypeProjects
  : verifiedProjects;

export const resolvedContact = SHOW_PROTOTYPE_CONTENT
  ? prototypeContact
  : null;

export const resolvedClock = SHOW_PROTOTYPE_CONTENT ? prototypeClock : null;

export function getProjectBySlug(slug: string) {
  return resolvedProjects.find((project) => project.slug === slug);
}

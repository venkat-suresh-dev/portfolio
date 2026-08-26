import { experience } from "./experience";
import { projects } from "./projects";

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

/**
 * Intended IA. Section numbers stay stable even when a collection is empty.
 * §01 Profile · §02 Experience · §03 Education · §04 Projects ·
 * §05 Certifications · §06 Contact
 */
export const navigationItems: readonly NavigationItem[] = [
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/**
 * R2 empty-state decision (Experience / Projects):
 * Hide nav items whose section is not rendered. Do not leave hash links
 * that resolve to nowhere, and do not render fake empty-section copy.
 * When verified entries exist, the matching nav item returns automatically.
 */
export function getVisibleNavigationItems(): readonly NavigationItem[] {
  return navigationItems.filter((item) => {
    if (item.id === "experience") return experience.length > 0;
    if (item.id === "projects") return projects.length > 0;
    return true;
  });
}

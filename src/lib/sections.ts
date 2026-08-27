export type WayfindingSection = {
  id: string;
  label: string;
  index: string;
  href: string;
};

export const WAYFINDING_SECTIONS: readonly WayfindingSection[] = [
  { id: "hero", label: "Profile", index: "§01", href: "/#hero" },
  { id: "experience", label: "Experience", index: "§02", href: "/#experience" },
  { id: "education", label: "Education", index: "§03", href: "/#education" },
  { id: "projects", label: "Projects", index: "§04", href: "/#projects" },
  {
    id: "certifications",
    label: "Certifications",
    index: "§05",
    href: "/#certifications",
  },
  { id: "contact", label: "Contact", index: "§06", href: "/#contact" },
];

export const NAV_SECTION_IDS = [
  "experience",
  "education",
  "projects",
  "certifications",
  "contact",
] as const;

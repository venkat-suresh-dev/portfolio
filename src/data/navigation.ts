export type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

export const navigationItems: readonly NavigationItem[] = [
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "contact", label: "Contact", href: "#contact" },
];

import { Hero } from "@/components/sections/Hero";

const placeholderSections = [
  { id: "experience", label: "[PLACEHOLDER] EXPERIENCE" },
  { id: "education", label: "[PLACEHOLDER] EDUCATION" },
  { id: "projects", label: "[PLACEHOLDER] PROJECTS" },
  { id: "certifications", label: "[PLACEHOLDER] CERTIFICATIONS" },
  { id: "contact", label: "[PLACEHOLDER] CONTACT" },
] as const;

export default function Home() {
  return (
    <main>
      <Hero />

      {placeholderSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-label`}
          className="flex min-h-[85vh] scroll-mt-20 items-center px-4 sm:px-6"
        >
          <h2
            id={`${section.id}-label`}
            className="font-mono text-xs tracking-widest text-text-muted"
          >
            {section.label}
          </h2>
        </section>
      ))}
    </main>
  );
}

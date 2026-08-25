const placeholderSections = [
  { id: "hero", label: "[PLACEHOLDER] HERO" },
  { id: "experience", label: "[PLACEHOLDER] EXPERIENCE" },
  { id: "education", label: "[PLACEHOLDER] EDUCATION" },
  { id: "projects", label: "[PLACEHOLDER] PROJECTS" },
  { id: "certifications", label: "[PLACEHOLDER] CERTIFICATIONS" },
  { id: "contact", label: "[PLACEHOLDER] CONTACT" },
] as const;

export default function Home() {
  return (
    <main>
      {placeholderSections.map((section) => {
        const Heading = section.id === "hero" ? "h1" : "h2";

        return (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-label`}
            className="flex min-h-[85vh] scroll-mt-20 items-center px-4 sm:px-6"
          >
            <Heading
              id={`${section.id}-label`}
              className="font-mono text-xs tracking-widest text-text-muted"
            >
              {section.label}
            </Heading>
          </section>
        );
      })}
    </main>
  );
}

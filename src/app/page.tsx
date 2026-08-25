import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Certifications />

      <section
        id="contact"
        aria-labelledby="contact-label"
        className="flex min-h-[85vh] scroll-mt-20 items-center px-4 sm:px-6"
      >
        <h2
          id="contact-label"
          className="font-mono text-xs tracking-widest text-text-muted"
        >
          [PLACEHOLDER] CONTACT
        </h2>
      </section>
    </main>
  );
}

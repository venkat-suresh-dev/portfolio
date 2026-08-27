import { FieldTeaser } from "@/components/field/FieldTeaser";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <FieldTeaser />
      <Certifications />
      <Contact />
    </main>
  );
}

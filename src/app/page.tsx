import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      <Hero />
      {experience.length > 0 ? <Experience /> : null}
      <Education />
      {projects.length > 0 ? <Projects /> : null}
      <Certifications />
      <Contact />
    </main>
  );
}

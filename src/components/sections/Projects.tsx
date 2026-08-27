import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { SecondaryProject } from "@/components/projects/SecondaryProject";
import {
  resolvedProjects,
  SHOW_PROTOTYPE_CONTENT,
} from "@/data/resolved";

export function Projects() {
  if (resolvedProjects.length === 0) {
    return null;
  }

  const featured = resolvedProjects.filter((project) => project.featured);
  const secondary = resolvedProjects.filter((project) => !project.featured);
  const featuredCount = featured.length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="page-section page-section--projects"
    >
      <div className="page-shell">
        <header className="projects-opening">
          <p className="projects-opening-index">§04</p>
          <div className="projects-opening-copy">
            <h2 id="projects-heading" className="projects-opening-title">
              Projects
            </h2>
            <p className="projects-opening-intent">Built systems</p>
          </div>
        </header>
        {SHOW_PROTOTYPE_CONTENT ? (
          <p className="projects-opening-note">
            PROTOTYPE · Index fixtures for the final project system. Not
            production evidence.
          </p>
        ) : null}

        <div className="project-stage">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
            />
          ))}

          {secondary.length > 0 ? (
            <ul className="project-index">
              {secondary.map((project, index) => (
                <li key={project.id} className="min-w-0">
                  <SecondaryProject
                    project={project}
                    index={featuredCount + index}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

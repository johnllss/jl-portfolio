import { Link } from "react-router-dom";
import { Async } from "../components/Async";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHead } from "../components/ui";
import type { Profile, Project } from "../types";

export function Home() {
  return (
    <>
      <Async<Profile> path="/api/profile">
        {(p) => (
          <section className="hero">
            <div className="shapes" aria-hidden>
              <div className="shape shape-pill" />
              <div className="shape shape-slab" />
              <div className="shape shape-tab" />
              <div className="shape shape-disc" />
            </div>
            <div className="container">
              <div className="hero-copy">
                <span className="label eyebrow">{p.role}</span>
                <h1 className="display-lg">{p.name}</h1>
                <p className="lede">{p.tagline}</p>
                <div className="btn-row">
                  <Link to="/projects" className="btn btn-primary">View projects</Link>
                  <a href={p.resumeUrl} className="btn btn-ghost" download>Download resume</a>
                  <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
                </div>
              </div>
              <div className="facts">
                {p.facts.map((f) => (
                  <div key={f.label} className="pill">
                    <span className="caption muted">{f.label}</span>
                    <strong>{f.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </Async>

      <Async<Project[]> path="/api/projects">
        {(projects) => (
          <section className="container section">
            <SectionHead
              eyebrow="Selected work"
              title="Projects"
              action={<Link to="/projects" className="body-sm">All projects →</Link>}
            />
            <div className="grid-2">
              {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>
        )}
      </Async>
    </>
  );
}

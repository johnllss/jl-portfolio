import { Async } from "../components/Async";
import { ProjectCard } from "../components/ProjectCard";
import { PageHead, SectionHead } from "../components/ui";
import type { Project } from "../types";

// online course certificates
const CERTIFICATES = [
  {
    title: "Learn JavaScript",
    provider: "Scrimba",
    url: "https://scrimba.com/learn-javascript-c0v;cert2uNjfKA1KdcMDFtQnjtaGfBTW8EgEsZ2Det",
  },
  {
    title: "Learn HTML and CSS",
    provider: "Scrimba",
    url: "https://scrimba.com/certificate-cert2uNjfKA1KdcMDFtQnjtaFAtLDb4wUbXnpg8",
  },
];

// TODO: other academic work samples
// put each image in client/public/...
//   { title: "Paper or report title", caption: "One line on what it is", image: "/report-page-1.png" }
//   { title: "Research / significant report page", caption: "...", image: "/research-page.png" }
//   { title: "Group work or presentation photo", caption: "...", image: "/group-presentation.jpg" }
const OTHER_WORK: { title: string; caption: string; image: string }[] = [];

export function Projects() {
  return (
    <>
      <PageHead
        title="Projects"
        lede="Academic team projects I'm proud of. Each one has a case study with my role, the stack and what I learned."
      />
      <Async<Project[]> path="/api/projects">
        {(projects) => (
          <section className="container">
            <div className="grid-2">
              {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>
        )}
      </Async>

      <section className="container section">
        <SectionHead eyebrow="Online courses" title="Certificates" />
        <div className="grid-3">
          {CERTIFICATES.map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noreferrer" className="card card-link stack">
              <span className="caption" style={{ color: "var(--accent-2)" }}>{c.provider}</span>
              <h3 className="heading-md">{c.title}</h3>
              <span className="body-sm">View certificate ↗</span>
            </a>
          ))}
        </div>
      </section>

      {OTHER_WORK.length > 0 && (
        <section className="container section">
          <SectionHead eyebrow="More academic work" title="Samples & artifacts" />
          <div className="shot-row">
            {OTHER_WORK.map((w) => (
              <figure key={w.image} style={{ margin: 0 }} className="stack">
                <img src={w.image} alt={w.title} className="shot" style={{ borderRadius: "var(--radius-lg)", objectFit: "cover" }} />
                <figcaption>
                  <strong className="body-sm">{w.title}</strong>
                  <p className="caption muted">{w.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

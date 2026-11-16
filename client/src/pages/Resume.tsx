import { Async } from "../components/Async";
import { PageHead, SectionHead, SkillChip } from "../components/ui";
import type { Profile, Project } from "../types";

export function Resume() {
  return (
    <>
      <PageHead title="Resume" lede="A web version of my resume. The PDF has the full layout." />
      <Async<Profile> path="/api/profile">
        {(p) => (
          <section className="container">
            <div className="btn-row">
              <a className="btn btn-primary" href={p.resumeUrl} download>Download PDF</a>
              <a className="btn btn-ghost" href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
              <a className="btn btn-ghost" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>

            <div className="card stack" style={{ marginTop: "var(--space-6)" }}>
              <div>
                <h2 className="heading-lg">{p.name}</h2>
                <p className="muted">{p.role}</p>
                <p className="body-sm muted">{p.location} · {p.email}</p>
              </div>
              <p>{p.summary}</p>
            </div>

            <div className="section">
              <SectionHead title="Education" />
              <div className="stack">
                {p.education.map((e) => (
                  <div key={e.school} className="card">
                    <span className="caption" style={{ color: "var(--accent-2)" }}>{e.years}</span>
                    <h3 className="heading-sm">{e.school}</h3>
                    <p className="body-sm muted">{e.program}</p>
                  </div>
                ))}
              </div>
            </div>

            <ProjectsBlock />

            <div className="section" style={{ paddingBottom: 0 }}>
              <SectionHead title="Skills" />
              <div className="stack">
                {p.skills.map((g) => (
                  <div key={g.group}>
                    <h3 className="label muted" style={{ marginBottom: "var(--space-2)" }}>{g.group}</h3>
                    <div className="tags">{g.items.map((s) => <SkillChip key={s} name={s} />)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </Async>
    </>
  );
}

function ProjectsBlock() {
  return (
    <Async<Project[]> path="/api/projects">
      {(projects) => (
        <div className="section">
          <SectionHead title="Academic projects" />
          <div className="stack">
            {projects.map((pr) => (
              <div key={pr.slug} className="card stack">
                <div>
                  <span className="caption" style={{ color: "var(--accent-2)" }}>{pr.period}</span>
                  <h3 className="heading-sm">{pr.title}</h3>
                  <p className="body-sm muted">{pr.role} · {pr.team}</p>
                </div>
                <ul className="bullets body-sm">{pr.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </Async>
  );
}

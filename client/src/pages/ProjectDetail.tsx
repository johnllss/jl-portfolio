import { Link, useParams } from "react-router-dom";
import { Async } from "../components/Async";
import { isPlaceholder, PhBox, SectionHead, Tags, Txt } from "../components/ui";
import type { Project } from "../types";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) throw new Error("ProjectDetail rendered without a :slug route param");

  return (
    <Async<Project> path={`/api/projects/${encodeURIComponent(slug)}`}>
      {(p) => (
        <article className="container section" style={{ paddingTop: "var(--space-8)" }}>
          <Link to="/projects" className="back">← All projects</Link>
          <span className="caption" style={{ color: "var(--accent-2)" }}>{p.period}</span>
          <h1 className="display-md" style={{ margin: "var(--space-2) 0 var(--space-3)" }}>{p.title}</h1>
          <p className="muted">{p.role} · {p.team}</p>

          <div className="btn-row" style={{ margin: "var(--space-5) 0 var(--space-6)" }}>
            <a className="btn btn-primary" href={p.repoUrl} target="_blank" rel="noreferrer">Source code</a>
            {isPlaceholder(p.liveUrl) ? (
              <span className="btn btn-ghost ph"><Txt>{p.liveUrl}</Txt></span>
            ) : (
              <a className="btn btn-ghost" href={p.liveUrl} target="_blank" rel="noreferrer">Live demo</a>
            )}
          </div>

          <div className="shot-row">
            {p.images.map((img) =>
              isPlaceholder(img) ? (
                <PhBox key={img} label={img} className="shot" />
              ) : (
                <img key={img} src={img} alt={`${p.title} screenshot`} className="shot" style={{ borderRadius: "var(--radius-lg)", objectFit: "cover" }} />
              ),
            )}
          </div>

          <section className="section" style={{ paddingBottom: 0 }}>
            <SectionHead title="Overview" />
            <p style={{ maxWidth: 680 }}>{p.summary}</p>
          </section>

          <section className="section" style={{ paddingBottom: 0 }}>
            <SectionHead title="Tech stack" />
            <Tags items={p.stack} />
          </section>

          <section className="section" style={{ paddingBottom: 0 }}>
            <SectionHead title="What I did" />
            <ul className="bullets" style={{ maxWidth: 680 }}>
              {p.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </section>

          <section className="section" style={{ paddingBottom: 0 }}>
            <SectionHead title="Reflection" />
            <p style={{ maxWidth: 680 }}><Txt>{p.reflection}</Txt></p>
          </section>
        </article>
      )}
    </Async>
  );
}

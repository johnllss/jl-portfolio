import { Async } from "../components/Async";
import { PageHead, PhBox, SectionHead, SkillChip, Txt } from "../components/ui";
import type { Profile } from "../types";

export function About() {
  return (
    <Async<Profile> path="/api/profile">
      {(p) => (
        <>
          <PageHead title="About me" lede={p.summary} />

          <section className="container section" style={{ paddingTop: 0 }}>
            <div className="grid-2" style={{ alignItems: "start" }}>
              {p.photoUrl ? (
                <img src={p.photoUrl} alt={`Portrait of ${p.name}`} style={{ borderRadius: "var(--radius-lg)" }} />
              ) : (
                <PhBox label="[Your photo: add /me.jpg to client/public and set photoUrl]" className="shot" />
              )}
              <div className="stack">
                <h2 className="heading-md">Self-introduction</h2>
                {p.intro.map((para, i) => (
                  <p key={i}><Txt>{para}</Txt></p>
                ))}
                <p className="body-sm muted">{p.location}</p>
              </div>
            </div>
          </section>

          <section className="container section">
            <SectionHead eyebrow="Toolbox" title="Skills" />
            <div className="grid-3">
              {p.skills.map((g) => (
                <div key={g.group} className="card stack">
                  <h3 className="heading-sm">{g.group}</h3>
                  <div className="tags">
                    {g.items.map((s) => <SkillChip key={s} name={s} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="container section">
            <SectionHead eyebrow="Journey" title="Education & training" />
            <div className="timeline">
              {p.education.map((e) => (
                <div key={e.school} className="timeline-item">
                  <span className="caption" style={{ color: "var(--accent-2)" }}>{e.years}</span>
                  <h3 className="heading-sm">{e.school}</h3>
                  <p className="body-sm muted">{e.program}</p>
                  <ul>{e.notes.map((n) => <li key={n}>{n}</li>)}</ul>
                </div>
              ))}
              {p.certifications.map((c) => (
                <div key={c.title} className="timeline-item">
                  <span className="caption" style={{ color: "var(--accent-2)" }}>
                    {c.year}{c.status ? ` · ${c.status}` : ""}
                  </span>
                  <h3 className="heading-sm">{c.title}</h3>
                  <p className="body-sm muted">{c.provider}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="container section">
            <SectionHead eyebrow="Off the clock" title="Hobbies & interests" />
            <div className="grid-3">
              {p.hobbies.map((h) => (
                <div key={h.title} className="card stack">
                  <h3 className="heading-sm">{h.title}</h3>
                  <p className="body-sm muted"><Txt>{h.detail}</Txt></p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </Async>
  );
}

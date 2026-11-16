import { Link } from "react-router-dom";
import { Async } from "../components/Async";
import { PageHead, PhBox, Tags, Txt } from "../components/ui";
import type { WorkSample } from "../types";

export function Experience() {
  return (
    <>
      <PageHead
        title="Experience"
        lede="Where I am in my career right now."
      />
      <Async<WorkSample[]> path="/api/work-samples">
        {(items) =>
          items.length === 0 ? (
            <section className="container">
              <div className="card stack">
                <h2 className="heading-md">No work experience yet</h2>
                <p className="muted" style={{ maxWidth: 620 }}>
                  I'm a student looking for my first internship or entry-level role. Until then, my team projects
                  show how I work: building features, testing, and shipping with others.
                </p>
                <div className="btn-row">
                  <Link to="/projects" className="btn btn-primary">See my projects</Link>
                  <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
                </div>
              </div>
            </section>
          ) : (
          <section className="container">
            <div className="grid-3">
              {items.map((w) => (
                <article key={w.id} className="card stack">
                  <PhBox label={w.image} className="shot" />
                  <div>
                    <span className="label" style={{ color: "var(--accent-2)" }}><Txt>{w.type}</Txt></span>
                    <h3 className="heading-md"><Txt>{w.title}</Txt></h3>
                    <p className="caption muted"><Txt>{w.organization}</Txt> · <Txt>{w.period}</Txt></p>
                  </div>
                  <p className="body-sm muted"><Txt>{w.description}</Txt></p>
                  <Tags items={w.skills} />
                </article>
              ))}
            </div>
          </section>
          )
        }
      </Async>
    </>
  );
}

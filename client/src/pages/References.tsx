import { Link } from "react-router-dom";
import { Async } from "../components/Async";
import { PageHead, SectionHead, Txt } from "../components/ui";
import type { Reference, Testimonial } from "../types";

interface Payload {
  references: Reference[];
  testimonials: Testimonial[];
}

export function References() {
  return (
    <>
      <PageHead title="References" lede="People who can speak to my work. Letters of recommendation are available on request." />
      <Async<Payload> path="/api/references">
        {({ references, testimonials }) =>
          references.length === 0 && testimonials.length === 0 ? (
            <section className="container">
              <div className="card stack">
                <h2 className="heading-md">References available on request</h2>
                <p className="muted" style={{ maxWidth: 620 }}>
                  I don't have references or testimonials listed yet. If you'd like to speak with someone who has
                  worked with me, message me and I'll connect you.
                </p>
                <div className="btn-row">
                  <Link to="/contact" className="btn btn-primary">Get in touch</Link>
                </div>
              </div>
            </section>
          ) : (
          <>
            {references.length > 0 && (
            <section className="container">
              <div className="grid-2">
                {references.map((r, i) => (
                  <div key={i} className="card stack">
                    <div>
                      <h3 className="heading-md"><Txt>{r.name}</Txt></h3>
                      <p className="body-sm muted"><Txt>{r.title}</Txt>, <Txt>{r.organization}</Txt></p>
                    </div>
                    <p className="body-sm"><Txt>{r.relationship}</Txt></p>
                    <p className="body-sm muted"><Txt>{r.email}</Txt> · <Txt>{r.phone}</Txt></p>
                  </div>
                ))}
              </div>
            </section>
            )}

            {testimonials.length > 0 && (
            <section className="container section">
              <SectionHead eyebrow="In their words" title="Testimonials" />
              <div className="grid-2">
                {testimonials.map((t, i) => (
                  <figure key={i} className="card quote stack" style={{ margin: 0 }}>
                    <blockquote style={{ margin: 0 }}><Txt>{t.quote}</Txt></blockquote>
                    <figcaption className="body-sm muted">
                      <Txt>{t.author}</Txt>, <Txt>{t.role}</Txt>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
            )}
          </>
          )
        }
      </Async>
    </>
  );
}

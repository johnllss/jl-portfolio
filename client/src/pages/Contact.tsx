import { useState } from "react";
import type { FormEvent } from "react";
import { Async } from "../components/Async";
import { PageHead } from "../components/ui";
import type { Profile } from "../types";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
      form.reset();
      setStatus({ kind: "ok" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Unknown error" });
    }
  }

  return (
    <>
      <PageHead title="Contact" lede="Open to internships and entry-level software roles. Send a message or find me online." />
      <section className="container">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <form className="card stack" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">NAME</label>
              <input id="name" name="name" placeholder="Your name" required minLength={2} maxLength={100} />
            </div>
            <div className="field">
              <label htmlFor="email">EMAIL</label>
              <input id="email" name="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="field">
              <label htmlFor="message">MESSAGE</label>
              <textarea id="message" name="message" placeholder="Tell me about the role or project…" required minLength={10} maxLength={2000} />
            </div>
            {/* Honeypot: hidden from people, filled in by bots */}
            <div className="hp" aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Sending…" : "Send message"}
            </button>
            {status.kind === "ok" && <p className="notice notice-ok" role="status">Thanks! Your message was sent.</p>}
            {status.kind === "error" && <p className="notice notice-err" role="alert">{status.message}</p>}
          </form>

          <Async<Profile> path="/api/profile">
            {(p) => (
              <div className="card stack">
                <h2 className="heading-md">Elsewhere</h2>
                <ul className="stack body-sm">
                  <li><span className="muted">Email</span><br /><a href={`mailto:${p.email}`}>{p.email}</a></li>
                  <li><span className="muted">LinkedIn</span><br /><a href={p.linkedin} target="_blank" rel="noreferrer">{p.linkedin}</a></li>
                  <li><span className="muted">GitHub</span><br /><a href={p.github} target="_blank" rel="noreferrer">{p.github}</a></li>
                  <li><span className="muted">Based in</span><br />{p.location}</li>
                </ul>
              </div>
            )}
          </Async>
        </div>
      </section>
    </>
  );
}

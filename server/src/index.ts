import express from "express";
import type { Request } from "express";
import { appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { profile, projects, workSamples, references, testimonials } from "./data";
import type { ContactBody } from "./types";

const PORT = Number(process.env.PORT ?? 5001);
const app = express();

// behind a proxy, this lets req.ip be the real visitor IP.
app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));

// >>>>> read-only content endpoints <<<<<
app.get("/api/profile", (_req, res) => res.json(profile));
app.get("/api/projects", (_req, res) => res.json(projects));
app.get("/api/projects/:slug", (req, res) => {
  const project = projects.find((p) => p.slug === req.params.slug);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(project);
});
app.get("/api/work-samples", (_req, res) => res.json(workSamples));
app.get("/api/references", (_req, res) => res.json({ references, testimonials }));

// >>>>> Contact form <<<<<
const WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_PER_WINDOW = 5; // 5 max msgs
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body: unknown): { ok: true; data: ContactBody } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Invalid request body" };
  const { name, email, message, website } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100)
    return { ok: false, error: "Name must be 2–100 characters" };
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200)
    return { ok: false, error: "Enter a valid email address" };
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 2000)
    return { ok: false, error: "Message must be 10–2000 characters" };

  return {
    ok: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      website: typeof website === "string" ? website : undefined,
    },
  };
}

app.post("/api/contact", async (req: Request, res) => {
  const result = validateContact(req.body);
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }

  // bots fill hidden fields. Pretend success so they don't retry.
  if (result.data.website) {
    res.status(201).json({ ok: true });
    return;
  }

  if (isRateLimited(req.ip ?? "unknown")) {
    res.status(429).json({ error: "Too many messages. Try again later." });
    return;
  }

  const entry = {
    receivedAt: new Date().toISOString(),
    name: result.data.name,
    email: result.data.email,
    message: result.data.message,
  };

  try {
    await appendFile(path.join(import.meta.dirname, "..", "messages.jsonl"), JSON.stringify(entry) + "\n");
    console.log("New contact message:", entry);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Failed to store contact message:", err);
    res.status(500).json({ error: "Could not save your message. Please email me directly." });
  }
});

// unknown API routes get JSON, not the React app.
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// >>>>> Production: serve the built React app <<<<<
const clientDist = path.join(import.meta.dirname, "..", "..", "client", "dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // express 5 wildcard syntax. this lets React Router handle deep links like /projects/duck-forum.
  app.get("/{*splat}", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

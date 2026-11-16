import { Link } from "react-router-dom";
import type { Project } from "../types";
import { Tags } from "./ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="card card-link stack">
      <span className="caption tag-accent" style={{ color: "var(--accent-2)" }}>{project.period}</span>
      <h3 className="heading-md">{project.title}</h3>
      <p className="body-sm muted">{project.summary}</p>
      <Tags items={project.stack.slice(0, 4)} />
      <span className="body-sm">View case study →</span>
    </Link>
  );
}

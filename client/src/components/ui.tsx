import type { ReactNode } from "react";
import {
  SiCss, SiExpress, SiFlask, SiGit, SiGithub, SiHtml5, SiJavascript,
  SiMongodb, SiMysql, SiNodedotjs, SiPython, SiReact, SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const isPlaceholder = (s: string) => s.trim().startsWith("[");

export function Txt({ children, className }: { children: string; className?: string }) {
  const cls = [className, isPlaceholder(children) ? "ph" : ""].filter(Boolean).join(" ");
  return <span className={cls || undefined}>{children}</span>;
}

export function PhBox({ label, className }: { label: string; className?: string }) {
  return <div className={`ph-box ${className ?? ""}`}>{label}</div>;
}

export function SectionHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <span className="label eyebrow">{eyebrow}</span>}
        <h2 className="heading-lg">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function PageHead({ title, lede }: { title: string; lede?: string }) {
  return (
    <header className="container page-head">
      <h1 className="display-md">{title}</h1>
      {lede && <p>{lede}</p>}
    </header>
  );
}

export function Tags({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <div className="tags">
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className={`tag ${accent ? "tag-accent" : ""} ${isPlaceholder(t) ? "ph" : ""}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

const ICONS: Record<string, IconType> = {
  JavaScript: SiJavascript, TypeScript: SiTypescript, React: SiReact, "Node.js": SiNodedotjs,
  Express: SiExpress, MongoDB: SiMongodb, MySQL: SiMysql, Flask: SiFlask, HTML: SiHtml5,
  CSS: SiCss, Python: SiPython, Git: SiGit, GitHub: SiGithub,
};

export function SkillChip({ name }: { name: string }) {
  const Icon = ICONS[name];
  return (
    <span className="tag chip-icon">
      {Icon && <Icon aria-hidden />}
      {name}
    </span>
  );
}

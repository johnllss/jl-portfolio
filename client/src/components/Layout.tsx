import { useEffect, useState } from "react";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMoon, FiSun } from "react-icons/fi";

type Theme = "dark" | "light";

function readTheme(): Theme {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark"; // storage can be blocked; dark is the design system default
  }
}

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Resume" },
  { to: "/references", label: "References" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage blocked: theme just won't persist */
    }
  }, [theme]);

  return (
    <>
      <nav className="nav" aria-label="Main">
        <div className="container nav-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark">JL</span> John Lloyd Suñga
          </NavLink>
          <div className="nav-links">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} John Lloyd Suñga. Career e-Portfolio.</span>
          <div className="footer-links">
            <a href="https://github.com/johnllss" target="_blank" rel="noreferrer">
              <FiGithub aria-hidden /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/john-lloyd-suñga" target="_blank" rel="noreferrer">
              <FiLinkedin aria-hidden /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
      <ScrollRestoration />
    </>
  );
}

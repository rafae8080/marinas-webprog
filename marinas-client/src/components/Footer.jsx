import { Link } from "react-router-dom";
import { contact, coords } from "../data/site";

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";
const linkClass = "text-ink underline-offset-4 transition-colors hover:text-accent hover:underline";

const Footer = () => (
  <footer className="border-t border-line bg-bg">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
      <div>
        <p className={label}>
          {coords.label} · {coords.place}
        </p>
        <a href={`mailto:${contact.email}`} className={`mt-3 inline-block break-all font-display text-xl font-medium tracking-[-0.02em] sm:text-2xl ${linkClass}`}>
          {contact.email}
        </a>
      </div>

      <ul className="flex flex-wrap items-start gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.12em] md:justify-end">
        <li>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
        </li>
        <li>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
        </li>
        <li>
          <a href={contact.sourceRepo} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Source on GitHub
          </a>
        </li>
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-line pt-4 md:col-span-2">
        <p className={label}>
          © {new Date().getFullYear()} {contact.name}
        </p>
        <Link to="/auth/signin" className="font-mono text-[11px] lowercase tracking-[0.12em] text-muted hover:text-ink">
          admin
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;

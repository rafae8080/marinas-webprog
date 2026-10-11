import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { coords } from "../data/site";
import ThemeToggle from "./ThemeToggle";

const links = [
  { code: "01", label: "Work", to: "/work" },
  { code: "02", label: "About", to: "/about" },
  { code: "03", label: "Notes", to: "/notes" },
  { code: "04", label: "Contact", to: "/#contact", hash: true },
];

const linkBase = "relative py-1 font-mono text-xs uppercase tracking-[0.12em] transition-colors";
const activeLine =
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent after:content-['']";

const desktopClass = ({ isActive }) =>
  `${linkBase} ${isActive ? `text-ink ${activeLine}` : "text-muted hover:text-ink"}`;

const Logo = ({ onClick }) => (
  <Link to="/" onClick={onClick} className="flex shrink-0 items-center" aria-label="Rafael Marinas, home">
    <img src="/raf_logo.png" alt="" width="150" height="50" className="h-9 w-auto night:invert sm:h-10" />
  </Link>
);

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Full-screen "map legend" menu for small screens
const MobileMenu = ({ onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const focusables = () => [...panel.querySelectorAll(focusableSelector)];
    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: wrap Tab / Shift+Tab inside the panel
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg px-4 pb-8 pt-3 md:hidden"
    >
      <div className="flex items-center justify-between">
        <Logo onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 border border-line px-4 font-mono text-xs uppercase tracking-[0.12em] text-ink"
        >
          Close
        </button>
      </div>

      <div className="mt-10 border border-line bg-surface">
        <p className="border-b border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          Legend
        </p>
        <nav aria-label="Main">
          <ul>
            {links.map((link) => (
              <li key={link.to} className="border-b border-line last:border-b-0">
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex min-h-14 items-center gap-4 px-4 font-display text-2xl font-medium tracking-[-0.02em] ${
                      isActive && !link.hash ? "text-accent" : "text-ink"
                    }`
                  }
                >
                  <span className="font-mono text-[11px] tracking-[0.12em] text-muted">{link.code}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ThemeToggle />
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{coords.label}</span>
      </div>
    </div>
  );
};

const NavBar = () => {
  const location = useLocation();
  // The menu belongs to the page it was opened on, so any navigation (links, back button) closes it
  const [openedAt, setOpenedAt] = useState(null);
  const open = openedAt === location.key;
  const menuButtonRef = useRef(null);

  const closeMenu = useCallback(() => {
    setOpenedAt(null);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {links.map((link, i) => (
            <span key={link.to} className="flex items-center gap-6">
              {i > 0 && (
                <span aria-hidden="true" className="font-mono text-xs text-line">
                  ·
                </span>
              )}
              {link.hash ? (
                <Link to={link.to} className={`${linkBase} text-muted hover:text-ink`}>
                  {link.label}
                </Link>
              ) : (
                <NavLink to={link.to} className={desktopClass}>
                  {link.label}
                </NavLink>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpenedAt(location.key)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="min-h-11 border border-line px-4 font-mono text-xs uppercase tracking-[0.12em] text-ink md:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {open && <MobileMenu onClose={closeMenu} />}
    </header>
  );
};

export default NavBar;

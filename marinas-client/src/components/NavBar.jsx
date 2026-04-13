import { NavLink } from "react-router-dom";
import Button from "./Button";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition mb-2 mt-2 ",
    isActive
      ? "border-stone-300 bg-stone-800 text-stone-50"
      : "border-transparent text-stone-900 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-stone-300 bg-linear-to-b from-stone-100 to-stone-300 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-1">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/raf_logo.png" alt="Logo" className="h-12.5 w-37.5" />
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Button to="/auth/signin">Sign In</Button>
      </div>
    </header>
  );
};

export default NavBar;

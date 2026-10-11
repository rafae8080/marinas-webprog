import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import RadyoWidget from "../components/radyo/RadyoWidget";
import StatusBar from "../components/StatusBar";
import TopoBackground from "../components/TopoBackground";

// React Router doesn't scroll to #hash targets (e.g. /#contact) on its own
const useHashScroll = () => {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash, key]);
};

const Layout = () => {
  useHashScroll();

  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <TopoBackground />
      <a
        href="#main"
        className="sr-only z-50 bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <StatusBar />
      <NavBar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <RadyoWidget />
    </div>
  );
};

export default Layout;

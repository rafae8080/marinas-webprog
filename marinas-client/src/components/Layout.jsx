import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-stone-100 to-stone-200 text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

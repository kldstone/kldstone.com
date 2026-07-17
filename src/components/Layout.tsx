import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBar from "./FloatingBar";
import { trackPageview } from "@/lib/analytics";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-[56px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingBar />
    </div>
  );
}

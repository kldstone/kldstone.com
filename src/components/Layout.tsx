import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBar from "./FloatingBar";
import { trackPageview } from "@/lib/analytics";

export default function Layout() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.key]);

  useEffect(() => {
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

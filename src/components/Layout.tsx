import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBar from "./FloatingBar";
import InquiryListDrawer from "./InquiryListDrawer";
import { trackPageview } from "@/lib/analytics";

interface LayoutProps {
  /** Language prefix, e.g. "" for English, "/ru" for Russian */
  langPrefix?: string;
}

export default function Layout({ langPrefix = "" }: LayoutProps) {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Detect language from path on mount
  useMemo(() => {
    const detected = langPrefix.replace("/", "") || "en";
    if (i18n.language !== detected) {
      i18n.changeLanguage(detected);
    }
  }, [langPrefix, i18n]);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.key]);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar langPrefix={langPrefix} />
      <main className="flex-1 pb-[56px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingBar />
      <InquiryListDrawer />
    </div>
  );
}

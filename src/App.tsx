import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import TawkChat from "./components/TawkChat";
import CookieConsent from "./components/CookieConsent";
import { InquiryListProvider } from "./context/InquiryListContext";
import { Suspense, lazy } from "react";
import { SUPPORTED_LANGS } from "./i18n";

const Home = lazy(() => import("./pages/Home"));
const Collections = lazy(() => import("./pages/Collections"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const Spaces = lazy(() => import("./pages/Spaces"));
const CustomService = lazy(() => import("./pages/CustomService"));
const Craftsmanship = lazy(() => import("./pages/Craftsmanship"));
const Quality = lazy(() => import("./pages/Quality"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Catalog = lazy(() => import("./pages/Catalog"));
const CatalogCategory = lazy(() => import("./pages/CatalogCategory"));
const CatalogDetail = lazy(() => import("./pages/CatalogDetail"));
const LandingQuote = lazy(() => import("./pages/LandingQuote"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

type RouteRecord = {
  path: string;
  element: React.ReactNode;
};

/** Build routes for a given language prefix */
function langRoutes(prefix: string): RouteRecord[] {
  const p = (path: string) => `${prefix}${path}`;
  const routes: RouteRecord[] = [
    { path: p("/"), element: <Home /> },
    { path: p("/collections"), element: <Collections /> },
    { path: p("/collections/marble"), element: <Collections filter="marble" /> },
    { path: p("/collections/mosaic"), element: <Collections filter="mosaic" /> },
    { path: p("/collections/product/:id"), element: <CollectionDetail /> },
    { path: p("/spaces"), element: <Spaces /> },
    { path: p("/custom"), element: <CustomService /> },
    { path: p("/craftsmanship"), element: <Craftsmanship /> },
    { path: p("/quality"), element: <Quality /> },
    { path: p("/about"), element: <About /> },
    { path: p("/faq"), element: <FAQ /> },
    { path: p("/contact"), element: <Contact /> },
    { path: p("/catalog"), element: <Catalog /> },
    { path: p("/catalog/:category"), element: <CatalogCategory /> },
    { path: p("/catalog/:category/:id"), element: <CatalogDetail /> },
  ];
  return routes;
}

export default function App() {
  return (
    <BrowserRouter>
      <InquiryListProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
          {/* Language-prefixed routes wrap in Layout */}
          {SUPPORTED_LANGS.map((lang) => {
            const prefix = lang === "en" ? "" : `/${lang}`;
            return (
              <Route key={lang} element={<Layout langPrefix={prefix} />}>
                {langRoutes(prefix).map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
              </Route>
            );
          })}

          {/* Standalone routes (no Layout) */}
          {SUPPORTED_LANGS.map((lang) => {
            const prefix = lang === "en" ? "" : `/${lang}`;
            return (
              <Route key={`${lang}-standalone`} path={`${prefix}/landing/quote`} element={<LandingQuote />} />
            );
          })}
          {SUPPORTED_LANGS.map((lang) => {
            const prefix = lang === "en" ? "" : `/${lang}`;
            return (
              <Route key={`${lang}-ty`} path={`${prefix}/thank-you`} element={<ThankYou />} />
            );
          })}
          </Routes>
        </Suspense>
        <TawkChat />
        <CookieConsent />
      </InquiryListProvider>
    </BrowserRouter>
  );
}

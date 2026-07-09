import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import { Suspense } from "react";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import Spaces from "./pages/Spaces";
import CustomService from "./pages/CustomService";
import Craftsmanship from "./pages/Craftsmanship";
import Quality from "./pages/Quality";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/marble" element={<Collections filter="marble" />} />
            <Route path="/collections/mosaic" element={<Collections filter="mosaic" />} />
            <Route path="/collections/product/:id" element={<CollectionDetail />} />
            <Route path="/spaces" element={<Spaces />} />
            <Route path="/custom" element={<CustomService />} />
            <Route path="/craftsmanship" element={<Craftsmanship />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

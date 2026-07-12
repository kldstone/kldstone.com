import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import type { CatalogCategory } from "@/data/catalog";

export default function LazyCatalogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [categories, setCategories] = useState<CatalogCategory[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import("@/data/catalog").then((mod) => {
            setCategories(mod.default);
            setLoaded(true);
          });
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#34c759] text-[11px] font-bold tracking-[0.20em] uppercase">Catalog</span>
          <h2 className="text-[#111] text-[clamp(1.5rem,3vw,2.4rem)] font-black tracking-[0.02em] mt-3">
            PRODUCT COLLECTIONS
          </h2>
          <p className="text-[#111]/50 text-[15px] mt-3 max-w-[560px] mx-auto">
            Browse our full catalog of stone products — from carved components to furniture
          </p>
        </div>

        {!categories ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[4/3] bg-[#f0f0f0] animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.key}
                  to={`/catalog/${cat.key}`}
                  className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[4/3]"
                >
                  <img
                    src={optimizedImage(cat.heroImg)}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <h3 className="text-white text-[22px] font-bold tracking-[0.06em] mb-2">{cat.name}</h3>
                    <p className="text-white/60 text-[12px] font-medium tracking-[0.12em] uppercase mb-4">{cat.subtitle}</p>
                    <p className="text-white/70 text-[14px] max-w-[320px] leading-relaxed">
                      {cat.description.length > 80 ? cat.description.slice(0, 80) + "..." : cat.description}
                    </p>
                    <span className="mt-5 inline-block text-[11px] font-bold tracking-[0.12em] text-white border border-white/30 px-5 py-2 group-hover:bg-white group-hover:text-[#111] transition-colors">
                      {cat.products.length} products
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center min-h-[48px] px-8 border border-[#111]/20 text-[#111] text-[12px] font-bold tracking-[0.06em] hover:bg-[#111] hover:text-white transition-colors"
              >
                VIEW ALL CATALOG
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

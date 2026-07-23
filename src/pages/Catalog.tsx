import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import categories from "@/data/catalog";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";
import { Search } from "lucide-react";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [category, setCategory] = useState("all");
  const products = useMemo(
    () => categories.flatMap((cat) => cat.products.map((product) => ({ ...product, categoryKey: cat.key, categoryName: cat.name }))),
    [],
  );
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized && category === "all") return [];
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.categoryKey === category;
      const matchesQuery = !normalized || [
        product.name,
        product.tagline,
        product.description,
        ...(product.styles || []),
      ].join(" ").toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);
  useSEO({ title: "Architectural Stone Product Catalog", description: "Browse KLD Stone's architectural stone catalog, including carved stone, wall panels, furniture, mosaics and custom marble products for global projects." });
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img
          src={optimizedImage("/catalog-images/catalog-hero.jpg")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/80 text-[11px] font-bold tracking-[0.20em] uppercase">Catalog</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.03em] mt-3 mb-4">
              Product Catalog
            </h1>
            <p className="text-white/80 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              From classic European carved components to modern stone furniture — browse KLD's complete product catalog collection
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="mb-12 border border-black/10 bg-[#fafafa] p-5 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-[1fr_230px]">
            <label className="relative block">
              <span className="sr-only">Search the complete catalog</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#111]/35" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  const nextParams = new URLSearchParams(searchParams);
                  const nextQuery = event.target.value;
                  if (nextQuery) nextParams.set("q", nextQuery);
                  else nextParams.delete("q");
                  setSearchParams(nextParams, { replace: true });
                }}
                placeholder="Search the complete catalog"
                className="min-h-[52px] w-full border border-black/15 bg-white pl-12 pr-4 text-[14px] outline-none focus:border-[#84c225]"
              />
            </label>
            <label>
              <span className="sr-only">Product category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="min-h-[52px] w-full border border-black/15 bg-white px-4 text-[13px] outline-none focus:border-[#84c225]"
              >
                <option value="all">All categories</option>
                {categories.map((cat) => <option key={cat.key} value={cat.key}>{cat.name}</option>)}
              </select>
            </label>
          </div>
          {(query.trim() || category !== "all") && (
            <p className="mt-3 text-[12px] font-semibold text-[#111]/55" aria-live="polite">
              {filteredProducts.length} matching products
            </p>
          )}
        </div>

        {(query.trim() || category !== "all") && (
          <div className="mb-16">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={`${product.categoryKey}-${product.id}`}
                    to={`/catalog/${product.categoryKey}/${product.id}`}
                    className="group bg-[#f5f5f5]"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={optimizedImage(product.cover)}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#75ad20]">{product.categoryName}</p>
                      <p className="mt-1 text-[13px] font-semibold leading-5 text-[#111]">{product.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[14px] text-[#111]/55">No products match your search.</div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/catalog/${cat.key}`}
              className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[4/3]"
            >
              {cat.heroImg && (
                <img
                  src={optimizedImage(cat.heroImg)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-white text-[22px] font-bold tracking-[0.06em] mb-2">
                  {cat.name}
                </h2>
                <p className="text-white/60 text-[12px] font-medium tracking-[0.12em] uppercase mb-4">
                  {cat.subtitle}
                </p>
                <p className="text-white/70 text-[14px] max-w-[320px] leading-relaxed">
                  {cat.description.length > 80
                    ? cat.description.slice(0, 80) + "..."
                    : cat.description}
                </p>
                {cat.products.length > 0 && (
                  <span className="mt-5 inline-block text-[11px] font-bold tracking-[0.12em] text-white border border-white/30 px-5 py-2 group-hover:bg-white group-hover:text-[#111] transition-colors">
                    {cat.products.length} products
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

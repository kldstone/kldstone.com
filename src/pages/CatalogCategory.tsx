import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import categories from "@/data/catalog";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";
import { Check, Plus, Search } from "lucide-react";
import { useInquiryList } from "@/context/InquiryListContext";

export default function CatalogCategory() {
  const { category } = useParams<{ category: string }>();
  const cat = categories.find((c) => c.key === category);
  const { hasItem, toggleItem } = useInquiryList();
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("all");
  const products = cat?.products ?? [];
  const styles = Array.from(new Set(products.flatMap((product) => product.styles || []))).sort();
  const normalized = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesQuery = !normalized || [
      product.name,
      product.tagline,
      product.description,
      product.specs || "",
      ...(product.styles || []),
    ].join(" ").toLowerCase().includes(normalized);
    const matchesStyle = style === "all" || product.styles?.includes(style);
    return matchesQuery && matchesStyle;
  });
  useSEO({ title: cat ? `${cat.name} Stone Products` : "Catalog Category Not Found", description: cat ? `Explore KLD Stone's ${cat.name} collection for hospitality, residential and commercial projects.` : "The requested catalog category could not be found.", noIndex: !cat });

  if (!cat) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#111]/40 text-[20px] font-bold">Category not found</h1>
          <Link to="/catalog" className="mt-4 inline-block text-[#34c759] text-[14px]">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] bg-[#e5e5e5] overflow-hidden">
        {cat.heroImg && (
          <img
            src={optimizedImage(cat.heroImg)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/60 text-[11px] font-bold tracking-[0.20em] uppercase">
              {cat.subtitle}
            </span>
            <h1 className="text-white text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-[0.03em] mt-3 mb-4">
              {cat.name}
            </h1>
            <p className="text-white/75 text-[15px] max-w-[600px] mx-auto leading-relaxed">
              {cat.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        {cat.products.length > 0 && (
          <div className="mb-8 grid gap-3 border-b border-black/10 pb-8 sm:grid-cols-[1fr_220px_auto] sm:items-center">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111]/35" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product name, style, or specification"
                className="min-h-[48px] w-full border border-black/15 bg-white pl-11 pr-4 text-[13px] outline-none focus:border-[#84c225]"
              />
            </label>
            <label>
              <span className="sr-only">Filter by style</span>
              <select
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                className="min-h-[48px] w-full border border-black/15 bg-white px-4 text-[13px] outline-none focus:border-[#84c225]"
              >
                <option value="all">All styles</option>
                {styles.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <p aria-live="polite" className="text-[12px] font-semibold text-[#111]/55">
              {filteredProducts.length} results
            </p>
          </div>
        )}
        {cat.products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#111]/40 text-[18px] font-medium mb-3">
              Coming soon
            </p>
            <p className="text-[#111]/30 text-[14px] mb-8">
              Product images and data are being extracted from the catalog PDF
            </p>
            <Link
              to="/catalog"
              className="inline-block border border-[#111]/20 text-[#111] text-[12px] font-bold tracking-[0.06em] px-8 py-3 hover:bg-[#111] hover:text-white transition-colors"
            >
              Back to Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((p) => {
              const selected = hasItem(p.id);
              return (
                <div key={p.id} className="group relative overflow-hidden bg-[#f5f5f5] aspect-[3/4]">
                  <Link to={`/catalog/${cat.key}/${p.id}`} className="absolute inset-0">
                    <img
                      src={optimizedImage(p.cover)}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                      <p className="text-white text-[13px] font-semibold tracking-[0.04em] leading-tight">
                        {p.name}
                      </p>
                      {p.styles && p.styles.length > 0 && (
                        <p className="text-white/60 text-[10px] font-medium mt-1">
                          {p.styles.join(" / ")}
                        </p>
                      )}
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      toggleItem({
                        id: p.id,
                        name: p.name,
                        categoryKey: cat.key,
                        categoryName: cat.name,
                        image: p.cover,
                      })
                    }
                    aria-label={selected ? `Remove ${p.name} from inquiry list` : `Add ${p.name} to inquiry list`}
                    className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition ${
                      selected ? "bg-[#84c225] text-white" : "bg-white/95 text-[#111] hover:bg-[#84c225] hover:text-white"
                    }`}
                  >
                    {selected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {cat.products.length > 0 && filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[16px] font-bold text-[#111]">No matching products</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setStyle("all");
              }}
              className="mt-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#659619]"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

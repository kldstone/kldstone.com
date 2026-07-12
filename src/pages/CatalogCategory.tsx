import { useParams, Link } from "react-router-dom";
import categories from "@/data/catalog";
import { optimizedImage } from "@/lib/images";

export default function CatalogCategory() {
  const { category } = useParams<{ category: string }>();
  const cat = categories.find((c) => c.key === category);

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
            {cat.products.map((p) => (
              <Link
                key={p.id}
                to={`/catalog/${cat.key}/${p.id}`}
                className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[3/4]"
              >
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

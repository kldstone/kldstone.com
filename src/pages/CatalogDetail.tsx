import { useParams, Link } from "react-router-dom";
import categories from "@/data/catalog";
import { optimizedImage } from "@/lib/images";

export default function CatalogDetail() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const cat = categories.find((c) => c.key === category);
  const product = cat?.products.find((p) => p.id === id);

  if (!cat || !product) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#111]/40 text-[20px] font-bold">Product not found</h1>
          <Link
            to={cat ? `/catalog/${cat.key}` : "/catalog"}
            className="mt-4 inline-block text-[#34c759] text-[14px]"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images.length > 0 ? product.images : [product.cover];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 text-[12px] tracking-[0.04em] text-[#111]/40">
          <Link to="/catalog" className="hover:text-[#34c759] transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <Link
            to={`/catalog/${cat.key}`}
            className="hover:text-[#34c759] transition-colors"
          >
            {cat.name}
          </Link>
          <span>/</span>
          <span className="text-[#111]/70">{product.name}</span>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-[1280px] mx-auto px-6 py-8 pb-24">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="space-y-4">
            {allImages.map((img, i) => (
              <div key={i} className="overflow-hidden bg-[#f5f5f5]">
                <img
                  src={optimizedImage(img)}
                  alt={`${product.name} - ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="md:sticky md:top-[100px] self-start">
            <span className="text-[11px] font-bold tracking-[0.20em] uppercase text-[#34c759]">
              {cat.name}
            </span>
            <h1 className="text-[#111] text-[clamp(1.5rem,2.5vw,2.2rem)] font-black tracking-[0.02em] mt-3 mb-3">
              {product.name}
            </h1>

            {product.styles && product.styles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.styles.map((s) => (
                  <span
                    key={s}
                    className="inline-block text-[11px] font-medium tracking-[0.06em] bg-[#f0f0f0] text-[#111]/70 px-4 py-1.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <p className="text-[#111]/70 text-[15px] leading-[1.8] mb-6 whitespace-pre-line">
              {product.description}
            </p>

            {product.specs && (
              <div className="border-t border-black/5 pt-6 mt-6">
                <h3 className="text-[13px] font-bold tracking-[0.06em] text-[#111] mb-3">
                  Specifications
                </h3>
                <p className="text-[#111]/60 text-[14px] leading-relaxed whitespace-pre-line">
                  {product.specs}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="border-t border-black/5 pt-8 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center min-h-[48px] px-8 bg-[#34c759] text-white text-[13px] font-bold tracking-[0.06em] hover:bg-[#34c759]/80 transition-colors"
              >
                Inquire About This Product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

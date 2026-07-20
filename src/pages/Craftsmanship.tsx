import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";

const allPhotos = Array.from({ length: 34 }, (_, i) => ({
  src: `/brand-gallery/factory/factory-${String(i + 1).padStart(2, "0")}.jpg`,
  label: `Workshop View ${String(i + 1).padStart(2, "0")}`,
}));

export default function Craftsmanship() {
  const { t } = useTranslation("craftsmanship");
  useSEO({ title: "Factory Tour & Craftsmanship", description: t("hero.description") });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const stats = t("stats", { returnObjects: true }) as Array<{ num: string; label: string; sub: string }>;
  const facilities = t("facilities", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(
    () => setLightbox((p) => (p === null ? null : (p - 1 + allPhotos.length) % allPhotos.length)),
    []
  );
  const nextPhoto = useCallback(
    () => setLightbox((p) => (p === null ? null : (p + 1) % allPhotos.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto]);

  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/077-details-img-1497.jpg")} alt="Craftsmanship" className="w-full h-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.20em] uppercase">{t("hero.title")}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-4">{t("hero.heading")}</h1>
            <p className="text-white/55 text-[15px] max-w-[560px] mx-auto leading-relaxed">{t("hero.description")}</p>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[#34c759] text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-[0.02em] leading-none mb-1">{s.num}</div>
                <div className="text-[#111111] text-[13px] font-bold tracking-[0.04em]">{s.label}</div>
                <div className="text-[#111111]/45 text-[11px] mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((item) => (
              <div key={item.title} className="bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/30 transition-colors">
                <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-[13px] leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
            {allPhotos.map((photo, i) => (
              <div key={i} className="relative break-inside-avoid overflow-hidden group cursor-pointer" onClick={() => setLightbox(i)}>
                <img src={optimizedImage(photo.src)} alt={photo.label} className="w-full object-cover transition-all duration-700 group-hover:scale-[1.02]" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-6 cursor-zoom-out" onClick={closeLightbox}>
          <button className="absolute top-6 left-6 text-white/60 text-[28px] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>x</button>
          <button className="absolute top-1/2 left-6 -translate-y-1/2 text-white/60 text-[32px] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); prevPhoto(); }}>&lsaquo;</button>
          <img src={optimizedImage(allPhotos[lightbox].src)} alt="" className="max-w-full max-h-[88vh] object-contain cursor-default" onClick={(e) => e.stopPropagation()} />
          <button className="absolute top-1/2 right-6 -translate-y-1/2 text-white/60 text-[32px] hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); nextPhoto(); }}>&rsaquo;</button>
        </div>
      )}
    </div>
  );
}

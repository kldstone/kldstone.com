import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";

const spacesData: Record<string, string[]> = {
  all: [],
  lobbies: Array.from({ length: 8 }, (_, i) => `/brand-gallery/spaces-lobby-0${[1, 2, 4, 5, 6, 7, 8, 9][i]}.jpg`),
  villas: Array.from({ length: 9 }, (_, i) => `/brand-gallery/spaces-villa-0${i + 1}.jpg`),
  commercial: ["/brand-gallery/spaces-commercial-01.jpg", "/brand-gallery/spaces-commercial-02.jpg"],
  residential: Array.from({ length: 6 }, (_, i) => `/brand-gallery/spaces-residential-0${i + 1}.jpg`),
};

export default function Spaces() {
  const { t } = useTranslation("spaces");
  useSEO({ title: "Project Spaces", description: t("hero.description") });
  const [activeCat, setActiveCat] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "lobbies", label: t("categories.lobbies"), desc: t("categories.lobbiesDesc") },
    { key: "villas", label: t("categories.villas"), desc: t("categories.villasDesc") },
    { key: "commercial", label: t("categories.commercial"), desc: t("categories.commercialDesc") },
    { key: "residential", label: t("categories.residential"), desc: t("categories.residentialDesc") },
  ];

  const filteredSpaces = useMemo(() => {
    if (activeCat === "all") {
      return Object.entries(spacesData)
        .filter(([key]) => key !== "all")
        .flatMap(([, value]) => value);
    }
    return spacesData[activeCat] || [];
  }, [activeCat]);

  const activeDescription = categories.find((cat) => cat.key === activeCat)?.desc;

  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/spaces-hero-2026-07-06.jpg")} alt="Project Spaces" className="w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white text-[11px] font-bold tracking-[0.20em] uppercase">{t("hero.title")}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.03em] mt-3 mb-4">{t("hero.heading")}</h1>
            <p className="text-white/65 text-[15px] max-w-[600px] mx-auto leading-relaxed">{t("hero.description")}</p>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCat(cat.key)}
            className={`px-5 py-2 text-[12px] font-semibold tracking-[0.06em] border transition-all ${
              activeCat === cat.key
                ? "bg-[#34c759] text-white border-[#34c759]"
                : "bg-transparent text-[var(--muted)] border-[var(--line)] hover:border-[var(--ink)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {activeDescription && activeCat !== "all" && (
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[var(--muted)] text-[14px] italic">{activeDescription}</p>
        </div>
      )}

      <section className="max-w-[1280px] mx-auto px-6 pt-6 pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredSpaces.map((src, i) => (
            <div key={i} className="relative break-inside-avoid overflow-hidden group cursor-pointer" onClick={() => setLightbox(src)}>
              <Link to={`/cases/${src.split("/").pop()?.replace(".jpg", "")}`} onClick={(e) => e.stopPropagation()}>
                <img src={optimizedImage(src)} alt={`Project Space ${i + 1}`} className="w-full object-cover transition-all duration-700 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
              </Link>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-6 cursor-zoom-out" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 text-[28px] hover:text-white transition-colors" onClick={() => setLightbox(null)}>x</button>
          <img src={optimizedImage(lightbox)} alt="" className="max-w-full max-h-[88vh] object-contain cursor-default" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <section className="bg-[var(--panel)] py-20 px-6 text-center">
        <h2 className="text-[var(--ink)] text-[clamp(1.5rem,2.5vw,2rem)] font-black tracking-[0.02em] mb-4">{t("cta.heading")}</h2>
        <p className="text-[var(--muted)] text-[15px] max-w-[500px] mx-auto mb-8 leading-relaxed">{t("cta.description")}</p>
        <Link to="/contact" className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors">{t("common:common.startAProject")}</Link>
      </section>
    </div>
  );
}

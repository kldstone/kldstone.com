import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";
import { Link } from "react-router-dom";

// Trust stats (numbers stay static, labels come from i18n)
const trustNums = ["20+", "149", "±0.1mm", "30+"];

// Featured marble products (product names stay as-is globally)
const featuredProducts = [
  { name: "AVALANCHE", en: "Andes Snowscape", img: "/gani-products/gani_003_安第斯雪景.webp", color: "WHITE" },
  { name: "CALACATTA VIOLA", en: "Bvlgari Stone", img: "/gani-products/gani_014_宝格丽.webp", color: "WHITE" },
  { name: "CAMOUFLAGE LIGHT", en: "Misty Jiangnan", img: "/gani-products/gani_011_烟雨江南.webp", color: "GREY" },
  { name: "CENERE DI PESCE", en: "Fish Belly Grey", img: "/gani-products/gani_071_鱼肚灰.webp", color: "WHITE" },
  { name: "VERDE ALPI PREMIUM", en: "Alps Green", img: "/gani-products/gani_023_阿尔卑斯.webp", color: "GREEN" },
  { name: "BRAZIL BLUE SODALITE", en: "Classic Sapphire Blue", img: "/gani-products/gani_005_经典宝石蓝.webp", color: "BLUE" },
  { name: "ORO CARRARA", en: "Carrara Gold", img: "/gani-products/gani_041_卡拉拉金.webp", color: "GOLD" },
  { name: "TWILIGHT ASHWOOD", en: "Athens Wood Grain", img: "/gani-products/gani_101_雅典木纹.webp", color: "BROWN" },
];

const featuredMosaics = [
  { name: "PETAL LINE", en: "", img: "/gani-products/gani_107_序知.webp" },
  { name: "VISTA SCAPE", en: "", img: "/gani-products/gani_112_观境.webp" },
  { name: "SHADOW BLOSSOM", en: "", img: "/gani-products/gani_111_影棠.webp" },
  { name: "TITANIUM", en: "", img: "/gani-products/gani_121_钛谷.webp" },
];

const featuredSpaces = [
  { img: "/brand-gallery/spaces-lobby-01.jpg", cat: "HOTEL LOBBY" },
  { img: "/brand-gallery/spaces-villa-01.jpg", cat: "VILLA & CLUB" },
  { img: "/brand-gallery/spaces-lobby-04.jpg", cat: "HOTEL LOBBY" },
  { img: "/brand-gallery/spaces-residential-01.jpg", cat: "RESIDENTIAL" },
];

export default function Home() {
  const { t } = useTranslation("home");
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = t("hero.slides", { returnObjects: true }) as Array<{
    titEn: string; tit: string; des: string;
  }>;

  const trustLabels = [
    t("trustStats.years"),
    t("trustStats.marbleVarieties"),
    t("trustStats.waterjetPrecision"),
    t("trustStats.exportCountries"),
  ];

  const processSteps = t("process.steps", { returnObjects: true }) as Array<{
    title: string; desc: string;
  }>;

  const qualityItems = t("quality.items", { returnObjects: true }) as Array<{
    title: string; desc: string;
  }>;

  const next = useCallback(() => setActive((s) => (s + 1) % slides.length), [slides]);
  const prev = useCallback(() => setActive((s) => (s - 1 + slides.length) % slides.length), [slides]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [isPaused, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div>
      {/* HERO CAROUSEL */}
      <div
        className="relative w-full h-screen overflow-hidden bg-black"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              i === active
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Link to={i < 3 ? "/collections/marble" : "/collections/mosaic"} className="block w-full h-full relative">
              <img
                src={optimizedImage(`/gani-home/banner_0${i + 1}.jpg`)}
                alt={s.tit}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding={i === 0 ? "sync" : "async"}
                className="w-full h-full object-cover"
                style={{
                  transform: i === active ? "scale(1)" : "scale(1.08)",
                  transition: "transform 6s ease-out",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </Link>
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
            <div
              key={active}
              className="max-w-[640px]"
              style={{ animation: "slideFadeIn 1.2s ease-out" }}
            >
              <p className="text-white/60 text-[clamp(0.7rem,1.2vw,0.9rem)] font-light tracking-[0.25em] uppercase mb-4 md:mb-6">
                {slides[active].titEn}
              </p>
              <h1 className="text-white text-[clamp(2rem,5vw,4rem)] font-light tracking-[0.08em] leading-[1.2] mb-4 md:mb-6">
                {slides[active].tit}
              </h1>
              <p className="text-white/80 text-[clamp(0.85rem,1.4vw,1.1rem)] font-light tracking-[0.06em] leading-relaxed">
                {slides[active].des}
             </p>
              <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
                <Link
                  to="/contact"
                  onClick={() => trackConversion("quote_cta", { source: "home_hero" })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  GET QUOTE
                </Link>
                <Link
                  to="/collections"
                  onClick={() => trackConversion("cta_click", { source: "home_hero_products" })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white/30 text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-white/10 transition-colors"
                >
                  VIEW PRODUCTS
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="group relative h-[3px] transition-all duration-500"
                    style={{
                      width: i === active ? "48px" : "24px",
                      backgroundColor: i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prev} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300 group" aria-label={t("common:common.previous")}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60 group-hover:text-white transition-colors">
                    <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button onClick={next} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300 group" aria-label={t("common:common.next")}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/60 group-hover:text-white transition-colors">
                    <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-[0.15em] uppercase">
          <span className="hidden md:inline">{t("common:common.scroll")}</span>
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke="currentColor" strokeWidth="1" className="animate-bounce">
            <rect x="0.5" y="0.5" width="11" height="17" rx="5.5"/>
            <line x1="6" y1="4" x2="6" y2="7" strokeLinecap="round"/>
          </svg>
        </div>

        <style>{`
          @keyframes slideFadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>

      {/* TRUST STATS BAR */}
      <section className="bg-white border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustNums.map((num, i) => (
              <div key={i} className="text-center">
                <div className="text-[#34c759] text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-[0.02em] leading-none mb-2">
                  {num}
                </div>
                <div className="text-[#111111]/50 text-[13px] tracking-[0.06em]">{trustLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NATURAL MARBLE SELECTION */}
      <section className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
        <div className="text-center mb-12">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">
            {t("collections.title")}
          </span>
          <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">
            {t("collections.heading")}
          </h2>
          <p className="text-[#111111]/45 text-[14px] max-w-[520px] mx-auto leading-relaxed">
            {t("collections.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {featuredProducts.map((p, i) => (
            <Link
              key={i}
              to="/collections/marble"
              className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[3/4]"
            >
              <img
                src={optimizedImage(p.img)}
                alt={p.name}
                loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                <p className="text-white text-[13px] font-semibold tracking-[0.04em] leading-tight">{p.name}</p>
                <p className="text-white/65 text-[10px] font-medium tracking-[0.08em] mt-0.5">{p.en}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/collections"
            onClick={() => trackConversion("cta_click", { source: "home_marble_all" })}
            className="inline-flex items-center gap-2 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#34c759] pb-1 hover:text-[#34c759] transition-colors"
          >
            {t("collections.viewAll")}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      {/* WATERJET MEDALLIONS */}
      <section className="bg-[#f8f8f8] py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">
              {t("waterjet.title")}
            </span>
            <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">
              {t("waterjet.heading")}
            </h2>
            <p className="text-[#111111]/45 text-[14px] max-w-[520px] mx-auto leading-relaxed">
              {t("waterjet.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {featuredMosaics.map((p, i) => (
              <Link
                key={i}
                to="/collections/mosaic"
                className="group relative block overflow-hidden bg-[#f5f5f5] aspect-square"
              >
                <img
                  src={optimizedImage(p.img)}
                  alt={p.name}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                  <p className="text-white text-[13px] font-semibold tracking-[0.04em] leading-tight">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/collections/mosaic"
              onClick={() => trackConversion("cta_click", { source: "home_mosaic_all" })}
              className="inline-flex items-center gap-2 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#34c759] pb-1 hover:text-[#34c759] transition-colors"
            >
              {t("waterjet.viewAll")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FACTORY CAPABILITIES */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">
              {t("process.title")}
            </span>
            <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">
              {t("process.heading")}
            </h2>
            <p className="text-[#111111]/45 text-[14px] max-w-[520px] mx-auto leading-relaxed">
              {t("process.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-[#f8f8f8] p-8 h-full">
                  <span className="text-[#34c759] text-[2.5rem] font-black tracking-[0.02em] leading-none block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[#111111] text-[16px] font-bold tracking-[0.04em] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#111111]/45 text-[13px] leading-[1.8]">
                    {step.desc}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-[#34c759]/30 text-xl">
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/craftsmanship"
              onClick={() => trackConversion("cta_click", { source: "home_factory_tour" })}
              className="inline-flex items-center gap-2 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#34c759] pb-1 hover:text-[#34c759] transition-colors"
            >
              {t("process.cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">
              {t("video.title")}
            </span>
            <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">
              {t("video.heading")}
            </h2>
            <p className="text-[#111111]/45 text-[14px] max-w-[560px] mx-auto leading-relaxed">
              {t("video.description")}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[900px] aspect-video bg-[#f5f5f5] overflow-hidden relative">
              <video className="w-full h-full object-cover" controls preload="none" poster="/视频封面.jpg">
                <source src="/videos/waterjet-cutting.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SPACES */}
      <section className="bg-[#0f0f0f] py-20 px-6 text-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-white/50 text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">
              {t("spaces.title")}
            </span>
            <h2 className="text-white text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">
              {t("spaces.heading")}
            </h2>
            <p className="text-white/40 text-[14px] max-w-[520px] mx-auto leading-relaxed">
              {t("spaces.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {featuredSpaces.map((s, i) => (
              <Link
                key={i}
                to="/spaces"
                className="group relative block overflow-hidden bg-white/5 aspect-[3/4]"
              >
                <img
                  src={optimizedImage(s.img)}
                  alt={s.cat}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                  <p className="text-white text-[12px] font-semibold tracking-[0.06em]">{s.cat}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/spaces"
              onClick={() => trackConversion("cta_click", { source: "home_spaces_all" })}
              className="inline-flex items-center gap-2 text-white text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#34c759] pb-1 hover:text-[#34c759] transition-colors"
            >
              {t("spaces.viewAll")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* QUALITY & EXPORT */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">
                {t("quality.title")}
              </span>
              <h2 className="text-[#111111] text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-6">
                {t("quality.heading")}
              </h2>
              <div className="space-y-5">
                {qualityItems.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#34c759]/10 rounded-full flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <h3 className="text-[#111111] text-[14px] font-bold tracking-[0.04em] mb-1">{item.title}</h3>
                      <p className="text-[#111111]/45 text-[13px] leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/quality"
                onClick={() => trackConversion("cta_click", { source: "home_quality" })}
                className="inline-flex items-center gap-2 mt-8 text-[#111111] text-[12px] font-bold tracking-[0.10em] uppercase border-b-2 border-[#34c759] pb-1 hover:text-[#34c759] transition-colors"
              >
                {t("quality.cta")}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L12 8L6 14" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>

            <div className="overflow-hidden img-hover">
              <img
                src={optimizedImage("/首页最底图.jpg")}
                alt="KLD Stone exhibition"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy" decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#34c759] py-16 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <h2 className="text-white text-[clamp(1.4rem,2.5vw,1.8rem)] font-black tracking-[0.03em] mb-3">
            {t("cta.heading")}
          </h2>
          <p className="text-white/70 text-[15px] mb-8 max-w-[460px] mx-auto leading-relaxed">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              onClick={() => trackConversion("quote_cta", { source: "home_bottom" })}
              className="inline-flex items-center gap-2 px-10 py-3.5 bg-white text-[#34c759] text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white/90 transition-colors"
            >
              {t("common:common.sendInquiry")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </Link>
            <a
              href="tel:+8615659069988"
              onClick={() => trackConversion("phone_click", { source: "home_bottom" })}
              className="inline-flex items-center gap-2 px-10 py-3.5 bg-transparent border-2 border-white/30 text-white text-[13px] font-bold tracking-[0.08em] uppercase hover:bg-white/10 transition-colors"
            >
              {t("common:common.callUs")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

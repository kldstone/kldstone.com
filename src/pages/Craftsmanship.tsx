import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";

const allPhotos = Array.from({ length: 34 }, (_, i) => ({
  src: `/brand-gallery/factory/factory-${String(i + 1).padStart(2, "0")}.jpg`,
  label: `Workshop View ${String(i + 1).padStart(2, "0")}`,
}));

const stats = [
  { num: "20+", label: "YEARS IN STONE", sub: "From Block Trading To Fabrication" },
  { num: "149", label: "MARBLE SELECTIONS", sub: "Slabs And Samples Available" },
  { num: "±0.1mm", label: "WATERJET PRECISION", sub: "CNC Controlled Cutting" },
  { num: "6", label: "EXPORT CHECKS", sub: "Color, Thickness, Protection" },
];

const facilities = [
  {
    title: "MARBLE SLAB LINE",
    desc: "Diamond Saws, Slab Calibration, Polishing, And Numbered Batch Records Help Us Track Quarry Source, Color Range, And Slab Identity.",
  },
  {
    title: "WATERJET MEDALLION CENTER",
    desc: "High-Pressure Waterjet Cutting Enables Precise Inlay Patterns. Each Medallion Is Dry-Laid And Checked Against The Drawing Before Packing.",
  },
  {
    title: "CNC PROFILING & SHAPING",
    desc: "CNC Carving, Profiled Edges, Columns, Moldings, And Shaped Pieces Can Be Produced From Drawings With Repeatable Accuracy.",
  },
  {
    title: "QUALITY CONTROL CENTER",
    desc: "Color Range Control, Thickness Checks, Six-Side Inspection, Dry Laying, Surface Protection, And Export Packing Are Built Into Our Workflow.",
  },
];

export default function Craftsmanship() {
  const [lightbox, setLightbox] = useState<number | null>(null);

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
      <section className="relative h-[55vh] min-h-[420px] bg-[#0f0f0f] overflow-hidden">
        <img
          src={optimizedImage("/brand-gallery/craftsmanship-hero-2026-07-06.jpg")}
          alt="KLD Stone Factory"
          className="w-full h-full object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white text-[11px] font-bold tracking-[0.20em] uppercase">FACTORY TOUR</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-4">
              FACTORY TOUR
            </h1>
            <p className="text-white/65 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              Based In Shuitou, China's Stone Hub, We Handle Slabs, Cutting, Waterjet Inlay, Shaping, Inspection, And Export Packing In One Workflow.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">OVERVIEW</span>
          <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.03em] mb-4">
            A FACTORY BUILT AROUND STONE
          </h2>
          <p className="text-[var(--muted)] text-[15px] leading-[1.9] max-w-[680px] mx-auto">
            KLD Stone Grew In Shuitou, Nan'an, One Of China's Most Important Stone Centers. Our Team Brings More Than Two Decades Of Experience Across Block Selection, Slab Fabrication, Waterjet Inlay, CNC Shaping, Quality Control, And Export Delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-8 border-t border-[var(--line)]">
              <div className="text-[#34c759] text-[clamp(2rem,4vw,2.8rem)] font-black tracking-[0.02em] mb-2">{s.num}</div>
              <div className="text-[var(--ink)] text-[14px] font-bold tracking-[0.04em] mb-1">{s.label}</div>
              <div className="text-[var(--muted)] text-[12px] leading-relaxed">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">ON SITE</span>
            <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.03em] mt-2 mb-3">
              INSIDE THE WORKSHOP
            </h2>
            <p className="text-[var(--muted)] text-[14px] max-w-[500px] mx-auto leading-relaxed">
              From Slab Storage To Finished Packing, These Photos Show Real Workshop Conditions. Click Any Image To Enlarge.
            </p>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>*]:mb-3">
            {allPhotos.map((photo, i) => (
              <div
                key={photo.label}
                className="break-inside-avoid overflow-hidden group cursor-pointer relative"
                onClick={() => setLightbox(i)}
              >
                <img src={optimizedImage(photo.src)} alt={photo.label} className="w-full block object-cover img-hover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-3">
                  <span className="text-white text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">FACILITIES</span>
          <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.03em] mt-2 mb-3">
            FOUR CORE WORKSHOP AREAS
          </h2>
          <p className="text-[var(--muted)] text-[14px] max-w-[560px] mx-auto leading-relaxed">
            Equipment Can Be Purchased, But Stone Judgment Comes From Experience. Our Workflow Combines Machine Precision With Hands-On Material Selection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((f, i) => (
            <div key={f.title} className="p-8 bg-white border border-[var(--line)] hover:border-[#34c759]/40 transition-colors">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-[#34c759] text-[1.8rem] font-black tracking-[0.02em]">0{i + 1}</span>
                <h3 className="text-[var(--ink)] text-[1.2rem] font-black tracking-[0.03em]">{f.title}</h3>
              </div>
              <p className="text-[var(--muted)] text-[14px] leading-[1.9]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0f0f0f] py-20 px-6 text-center">
        <div className="max-w-[680px] mx-auto">
          <span className="text-white/60 text-[11px] font-bold tracking-[0.18em] uppercase">VISIT US</span>
          <h2 className="text-white text-[clamp(1.4rem,3vw,2rem)] font-black tracking-[0.03em] mt-3 mb-4">
            VISIT THE FACTORY IN PERSON
          </h2>
          <p className="text-white/55 text-[15px] leading-[1.9] mb-8">
            You Are Welcome To Visit Our Workshop In Shuitou. It Is About 40 Minutes By Car From Xiamen Gaoqi International Airport, And We Can Help Arrange Pickup.
          </p>
          <Link to="/contact" className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors">
            BOOK A VISIT
          </Link>
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-5 right-6 text-white text-[2rem] z-10 hover:text-[#34c759] transition-colors" onClick={closeLightbox}>
            &times;
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-[2rem] z-10 hover:text-white transition-colors px-3"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            &#10094;
          </button>
          <img
            src={optimizedImage(allPhotos[lightbox].src)}
            alt={allPhotos[lightbox].label}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 text-[2rem] z-10 hover:text-white transition-colors px-3"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            &#10095;
          </button>
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-[13px]">
            {lightbox + 1} / {allPhotos.length} · {allPhotos[lightbox].label}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";

const spacesData: Record<string, string[]> = {
  all: [],
  lobbies: [
    "/brand-gallery/spaces-lobby-01.jpg",
    "/brand-gallery/spaces-lobby-02.jpg",
    "/brand-gallery/spaces-lobby-04.jpg",
    "/brand-gallery/spaces-lobby-05.jpg",
    "/brand-gallery/spaces-lobby-06.jpg",
    "/brand-gallery/spaces-lobby-07.jpg",
    "/brand-gallery/spaces-lobby-08.jpg",
    "/brand-gallery/spaces-lobby-09.jpg",
  ],
  villas: [
    "/brand-gallery/spaces-villa-01.jpg",
    "/brand-gallery/spaces-villa-02.jpg",
    "/brand-gallery/spaces-villa-03.jpg",
    "/brand-gallery/spaces-villa-04.jpg",
    "/brand-gallery/spaces-villa-05.jpg",
    "/brand-gallery/spaces-villa-06.jpg",
    "/brand-gallery/spaces-villa-07.jpg",
    "/brand-gallery/spaces-villa-08.jpg",
    "/brand-gallery/spaces-villa-09.jpg",
  ],
  commercial: [
    "/brand-gallery/spaces-commercial-01.jpg",
    "/brand-gallery/spaces-commercial-02.jpg",
  ],
  residential: [
    "/brand-gallery/spaces-residential-01.jpg",
    "/brand-gallery/spaces-residential-02.jpg",
    "/brand-gallery/spaces-residential-03.jpg",
    "/brand-gallery/spaces-residential-04.jpg",
    "/brand-gallery/spaces-residential-05.jpg",
    "/brand-gallery/spaces-residential-06.jpg",
  ],
};

const categories = [
  { key: "all", label: "ALL", description: "" },
  { key: "lobbies", label: "HOTEL LOBBIES", description: "Luxury Hotel Lobbies Where Stone Sets The First Impression." },
  { key: "villas", label: "VILLAS & CLUBS", description: "Private Villas And Clubs Shaped With Natural Stone Character." },
  { key: "commercial", label: "COMMERCIAL SPACES", description: "Commercial Interiors Where Stone Supports The Brand Atmosphere." },
  { key: "residential", label: "RESIDENTIAL PROJECTS", description: "Residential Applications With Durable, Tactile Natural Surfaces." },
];

const cases: Record<string, { title: string; id: string }> = {
  "/brand-gallery/spaces-lobby-01.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-02.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-04.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-05.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-06.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-07.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-08.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-lobby-09.jpg": { title: "Hotel Lobby Project", id: "hotel-lobby-1" },
  "/brand-gallery/spaces-villa-01.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-02.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-03.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-04.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-05.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-06.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-07.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-08.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-villa-09.jpg": { title: "Private Villa", id: "villa-1" },
  "/brand-gallery/spaces-commercial-01.jpg": { title: "Flagship Store", id: "commercial-1" },
  "/brand-gallery/spaces-commercial-02.jpg": { title: "Flagship Store", id: "commercial-1" },
  "/brand-gallery/spaces-residential-01.jpg": { title: "Luxury Residence", id: "residential-1" },
  "/brand-gallery/spaces-residential-02.jpg": { title: "Luxury Residence", id: "residential-1" },
  "/brand-gallery/spaces-residential-03.jpg": { title: "Luxury Residence", id: "residential-1" },
  "/brand-gallery/spaces-residential-04.jpg": { title: "Luxury Residence", id: "residential-1" },
  "/brand-gallery/spaces-residential-05.jpg": { title: "Luxury Residence", id: "residential-1" },
  "/brand-gallery/spaces-residential-06.jpg": { title: "Luxury Residence", id: "residential-1" },
};

export default function Spaces() {
  const [activeCat, setActiveCat] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filteredSpaces = useMemo(() => {
    if (activeCat === "all") {
      return Object.entries(spacesData)
        .filter(([key]) => key !== "all")
        .flatMap(([, value]) => value);
    }
    return spacesData[activeCat] || [];
  }, [activeCat]);

  const activeDescription = categories.find((cat) => cat.key === activeCat)?.description;

  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] bg-[#0f0f0f] overflow-hidden">
        <img
          src={optimizedImage("/brand-gallery/spaces-hero-2026-07-06.jpg")}
          alt="Project Spaces"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white text-[11px] font-bold tracking-[0.20em] uppercase">OUR SPACES</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.03em] mt-3 mb-4">
              PROJECT SPACES
            </h1>
            <p className="text-white/65 text-[15px] max-w-[600px] mx-auto leading-relaxed">
              Stone Belongs In Completed Spaces. Explore Real Project Scenes From Lobbies, Villas, Commercial Interiors, And Residences.
            </p>
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

      {activeDescription && (
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[var(--muted)] text-[14px] italic">{activeDescription}</p>
        </div>
      )}

      <section className="max-w-[1280px] mx-auto px-6 pt-6 pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredSpaces.map((src, i) => (
            <div
              key={i}
              className="relative break-inside-avoid overflow-hidden group cursor-pointer"
              onClick={() => setLightbox(src)}
            >
              <Link to={`/cases/${cases[src]?.id || ''}`} onClick={(e) => e.stopPropagation()}>
                <img
                  src={optimizedImage(src)}
                  alt={`Project Space ${i + 1}`}
                  className="w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  loading="lazy" decoding="async"
                />
              </Link>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
              {cases[src] && (
                <Link to={`/cases/${cases[src].id}`} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                  <p className="text-white text-[13px] font-bold tracking-[0.04em]">{cases[src].title}</p>
                  <p className="text-white/60 text-[10px] tracking-[0.08em] mt-0.5">View Details →</p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 text-[28px] hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            x
          </button>
          <img
            src={optimizedImage(lightbox)}
            alt=""
            className="max-w-full max-h-[88vh] object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <section className="bg-[var(--panel)] py-20 px-6 text-center">
        <h2 className="text-[var(--ink)] text-[clamp(1.5rem,2.5vw,2rem)] font-black tracking-[0.02em] mb-4">
          BRING NATURAL STONE INTO YOUR PROJECT
        </h2>
        <p className="text-[var(--muted)] text-[15px] max-w-[500px] mx-auto mb-8 leading-relaxed">
          We Work With Designers, Contractors, Builders, And Owners To Bring Natural Texture Into Lobbies, Villas, Retail Spaces, And Homes.
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors"
        >
          START A PROJECT
        </Link>
      </section>
    </div>
  );
}

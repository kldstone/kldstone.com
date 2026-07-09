import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";

const serviceSteps = [
  {
    num: "01",
    title: "PROJECT BRIEF",
    desc: "Share Drawings, Mood Boards, Dimensions, Target Material, Budget, Or Even A Rough Idea. We Begin By Understanding The Space, Use Case, And Delivery Needs.",
    img: "/brand-gallery/077-details-img-1497.jpg",
  },
  {
    num: "02",
    title: "STONE SELECTION",
    desc: "We Help You Compare Slabs And Samples From Different Origins, Checking Color Range, Veining, Hardness, Translucency, And Project Suitability.",
    img: "/brand-gallery/028-materials-img-2082.jpg",
  },
  {
    num: "03",
    title: "SHOP DRAWINGS",
    desc: "Our Team Turns Concepts Into Workable Fabrication Drawings, Including Waterjet Paths, Shaped Cutting, Edge Details, And Vein-Matching Plans.",
    img: "/brand-gallery/106-patterns-img-1860.jpg",
  },
  {
    num: "04",
    title: "FABRICATION",
    desc: "Infrared Bridge Cutting, Waterjet Inlay, CNC Shaping, Polishing, And Manual Finishing Are Coordinated Through Each Production Stage.",
    img: "/brand-gallery/079-details-img-1573.jpg",
  },
  {
    num: "05",
    title: "DRY LAY & INSPECTION",
    desc: "Before Packing, We Dry-Lay Key Pieces, Check Color Transitions, Review Joint Alignment, And Record Photos For Client Confirmation.",
    img: "/brand-gallery/075-inspection-img-2502.jpg",
  },
  {
    num: "06",
    title: "PACKING & DELIVERY",
    desc: "Each Shipment Is Packed In Reinforced Wooden Crates With Moisture Protection, Labels, Packing Lists, And Export Documentation Support.",
    img: "/brand-gallery/069-delivery-img-1877.jpg",
  },
];

const serviceTypes = [
  {
    title: "PRIVATE HOMES",
    desc: "Villas, Apartments, Courtyards, Bathrooms, Feature Walls, Stairs, And Countertops Can Be Customized By Slab, Vein Direction, Edge, And Finish.",
  },
  {
    title: "COMMERCIAL SPACES",
    desc: "Hotel Lobbies, Retail Stores, Restaurants, And Clubs Need Materials That Balance Beauty, Durability, Slip Resistance, And Installation Control.",
  },
  {
    title: "DESIGNER COLLABORATION",
    desc: "We Support Interior Designers And Architects From Concept Stage With Material Suggestions, Slab Selection, Feasibility Review, And Fabrication Detailing.",
  },
  {
    title: "PROJECT SUPPLY",
    desc: "For Larger Projects, We Coordinate Batch Supply, Schedule Control, Color Range Management, Shop Drawings, Packing, And Site Support.",
  },
];

const processImages = [
  "/brand-gallery/078-details-img-1664.jpg",
  "/brand-gallery/079-details-img-1573.jpg",
  "/brand-gallery/082-details-img-1539.jpg",
  "/brand-gallery/083-details-img-1566.jpg",
  "/brand-gallery/086-details-img-1236.jpg",
  "/brand-gallery/087-details-img-1246.jpg",
];

export default function CustomService() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/008-spaces-img-1200.jpg")} alt="Custom Stone Service" className="w-full h-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.20em] uppercase">BESPOKE SERVICE</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-4">
              CUSTOM STONE SERVICE
            </h1>
            <p className="text-white/55 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              From Material Selection To Final Packing, Our Custom Workflow Is Built Around Your Project Rather Than A Standard Catalog.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">HOW WE WORK</span>
        <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mb-5">
          EVERY STONE HAS A STORY; EVERY PROJECT NEEDS A PLAN
        </h2>
        <p className="text-[var(--muted)] text-[15px] leading-[1.8] max-w-[680px] mx-auto">
          Natural Stone Is Never Truly Standard. Even Adjacent Slabs Can Vary In Vein, Tone, And Movement. Our Custom Service Helps You Select, Detail, Fabricate, Inspect, Pack, And Ship The Right Material For The Right Application.
        </p>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="space-y-24">
            {serviceSteps.map((step, i) => (
              <div key={step.num} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <span className="text-[#111111] text-[13px] font-bold tracking-[0.12em] opacity-50">{step.num}</span>
                  <h3 className="text-[var(--ink)] text-[1.3rem] font-black tracking-[0.03em] mt-2 mb-4">{step.title}</h3>
                  <p className="text-[var(--muted)] text-[14px] leading-[1.9]">{step.desc}</p>
                </div>
                <div className={`overflow-hidden ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <img src={optimizedImage(step.img)} alt={step.title} className="w-full aspect-[4/3] object-cover img-hover" loading="lazy" decoding="async" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">THE WORKSHOP</span>
          <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">
            DAILY WORK IN THE WORKSHOP
          </h2>
          <p className="text-[var(--muted)] text-[14px] mt-3 max-w-[500px] mx-auto leading-relaxed">
            These Are Real Production Details From Active Orders, Not Staged Showroom Photos.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {processImages.map((src, i) => (
            <div key={src} className="overflow-hidden img-hover">
              <img src={optimizedImage(src)} alt={`Process ${i + 1}`} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">WHO WE SERVE</span>
            <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">
              PROJECT TYPES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceTypes.map((item) => (
              <div key={item.title} className="bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/30 transition-colors">
                <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-[13px] leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-16 px-6 text-center border-t border-black/8">
        <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.02em] mb-3">
          START YOUR CUSTOM STONE PROJECT
        </h2>
        <p className="text-[#111111]/45 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">
          Send Your Drawings, Sizes, Material Preference, And Destination. We Will Reply With Next Steps And A Quotation Plan.
        </p>
        <Link to="/contact" className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors">
          SUBMIT YOUR REQUEST
        </Link>
      </section>
    </div>
  );
}

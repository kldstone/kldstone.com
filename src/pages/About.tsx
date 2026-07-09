import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0f0f0f] overflow-hidden">
        <img
          src={optimizedImage("/brand-gallery/about-hero-2026-07-06-v2.jpg")}
          alt="About KLD Stone"
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </section>

      {/* Brand Story */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block text-center mb-5">
          Our Story
        </span>
        <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] text-center mb-10">
          BUILT IN SHUITOU, THE HEART OF CHINA'S STONE INDUSTRY
        </h2>
        <div className="space-y-6 text-[16px] leading-[1.9] text-[var(--muted)]">
          <p>
            Shuitou, Nan'an Is One Of China's Most Established Stone Production Centers. Since The 1990s, The Region Has Gathered Quarry Resources, Slab Markets, Fabrication Workshops, And Export Logistics Into One Dense Industrial Cluster. KLD Stone Grew From This Environment.
          </p>
          <p>
            Our Founder Started Working With Stone As A Teenager, First In Block Trading And Later In Fabrication. Over Time We Built Marble Cutting, Waterjet, CNC Profiling, Inspection, And Packing Capabilities, Turning Hands-On Material Knowledge Into Reliable Project Delivery.
          </p>
          <p>
            Today We Support Global Clients, From Hotel Lobbies And Private Villas To Designer-Led Commercial Interiors. Materials Travel Across Borders; Our Standards Stay Consistent From Selection To Shipment.
          </p>
        </div>
      </section>

      {/* Navigate to sub-pages */}
      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">
              DISCOVER MORE
            </span>
            <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">
              THREE WAYS WE SUPPORT YOUR PROJECT
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Craftsmanship */}
            <Link
              to="/craftsmanship"
              className="group bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/40 transition-colors"
            >
              <div className="mb-5 overflow-hidden">
                <img
                  src={optimizedImage("/brand-gallery/about-card-craftsmanship-2026-07-06.jpg")}
                  alt="Factory Tour"
                  className="w-full aspect-[4/3] object-cover img-hover"
                />
              </div>
              <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-2">
                FACTORY TOUR
              </h3>
              <p className="text-[var(--muted)] text-[13px] leading-[1.7] mb-4">
                From Blocks To Finished Pieces, Our Workshop Covers Slab Cutting, Waterjet Inlay, CNC Profiling, Polishing, Inspection, And Packing.
              </p>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.08em] uppercase group-hover:tracking-[0.12em] transition-all">
                Learn More →
              </span>
            </Link>

            {/* Quality */}
            <Link
              to="/quality"
              className="group bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/40 transition-colors"
            >
              <div className="mb-5 overflow-hidden">
                <img
                  src={optimizedImage("/brand-gallery/about-card-quality-2026-07-06.jpg")}
                  alt="Quality Assurance"
                  className="w-full aspect-[4/3] object-cover img-hover"
                />
              </div>
              <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-2">
                QUALITY ASSURANCE
              </h3>
              <p className="text-[var(--muted)] text-[13px] leading-[1.7] mb-4">
                Color Range Control, Thickness Checks, Six-Side Inspection, Dry Laying, Surface Protection, And Export Packing Are Built Into Our Workflow.
              </p>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.08em] uppercase group-hover:tracking-[0.12em] transition-all">
                Learn More →
              </span>
            </Link>

            {/* Custom Service */}
            <Link
              to="/custom"
              className="group bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/40 transition-colors"
            >
              <div className="mb-5 overflow-hidden">
                <img
                  src={optimizedImage("/brand-gallery/about-card-custom-2026-07-06.jpg")}
                  alt="Custom Service"
                  className="w-full aspect-[4/3] object-cover img-hover"
                />
              </div>
              <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-2">
                CUSTOM SERVICE
              </h3>
              <p className="text-[var(--muted)] text-[13px] leading-[1.7] mb-4">
                From Drawings And Samples To Fabrication And Export Packing, Every Custom Order Receives A Project-Specific Plan.
              </p>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.08em] uppercase group-hover:tracking-[0.12em] transition-all">
                Learn More →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Exhibition */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <div className="overflow-hidden img-hover">
              <img src={optimizedImage("/brand-gallery/about-exhibition-2026-07-06.jpg")} alt="Stone Exhibition" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="overflow-hidden img-hover">
              <img src={optimizedImage("/brand-gallery/about-exhibition-02-2026-07-08.jpg")} alt="Exhibition On Site" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">Exhibition</span>
            <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.02em] mt-2 mb-5">INTERNATIONAL STONE EXHIBITIONS</h2>
            <div className="space-y-4 text-[var(--muted)] text-[14px] leading-[1.8]">
              <p>
                We Attend Major Industry Exhibitions Such As The Xiamen International Stone Fair And Marmomac In Verona. These Events Help Us Present New Materials, Understand Global Design Trends, And Meet Clients Face To Face.
              </p>
              <p>
                At Every Exhibition, We Show More Than Samples. We Show How Raw Stone Can Become A Complete Interior Language Through Selection, Fabrication, And Detailing.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-block mt-6 text-[var(--ink)] text-[12px] font-bold tracking-[0.08em] border-b border-[#34c759]/20/40 pb-1 hover:text-[var(--ink)] transition-colors"
            >
              Schedule A Meeting →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--panel)] py-16 px-6 text-center">
        <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.02em] mb-3">
          WANT TO KNOW MORE ABOUT KLD STONE?
        </h2>
        <p className="text-[var(--muted)] text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">
          Whether You Are A Designer, Architect, Contractor, Distributor, Or Homeowner, We Are Ready To Discuss Your Project.
        </p>
        <Link
          to="/contact"
          className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors"
        >
          CONTACT US
        </Link>
      </section>
    </div>
  );
}

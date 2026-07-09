import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const faqData = [
  {
    category: "WATERJET MEDALLIONS BASICS",
    items: [
      {
        q: "What is a waterjet medallion?",
        a: "A waterjet medallion is a decorative stone inlay created by cutting different colors and types of natural stone into precise geometric or organic patterns using a high-pressure waterjet cutter (mixed with fine abrasive). The pieces are then hand-assembled and polished. The cutting accuracy is within ±0.5mm, producing almost invisible seams — ideal for hotel lobbies, villa entrances, and commercial floors.",
      },
      {
        q: "What is the difference between waterjet and traditional hand-cut inlay?",
        a: "Traditional hand-cut inlay relies on manual tools or simple machinery, resulting in lower accuracy, wider seams, and limited pattern complexity. Waterjet cutting is CNC-controlled, allowing any complex pattern to be cut with extreme precision and near-invisible seams for a much more refined finish.",
      },
      {
        q: "Where are waterjet medallions typically used?",
        a: "Waterjet medallions are widely used in hotel lobbies and corridors, villa entrance halls, living rooms, commercial atriums, office lobbies, high-end clubs, showrooms, churches, and custom residential flooring or feature walls.",
      },
      {
        q: "What types of stone work best for waterjet medallions?",
        a: "Most natural stones can be used — marble (e.g., Beige, Cream Marfil, Calacatta, Statuario), granite, onyx, and travertine. The best selection depends on color contrast, hardness, and workability. KLD Stone can recommend the optimal stone combination based on your design.",
      },
    ],
  },
  {
    category: "PRODUCTS & CUSTOMIZATION",
    items: [
      {
        q: "What types of waterjet products can KLD Stone produce?",
        a: "We produce floor medallions (round, square, oval, custom shapes), entrance inlays, feature wall panels, custom logo medallions, waterjet mosaics, stone puzzles, brass inlay medallions, and border patterns. Both standard designs and custom drawings are welcome.",
      },
      {
        q: "Do I need to provide my own design drawings?",
        a: "You can provide your own CAD drawings or reference images. Alternatively, you can share your ideas and our design team will create shop drawings for your approval. We recommend a detailed discussion on pattern, dimensions, and stone selection before production.",
      },
      {
        q: "Is there a minimum order quantity?",
        a: "No. Each waterjet medallion is custom-made — single-piece orders are accepted. Quantity discounts are available for bulk orders. Contact our sales team for details.",
      },
      {
        q: "Can you produce oversized or irregularly shaped medallions?",
        a: "Yes. With 7,000 square meters of layout space and large-format waterjet equipment, we can handle oversized pieces. Large medallions are pre-assembled and numbered before disassembly for shipping, then re-assembled on site.",
      },
      {
        q: "What other products does KLD Stone offer?",
        a: "Beyond waterjet medallions, we provide CNC stone carving, engineered feature walls, luxury stone furniture (brand: Konrad), marble slabs, mosaics, linear patterns, custom moldings, and composite panels for interior finishing.",
      },
    ],
  },
  {
    category: "PRICING & ORDERING",
    items: [
      {
        q: "How much does a waterjet medallion cost per square meter?",
        a: "Pricing varies greatly depending on pattern complexity, dimensions, stone selection, and density of the inlay. Simple designs range from USD 50–80/m², medium complexity USD 80–140/m², and complex custom designs require a project-based quote. Please provide your design and material preferences for an accurate quote.",
      },
      {
        q: "What factors affect the price?",
        a: "Key factors: ① pattern complexity (more cuts = higher cost); ② size (large pieces require more layout and handling); ③ stone type (rare materials cost more); ④ special techniques (e.g., brass inlay); ⑤ order quantity (volume discounts available).",
      },
      {
        q: "How do I get a quote?",
        a: "Contact us via WhatsApp/WeChat at +86 156 5906 9988 or email sales@kldstone.com. Provide your design drawing (or reference), dimensions, preferred stone types, and quantity. We will return a quotation within 1–2 business days.",
      },
      {
        q: "What is the typical delivery time?",
        a: "Standard medallions (common patterns, small to medium size): 7–15 working days. Complex or oversized custom medallions: 15–30 working days. Exact delivery time is confirmed at order placement.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfer (T/T), wire transfer to our company account. Flexible terms can be arranged for regular clients. First orders typically require a deposit, with the balance due before shipment. Details are specified in the sales contract.",
      },
    ],
  },
  {
    category: "CRAFTSMANSHIP & QUALITY",
    items: [
      {
        q: "What cutting precision does KLD Stone achieve?",
        a: "Our Yongda 5-axis waterjet machine (4m × 2.6m) achieves 1–2mm precision bevel cutting. After assembly and polishing, seams are virtually invisible to the naked eye. We operate a quality testing laboratory with 18 inspection checkpoints.",
      },
      {
        q: "Will the seams between stone pieces be visible?",
        a: "No. Our 5-axis waterjet cutting produces smooth, precise edges. Assembly gaps are within 0.5mm, and after professional polishing, the finished medallion shows almost no visible seams — a key advantage over hand-cut inlay.",
      },
      {
        q: "What is your quality control process?",
        a: "Full-process QC: incoming material inspection → cutting accuracy check → dry layout verification → seam inspection → surface polishing → final inspection. 18 checkpoints in total. Non-conforming products never leave the factory.",
      },
      {
        q: "Are waterjet medallions prone to cracking or damage?",
        a: "No. The water-cooled cutting process generates no thermal stress, leaving the stone undamaged. Stone-specific adhesives provide strong, durable bonds. Under normal use and maintenance, waterjet medallions last for decades without cracking.",
      },
    ],
  },
  {
    category: "INSTALLATION & MAINTENANCE",
    items: [
      {
        q: "Does KLD Stone offer installation services?",
        a: "We provide installation guidance and technical support. For major cities, we can arrange experienced installers to work on-site (additional cost applies). Remote video guidance is also available for your local installation team.",
      },
      {
        q: "How should I clean and maintain my waterjet medallion?",
        a: "Use a neutral pH cleaner with a soft cloth. Avoid acidic or alkaline cleaners. Place protective pads under heavy furniture. Professional stone crystallisation treatment every 6–12 months will maintain the gloss and extend the lifespan.",
      },
      {
        q: "Does the medallion need waterproofing?",
        a: "Stone is naturally porous. We recommend applying a stone sealer after installation, especially for medallions in bathrooms, kitchens, or other wet areas. KLD Stone can advise on suitable sealants.",
      },
      {
        q: "What if there is color variation after installation?",
        a: "Natural stone has inherent color and veining variations — this is part of its beauty. During layout, we arrange stones for a harmonious color transition. If strict color consistency is required, consider engineered stone or slabs from the same block; please specify this when ordering.",
      },
    ],
  },
  {
    category: "ABOUT KLD STONE",
    items: [
      {
        q: "Where is KLD Stone located? Can I visit the factory?",
        a: "We are located in Shuitou, Nan'an City, Fujian Province, China — the country's stone capital. About 1 hour by car from Xiamen airport or high-speed rail station. Factory visits are welcome; please schedule in advance via WhatsApp/WeChat at +86 156 5906 9988.",
      },
      {
        q: "Do you accept international orders?",
        a: "Yes. We export to Russia, Saudi Arabia, Qatar, Dubai, the United States, and many other countries. We have extensive experience in export documentation, ocean freight, and customs clearance.",
      },
      {
        q: "What notable projects has KLD Stone completed?",
        a: "Our products have been used in hotel lobbies, luxury villa developments, commercial mall corridors, and overseas church and high-end architectural projects worldwide. Contact us for a portfolio of recent projects.",
      },
      {
        q: "How can I contact KLD Stone?",
        a: "WhatsApp/WeChat: +86 156 5906 9988\nEmail: sales@kldstone.com\nWebsite: kldstone.com\nFactory: Houdian Industrial Zone, Shijing Town, Nan'an City, Fujian, China",
      },
    ],
  },
];

export default function FAQ() {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.flatMap(g =>
        g.items.map(item => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        }))
      ),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-faqpage";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => { const s = document.getElementById("schema-faqpage"); s?.remove(); };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/craftsmanship-hero-2026-07-06.jpg")} alt="" className="w-full h-full object-cover opacity-60" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/50 text-[11px] font-bold tracking-[0.20em] uppercase">FAQ</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-white/55 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              Everything you need to know about waterjet medallions, custom stonework, pricing, and working with KLD Stone
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-[860px] mx-auto px-6 py-20">
        <div className="space-y-16">
          {faqData.map((group) => (
            <div key={group.category}>
              <h2 className="text-[#111111] text-[1.3rem] font-black tracking-[0.03em] mb-6 pb-3 border-b border-black/5">
                {group.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-1">
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${group.category}-${i}`}
                    className="border border-black/5 bg-white hover:border-black/10 transition-colors px-6"
                  >
                    <AccordionTrigger className="text-[#111111] text-[14px] font-semibold tracking-[0.03em] py-4 hover:no-underline text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#111111]/60 text-[14px] leading-[1.8] pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f8f8] py-16 px-6 text-center border-t border-black/8">
        <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.02em] mb-3">
          Still have questions?
        </h2>
        <p className="text-[#111111]/45 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">
          Get in touch — we typically respond within 24 hours
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

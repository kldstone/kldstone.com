import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";
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
      { q: "What is a waterjet medallion?", a: "A waterjet medallion is a decorative stone inlay created by cutting different colors and types of natural stone into precise geometric or organic patterns using a high-pressure waterjet cutter (mixed with fine abrasive). The pieces are then hand-assembled and polished. The cutting accuracy is within ±0.5mm, producing almost invisible seams — ideal for hotel lobbies, villa entrances, and commercial floors." },
      { q: "What is the difference between waterjet and traditional hand-cut inlay?", a: "Traditional hand-cut inlay relies on manual tools or simple machinery, resulting in lower accuracy, wider seams, and limited pattern complexity. Waterjet cutting is CNC-controlled, allowing any complex pattern to be cut with extreme precision and near-invisible seams for a much more refined finish." },
      { q: "Where are waterjet medallions typically used?", a: "Waterjet medallions are widely used in hotel lobbies and corridors, villa entrance halls, living rooms, commercial atriums, office lobbies, high-end clubs, showrooms, churches, and custom residential flooring or feature walls." },
      { q: "What types of stone work best for waterjet medallions?", a: "Most natural stones can be used — marble (e.g., Beige, Cream Marfil, Calacatta, Statuario), granite, onyx, and travertine. The best selection depends on color contrast, hardness, and workability. KLD Stone can recommend the optimal stone combination based on your design." },
    ],
  },
  {
    category: "PRODUCTS & CUSTOMIZATION",
    items: [
      { q: "What types of waterjet products can KLD Stone produce?", a: "We produce floor medallions (round, square, oval, custom shapes), entrance inlays, feature wall panels, custom logo medallions, waterjet mosaics, stone puzzles, brass inlay medallions, and border patterns. Both standard designs and custom drawings are welcome." },
      { q: "Do I need to provide my own design drawings?", a: "You can provide your own CAD drawings or reference images. Alternatively, you can share your ideas and our design team will create shop drawings for your approval." },
      { q: "Is there a minimum order quantity?", a: "No. Each waterjet medallion is custom-made — single-piece orders are accepted. Quantity discounts are available for bulk orders." },
      { q: "Can you produce oversized or irregularly shaped medallions?", a: "Yes. With 7,000 square meters of layout space and large-format waterjet equipment, we can handle oversized pieces." },
      { q: "What other products does KLD Stone offer?", a: "Beyond waterjet medallions, we provide CNC stone carving, engineered feature walls, luxury stone furniture, marble slabs, mosaics, linear patterns, custom moldings, and composite panels." },
    ],
  },
  {
    category: "PRICING & ORDERING",
    items: [
      { q: "How much does a waterjet medallion cost per square meter?", a: "Pricing varies greatly depending on pattern complexity, dimensions, stone selection, and density of the inlay. Simple designs range from USD 50–80/m², medium complexity USD 80–140/m², and complex custom designs require a project-based quote." },
      { q: "What factors affect the price?", a: "Key factors: pattern complexity, size, stone type, special techniques (e.g., brass inlay), and order quantity." },
      { q: "How do I get a quote?", a: "Contact us via WhatsApp at +86 156 5906 9988 or email kldstone.china@gmail.com. Provide your design drawing, dimensions, preferred stone types, and quantity." },
      { q: "What is the typical delivery time?", a: "Standard medallions: 7–15 working days. Complex or oversized custom medallions: 15–30 working days." },
      { q: "What payment methods do you accept?", a: "We accept bank transfer (T/T). Flexible terms can be arranged for regular clients." },
    ],
  },
  {
    category: "CRAFTSMANSHIP & QUALITY",
    items: [
      { q: "What cutting precision does KLD Stone achieve?", a: "Our Yongda 5-axis waterjet machine achieves 1–2mm precision bevel cutting. After assembly and polishing, seams are virtually invisible." },
      { q: "Will the seams between stone pieces be visible?", a: "No. Assembly gaps are within 0.5mm, and after professional polishing, the finished medallion shows almost no visible seams." },
      { q: "What is your quality control process?", a: "Full-process QC: incoming material inspection → cutting accuracy check → dry layout verification → seam inspection → surface polishing → final inspection. 18 checkpoints in total." },
      { q: "Are waterjet medallions prone to cracking or damage?", a: "No. The water-cooled cutting process generates no thermal stress. Stone-specific adhesives provide strong, durable bonds." },
    ],
  },
  {
    category: "INSTALLATION & MAINTENANCE",
    items: [
      { q: "Does KLD Stone offer installation services?", a: "We provide installation guidance and technical support. Remote video guidance is also available." },
      { q: "How should I clean and maintain my waterjet medallion?", a: "Use a neutral pH cleaner with a soft cloth. Professional stone crystallisation treatment every 6–12 months is recommended." },
      { q: "Does the medallion need waterproofing?", a: "Stone is naturally porous. We recommend applying a stone sealer after installation, especially for wet areas." },
      { q: "What if there is color variation after installation?", a: "Natural stone has inherent color and veining variations — this is part of its beauty. During layout, we arrange stones for a harmonious color transition." },
    ],
  },
  {
    category: "ABOUT KLD STONE",
    items: [
      { q: "Where is KLD Stone located? Can I visit the factory?", a: "We are located in Shuitou, Nan'an City, Fujian Province, China. Factory visits are welcome; please schedule in advance." },
      { q: "Do you accept international orders?", a: "Yes. We export to Russia, Saudi Arabia, Qatar, Dubai, the United States, and many other countries." },
      { q: "What notable projects has KLD Stone completed?", a: "Our products have been used in hotel lobbies, luxury villa developments, commercial mall corridors, and overseas church and high-end architectural projects worldwide." },
     { q: "How can I contact KLD Stone?", a: "WhatsApp: +86 156 5906 9988\nEmail: kldstone.china@gmail.com\nWebsite: kldstone.com" },
   ],
 },
  {
    category: "STONE MATERIAL COMPARISON",
    items: [
      { q: "What is the difference between marble and granite? Which is better?", a: "Marble is a metamorphic rock with rich veining and warm tones, ideal for interior walls and decorative flooring. Granite is an igneous rock, harder and more resistant to acid and abrasion, better for kitchen countertops and outdoor flooring. KLD Stone supplies both materials." },
      { q: "Which is better for kitchen countertops: marble or quartz?", a: "Quartz (engineered stone) is hard, non-porous, and requires no sealing, making it low-maintenance. Marble offers unique veining and heat resistance but needs periodic sealing and is susceptible to etching from acidic substances. Choose quartz for practicality, marble for design." },
      { q: "What is the difference between natural stone, engineered stone, and sintered stone?", a: "Natural stone (marble, granite, limestone) offers unique veining formed over millions of years. Engineered stone (quartz) is crushed stone mixed with resin for uniform performance. Sintered stone is fired at high temperature, extremely hard and available in thin formats." },
      { q: "What stone is best for bathroom countertops and flooring?", a: "Marble (with sealing), granite (wear-resistant), and quartz (non-porous) for countertops. Granite with flamed finish and slate for flooring. Six-side sealant treatment is key for natural stone in bathrooms." },
      { q: "Black stone vs white stone: how to choose?", a: "White stone (Calacatta, Carrara) brightens spaces but shows stains more. Black stone (Absolute Black, Nero Marquina) hides stains but scratches may be more visible. White for small spaces, black for large spaces." },
    ],
  },
  {
    category: "PRICE & COST GUIDE",
    items: [
      { q: "How much does natural marble cost per square meter?", a: "Common Chinese marble: USD 40-110/m2. Mid-range imported marble (Beige, Calacatta): USD 110-420/m2. Premium luxury varieties: USD 700-2800/m2 or more. Prices are for block slabs; finished products add extra costs." },
      { q: "What costs are involved when importing stone from China?", a: "Stone material price + processing fees + packing costs + inland transport + ocean freight + port handling + destination customs duties + inland transport in destination country. KLD Stone provides FOB or CIF quotations." },
      { q: "Why do stone prices vary so much?", a: "Factors: rarity of variety, origin (imported vs local), slab size, grade (A vs B), thickness, surface finish, and processing complexity. Provide specific requirements for an accurate quotation." },
    ],
  },
  {
    category: "STONE SELECTION GUIDE",
    items: [
      { q: "What stone is best for hotel lobby flooring?", a: "Light marble (Beige, Cream Marfil) for classic elegance; gray marble (Grey Statuario) for modern luxury; medallion combinations as the lobby centerpiece. Use dense marble with crystallized hardening treatment for enhanced wear resistance." },
      { q: "For a villa, should I use marble or granite?", a: "Living/dining floors: marble for elegance. Kitchen countertops: granite/quartz. Bathrooms: marble (sealed) or granite. Outdoor patios: granite. KLD Stone provides end-to-end service for villa projects." },
      { q: "What stone is best for outdoor flooring and walls?", a: "Granite with flamed or bush-hammered finish for slip resistance. Limestone for garden paving. Slate for pathways and pool surrounds. Avoid high-polish marble outdoors as it gets slippery when wet." },
      { q: "Where can waterjet medallions be used in a home?", a: "Entrance hall as focal point, living room center, dining room under the table, feature walls, hallways. Start with medium sizes (1-2m diameter) for residential use." },
    ],
  },
  {
    category: "CHOOSING A CHINA STONE SUPPLIER & EXPORT",
    items: [
      { q: "How to import stone from China? What is the process?", a: "Requirement confirmation, supplier evaluation, sample confirmation, quotation/contract, production/inspection, packing/shipping, ocean freight/customs, destination port pickup. KLD Stone provides full support for overseas clients." },
      { q: "What should I consider when choosing a stone supplier from China?", a: "Factory scale and equipment, export experience, quality control system, project portfolio, communication, and payment terms. Factory site visits are the most reliable verification." },
      { q: "What quality inspection processes exist for stone before shipping?", a: "Raw block inspection, slab quality check, cutting precision verification, surface finish check, dry lay inspection, six-side inspection, sealant treatment check, and pre-shipment final inspection. KLD Stone provides inspection reports." },
      { q: "What are the packing standards for stone export?", a: "Custom crates with EPE foam lining, steel strapping reinforcement, moisture protection with desiccant and waterproof film, clear labeling, and proper container loading with air bags for stabilization." },
      { q: "What is the difference between FOB and CIF for stone export?", a: "FOB: seller delivers to departure port. CIF: seller arranges transport and insurance to destination port. Choose FOB for flexibility, CIF for simplicity. KLD Stone offers both." },
    ],
  },
  {
    category: "STONE PROCESSING & FINISHING",
    items: [
      { q: "What can CNC stone processing do?", a: "Custom moldings, carving, 3D shaping, and precision edging. CNC achieves ±0.5mm precision with consistent batch quality. KLD Stone operates CNC machining centers." },
      { q: "What stone surface finishes are available?", a: "Polished (high-gloss), honed (matte), flamed (rough for outdoors), bush-hammered (textured), acid-washed (etched), and chiseled (rustic). Choose based on application: floors need slip resistance, countertops need smooth cleaning." },
      { q: "Does marble need crystallization treatment after installation?", a: "Yes. Crystallization enhances gloss, wear resistance, and stain protection. Residential: every 6-12 months. Commercial: every 3-6 months. Use neutral pH cleaner for daily cleaning." },
      { q: "Are natural cracks in marble a quality defect?", a: "Natural veining and micro-fissures are inherent characteristics of natural stone, not quality defects. Processing cracks that may expand during transport are quality issues. KLD Stone distinguishes between natural features and defects." },
    ],
  },
];

export default function FAQ() {
  const { t } = useTranslation("faq");
  useSEO({ title: "FAQ", description: t("hero.description") });

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
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/craftsmanship-hero-2026-07-06.jpg")} alt="" className="w-full h-full object-cover opacity-60" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/50 text-[11px] font-bold tracking-[0.20em] uppercase">{t("hero.title")}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">{t("hero.heading")}</h1>
            <p className="text-white/55 text-[15px] max-w-[560px] mx-auto leading-relaxed">{t("hero.description")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 py-20">
        <div className="space-y-16">
          {faqData.map((group) => (
            <div key={group.category}>
              <h2 className="text-[#111111] text-[1.3rem] font-black tracking-[0.03em] mb-6 pb-3 border-b border-black/5">{group.category}</h2>
              <Accordion type="single" collapsible className="space-y-1">
                {group.items.map((item, i) => (
                  <AccordionItem key={i} value={`${group.category}-${i}`} className="border border-black/5 bg-white hover:border-black/10 transition-colors px-6">
                    <AccordionTrigger className="text-[#111111] text-[14px] font-semibold tracking-[0.03em] py-4 hover:no-underline text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-[#111111]/60 text-[14px] leading-[1.8] pb-5">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-16 px-6 text-center border-t border-black/8">
        <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.02em] mb-3">{t("cta.heading")}</h2>
        <p className="text-[#111111]/45 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("cta.description")}</p>
        <Link to="/contact" className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors">{t("common:common.contactUs")}</Link>
      </section>
    </div>
  );
}

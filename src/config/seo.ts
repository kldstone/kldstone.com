/**
 * Centralized SEO configuration for all routes.
 * Used by both the React app (SEO.tsx) and build-time prerender script.
 */

export interface SeoEntry {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const SITE_URL = "https://www.kldstone.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/optimized/gani-home/banner_01.webp`;
export const SITE_NAME = "KLD Stone";

export function titleSuffix(title: string): string {
  return title.includes("KLD Stone") ? title : `${title} | KLD Stone`;
}

/** Static page SEO entries — keyed by route path (canonical) */
export const pageSeo: Record<string, SeoEntry> = {
  "/": {
    title: "Natural Marble & Custom Stone Fabrication | KLD Stone",
    description:
      "KLD Stone supplies natural marble slabs, waterjet medallions, stone mosaics, countertops, and custom stone fabrication from Shuitou, China to global projects.",
  },
  "/collections": {
    title: "Natural Marble & Waterjet Medallions | KLD Stone",
    description:
      "Premium natural marble slabs and custom waterjet medallions from KLD Stone, Shuitou, China. Browse by color family.",
  },
  "/collections/marble": {
    title: "Natural Marble Slabs Collection | KLD Stone",
    description:
      "Browse KLD Stone's premium natural marble slabs collection — quartzite, marble, and exotic stone from global quarries, available for architecture and design projects.",
  },
  "/collections/mosaic": {
    title: "Waterjet Medallions Collection | KLD Stone",
    description:
      "Explore KLD Stone's custom waterjet medallions and stone mosaics — precision-cut geometric and floral patterns for luxury floors, walls and feature areas.",
  },
  "/spaces": {
    title: "Project Spaces | KLD Stone",
    description:
      "Browse KLD Stone's project gallery featuring natural marble applications in hospitality, residential, commercial and civic spaces worldwide.",
  },
  "/custom": {
    title: "Custom Stone Service | KLD Stone",
    description:
      "KLD Stone offers custom stone fabrication — countertops, vanity tops, staircases, columns, fireplaces and bespoke architectural stonework.",
  },
  "/craftsmanship": {
    title: "Factory Tour & Craftsmanship | KLD Stone",
    description:
      "Tour the KLD Stone factory in Shuitou, China. See our waterjet cutting, CNC carving, hand-finishing and quality control processes in action.",
  },
  "/quality": {
    title: "Quality Assurance | KLD Stone",
    description:
      "KLD Stone quality assurance — from raw block selection to precision fabrication and final inspection, every piece meets strict standards.",
  },
  "/about": {
    title: "About KLD Stone | Fujian Nanan KLD Stone Co., Ltd.",
    description:
      "KLD Stone is a leading natural marble and custom stone supplier based in Shuitou, China, serving global architecture and design projects since 1996.",
  },
  "/faq": {
    title: "FAQ | KLD Stone",
    description:
      "Frequently asked questions about KLD Stone natural marble products, custom fabrication, samples, pricing, shipping, and project coordination.",
  },
  "/contact": {
    title: "Contact KLD Stone",
    description:
      "Contact KLD Stone for inquiries about natural marble, waterjet medallions, stone furniture, and custom fabrication. Get a quote for your project.",
  },
  "/catalog": {
    title: "Architectural Stone Product Catalog | KLD Stone",
    description:
      "Browse KLD Stone's architectural stone catalog, including carved stone, wall panels, furniture, mosaics and custom marble products for global projects.",
  },
  "/catalog/carved-parts": {
    title: "Carved Components Stone Products | KLD Stone",
    description:
      "Explore KLD Stone's carved decorative stone components for hospitality, residential and commercial projects.",
  },
  "/catalog/wall-panels": {
    title: "Wall Panels Stone Products | KLD Stone",
    description:
      "Explore KLD Stone's wall panel collection for hospitality, residential and commercial projects.",
  },
  "/catalog/furniture": {
    title: "Stone Furniture | KLD Stone",
    description:
      "Explore KLD Stone's stone furniture collection for hospitality, residential and commercial projects.",
  },
  "/catalog/arttech": {
    title: "Mosaic Atlas | KLD Stone",
    description:
      "Explore KLD Stone's ARTTECH mosaic atlas collection for hospitality, residential and commercial projects.",
  },
  "/landing/quote": {
    title: "Request a Quote | KLD Stone",
    description:
      "Request a quote for KLD Stone natural marble, waterjet medallions, stone furniture or custom fabrication. Get factory pricing and lead time.",
  },
  "/thank-you": {
    title: "Thank You | KLD Stone",
    description: "Your inquiry has been submitted successfully. KLD Stone will respond within 24 hours.",
    noIndex: true,
  },
};

/** Get SEO entry for a given pathname */
export function getSeoForPath(pathname: string, fallback?: SeoEntry): SeoEntry {
  const clean = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  return (
    pageSeo[clean] ||
    fallback || {
      title: "KLD Stone — Natural Marble & Custom Stone Fabrication",
      description: "KLD Stone supplies natural marble, waterjet medallions, stone fabrication from Shuitou, China.",
    }
  );
}

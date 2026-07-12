import furnitureProducts from "./furniture-products";
import carvedProducts from "./carved-products";
import wallProducts from "./wall-products";
import arttechProducts from "./arttech-products";

// ============================================================
// Product Catalog — data layer types and category configuration
// ============================================================

export type CatalogProduct = {
  id: string;
  name: string;
  /** Cover image */
  cover: string;
  /** Detail page images */
  images: string[];
  /** Short description (listing page) */
  tagline: string;
  /** Full description (detail page) */
  description: string;
  /** Style tags */
  styles?: string[];
  /** Specifications */
  specs?: string;
};

export type CatalogCategory = {
  key: string;
  name: string;
  subtitle: string;
  description: string;
  heroImg: string;
  products: CatalogProduct[];
};

const BASE = "/catalog-images";

const categories: CatalogCategory[] = [
  {
    key: "carved-parts",
    name: "Carved Components",
    subtitle: "European Carved Components",
    description:
      "Marble carved decorative components — Roman columns, window surrounds, reliefs, fireplaces and more. Each piece is precision-carved from natural marble and hand-finished, adding classic European elegance to any space.",
    heroImg: `${BASE}/carved-hero.jpg`,
    products: carvedProducts,
  },
  {
    key: "wall-panels",
    name: "Wall Panels",
    subtitle: "Stone Wall Panels",
    description:
      "French and Neo-Chinese style stone wall panels. Natural stone textures meet classic wall design language, creating layered architectural surfaces with timeless appeal.",
    heroImg: `${BASE}/wall-hero.jpg`,
    products: wallProducts,
  },
  {
    key: "furniture",
    name: "Stone Furniture",
    subtitle: "Stone Furniture Collection",
    description:
      "The 2024–2026 stone furniture collection. Dining tables, coffee tables, side tables, sinks and bathtubs crafted from natural marble, bringing the timeless质感 of stone into everyday living.",
    heroImg: `${BASE}/furniture-hero.jpg`,
    products: furnitureProducts,
  },
  {
    key: "arttech",
    name: "Mosaic Atlas",
    subtitle: "ARTTECH Mosaic Atlas",
    description:
      "KLD ARTTECH stone mosaic atlas. European classic, Chinese contemporary, and modern minimal styles, executed with precision waterjet technology for artistic floor and wall decoration.",
    heroImg: `${BASE}/arttech-hero.jpg`,
    products: arttechProducts,
  },
];

export default categories;

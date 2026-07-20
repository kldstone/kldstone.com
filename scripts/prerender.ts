// Build-time HTML prerender script
// Generates static index.html files for each SPA route so crawlers see proper meta tags

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const SITE_URL = "https://www.kldstone.com";
const DIST_DIR = join(import.meta.dirname, "..", "dist");

interface RouteMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

const LANG_PREFIXES: Record<string, { titleSuffix: string; langAttr: string; dir: string }> = {
  "": { titleSuffix: "KLD Stone", langAttr: "en", dir: "ltr" },
  "/ru": { titleSuffix: "KLD Stone | Натуральный мрамор", langAttr: "ru", dir: "ltr" },
  "/es": { titleSuffix: "KLD Stone | Mármol natural", langAttr: "es", dir: "ltr" },
  "/ar": { titleSuffix: "KLD Stone | رخام طبيعي", langAttr: "ar", dir: "rtl" },
};

const ENGLISH_ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "Natural Marble & Custom Stone Fabrication | KLD Stone",
    description: "KLD Stone supplies natural marble slabs, waterjet medallions, stone mosaics, countertops, and custom stone fabrication from Shuitou, China to global projects.",
  },
  "/collections": {
    title: "Natural Marble & Waterjet Medallions | KLD Stone",
    description: "Premium natural marble slabs and custom waterjet medallions from KLD Stone, Shuitou, China. Browse by color family.",
  },
  "/collections/marble": {
    title: "Natural Marble Slabs Collection | KLD Stone",
    description: "Browse KLD Stone's premium natural marble slabs collection — quartzite, marble, and exotic stone from global quarries.",
  },
  "/collections/mosaic": {
    title: "Waterjet Medallions Collection | KLD Stone",
    description: "Explore KLD Stone's custom waterjet medallions and stone mosaics — precision-cut geometric patterns for luxury floors and walls.",
  },
  "/spaces": {
    title: "Project Spaces | KLD Stone",
    description: "Browse KLD Stone's project gallery featuring natural marble applications in hospitality, residential, commercial and civic spaces worldwide.",
  },
  "/custom": {
    title: "Custom Stone Service | KLD Stone",
    description: "KLD Stone offers custom stone fabrication — countertops, vanity tops, staircases, columns, fireplaces and bespoke architectural stonework.",
  },
  "/craftsmanship": {
    title: "Factory Tour & Craftsmanship | KLD Stone",
    description: "Tour the KLD Stone factory in Shuitou, China. See waterjet cutting, CNC carving, hand-finishing and quality control processes.",
  },
  "/quality": {
    title: "Quality Assurance | KLD Stone",
    description: "KLD Stone quality assurance — from raw block selection to precision fabrication and final inspection.",
  },
  "/about": {
    title: "About KLD Stone | Fujian Nanan KLD Stone Co., Ltd.",
    description: "KLD Stone is a leading natural marble and custom stone supplier based in Shuitou, China, serving global projects since 1996.",
  },
  "/faq": {
    title: "FAQ | KLD Stone",
    description: "Frequently asked questions about KLD Stone natural marble products, custom fabrication, samples, pricing, shipping, and project coordination.",
  },
  "/contact": {
    title: "Contact KLD Stone",
    description: "Contact KLD Stone for inquiries about natural marble, waterjet medallions, stone furniture, and custom fabrication.",
  },
  "/catalog": {
    title: "Architectural Stone Product Catalog | KLD Stone",
    description: "Browse KLD Stone's architectural stone catalog, including carved stone, wall panels, furniture, mosaics and custom marble products.",
  },
  "/catalog/carved-parts": {
    title: "Carved Components Stone Products | KLD Stone",
    description: "Explore KLD Stone's carved decorative stone components for hospitality, residential and commercial projects.",
  },
  "/catalog/wall-panels": {
    title: "Wall Panels Stone Products | KLD Stone",
    description: "Explore KLD Stone's wall panel collection for hospitality, residential and commercial projects.",
  },
  "/catalog/furniture": {
    title: "Stone Furniture | KLD Stone",
    description: "Explore KLD Stone's stone furniture collection for hospitality, residential and commercial projects.",
  },
  "/catalog/arttech": {
    title: "Mosaic Atlas | KLD Stone",
    description: "Explore KLD Stone's ARTTECH mosaic atlas collection for hospitality, residential and commercial projects.",
  },
  "/landing/quote": {
    title: "Request a Quote | KLD Stone",
    description: "Request a quote for KLD Stone natural marble, waterjet medallions, stone furniture or custom fabrication.",
  },
  "/thank-you": {
    title: "Thank You | KLD Stone",
    description: "Your inquiry has been submitted successfully. KLD Stone will respond within 24 hours.",
    noindex: true,
  },
};

function renderHtml(meta: RouteMeta, path: string, prefix: string, langCfg: { titleSuffix: string; langAttr: string; dir: string }): string {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const robots = meta.noindex
    ? '<meta name="robots" content="noindex, nofollow" />'
    : '<meta name="robots" content="index, follow, max-image-preview:large" />';
  const ogImage = `${SITE_URL}/optimized/gani-home/banner_01.webp`;

  // Preserve existing script/link tags — only replace SEO meta
  // Read the Vite-built index.html each time so we keep the original assets
  const baseForRoute = readFileSync(join(DIST_DIR, "index.html"), "utf-8");

  let html = baseForRoute
    // Lang and dir
    .replace(/<html lang="en"/, `<html lang="${langCfg.langAttr}" dir="${langCfg.dir}"`)
    // Title
    .replace(/<title>.*?<\/title>/, `<title>${escHtml(meta.title)}</title>`)
    // Canonical
    .replace(
      /<link rel="canonical"[^>]*\/>/,
      `<link rel="canonical" href="${escAttr(canonical)}" />`
    )
    // Robots: remove all then add right before </head>
    .replace(/<meta name="robots"[^>]*\/>/g, "")
    .replace("</head>", `  ${robots}\n  </head>`);

  // Remove all description/OG/Twitter meta tags then re-insert correct ones
  html = html
    .replace(/<meta name="description"[^>]*\/>/g, "")
    .replace(/<meta property="og:title"[^>]*\/>/g, "")
    .replace(/<meta property="og:description"[^>]*\/>/g, "")
    .replace(/<meta property="og:url"[^>]*\/>/g, "")
    .replace(/<meta property="og:image"[^>]*\/>/g, "")
    .replace(/<meta name="twitter:title"[^>]*\/>/g, "")
    .replace(/<meta name="twitter:description"[^>]*\/>/g, "")
    .replace(/<meta name="twitter:image"[^>]*\/>/g, "")
    .replace("</head>", [
      `  <meta name="description" content="${escAttr(meta.description)}" />`,
      `  <meta property="og:title" content="${escAttr(meta.title)}" />`,
      `  <meta property="og:description" content="${escAttr(meta.description)}" />`,
      `  <meta property="og:url" content="${escAttr(canonical)}" />`,
      `  <meta property="og:image" content="${escAttr(ogImage)}" />`,
      `  <meta name="twitter:title" content="${escAttr(meta.title)}" />`,
      `  <meta name="twitter:description" content="${escAttr(meta.description)}" />`,
      `  <meta name="twitter:image" content="${escAttr(ogImage)}" />`,
      `  </head>`,
    ].join("\n"));

  return html;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escAttr(s: string): string {
  return escHtml(s).replace(/"/g, "&quot;");
}

function ensureDir(p: string) {
  try { mkdirSync(p, { recursive: true }); } catch { /* ok */ }
}

// Generate static HTML for each route in each language
for (const [prefix, langCfg] of Object.entries(LANG_PREFIXES)) {
  for (const [route, meta] of Object.entries(ENGLISH_ROUTES)) {
    const langRoute = prefix ? `${prefix}${route}` : route;
    const html = renderHtml(meta, langRoute, prefix, langCfg);
    if (langRoute === "/") {
      writeFileSync(join(DIST_DIR, "index.html"), html);
    } else {
      const dir = join(DIST_DIR, langRoute.replace(/^\//, ""));
      ensureDir(dir);
      writeFileSync(join(dir, "index.html"), html);
    }
    console.log(`  ✓ ${langRoute}`);
  }
}

// Sitemap — include English routes only (x-default)
const sitemapUrls: string[] = [];
for (const route of Object.keys(ENGLISH_ROUTES)) {
  if (ENGLISH_ROUTES[route].noindex) continue;
  sitemapUrls.push(`  <url><loc>${SITE_URL}${route}</loc><changefreq>weekly</changefreq><priority>${route === "/" ? "1.0" : "0.7"}</priority></url>`);
  // Add language variants with hreflang alternates
  for (const [prefix, langCfg] of Object.entries(LANG_PREFIXES)) {
    if (!prefix) continue; // English is the x-default
    const langRoute = `${prefix}${route}`;
    sitemapUrls.push(`  <url><loc>${SITE_URL}${langRoute}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }
}

writeFileSync(
  join(DIST_DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`
);
console.log("  ✓ sitemap.xml");

// 3. robots.txt
writeFileSync(
  join(DIST_DIR, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
console.log("  ✓ robots.txt");

console.log("\nPrerender complete.");

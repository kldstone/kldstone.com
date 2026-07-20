import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SITE_URL, getSeoForPath } from "@/config/seo";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  /** Additional JSON-LD (product schema, FAQPage, etc.) */
  jsonLd?: Record<string, unknown>;
}

const CHINESE_URL = "https://www.kldstone.cn";
const DEFAULT_IMAGE = `${SITE_URL}/optimized/gani-home/banner_01.webp`;

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  const selector = `meta[${attr}="${name}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeLink(rel: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  const el = document.querySelector<HTMLLinkElement>(selector);
  if (el) el.remove();
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function useSEO({
  title: forcedTitle,
  description: forcedDesc,
  ogImage,
  noIndex,
  jsonLd,
}: SEOProps = {}) {
  const { pathname } = useLocation();
  const { t } = useTranslation("common");

  const canonicalPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const fullUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage || DEFAULT_IMAGE;

  useEffect(() => {
    const suffix = t("seo.titleSuffix");
    const entry = getSeoForPath(canonicalPath);
    const title = forcedTitle ?? entry.title;
    const desc = forcedDesc ?? entry.description;
    const idx = noIndex ?? entry.noIndex ?? false;
    const fullTitle = title.includes(suffix) ? title : `${title} | ${suffix}`;

    document.title = fullTitle;
    setMeta("description", desc);
    setMeta("robots", idx ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setLink("canonical", fullUrl);
    setLink("alternate", fullUrl, "en");
    setLink("alternate", `${CHINESE_URL}`, "zh-CN");
    setLink("alternate", fullUrl, "x-default");

    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", image, true);
    setMeta("og:image:alt", "KLD Stone natural marble and custom stone fabrication", true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "KLD Stone", true);
    setMeta("og:locale", "en_US", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", image);

    // Organization schema
    setJsonLd("schema-organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "KLD Stone",
      legalName: "Fujian Nanan KLD Stone Co., Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/kld-logo-web.png`,
      email: "kldstone.china@gmail.com",
      telephone: "+86 156 5906 9988",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Houdian Industrial Zone, Shijing",
        addressLocality: "Nan'an",
        addressRegion: "Fujian",
        addressCountry: "CN",
      },
      areaServed: "Worldwide",
    });

    // WebSite schema
    setJsonLd("schema-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "KLD Stone",
      url: SITE_URL,
      inLanguage: "en",
    });

    // BreadcrumbList
    const segments = canonicalPath.split("/").filter(Boolean);
    setJsonLd("schema-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...segments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: segment.replace(/-/g, " "),
          item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}`,
        })),
      ],
    });

    // Extra JSON-LD (Product, FAQPage, etc.)
    if (jsonLd) {
      setJsonLd("schema-extra", jsonLd);
    } else {
      removeJsonLd("schema-extra");
    }

    // Cleanup alternates on unmount so next page mount starts fresh
    return () => {
      removeLink("alternate", "en");
      removeLink("alternate", "zh-CN");
      removeLink("alternate", "x-default");
    };
  }, [forcedTitle, forcedDesc, image, fullUrl, canonicalPath, noIndex, t, jsonLd]);
}

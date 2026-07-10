import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
}

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://www.kldstone.com";

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function useSEO({ title, description, ogImage }: SEOProps) {
  const { pathname } = useLocation();
  const { t } = useTranslation("common");
  const fullUrl = `${BASE_URL}${pathname}`;
  const image = ogImage || `${BASE_URL}/gani-home/banner_01.jpg`;

  useEffect(() => {
    const suffix = t("seo.titleSuffix");
    document.title = `${title} | ${suffix}`;
    const desc = description || t("seo.defaultDescription");
    setMeta("description", desc);

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = fullUrl;

    setMeta("og:title", `${title} | ${suffix}`, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", image, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", "website", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${title} | ${suffix}`);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", image);
  }, [title, description, image, fullUrl, pathname, t]);
}

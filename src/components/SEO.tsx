import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
}

const BASE_URL = "https://www.kldstone.cn";

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
  const fullUrl = `${BASE_URL}${pathname}`;
  const image = ogImage || `${BASE_URL}/gani-home/banner_01.jpg`;

  useEffect(() => {
    document.title = `${title} | 康利德石材 KLD Stone`;

    setMeta("description", description);

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = fullUrl;

    setMeta("og:title", `${title} | 康利德石材 KLD Stone`, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", "website", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${title} | 康利德石材 KLD Stone`);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [title, description, image, fullUrl, pathname]);
}
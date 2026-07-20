import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// English static imports
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enCollections from "./locales/en/collections.json";
import enContact from "./locales/en/contact.json";
import enCraftsmanship from "./locales/en/craftsmanship.json";
import enQuality from "./locales/en/quality.json";
import enSpaces from "./locales/en/spaces.json";
import enFaq from "./locales/en/faq.json";
import enCustom from "./locales/en/custom.json";

const resources = {
  en: {
    common: enCommon, home: enHome, about: enAbout,
    collections: enCollections, contact: enContact,
    craftsmanship: enCraftsmanship, quality: enQuality,
    spaces: enSpaces, faq: enFaq, custom: enCustom,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

const LANG_MODULES: Record<string, () => Promise<Record<string, { default: Record<string, unknown> }>>> = {
  ru: () => Promise.all([
    import("./locales/ru/common.json"),
    import("./locales/ru/home.json"),
    import("./locales/ru/about.json"),
    import("./locales/ru/collections.json"),
    import("./locales/ru/contact.json"),
    import("./locales/ru/craftsmanship.json"),
    import("./locales/ru/quality.json"),
    import("./locales/ru/spaces.json"),
    import("./locales/ru/faq.json"),
    import("./locales/ru/custom.json"),
  ]).then(([common, home, about, collections, contact, craftsmanship, quality, spaces, faq, custom]) => ({
    common, home, about, collections, contact, craftsmanship, quality, spaces, faq, custom,
  })),
  ar: () => Promise.all([
    import("./locales/ar/common.json"),
    import("./locales/ar/home.json"),
    import("./locales/ar/about.json"),
    import("./locales/ar/collections.json"),
    import("./locales/ar/contact.json"),
    import("./locales/ar/craftsmanship.json"),
    import("./locales/ar/quality.json"),
    import("./locales/ar/spaces.json"),
    import("./locales/ar/faq.json"),
    import("./locales/ar/custom.json"),
  ]).then(([common, home, about, collections, contact, craftsmanship, quality, spaces, faq, custom]) => ({
    common, home, about, collections, contact, craftsmanship, quality, spaces, faq, custom,
  })),
  es: () => Promise.all([
    import("./locales/es/common.json"),
    import("./locales/es/home.json"),
    import("./locales/es/about.json"),
    import("./locales/es/collections.json"),
    import("./locales/es/contact.json"),
    import("./locales/es/craftsmanship.json"),
    import("./locales/es/quality.json"),
    import("./locales/es/spaces.json"),
    import("./locales/es/faq.json"),
    import("./locales/es/custom.json"),
  ]).then(([common, home, about, collections, contact, craftsmanship, quality, spaces, faq, custom]) => ({
    common, home, about, collections, contact, craftsmanship, quality, spaces, faq, custom,
  })),
};

// Supported languages
export const SUPPORTED_LANGS = ["en", "ru", "ar", "es"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(s: string): s is SupportedLang {
  return SUPPORTED_LANGS.includes(s as SupportedLang);
}

const rtlLangs = new Set(["ar"]);

i18n.on("languageChanged", async (lng) => {
  document.documentElement.lang = lng || "en";
  document.documentElement.dir = rtlLangs.has(lng || "") ? "rtl" : "ltr";

  if (lng !== "en" && !i18n.hasResourceBundle(lng, "common")) {
    const loader = LANG_MODULES[lng];
    if (loader) {
      const mods = await loader();
      for (const [ns, mod] of Object.entries(mods)) {
        i18n.addResourceBundle(lng, ns, mod.default ?? mod, true, true);
      }
    }
  }
});

export default i18n;

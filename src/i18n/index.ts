import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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

import ruCommon from "./locales/ru/common.json";
import ruHome from "./locales/ru/home.json";
import ruAbout from "./locales/ru/about.json";
import ruCollections from "./locales/ru/collections.json";
import ruContact from "./locales/ru/contact.json";
import ruCraftsmanship from "./locales/ru/craftsmanship.json";
import ruQuality from "./locales/ru/quality.json";
import ruSpaces from "./locales/ru/spaces.json";
import ruFaq from "./locales/ru/faq.json";
import ruCustom from "./locales/ru/custom.json";

import arCommon from "./locales/ar/common.json";
import arHome from "./locales/ar/home.json";
import arAbout from "./locales/ar/about.json";
import arCollections from "./locales/ar/collections.json";
import arContact from "./locales/ar/contact.json";
import arCraftsmanship from "./locales/ar/craftsmanship.json";
import arQuality from "./locales/ar/quality.json";
import arSpaces from "./locales/ar/spaces.json";
import arFaq from "./locales/ar/faq.json";
import arCustom from "./locales/ar/custom.json";

import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esAbout from "./locales/es/about.json";
import esCollections from "./locales/es/collections.json";
import esContact from "./locales/es/contact.json";
import esCraftsmanship from "./locales/es/craftsmanship.json";
import esQuality from "./locales/es/quality.json";
import esSpaces from "./locales/es/spaces.json";
import esFaq from "./locales/es/faq.json";
import esCustom from "./locales/es/custom.json";

const resources = {
  en: {
    common: enCommon, home: enHome, about: enAbout,
    collections: enCollections, contact: enContact,
    craftsmanship: enCraftsmanship, quality: enQuality,
    spaces: enSpaces, faq: enFaq, custom: enCustom,
  },
  ru: {
    common: ruCommon, home: ruHome, about: ruAbout,
    collections: ruCollections, contact: ruContact,
    craftsmanship: ruCraftsmanship, quality: ruQuality,
    spaces: ruSpaces, faq: ruFaq, custom: ruCustom,
  },
  ar: {
    common: arCommon, home: arHome, about: arAbout,
    collections: arCollections, contact: arContact,
    craftsmanship: arCraftsmanship, quality: arQuality,
    spaces: arSpaces, faq: arFaq, custom: arCustom,
  },
  es: {
    common: esCommon, home: esHome, about: esAbout,
    collections: esCollections, contact: esContact,
    craftsmanship: esCraftsmanship, quality: esQuality,
    spaces: esSpaces, faq: esFaq, custom: esCustom,
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

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;

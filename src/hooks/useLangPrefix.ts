import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { SUPPORTED_LANGS } from "@/i18n";

/**
 * Returns the language prefix based on current pathname.
 * "" for English, "/ru" for Russian, "/ar" for Arabic, "/es" for Spanish.
 */
export function useLangPrefix(): string {
  const { pathname } = useLocation();
  return useMemo(() => {
    for (const lang of SUPPORTED_LANGS) {
      if (lang === "en") continue;
      if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
        return `/${lang}`;
      }
    }
    return "";
  }, [pathname]);
}

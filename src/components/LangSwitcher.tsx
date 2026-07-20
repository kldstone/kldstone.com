import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const languages = [
  { code: "en", label: "EN", path: "" },
  { code: "ru", label: "RU", path: "/ru" },
  { code: "ar", label: "AR", path: "/ar" },
  { code: "es", label: "ES", path: "/es" },
];

interface LangSwitcherProps {
  /** Current language prefix ("" for English, "/ru" for Russian, etc.) */
  langPrefix?: string;
}

export default function LangSwitcher({ langPrefix: _langPrefix }: LangSwitcherProps = {}) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  // Get the relative path without language prefix
  const basePath = useMemo(() => {
    const p = location.pathname;
    for (const lang of languages) {
      if (lang.path && p.startsWith(lang.path)) {
        return p.slice(lang.path.length) || "/";
      }
    }
    return p;
  }, [location.pathname]);

  const switchLang = useCallback(
    (code: string, path: string) => {
      i18n.changeLanguage(code);
      setOpen(false);
      // Navigate to same page in target language
      const target = path ? `${path}${basePath}` : basePath;
      navigate(target + location.search);
    },
    [i18n, navigate, basePath, location.search]
  );

  return (
    <div className="relative" ref={ref}>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[#111111]/50 hover:text-[#111111] transition-colors"
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span className="text-[11px] font-semibold tracking-[0.04em]">{current.label}</span>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1 min-w-[120px] bg-white shadow-lg border border-black/10 py-1 z-[999]"
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={i18n.language === lang.code}
              onClick={() => switchLang(lang.code, lang.path)}
              className={`block w-full text-left px-4 py-2 text-[12px] font-medium tracking-[0.04em] transition-colors ${
                i18n.language === lang.code
                  ? "text-[#34c759] font-bold bg-[#34c759]/5"
                  : "text-[#111111]/60 hover:text-[#111111] hover:bg-black/5"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

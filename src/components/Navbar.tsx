import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";

interface NavbarProps {
  langPrefix?: string;
}

export default function Navbar({ langPrefix = "" }: NavbarProps) {
  const { t } = useTranslation("common");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  const p = (path: string) => `${langPrefix}${path}`;

  const navLinks = [
    { label: t("nav.home"), href: p("/") },
    {
      label: t("nav.collections"),
      href: p("/collections"),
      children: [
        { label: t("nav.naturalMarble"), href: p("/collections/marble") },
        { label: t("nav.waterjetMedallions"), href: p("/collections/mosaic") },
      ],
    },
    {
      label: t("nav.catalog"),
      href: p("/catalog"),
      children: [
        { label: t("nav.carvedComponents"), href: p("/catalog/carved-parts") },
        { label: t("nav.wallPanels"), href: p("/catalog/wall-panels") },
        { label: t("nav.stoneFurniture"), href: p("/catalog/furniture") },
        { label: t("nav.mosaicAtlas"), href: p("/catalog/arttech") },
      ],
    },
    { label: t("nav.projectSpaces"), href: p("/spaces") },
    { label: t("nav.factoryTour"), href: p("/craftsmanship") },
    { label: t("nav.faq"), href: p("/faq") },
    { label: t("nav.aboutUs"), href: p("/about") },
    { label: t("nav.contactUs"), href: p("/contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === p("/")) return location.pathname === p("/");
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Top info bar */}
      <div className="w-full bg-white border-b border-black/5 text-[#111111]/50 text-[12px] tracking-[0.04em]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between min-h-[34px]">
          <span className="truncate">{t("nav.topbar")}</span>
          <span className="hidden sm:flex items-center gap-4 ml-4 shrink-0">
            <LangSwitcher langPrefix={langPrefix} />
            <span className="text-black/20">|</span>
            <a href="tel:+8615659069988" className="hover:text-[#34c759] transition-colors">+86 156 5906 9988</a>
            <span className="text-black/20">|</span>
            <span className="flex items-center gap-1.5 text-[#111111]/50">
              {t("nav.whatsapp")}
            </span>
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a[href]")) {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }
        }}
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-400 border-b ${
          scrolled
            ? "bg-white/97 border-black/8 backdrop-blur-[20px] shadow-sm"
            : "bg-white/95 border-black/5 backdrop-blur-[20px]"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between min-h-[78px] gap-6">
          {/* Logo */}
          <Link to={p("/")} className="flex items-center gap-3 shrink-0">
            <img
              src="/kld-logo-web.png"
              alt="KLD Stone"
              className="w-[100px] h-[56px] object-contain"
            />
            <span className="hidden lg:block">
              <strong className="block text-[#111111] text-[13px] tracking-[0.10em] leading-tight">{t("nav.brandName")}</strong>
              <small className="block text-[#111111]/45 text-[10px] tracking-[0.06em] mt-[2px]">{t("nav.brandSub")}</small>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                <Link
                  to={link.href}
                  className={`inline-flex items-center justify-center min-h-[44px] px-[12px] text-[12.5px] font-semibold tracking-[0.05em] transition-colors whitespace-nowrap ${
                    isActive(link.href)
                      ? "text-[#34c759] font-bold"
                      : "text-[#111111]/60 hover:text-[#111111]"
                  }`}
                  onMouseEnter={() => link.children && setDropdownOpen(link.href)}
                  onClick={() => link.children && setDropdownOpen(link.href === dropdownOpen ? null : link.href)}
                >
                  {link.label}
                  {link.children && (
                    <svg className="ml-1 w-3 h-3 transition-transform group-hover/dropdown:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </Link>

                {link.children && dropdownOpen === link.href && (
                  <div
                    className="absolute top-full left-0 min-w-[190px] bg-white shadow-lg border border-black/5 py-2 animate-fadeInDown"
                    onMouseEnter={() => setDropdownOpen(link.href)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`block px-5 py-3 text-[12px] font-medium tracking-[0.04em] transition-colors ${
                          location.pathname === child.href ? "text-[#34c759] font-bold" : "text-[#111111]/60 hover:text-[#111111] hover:bg-[#34c759]/5"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile visible links */}
          <div className="hidden md:flex lg:hidden items-center gap-0">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`inline-flex items-center justify-center min-h-[44px] px-[9px] text-[11px] font-semibold tracking-[0.03em] transition-colors whitespace-nowrap ${
                  isActive(link.href) ? "text-[#34c759] font-bold" : "text-[#111111]/60 hover:text-[#111111]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <span className="text-black/20 text-[11px] px-1">···</span>
          </div>

          {/* CTA */}
          <Link
            to={p("/contact")}
            className="hidden md:inline-flex items-center justify-center min-h-[40px] px-5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.06em] hover:bg-[#34c759]/80 transition-colors whitespace-nowrap shrink-0"
          >
            {t("nav.getQuote")}
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden border border-black/15 bg-transparent text-[#111111]/80 px-3 py-2 text-[12px] font-bold tracking-[0.08em]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
          >
            {menuOpen ? t("nav.close") : t("nav.menu")}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,border-color] duration-300 ${
            menuOpen ? "max-h-[700px] border-t border-black/5" : "max-h-0"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-3 border-b border-black/5 bg-white">
            <span className="text-[#111111]/40 text-[11px] font-medium tracking-[0.04em]">LANGUAGE</span>
            <LangSwitcher langPrefix={langPrefix} />
          </div>
          <div className="bg-white px-6 py-3 border-b border-black/5">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  to={link.href}
                  className={`block py-3.5 text-[13px] font-semibold tracking-[0.06em] border-b border-black/5 transition-colors ${
                    isActive(link.href) ? "text-[#34c759] font-bold" : "text-[#111111]/60 hover:text-[#111111]"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && menuOpen && (
                  <div className="pl-5 pb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block py-2.5 text-[12px] tracking-[0.04em] text-[#111111]/40 hover:text-[#34c759] transition-colors border-b border-black/3"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to={p("/contact")}
              className="mt-3 block text-center bg-[#34c759] text-white py-3 text-[12px] font-bold tracking-[0.06em]"
            >
              {t("nav.getQuote")}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

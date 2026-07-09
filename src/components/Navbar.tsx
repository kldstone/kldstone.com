import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  const { t } = useTranslation("common");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.collections"),
      href: "/collections",
      children: [
        { label: t("nav.naturalMarble"), href: "/collections/marble" },
        { label: t("nav.waterjetMedallions"), href: "/collections/mosaic" },
      ],
    },
    { label: t("nav.projectSpaces"), href: "/spaces" },
    { label: t("nav.factoryTour"), href: "/craftsmanship" },
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.aboutUs"), href: "/about" },
    { label: t("nav.contactUs"), href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Top info bar */}
      <div className="w-full bg-white border-b border-black/5 text-[#111111]/50 text-[12px] tracking-[0.04em]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between min-h-[34px]">
          <span className="truncate">{t("nav.topbar")}</span>
          <span className="hidden sm:flex items-center gap-4 ml-4 shrink-0">
            <LangSwitcher />
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
        className={`sticky top-0 z-50 transition-all duration-400 border-b ${
          scrolled
            ? "bg-white/97 border-black/8 backdrop-blur-[20px] shadow-sm"
            : "bg-white/95 border-black/5 backdrop-blur-[20px]"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between min-h-[78px] gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/kld-logo-web.png"
              alt="KLD Stone"
              className="w-[96px] h-[40px] object-contain"
            />
            <span className="hidden lg:block">
              <strong className="block text-[#111111] text-[13px] tracking-[0.10em] leading-tight">{t("nav.brandName")}</strong>
              <small className="block text-[#111111]/45 text-[10px] tracking-[0.06em] mt-[2px]">{t("nav.brandSub")}</small>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group/dropdown">
                <Link
                  to={link.href}
                  className={`inline-flex items-center justify-center min-h-[44px] px-[12px] text-[12.5px] font-semibold tracking-[0.05em] transition-colors whitespace-nowrap ${
                    isActive(link.href)
                      ? "text-[#34c759] font-bold"
                      : "text-[#111111]/60 hover:text-[#111111]"
                  }`}
                  onMouseEnter={() => link.children && setDropdownOpen(true)}
                  onMouseLeave={() => link.children && setDropdownOpen(false)}
                >
                  {link.label}
                  {link.children && (
                    <svg className="ml-1 w-3 h-3 transition-transform group-hover/dropdown:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  )}
                </Link>

                {link.children && dropdownOpen && (
                  <div
                    className="absolute top-full left-0 min-w-[190px] bg-white shadow-lg border border-black/5 py-2 animate-fadeInDown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
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
            to="/contact"
            className="hidden md:inline-flex items-center justify-center min-h-[40px] px-5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.06em] hover:bg-[#34c759]/80 transition-colors whitespace-nowrap shrink-0"
          >
            {t("nav.getQuote")}
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden border border-black/15 bg-transparent text-[#111111]/80 px-3 py-2 text-[12px] font-bold tracking-[0.08em]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? t("nav.close") : t("nav.menu")}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[700px] border-t border-black/5" : "max-h-0"
          }`}
        >
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
              to="/contact"
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

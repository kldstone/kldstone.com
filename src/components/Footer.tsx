import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackEvent } from "@/lib/analytics";
import { useLangPrefix } from "@/hooks/useLangPrefix";

export default function Footer() {
  const { t } = useTranslation("common");
  const prefix = useLangPrefix();

  const p = (path: string) => `${prefix}${path}`;

  return (
    <footer className="relative bg-[#f8f8f8] text-[#111111]/65 border-t border-black/8">
      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="py-16 border-b border-black/6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <img src="/kld-logo-web.png" alt="KLD Stone" className="w-[120px] h-auto mb-6" />
              <p className="text-[#111111]/45 text-[13px] leading-relaxed max-w-[240px]">
                {t("footer.tagline")}
              </p>
            </div>

            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">{t("footer.explore")}</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: t("footer.collections"), to: p("/collections") },
                  { label: t("footer.projectSpaces"), to: p("/spaces") },
                  { label: t("footer.aboutUs"), to: p("/about") },
                  { label: t("footer.contactUs"), to: p("/contact") },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="text-[#111111]/45 text-[13px] hover:text-[#34c759] transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">{t("footer.productCategories")}</h4>
              <div className="flex flex-col gap-3">
                <Link to={p("/collections/marble")} className="text-[#111111]/45 text-[13px] hover:text-[#34c759] transition-colors">{t("footer.naturalMarble")}</Link>
                <Link to={p("/collections/mosaic")} className="text-[#111111]/45 text-[13px] hover:text-[#34c759] transition-colors">{t("footer.waterjetMedallions")}</Link>
              </div>
            </div>

            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">{t("footer.contact")}</h4>
              <div className="flex flex-col gap-3 text-[13px] text-[#111111]/45">
                <p className="flex items-center gap-2 text-[#34c759] font-medium">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+8615659069988" onClick={() => trackEvent("phone_click", {source:"footer"})}>+86 156 5906 9988</a>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:kldstone.china@gmail.com" onClick={() => trackEvent("email_click", {source:"footer"})} className="hover:text-[#34c759] transition-colors">
                    kldstone.china@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <a href="https://wa.me/8615659069988" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", {source:"footer"})} className="hover:text-[#34c759] transition-colors">
                    +86 156 5906 9988 (WhatsApp)
                  </a>
                </p>
                <p>{t("footer.address")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 flex items-center justify-center text-[11px] text-[#111111]/30 tracking-[0.04em]">
          <span>&copy; {new Date().getFullYear()} {t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}

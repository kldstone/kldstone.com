import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";
import { useSEO } from "@/components/SEO";

export default function Contact() {
  const { t } = useTranslation("contact");
  useSEO({ title: "Contact KLD Stone", description: t("hero.description") });
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data: Record<string, string> = {};
    const fd = new FormData(form);
    for (const [key, val] of fd.entries()) {
      if (typeof val === "string") data[key] = val;
    }

    // Collect UTM/gclid params from URL
    const sp = new URLSearchParams(window.location.search);
    for (const p of ["utm_source", "utm_medium", "utm_campaign", "gclid", "gbraid", "wbraid"]) {
      const v = sp.get(p);
      if (v) data[p] = v;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        // Only fire conversion on confirmed server success
        trackConversion("form_submit", { source: "contact_page" });
        // Navigate to thank-you page
        navigate("/thank-you" + window.location.search);
      } else {
        setError(json.error || t("form.errorGeneric"));
      }
    } catch {
      setError(t("form.errorNetwork"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/contact-hero-2026-07-06-v4.jpg")} alt="Contact KLD Stone" className="w-full h-full object-cover opacity-80" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.20em] uppercase">{t("hero.title")}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">
              {t("hero.heading")}
            </h1>
            <p className="text-white/55 text-[15px] max-w-[460px] mx-auto leading-relaxed">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <h2 className="text-[#111111] text-[1.6rem] font-black tracking-[0.02em] mb-8">{t("info.heading")}</h2>
            <div className="space-y-8">
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("info.address")}</span>
                <p className="text-[#111111] text-[15px] font-semibold leading-relaxed">{t("info.addressValue")}</p>
              </div>
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("info.phone")}</span>
                <a href="tel:+8615659069988" onClick={() => trackConversion("phone_click", { source: "contact_page" })} className="text-[#111111] text-[18px] font-black tracking-[0.02em] hover:opacity-60 transition-colors">
                  +86 156 5906 9988
                </a>
              </div>
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("info.email")}</span>
                <a href="mailto:kldstone.china@gmail.com" className="text-[#111111] text-[15px] font-semibold hover:opacity-60 transition-colors">
                  kldstone.china@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">{t("info.whatsapp")}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#34c759] rounded-full flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/></svg>
                  </div>
                  <div>
                    <p className="text-[#111111] text-[14px] font-semibold">{t("info.whatsappTitle")}</p>
                    <p className="text-[#111111] text-[12px]">{t("info.whatsappDesc")}</p>
                    <p className="text-[#111111] text-[13px] font-medium mt-0.5">WhatsApp: +86 156 5906 9988</p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden img-hover">
                <img src={optimizedImage("/brand-gallery/contact-factory-2026-07-07.jpg")} alt="KLD Stone Factory" className="w-full aspect-[16/9] object-cover" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[#111111] text-[1.6rem] font-black tracking-[0.02em] mb-8">{t("form.heading")}</h2>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot — hidden from users, visible to bots */}
              <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("form.name")}</label>
                  <input id="name" type="text" name="name" required maxLength={200} className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors" placeholder={t("form.namePlaceholder")} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("form.email")}</label>
                  <input id="email" type="email" name="email" required maxLength={200} className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors" placeholder={t("form.emailPlaceholder")} />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("form.phone")}</label>
                <input id="phone" type="tel" name="phone" maxLength={50} className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors" placeholder={t("form.phonePlaceholder")} />
              </div>
              <div>
                <label htmlFor="company" className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("form.company")}</label>
                <input id="company" type="text" name="company" maxLength={200} className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors" placeholder={t("form.companyPlaceholder")} />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">{t("form.message")}</label>
                <textarea id="message" name="message" required rows={6} maxLength={5000} className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors resize-none" placeholder={t("form.messagePlaceholder")} />
              </div>

              {error && (
                <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-[13px] px-4 py-3">
                  {error}
                </div>
              )}

              <button type="submit" disabled={sending} className="w-full py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.10em] uppercase hover:bg-[#34c759]/80 transition-colors disabled:opacity-50">
                {sending ? t("form.sending") : t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

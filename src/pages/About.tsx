import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";

export default function About() {
  const { t } = useTranslation("about");
  useSEO({ title: "About KLD Stone", description: t("hero.paragraphs.0") });

  const paragraphs = t("hero.paragraphs", { returnObjects: true }) as string[];

  return (
    <div>
      <section className="relative bg-[#0f0f0f] overflow-hidden">
        <img
          src={optimizedImage("/brand-gallery/about-hero-2026-07-06-v2.jpg")}
          alt="About KLD Stone"
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </section>

      <section className="max-w-[900px] mx-auto px-6 py-20">
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block text-center mb-5">
          {t("hero.title")}
        </span>
        <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] text-center mb-10">
          {t("hero.heading")}
        </h2>
        <div className="space-y-6 text-[16px] leading-[1.9] text-[var(--muted)]">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("discover.title")}</span>
            <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">{t("discover.heading")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/craftsmanship" className="group bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/40 transition-colors">
              <div className="mb-5 overflow-hidden">
                <img src={optimizedImage("/brand-gallery/about-card-craftsmanship-2026-07-06.jpg")} alt="Factory Tour" className="w-full aspect-[4/3] object-cover img-hover" />
              </div>
              <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-2">{t("discover.factoryTour.title")}</h3>
              <p className="text-[var(--muted)] text-[13px] leading-[1.7] mb-4">{t("discover.factoryTour.desc")}</p>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.08em] uppercase group-hover:tracking-[0.12em] transition-all">{t("common:common.learnMore")}</span>
            </Link>
            <Link to="/quality" className="group bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/40 transition-colors">
              <div className="mb-5 overflow-hidden">
                <img src={optimizedImage("/brand-gallery/about-card-quality-2026-07-06.jpg")} alt="Quality Assurance" className="w-full aspect-[4/3] object-cover img-hover" />
              </div>
              <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-2">{t("discover.qualityAssurance.title")}</h3>
              <p className="text-[var(--muted)] text-[13px] leading-[1.7] mb-4">{t("discover.qualityAssurance.desc")}</p>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.08em] uppercase group-hover:tracking-[0.12em] transition-all">{t("common:common.learnMore")}</span>
            </Link>
            <Link to="/custom" className="group bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/40 transition-colors">
              <div className="mb-5 overflow-hidden">
                <img src={optimizedImage("/brand-gallery/about-card-custom-2026-07-06.jpg")} alt="Custom Service" className="w-full aspect-[4/3] object-cover img-hover" />
              </div>
              <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-2">{t("discover.customService.title")}</h3>
              <p className="text-[var(--muted)] text-[13px] leading-[1.7] mb-4">{t("discover.customService.desc")}</p>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.08em] uppercase group-hover:tracking-[0.12em] transition-all">{t("common:common.learnMore")}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <div className="overflow-hidden img-hover">
              <img src={optimizedImage("/brand-gallery/about-exhibition-2026-07-06.jpg")} alt="Stone Exhibition" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="overflow-hidden img-hover">
              <img src={optimizedImage("/brand-gallery/about-exhibition-02-2026-07-08.jpg")} alt="Exhibition On Site" className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("exhibition.title")}</span>
            <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.02em] mt-2 mb-5">{t("exhibition.heading")}</h2>
            <div className="space-y-4 text-[var(--muted)] text-[14px] leading-[1.8]">
              {t("exhibition.paragraphs", { returnObjects: true }).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <Link to="/contact" className="inline-block mt-6 text-[var(--ink)] text-[12px] font-bold tracking-[0.08em] border-b border-[#34c759]/20/40 pb-1 hover:text-[var(--ink)] transition-colors">
              {t("exhibition.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--panel)] py-16 px-6 text-center">
        <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.02em] mb-3">{t("cta.heading")}</h2>
        <p className="text-[var(--muted)] text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("cta.description")}</p>
        <Link to="/contact" className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors">
          {t("common:common.contactUs")}
        </Link>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";

const inspectionImgs = ["/brand-gallery/071-inspection-img-1921.jpg","/brand-gallery/072-inspection-img-1922.jpg","/brand-gallery/073-inspection-img-2091.jpg","/brand-gallery/074-inspection-img-2156.jpg","/brand-gallery/075-inspection-img-2502.jpg","/brand-gallery/076-inspection-img-2504.jpg"];
const deliveryImgs = ["/brand-gallery/057-delivery-img-1901.jpg","/brand-gallery/058-delivery-img-1890.jpg","/brand-gallery/059-delivery-img-2119.jpg","/brand-gallery/060-delivery-img-1889.jpg","/brand-gallery/061-delivery-img-1898.jpg","/brand-gallery/062-delivery-img-2122.jpg","/brand-gallery/063-delivery-img-1878.jpg","/brand-gallery/064-delivery-img-2124.jpg","/brand-gallery/065-delivery-img-2125.jpg","/brand-gallery/066-delivery-img-2120.jpg","/brand-gallery/067-delivery-img-2126.jpg","/brand-gallery/068-delivery-img-2123.jpg","/brand-gallery/069-delivery-img-1877.jpg"];

export default function Quality() {
  const { t } = useTranslation("quality");
  useSEO({ title: "Quality Assurance", description: t("hero.description") });

  const checks = t("control.checks", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const packagingSteps = t("packaging.steps", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/076-inspection-img-2504.jpg")} alt="Quality Inspection" className="w-full h-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.20em] uppercase">{t("hero.title")}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-4">{t("hero.heading")}</h1>
            <p className="text-white/55 text-[15px] max-w-[560px] mx-auto leading-relaxed">{t("hero.description")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">{t("standard.title")}</span>
        <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mb-5">{t("standard.heading")}</h2>
        <p className="text-[var(--muted)] text-[15px] leading-[1.9] max-w-[680px] mx-auto">{t("standard.text")}</p>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("control.title")}</span>
            <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.03em] mt-2">{t("control.heading")}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-16">
            {inspectionImgs.map((src, i) => (
              <div key={src} className="overflow-hidden img-hover">
                <img src={optimizedImage(src)} alt={`Inspection ${i + 1}`} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {checks.map((item) => (
              <div key={item.title} className="bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/30 transition-colors">
                <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-[13px] leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("packaging.title")}</span>
          <h2 className="text-[var(--ink)] text-[1.5rem] font-black tracking-[0.03em] mt-2">{t("packaging.heading")}</h2>
          <p className="text-[var(--muted)] text-[14px] mt-3 max-w-[500px] mx-auto leading-relaxed">{t("packaging.description")}</p>
        </div>
        {packagingSteps.map((step, i) => (
          <div key={step.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i !== packagingSteps.length - 1 ? "mb-16 pb-16 border-b border-[var(--line)]" : ""} ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
            <div className={`overflow-hidden ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
              <img src={optimizedImage(deliveryImgs[i * 5] || deliveryImgs[0])} alt={step.title} className="w-full aspect-[4/3] object-cover img-hover" loading="lazy" decoding="async" />
            </div>
            <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
              <span className="text-[#111111] text-[11px] font-bold tracking-[0.12em] opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[var(--ink)] text-[1.25rem] font-black tracking-[0.03em] mt-2 mb-4">{step.title}</h3>
              <p className="text-[var(--muted)] text-[14px] leading-[1.9]">{step.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("packingSite.title")}</span>
            <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">{t("packingSite.heading")}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {deliveryImgs.map((src, i) => (
              <div key={src} className="overflow-hidden img-hover">
                <img src={optimizedImage(src)} alt={`Packing ${i + 1}`} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f8f8] py-16 px-6 text-center border-t border-black/8">
        <h2 className="text-[#111111] text-[1.4rem] font-black tracking-[0.02em] mb-3">{t("cta.heading")}</h2>
        <p className="text-[#111111]/45 text-[14px] mb-8 max-w-[460px] mx-auto leading-relaxed">{t("cta.description")}</p>
        <Link to="/contact" className="inline-block px-10 py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#34c759]/80 transition-colors">{t("cta.button")}</Link>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizedImage } from "@/lib/images";
import { useSEO } from "@/components/SEO";

const processImages = [
  "/brand-gallery/078-details-img-1664.jpg",
  "/brand-gallery/079-details-img-1573.jpg",
  "/brand-gallery/082-details-img-1539.jpg",
  "/brand-gallery/083-details-img-1566.jpg",
  "/brand-gallery/086-details-img-1236.jpg",
  "/brand-gallery/087-details-img-1246.jpg",
];

export default function CustomService() {
  const { t } = useTranslation("custom");
  useSEO({ title: "Custom Stone Service", description: t("hero.description") });

  const steps = t("steps", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const serviceTypes = [
    { title: t("types.privateHomes.title"), desc: t("types.privateHomes.desc") },
    { title: t("types.commercialSpaces.title"), desc: t("types.commercialSpaces.desc") },
    { title: t("types.designerCollaboration.title"), desc: t("types.designerCollaboration.desc") },
    { title: t("types.projectSupply.title"), desc: t("types.projectSupply.desc") },
  ];

  return (
    <div>
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/008-spaces-img-1200.jpg")} alt="Custom Stone Service" className="w-full h-full object-cover opacity-65" />
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
        <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase block mb-4">{t("intro.title")}</span>
        <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mb-5">{t("intro.heading")}</h2>
        <p className="text-[var(--muted)] text-[15px] leading-[1.8] max-w-[680px] mx-auto">{t("intro.text")}</p>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="space-y-24">
            {steps.map((step, i) => (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <span className="text-[#111111] text-[13px] font-bold tracking-[0.12em] opacity-50">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[var(--ink)] text-[1.3rem] font-black tracking-[0.03em] mt-2 mb-4">{step.title}</h3>
                  <p className="text-[var(--muted)] text-[14px] leading-[1.9]">{step.desc}</p>
                </div>
                <div className={`overflow-hidden ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <img src={optimizedImage(processImages[i] || processImages[0])} alt={step.title} className="w-full aspect-[4/3] object-cover img-hover" loading="lazy" decoding="async" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("workshop.title")}</span>
          <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">{t("workshop.heading")}</h2>
          <p className="text-[var(--muted)] text-[14px] mt-3 max-w-[500px] mx-auto leading-relaxed">{t("workshop.description")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {processImages.map((src, i) => (
            <div key={src} className="overflow-hidden img-hover">
              <img src={optimizedImage(src)} alt={`Process ${i + 1}`} className="w-full aspect-[4/3] object-cover" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--panel)] py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.18em] uppercase">{t("types.title")}</span>
            <h2 className="text-[var(--ink)] text-[1.4rem] font-black tracking-[0.03em] mt-2">{t("types.heading")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceTypes.map((item) => (
              <div key={item.title} className="bg-[var(--bg)] border border-[var(--line)] p-8 hover:border-[#34c759]/20/30 transition-colors">
                <h3 className="text-[var(--ink)] text-[16px] font-bold tracking-[0.04em] mb-3">{item.title}</h3>
                <p className="text-[var(--muted)] text-[13px] leading-[1.8]">{item.desc}</p>
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

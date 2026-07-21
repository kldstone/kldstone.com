import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/components/SEO";
import { optimizedImage } from "@/lib/images";
import { trackConversion, trackEvent } from "@/lib/analytics";

export default function LandingQuote() {
  const params = new URLSearchParams(window.location.search);
  const [submitted, setSubmitted] = useState(() => params.get("submitted") === "1");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useSEO({
    title: "Request a Factory Stone Quote",
    description: "Send your marble, waterjet, countertop or custom stone requirements and receive material guidance and a factory quotation from KLD Stone.",
    noIndex: true,
  });

  const resetForm = () => {
    window.history.replaceState({}, "", "/landing/quote");
    setSubmitted(false);
    setError("");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    for (const [key, val] of fd.entries()) {
      if (typeof val === "string") data[key] = val;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        trackConversion("generate_lead", { source: "landing_quote" });
        window.history.replaceState({}, "", "/landing/quote?submitted=1");
        setSubmitted(true);
      } else {
        setError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
          <Link to="/" aria-label="KLD Stone home">
            <img src="/kld-logo-web.png" alt="KLD Stone" className="h-14 w-[100px] object-contain" />
          </Link>
          <a href="https://wa.me/8615659069988" onClick={() => trackEvent("whatsapp_click", { source: "landing_header" })} className="text-sm font-bold text-[#25D366]">
            WhatsApp +86 156 5906 9988
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1080px] grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2 md:gap-16 md:py-20">
        <section>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34c759]">Direct from Shuitou, China</p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.08] tracking-[-0.02em]">
            Get a Factory Quote for Your Custom Stone Project
          </h1>
          <p className="mt-5 max-w-[560px] text-[16px] leading-8 text-black/60">
            Tell us the material, dimensions, quantity and destination. Our stone team will reply within 24 hours with sourcing guidance, production options and export packing recommendations.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {["20+ years of stone expertise", "149 marble varieties", "±0.1 mm waterjet precision", "Exports to 30+ countries"].map((item) => (
              <div key={item} className="flex items-start gap-2 border border-black/8 p-4">
                <span className="mt-0.5 text-[#34c759]">✓</span><span>{item}</span>
              </div>
            ))}
          </div>

          <img src={optimizedImage("/brand-gallery/076-inspection-img-2504.jpg")} alt="KLD Stone quality inspection before export packing" className="mt-8 aspect-[16/9] w-full object-cover" loading="lazy" decoding="async" />
        </section>

        <section className="bg-[#f7f7f7] p-7 md:p-10" aria-labelledby="quote-form-title">
          {submitted ? (
            <div className="py-12 text-center" role="status">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#34c759]/10 text-2xl text-[#34c759]">✓</div>
              <h2 id="quote-form-title" className="text-2xl font-black">Thank you — inquiry received</h2>
              <p className="mt-3 text-sm leading-7 text-black/55">Our team will review your requirements and reply within 24 hours.</p>
              <button onClick={resetForm} className="mt-7 text-sm font-bold text-[#34c759]">Send another inquiry</button>
            </div>
          ) : (
            <>
              <h2 id="quote-form-title" className="text-2xl font-black">Request your quote</h2>
              <p className="mt-2 text-sm text-black/50">Required fields are marked with *.</p>
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {/* Honeypot */}
                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                  <label htmlFor="website-lq">Website</label>
                  <input type="text" name="website" id="website-lq" tabIndex={-1} autoComplete="off" />
                </div>
                <input type="hidden" name="source" value="landing_quote" />
                <input type="hidden" name="utm_source" value={params.get("utm_source") || "direct"} />
                <input type="hidden" name="utm_campaign" value={params.get("utm_campaign") || ""} />
                <input type="hidden" name="utm_term" value={params.get("utm_term") || ""} />
                <input type="hidden" name="gclid" value={params.get("gclid") || ""} />
                <label className="block text-xs font-bold">Name *<input name="name" required autoComplete="name" className="mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#34c759]" /></label>
                <label className="block text-xs font-bold">Business email *<input name="email" type="email" required autoComplete="email" className="mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#34c759]" /></label>
                <label className="block text-xs font-bold">WhatsApp / phone<input name="phone" type="tel" autoComplete="tel" className="mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#34c759]" /></label>
                <label className="block text-xs font-bold">Project requirements *<textarea name="message" required rows={5} placeholder="Material, size, quantity, drawings and destination port..." className="mt-2 w-full resize-none border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#34c759]" /></label>
                {error && <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-[13px] px-4 py-3">{error}</div>}
                <button type="submit" disabled={sending} className="w-full bg-[#34c759] px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-white hover:bg-[#2db84d] disabled:opacity-50">{sending ? "Sending..." : "Get factory quote"}</button>
                <p className="text-center text-[11px] leading-5 text-black/40">Your project information is used only to prepare this quotation.</p>
              </form>
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-black/5 py-6 text-center text-xs text-black/35">© {new Date().getFullYear()} KLD Stone · Fujian Nanan KLD Stone Co., Ltd.</footer>
    </div>
  );
}

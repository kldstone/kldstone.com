import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/components/SEO";
import { trackConversion } from "@/lib/analytics";

export default function ThankYou() {
  const firedRef = useRef(false);

  useSEO({ title: "Thank You", description: "Your inquiry has been submitted successfully.", noIndex: true });

  // Fire Google Ads conversion only on actual thank-you page load (not on failed submits)
  useEffect(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      const t = setTimeout(() => {
        trackConversion("form_submit", { source: "thank_you_page" });
      }, 500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-[520px]">
        <div className="w-20 h-20 mx-auto mb-8 bg-[#34c759]/10 rounded-full flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-[#111111] text-[clamp(1.8rem,3vw,2.4rem)] font-black tracking-[0.02em] mb-4">
          Thank You
        </h1>
        <p className="text-[#111111]/60 text-[15px] leading-relaxed mb-6">
          Your inquiry has been sent successfully. Our team typically responds within 24 hours during business days.
        </p>
        <div className="bg-[#f5f5f5] p-5 mb-8 text-left text-[13px] text-[#111111]/70 leading-relaxed">
          <p className="font-semibold text-[#111111] mb-1">Prefer to contact us directly?</p>
          <p>Email: <a href="mailto:kldstone.china@gmail.com" className="text-[#34c759] hover:underline">kldstone.china@gmail.com</a></p>
          <p>Phone / WhatsApp: <a href="tel:+8615659069988" className="text-[#34c759] hover:underline">+86 156 5906 9988</a></p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center min-h-[44px] px-8 bg-[#34c759] text-white text-[13px] font-bold tracking-[0.06em] hover:bg-[#34c759]/80 transition-colors">
            Back to Home
          </Link>
          <Link to="/catalog" className="inline-flex items-center justify-center min-h-[44px] px-8 border border-[#111]/20 text-[#111] text-[13px] font-bold tracking-[0.06em] hover:bg-[#111] hover:text-white transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

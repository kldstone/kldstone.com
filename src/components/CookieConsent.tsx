import { useEffect, useState } from "react";

const CONSENT_KEY = "kldstone-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !localStorage.getItem(CONSENT_KEY),
  );

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted") updateConsent(true);
  }, []);

  if (!visible) return null;

  const decide = (accepted: boolean) => {
    localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "essential");
    updateConsent(accepted);
    setVisible(false);
  };

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed bottom-[64px] left-4 right-4 z-[10020] mx-auto max-w-[760px] border border-black/10 bg-white p-5 shadow-2xl md:bottom-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-5 text-[#111]/70">
          We use essential storage for site functions. With your permission, Google analytics and advertising cookies help us understand visits and improve inquiries.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="min-h-[42px] border border-black/15 px-4 text-[11px] font-bold uppercase tracking-[0.06em]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="min-h-[42px] bg-[#34c759] px-5 text-[11px] font-bold uppercase tracking-[0.06em] text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}

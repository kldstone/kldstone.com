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
      className="fixed bottom-[58px] left-0 right-0 z-[10020] border-t border-black/10 bg-[#f5f1e8] px-4 py-3 shadow-[0_-6px_24px_rgba(0,0,0,0.10)] md:bottom-0"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[760px] text-[12px] leading-[1.45] text-[#292824]">
          We use essential storage for site functions. With your permission, Google analytics and advertising cookies help us understand visits and improve inquiries.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="min-h-[44px] border border-[#292824] px-4 text-[12px] font-semibold text-[#292824]"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="min-h-[44px] border border-[#176c35] bg-[#176c35] px-5 text-[12px] font-semibold text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}

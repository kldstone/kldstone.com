/** GA4 Measurement ID -- set VITE_GA_MEASUREMENT_ID in .env or Vercel env */
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
/** Google Ads Conversion ID -- set VITE_GOOGLE_ADS_ID in .env or Vercel env */
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** One-time GA4 initialisation -- call once from main.tsx or Layout */
export function initGA(): void {
  if (typeof window === "undefined") return;
  if ((window as any).__gaInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());

  if (GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID);
    const el = document.createElement("script");
    el.async = true;
    el.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(el);
  }

  if (GOOGLE_ADS_ID) {
    window.gtag("config", GOOGLE_ADS_ID);
  }

  (window as any).__gaInitialized = true;
}

export function trackEvent(
  name: string,
  data?: Record<string, string>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", name, data || {});
  } catch {}
}

export function trackConversion(
  name: string,
  data?: Record<string, string>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    const sendTo = GOOGLE_ADS_ID || GA_MEASUREMENT_ID;
    window.gtag("event", name, {
      ...(data || {}),
      ...(sendTo ? { send_to: sendTo } : {}),
    });
  } catch {}
}

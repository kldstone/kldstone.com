/** GA4 Measurement ID -- set VITE_GA_MEASUREMENT_ID in .env or Vercel env */
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
/** Google Ads Conversion ID -- may be overridden with VITE_GOOGLE_ADS_ID. */
const GOOGLE_ADS_ID =
  (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined) ||
  "AW-18289600684";

/** Contact-form conversion action -- may be overridden with VITE_GOOGLE_ADS_CONTACT_CONVERSION. */
const GOOGLE_ADS_CONTACT_CONVERSION =
  (import.meta.env.VITE_GOOGLE_ADS_CONTACT_CONVERSION as string | undefined) ||
  "AW-18289600684/NI59CKLhoNAcEKzRlJFE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** One-time GA4 initialisation -- call once from main.tsx or Layout */
export function initGA(): void {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { __gaInitialized?: boolean };
  if (analyticsWindow.__gaInitialized) return;

  // gtag.js is already loaded from index.html (AW-18289600684)
  // Fallback in case HTML snippet hasn't loaded yet
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  // If GA4 measurement ID is set AND different from Ads ID, load GA4 too
  if (GA_MEASUREMENT_ID && !GA_MEASUREMENT_ID.includes(GOOGLE_ADS_ID)) {
    const el = document.createElement("script");
    el.async = true;
    el.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(el);
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }

  analyticsWindow.__gaInitialized = true;
}

export function trackPageview(path: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(
  name: string,
  data?: Record<string, string>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", name, data || {});
  } catch {
    // Analytics must never interrupt the customer journey.
  }
}

export function trackConversion(
  _name: string,
  data?: Record<string, string>,
): void {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONTACT_CONVERSION,
      ...(data || {}),
    });
  } catch {
    // Conversion tracking is best-effort.
  }
}

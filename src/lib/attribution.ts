const STORAGE_KEY = "kldstone-attribution";
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type AttributionData = Partial<Record<(typeof TRACKING_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const incoming: AttributionData = {};
  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) incoming[key] = value.slice(0, 500);
  }

  let stored: AttributionData = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }

  const next: AttributionData = {
    landing_page: stored.landing_page || window.location.href.slice(0, 500),
    referrer: stored.referrer || document.referrer.slice(0, 500),
    ...stored,
    ...incoming,
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

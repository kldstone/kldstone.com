export function trackEvent(name: string, data?: Record<string, string>): void {
  if (typeof window !== "undefined") {
    try {
      console.log("[analytics]", name, data);
    } catch {}
  }
}


export function trackConversion(data: Record<string, string>): void {
  if (typeof window !== "undefined") {
    try {
      console.log("[conversion]", data);
    } catch {}
  }
}

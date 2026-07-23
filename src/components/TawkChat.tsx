import { useEffect } from "react";

const PROPERTY_ID = import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined;
const WIDGET_ID = import.meta.env.VITE_TAWK_WIDGET_ID as string | undefined;

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkChat() {
  useEffect(() => {
    if (!PROPERTY_ID || !WIDGET_ID || document.getElementById("tawk-chat-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = "tawk-chat-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${encodeURIComponent(PROPERTY_ID)}/${encodeURIComponent(WIDGET_ID)}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);
  }, []);

  return null;
}

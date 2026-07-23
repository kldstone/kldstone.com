import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

const PROPERTY_ID =
  (import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined) ||
  "6a617637940f101d5323cf11";
const WIDGET_ID =
  (import.meta.env.VITE_TAWK_WIDGET_ID as string | undefined) ||
  "1ju6bbjf0";

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
    window.Tawk_API.autoStart = true;
    window.Tawk_API.onLoad = () => {
      const hideWidget = window.Tawk_API?.hideWidget;
      if (typeof hideWidget === "function") {
        hideWidget();
      }
    };
    window.Tawk_API.onChatMinimized = () => {
      const hideWidget = window.Tawk_API?.hideWidget;
      if (typeof hideWidget === "function") {
        hideWidget();
      }
    };
    window.Tawk_API.customStyle = {
      zIndex: "1000 !important",
      visibility: {
        desktop: { position: "br", xOffset: 20, yOffset: 20 },
        mobile: { position: "br", xOffset: 14, yOffset: 72 },
      },
    };
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = "tawk-chat-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${encodeURIComponent(PROPERTY_ID)}/${encodeURIComponent(WIDGET_ID)}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);
  }, []);

  const openChat = () => {
    const showWidget = window.Tawk_API?.showWidget;
    const maximize = window.Tawk_API?.maximize;

    if (typeof showWidget === "function") showWidget();
    if (typeof maximize === "function") maximize();
  };

  return (
    <button
      type="button"
      onClick={openChat}
      aria-label="Open live chat"
      className="fixed bottom-20 right-4 z-[90] inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#84c225] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#75ad20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84c225] focus-visible:ring-offset-2 md:bottom-5 md:right-5"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden sm:inline">Live Chat</span>
    </button>
  );
}

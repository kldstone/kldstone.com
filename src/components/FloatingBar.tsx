import { Link, useLocation } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import categories from "@/data/catalog";
import { useInquiryList } from "@/context/InquiryListContext";
import { trackEvent } from "@/lib/analytics";

/** Fixed-bottom floating bar for mobile: WhatsApp + GET QUOTE */
export default function FloatingBar() {
  const location = useLocation();
  const { hasItem, toggleItem } = useInquiryList();
  const segments = location.pathname.split("/").filter(Boolean);
  const catalogIndex = segments.indexOf("catalog");
  const categoryKey = catalogIndex >= 0 ? segments[catalogIndex + 1] : undefined;
  const productId = catalogIndex >= 0 ? segments[catalogIndex + 2] : undefined;
  const category = categories.find((item) => item.key === categoryKey);
  const product = category?.products.find((item) => item.id === productId);
  const langPrefix = catalogIndex > 0 ? `/${segments.slice(0, catalogIndex).join("/")}` : "";

  if (category && product) {
    const inquiryUrl = `${langPrefix}/contact?${new URLSearchParams({
      products: `${category.name}: ${product.name}`,
    }).toString()}`;

    return (
      <div className="fixed bottom-0 left-0 right-0 z-[60] block md:hidden">
        <div className="flex items-stretch border-t border-black/8 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            onClick={() =>
              toggleItem({
                id: product.id,
                name: product.name,
                categoryKey: category.key,
                categoryName: category.name,
                image: product.cover,
              })
            }
            className={`flex flex-1 items-center justify-center gap-2 px-3 py-3.5 text-[11px] font-bold tracking-[0.04em] transition-colors ${
              hasItem(product.id) ? "bg-[#111] text-white" : "bg-white text-[#111]"
            }`}
          >
            {hasItem(product.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {hasItem(product.id) ? "ADDED" : "ADD TO INQUIRY"}
          </button>
          <Link
            to={inquiryUrl}
            onClick={() => trackEvent("quote_cta", { source: "product_floating_bar", product: product.name })}
            className="flex flex-1 items-center justify-center bg-[#34c759] px-3 py-3.5 text-[11px] font-bold tracking-[0.06em] text-white transition-colors hover:bg-[#2db84d]"
          >
            INQUIRE NOW
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] block md:hidden">
      <div className="flex items-stretch border-t border-black/8 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="https://wa.me/8615659069988"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "floating_bar" })}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-[12px] font-bold tracking-[0.06em] text-[#111111] bg-white hover:bg-[#f5f5f5] transition-colors border-r border-black/5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WHATSAPP
        </a>
        <Link
          to="/contact"
          onClick={() => trackEvent("quote_cta", { source: "floating_bar" })}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-[12px] font-bold tracking-[0.06em] text-white bg-[#34c759] hover:bg-[#2db84d] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          GET QUOTE
        </Link>
      </div>
    </div>
  );
}

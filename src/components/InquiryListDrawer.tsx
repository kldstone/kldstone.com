import { Check, ClipboardList, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { useInquiryList } from "@/context/InquiryListContext";

const COPY = {
  en: {
    title: "Inquiry List",
    empty: "Save products here and send one clear inquiry when you are ready.",
    selected: "products selected",
    clear: "Clear all",
    continue: "Continue to inquiry",
    remove: "Remove",
    open: "Open inquiry list",
  },
  ru: {
    title: "Список запроса",
    empty: "Сохраните товары и отправьте один общий запрос.",
    selected: "товаров выбрано",
    clear: "Очистить",
    continue: "Перейти к запросу",
    remove: "Удалить",
    open: "Открыть список запроса",
  },
  es: {
    title: "Lista de consulta",
    empty: "Guarde productos y envíe una sola consulta cuando esté listo.",
    selected: "productos seleccionados",
    clear: "Borrar todo",
    continue: "Continuar a consulta",
    remove: "Eliminar",
    open: "Abrir lista de consulta",
  },
  ar: {
    title: "قائمة الاستفسار",
    empty: "احفظ المنتجات ثم أرسل استفساراً واحداً عند الاستعداد.",
    selected: "منتجات محددة",
    clear: "مسح الكل",
    continue: "متابعة الاستفسار",
    remove: "إزالة",
    open: "فتح قائمة الاستفسار",
  },
};

export default function InquiryListDrawer() {
  const { items, isOpen, setIsOpen, removeItem, clearItems } = useInquiryList();
  const location = useLocation();
  const language = location.pathname.match(/^\/(ru|es|ar)(?:\/|$)/)?.[1] ?? "en";
  const copy = COPY[language as keyof typeof COPY];
  const prefix = language === "en" ? "" : `/${language}`;
  const inquiryParams = new URLSearchParams({
    products: items.map((item) => `${item.categoryName}: ${item.name}`).join(" | "),
  });

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {items.length > 0 && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={copy.open}
          className="fixed bottom-[76px] left-4 z-[80] inline-flex min-h-12 items-center gap-2 rounded-full bg-[#111] px-4 text-white shadow-xl transition hover:bg-[#2a2a2a] md:bottom-6 md:left-6"
        >
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
          <span className="text-[12px] font-bold tracking-[0.04em]">{copy.title}</span>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#84c225] px-1.5 text-[11px] font-black">
            {items.length}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[1100]" role="dialog" aria-modal="true" aria-label={copy.title}>
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-black text-[#111]">{copy.title}</h2>
                <p className="mt-1 text-xs text-[#111]/50">
                  {items.length} {copy.selected}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Check className="mb-4 h-10 w-10 text-[#84c225]" aria-hidden="true" />
                  <p className="max-w-[280px] text-sm leading-6 text-[#111]/60">{copy.empty}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <article key={item.id} className="flex gap-4 border-b border-black/5 pb-3">
                      <img
                        src={optimizedImage(item.image)}
                        alt=""
                        className="h-20 w-20 shrink-0 bg-[#f3f3f3] object-cover"
                      />
                      <div className="min-w-0 flex-1 py-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#84c225]">
                          {item.categoryName}
                        </p>
                        <h3 className="mt-1 line-clamp-2 text-sm font-bold text-[#111]">{item.name}</h3>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#111]/45 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          {copy.remove}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <footer className="border-t border-black/10 p-6">
              {items.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={clearItems}
                    className="mb-3 w-full min-h-11 text-xs font-semibold text-[#111]/50 hover:text-red-600"
                  >
                    {copy.clear}
                  </button>
                  <Link
                    to={`${prefix}/contact?${inquiryParams.toString()}`}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 w-full items-center justify-center bg-[#84c225] px-5 text-sm font-black text-white transition hover:bg-[#75ad20]"
                  >
                    {copy.continue}
                  </Link>
                </>
              )}
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}

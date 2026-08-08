import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ChevronDown, FileUp, X } from "lucide-react";
import { optimizedImage } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";
import { useSEO } from "@/components/SEO";
import { useInquiryList } from "@/context/InquiryListContext";
import { getAttribution } from "@/lib/attribution";

const MAX_FILE_SIZE = 2.5 * 1024 * 1024;
const ACCEPTED = ["pdf", "png", "jpg", "jpeg", "webp", "dwg", "dxf"];
const INPUT = "min-h-[48px] w-full border border-black/20 bg-white px-4 py-3 text-[15px] text-[#1c1b19] placeholder:text-[#1c1b19]/45 hover:border-black/40 focus:border-[#176c35]";
const LABEL = "mb-2 block text-[12px] font-semibold text-[#292824]";

async function encodeFile(file: File) {
  const result = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { filename: file.name, content_type: file.type || "application/octet-stream", content: result.split(",")[1] || "" };
}

export default function Contact() {
  useSEO({ title: "Request a Quote", description: "Send KLD Stone your project requirements, reference image, or drawing." });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { items, removeItem, clearItems } = useInquiryList();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending] = useState(false);
  const urlProduct = params.get("products") || "";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    if (!email && !phone) {
      setSubmitError("Please provide either an email address or WhatsApp number.");
      form.querySelector<HTMLInputElement>("#email")?.focus();
      return;
    }
    if (!form.reportValidity()) return;
    setSending(true);
    setSubmitError("");
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) if (typeof value === "string") data[key] = value;
    data.selected_products = items.length
      ? JSON.stringify(items.map((item) => ({
          name: item.name,
          code: item.productCode || item.id,
          stone_type: item.materialType || item.categoryName,
          thumbnail: item.image,
          page_url: item.pageUrl || "",
        })))
      : urlProduct;
    Object.assign(data, getAttribution());
    try {
      const payload: Record<string, unknown> = { ...data };
      if (file) payload.attachment = await encodeFile(file);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Your inquiry could not be sent.");
      trackConversion("form_submit", { source: "contact_page" });
      clearItems();
      navigate("/thank-you" + window.location.search);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Network error. Your information has been kept; please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="bg-[#fbfaf7]">
      <section className="relative h-[300px] overflow-hidden bg-[#171716] sm:h-[380px]">
        <img src={optimizedImage("/brand-gallery/contact-hero-2026-07-06-v4.jpg")} alt="" className="h-full w-full object-cover opacity-70" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 mx-auto flex max-w-[1280px] items-center px-6">
          <div className="max-w-[650px]">
            <p className="text-[12px] font-semibold text-white/85">Start a conversation</p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.025em] text-white">Request a quote</h1>
            <p className="mt-4 text-[16px] leading-7 text-white/90">
              Not sure about the material or dimensions yet? Send us a reference image and we’ll help you choose.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <aside>
            <h2 className="text-[1.65rem] font-semibold tracking-[-0.02em] text-[#1c1b19]">A quick first step</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#4f4c45]">
              Incomplete information is welcome. A KLD Stone specialist will send a business response within 24 hours. A formal quotation follows material and technical confirmation.
            </p>
            <div className="mt-8 space-y-3 text-[14px] text-[#292824]">
              <a className="block" href="mailto:ztnove@gmail.com">ztnove@gmail.com</a>
              <a className="block" href="https://wa.me/8615659069988">WhatsApp: +86 156 5906 9988</a>
            </div>
          </aside>

          <div>
            <h2 className="text-[1.65rem] font-semibold tracking-[-0.02em] text-[#1c1b19]">Tell us what you need</h2>
            <p className="mt-2 text-[14px] leading-6 text-[#5b574f]">Required fields are marked. Everything else is optional.</p>

            {(items.length > 0 || urlProduct) && (
              <section aria-labelledby="asking-about" className="mt-6 border border-[#176c35]/25 bg-[#f1f5ef] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 id="asking-about" className="flex items-center gap-2 text-[14px] font-semibold text-[#174c2a]"><CheckCircle2 className="h-5 w-5" /> You’re asking about</h3>
                  <Link to="/catalog" className="inline-flex min-h-[44px] items-center text-[12px] font-semibold text-[#176c35]">Add products</Link>
                </div>
                {items.length ? (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 bg-white p-2">
                        <img src={optimizedImage(item.image)} alt="" className="h-16 w-16 shrink-0 object-cover" />
                        <span className="min-w-0 flex-1"><strong className="block truncate text-[13px]">{item.name}</strong><small className="text-[12px] text-[#5b574f]">{item.productCode || item.id} · {item.materialType || item.categoryName}</small></span>
                        <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`} className="inline-flex h-11 w-11 items-center justify-center"><X className="h-4 w-4" /></button>
                      </li>
                    ))}
                  </ul>
                ) : <p className="mt-3 text-[14px]">{urlProduct}</p>}
              </section>
            )}

            <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
              <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label className={LABEL} htmlFor="name">Name <span className="text-[#176c35]">Required</span></label><input className={INPUT} id="name" name="name" required autoComplete="name" /></div>
                <div><label className={LABEL} htmlFor="country">Country / region <span className="text-[#176c35]">Required</span></label><input className={INPUT} id="country" name="country" required autoComplete="country-name" /></div>
              </div>
              <fieldset>
                <legend className={LABEL}>Email or WhatsApp <span className="text-[#176c35]">One required</span></legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input aria-label="Email address" className={INPUT} id="email" name="email" type="email" autoComplete="email" placeholder="Email address" />
                  <input aria-label="WhatsApp number" className={INPUT} id="phone" name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp number" />
                </div>
              </fieldset>
              <div><label className={LABEL} htmlFor="message">Brief requirement <span className="text-[#176c35]">Required</span></label><textarea className={`${INPUT} resize-y`} id="message" name="message" required rows={4} maxLength={5000} placeholder="A sentence is enough to start." /></div>

              <div>
                <span className={LABEL}>Reference image or file <span className="font-normal text-[#5b574f]">Optional</span></span>
                {file ? (
                  <div className="flex min-h-[56px] items-center justify-between border border-[#176c35]/30 bg-[#f1f5ef] px-4"><span className="min-w-0"><strong className="block truncate text-[13px]">{file.name}</strong><small className="text-[12px] text-[#5b574f]">{Math.round(file.size / 1024)} KB</small></span><button type="button" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Remove file" onClick={() => setFile(null)}><X className="h-4 w-4" /></button></div>
                ) : (
                  <label className="flex min-h-[72px] cursor-pointer items-center gap-3 border border-dashed border-black/30 px-4 text-[13px] text-[#4f4c45] hover:border-[#176c35]"><FileUp className="h-5 w-5 text-[#176c35]" /> PDF, JPG, PNG, WEBP, DWG or DXF · max 2.5 MB
                    <input className="sr-only" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.dxf" onChange={(event) => {
                      const selected = event.target.files?.[0]; event.target.value = ""; if (!selected) return;
                      const ext = selected.name.split(".").pop()?.toLowerCase();
                      if (!ext || !ACCEPTED.includes(ext)) { setFileError("Please choose a PDF, image, DWG, or DXF file."); return; }
                      if (selected.size > MAX_FILE_SIZE) { setFileError("The selected file is larger than 2.5 MB."); return; }
                      setFileError(""); setFile(selected);
                    }} />
                  </label>
                )}
                {fileError && <p role="alert" className="mt-2 text-[13px] text-red-700">{fileError}</p>}
              </div>

              <details className="group border border-black/15 bg-[#f5f1e8]">
                <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between px-4 text-[14px] font-semibold">Add project details <span className="ml-auto mr-3 font-normal text-[#5b574f]">Optional</span><ChevronDown className="h-4 w-4 group-open:rotate-180" /></summary>
                <div className="grid gap-5 border-t border-black/10 p-4 sm:grid-cols-2">
                  <div><label className={LABEL} htmlFor="project_type">Project type</label><input className={INPUT} id="project_type" name="project_type" /></div>
                  <div><label className={LABEL} htmlFor="application">Application</label><input className={INPUT} id="application" name="application" /></div>
                  <div><label className={LABEL} htmlFor="material">Stone / material</label><input className={INPUT} id="material" name="material" /></div>
                  <div><label className={LABEL} htmlFor="dimensions">Dimensions</label><input className={INPUT} id="dimensions" name="dimensions" /></div>
                  <div><label className={LABEL} htmlFor="quantity">Quantity</label><input className={INPUT} id="quantity" name="quantity" /></div>
                  <div><label className={LABEL} htmlFor="timeline">Lead time</label><input className={INPUT} id="timeline" name="timeline" /></div>
                  <div><label className={LABEL} htmlFor="destination">Destination port</label><input className={INPUT} id="destination" name="destination" /></div>
                  <label className="flex min-h-[52px] items-center gap-3 border border-black/15 bg-white px-4 text-[13px]"><input className="h-5 w-5 accent-[#176c35]" name="sample_request" type="checkbox" value="Yes" defaultChecked={params.get("sample") === "1"} /> Request a material sample</label>
                </div>
              </details>

              <p className="text-[13px] leading-5 text-[#5b574f]">You can submit even if the material, dimensions, quantity, or delivery schedule is not confirmed.</p>
              {submitError && <div role="alert" aria-live="assertive" className="border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800">{submitError}</div>}
              <button disabled={sending} className="min-h-[52px] w-full bg-[#176c35] px-6 text-[14px] font-semibold text-white hover:bg-[#12582b] active:bg-[#0e4923] disabled:opacity-60" type="submit">{sending ? "Sending your request…" : "Request a Quote"}</button>
              <p className="text-center text-[12px] leading-5 text-[#5b574f]">Business reply within 24 hours. Formal quotation after technical confirmation.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

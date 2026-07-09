import { useState } from "react";
import { optimizedImage } from "@/lib/images";
import { trackConversion } from "@/lib/analytics";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[340px] bg-[#0f0f0f] overflow-hidden">
        <img src={optimizedImage("/brand-gallery/contact-hero-2026-07-06-v4.jpg")} alt="Contact KLD Stone" className="w-full h-full object-cover opacity-80" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-[#111111] text-[11px] font-bold tracking-[0.20em] uppercase">Contact</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">
              CONTACT US
            </h1>
            <p className="text-white/55 text-[15px] max-w-[460px] mx-auto leading-relaxed">
              Send Us Your Drawings, Material Ideas, Sizes, Or Project Brief. We Will Help You Move From Concept To Quotation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left: Info */}
          <div>
            <h2 className="text-[#111111] text-[1.6rem] font-black tracking-[0.02em] mb-8">GET IN TOUCH</h2>

            <div className="space-y-8">
              {/* Address */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">ADDRESS</span>
                <p className="text-[#111111] text-[15px] font-semibold leading-relaxed">
                  Houdian Industrial Zone, Shijing, Nan'an, Fujian, China
                </p>
              </div>

              {/* Phone */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">PHONE</span>
                <a href="tel:+8615659069988" onClick={() => trackConversion("phone_click", { source: "contact_page" })} className="text-[#111111] text-[18px] font-black tracking-[0.02em] hover:opacity-60 transition-colors">
                  +86 156 5906 9988
                </a>
              </div>

              {/* Email */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">EMAIL</span>
                <a href="mailto:kldstone.china@gmail.com" className="text-[#111111] text-[15px] font-semibold hover:opacity-60 transition-colors">
                  kldstone.china@gmail.com
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                <span className="text-[#111111] text-[10px] font-bold tracking-[0.16em] uppercase block mb-2">WHATSAPP</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#34c759] rounded-full flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#111111] text-[14px] font-semibold">WhatsApp Contact</p>
                    <p className="text-[#111111] text-[12px]">Message Us For Fast Material Consultation And Quotation Follow-Up.</p>
                    <p className="text-[#111111] text-[13px] font-medium mt-0.5">WhatsApp: +86 156 5906 9988</p>
                  </div>
                </div>
              </div>

              {/* Factory image */}
              <div className="overflow-hidden img-hover">
                <img src={optimizedImage("/brand-gallery/contact-factory-2026-07-07.jpg")} alt="KLD Stone Factory" className="w-full aspect-[16/9] object-cover" />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-[#111111] text-[1.6rem] font-black tracking-[0.02em] mb-8">SEND INQUIRY</h2>

            {submitted ? (
              <div className="bg-white border border-[#34c759]/20 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#34c759]/5 rounded-full flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="text-[#111111] text-[1.2rem] font-black tracking-[0.03em] mb-2">THANK YOU FOR YOUR INQUIRY</h3>
                <p className="text-[#111111] text-[14px] leading-relaxed max-w-[320px] mx-auto">
                  We Will Contact You By Email Or WhatsApp Within 24 Hours. For Urgent Projects, Please Call +86 156 5906 9988.
                </p>
                <p className="text-[#111111] text-[13px] mt-4">
                  If This Is Your First Submission, Please Check The Confirmation Email From <span className="text-[#111111]">kldstone.china@gmail.com</span>.
                </p>
                <button
                  onClick={() => { setSubmitted(false); }}
                  className="mt-8 text-[#111111] text-[13px] font-bold tracking-[0.06em] hover:opacity-60 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form action="https://formsubmit.co/kldstone.china@gmail.com" method="POST" onSubmit={() => trackConversion("form_submit", { source: "contact_page" })} className="space-y-6">
                <input type="hidden" name="_subject" value="KLD Stone Website Inquiry" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">NAME *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">COMPANY</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-[#111111] text-[12px] font-bold tracking-[0.06em] mb-2">PROJECT DETAILS *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-white border border-[#34c759]/20 px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#111111] focus:outline-none focus:border-[#111111] transition-colors resize-none"
                    placeholder="Tell Us The Product Type, Dimensions, Quantity, Finish, Drawings, Timeline, And Destination Port."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#34c759] text-white text-[12px] font-bold tracking-[0.10em] uppercase hover:bg-[#34c759]/80 transition-colors"
                >
                  SEND INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

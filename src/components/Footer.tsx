import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#f8f8f8] text-[#111111]/65 border-t border-black/8">
      <div className="relative max-w-[1280px] mx-auto px-6">
        {/* Top: Brand */}
        <div className="py-16 border-b border-black/6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <img src="/kld-logo-web.png" alt="康利德石材" className="w-[120px] mb-6 opacity-90" />
              <p className="text-[#111111]/45 text-[13px] leading-relaxed max-w-[240px]">
                以天然石材为语言,<br/>让每一寸纹理都讲述大地的故事。
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">探索</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "石材系列", to: "/collections" },
                  { label: "空间作品", to: "/spaces" },
                  { label: "关于我们", to: "/about" },
                  { label: "联系我们", to: "/contact" },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="text-[#111111]/45 text-[13px] hover:text-[#34c759] transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">产品分类</h4>
              <div className="flex flex-col gap-3">
                <Link to="/collections/marble" className="text-[#111111]/45 text-[13px] hover:text-[#34c759] transition-colors">天然大理石</Link>
                <Link to="/collections/mosaic" className="text-[#111111]/45 text-[13px] hover:text-[#34c759] transition-colors">水刀拼花</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#111111]/90 text-[12px] font-bold tracking-[0.10em] uppercase mb-5">联系</h4>
              <div className="flex flex-col gap-3 text-[13px] text-[#111111]/45">
                <p className="flex items-center gap-2 text-[#34c759] font-medium">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  156 5906 9988
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:kldstone.china@gmail.com" className="hover:text-[#34c759] transition-colors">
                    kldstone.china@gmail.com
                  </a>
                </p>
                <p>福建省南安市石井后店工业区</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex items-center justify-center text-[11px] text-[#111111]/30 tracking-[0.04em]">
          <span>&copy; {new Date().getFullYear()} KLD Stone.</span>
        </div>
      </div>
    </footer>
  );
}

'use client';
export default function Footer() {
  return (
    <footer className="bg-[#0d2017] py-16 px-10 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-[#B45309] flex items-center justify-center">
              <span className="text-white text-xs font-bold" style={{ fontFamily: 'var(--font-heading)' }}>S</span>
            </div>
            <span className="text-white/80 text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              Sadaiv Yuva Foundation
            </span>
          </div>
          <p className="text-white/30 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            A youth-led national NGO committed to building an equitable India through community-driven action.
          </p>
        </div>
        <div className="flex flex-wrap gap-16">
          {[
            { title: 'Programs', links: ['Education', 'Healthcare', 'Women Empowerment', 'Digital Literacy', 'Cyber Awareness', 'Environment'] },
            { title: 'Engage', links: ['Volunteer', 'Donate', 'Partner', 'Internships', 'Contact Us'] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-5" style={{ fontFamily: 'var(--font-mono)' }}>{col.title}</p>
              <div className="flex flex-col gap-2">
                {col.links.map(l => (
                  <a key={l} href="#" className="text-white/50 hover:text-white text-sm transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between gap-4">
        <p className="text-white/20 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
          © 2024 Sadaiv Yuva Foundation. All rights reserved.
        </p>
        <p className="text-white/20 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
          Registered under Societies Registration Act · CIN: U85300MP2018SGC0XXXXX
        </p>
      </div>
    </footer>
  );
}

'use client';
export default function WorkshopFooter() {
  return (
    <footer className="bg-[#020817] py-16 px-10 md:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
              <span className="text-white text-xs font-bold" style={{ fontFamily: 'var(--font-heading)' }}>S</span>
            </div>
            <div>
              <p className="text-white/80 text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Sadaiv Yuva Foundation</p>
              <p className="text-[10px] text-[#475569] tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Cyber Workshops Division</p>
            </div>
          </div>
          <p className="text-[#475569] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>Building a cyber-secure India through education, training, and community-driven awareness programs.</p>
        </div>
        <div className="flex flex-wrap gap-12">
          {[
            { title: 'Programs', links: ['Corporate Workshops','Individual Learning','Community Programs','School Awareness','University Partnerships'] },
            { title: 'Resources', links: ['Workshop Slides','Security Checklists','PDF Guides','Volunteer Toolkit','FAQ'] },
            { title: 'Connect', links: ['Schedule Workshop','Volunteer','Sponsor','Partner','Contact Us'] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-[#475569] text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>{col.title}</p>
              <div className="flex flex-col gap-2">
                {col.links.map(l => (
                  <a key={l} href="#" className="text-[#475569] hover:text-white text-sm transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between gap-3">
        <p className="text-[#475569] text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>© 2024 Sadaiv Yuva Foundation · workshops.syf.org</p>
        <p className="text-[#475569] text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>Registered NGO · Madhya Pradesh · 80G Certified</p>
      </div>
    </footer>
  );
}

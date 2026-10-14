'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const certs = [
  { title: 'Participation Certificate', desc: 'Issued for all workshop attendees upon completion of the full program.', color: '#2563EB', icon: '📋', hours: '4–8 hrs' },
  { title: 'Completion Certificate', desc: 'Awarded after passing the final assessment with a minimum 70% score.', color: '#059669', icon: '🎓', hours: '8–24 hrs' },
  { title: 'Advanced Badge', desc: 'Issued for multi-day intensive programs with hands-on lab completion.', color: '#F59E0B', icon: '🏅', hours: '24–40 hrs' },
  { title: 'Digital Credential', desc: 'Blockchain-verified credential with unique QR code for employer verification.', color: '#7C3AED', icon: '🔐', hours: 'All programs' },
];

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-28 bg-[#F5F7FA] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} ref={ref} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Recognition</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Credentials that<br /><span className="text-[#2563EB]">open doors.</span>
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Certificate preview mockup */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}
          className="w-full lg:w-[45%] flex-shrink-0">
          <div className="bg-white border-4 border-[#0F172A]/[0.08] p-10 relative shadow-lg">
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-4 border-[#2563EB]/20 flex items-center justify-center">
              <span className="text-xs text-[#2563EB] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>SYF</span>
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#94A3B8] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Certificate of Completion</p>
            <div className="w-12 h-[2px] bg-[#2563EB] mb-5" />
            <p className="text-[#0F172A] text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Rahul Kumar Sharma</p>
            <p className="text-[#64748B] text-sm mb-6" style={{ fontFamily: 'var(--font-body)' }}>has successfully completed</p>
            <p className="text-2xl font-extrabold text-[#0F172A] mb-6" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>Cybersecurity Awareness for Corporate Teams</p>
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
              <span>June 20, 2024</span>
              <span>16 Learning Hours</span>
              <span>Score: 91%</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#0F172A] flex items-center justify-center">
                <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                  <rect width="10" height="10" fill="white" x="2" y="2"/><rect width="10" height="10" fill="white" x="20" y="2"/>
                  <rect width="10" height="10" fill="white" x="2" y="20"/><rect width="4" height="4" fill="white" x="14" y="14"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]" style={{ fontFamily: 'var(--font-mono)' }}>QR Verified</p>
                <p className="text-[10px] text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>cert.syf.org/verify/ABC123</p>
              </div>
              <div className="ml-auto">
                <div className="bg-[#0F172A] text-white text-[9px] px-3 py-1" style={{ fontFamily: 'var(--font-mono)' }}>Share on LinkedIn</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cert types */}
        <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }}
              className="bg-white p-7 border border-[#0F172A]/[0.07] hover:border-[#0F172A]/20 transition-colors group">
              <span className="text-2xl mb-4 block">{c.icon}</span>
              <div className="w-6 h-[2px] mb-4" style={{ background: c.color }} />
              <h4 className="font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{c.title}</h4>
              <p className="text-[#64748B] text-sm leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>{c.desc}</p>
              <p className="text-[10px] text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>{c.hours}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

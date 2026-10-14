'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const inquiryTypes = [
  { label: 'Corporate Inquiry', color: '#2563EB', icon: '🏢' },
  { label: 'Community Partnership', color: '#059669', icon: '🤝' },
  { label: 'School Program', color: '#F59E0B', icon: '🏫' },
  { label: 'College Workshop', color: '#7C3AED', icon: '🎓' },
  { label: 'Volunteer', color: '#2563EB', icon: '🙋' },
  { label: 'Sponsor', color: '#059669', icon: '💼' },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [selected, setSelected] = useState('Corporate Inquiry');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" ref={ref} className="py-28 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="relative z-10 px-10 md:px-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Get In Touch</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Ready to build a<br /><span className="text-[#2563EB]">cyber-secure future?</span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl" style={{ fontFamily: 'var(--font-body)' }}>Tell us about your organisation, school, or community — we'll design a program around your specific needs.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="w-full lg:w-[55%]">
            {!submitted ? (
              <div className="space-y-6">
                {/* Inquiry type */}
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#64748B] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>I'm interested in</p>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map(t => (
                      <button key={t.label} onClick={() => setSelected(t.label)}
                        className={`flex items-center gap-2 text-xs px-4 py-2 border transition-all ${selected === t.label ? 'text-white' : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
                        style={{ borderColor: selected === t.label ? t.color : undefined, background: selected === t.label ? t.color : undefined, fontFamily: 'var(--font-mono)' }}>
                        <span>{t.icon}</span>{t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[['Name', 'Your full name'], ['Organisation', 'Company / School / NGO']].map(([lbl, ph]) => (
                    <div key={lbl}>
                      <label className="text-[10px] tracking-widest uppercase text-[#64748B] block mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>{lbl}</label>
                      <input placeholder={ph} className="w-full bg-white/[0.05] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 outline-none focus:border-[#2563EB]/60 transition-colors" style={{ fontFamily: 'var(--font-body)' }} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[['Email', 'your@email.com'], ['Phone', '+91 XXXXX XXXXX']].map(([lbl, ph]) => (
                    <div key={lbl}>
                      <label className="text-[10px] tracking-widest uppercase text-[#64748B] block mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>{lbl}</label>
                      <input placeholder={ph} className="w-full bg-white/[0.05] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 outline-none focus:border-[#2563EB]/60 transition-colors" style={{ fontFamily: 'var(--font-body)' }} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] tracking-widest uppercase text-[#64748B] block mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>Tell us more</label>
                  <textarea rows={4} placeholder="Describe your team, expected participants, preferred dates, and any specific requirements…"
                    className="w-full bg-white/[0.05] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 outline-none focus:border-[#2563EB]/60 transition-colors resize-none" style={{ fontFamily: 'var(--font-body)' }} />
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setSubmitted(true)} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs px-8 py-4 transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                    Schedule Consultation →
                  </button>
                  <a href="#" className="border border-white/10 text-white/60 hover:text-white text-xs px-6 py-4 transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>Download Brochure</a>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#059669]/10 border border-[#059669]/30 p-10 text-center">
                <p className="text-5xl mb-4">✓</p>
                <p className="text-[#34d399] text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Inquiry Received!</p>
                <p className="text-[#64748B]" style={{ fontFamily: 'var(--font-body)' }}>We'll respond within 24 hours with a customised proposal for your {selected.toLowerCase()}.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="w-full lg:w-[45%] flex flex-col gap-8">
            <div className="border-l-2 border-[#2563EB] pl-6">
              <p className="text-[10px] tracking-widest uppercase text-[#64748B] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Response Time</p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Within 24 hours</p>
              <p className="text-[#64748B] text-sm" style={{ fontFamily: 'var(--font-body)' }}>on all business days</p>
            </div>
            <div className="border-l-2 border-[#059669] pl-6">
              <p className="text-[10px] tracking-widest uppercase text-[#64748B] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Email</p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>workshops@syf.org</p>
            </div>
            <div className="border-l-2 border-[#F59E0B] pl-6">
              <p className="text-[10px] tracking-widest uppercase text-[#64748B] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Phone</p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>+91 98765 43210</p>
            </div>
            <div className="border-l-2 border-[#7C3AED] pl-6">
              <p className="text-[10px] tracking-widest uppercase text-[#64748B] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Headquarters</p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>Bhopal, Madhya Pradesh</p>
              <p className="text-[#64748B] text-sm" style={{ fontFamily: 'var(--font-body)' }}>Programs delivered pan-India</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.08] p-6">
              <p className="text-white/50 text-[10px] uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Quick links</p>
              {['Download Corporate Brochure', 'Download Community Toolkit', 'View Sample Proposal'].map(link => (
                <a key={link} href="#" className="flex items-center justify-between py-2 text-sm text-white/60 hover:text-white border-b border-white/[0.05] last:border-b-0 transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                  {link}<span className="text-[#2563EB]">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

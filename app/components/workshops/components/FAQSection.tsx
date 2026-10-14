'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  { q: 'Who are the workshops designed for?', a: 'Our workshops serve three audiences: corporate teams (all levels, including C-suite), individual learners (students, developers, freelancers), and communities (schools, women groups, senior citizens, rural populations). Every program is contextualised for its audience.' },
  { q: 'Are the workshops available online?', a: 'Yes. All individual programs and many corporate workshops are available in fully virtual format with live instructor interaction, virtual labs, and online assessments. Community programs are primarily offline to maximise engagement.' },
  { q: 'What certifications will I receive?', a: 'Participants receive a digitally verifiable SYF certificate with QR code verification. Advanced programs also issue LinkedIn-shareable badges. Our curriculum is aligned to CEH, CompTIA Security+, and OSCP frameworks.' },
  { q: 'How do I register my organisation?', a: 'Fill out the contact form on this page, or email us at workshops@syf.org. We will schedule a free 30-minute needs assessment call and share a customised proposal within 48 hours.' },
  { q: 'Are community programs really free?', a: 'Yes — all school awareness programs, women cyber safety camps, senior citizen programs, and rural digital literacy sessions are completely free. We fund these through corporate sponsorships and our volunteer network.' },
  { q: 'What is the minimum batch size for a corporate workshop?', a: 'Minimum 10 participants for on-site workshops. Virtual programs can accommodate as few as 5. We can scale to 500+ for large enterprise deployments with regional coordinators.' },
  { q: 'Do you provide post-workshop support?', a: 'All participants get 90-day access to our community forum, resource library, and monthly live Q&A sessions with instructors. Corporate clients also get a 30-day follow-up assessment at no extra cost.' },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [open, setOpen] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="faq" ref={ref} className="py-28 bg-[#FAFAF8] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>FAQ</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Questions answered.
          </h2>
          <div className="relative">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search FAQ…"
              className="w-64 border border-[#0F172A]/15 bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#2563EB] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm">🔍</span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-3xl space-y-0">
        {filtered.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 }}
            className="border-b border-[#0F172A]/[0.08]">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group">
              <span className="font-semibold text-[#0F172A] text-base pr-8 group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                className="text-[#94A3B8] text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center border border-[#0F172A]/15 group-hover:border-[#2563EB] group-hover:text-[#2563EB] transition-colors">+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="text-[#475569] text-base leading-relaxed pb-5 pr-10" style={{ fontFamily: 'var(--font-body)' }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-[#94A3B8] py-8" style={{ fontFamily: 'var(--font-body)' }}>No results for "{search}". <a href="#contact" className="text-[#2563EB] underline">Contact us directly.</a></p>
        )}
      </div>
    </section>
  );
}

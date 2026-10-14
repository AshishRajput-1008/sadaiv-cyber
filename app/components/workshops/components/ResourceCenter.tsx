'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const resources = [
  { icon: '📊', type: 'Slides', title: 'Workshop Presentation Decks', desc: '40+ slide decks from our most popular sessions, available for download.', count: '40+', color: '#2563EB' },
  { icon: '✅', type: 'Checklist', title: 'Security Checklists', desc: 'Printable checklists for personal, office, and mobile device security.', count: '12', color: '#059669' },
  { icon: '📖', type: 'PDF Guide', title: 'Incident Response Playbook', desc: '80-page guide for responding to common cyber incidents in Indian context.', count: '1', color: '#F59E0B' },
  { icon: '📝', type: 'Template', title: 'FIR Filing Templates', desc: 'Structured templates for reporting online fraud, stalking, and identity theft.', count: '8', color: '#7C3AED' },
  { icon: '🎨', type: 'Posters', title: 'Cyber Awareness Posters', desc: 'Hindi and English A3 awareness posters for schools, offices, and community halls.', count: '24', color: '#2563EB' },
  { icon: '🧰', type: 'Toolkit', title: 'Community Volunteer Toolkit', desc: 'Everything a volunteer needs to run a basic cyber awareness session independently.', count: '1', color: '#059669' },
];

export default function ResourceCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-28 bg-[#F5F7FA] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Free Resources</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Take it with you.
          </h2>
          <p className="text-[#64748B] text-sm max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>All resources are free, uncopyrighted, and licensed for sharing.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {resources.map((r, i) => (
          <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
            className="bg-white p-8 border border-[#0F172A]/[0.07] border-r-0 border-b-0 last:border-r hover:border-[#0F172A]/15 transition-colors group cursor-pointer"
            style={{ borderRight: (i + 1) % 3 === 0 ? '1px solid rgba(15,23,42,0.07)' : undefined, borderBottom: i >= resources.length - 3 ? '1px solid rgba(15,23,42,0.07)' : undefined }}>
            <span className="text-3xl block mb-5">{r.icon}</span>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] tracking-widest px-2 py-0.5 text-white" style={{ background: r.color, fontFamily: 'var(--font-mono)' }}>{r.type}</span>
              <span className="text-[10px] text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>{r.count} {r.count === '1' ? 'resource' : 'files'}</span>
            </div>
            <h4 className="font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{r.title}</h4>
            <p className="text-[#64748B] text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)' }}>{r.desc}</p>
            <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: r.color, fontFamily: 'var(--font-mono)' }}>Download →</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

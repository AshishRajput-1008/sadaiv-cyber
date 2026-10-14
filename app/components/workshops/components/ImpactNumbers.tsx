'use client';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const metrics = [
  { value: 15000, suffix: '+', label: 'Participants Trained', sub: 'across all programs', color: '#2563EB', size: 'large' },
  { value: 300, suffix: '+', label: 'Cyber Workshops', sub: 'delivered nationwide', color: '#059669', size: 'large' },
  { value: 120, suffix: '+', label: 'Partner Organisations', sub: 'corporate & NGO', color: '#F59E0B', size: 'medium' },
  { value: 40, suffix: '+', label: 'Cities Covered', sub: 'and growing', color: '#2563EB', size: 'medium' },
  { value: 25, suffix: '+', label: 'Universities', sub: 'academic partners', color: '#059669', size: 'medium' },
  { value: 150, suffix: '+', label: 'Corporate Clients', sub: 'enterprise & SME', color: '#F59E0B', size: 'medium' },
  { value: 1, suffix: 'M+', label: 'Digital Reach', sub: 'awareness campaigns', color: '#2563EB', size: 'large' },
];

function AnimCount({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  useEffect(() => {
    if (isInView) { const c = animate(mv, value, { duration: 2, ease: 'easeOut' }); return c.stop; }
  }, [isInView, mv, value]);
  useEffect(() => mv.on('change', v => { if (ref.current) ref.current.textContent = value >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString(); }), [mv, value]);
  return <span ref={ref} style={{ color }} className="tabular-nums">0</span>;
}

export default function ImpactNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-28 bg-[#F5F7FA] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Impact at Scale</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Numbers that<br />speak louder.
          </h2>
          <p className="text-[#64748B] text-base max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>Every number represents a real person, a real organisation, a real change.</p>
        </div>
      </motion.div>

      {/* Infographic blocks — deliberately different sizes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large: 15000 */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="md:col-span-2 bg-white p-10 border border-[#0F172A]/[0.07] relative overflow-hidden group hover:border-[#2563EB]/30 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#2563EB]" />
          <p className="text-7xl md:text-8xl font-black leading-none mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            <AnimCount value={15000} suffix="" color="#2563EB" /><span className="text-[#2563EB]">+</span>
          </p>
          <p className="text-xl font-bold text-[#0F172A] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Participants Trained</p>
          <p className="text-[#94A3B8] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>across all programs, 2018–2024</p>
        </motion.div>
        {/* Large: 1M */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}
          className="md:col-span-2 bg-[#0F172A] p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <p className="text-7xl md:text-8xl font-black leading-none mb-3 text-[#F59E0B]" style={{ fontFamily: 'var(--font-heading)' }}>
            <AnimCount value={1} suffix="" color="#F59E0B" /><span className="text-[#F59E0B]">M+</span>
          </p>
          <p className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Digital Awareness Reach</p>
          <p className="text-white/30 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>through campaigns, seminars & media</p>
        </motion.div>
        {/* Medium 4 */}
        {[
          { v: 300, s: '+', l: 'Cyber Workshops', c: '#059669' },
          { v: 120, s: '+', l: 'Partner Orgs', c: '#F59E0B' },
          { v: 40, s: '+', l: 'Cities', c: '#2563EB' },
          { v: 25, s: '+', l: 'Universities', c: '#059669' },
        ].map((m, i) => (
          <motion.div key={m.l} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08 }}
            className="bg-white p-7 border border-[#0F172A]/[0.07] hover:border-[#0F172A]/20 transition-colors">
            <p className="text-4xl font-black leading-none mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <AnimCount value={m.v} suffix="" color={m.c} /><span style={{ color: m.c }}>{m.s}</span>
            </p>
            <p className="text-[#0F172A] font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{m.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

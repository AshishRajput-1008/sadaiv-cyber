'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const floatingStats = [
  { val: '15,000+', label: 'People Trained', color: '#2563EB' },
  { val: '300+', label: 'Workshops', color: '#059669' },
  { val: '98%', label: 'Satisfaction', color: '#F59E0B' },
  { val: '40+', label: 'Cities', color: '#2563EB' },
  { val: '120+', label: 'Partners', color: '#059669' },
];

const collage = [
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    cls: 'col-span-2 row-span-2',
    label: 'Corporate Workshop',
  },
  {
    url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    cls: 'col-span-1 row-span-1',
    label: 'Computer Lab',
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    cls: 'col-span-1 row-span-1',
    label: 'Student Workshop',
  },
  {
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    cls: 'col-span-2 row-span-1',
    label: 'Cyber Security',
  },
  {
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    cls: 'col-span-1 row-span-2',
    label: 'Community Training',
  },
];
function NetworkBg() {
  const nodes = Array.from({ length: 18 }, (_, i) => ({
    x: 10 + (i % 6) * 16,
    y: 15 + Math.floor(i / 6) * 30,
  }));
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
      {nodes.map((n, i) =>
        nodes.slice(i + 1, i + 4).map((m, j) => (
          <motion.line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
            stroke="#2563EB" strokeWidth="0.3"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + j, repeat: Infinity, delay: i * 0.2 }} />
        ))
      )}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="0.6" fill="#2563EB"
          animate={{ r: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </svg>
  );
}

export default function WorkshopHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#FAFAF8] flex items-center overflow-hidden pt-20">
      <NetworkBg />
      {/* Soft gradient accent */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#2563EB]/[0.035] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#059669]/[0.03] blur-3xl pointer-events-none" />

      {/* Navbar */}
      {/* <div className="absolute top-0 left-0 right-0 z-20 px-10 md:px-20 py-6 flex items-center justify-between border-b border-[#0F172A]/[0.06] bg-[#FAFAF8]/90 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
            <span className="text-white text-xs font-bold" style={{ fontFamily: 'var(--font-heading)' }}>S</span>
          </div>
          <div>
            <p className="text-[#0F172A] text-sm font-semibold leading-none" style={{ fontFamily: 'var(--font-heading)' }}>Sadaiv Yuva Foundation</p>
            <p className="text-[10px] text-[#64748B] tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Cyber Workshops</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="hidden md:flex items-center gap-6">
          {['Corporate', 'Individual', 'Community', 'Events'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{item}</a>
          ))}
          <a href="#contact" className="bg-[#2563EB] text-white text-xs px-5 py-2.5 hover:bg-[#1d4ed8] transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>Schedule Workshop</a>
        </motion.div>
      </div> */}

      <div className="relative z-10 w-full px-10 md:px-20 flex flex-col lg:flex-row items-center gap-14 lg:gap-10">
        {/* LEFT */}
        <div className="w-full lg:w-[52%]">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-3 mb-7">
            <div className="flex gap-1">
              {['#2563EB', '#059669', '#F59E0B'].map((c, i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
            </div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>Sadaiv Yuva Foundation · Cyber Education Division</p>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
            className="text-[#0F172A] leading-[0.92] mb-8"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.4rem, 5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Building a<br />
            <span className="text-[#2563EB]">Cyber-Secure</span><br />
            <span className="italic font-light text-[#0F172A]/50">India Through Education</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="text-[#475569] leading-relaxed text-lg max-w-lg mb-12" style={{ fontFamily: 'var(--font-body)' }}>
            From enterprise cybersecurity training to school awareness campaigns, we empower organisations, professionals, students, and communities with practical knowledge that creates lasting behavioral change.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 mb-14">
            <a href="#contact" className="inline-flex items-center gap-3 bg-[#0F172A] text-white px-7 py-4 text-sm hover:bg-[#1e293b] transition-colors group" style={{ fontFamily: 'var(--font-body)' }}>
              Schedule Workshop
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </a>
            <a href="#categories" className="inline-flex items-center gap-3 border-2 border-[#0F172A]/20 text-[#0F172A] px-7 py-4 text-sm hover:border-[#0F172A] transition-all" style={{ fontFamily: 'var(--font-body)' }}>
              Explore Programs
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="grid grid-cols-3 gap-0 pt-6 border-t border-[#0F172A]/[0.08]">
            {[['15,000+', 'Trained'], ['300+', 'Workshops'], ['120+', 'Partners']].map(([val, lbl]) => (
              <div key={lbl} className="pr-6 border-r border-[#0F172A]/[0.08] last:border-r-0 last:pr-0">
                <p className="text-3xl font-black text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>{val}</p>
                <p className="text-[10px] tracking-widest uppercase text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>{lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: collage */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }} className="w-full lg:w-[48%] relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[500px]">
            {collage.map((img, i) => (
              <motion.div key={i} className={`${img.cls} overflow-hidden relative group`} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <img src={img.url} alt={img.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-[10px] tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Floating stat badges */}
          <div className="absolute -left-8 top-1/4 flex flex-col gap-2">
            {floatingStats.slice(0, 3).map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + i * 0.12 }}
                className="bg-white shadow-lg border-l-2 px-3 py-1.5 flex items-center gap-2" style={{ borderColor: s.color }}>
                <span className="font-black text-sm text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</span>
                <span className="text-[10px] text-[#64748B] whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>Discover</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-px h-10 bg-gradient-to-b from-[#2563EB] to-transparent" />
      </motion.div>
    </section>
  );
}

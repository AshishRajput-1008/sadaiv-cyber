'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const stats = [
  { value: 48000, suffix: '+', label: 'Lives Touched', sublabel: 'direct beneficiaries', color: '#14532D' },
  { value: 620, suffix: '+', label: 'Volunteers Active', sublabel: 'across 8 states', color: '#B45309' },
  { value: 114, suffix: '', label: 'Schools Covered', sublabel: 'cyber safety program', color: '#14532D' },
  { value: 1.4, suffix: 'L', label: 'Saplings Planted', sublabel: '78% survival rate', color: '#B45309' },
  { value: 42, suffix: '', label: 'Digital Labs', sublabel: 'deployed in rural India', color: '#14532D' },
  { value: 98, suffix: '%', label: 'Program Efficiency', sublabel: 'funds reach ground', color: '#B45309' },
];

function AnimatedNumber({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return motionValue.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = value < 10 ? v.toFixed(1) : Math.round(v).toLocaleString();
      }
    });
  }, [motionValue, value]);

  return (
    <span ref={ref} style={{ color }} className="tabular-nums">0</span>
  );
}

export default function AnnualStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-28 bg-[#14532D] relative overflow-hidden">
      {/* Background texture — repeating diamond */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20Z' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 px-10 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Annual Impact · 2023–24
          </p>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            The year in numbers.
          </h2>
        </motion.div>

        {/* Stats grid — deliberately uneven */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="border-t border-white/10 pt-10 pb-10 pr-8"
              style={{ borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
            >
              <p
                className="text-6xl md:text-7xl font-black leading-none mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: stat.color === '#14532D' ? '#86efac' : '#fcd34d' }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color === '#14532D' ? '#86efac' : '#fcd34d'} />
                <span style={{ color: stat.color === '#14532D' ? '#86efac' : '#fcd34d' }}>{stat.suffix}</span>
              </p>
              <p className="text-white font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.label}
              </p>
              <p className="text-white/40 text-xs tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Horizontal infographic bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <p className="text-white/40 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            Program fund allocation
          </p>
          <div className="flex h-3 rounded-none overflow-hidden gap-0.5">
            {[
              { label: 'Education', pct: 32, bg: '#86efac' },
              { label: 'Health', pct: 22, bg: '#fcd34d' },
              { label: 'Women', pct: 18, bg: '#c4b5fd' },
              { label: 'Digital', pct: 14, bg: '#7dd3fc' },
              { label: 'Environ', pct: 10, bg: '#86efac' },
              { label: 'Cyber', pct: 4, bg: '#fca5a5' },
            ].map((seg) => (
              <motion.div
                key={seg.label}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
                style={{ width: `${seg.pct}%`, background: seg.bg, transformOrigin: 'left' }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
            {[
              { label: 'Education 32%', bg: '#86efac' },
              { label: 'Health 22%', bg: '#fcd34d' },
              { label: 'Women Empower. 18%', bg: '#c4b5fd' },
              { label: 'Digital Literacy 14%', bg: '#7dd3fc' },
              { label: 'Environment 10%', bg: '#86efac' },
              { label: 'Cyber Awareness 4%', bg: '#fca5a5' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ background: s.bg }} />
                <span className="text-white/40 text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

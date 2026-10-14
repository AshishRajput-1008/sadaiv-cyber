"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ShieldCheck, Lock, Shield, Fingerprint, FileWarning, Scale,
  ArrowRight,
} from 'lucide-react';
import { digitalRights } from "@/app/data/crimes";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Lock, Shield, Fingerprint, FileWarning, Scale,
};

// Article references — real Indian legal anchors
const articleRefs = [
  'Art. 21',
  'DPDP §4',
  'IT §66',
  'IT §66C',
  'IT §66F',
  'IT §43A',
];

const rightAccents = [
  'border-emerald-400',
  'border-brand-500',
  'border-blue-400',
  'border-violet-400',
  'border-amber-400',
  'border-rose-400',
];

const iconBg = [
  'bg-emerald-50 text-emerald-700',
  'bg-brand-50 text-brand-700',
  'bg-blue-50 text-blue-700',
  'bg-violet-50 text-violet-700',
  'bg-amber-50 text-amber-700',
  'bg-rose-50 text-rose-700',
];

function RightCard({
  right,
  index,
  Icon,
}: {
  right: typeof digitalRights[0];
  index: number;
  Icon: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="group relative"
    >
      <div className={`relative h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.09)] transition-all duration-400 hover:border-slate-300 flex flex-col`}>

        {/* Left accent bar — colour-coded per right */}
        <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl border-l-4 ${rightAccents[index % rightAccents.length]} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Ghost article number watermark */}
        <span
          aria-hidden
          className="absolute -bottom-3 -right-2 text-[6rem] font-black text-slate-50 leading-none select-none pointer-events-none tracking-tighter"
          style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex-1 flex flex-col p-6">

          {/* Top row: icon + article ref */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[index % iconBg.length]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span
              className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {articleRefs[index % articleRefs.length]}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-[1.1rem] font-extrabold text-slate-900 leading-snug mb-3 pr-4"
            style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
          >
            {right.title}
          </h3>

          {/* Hairline rule */}
          <div className="h-px bg-slate-100 mb-4" />

          {/* Description */}
          <p
            className="text-[13.5px] text-slate-500 leading-relaxed flex-1"
            style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
          >
            {right.description}
          </p>

          {/* Learn more link */}
          <div className="mt-5 flex items-center gap-1.5 text-slate-400 group-hover:text-slate-700 transition-colors duration-300">
            <span
              className="text-xs font-bold tracking-wide"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
            >
              Know your rights
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DigitalRightsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="rights"
      className="relative py-24 lg:py-28 bg-white overflow-hidden"
    >
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }}
      />
      <div aria-hidden className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-10 bg-emerald-400" />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase text-emerald-600"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Constitutional Guarantee · India
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.07 }}
            className="text-[2.4rem] md:text-[3rem] lg:text-[3.4rem] font-black text-slate-900 leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
          >
            Rights the Law{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Guarantees You.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                className="absolute bottom-1 left-0 right-0 h-[5px] bg-emerald-400/35 rounded-full origin-left z-0"
              />
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.17 }}
            className="mt-5 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
          >
            <p
              className="text-base text-slate-500 max-w-md leading-relaxed"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
            >
              The Constitution and cyber laws guarantee these fundamental digital
              rights to every Indian citizen. Know them — they are enforceable.
            </p>
            <div className="flex items-stretch gap-6 flex-shrink-0">
              {[
                { n: `${digitalRights.length}`, label: 'Digital Rights' },
                { n: 'Art. 21', label: 'Constitution' },
                { n: '2023', label: 'DPDP Act' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span
                    className="text-xl font-black text-slate-900 leading-none"
                    style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="text-[11px] text-slate-400 font-semibold mt-0.5"
                    style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px bg-slate-100 origin-left"
          />
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {digitalRights.map((right, i) => {
            const Icon = iconMap[right.icon] || Shield;
            return (
              <RightCard key={right.title} right={right} index={i} Icon={Icon} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
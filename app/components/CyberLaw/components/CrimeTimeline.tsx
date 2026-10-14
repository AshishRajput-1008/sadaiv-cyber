"use client";

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, PhoneOff, KeyRound, Smartphone, UserX, Terminal,
  Share2, MessageCircleWarning, Eye, AlertTriangle, Lock,
  ShieldOff, Banknote, TrendingDown, HeartOff, Database,
  ScanFace, Bug, FileText, Gavel, ShieldCheck, ChevronDown,
  Scale, BookOpen,
} from 'lucide-react';
import { crimes } from "@/app/data/crimes";

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert, PhoneOff, KeyRound, Smartphone, UserX, Terminal,
  Share2, MessageCircleWarning, Eye, AlertTriangle, Lock,
  ShieldOff, Banknote, TrendingDown, HeartOff, Database,
  ScanFace, Bug,
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop",
];

function CrimeCard({ crime, index }: { crime: typeof crimes[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[crime.icon] || FileText;
  const imageSrc = (crime as any).image || fallbackImages[index % fallbackImages.length];
  const caseNum = String(index + 1).padStart(3, '0');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="group relative"
    >
      <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] transition-shadow duration-500">

        {/* Ghost watermark case number */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-4 text-[120px] font-black leading-none select-none pointer-events-none z-0 tracking-tighter"
          style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif", color: '#f1f5f9' }}
        >
          {caseNum}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row min-h-[280px]">

          {/* ── Evidence photo ── */}
          <div className="relative md:w-[38%] w-full md:h-auto h-48 flex-shrink-0 overflow-hidden">
            <img
              src={imageSrc}
              alt={crime.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-transparent md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent md:hidden block" />

            {/* Case File stamp */}
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF6B00' }} />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                  Case File
                </span>
              </div>
            </div>

            {/* Mobile crime name */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
              <h3 className="text-lg font-extrabold text-white leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}>
                {crime.name}
              </h3>
            </div>
          </div>

          {/* ── Dossier content ── */}
          <div className="flex-1 flex flex-col p-6 lg:p-8">

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-50 group-hover:border-orange-200 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-orange-600 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="hidden md:block text-xl font-extrabold text-slate-900 leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}>
                    {crime.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    #{caseNum} · IT Act 2000
                  </p>
                </div>
              </div>

              {/* Section pill */}
              <div className="flex-shrink-0 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg tracking-wide"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {crime.section.split('/')[0].trim()}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-5" />

            {/* Description */}
            <p className="text-slate-500 text-sm leading-relaxed mb-6"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
              {crime.description}
            </p>

            {/* Legal metadata */}
            <div className="mt-auto">
              <div className="grid grid-cols-3 divide-x divide-slate-100 border border-slate-100 rounded-xl overflow-hidden mb-3">
                {/* Law */}
                <div className="px-3.5 py-3 bg-slate-50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <BookOpen className="w-3 h-3 text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                      style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>Law</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-snug"
                    style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
                    {crime.law.replace('Information Technology Act,', 'IT Act')}
                  </p>
                </div>

                {/* Sentence */}
                <div className="px-3.5 py-3 bg-red-50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Scale className="w-3 h-3 text-red-400" />
                    <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest"
                      style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>Sentence</span>
                  </div>
                  <p className="text-xs font-bold text-red-700 leading-snug"
                    style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
                    {crime.punishment}
                  </p>
                </div>

                {/* Fine */}
                <div className="px-3.5 py-3 bg-amber-50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Banknote className="w-3 h-3 text-amber-500" />
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest"
                      style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>Fine</span>
                  </div>
                  <p className="text-xs font-bold text-amber-700 leading-snug"
                    style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
                    {crime.fine}
                  </p>
                </div>
              </div>

              {/* ── Protection strip — explicit colors, no Tailwind bg-brand ── */}
              <div
                className="flex items-start gap-3 rounded-xl px-4 py-3.5 transition-colors duration-300"
                style={{ backgroundColor: '#1d4ed8' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1e40af')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              >
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#93c5fd' }} />
                <p className="text-[13px] leading-relaxed"
                  style={{
                    fontFamily: "'Nunito Sans', var(--font-body), sans-serif",
                    color: 'rgba(255,255,255,0.92)',
                  }}>
                  <span className="font-bold" style={{ color: '#ffffff' }}>Protection: </span>
                  {crime.protection}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="mb-16 lg:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px flex-1 max-w-[48px]" style={{ background: '#FF6B00' }} />
        <span className="text-[11px] font-bold tracking-[0.22em] uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: '#FF6B00' }}>
          Cyber Law Compendium · India
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.06 }}
        className="text-[2.6rem] md:text-[3.25rem] lg:text-[3.75rem] font-black text-slate-900 leading-[1.05] tracking-tight"
        style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
      >
        Every Crime Has{' '}
        <br className="hidden sm:block" />
        <span className="relative">
          <span className="relative z-10">a Legal Consequence.</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="absolute bottom-1 left-0 right-0 h-[5px] rounded-full origin-left z-0"
            style={{ background: 'rgba(255,107,0,0.35)' }}
          />
        </span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mt-6 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
      >
        <p className="text-slate-500 text-base leading-relaxed max-w-md"
          style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
          India&apos;s IT Act 2000 and BNS define strict punishments for cyber offences.
          Know the law — it&apos;s your first line of defence.
        </p>

        <div className="flex items-stretch gap-5 flex-shrink-0">
          {[
            { n: '18', sub: 'Cyber Crimes' },
            { n: '7yr', sub: 'Max Sentence' },
            { n: '₹10L', sub: 'Max Fine' },
          ].map((s) => (
            <div key={s.sub} className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none"
                style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}>
                {s.n}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 leading-tight"
                style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 h-px bg-slate-100 origin-left"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export default function CrimeTimeline() {
  const INITIAL_COUNT = 2;
  const [showAll, setShowAll] = useState(false);
  const visibleCrimes = showAll ? crimes : crimes.slice(0, INITIAL_COUNT);

  return (
    <section id="crimes" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#FAFAFA' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }}
      />
      <div aria-hidden className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #FAFAFA, transparent)' }} />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FAFAFA, transparent)' }} />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeader />

        <div className="flex flex-col gap-5">
          <AnimatePresence initial={false}>
            {visibleCrimes.map((crime, i) => (
              <CrimeCard key={crime.name} crime={crime} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {crimes.length > INITIAL_COUNT && (
          <div className="mt-10 flex flex-col items-center gap-2.5">
            {!showAll && (
              <p className="text-xs text-slate-400 tracking-wide"
                style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
                Showing {INITIAL_COUNT} of {crimes.length} documented cyber crimes
              </p>
            )}
            <motion.button
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.975 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white text-sm font-bold tracking-wide shadow-md transition-all duration-300"
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif",
                background: '#0f172a',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#FF6B00')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0f172a')}
            >
              {showAll ? 'Show Fewer' : `View All ${crimes.length} Cyber Crimes`}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
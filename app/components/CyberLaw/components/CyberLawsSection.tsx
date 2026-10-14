"use client";

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Scale,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  ArrowDown,
  LayoutList,
  X,
} from 'lucide-react';
import { cyberLaws } from "@/app/data/crimes";
import CrimeTimeline from "@/app/components/CyberLaw/components/CrimeTimeline"; // ← adjust to your actual import path

// ─────────────────────────────────────────────
// Single law card
// ─────────────────────────────────────────────

function LawCard({
  law,
  index,
  onKnowMore,
}: {
  law: typeof cyberLaws[0];
  index: number;
  onKnowMore: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.06, 0.3),
      }}
      className="flex-shrink-0 w-[320px] lg:w-[380px] snap-center"
    >
      <div className="group relative h-full bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:border-slate-300 transition-all duration-400 flex flex-col">

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-500 rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card header */}
        <div className="relative pt-6 pb-5 px-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Act · {law.year}
            </span>
            <span
              className="text-[10px] font-bold tracking-[0.18em] uppercase bg-slate-900 text-white px-2.5 py-1 rounded-md"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(index + 1).padStart(2, '0')} / {String(cyberLaws.length).padStart(2, '0')}
            </span>
          </div>

          <h3
            className="text-[1.6rem] font-black text-slate-900 leading-[1.1] tracking-tight pr-2"
            style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
          >
            {law.name}
          </h3>

          {/* Ghost watermark */}
          <span
            aria-hidden
            className="absolute bottom-2 right-4 text-[4.5rem] font-black text-slate-50 leading-none select-none pointer-events-none tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
          >
            {law.year.slice(-2)}
          </span>
        </div>

        {/* Card body */}
        <div className="flex-1 flex flex-col px-6 pt-5 pb-6 gap-4">
          <p
            className="text-[13.5px] text-slate-500 leading-relaxed"
            style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
          >
            {law.description}
          </p>

          {/* Key provision block */}
          <div className="mt-auto rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 bg-white">
              <Scale className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              <span
                className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.18em]"
                style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
              >
                Key Provision
              </span>
            </div>
            <p
              className="px-4 py-3 text-[13px] font-semibold text-slate-700 leading-snug"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
            >
              {law.keyProvision}
            </p>
          </div>

          {/* Know More button — triggers timeline */}
          <button
            onClick={onKnowMore}
            className="flex items-center gap-2 text-brand-600 hover:text-brand-800 transition-colors duration-200 pt-1 group/btn w-fit"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span
              className="text-xs font-bold tracking-wide group-hover/btn:underline underline-offset-2"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
            >
              Know More
            </span>
            <ArrowDown className="w-3 h-3 opacity-60" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export default function CyberLawsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [timelineOpen, setTimelineOpen] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'right' ? 400 : -400,
      behavior: 'smooth',
    });
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('button');
    if (btn?.id === 'law-scroll-left') scroll('left');
    if (btn?.id === 'law-scroll-right') scroll('right');
  };

  const openTimeline = () => {
    setTimelineOpen(true);
    // Small delay so the DOM has rendered before scrolling
    setTimeout(() => {
      timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const toggleTimeline = () => {
    if (timelineOpen) {
      setTimelineOpen(false);
    } else {
      openTimeline();
    }
  };

  return (
    <>
      <section
        id="laws"
        className="relative py-24 lg:py-28 bg-[#F7F8FA] overflow-hidden"
      >
        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.35,
          }}
        />
        <div aria-hidden className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#F7F8FA] to-transparent pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F7F8FA] to-transparent pointer-events-none" />

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8"
          onClick={handleHeaderClick}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-10 bg-brand-400" />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase text-brand-600"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Legal Framework · India
            </span>
          </motion.div>

          {/* Headline row */}
          <div className="flex items-end justify-between gap-6 mb-0">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.07 }}
                className="text-[2.4rem] md:text-[3rem] lg:text-[3.4rem] font-black text-slate-900 leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
              >
                The Laws That{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Protect You.</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={headerInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                    className="absolute bottom-1 left-0 right-0 h-[5px] bg-brand-400/35 rounded-full origin-left z-0"
                  />
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.17 }}
                className="mt-4 text-base text-slate-500 max-w-lg leading-relaxed"
                style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
              >
                India&apos;s IT Act 2000, DPDP Act 2023, and BNS provisions form a
                comprehensive shield for every citizen&apos;s digital life.
              </motion.p>
            </div>

            {/* Arrow controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0"
            >
              <button
                id="law-scroll-left"
                aria-label="Scroll left"
                className="w-11 h-11 flex items-center justify-center hover:bg-slate-50 border-r border-slate-200 text-slate-600 hover:text-brand-600 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <button
                id="law-scroll-right"
                aria-label="Scroll right"
                className="w-11 h-11 flex items-center justify-center hover:bg-slate-50 text-slate-600 hover:text-brand-600 transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-8 flex items-center gap-8"
          >
            {[
              { n: `${cyberLaws.length}`, label: 'Frameworks' },
              { n: '2000', label: 'IT Act Since' },
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
          </motion.div>

          {/* Hairline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 mb-10 h-px bg-slate-200 origin-left"
          />

          {/* ── "Explore All Laws in Detail" button — above scroll ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex items-center justify-between mb-10"
          >
            <p
              className="text-sm text-slate-400 hidden sm:block"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
            >
              Scroll through the cards or explore the full law-by-law breakdown below.
            </p>

            <button
              onClick={toggleTimeline}
              className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-300 shadow-sm
                ${timelineOpen
                  ? 'bg-brand-600 border-brand-600 text-white hover:bg-brand-700 shadow-brand-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50'
                }`}
              style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
            >
              <LayoutList className="w-4 h-4" />
              {timelineOpen ? 'Close Detailed View' : 'Explore All Laws in Detail'}
              {timelineOpen
                ? <X className="w-3.5 h-3.5 opacity-80" />
                : <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-200" />
              }
            </button>
          </motion.div>
        </div>

        {/* ── Horizontal scroll cards ── */}
        <div className="relative">
          <div aria-hidden className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F7F8FA] to-transparent z-10 pointer-events-none" />
          <div aria-hidden className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F7F8FA] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 px-6 lg:px-16 pb-4 pt-2 overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cyberLaws.map((law, i) => (
              <LawCard
                key={law.name}
                law={law}
                index={i}
                onKnowMore={openTimeline}
              />
            ))}
            <div className="flex-shrink-0 w-4" />
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="sm:hidden flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm text-slate-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span
            className="text-xs text-slate-400 font-medium"
            style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
          >
            Swipe to navigate
          </span>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm text-slate-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── CrimeTimeline — animated expand below ── */}
      <div ref={timelineRef}>
        <AnimatePresence>
          {timelineOpen && (
            <motion.div
              key="crime-timeline-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {/* Top divider with label */}
              <div className="relative bg-white border-t border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-brand-400" />
                    <span
                      className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Detailed Law Breakdown
                    </span>
                  </div>
                  <button
                    onClick={() => setTimelineOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors duration-200 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg bg-white"
                    style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}>
                  
                    <X className="w-3.5 h-3.5" />
                    Close
                  </button>
                </div>
              </div>

              {/* The actual CrimeTimeline component */}
              <CrimeTimeline />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
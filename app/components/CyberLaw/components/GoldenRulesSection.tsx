"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  KeyRound, CheckCircle, Unlink, Smartphone, Lock,
  RefreshCw, Flag, UserCheck, Wifi, HardDrive,
} from 'lucide-react';
import { goldenRules } from "@/app/data/crimes";

const iconMap: Record<string, React.ElementType> = {
  KeyRound, CheckCircle, Unlink, Smartphone, Lock,
  RefreshCw, Flag, UserCheck, Wifi, HardDrive,
};

// Accent colors cycling through brand palette — saffron, blue, green (India tricolor)
const accentColors = [
  { bg: '#FF6B00', light: '#fff7ed', text: '#fff' },  // saffron
  { bg: '#1d4ed8', light: '#eff6ff', text: '#fff' },  // india blue
  { bg: '#138808', light: '#f0fdf4', text: '#fff' },  // india green
];

function RuleCard({ rule, index }: { rule: typeof goldenRules[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[rule.icon] || Lock;
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
      className="group"
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden transition-all duration-400"
        style={{
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.10)';
          (e.currentTarget as HTMLElement).style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
          (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
        }}
      >
        {/* ── Accent left bar ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
          style={{ background: accent.bg }}
        />

        <div className="flex items-stretch pl-8 pr-6 lg:pr-10 py-8">

          {/* ── Rule number — large typographic anchor ── */}
          <div className="flex-shrink-0 w-20 lg:w-24 flex flex-col items-start justify-center mr-6 lg:mr-10">
            <span
              className="font-black leading-none tracking-tighter select-none"
              style={{
                fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif",
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                color: accent.bg,
                opacity: 0.15,
                transition: 'opacity 0.3s',
              }}
              ref={(el) => {
                if (el) {
                  el.closest('.group')?.addEventListener('mouseenter', () => { el.style.opacity = '0.25'; });
                  el.closest('.group')?.addEventListener('mouseleave', () => { el.style.opacity = '0.15'; });
                }
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* ── Icon + content ── */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">

            {/* Icon bubble */}
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{ background: accent.bg, boxShadow: `0 8px 24px ${accent.bg}40` }}
            >
              <Icon className="w-6 h-6" style={{ color: '#ffffff' }} />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3
                className="text-lg lg:text-xl font-extrabold text-slate-900 mb-2 leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
              >
                {rule.title}
              </h3>
              <p
                className="text-sm text-slate-500 leading-relaxed max-w-2xl"
                style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
              >
                {rule.description}
              </p>
            </div>

            {/* Rule number badge — right side, small */}
            <div
              className="hidden lg:flex flex-shrink-0 items-center justify-center w-9 h-9 rounded-xl text-xs font-black"
              style={{
                fontFamily: 'var(--font-mono)',
                background: accent.light,
                color: accent.bg,
                border: `1px solid ${accent.bg}30`,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GoldenRulesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="safety" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#ffffff' }}>

      {/* Very subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />
      <div aria-hidden className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #ffffff, transparent)' }} />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-16 lg:mb-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-10" style={{ background: '#FF6B00' }} />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: '#FF6B00' }}
            >
              Citizen Safety Guide
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.07 }}
            className="font-black text-slate-900 leading-[1.05] tracking-tight"
            style={{
              fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            }}
          >
            10 Rules That{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Keep You Safe.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
                className="absolute bottom-1 left-0 right-0 h-[5px] rounded-full origin-left z-0"
                style={{ background: 'rgba(255,107,0,0.35)' }}
              />
            </span>
          </motion.h2>

          {/* Subtext + stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.17 }}
            className="mt-5 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
          >
            <p
              className="text-base text-slate-500 leading-relaxed max-w-md"
              style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
            >
              Simple, non-negotiable practices that dramatically reduce your risk of becoming a cyber crime victim.
            </p>
            <div className="flex items-center gap-6 flex-shrink-0">
              {[
                { n: '10', label: 'Core Rules' },
                { n: '#1', label: 'Never Share OTP' },
                { n: '0', label: 'Exceptions' },
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

          {/* Hairline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px origin-left"
            style={{ background: '#e2e8f0' }}
          />
        </div>

        {/* ── Rules list ── */}
        <div className="flex flex-col gap-4">
          {goldenRules.map((rule, i) => (
            <RuleCard key={rule.title} rule={rule} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mt-16 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0f172a 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="px-8 py-8 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p
                className="text-white font-black text-xl mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif" }}
              >
                Been a victim of cyber crime?
              </p>
              <p
                className="text-slate-400 text-sm leading-relaxed"
                style={{ fontFamily: "'Nunito Sans', var(--font-body), sans-serif" }}
              >
                Report immediately at cybercrime.gov.in or call <span className="text-white font-bold">1930</span>
              </p>
            </div>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: '#FF6B00',
                color: '#ffffff',
                fontFamily: "'Plus Jakarta Sans', var(--font-ui), sans-serif",
                boxShadow: '0 0 24px rgba(255,107,0,0.4)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ea5a00')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FF6B00')}
            >
              Report a Crime
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
"use client";
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Shield, ChevronDown, AlertTriangle, Lock, ArrowRight, Zap } from 'lucide-react';

const crimeWords = ['PHISHING','OTP FRAUD','FAKE CALLS','UPI SCAMS','HARASSMENT','BLACKMAIL','HACKING','IDENTITY THEFT'];
const stats = [
  { value: '₹1,750Cr', label: 'Lost to fraud in 2023' },
  { value: '15.9L',    label: 'Complaints filed' },
  { value: '1930',     label: 'National helpline' },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'words'|'reveal'>('words');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Only parallax the upper text — NOT the stats bar
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    if (wordIndex < crimeWords.length) {
      const t = setTimeout(() => setWordIndex(w => w + 1), 1200);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('reveal'), 250);
      return () => clearTimeout(t);
    }
  }, [wordIndex]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080d1a' }}
    >
      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 dark-grid" />

      {/* ── Radial spotlight ── */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,235,0.18) 0%, transparent 70%)'
      }} />

      {/* ── Glow orbs ── */}
      <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] rounded-full animate-morph"
        style={{ background:'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 65%)', filter:'blur(1px)' }} />
      <div className="absolute bottom-[-20%] right-[-5%] w-[600px] h-[600px] rounded-full animate-morph"
        style={{ background:'radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 65%)', filter:'blur(1px)', animationDelay:'4s' }} />

      {/* ── Scan line ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="animate-scan w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      </div>

      {/* ── Ticker marquee ── */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-white/[0.05] flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker gap-0">
          {[...crimeWords,...crimeWords,...crimeWords,...crimeWords].map((w,i) => (
            <span key={i} className="text-[10px] font-black tracking-[0.25em] text-white/[0.08] mr-10 uppercase"
              style={{ fontFamily:'var(--font-ui)' }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── Floating decorative shapes ── */}
      {[...Array(5)].map((_,i) => (
        <motion.div key={i}
          className="absolute rounded-2xl border border-white/[0.05] pointer-events-none"
          style={{ width:80+i*20, height:100+i*24, left:`${8+i*18}%`, top:`${20+(i%3)*20}%`, rotate:`${-8+i*4}deg` }}
          animate={{ y:[0,-16,0], opacity:[0.03,0.07,0.03] }}
          transition={{ duration:8+i*2, repeat:Infinity, ease:'easeInOut', delay:i*1.2 }}
        />
      ))}

      {/* ── Main content (parallax fades out) ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-8 text-center"
      >
        {/* Live badge */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 border"
          style={{ background:'rgba(37,99,235,0.08)', borderColor:'rgba(37,99,235,0.25)' }}>
          <span className="relative flex">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-blue-400 relative" />
          </span>
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] font-black tracking-[0.15em] uppercase text-blue-300"
            style={{ fontFamily:'var(--font-body)' }}>
            Indian Cyber Law Reference · Sadaiv Yuva Foundation
          </span>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/20" />
          <Zap className="w-4 h-4 text-blue-600" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Animated word area */}
        <div className="h-[90px] md:h-[110px] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            {phase === 'words' ? (
              wordIndex < crimeWords.length && (
                <motion.div key={crimeWords[wordIndex]}
                  initial={{ opacity:0, y:28, filter:'blur(10px)' }}
                  animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                  exit={{ opacity:0, y:-28, filter:'blur(10px)' }}
                  transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
                  className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-red-400 flex-shrink-0" />
                  <span className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-red-400"
                    style={{ fontFamily:'var(--font-ui)' }}>
                    {crimeWords[wordIndex]}
                  </span>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity:0, scale:0.88, filter:'blur(18px)' }}
                animate={{ opacity:1, scale:1, filter:'blur(0px)' }}
                transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
                className="text-center">
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white/40"
                  style={{ fontFamily:'var(--font-ui)' }}>
                  Every Cyber Crime Has A Law.
                </p>
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white/70 mt-2"
                  style={{ fontFamily:'var(--font-ui)' }}>
                  Know It. Use It. Stay Safe.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4 }}
          className="text-base md:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed mb-12"
          style={{ fontFamily:'var(--font-body)' }}>
          A complete reference to cyber crimes, applicable laws, punishments, and your digital rights as an Indian citizen.
        </motion.p>

        {/* CTA buttons */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button
            onClick={() => document.querySelector('#crimes')?.scrollIntoView({ behavior:'smooth' })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white rounded-xl transition-all duration-300 group"
            style={{ background:'linear-gradient(135deg,#2563eb,#1d4ed8)', boxShadow:'0 0 32px -4px rgba(37,99,235,0.5)', fontFamily:'var(--font-body)' }}>
            Explore Cyber Crimes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.querySelector('#report')?.scrollIntoView({ behavior:'smooth' })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white rounded-xl border transition-all duration-300"
            style={{ background:'rgba(255,255,255,0.04)', borderColor:'rgba(255,255,255,0.10)', fontFamily:'var(--font-body)' }}
            onMouseEnter={e => (e.currentTarget.style.background='rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background='rgba(255,255,255,0.04)')}>
            <Lock className="w-4 h-4 text-slate-400" />
            Report a Crime
          </button>
        </motion.div>
      </motion.div>

      {/* ── Stats bar — NOT inside parallax, stays visible and dark always ── */}
      <motion.div
        initial={{ opacity:0, y:24 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8, delay:0.65 }}
        className="relative z-20 w-full max-w-2xl mx-auto px-6 pb-16"
      >
        <div
          className="grid grid-cols-3 rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(8,13,26,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {stats.map((s,i) => (
            <div
              key={i}
              className={`py-5 px-4 text-center ${i < stats.length - 1 ? 'border-r' : ''}`}
              style={{ borderColor:'rgba(255,255,255,0.08)' }}
            >
              {/* Dual-tone gradient text — matches the screenshot effect */}
              <div
                className="text-xl md:text-2xl font-black mb-1"
                style={{
                  fontFamily: 'var(--font-ui)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 60%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.value}
              </div>
              <div
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ fontFamily:'var(--font-body)', color: 'rgba(148,163,184,0.8)' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:3.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] font-black tracking-[0.25em] uppercase text-white/20"
          style={{ fontFamily:'var(--font-body)' }}>scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>

      {/* ── Bottom fade — only goes to dark navy, NOT white ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #080d1a 0%, transparent 100%)' }}
      />
    </section>
  );
}
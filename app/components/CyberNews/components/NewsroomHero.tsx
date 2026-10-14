import { motion } from 'framer-motion';
import { Radio, ShieldCheck, Globe2, Zap, ChevronRight, Shield, ShieldCheckIcon } from 'lucide-react';

const tickerItems = [
  'Breaking: New Banking Malware Targets Mobile Users Across India',
  'CERT-In Issues Critical Security Advisory for Government Infrastructure',
  'Global Ransomware Group Disrupted by International Law Enforcement',
  'New AI-Powered Phishing Campaign Detected Targeting Enterprise Users',
  'Indian Banks Strengthen UPI Security After Recent Fraud Reports',
  'Zero-Day Vulnerability Found in Popular Cloud Platform',
];

const pills = [
  { icon: Radio,       label: 'Live Updates',       text: '#b91c1c', bg: '#fff1f2', border: '#fecdd3' },
  { icon: ShieldCheck, label: 'Verified Sources',    text: '#4338ca', bg: '#eef2ff', border: '#c7d2fe' },
  { icon: Globe2,      label: 'Threat Intelligence', text: '#0369a1', bg: '#f0f9ff', border: '#bae6fd' },
  { icon: Zap,         label: 'Cyber Awareness',     text: '#92400e', bg: '#fffbeb', border: '#fde68a' },
];

const stats = [
  { val: '2,400+', label: 'Incidents tracked' },
  { val: '98%',    label: 'Source accuracy'   },
  { val: '24/7',   label: 'Live monitoring'   },
];

export default function NewsroomHero() {
  return (
    <section
    className="mt-28 md:mt-4"
      id="hero"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#f0f2f8',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ── Background layers ── */}

      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.28,
      }} />

      {/* Top-center indigo halo */}
      <div aria-hidden style={{
        position: 'absolute', top: '-180px', left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(900px, 120vw)', height: '640px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom-left teal blob */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-120px', left: '-120px',
        width: 'min(480px, 70vw)', height: 'min(480px, 70vw)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.09) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom-right violet blob */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-80px', right: '-100px',
        width: 'min(420px, 65vw)', height: 'min(420px, 65vw)',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.09) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Diagonal lines — hidden on mobile via inline media query workaround: opacity 0 at small sizes handled by width capping */}
      <svg aria-hidden style={{
        position: 'absolute', top: 0, right: 0,
        width: 'min(420px, 50vw)', height: 'min(420px, 50vw)',
        opacity: 0.18, pointerEvents: 'none',
      }} viewBox="0 0 420 420">
        {[0, 28, 56, 84, 112, 140, 168, 196, 224].map(offset => (
          <line key={offset} x1={offset} y1="0" x2="420" y2={420 - offset} stroke="#818cf8" strokeWidth="0.75" />
        ))}
      </svg>

      <svg aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 'min(320px, 40vw)', height: 'min(320px, 40vw)',
        opacity: 0.13, pointerEvents: 'none',
      }} viewBox="0 0 320 320">
        {[0, 28, 56, 84, 112, 140].map(offset => (
          <line key={offset} x1="0" y1={offset} x2={320 - offset} y2="320" stroke="#14b8a6" strokeWidth="0.75" />
        ))}
      </svg>

      {/* Bottom vignette */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '200px', pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent, #f0f2f8)',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '900px',
        margin: '0 auto',
        padding: 'clamp(80px, 14vw, 140px) clamp(16px, 5vw, 40px) 40px',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>

        {/* Live badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '9px',
            padding: '7px 18px', borderRadius: '999px',
            border: '1px solid #c7d2fe',
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 1px 8px rgba(99,102,241,0.10)',
          }}>
            <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px', flexShrink: 0 }}>
              <span className="animate-ping" style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#f87171', opacity: 0.7,
              }} />
              <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            </span>
            <span style={{
              fontSize: 'clamp(9px, 2.2vw, 11px)', fontWeight: 600,
              letterSpacing: '0.11em', textTransform: 'uppercase', color: '#4338ca',
            }}>
              Live Cyber Intelligence Feed
            </span>
          </div>
        </motion.div> */}

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.1 }}
          style={{ marginBottom: '20px' }}
        >
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(38px, 10vw, 82px)',
            fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em',
            color: '#0d1117',
          }}>
            Cyber News
          </div>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(38px, 10vw, 82px)',
            fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: 'clamp(1.5px, 0.3vw, 2.5px) #4338ca',
            userSelect: 'none',
          }}>
            &amp; Intelligence
          </div>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(38px, 10vw, 82px)',
            fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.04em',
            color: '#c7d2fe',
          }}>
            Center
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.34, ease: 'easeOut' }}
          style={{
            transformOrigin: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '12px', marginBottom: '24px',
          }}
        >
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, #a5b4fc)' }} />
          <Shield style={{ width: '14px', height: '14px', color: '#818cf8', flexShrink: 0 }} />
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, #a5b4fc)' }} />
        </motion.div>

        {/* Subtitle */}
        {/* <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 3.2vw, 15.5px)',
            fontWeight: 400, color: '#475569',
            maxWidth: '480px', margin: '0 auto 32px',
            lineHeight: 1.85, letterSpacing: '0.01em',
          }}
        >
          Real-time threat intelligence, verified security advisories,
          and global incident coverage — curated for security professionals.
        </motion.p> */}

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: '8px',
            marginBottom: '28px',
          }}
        >
          {pills.map(p => (
            <div
              key={p.label}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: 'clamp(5px, 1.5vw, 7px) clamp(10px, 3vw, 16px)',
                borderRadius: '999px',
                border: `1px solid ${p.border}`,
                background: p.bg,
              }}
            >
              <p.icon style={{ width: '13px', height: '13px', color: p.text, flexShrink: 0 }} />
              <span style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 500, color: p.text, whiteSpace: 'nowrap' }}>
                {p.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        {/* <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.62 }}
          style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'center',
            gap: '10px', marginBottom: '44px',
          }}
        >
          <a
            href="#featured"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: 'clamp(10px, 2.5vw, 13px) clamp(20px, 5vw, 30px)',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              color: '#fff', fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 3vw, 13.5px)', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(79,70,229,0.38)',
              letterSpacing: '0.01em', whiteSpace: 'nowrap',
            }}
          >
            Read featured news
            <ChevronRight style={{ width: '15px', height: '15px', flexShrink: 0 }} />
          </a>
          <a
            href="#news"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: 'clamp(10px, 2.5vw, 13px) clamp(20px, 5vw, 30px)',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.82)',
              border: '1px solid #dde3f0',
              color: '#3730a3', fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 3vw, 13.5px)', fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(6px)',
              letterSpacing: '0.01em', whiteSpace: 'nowrap',
            }}
          >
            View threat intel
          </a>
        </motion.div> */}

        {/* Trust strip */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.72 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(16px, 4vw, 28px)', marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((item, i) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 4vw, 28px)' }}>
              {i > 0 && <div style={{ width: '1px', height: '36px', background: '#e2e8f0' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.03em' }}>
                  {item.val}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 500, color: '#94a3b8', marginTop: '3px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div> */}

        {/* News ticker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: '14px',
            border: '1px solid rgba(199,210,254,0.7)',
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 2px 16px rgba(99,102,241,0.08)',
            maxWidth: '860px', margin: '0 auto',
          }}
        >
          {/* Breaking label */}
          {/* <div className="none" style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '0 14px 0 12px',
            borderRight: '1px solid rgba(199,210,254,0.6)',
            background: 'rgba(255,255,255,0.92)',
          }}>
            <span style={{ position: 'relative', display: 'flex', width: '7px', height: '7px', flexShrink: 0 }}>
              <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#f87171', opacity: 0.7 }} />
              <span style={{ position: 'relative', width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            </span>
            <span style={{
              fontSize: 'clamp(8px, 2vw, 10px)', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#dc2626', whiteSpace: 'nowrap',
            }}>
              Breaking
            </span>
          </div> */}

          {/* Right fade */}
          {/* <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px',
            background: 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)',
            zIndex: 10, pointerEvents: 'none',
          }} /> */}

          {/* Ticker track */}
          {/* <div style={{ overflow: 'hidden', paddingLeft: '104px' }}>
            <div className="flex animate-ticker whitespace-nowrap" style={{ padding: '11px 0' }}>
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '20px',
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 2.5vw, 12.5px)',
                    fontWeight: 400, color: '#4b5563', paddingRight: '20px',
                  }}
                >
                  {item}
                  <span style={{ display: 'inline-block', width: '3px', height: '3px', borderRadius: '50%', background: '#a5b4fc', flexShrink: 0 }} />
                </span>
              ))}
            </div>
          </div> */}
        </motion.div>

             {/* Credibility plaque — a frosted-glass seal, gold-ringed like a
                                press credential, sitting on the dark band */}
                            {/* <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md pl-3 pr-4 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
                                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-[#e8c468]/50">
                                    <ShieldCheckIcon className="w-4 h-4 text-[#e8c468]" />
                                </span>
                                <div className="leading-tight">
                                    <p className="text-[11.5px] font-bold text-white tracking-tight">
                                        Powered by Sadaiv Satya News
                                    </p>
                                    <p className="mt-1 text-[10.5px] text-white/45">
                                        मीडिया पार्टनर ·{" "}
                                        <span className="text-white/70">
                                            Powered by Sadaiv Satya Broadcasting Private Limited
                                        </span>
                                    </p>
                                </div>
                            </div> */}

      </div>
    </section>
  );
}
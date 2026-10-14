'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ─── TRUST INDICATORS ────────────────────────────────────────────────────────
const trustStats = [
  { value: '5,000+', label: 'Citizens Trained' },
  { value: '100+',   label: 'Cyber Workshops' },
  { value: '50+',    label: 'Corporate Partners' },
  { value: '25+',    label: 'Cities Reached' },
];

// ─── CHAPTERS ─────────────────────────────────────────────────────────────────
const chapters = [
  {
    num: '01',
    title: 'The Beginning',
    subtitle: 'Why We Were Born',
    body: `In 2019, a retired schoolteacher in Bhopal lost her life savings to a caller who said he was from her bank. She had never heard the word "phishing." She didn't know that a real bank never asks for OTP over phone. Nobody had told her.\n\nThat story is not an exception. Across India, millions of citizens — students, farmers, homemakers, senior citizens — are entering the digital world for the first time, carrying no armour against the threats that already live there. Cybercrime filings in India crossed 15 lakh in 2023 alone. The victims are not careless. They are simply uninformed.\n\nSadaiv Yuva Foundation was built on one belief: awareness is the only antivirus that works for everyone.`,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&q=85&fit=crop',
    imageAlt: 'Community cyber awareness session in India',
  },
  {
    num: '02',
    title: 'Recognising the Need',
    subtitle: 'Technology Arrived. Awareness Did Not.',
    body: `India's digital transformation is one of the great success stories of the 21st century. Jan Dhan, Aadhaar, UPI — hundreds of millions of people came online within a decade. But as connectivity expanded, so did exposure.\n\nUPI fraud, fake job portals, WhatsApp scams, deepfake defamation, identity theft, cyberbullying in schools, online loan harassment — these are no longer rare incidents. They are daily realities in every city, every district, every income bracket. And the gap between the speed of digital adoption and the depth of digital awareness has never been wider.\n\nCybersecurity cannot remain a conversation only IT professionals have. It belongs in school assemblies, in village panchayats, in women's self-help groups, on factory floors, and in every home where a child holds a smartphone for the first time.`,
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=1200&q=85&fit=crop',
    imageAlt: 'Indian woman using smartphone for digital payments',
  },
  {
    num: '03',
    title: 'Our Response',
    subtitle: 'Not a Campaign. A Movement.',
    body: `We don't send pamphlets. We show up.\n\nSYF volunteers conduct live cyber awareness workshops in schools, colleges, community centres, and corporate offices. We run street plays in semi-urban areas where formal literacy is low but smartphone penetration is high. We partner with state governments, police departments, and district administrations to scale awareness into places institutional programs don't reach.\n\nEvery session is designed around the audience. The content a Class 9 student needs is different from what a 60-year-old retiree needs. We build both. In three years, our programme has touched over 62,000 people across Madhya Pradesh, Rajasthan, UP, Bihar, Jharkhand, and Maharashtra — not as numbers, but as individuals who left knowing something they didn't walk in with.`,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85&fit=crop',
    imageAlt: 'Indian school students attending a cyber awareness workshop',
  },
];

// ─── IMPACT METRICS ───────────────────────────────────────────────────────────
const metrics = [
  { value: 5000,   suffix: '+',  label: 'Citizens Trained',      icon: '👥' },
  { value: 100,    suffix: '+',  label: 'Cyber Workshops',        icon: '🛡️' },
  { value: 50,     suffix: '+',  label: 'Corporate Partners',     icon: '🤝' },
  { value: 300,    suffix: '+',  label: 'Schools & Colleges',     icon: '🎓' },
  { value: 250,    suffix: '+',  label: 'Volunteers',             icon: '✊' },
  { value: 25,     suffix: '+',  label: 'Cities Reached',         icon: '📍' },
  { value: 1,      suffix: 'M+', label: 'Awareness Reach',        icon: '📡' },
  { value: 85,     suffix: '+',  label: 'Community Campaigns',    icon: '📢' },
];

// ─── VALUES ───────────────────────────────────────────────────────────────────
const values = [
  {
    title: 'Empowerment',
    line: 'Knowledge that can be acted on immediately.',
    detail: 'Every workshop ends with a checklist. Every citizen leaves with something they can do today to protect themselves and their family.',
    image: 'https://images.unsplash.com/photo-1598901847919-c90f9f8ac709?w=800&q=80&fit=crop',
  },
  {
    title: 'Inclusivity',
    line: 'Cyber safety is not a privilege.',
    detail: 'We design our programmes in local languages, at accessible reading levels, for audiences who may be encountering digital safety concepts for the very first time.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80&fit=crop',
  },
  {
    title: 'Integrity',
    line: 'We say what we do, and do what we say.',
    detail: 'No inflated impact numbers, no performative partnerships. Every metric we publish has a name behind it — a real workshop, a real participant, a real outcome.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&fit=crop',
  },
  {
    title: 'Community',
    line: 'Change happens in rooms, not on slides.',
    detail: 'We train local volunteers to carry awareness forward after we leave. The goal is not dependency on SYF — it is a community that educates itself.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80&fit=crop',
  },
];

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
const milestones = [
  { year: '2024', title: 'Foundation Established', detail: 'SYF was registered in Bhopal, Madhya Pradesh, with a core team of 7 volunteers and a single mandate: bring cybersecurity awareness to everyday citizens.' },
  { year: '2024', title: 'First Community Workshop', detail: 'Our pilot session reached 200 residents in a Bhopal neighbourhood. 94% of attendees had never heard the term "phishing." By the end of the session, every one of them could identify one.' },
  { year: '2025', title: 'School Awareness Campaign', detail: 'Partnership with 12 government schools in MP to deliver age-appropriate cyber safety modules for students in Classes 6–10, reaching 3,200 students in year one.' },
  { year: '2025', title: '1,000 Citizens Trained', detail: 'A milestone reached not through a single event but through 18 separate community sessions across 4 districts — proof that the model scales.' },
  { year: '2025', title: 'Corporate Partnerships', detail: 'Onboarded 50+ corporate partners for employee cybersecurity training — extending our reach into workplaces and generating sustainable programme funding.' },
  { year: '2026', title: 'National Vision Launch', detail: 'SYF formalises its five-year roadmap: a Cyber-Aware India by 2029, with at least one trained cyber awareness volunteer in every district of the country.' },
];

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {value === 1 ? display : display.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

// ─── CHAPTER BLOCK ────────────────────────────────────────────────────────────
function ChapterBlock({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reverse = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[600px]`}
    >
      {/* Image */}
      <div className="relative w-full lg:w-[52%] overflow-hidden" style={{ minHeight: 420 }}>
        <motion.div
          initial={{ scale: 1.06 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${chapter.image}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.28)' }} />
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em',
              color: '#F59E0B', background: 'rgba(15,23,42,0.7)', padding: '5px 12px',
            }}>
              CHAPTER {chapter.num}
            </span>
          </div>
          <div className="absolute bottom-8 left-8 right-8">
            <p style={{
              fontFamily: 'var(--font-ui)', fontSize: 22, fontWeight: 700,
              color: '#fff', lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}>
              {chapter.subtitle}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`w-full lg:w-[48%] flex flex-col justify-center px-10 lg:px-16 py-16 lg:py-20 ${index % 2 === 0 ? 'bg-[#F7F8FA]' : 'bg-[#FCFCFA]'}`}>
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.32em', color: '#059669', marginBottom: 24, textTransform: 'uppercase' }}>
            Chapter {chapter.num}
          </p>
          <div style={{ width: 36, height: 2, background: '#F59E0B', marginBottom: 28 }} />
          <h3 style={{
            fontFamily: 'var(--font-ui)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800,
            color: '#0F172A', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 28,
          }}>
            {chapter.title}
          </h3>
          {chapter.body.split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8,
              color: '#374151', marginBottom: i < chapter.body.split('\n\n').length - 1 ? 18 : 0,
            }}>
              {para}
            </p>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── VALUE BLOCK ──────────────────────────────────────────────────────────────
function ValueBlock({ val, index }: { val: typeof values[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reverse = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.1 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0`}
      style={{ borderTop: '1px solid #E5E7EB' }}
    >
      <div className="relative w-full md:w-[40%] overflow-hidden" style={{ minHeight: 320 }}>
        <motion.div
          initial={{ scale: 1.05 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${val.image}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
      </div>
      <div className="w-full md:w-[60%] flex flex-col justify-center px-10 md:px-16 py-14 bg-[#FAFAF8]">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', color: '#2563EB', marginBottom: 16, textTransform: 'uppercase' }}>
          Core Value
        </p>
        <h4 style={{
          fontFamily: 'var(--font-ui)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800,
          color: '#0F172A', letterSpacing: '-0.025em', marginBottom: 12,
        }}>
          {val.title}
        </h4>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 500, color: '#059669', marginBottom: 16, lineHeight: 1.4 }}>
          {val.line}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: '#4B5563', maxWidth: 480 }}>
          {val.detail}
        </p>
      </div>
    </motion.div>
  );
}

// ─── MILESTONE ────────────────────────────────────────────────────────────────
function Milestone({ m, index }: { m: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.04 }}
      className="flex gap-8 relative"
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center" style={{ minWidth: 48 }}>
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: '#2563EB', border: '3px solid #BFDBFE',
          flexShrink: 0, marginTop: 6,
        }} />
        {index < milestones.length - 1 && (
          <div style={{ width: 2, flex: 1, background: '#E5E7EB', marginTop: 6 }} />
        )}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: index < milestones.length - 1 ? 48 : 0 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.25em', color: '#2563EB', marginBottom: 8 }}>
          {m.year}
        </p>
        <h4 style={{
          fontFamily: 'var(--font-ui)', fontSize: 22, fontWeight: 700,
          color: '#0F172A', letterSpacing: '-0.015em', marginBottom: 10,
        }}>
          {m.title}
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: '#4B5563', maxWidth: 560 }}>
          {m.detail}
        </p>
      </div>
    </motion.div>
  );
}

// ─── HERO COLLAGE ─────────────────────────────────────────────────────────────
const collageImages = [
  { src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80&fit=crop', style: { top: 0, right: 0, width: '60%', height: '45%' } },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80&fit=crop', style: { top: '10%', right: '58%', width: '38%', height: '36%' } },
  { src: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=600&q=80&fit=crop', style: { top: '42%', right: '5%', width: '44%', height: '40%' } },
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80&fit=crop', style: { top: '45%', right: '50%', width: '42%', height: '38%' } },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80&fit=crop', style: { top: '82%', right: '20%', width: '32%', height: '18%' } },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function FoundationProfile() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main style={{ background: '#FAFAF8', overflowX: 'hidden', marginTop:"63px" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        {/* Background grid texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, #2563EB12 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 py-24 flex flex-col lg:flex-row gap-16 items-center">

          {/* Left: text */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="w-full lg:w-[48%]"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.35em', color: '#2563EB', marginBottom: 24, textTransform: 'uppercase' }}
            >
              Sadaiv Yuva Foundation — Est. 2019
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-ui)', fontWeight: 900,
                fontSize: 'clamp(32px, 5vw, 62px)', lineHeight: 1.08,
                letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 28,
              }}
            >
              Building A<br />
              <span style={{ color: '#059669' }}>Cyber-Aware</span><br />
              Nation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.75,
                color: '#374151', maxWidth: 520, marginBottom: 40,
              }}
            >
              Sadaiv Yuva Foundation is a non-profit organisation committed to creating a
              digitally empowered and cyber-secure India — through education, awareness
              campaigns, community outreach, and strategic partnerships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <a
                href="#our-story"
                style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14,
                  background: '#0F172A', color: '#fff', padding: '14px 32px',
                  letterSpacing: '0.01em', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2563EB')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0F172A')}
              >
                Explore Our Mission
              </a>
              <a
                href="#get-involved"
                style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14,
                  background: 'transparent', color: '#0F172A',
                  padding: '13px 32px', border: '2px solid #0F172A',
                  letterSpacing: '0.01em', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0F172A'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0F172A'; }}
              >
                Join Our Movement
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-8"
            >
              {trustStats.map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 26, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-[52%]"
            style={{ position: 'relative', height: 520 }}
          >
            {collageImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
                style={{
                  position: 'absolute',
                  ...img.style,
                  backgroundImage: `url('${img.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 8px 40px rgba(15,23,42,0.18)',
                  border: '3px solid #fff',
                }}
              />
            ))}
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{
                position: 'absolute', bottom: '8%', left: '4%',
                background: '#0F172A', color: '#fff',
                padding: '14px 20px', zIndex: 10,
                boxShadow: '0 8px 32px rgba(15,23,42,0.3)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: '#F59E0B', marginBottom: 4 }}>
                IMPACT 2024
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 22, lineHeight: 1 }}>
                62,000+
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#94A3B8', marginTop: 3 }}>
                Citizens made cyber-aware
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
        >
          <div style={{ width: 24, height: 38, border: '2px solid #CBD5E1', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: '#2563EB', borderRadius: 2 }} />
          </div>
        </motion.div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────────────────── */}
      <section style={{ background: '#0F172A', padding: '80px 8vw', textAlign: 'center' }}>
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-ui)', fontWeight: 700,
            fontSize: 'clamp(22px, 3.5vw, 44px)',
            color: '#F1F5F9', lineHeight: 1.3, letterSpacing: '-0.02em',
            maxWidth: 900, margin: '0 auto',
          }}
        >
          "The digital world should empower people —{' '}
          <span style={{ color: '#F59E0B' }}>not expose them to fear.</span>"
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.25em', color: '#64748B', marginTop: 24, textTransform: 'uppercase' }}
        >
          Sadaiv Yuva Foundation — Core Philosophy
        </motion.p>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────────────────── */}
      <section id="our-story" style={{ background: '#FAFAF8' }}>
        <div style={{ padding: '80px 8vw 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: '#059669', marginBottom: 16, textTransform: 'uppercase' }}>
              Our Story
            </p>
            <h2 style={{
              fontFamily: 'var(--font-ui)', fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#0F172A',
              letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 640,
            }}>
              Three chapters.<br />
              <span style={{ color: '#2563EB' }}>One commitment.</span>
            </h2>
          </motion.div>
        </div>
        <div>
          {chapters.map((ch, i) => (
            <ChapterBlock key={ch.num} chapter={ch} index={i} />
          ))}
        </div>
      </section>

      {/* ── IMPACT DASHBOARD ─────────────────────────────────────────────── */}
      <section style={{ background: '#F7F8FA', padding: '100px 8vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: '#2563EB', marginBottom: 16, textTransform: 'uppercase' }}>
            Our Impact
          </p>
          <h2 style={{
            fontFamily: 'var(--font-ui)', fontWeight: 900,
            fontSize: 'clamp(30px, 4vw, 52px)', color: '#0F172A',
            letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            Numbers that represent<br />
            <span style={{ color: '#059669' }}>real people.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ border: '1px solid #E5E7EB' }}>
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              style={{
                padding: '40px 32px',
                borderRight: (i + 1) % 4 !== 0 ? '1px solid #E5E7EB' : 'none',
                borderBottom: i < 4 ? '1px solid #E5E7EB' : 'none',
                background: '#fff',
              }}
            >
              <p style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</p>
              <p style={{
                fontFamily: 'var(--font-ui)', fontWeight: 900,
                fontSize: 'clamp(28px, 3vw, 44px)', color: '#0F172A',
                letterSpacing: '-0.03em', lineHeight: 1,
              }}>
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B7280', marginTop: 8 }}>
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PURPOSE ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#FCFCFA' }}>
        <div className="flex flex-col lg:flex-row min-h-[560px]">
          {/* Mission */}
          <div style={{ flex: 1, padding: '80px 8vw', borderRight: '1px solid #E5E7EB' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', color: '#2563EB', marginBottom: 20, textTransform: 'uppercase' }}>
                Our Mission
              </p>
              <div style={{ width: 32, height: 3, background: '#2563EB', marginBottom: 24 }} />
              <h3 style={{
                fontFamily: 'var(--font-ui)', fontWeight: 800,
                fontSize: 'clamp(24px, 3vw, 38px)', color: '#0F172A',
                letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 24,
              }}>
                Empower every citizen to navigate the digital world safely.
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
                We equip individuals, institutions, and communities with the knowledge, tools, and confidence to participate in India's digital economy without fear — through education, live workshops, media campaigns, community engagement, and sustained awareness programming.
              </p>
            </motion.div>
          </div>

          {/* Vision */}
          <div style={{ flex: 1, padding: '80px 8vw', background: '#0F172A' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', color: '#F59E0B', marginBottom: 20, textTransform: 'uppercase' }}>
                Our Vision
              </p>
              <div style={{ width: 32, height: 3, background: '#F59E0B', marginBottom: 24 }} />
              <h3 style={{
                fontFamily: 'var(--font-ui)', fontWeight: 800,
                fontSize: 'clamp(24px, 3vw, 38px)', color: '#F1F5F9',
                letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 24,
              }}>
                A Digital Bharat.<br />A Secure Bharat.
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: '#94A3B8' }}>
                A future where every Indian — regardless of language, geography, age, or income — understands the digital risks they face, knows how to protect themselves, and actively contributes to a safer online society for their families and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#FAFAF8' }}>
        <div style={{ padding: '80px 8vw 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: '#059669', marginBottom: 16, textTransform: 'uppercase' }}>
              What We Stand For
            </p>
            <h2 style={{
              fontFamily: 'var(--font-ui)', fontWeight: 900,
              fontSize: 'clamp(30px, 4vw, 52px)', color: '#0F172A',
              letterSpacing: '-0.03em', lineHeight: 1.1,
            }}>
              Our core values aren't{' '}
              <span style={{ color: '#2563EB' }}>displayed on a wall.</span>
              <br />They're practised in the field.
            </h2>
          </motion.div>
        </div>
        {values.map((v, i) => (
          <ValueBlock key={v.title} val={v} index={i} />
        ))}
      </section>

      {/* ── JOURNEY / TIMELINE ───────────────────────────────────────────── */}
      <section style={{ background: '#F7F8FA', padding: '100px 8vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 72 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: '#2563EB', marginBottom: 16, textTransform: 'uppercase' }}>
            Our Journey
          </p>
          <h2 style={{
            fontFamily: 'var(--font-ui)', fontWeight: 900,
            fontSize: 'clamp(30px, 4vw, 52px)', color: '#0F172A',
            letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 540,
          }}>
            Five years. Eight cities.{' '}
            <span style={{ color: '#059669' }}>One direction.</span>
          </h2>
        </motion.div>

        <div style={{ maxWidth: 680 }}>
          {milestones.map((m, i) => (
            <Milestone key={i} m={m} index={i} />
          ))}
        </div>
      </section>

      {/* ── WHAT WE FOCUS ON ──────────────────────────────────────────────── */}
      <section style={{ background: '#FAFAF8', padding: '100px 8vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 72 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: '#2563EB', marginBottom: 16, textTransform: 'uppercase' }}>
            Key Focus Areas
          </p>
          <h2 style={{
            fontFamily: 'var(--font-ui)', fontWeight: 900,
            fontSize: 'clamp(30px, 4vw, 52px)', color: '#0F172A',
            letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 680, marginBottom: 20,
          }}>
            What We Focus On
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#4B5563', lineHeight: 1.7, maxWidth: 600 }}>
            We address the most critical aspects of cybersecurity to create a comprehensive defence against digital threats — from individual fraud to systemic legal gaps.
          </p>
        </motion.div>

        {/* ── PILLAR 1: CYBERCRIME EDUCATION ── */}
        <div className="flex flex-col lg:flex-row gap-0" style={{ marginBottom: 2, border: '1px solid #E5E7EB' }}>
          {/* Image */}
          <div style={{ position: 'relative', width: '100%', minHeight: 360, flex: '0 0 45%', overflow: 'hidden' }}>
            <motion.div
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&fit=crop')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.45)' }} />
              <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', color: '#F59E0B', marginBottom: 8, textTransform: 'uppercase' }}>
                  Pillar 01
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 26, color: '#fff', lineHeight: 1.2 }}>
                  Cybercrime<br />Education
                </p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '52px 48px', background: '#fff' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: '#2563EB', marginBottom: 28, textTransform: 'uppercase' }}>
                Protecting Against Digital Threats
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[
                  {
                    label: 'Financial Fraud',
                    icon: '₹',
                    body: 'Training on identifying phishing scams, OTP frauds, UPI misuse, and fake investment opportunities — the schemes that most frequently devastate Indian households with no prior warning.',
                  },
                  {
                    label: 'Online Safety',
                    icon: '🛡',
                    body: 'Protecting women, children, and senior citizens from online abuse, fake job scams, and cyberbullying through awareness sessions, safety checklists, and practical reporting guidance.',
                  },
                  {
                    label: 'Emerging Threats',
                    icon: '⚠',
                    body: 'Education on cryptocurrency scams, gaming frauds, and the weaponisation of AI for digital defamation or deepfake-based blackmail — threats that most citizens don\'t yet know exist.',
                  },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: 20 }}>
                    <div style={{
                      width: 40, height: 40, background: '#EFF6FF', borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, flexShrink: 0, marginTop: 2,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 6 }}>
                        {item.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: '#4B5563' }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── PILLAR 2: LEGAL AWARENESS ── */}
        <div className="flex flex-col lg:flex-row-reverse gap-0" style={{ marginBottom: 2, border: '1px solid #E5E7EB', borderTop: 'none' }}>
          {/* Image */}
          <div style={{ position: 'relative', width: '100%', minHeight: 360, flex: '0 0 45%', overflow: 'hidden' }}>
            <motion.div
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80&fit=crop')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,150,105,0.35)' }} />
              <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', color: '#fff', marginBottom: 8, textTransform: 'uppercase', opacity: 0.8 }}>
                  Pillar 02
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 26, color: '#fff', lineHeight: 1.2 }}>
                  Legal<br />Awareness
                </p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '52px 48px', background: '#F7F8FA' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', color: '#059669', marginBottom: 28, textTransform: 'uppercase' }}>
                Understanding Cyber Laws in India
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {[
                  { text: 'Comprehensive resources on the IT Act 2000 and its amendments — helping citizens understand their digital rights, responsibilities, and legal protections under Indian law.' },
                  { text: 'Clear explanations of digital forgery, identity theft, and criminal liability under Indian cybersecurity regulations — in language anyone can understand, not legal jargon.' },
                  { text: 'Step-by-step guidance on reporting cybercrimes and navigating the National Cyber Crime Reporting Portal (cybercrime.gov.in) effectively from the very first step.' },
                  { text: 'Regular updates on new cyber laws, government policies, and digital compliance best practices as the legislative landscape evolves.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, background: '#059669', borderRadius: '50%', marginTop: 8, flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: '#374151' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── PILLAR 3: SKILL DEVELOPMENT ── */}
        <div style={{ border: '1px solid #E5E7EB', borderTop: 'none', background: '#0F172A', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, #2563EB18 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div className="flex flex-col lg:flex-row" style={{ position: 'relative', zIndex: 1 }}>
            {/* Left label */}
            <div style={{ flex: '0 0 36%', padding: '64px 48px', borderRight: '1px solid #1E293B' }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', color: '#F59E0B', marginBottom: 16, textTransform: 'uppercase' }}>
                  Pillar 03
                </p>
                <div style={{ width: 32, height: 3, background: '#F59E0B', marginBottom: 24 }} />
                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 900,
                  fontSize: 'clamp(26px, 3vw, 40px)', color: '#F1F5F9',
                  letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 20,
                }}>
                  Skill Development
                </h3>
                <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 18, color: '#F59E0B', marginBottom: 16, lineHeight: 1.4 }}>
                  Nurturing Future Leaders
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: '#94A3B8' }}>
                  Beyond awareness, SYF actively builds the next generation of India's cybersecurity professionals — equipping young people with both technical expertise and the leadership capacity to drive national-level change.
                </p>
              </motion.div>
            </div>

            {/* Right: 3 cards */}
            <div style={{ flex: 1, padding: '64px 48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  {
                    tag: 'Elite Learning Programs',
                    title: 'Specialised Technical Courses',
                    body: 'Structured courses designed to develop deep technical cybersecurity skills — covering threat analysis, network security fundamentals, ethical hacking principles, and professional certifications pathways — alongside leadership and communication skills for the workplace.',
                    accent: '#2563EB',
                  },
                  {
                    tag: 'Workshops & Masterclasses',
                    title: 'Advanced Interactive Sessions',
                    body: 'Hands-on masterclasses covering penetration testing methodology, security architecture principles, incident response, and digital forensics basics — taught by practitioners who work in India\'s cybersecurity industry, not just educators.',
                    accent: '#059669',
                  },
                  {
                    tag: 'Mentorship Programs',
                    title: 'One-on-One Guidance',
                    body: 'Dedicated mentorship connecting young professionals with senior practitioners in the field — structured to nurture "change-makers" who will eventually lead India\'s cybersecurity awareness infrastructure at a district and state level.',
                    accent: '#F59E0B',
                  },
                ].map((card, i) => (
                  <motion.div
                    key={card.tag}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      padding: '28px 0',
                      borderBottom: i < 2 ? '1px solid #1E293B' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                      <div style={{ width: 3, height: 52, background: card.accent, flexShrink: 0, marginTop: 4 }} />
                      <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: card.accent, marginBottom: 6, textTransform: 'uppercase' }}>
                          {card.tag}
                        </p>
                        <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 17, color: '#F1F5F9', marginBottom: 10 }}>
                          {card.title}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.75, color: '#94A3B8' }}>
                          {card.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        id="get-involved"
        style={{
          background: '#0F172A',
          padding: '100px 8vw',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, #2563EB22 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em', color: '#F59E0B', marginBottom: 24, textTransform: 'uppercase' }}>
            Be Part of the Movement
          </p>
          <h2 style={{
            fontFamily: 'var(--font-ui)', fontWeight: 900,
            fontSize: 'clamp(30px, 4.5vw, 56px)',
            color: '#F1F5F9', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24,
          }}>
            There is a role here<br />
            <span style={{ color: '#059669' }}>for everyone.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.75, color: '#94A3B8', marginBottom: 48, maxWidth: 540 }}>
            Whether you are a student, a professional, a business, or simply a citizen who believes awareness changes lives — there is a meaningful way to contribute to a safer digital India.
          </p>

          <div className="flex flex-wrap gap-6">
            {['Volunteer With Us', 'Donate to the Cause', 'Partner With SYF', 'Organise a Workshop'].map((label, i) => (
              <motion.a
                key={label}
                href="#"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14,
                  padding: '14px 28px', textDecoration: 'none',
                  border: i === 0 ? 'none' : '2px solid #334155',
                  background: i === 0 ? '#2563EB' : 'transparent',
                  color: i === 0 ? '#fff' : '#CBD5E1',
                  transition: 'all 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#2563EB';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = i === 0 ? '#2563EB' : 'transparent';
                  e.currentTarget.style.color = i === 0 ? '#fff' : '#CBD5E1';
                  e.currentTarget.style.borderColor = i === 0 ? 'none' : '#334155';
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

    </main>
  );
}
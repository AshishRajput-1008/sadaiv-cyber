import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause, Clock, Mic2, Headphones, ChevronRight } from 'lucide-react';

const SG = "'Space Grotesk', sans-serif";
const MR = "'Manrope', sans-serif";

const podcasts = [
  { title: 'The Rise Of AI-Powered Cyber Attacks: What India Needs To Know', category: 'Cyber News Weekly', duration: '32 min', host: 'Priya Sharma', summary: 'An in-depth analysis of how artificial intelligence is transforming cyber attacks, from automated phishing to deepfake social engineering, and what Indian organizations must do to prepare.', episode: 'EP 47', accent: '#4f46e5', accentLight: '#eef2ff', accentBorder: '#c7d2fe' },
  { title: 'Understanding The Latest Ransomware Threat Landscape', category: 'Threat Intelligence', duration: '28 min', host: 'Dr. Arun Mehta', summary: 'Security researcher Dr. Mehta breaks down the evolving ransomware ecosystem, double extortion tactics, and the emergence of ransomware-as-a-service platforms targeting Indian businesses.', episode: 'EP 23', accent: '#1d4ed8', accentLight: '#eff6ff', accentBorder: '#bfdbfe' },
  { title: 'Why Cyber Awareness Matters: A Conversation With Students', category: 'Awareness Talks', duration: '25 min', host: 'Kavitha Reddy', summary: 'Students from top Indian universities share their experiences with online scams, social engineering attempts, and how cyber awareness education changed their digital behavior.', episode: 'EP 18', accent: '#0891b2', accentLight: '#ecfeff', accentBorder: '#a5f3fc' },
  { title: 'Digital Personal Data Protection Act: Rights You Should Know', category: 'Cyber Law', duration: '35 min', host: 'Adv. Rohan Kapoor', summary: 'Legal expert Rohan Kapoor explains the key provisions of India\'s new data protection law, what rights citizens have, and how to file complaints for data privacy violations.', episode: 'EP 12', accent: '#7c3aed', accentLight: '#f5f3ff', accentBorder: '#ddd6fe' },
  { title: 'Student Guide To Online Safety: Social Media And Beyond', category: 'Student Safety Series', duration: '22 min', host: 'Anita Desai', summary: 'Practical advice for students on protecting their social media accounts, avoiding online predators, recognizing fake profiles, and maintaining digital hygiene during exam season.', episode: 'EP 08', accent: '#0d9488', accentLight: '#f0fdfa', accentBorder: '#99f6e4' },
  { title: 'Your Digital Footprint: Who Is Watching You Online?', category: 'Digital Privacy', duration: '30 min', host: 'Vikram Singh', summary: 'Privacy researcher Vikram Singh reveals how data brokers track your online activity, what your digital footprint reveals about you, and practical steps to reclaim your digital privacy.', episode: 'EP 15', accent: '#4f46e5', accentLight: '#eef2ff', accentBorder: '#c7d2fe' },
];

export default function PodcastHub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  return (
    <section
      id="podcasts"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #0d1117 0%, #1e1b4b 60%, #0f172a 100%)',
        fontFamily: 'var(--font-body)',
        padding: 'clamp(48px, 7vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: '-160px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(165,180,252,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

<div
  style={{
    position: 'relative',
    zIndex: 1,
    margin: '0 auto',
    paddingLeft: '16px',
    paddingRight: '36px',
  }}
>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42 }}
          style={{ marginBottom: '14px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(165,180,252,0.25)',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#a5b4fc', fontFamily: 'var(--font-body)',
          }}>
            Podcast Hub
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#f8faff', lineHeight: 1, margin: '0 0 12px',
          }}
        >
          Cyber Security{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #818cf8' }}>
            Podcast Center
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '14.5px', color: '#94a3b8', lineHeight: 1.75, maxWidth: '520px', marginBottom: '44px' }}
        >
          Listen to expert discussions, cyber awareness talks, industry insights, security trends, and threat intelligence updates.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px',
        }}>
          {podcasts.map((pod, i) => (
            <motion.div
              key={pod.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '0 0 18px',
                height: '100%', display: 'flex', flexDirection: 'column',
                backdropFilter: 'blur(12px)',
                overflow: 'hidden',
                transition: 'background .2s',
              }}>
                {/* Cover */}
                <div style={{
                  position: 'relative', height: '150px',
                  background: `linear-gradient(135deg, ${pod.accent}cc 0%, ${pod.accent} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Sound wave lines decoration */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', opacity: 0.18 }}>
                    {[18, 32, 48, 60, 44, 56, 36, 52, 28, 42, 62, 38, 50, 26, 44].map((h, j) => (
                      <div key={j} style={{ width: '3px', height: `${h}%`, background: '#fff', borderRadius: '2px' }} />
                    ))}
                  </div>
                  <span style={{
                    position: 'absolute', top: '12px', left: '14px',
                    fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)',
                  }}>
                    {pod.episode}
                  </span>
                  <Headphones size={32} color="rgba(255,255,255,0.3)" />
                  {/* Play button */}
                  <button
                    onClick={() => setPlayingIdx(playingIdx === i ? null : i)}
                    style={{
                      position: 'absolute', bottom: '12px', right: '12px',
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: '#fff', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(0,0,0,.25)',
                      transition: 'transform .15s',
                    }}
                  >
                    {playingIdx === i
                      ? <Pause size={16} color={pod.accent} />
                      : <Play size={16} color={pod.accent} style={{ marginLeft: '2px' }} />
                    }
                  </button>
                </div>

                {/* Body */}
                <div style={{ padding: '16px 18px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{
                    display: 'inline-block', alignSelf: 'flex-start',
                    padding: '2px 10px', borderRadius: '999px',
                    fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                    background: pod.accentLight, color: pod.accent, border: `1px solid ${pod.accentBorder}`,
                  }}>
                    {pod.category}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 700,
                    color: '#f1f5f9', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0,
                  }}>
                    {pod.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.75, margin: 0, flex: 1 }}>
                    {pod.summary}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
                        <Clock size={11} color="#64748b" />{pod.duration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
                        <Mic2 size={11} color="#64748b" />{pod.host}
                      </span>
                    </div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <ChevronRight size={16} color="#64748b" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
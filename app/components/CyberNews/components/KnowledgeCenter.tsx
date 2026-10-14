import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  TrendingUp, ShieldCheck, Eye, Lock, Brain, Fingerprint, ArrowRight, BookOpen,
} from 'lucide-react';

const SG = "'Space Grotesk', sans-serif";
const MR = "'Manrope', sans-serif";

const articles = [
  {
    icon: TrendingUp,
    title: 'Latest Cyber Trends: How Attack Vectors Are Evolving In 2026',
    excerpt: 'From AI-powered social engineering to quantum computing threats, the cyber landscape is shifting faster than ever. Key trends security professionals must understand.',
    readTime: '8 min',
    topic: 'Cyber Trends',
    accentBg: '#eef2ff', accentText: '#4338ca', accentBorder: '#c7d2fe',
  },
  {
    icon: ShieldCheck,
    title: '10 Online Safety Tips Every Internet User Must Follow Today',
    excerpt: 'Practical, actionable steps you can implement immediately to protect your accounts, devices, and personal data from common attack methods.',
    readTime: '6 min',
    topic: 'Online Safety',
    accentBg: '#eff6ff', accentText: '#1d4ed8', accentBorder: '#bfdbfe',
  },
  {
    icon: Eye,
    title: 'Threat Awareness: Recognizing Social Engineering Before It Strikes',
    excerpt: 'Social engineering attacks exploit human psychology, not technology. Learn the psychological patterns attackers use and how to develop a security-first mindset.',
    readTime: '7 min',
    topic: 'Threat Awareness',
    accentBg: '#fff7ed', accentText: '#c2410c', accentBorder: '#fed7aa',
  },
  {
    icon: Lock,
    title: 'Cyber Security Best Practices For Remote Workers And Small Businesses',
    excerpt: 'Remote work introduces unique security challenges. This guide covers VPN selection, endpoint protection, secure collaboration tools, and incident response.',
    readTime: '9 min',
    topic: 'Best Practices',
    accentBg: '#f0fdfa', accentText: '#0d9488', accentBorder: '#99f6e4',
  },
  {
    icon: Brain,
    title: 'AI And Cyber Security: The Arms Race Between Attackers And Defenders',
    excerpt: 'Artificial intelligence is transforming both attack and defense capabilities. Understand how AI enables next-generation threats and how defenders are fighting back.',
    readTime: '10 min',
    topic: 'AI & Security',
    accentBg: '#f5f3ff', accentText: '#7c3aed', accentBorder: '#ddd6fe',
  },
  {
    icon: Fingerprint,
    title: 'Digital Privacy In 2026: Reclaiming Control Over Your Personal Data',
    excerpt: 'Data brokers, tracking cookies, and surveillance capitalism threaten individual privacy. Practical strategies for minimizing your digital footprint.',
    readTime: '7 min',
    topic: 'Digital Privacy',
    accentBg: '#ecfeff', accentText: '#0891b2', accentBorder: '#a5f3fc',
  },
];

export default function KnowledgeCenter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="knowledge"
      ref={ref}
      style={{ background: '#f0f2f8', fontFamily: 'var(--font-body)', padding: 'clamp(48px, 7vw, 26px) 24px', position: 'relative', overflow: 'hidden' }}
    >
      <div aria-hidden style={{ position: 'absolute', top: '60px', left: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '40px', right: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, margin: '0 auto' , paddingLeft: '16px',paddingRight: '36px',}}>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42 }}
          style={{ marginBottom: '14px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: 'rgba(255,255,255,0.8)', border: '1px solid #c7d2fe',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#4338ca', fontFamily: 'var(--font-body)',
          }}>
            Knowledge Center
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#0d1117', lineHeight: 1, margin: '0 0 12px',
          }}
        >
          Cyber Security{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #4338ca' }}>
            Knowledge Center
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.75, maxWidth: '520px', marginBottom: '40px' }}
        >
          In-depth articles and guides to deepen your understanding of cyber threats and digital safety practices.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px',
        }}>
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
            >
              <div style={{
                background: '#fff', borderRadius: '16px',
                border: '1px solid #e2e8f0', padding: '22px 24px',
                height: '100%', display: 'flex', flexDirection: 'column', gap: '10px',
                transition: 'box-shadow .2s',
              }}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '11px',
                      background: article.accentBg, border: `1px solid ${article.accentBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <article.icon size={17} color={article.accentText} />
                    </div>
                    <span style={{
                      padding: '3px 10px', borderRadius: '999px',
                      fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                      background: article.accentBg, color: article.accentText,
                      border: `1px solid ${article.accentBorder}`,
                    }}>
                      {article.topic}
                    </span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8' }}>
                    <BookOpen size={11} color="#94a3b8" />{article.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontSize: '14.5px', fontWeight: 700,
                  color: '#0d1117', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0,
                }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, margin: 0, flex: 1 }}>
                  {article.excerpt}
                </p>

                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', fontWeight: 600, color: article.accentText,
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', padding: 0, marginTop: '4px',
                }}>
                  Read Article <ArrowRight size={12} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Bell, Shield, Headphones, Newspaper, CheckCircle2 } from 'lucide-react';

const SG = "'Space Grotesk', sans-serif";
const MR = "'Manrope', sans-serif";

const benefits = [
  { icon: Newspaper,  label: 'Latest News',         desc: 'Weekly digest of top cyber security stories' },
  { icon: Bell,       label: 'Threat Alerts',        desc: 'Critical threat notifications as they emerge' },
  { icon: Shield,     label: 'Security Advisories',  desc: 'Actionable security guidance and patches' },
  { icon: Headphones, label: 'Podcast Updates',      desc: 'New episode notifications and highlights' },
  { icon: Mail,       label: 'Awareness Content',    desc: 'Educational resources and safety tips' },
];

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      ref={ref}
      style={{ background: '#fff', fontFamily: 'var(--font-body)', padding: 'clamp(48px, 7vw, 36px) 24px', position: 'relative', overflow: 'hidden' }}
    >
      <div aria-hidden style={{ position: 'absolute', top: '-100px', left: '-80px', width: '440px', height: '440px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-80px', right: '-60px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42 }}
          style={{ textAlign: 'center', marginBottom: '14px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: '#eef2ff', border: '1px solid #c7d2fe',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#4338ca', fontFamily: 'var(--font-body)',
          }}>
            Newsletter
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 'clamp(26px, 5vw, 42px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#0d1117', lineHeight: 1.1, margin: '0 auto 12px',
            textAlign: 'center', maxWidth: '600px',
          }}
        >
          Get Weekly{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #4338ca' }}>
            Cyber Intelligence
          </span>{' '}
          Updates
        </motion.h2>


        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.32 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '8px', marginBottom: '40px',
          }}
        >
          {benefits.map(b => (
            <div
              key={b.label}
              style={{
                textAlign: 'center', padding: '16px 10px',
                background: '#f8faff', borderRadius: '14px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: '#eef2ff', border: '1px solid #c7d2fe',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px',
              }}>
                <b.icon size={17} color="#4338ca" />
              </div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: 700, color: '#0d1117', margin: '0 0 4px' }}>{b.label}</p>
              <p style={{ fontSize: '10.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Subscription box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.44 }}
        >
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
            padding: 'clamp(28px, 5vw, 52px)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Inner dot grid */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(165,180,252,0.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />
            <div aria-hidden style={{
              position: 'absolute', top: '-80px', right: '-60px', width: '280px', height: '280px',
              borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <CheckCircle2 size={52} color="#34d399" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '22px', fontWeight: 700, color: '#f8faff', margin: '0 0 8px' }}>
                    You are subscribed!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#a5b4fc', lineHeight: 1.7, margin: 0 }}>
                    Check your inbox for your first weekly cyber intelligence update.
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', fontWeight: 700, color: '#f8faff', textAlign: 'center', margin: '0 0 22px' }}>
                    Join 50,000+ security professionals
                  </p>
                  <div style={{
                    display: 'flex', gap: '10px', flexWrap: 'wrap',
                    maxWidth: '560px', margin: '0 auto',
                  }}>
                    <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                      <Mail
                        size={16}
                        color="#818cf8"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit(e as any)}
                        placeholder="Enter your email address"
                        required
                        style={{
                          width: '100%', paddingLeft: '42px', paddingRight: '16px',
                          paddingTop: '14px', paddingBottom: '14px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.09)',
                          border: '1px solid rgba(165,180,252,0.25)',
                          color: '#f1f5f9', fontSize: '13.5px', fontFamily: 'var(--font-body)',
                          outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSubmit as any}
                      style={{
                        padding: '14px 28px', borderRadius: '12px',
                        background: '#fff', color: '#3730a3',
                        fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 700,
                        border: 'none', cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,.2)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'rgba(165,180,252,0.55)', textAlign: 'center', margin: '14px 0 0', fontFamily: 'var(--font-body)' }}>
                    No spam. Unsubscribe anytime. Your data stays protected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
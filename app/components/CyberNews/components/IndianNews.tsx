import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  ShieldAlert, Landmark, CreditCard, Smartphone,
  GraduationCap, Flag, Building2, FileWarning, ArrowRight,
  Globe2, Bug, Server, Cloud, Brain, ShieldOff, Swords, MapPin,
  IndianRupee,
} from 'lucide-react';

// ─── INDIA ───────────────────────────────────────────────

type IndiaCategory = 'All' | 'Government Advisories' | 'CERT-In Updates' | 'Cyber Crime Reports' | 'Banking Security' | 'UPI & Digital Payments' | 'Education & Awareness' | 'Student Safety' | 'Digital India';

const indiaCategories: { label: IndiaCategory; icon: React.ElementType }[] = [
  { label: 'All',                    icon: ShieldAlert    },
  { label: 'Government Advisories',  icon: Landmark       },
  { label: 'CERT-In Updates',        icon: FileWarning    },
  { label: 'Cyber Crime Reports',    icon: ShieldAlert    },
  { label: 'Banking Security',       icon: CreditCard     },
  { label: 'UPI & Digital Payments', icon: Smartphone     },
  { label: 'Education & Awareness',  icon: GraduationCap  },
  { label: 'Student Safety',         icon: GraduationCap  },
  { label: 'Digital India',          icon: Flag           },
];

const categoryBadge: Record<string, { bg: string; text: string; border: string }> = {
  'CERT-In Updates':        { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'Government Advisories':  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Cyber Crime Reports':    { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' },
  'Banking Security':       { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  'UPI & Digital Payments': { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe' },
  'Education & Awareness':  { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0' },
  'Student Safety':         { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff' },
  'Digital India':          { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
};

const indiaNews = [
  { headline: 'CERT-In Releases Advisory On Critical Vulnerabilities In Popular VPN Software Used By Indian Enterprises', summary: 'The advisory highlights multiple remote code execution vulnerabilities affecting enterprise VPN deployments across government and private sector organizations.', date: 'June 8, 2026', category: 'CERT-In Updates' as IndiaCategory, source: 'CERT-In' },
  { headline: 'Ministry Of Home Affairs Launches Nationwide Cyber Awareness Campaign Targeting Rural Communities', summary: 'The initiative aims to educate 50 million citizens in rural areas about online fraud, UPI scams, and digital safety through community workshops.', date: 'June 7, 2026', category: 'Government Advisories' as IndiaCategory, source: 'MHA' },
  { headline: 'Mumbai Cyber Cell Arrests Five Members Of International UPI Fraud Ring Operating Across Three States', summary: 'The syndicate allegedly defrauded over 2,000 victims using fake payment screenshots and social engineering tactics totaling Rs. 4.5 crore.', date: 'June 6, 2026', category: 'Cyber Crime Reports' as IndiaCategory, source: 'Mumbai Police' },
  { headline: 'Reserve Bank Updates Security Framework For Cooperative Banks Following Rising Cyber Incidents', summary: 'New guidelines mandate real-time transaction monitoring, customer authentication enhancements, and mandatory incident reporting within 4 hours.', date: 'June 5, 2026', category: 'Banking Security' as IndiaCategory, source: 'RBI' },
  { headline: 'PhonePe And Google Pay Implement AI-Based Fraud Detection Reducing UPI Scam Reports By 40%', summary: 'Machine learning models now analyze transaction patterns in real-time, flagging suspicious activity before completion and alerting users instantly.', date: 'June 4, 2026', category: 'UPI & Digital Payments' as IndiaCategory, source: 'NPCI' },
  { headline: 'CBSE Integrates Cyber Safety Curriculum Into Class 9-12 Computer Science Syllabus For 2026-27', summary: 'Students will learn about digital hygiene, online privacy, social engineering awareness, and responsible social media usage as part of mandatory coursework.', date: 'June 3, 2026', category: 'Student Safety' as IndiaCategory, source: 'CBSE' },
];

// ─── GLOBAL ──────────────────────────────────────────────

const regions = [
  { name: 'North America', active: 12 },
  { name: 'Europe',        active: 8  },
  { name: 'Asia Pacific',  active: 15 },
  { name: 'Middle East',   active: 5  },
  { name: 'Africa',        active: 3  },
  { name: 'South America', active: 4  },
];

const globalNews = [
  { headline: 'FBI And Europol Jointly Dismantle BlackCat Ransomware Infrastructure In Largest Coordinated Takedown', summary: 'Operation seized servers across 7 countries, rescued decryption keys for over 500 victims, and arrested key operators of the ALPHV/BlackCat platform.', date: 'June 8, 2026', category: 'Ransomware', icon: ShieldOff, region: 'Global', severity: 'critical' as const },
  { headline: 'Massive Data Breach At European Healthcare Provider Exposes Records Of 14 Million Patients', summary: 'Attackers exploited an unpatched VPN vulnerability to access medical databases containing sensitive patient information spanning six years of records.', date: 'June 7, 2026', category: 'Data Breach', icon: Server, region: 'Europe', severity: 'high' as const },
  { headline: 'CISA Warns Of Active Exploitation Of Critical Chrome Zero-Day Affecting Billions Of Users', summary: 'The vulnerability allows remote code execution through specially crafted web content. Adoption of emergency patches remains below 60% globally.', date: 'June 6, 2026', category: 'Zero-Day', icon: Bug, region: 'Global', severity: 'critical' as const },
  { headline: 'NATO Establishes Dedicated Cyber Operations Center Amid Rising State-Sponsored Digital Attacks', summary: 'The new center will coordinate defensive and offensive cyber capabilities across 32 member nations, with initial capability expected by Q4 2026.', date: 'June 5, 2026', category: 'Cyber Warfare', icon: Swords, region: 'Global', severity: 'high' as const },
  { headline: 'OpenAI And Anthropic Partner On AI Safety Standards To Prevent LLM Misuse In Cyber Attacks', summary: 'Joint framework establishes guardrails against prompt injection, automated phishing, and code generation for malware.', date: 'June 4, 2026', category: 'AI Security', icon: Brain, region: 'North America', severity: 'medium' as const },
  { headline: 'AWS And Azure Report Simultaneous Cloud Infrastructure Attacks Targeting Government Client Workloads', summary: 'Coordinated attack campaign leveraged stolen API credentials to attempt access to classified government cloud environments across both major providers.', date: 'June 3, 2026', category: 'Cloud Security', icon: Cloud, region: 'Global', severity: 'critical' as const },
];

const severityMap = {
  critical: { bg: '#fff1f2', text: '#be123c', border: '#fecdd3', dot: '#e11d48' },
  high:     { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', dot: '#f97316' },
  medium:   { bg: '#fffbeb', text: '#92400e', border: '#fde68a', dot: '#f59e0b' },
  low:      { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', dot: '#22c55e' },
};

// ─── COMPONENT ───────────────────────────────────────────

type Tab = 'india' | 'global';

export default function CyberNewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [tab, setTab] = useState<Tab>('india');
  const [indiaCategory, setIndiaCategory] = useState<IndiaCategory>('All');

  const filteredIndia = indiaCategory === 'All'
    ? indiaNews
    : indiaNews.filter(n => n.category === indiaCategory);

  return (
    <section
      id="news"
      ref={ref}
      style={{ background: '#f0f2f8', fontFamily: 'var(--font-body)', padding: 'clamp(48px, 7vw, 46px) 36px' }}
    >
      <div style={{margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.42 }}
              style={{ marginBottom: '12px' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.8)', border: '1px solid #c7d2fe',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#4338ca',
              }}>
                Cyber News Center
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 'clamp(26px, 5vw, 42px)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: '#0d1117', lineHeight: 1, margin: 0,
              }}
            >
              {tab === 'india' ? (
                <>India <span style={{ color: 'transparent', WebkitTextStroke: '2px #4338ca' }}>Cyber News</span></>
              ) : (
                <>Global <span style={{ color: 'transparent', WebkitTextStroke: '2px #1d4ed8' }}>Cyber News</span></>
              )}
            </motion.h2>
          </div>

          {/* ── Tab switcher ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              padding: '4px',
              gap: '4px',
            }}
          >
            {([
              { id: 'india',  label: 'India',  Icon: IndianRupee, activeGrad: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', activeShadow: 'rgba(79,70,229,.28)' },
              { id: 'global', label: 'Global', Icon: Globe2,       activeGrad: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)', activeShadow: 'rgba(29,78,216,.28)' },
            ] as const).map(t => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3.5vw, 22px)',
                    borderRadius: '10px',
                    fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 700,
                    fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all .22s',
                    border: 'none',
                    background: active ? t.activeGrad : 'transparent',
                    color: active ? '#fff' : '#475569',
                    boxShadow: active ? `0 4px 14px ${t.activeShadow}` : 'none',
                  }}
                >
                  <t.Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">

          {/* ─── INDIA TAB ─── */}
          {tab === 'india' && (
            <motion.div
              key="india"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
            >
              {/* Category filters */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {indiaCategories.map(cat => {
                  const active = indiaCategory === cat.label;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setIndiaCategory(cat.label)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '7px 13px', borderRadius: '10px',
                        fontSize: 'clamp(10px, 2.3vw, 11.5px)', fontWeight: 600,
                        fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all .18s',
                        background: active ? 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)' : 'rgba(255,255,255,0.85)',
                        color: active ? '#fff' : '#475569',
                        border: active ? '1px solid transparent' : '1px solid #e2e8f0',
                        boxShadow: active ? '0 4px 14px rgba(79,70,229,.28)' : 'none',
                      }}
                    >
                      <cat.icon size={11} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
                <Building2 size={14} color="#4338ca" />
                <span style={{ fontWeight: 500 }}>Sadaiv Yuva Intelligence Desk</span>
              </div>

              {/* Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {filteredIndia.map((item, i) => {
                  const bc = categoryBadge[item.category] ?? { bg: '#eef2ff', text: '#4338ca', border: '#c7d2fe' };
                  return (
                    <motion.article
                      key={item.headline}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <div style={{
                        background: '#fff', borderRadius: '16px',
                        border: '1px solid #e2e8f0', padding: '20px 22px',
                        height: '100%', display: 'flex', flexDirection: 'column', gap: '10px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '999px',
                            fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
                            textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                            background: bc.bg, color: bc.text, border: `1px solid ${bc.border}`,
                          }}>
                            {item.category}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.date}</span>
                        </div>
                        <h3 style={{
                          fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 700,
                          color: '#0d1117', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0,
                        }}>
                          {item.headline}
                        </h3>
                        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.75, margin: 0, flex: 1 }}>
                          {item.summary}
                        </p>
                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          paddingTop: '10px', borderTop: '1px solid #f1f5f9',
                        }}>
                          <span style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94a3b8' }}>
                            {item.source}
                          </span>
                          <button style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            fontSize: '12px', fontWeight: 600, color: '#4338ca',
                            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: 0,
                          }}>
                            Read More <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ─── GLOBAL TAB ─── */}
          {tab === 'global' && (
            <motion.div
              key="global"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
            >
              {/* Region strip + attribution */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: '#64748b' }}>
                  <Globe2 size={14} color="#2563eb" />
                  <span style={{ fontWeight: 500 }}>47 active incidents tracked globally</span>
                </div>
              </div>

              {/* Region indicators */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '8px', marginBottom: '28px',
              }}>
                {regions.map(r => (
                  <div
                    key={r.name}
                    style={{
                      background: 'rgba(255,255,255,0.85)', borderRadius: '12px',
                      border: '1px solid #e2e8f0', padding: '10px 8px', textAlign: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '3px' }}>
                      <MapPin size={10} color="#2563eb" />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 700, color: '#0d1117' }}>{r.active}</span>
                    </div>
                    <span style={{ fontSize: '9.5px', color: '#94a3b8', fontWeight: 500 }}>{r.name}</span>
                  </div>
                ))}
              </div>

              {/* Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {globalNews.map((item, i) => {
                  const sev = severityMap[item.severity];
                  return (
                    <motion.article
                      key={item.headline}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                    >
                      <div style={{
                        background: '#fff', borderRadius: '16px',
                        border: '1px solid #e2e8f0', padding: '20px 22px',
                        height: '100%', display: 'flex', flexDirection: 'column', gap: '10px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '32px', height: '32px', borderRadius: '9px',
                              background: sev.bg, border: `1px solid ${sev.border}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <item.icon size={15} color={sev.text} />
                            </div>
                            <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#94a3b8' }}>
                              {item.category}
                            </span>
                          </div>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '3px 10px', borderRadius: '999px',
                            background: sev.bg, border: `1px solid ${sev.border}`,
                          }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: sev.dot }} />
                            <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: sev.text }}>
                              {item.severity}
                            </span>
                          </div>
                        </div>

                        <h3 style={{
                          fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 700,
                          color: '#0d1117', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0,
                        }}>
                          {item.headline}
                        </h3>

                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.75, margin: 0, flex: 1 }}>
                          {item.summary}
                        </p>

                        <div style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          paddingTop: '10px', borderTop: '1px solid #f1f5f9',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#94a3b8' }}>
                            <MapPin size={10} />{item.region}
                            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }} />
                            {item.date}
                          </div>
                          <button style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            fontSize: '12px', fontWeight: 600, color: '#2563eb',
                            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: 0,
                          }}>
                            Details <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
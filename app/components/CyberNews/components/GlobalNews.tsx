import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe2, Bug, Server, Cloud, Brain, ShieldOff, Swords, ArrowRight, MapPin,
} from 'lucide-react';

const SG = "'Space Grotesk', sans-serif";
const MR = "'Manrope', sans-serif";

const regions = [
  { name: 'North America', active: 12 },
  { name: 'Europe',        active: 8  },
  { name: 'Asia Pacific',  active: 15 },
  { name: 'Middle East',   active: 5  },
  { name: 'Africa',        active: 3  },
  { name: 'South America', active: 4  },
];

const globalNews = [
  { headline: 'FBI And Europol Jointly Dismantle BlackCat Ransomware Infrastructure In Largest Coordinated Takedown', summary: 'Operation seized servers across 7 countries, rescued decryption keys for over 500 victims, and arrested key operators of the ALPHV/BlackCat ransomware-as-a-service platform.', date: 'June 8, 2026', category: 'Ransomware', icon: ShieldOff, region: 'Global', severity: 'critical' as const },
  { headline: 'Massive Data Breach At European Healthcare Provider Exposes Records Of 14 Million Patients', summary: 'Attackers exploited an unpatched VPN vulnerability to access medical databases containing sensitive patient information spanning six years of records.', date: 'June 7, 2026', category: 'Data Breach', icon: Server, region: 'Europe', severity: 'high' as const },
  { headline: 'CISA Warns Of Active Exploitation Of Critical Chrome Zero-Day Affecting Billions Of Users', summary: 'The vulnerability allows remote code execution through specially crafted web content. Google has released emergency patches, but adoption remains below 60% globally.', date: 'June 6, 2026', category: 'Zero-Day', icon: Bug, region: 'Global', severity: 'critical' as const },
  { headline: 'NATO Establishes Dedicated Cyber Operations Center Amid Rising State-Sponsored Digital Attacks', summary: 'The new center will coordinate defensive and offensive cyber capabilities across 32 member nations, with initial operational capability expected by Q4 2026.', date: 'June 5, 2026', category: 'Cyber Warfare', icon: Swords, region: 'Global', severity: 'high' as const },
  { headline: 'OpenAI And Anthropic Partner On AI Safety Standards To Prevent LLM Misuse In Cyber Attacks', summary: 'Joint framework establishes guardrails against prompt injection, automated phishing, and code generation for malware. Industry adoption expected within 90 days.', date: 'June 4, 2026', category: 'AI Security', icon: Brain, region: 'North America', severity: 'medium' as const },
  { headline: 'AWS And Azure Report Simultaneous Cloud Infrastructure Attacks Targeting Government Client Workloads', summary: 'Coordinated attack campaign leveraged stolen API credentials to attempt access to classified government cloud environments across both major providers.', date: 'June 3, 2026', category: 'Cloud Security', icon: Cloud, region: 'Global', severity: 'critical' as const },
];

const severityMap = {
  critical: { bg: '#fff1f2', text: '#be123c', border: '#fecdd3', dot: '#e11d48', iconBg: '#fff1f2' },
  high:     { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', dot: '#f97316', iconBg: '#fff7ed' },
  medium:   { bg: '#fffbeb', text: '#92400e', border: '#fde68a', dot: '#f59e0b', iconBg: '#fffbeb' },
  low:      { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', dot: '#22c55e', iconBg: '#f0fdf4' },
};

export default function GlobalNews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="global-news"
      ref={ref}
      style={{ background: '#fff', fontFamily: MR, padding: 'clamp(48px, 7vw, 96px) 24px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '36px' }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.42 }}
              style={{ marginBottom: '14px' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', borderRadius: '999px',
                background: '#eff6ff', border: '1px solid #bfdbfe',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#1d4ed8', fontFamily: MR,
              }}>
                Global Intelligence
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: SG, fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: '#0d1117', lineHeight: 1, margin: 0,
              }}
            >
              Global{' '}
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #1d4ed8' }}>
                Cyber News
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#64748b' }}
          >
            <Globe2 size={16} color="#2563eb" />
            <span style={{ fontWeight: 500 }}>47 active incidents tracked globally</span>
          </motion.div>
        </div>

        {/* Region indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '10px', marginBottom: '40px',
          }}
        >
          {regions.map(r => (
            <div
              key={r.name}
              style={{
                background: '#f8faff', borderRadius: '12px',
                border: '1px solid #e2e8f0', padding: '12px 10px',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '4px' }}>
                <MapPin size={11} color="#2563eb" />
                <span style={{ fontFamily: SG, fontSize: '15px', fontWeight: 700, color: '#0d1117' }}>{r.active}</span>
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{r.name}</span>
            </div>
          ))}
        </motion.div>

        {/* News grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '18px',
        }}>
          {globalNews.map((item, i) => {
            const sev = severityMap[item.severity];
            return (
              <motion.article
                key={item.headline}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              >
                <div style={{
                  background: '#fff', borderRadius: '16px',
                  border: '1px solid #e2e8f0', padding: '20px 22px',
                  height: '100%', display: 'flex', flexDirection: 'column', gap: '10px',
                  transition: 'box-shadow .2s',
                }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '10px',
                        background: sev.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${sev.border}`,
                      }}>
                        <item.icon size={16} color={sev.text} />
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#94a3b8' }}>
                        {item.category}
                      </span>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 10px', borderRadius: '999px',
                      background: sev.bg, border: `1px solid ${sev.border}`,
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: sev.dot }} />
                      <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: sev.text }}>
                        {item.severity}
                      </span>
                    </div>
                  </div>

                  <h3 style={{
                    fontFamily: SG, fontSize: '14px', fontWeight: 700,
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8' }}>
                      <MapPin size={11} />
                      {item.region}
                      <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }} />
                      {item.date}
                    </div>
                    <button style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      fontSize: '12px', fontWeight: 600, color: '#2563eb',
                      background: 'none', border: 'none', cursor: 'pointer', fontFamily: MR, padding: 0,
                    }}>
                      Details <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
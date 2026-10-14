import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Bug, ShieldAlert, Zap, ChevronRight } from 'lucide-react';

const SG = "'Space Grotesk', sans-serif";
const MR = "'Manrope', sans-serif";

type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

const severityConfig: Record<SeverityLevel, { bg: string; text: string; border: string; dot: string }> = {
  Low:      { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', dot: '#22c55e' },
  Medium:   { bg: '#fffbeb', text: '#92400e', border: '#fde68a', dot: '#f59e0b' },
  High:     { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', dot: '#f97316' },
  Critical: { bg: '#fff1f2', text: '#be123c', border: '#fecdd3', dot: '#e11d48' },
};

const sectionAccent: Record<string, { pillBg: string; pillText: string; pillBorder: string; iconBg: string; iconColor: string }> = {
  'Trending Threats':       { pillBg: '#eef2ff', pillText: '#4338ca', pillBorder: '#c7d2fe', iconBg: '#eef2ff', iconColor: '#4338ca' },
  'Emerging Threats':       { pillBg: '#eff6ff', pillText: '#1d4ed8', pillBorder: '#bfdbfe', iconBg: '#eff6ff', iconColor: '#1d4ed8' },
  'Critical Vulnerabilities': { pillBg: '#fff1f2', pillText: '#be123c', pillBorder: '#fecdd3', iconBg: '#fff1f2', iconColor: '#be123c' },
  'Security Advisories':    { pillBg: '#fffbeb', pillText: '#92400e', pillBorder: '#fde68a', iconBg: '#fffbeb', iconColor: '#d97706' },
};

interface ThreatItem { title: string; description: string; severity: SeverityLevel; category: string; timestamp: string; }

const trendingThreats: ThreatItem[] = [
  { title: 'AI-Generated Phishing Campaigns Targeting Banking Sector', description: 'Threat actors are using generative AI to create highly convincing phishing emails that bypass traditional email security filters with a 73% click-through rate.', severity: 'Critical', category: 'Trending', timestamp: '2 hours ago' },
  { title: 'New RAT Malware Disguised As Legitimate Software Updates', description: 'Remote Access Trojan distributed through fake browser and OS update notifications, granting full system control to attackers.', severity: 'High', category: 'Trending', timestamp: '4 hours ago' },
  { title: 'Supply Chain Attack Via Compromised NPM Package', description: 'Popular JavaScript library with 2M weekly downloads found injecting malicious code that steals environment variables and API keys.', severity: 'Critical', category: 'Emerging', timestamp: '6 hours ago' },
];
const emergingThreats: ThreatItem[] = [
  { title: 'Deepfake Voice Authentication Bypass Emerging', description: 'New attack method clones executive voices to bypass voice-based authentication systems in enterprise environments.', severity: 'High', category: 'Emerging', timestamp: '1 day ago' },
  { title: 'QR Code Phishing (Quishing) On The Rise', description: 'Malicious QR codes embedded in emails and physical posters redirect users to credential harvesting sites.', severity: 'Medium', category: 'Emerging', timestamp: '1 day ago' },
];
const criticalVulns: ThreatItem[] = [
  { title: 'CVE-2026-4137: Critical RCE in Enterprise VPN Platform', description: 'Remote code execution vulnerability with CVSS 9.8 affecting all versions prior to 12.4. Active exploitation detected.', severity: 'Critical', category: 'Vulnerability', timestamp: '12 hours ago' },
  { title: 'CVE-2026-3991: Authentication Bypass in Cloud Management Console', description: 'Allows unauthorized admin access to cloud infrastructure management panels. Patch available but adoption at 35%.', severity: 'Critical', category: 'Vulnerability', timestamp: '1 day ago' },
  { title: 'CVE-2026-4260: Privilege Escalation in Popular Linux Distribution', description: 'Local privilege escalation vulnerability affecting kernel versions 5.15-6.8. Exploit code publicly available.', severity: 'High', category: 'Vulnerability', timestamp: '2 days ago' },
];
const advisories: ThreatItem[] = [
  { title: 'CERT-In Advisory CI-2026-0418: Secure Your IoT Devices', description: 'Mandatory security configurations for IoT devices in critical infrastructure. Compliance deadline: July 15, 2026.', severity: 'High', category: 'Advisory', timestamp: '3 days ago' },
  { title: 'NIST SP 800-63D Updated Digital Identity Guidelines', description: 'Revised authentication assurance levels and new requirements for biometric-based identity verification systems.', severity: 'Medium', category: 'Advisory', timestamp: '5 days ago' },
];

const sections = [
  { title: 'Trending Threats',         icon: TrendingUp, items: trendingThreats },
  { title: 'Emerging Threats',         icon: Zap,         items: emergingThreats },
  { title: 'Critical Vulnerabilities', icon: Bug,         items: criticalVulns },
  { title: 'Security Advisories',      icon: ShieldAlert, items: advisories },
];

export default function ThreatIntelligence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="threat-intel"
      ref={ref}
      style={{ background: '#f0f2f8', fontFamily: 'var(--font-body)', padding: 'clamp(48px, 7vw, 66px) 36px' }}
    >
      <div style={{margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42 }}
          style={{ marginBottom: '14px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: '#fff1f2', border: '1px solid #fecdd3',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#be123c', fontFamily: 'var(--font-body)',
          }}>
            Threat Intelligence
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
          Threat{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #4338ca' }}>
            Intelligence Center
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.75, maxWidth: '520px', marginBottom: '36px' }}
        >
          Real-time threat monitoring, vulnerability tracking, and security advisory updates.
        </motion.p>

        {/* Severity legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}
        >
          {(Object.entries(severityConfig) as [SeverityLevel, typeof severityConfig[SeverityLevel]][]).map(([level, cfg]) => (
            <div
              key={level}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '7px 14px', borderRadius: '10px',
                background: cfg.bg, border: `1px solid ${cfg.border}`,
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cfg.dot }} />
              <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: cfg.text, fontFamily: 'var(--font-body)' }}>
                {level}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
          {sections.map((section, si) => {
            const ac = sectionAccent[section.title];
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + si * 0.12 }}
              >
                {/* Section header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '11px',
                    background: ac.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${ac.pillBorder}`,
                  }}>
                    <section.icon size={18} color={ac.iconColor} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '18px', fontWeight: 700, color: '#0d1117', letterSpacing: '-0.02em', margin: 0 }}>
                    {section.title}
                  </h3>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                </div>

                {/* Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                }}>
                  {section.items.map((item, i) => {
                    const sev = severityConfig[item.severity];
                    return (
                      <div
                        key={i}
                        style={{
                          background: '#fff', borderRadius: '14px',
                          border: `1px solid ${sev.border}`,
                          padding: '18px 20px',
                          display: 'flex', flexDirection: 'column', gap: '9px',
                          transition: 'box-shadow .2s',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            padding: '2px 9px', borderRadius: '999px',
                            fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em',
                            textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                            background: ac.pillBg, color: ac.pillText, border: `1px solid ${ac.pillBorder}`,
                          }}>
                            {item.category}
                          </span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: sev.dot }} />
                            <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: sev.text }}>
                              {item.severity}
                            </span>
                          </div>
                        </div>

                        <h4 style={{
                          fontFamily: 'var(--font-ui)', fontSize: '13.5px', fontWeight: 700,
                          color: '#0d1117', lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0,
                        }}>
                          {item.title}
                        </h4>

                        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
                          {item.description}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px' }}>
                          <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>{item.timestamp}</span>
                          <button style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '12px', fontWeight: 600, color: '#4338ca',
                            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: 0,
                          }}>
                            Details <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
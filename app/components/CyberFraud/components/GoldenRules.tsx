'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ShieldCheck, Link, KeyRound, Smartphone, RefreshCw,
  ShieldOff, Wifi, Receipt, HardDrive, Flag,
} from 'lucide-react';

const rules = [
  { number: '01', icon: ShieldCheck, title: 'Never Share OTP', desc: 'Your OTP is the last line of defense. No bank, company, or government agency will ever ask for it. Sharing it means handing over access to your accounts.', gradient: 'from-emerald-400 to-emerald-600' },
  { number: '02', icon: Link, title: 'Verify Links Before Clicking', desc: 'Hover over links to preview the URL. Look for misspellings, extra characters, or unusual domains. When in doubt, navigate directly to the website instead.', gradient: 'from-teal-400 to-teal-600' },
  { number: '03', icon: KeyRound, title: 'Use Strong Passwords', desc: 'Combine uppercase, lowercase, numbers, and symbols. Use at least 12 characters. Consider a passphrase: a memorable sentence is stronger than a random string.', gradient: 'from-cyan-400 to-cyan-600' },
  { number: '04', icon: Smartphone, title: 'Enable Two-Factor Authentication', desc: '2FA adds a second verification step. Even if your password is compromised, attackers cannot access your account without the second factor.', gradient: 'from-emerald-500 to-teal-500' },
  { number: '05', icon: RefreshCw, title: 'Keep Software Updated', desc: 'Updates patch security vulnerabilities that attackers exploit. Enable automatic updates for your OS, browser, and apps. Outdated software is an open door.', gradient: 'from-teal-500 to-cyan-500' },
  { number: '06', icon: ShieldOff, title: 'Avoid Suspicious Downloads', desc: 'Download only from official stores and verified sources. Pirated software, cracked apps, and unknown attachments often carry malware hidden inside.', gradient: 'from-cyan-500 to-blue-500' },
  { number: '07', icon: Wifi, title: 'Use Secure WiFi', desc: 'Public WiFi is a goldmine for attackers. Avoid accessing banking or sensitive accounts on shared networks. Use a VPN if you must connect publicly.', gradient: 'from-emerald-600 to-emerald-400' },
  { number: '08', icon: Receipt, title: 'Monitor Financial Transactions', desc: 'Check bank and card statements regularly. Set up transaction alerts. Early detection of unauthorized activity can prevent major financial loss.', gradient: 'from-teal-600 to-teal-400' },
  { number: '09', icon: HardDrive, title: 'Backup Important Data', desc: 'Follow the 3-2-1 rule: 3 copies, 2 different media, 1 offsite. Ransomware becomes powerless when you have clean backups of your critical files.', gradient: 'from-cyan-600 to-cyan-400' },
  { number: '10', icon: Flag, title: 'Report Suspicious Activities', desc: 'Reporting helps authorities track patterns and protect others. Call 1930 for cyber crime complaints in India, or visit the National Cyber Crime Portal.', gradient: 'from-emerald-500 to-cyan-500' },
];

function RuleCard({
  rule,
  scrollYProgress,
  index,
  total,
}: {
  rule: (typeof rules)[number];
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const segmentSize = end - start;
  const p1 = start + segmentSize * 0.05;
  const p2 = end - segmentSize * 0.05;

  const opacity = useTransform(scrollYProgress, [start, p1, p2, end], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [start, p1, p2, end], [0.95, 1, 1, 0.98]);
  const y = useTransform(scrollYProgress, [start, p1, p2, end], [30, 0, 0, -10]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="min-h-[60vh] flex items-center py-8"
    >
      <div className="w-full rounded-3xl glass-strong p-8 sm:p-12 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
          <div className="flex items-center gap-4 sm:flex-col sm:items-center">
            <span
              className="text-6xl sm:text-8xl font-extrabold text-gradient-emerald opacity-20 leading-none"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {rule.number}
            </span>
            <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${rule.gradient} flex items-center justify-center shadow-xl`}>
              <rule.icon className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {rule.title}
            </h3>
            <p
              className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {rule.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GoldenRules() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="golden-rules" ref={containerRef} className="relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-mint-50 to-white pointer-events-none" />

      <div className="sticky top-16 sm:top-20 z-20 pt-8 pb-4 bg-white/80 backdrop-blur-xl border-b border-emerald-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Section 06
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            10 Golden Rules of{' '}
            <span className="text-gradient-emerald">Online Safety</span>
          </h2>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {rules.map((rule, i) => (
          <RuleCard
            key={rule.number}
            rule={rule}
            scrollYProgress={scrollYProgress}
            index={i}
            total={rules.length}
          />
        ))}
      </div>
    </section>
  );
}
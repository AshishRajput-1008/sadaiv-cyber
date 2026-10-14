'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const labs = [
  { id: 'phishing', title: 'Phishing Detection', icon: '🎣', desc: 'Identify real vs fake emails using header analysis, link inspection, and sender verification.', color: '#2563EB' },
  { id: 'forensics', title: 'Digital Forensics', icon: '🔍', desc: 'Recover deleted files, analyse disk images, and build incident timelines using open-source tools.', color: '#059669' },
  { id: 'soc', title: 'SOC Monitoring', icon: '🛡️', desc: 'Monitor SIEM dashboards, triage alerts, and escalate genuine incidents within a simulated SOC.', color: '#F59E0B' },
  { id: 'pentest', title: 'Penetration Testing', icon: '⚔️', desc: 'Conduct scoped ethical hacking exercises against vulnerable VMs using Kali Linux toolkits.', color: '#2563EB' },
  { id: 'ctf', title: 'Capture The Flag', icon: '🚩', desc: 'Competitive challenges spanning web exploitation, cryptography, reversing, and OSINT.', color: '#059669' },
  { id: 'malware', title: 'Malware Analysis', icon: '🦠', desc: 'Safely detonate samples in sandboxes, analyse behaviour, and write detection signatures.', color: '#F59E0B' },
];

const terminalLines = [
  '$ nmap -sV -O 192.168.1.0/24',
  'Starting Nmap 7.94 ...',
  'Discovered open port 22/tcp on 192.168.1.105',
  'Discovered open port 80/tcp on 192.168.1.105',
  '$ dirb http://192.168.1.105/',
  '+ http://192.168.1.105/admin (CODE:200)',
  '+ http://192.168.1.105/login (CODE:200)',
  '$ sqlmap -u "http://target/login" --dbs',
  '[INFO] testing connection to target...',
  '[INFO] the back-end DBMS is MySQL',
  '[SUCCESS] Database: users, products, logs',
];

function Terminal() {
  const [visible, setVisible] = useState(5);
  return (
    <div className="bg-[#020817] rounded-none p-5 font-mono text-xs h-48 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        {['#FF5F56','#FFBD2E','#27C93F'].map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
        <span className="text-[#64748B] text-[9px] ml-2 tracking-wide">lab-session-kali@syf</span>
      </div>
      {terminalLines.slice(0, visible).map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
          className={line.startsWith('$') ? 'text-[#86efac]' : line.startsWith('[SUCCESS]') ? 'text-[#34d399]' : line.startsWith('[INFO]') ? 'text-[#93C5FD]' : 'text-[#94A3B8]'}>
          {line}
        </motion.div>
      ))}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-[#86efac]">█</motion.span>
    </div>
  );
}

export default function LiveCyberLab() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activelab, setActiveLab] = useState('phishing');
  const active = labs.find(l => l.id === activelab)!;

  return (
    <section ref={ref} className="py-28 bg-[#020817] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>🔬 Live Lab Environment</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Learn by doing.<br /><span className="text-white/30 italic font-light">In a safe environment.</span>
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Lab selector */}
        <div className="w-full lg:w-[35%]">
          <p className="text-[10px] tracking-widest uppercase text-[#64748B] mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Select Lab Module</p>
          <div className="space-y-0">
            {labs.map((lab, i) => (
              <motion.button key={lab.id} initial={{ opacity: 0, x: -15 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.07 }}
                onClick={() => setActiveLab(lab.id)}
                className={`w-full text-left flex items-center gap-4 py-4 px-4 border-l-2 transition-all ${activelab === lab.id ? 'border-l-[' + lab.color + '] bg-white/[0.04]' : 'border-l-transparent hover:border-l-white/20 hover:bg-white/[0.02]'}`}
                style={{ borderLeftColor: activelab === lab.id ? lab.color : 'transparent' }}>
                <span className="text-xl">{lab.icon}</span>
                <div>
                  <p className={`font-semibold text-sm ${activelab === lab.id ? 'text-white' : 'text-[#94A3B8]'}`} style={{ fontFamily: 'var(--font-heading)' }}>{lab.title}</p>
                </div>
                {activelab === lab.id && <span className="ml-auto text-xs" style={{ color: lab.color, fontFamily: 'var(--font-mono)' }}>Active →</span>}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lab preview */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
          className="w-full lg:w-[65%] space-y-4">
          {/* Lab header */}
          <div className="bg-[#0a1628] border border-white/[0.08] p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-2xl mr-3">{active.icon}</span>
                <span className="text-[9px] tracking-widest px-2.5 py-1 text-white" style={{ background: active.color, fontFamily: 'var(--font-mono)' }}>LIVE LAB</span>
              </div>
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{active.title}</h3>
            <p className="text-[#94A3B8] text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{active.desc}</p>
          </div>

          {/* Terminal */}
          <Terminal />

          {/* Lab image */}
          <div className="relative h-52 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop" alt="Lab Environment" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>Workshop participants working in isolated lab environments.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

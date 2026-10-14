import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Fish, Lock, UserX, Brain, Eye, Scale } from 'lucide-react';

const insights = [
  { icon: Fish, title: 'Why Phishing Succeeds', insight: 'Phishing exploits urgency and trust. Attackers craft messages that trigger panic — "Your account will be locked!" — bypassing rational thinking. The human brain under stress makes faster, less accurate decisions.', gradient: 'from-emerald-400 to-teal-500', tag: 'Psychology' },
  { icon: Lock, title: 'Why Ransomware Is Growing', insight: 'Ransomware-as-a-Service has lowered the barrier to entry. Attackers no longer need technical skills — they rent malware, target weak infrastructure, and collect payments in cryptocurrency that is nearly untraceable.', gradient: 'from-teal-400 to-cyan-500', tag: 'Trend' },
  { icon: UserX, title: 'Identity Theft Risks', insight: 'With over 4 billion records exposed in breaches, your personal data is already out there. Identity thieves combine fragments from multiple breaches to build complete profiles for fraud.', gradient: 'from-cyan-400 to-blue-500', tag: 'Risk' },
  { icon: Brain, title: 'Social Engineering Psychology', insight: 'Social engineers exploit three principles: authority (pretending to be a manager), scarcity (limited-time offer), and social proof ("everyone is doing this"). These bypass our security instincts.', gradient: 'from-amber-400 to-orange-500', tag: 'Psychology' },
  { icon: Eye, title: 'Digital Privacy Importance', insight: 'Every click, search, and purchase creates a digital footprint. Aggregated data reveals patterns about your health, finances, and relationships. Protecting privacy is protecting autonomy.', gradient: 'from-orange-400 to-red-500', tag: 'Privacy' },
  { icon: Scale, title: 'Cyber Law Awareness', insight: 'Most people do not know their digital rights. The IT Act 2000, IT Amendment 2008, and upcoming Digital Personal Data Protection Act provide legal recourse — but only if you know they exist.', gradient: 'from-emerald-500 to-emerald-700', tag: 'Legal' },
];

export default function ExpertInsights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section id="insights" ref={ref} className="relative section-padding bg-gradient-to-b from-mint-50 to-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-100/20 gradient-blob" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-100/20 gradient-blob" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Section 05
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Expert <span className="text-gradient-teal">Cyber Security</span>
          <br />Insights
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 text-lg max-w-2xl mx-auto mb-16"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Understanding the "why" behind cyber threats makes you harder to deceive.
        </motion.p>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              className="break-inside-avoid"
            >
              <div
                className={`p-6 rounded-3xl glass-strong shadow-lg transition-all duration-500 cursor-default ${
                  activeIdx === i ? 'shadow-2xl ring-1 ring-emerald-200/50 scale-[1.02]' : 'hover-lift'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md shrink-0`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 mb-1 block"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.tag}
                    </span>
                    <h3
                      className="font-bold text-gray-900 text-base leading-snug"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.insight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
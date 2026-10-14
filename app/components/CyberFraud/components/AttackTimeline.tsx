import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MessageSquare, MousePointerClick, FileWarning,
  ShieldOff, Banknote, Wrench,
} from 'lucide-react';

const stages = [
  { icon: MessageSquare, label: 'Victim Receives Message', desc: 'A phishing email or SMS arrives appearing legitimate', gradient: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50' },
  { icon: MousePointerClick, label: 'Victim Clicks Link', desc: 'Curiosity or urgency drives the victim to engage', gradient: 'from-teal-400 to-teal-600', bg: 'bg-teal-50' },
  { icon: FileWarning, label: 'Information Stolen', desc: 'Credentials, personal data, and financial info captured', gradient: 'from-cyan-400 to-cyan-600', bg: 'bg-cyan-50' },
  { icon: ShieldOff, label: 'Account Compromised', desc: 'Attacker gains full access and control', gradient: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
  { icon: Banknote, label: 'Financial Loss', desc: 'Unauthorized transactions and drained accounts', gradient: 'from-red-400 to-red-600', bg: 'bg-red-50' },
  { icon: Wrench, label: 'Recovery Process', desc: 'Reporting, securing accounts, and rebuilding safety', gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
];

export default function AttackTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="timeline" ref={ref} className="relative section-padding bg-white overflow-hidden">
      <div className="absolute top-20 left-1/3 w-72 h-72 rounded-full bg-emerald-100/25 gradient-blob" />
      <div className="absolute bottom-40 right-1/4 w-64 h-64 rounded-full bg-cyan-100/20 gradient-blob" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Section 04
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Real-World <span className="text-gradient-emerald">Cyber Attack</span>
          <br />Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 text-lg max-w-2xl mx-auto mb-20"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Follow the path of a typical cyber attack — from first contact to recovery.
        </motion.p>

        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-cyan-300 to-red-300 sm:-translate-x-0.5" />

          {stages.map((stage, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row`}
              >
                <div className={`ml-16 sm:ml-0 ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'} flex-1`}>
                  <div className={`p-5 sm:p-6 rounded-2xl ${stage.bg} border border-white/50 shadow-lg`}>
                    <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
                      <span
                        className="text-xs font-bold text-gray-400 tracking-wider"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        STEP {i + 1}
                      </span>
                    </div>
                    <h3
                      className="font-bold text-gray-900 text-lg mb-1"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {stage.label}
                    </h3>
                    <p
                      className="text-sm text-gray-500"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {stage.desc}
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-lg ring-4 ring-white`}
                  >
                    <stage.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                <div className="hidden sm:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
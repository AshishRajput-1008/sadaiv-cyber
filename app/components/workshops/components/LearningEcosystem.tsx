'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stages = [
  { num: '01', label: 'Learn', desc: 'Structured curriculum delivered by certified cybersecurity professionals with real-world experience.', icon: '📖', color: '#2563EB', bg: '#EFF6FF' },
  { num: '02', label: 'Practice', desc: 'Hands-on exercises, guided walkthroughs, and problem sets in a safe learning environment.', icon: '⚙️', color: '#059669', bg: '#ECFDF5' },
  { num: '03', label: 'Simulate', desc: 'Live attack-defense simulations, CTF challenges, and real breach scenario replays.', icon: '🛡️', color: '#F59E0B', bg: '#FFFBEB' },
  { num: '04', label: 'Defend', desc: 'Apply skills to protect real systems. Work through live case studies from Indian organisations.', icon: '🔐', color: '#2563EB', bg: '#EFF6FF' },
  { num: '05', label: 'Certify', desc: 'Receive industry-recognised certificates backed by SYF and aligned to global frameworks.', icon: '🏅', color: '#059669', bg: '#ECFDF5' },
  { num: '06', label: 'Community', desc: 'Join India\'s largest cybersecurity awareness community for continuous learning and peer support.', icon: '🌐', color: '#F59E0B', bg: '#FFFBEB' },
];

export default function LearningEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-28 bg-[#FAFAF8] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Our Approach</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          The Learning<br /><span className="text-[#2563EB]">Ecosystem</span>
        </h2>
      </motion.div>

      {/* 3D Journey — alternating staggered layout */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0F172A]/[0.08] hidden lg:block" />

        <div className="space-y-4 lg:space-y-0">
          {stages.map((stage, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={stage.label} initial={{ opacity: 0, x: isLeft ? -40 : 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row ${isLeft ? '' : 'lg:flex-row-reverse'} items-center lg:items-start gap-6 lg:gap-0 lg:mb-16`}>
                
                {/* Content panel */}
                <div className={`w-full lg:w-[45%] ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:flex-row-reverse lg:justify-start' : ''}`}>
                    <div className="w-12 h-12 rounded-none flex items-center justify-center text-xl flex-shrink-0" style={{ background: stage.bg }}>
                      {stage.icon}
                    </div>
                    <span className="text-[10px] tracking-[0.3em] text-[#94A3B8] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Stage {stage.num}</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0F172A] mb-3" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
                    <span style={{ color: stage.color }}>{stage.label}</span>
                  </h3>
                  <p className="text-[#475569] text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{stage.desc}</p>
                </div>

                {/* Centre dot */}
                <div className="hidden lg:flex w-[10%] justify-center items-center flex-shrink-0">
                  <motion.div whileInView={{ scale: [0, 1.2, 1] }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="w-5 h-5 rounded-full border-4 border-white shadow-lg relative z-10" style={{ background: stage.color }} />
                </div>

                <div className="hidden lg:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

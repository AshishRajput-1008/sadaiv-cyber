'use client';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: '01', icon: '📩', title: 'Receive Invite', desc: 'Get your personalised invitation with pre-reading materials and system requirements.', color: '#2563EB' },
  { num: '02', icon: '📊', title: 'Pre Assessment', desc: 'A 15-min diagnostic quiz to calibrate your starting point and customise your learning path.', color: '#059669' },
  { num: '03', icon: '🏫', title: 'Workshop', desc: 'Live instructor-led sessions combining theory, discussion, and real-world case walkthroughs.', color: '#F59E0B' },
  { num: '04', icon: '⚡', title: 'Hands-on Labs', desc: 'Isolated practice environments where you execute, break, and secure real systems.', color: '#2563EB' },
  { num: '05', icon: '🎯', title: 'Simulation', desc: 'Timed attack-defense scenarios tested against real threat actor tactics and techniques.', color: '#059669' },
  { num: '06', icon: '📝', title: 'Final Assessment', desc: 'Comprehensive evaluation testing both knowledge retention and practical skill application.', color: '#F59E0B' },
  { num: '07', icon: '🏅', title: 'Certification', desc: 'Receive your digitally verifiable certificate with QR code, LinkedIn-shareable badge, and learning hours.', color: '#2563EB' },
  { num: '08', icon: '🌐', title: 'Community Access', desc: 'Lifetime access to the SYF Cyber Community — mentors, job board, resources, and alumni network.', color: '#059669' },
];

export default function TrainingJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-28 bg-[#F5F7FA] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Your Journey</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          From registration<br />to recognition.
        </h2>
      </motion.div>

      {/* Timeline with staggered cards */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central line */}
        <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#059669] to-[#F59E0B] hidden md:block origin-top" />

        <div className="space-y-6 md:space-y-0">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={step.num} initial={{ opacity: 0, x: isLeft ? -30 : 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-0 md:mb-10 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Content panel */}
                <div className={`w-full md:w-[44%] bg-white p-6 border border-[#0F172A]/[0.07] ${isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-[10px] tracking-widest text-[#94A3B8] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Step {step.num}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: step.color }}>{step.title}</h4>
                  <p className="text-[#475569] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                </div>

                {/* Centre dot */}
                <div className="hidden md:flex w-[12%] justify-center items-center flex-shrink-0">
                  <motion.div whileInView={{ scale: [0, 1.3, 1] }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="w-6 h-6 rounded-full border-4 border-[#F5F7FA] shadow-md relative z-10 flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ background: step.color, fontFamily: 'var(--font-mono)' }}>
                    {step.num}
                  </motion.div>
                </div>
                <div className="hidden md:block w-[44%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

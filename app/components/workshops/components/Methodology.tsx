'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const methods = [
  { num: '01', title: 'Live Attack Simulations', example: 'Participants defend against a simulated ransomware campaign targeting their own mock organisation.', color: '#2563EB', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80&fit=crop' },
  { num: '02', title: 'Scenario-Based Learning', example: 'Each module begins with a real Indian cybercrime case study — participants reconstruct the attack chain.', color: '#059669', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80&fit=crop' },
  { num: '03', title: 'Certified Expert Trainers', example: 'Every session is led by certified professionals with active bug bounty or CERT-In experience.', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop' },
  { num: '04', title: 'Hands-on Labs', example: 'No passive slides. Every theory block is immediately followed by a guided practical exercise.', color: '#2563EB', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80&fit=crop' },
  { num: '05', title: 'Real Case Studies', example: '200+ documented Indian cyber incidents form the backbone of our curriculum, updated quarterly.', color: '#059669', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80&fit=crop' },
  { num: '06', title: 'Behaviour Change Focus', example: 'Post-workshop phishing test results show 89% reduction in click-through rates within 3 months.', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80&fit=crop' },
];

export default function Methodology() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="methodology" ref={ref} className="py-28 bg-[#FAFAF8] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Our Methodology</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          How we teach
          <br /><span className="italic font-light text-[#0F172A]/40">differently.</span>
        </h2>
      </motion.div>

      {/* Editorial storytelling layout — no two blocks the same */}
      <div className="space-y-0">
        {methods.map((m, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div key={m.num} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} border-b border-[#0F172A]/[0.07] group`}>
              
              {/* Image */}
              <div className="w-full md:w-[35%] h-60 md:h-auto relative overflow-hidden">
                <motion.img src={m.image} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'saturate(0.85)' }} />
                <div className="absolute top-5 left-5">
                  <span className="text-white font-black text-lg" style={{ fontFamily: 'var(--font-heading)', color: m.color }}>{m.num}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 py-10 px-0 ${isEven ? 'md:pl-12' : 'md:pr-12'} flex flex-col justify-center px-6`}>
                <div className="w-8 h-[2px] mb-5" style={{ background: m.color }} />
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>{m.title}</h3>
                <p className="text-[#475569] text-base leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)' }}>{m.example}</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                  <span className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>Real-world example from SYF workshops</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

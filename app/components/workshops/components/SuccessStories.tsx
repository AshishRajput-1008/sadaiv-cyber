'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stories = [
  {
    name: 'Kavita Patel', role: 'Software Engineer → Security Analyst', location: 'Pune',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80&fit=crop&crop=face',
    timeline: [
      { stage: 'Before', text: 'Worked as a developer. No formal security knowledge. Afraid to pivot careers.' },
      { stage: 'Workshop', text: 'Attended the 5-day Ethical Hacking Bootcamp. First CTF win.' },
      { stage: 'Skills Gained', text: 'OSCP certification, bug bounty payouts of ₹1.2L in first 3 months.' },
      { stage: 'Career Growth', text: 'Hired as Security Analyst at a Mumbai-based fintech. 60% salary increase.' },
      { stage: 'Community', text: 'Now mentors 12 junior participants in the SYF alumni network.' },
    ],
    color: '#2563EB',
  },
  {
    name: 'Constable Ravi Kumar', role: 'Police Officer → Cyber Cell Investigator', location: 'Indore',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=face',
    timeline: [
      { stage: 'Before', text: 'Regular beat constable. Received cyber complaints but couldn\'t investigate.' },
      { stage: 'Workshop', text: 'Completed the Law Enforcement Cyber Awareness program — 40 hrs.' },
      { stage: 'Skills Gained', text: 'Digital forensics basics, evidence preservation, social media OSINT.' },
      { stage: 'Career Growth', text: 'Transferred to MP Police Cyber Cell. Closed 23 online fraud cases in first year.' },
      { stage: 'Community', text: 'Conducts monthly cyber awareness drives in his district using SYF materials.' },
    ],
    color: '#059669',
  },
];

export default function SuccessStories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="stories" ref={ref} className="py-28 bg-[#0F172A] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#F59E0B] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Transformations</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          Real people.<br /><span className="italic text-white/30 font-light">Real change.</span>
        </h2>
      </motion.div>

      {stories.map((story, si) => (
        <motion.div key={story.name} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: si * 0.15 }}
          className="flex flex-col lg:flex-row gap-10 border-b border-white/[0.06] pb-16 mb-16 last:border-b-0 last:pb-0 last:mb-0">
          
          {/* Portrait */}
          <div className="w-full lg:w-[22%] flex-shrink-0">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={story.image} alt={story.name} className="w-full h-full object-cover object-top" style={{ filter: 'grayscale(20%)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent flex items-end p-5">
                <div>
                  <p className="text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{story.name}</p>
                  <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{story.location}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-white/[0.04] p-3 border-l-2" style={{ borderColor: story.color }}>
              <p className="text-white text-xs font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{story.role}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1">
            <div className="relative space-y-0">
              <div className="absolute left-3 top-4 bottom-4 w-px bg-white/[0.08]" />
              {story.timeline.map((step, i) => (
                <motion.div key={step.stage} initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + si * 0.1 + i * 0.08 }}
                  className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex-shrink-0 w-7 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-white/20 mt-1 relative z-10" style={{ background: i === 0 ? '#94A3B8' : i === story.timeline.length - 1 ? story.color : '#0F172A' }} />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: story.color }}>{step.stage}</p>
                    <p className="text-white/80 text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    year: '2024',
    month: 'March',
    title: 'Founded in a College Room',
    story: '5 students in Bhopal decided to act. No office. No funding. Just a WhatsApp group and a shared belief that youth could change things. First event: a blood donation drive with 42 donors.',
    volunteers: 5,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop',
  },
  {
    year: '2025',
    month: 'August',
    title: 'First Rural Education Camp',
    story: 'SYF ran its first 15-day summer learning camp in a tribal village in Balaghat, MP. 68 children attended. Three went on to pass class 10 board exams for the first time in their family history.',
    volunteers: 31,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80&fit=crop',
  },

  
  {
    year: '2026',
    month: 'April',
    title: 'CyberSafe India Goes National',
    story: 'After two successful pilots, the CyberSafe school curriculum was formally adopted by three state education departments. SYF now trains 1,200 student cyber ambassadors per year.',
    volunteers: 620,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&fit=crop',
  },
];

export default function VolunteerTimeline() {
  return (
    <section className="py-28 bg-[#F5F1E8] overflow-hidden">
      <div className="px-10 md:px-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Our Story
          </p>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-[#1a1a18] leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            Six years of
            <br />
            <span className="text-[#14532D]">stubborn optimism.</span>
          </h2>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative px-10 md:px-20">
        {/* Vertical line */}
        <div className="absolute left-[calc(10rem+24px)] md:left-[calc(20rem+24px)] top-0 bottom-0 w-px bg-[#1a1a18]/10 hidden lg:block" />

        <div className="space-y-0">
          {milestones.map((m, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const isInView = useInView(ref, { once: true, margin: '-80px' });

            return (
              <motion.div
                key={m.year + m.month}
                ref={ref}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7 }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-0 py-14 border-b border-[#1a1a18]/08"
              >
                {/* Year/date — left column */}
                <div className="lg:w-48 flex-shrink-0 lg:pr-12 flex lg:flex-col justify-start items-start gap-4 lg:gap-2">
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.15 }}
                    className="text-[#B45309] text-4xl font-black"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {m.year}
                  </motion.p>
                  <p className="text-[#888880] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                    {m.month}
                  </p>
                  <div className="hidden lg:block mt-2">
                    <p className="text-[10px] text-[#14532D] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                      {m.volunteers} volunteers
                    </p>
                  </div>
                </div>

                {/* Timeline dot — only on desktop */}
                <div className="hidden lg:flex items-start pt-2 flex-shrink-0 w-12 justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-4 h-4 rounded-full bg-[#14532D] border-4 border-[#F5F1E8] shadow-sm"
                  />
                </div>

                {/* Content */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.25, duration: 0.7 }}
                  className="flex flex-col md:flex-row gap-8 flex-1 lg:pl-12"
                >
                  <div className="flex-1">
                    <h3
                      className="text-2xl font-bold text-[#1a1a18] mb-4"
                      style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-[#4a4a42] leading-relaxed text-base" style={{ fontFamily: 'var(--font-body)' }}>
                      {m.story}
                    </p>
                  </div>
                  {/* Thumbnail */}
                  <div className="w-full md:w-52 h-36 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

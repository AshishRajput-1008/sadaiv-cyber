'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const moments = [
  { url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500&q=80&fit=crop', caption: 'National Youth Day rally, Bhopal' },
  { url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&q=80&fit=crop', caption: 'Health camp, Betul district' },
  { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&q=80&fit=crop', caption: 'Volunteer onboarding workshop' },
  { url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=500&q=80&fit=crop', caption: 'Cyber awareness street play' },
  { url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&q=80&fit=crop', caption: 'Team dinner after marathon camp' },
  { url: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=500&q=80&fit=crop', caption: 'Shakti Circle graduation day' },
  { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80&fit=crop', caption: 'Free digital literacy class' },
  { url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=500&q=80&fit=crop', caption: 'Plantation drive in Satpura' },
  { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80&fit=crop', caption: 'Interview with local radio on women empowerment' },
  { url: 'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?w=500&q=80&fit=crop', caption: 'Community wall mural project' },
  { url: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=500&q=80&fit=crop', caption: 'Student reading corner, Hoshangabad' },
  { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=80&fit=crop', caption: 'Annual volunteer cycling rally' },
];

export default function CommunityMasonry() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-28 bg-[#FCFCFA]">
      <div className="px-10 md:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Community Moments
          </p>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-[#1a1a18] leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            The everyday
            <br />
            <span className="text-[#14532D] italic font-light">extraordinary.</span>
          </h2>
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div ref={ref} className="px-10 md:px-20 masonry-grid">
        {moments.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.05, duration: 0.6 }}
            className="masonry-item group relative overflow-hidden"
          >
            <div className="overflow-hidden">
              <img
                src={m.url}
                alt={m.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ display: 'block' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white text-[11px] px-3 pb-3 leading-snug" style={{ fontFamily: 'var(--font-mono)' }}>
                {m.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

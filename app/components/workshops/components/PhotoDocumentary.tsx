'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const photos = [
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&fit=crop', caption: 'Corporate cyber awareness session, Hyderabad — March 2024.', size: 'wide' },
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&fit=crop', caption: 'Women\'s digital safety workshop facilitated by Neha Singh.', size: 'portrait' },
  { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80&fit=crop', caption: 'University students working through a live CTF challenge.', size: 'square' },
  { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&fit=crop', caption: 'Participants at the National Cyber Conclave, Bhopal — 840 attendees.', size: 'landscape' },
  { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80&fit=crop', caption: 'Evening debrief session with volunteer coordinators.', size: 'portrait' },
  { url: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80&fit=crop', caption: 'Children participating in Safe Internet Day awareness camp.', size: 'landscape' },
];

export default function PhotoDocumentary() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-28 bg-[#F8F6F2] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Photo Documentary</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            In the field.
          </h2>
          <p className="text-[#64748B] text-sm max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>Genuine moments from workshops, camps, and training sessions across India.</p>
        </div>
      </motion.div>

      {/* Editorial asymmetric layout */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-8">
          <motion.figure initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <div className="overflow-hidden aspect-[16/9]"><img src={photos[0].url} alt={photos[0].caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <figcaption className="mt-3 text-[11px] text-[#94A3B8] italic" style={{ fontFamily: 'var(--font-mono)' }}>{photos[0].caption}</figcaption>
          </motion.figure>
        </div>
        <div className="col-span-12 md:col-span-4">
          <motion.figure initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
            <div className="overflow-hidden aspect-[3/4]"><img src={photos[1].url} alt={photos[1].caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <figcaption className="mt-3 text-[11px] text-[#94A3B8] italic" style={{ fontFamily: 'var(--font-mono)' }}>{photos[1].caption}</figcaption>
          </motion.figure>
        </div>
        <div className="col-span-12 md:col-span-4">
          <motion.figure initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="overflow-hidden aspect-square"><img src={photos[2].url} alt={photos[2].caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <figcaption className="mt-3 text-[11px] text-[#94A3B8] italic" style={{ fontFamily: 'var(--font-mono)' }}>{photos[2].caption}</figcaption>
          </motion.figure>
        </div>
        <div className="col-span-12 md:col-span-8">
          <motion.figure initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}>
            <div className="overflow-hidden aspect-[16/9]"><img src={photos[3].url} alt={photos[3].caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <figcaption className="mt-3 text-[11px] text-[#94A3B8] italic" style={{ fontFamily: 'var(--font-mono)' }}>{photos[3].caption}</figcaption>
          </motion.figure>
        </div>
        <div className="col-span-12 md:col-span-6">
          <motion.figure initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
            <div className="overflow-hidden aspect-[3/4]"><img src={photos[4].url} alt={photos[4].caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <figcaption className="mt-3 text-[11px] text-[#94A3B8] italic" style={{ fontFamily: 'var(--font-mono)' }}>{photos[4].caption}</figcaption>
          </motion.figure>
        </div>
        <div className="col-span-12 md:col-span-6">
          <motion.figure initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}>
            <div className="overflow-hidden aspect-[4/3]"><img src={photos[5].url} alt={photos[5].caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" /></div>
            <figcaption className="mt-3 text-[11px] text-[#94A3B8] italic" style={{ fontFamily: 'var(--font-mono)' }}>{photos[5].caption}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

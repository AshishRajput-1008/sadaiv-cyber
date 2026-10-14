'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80&fit=crop',
    caption: 'A volunteer reads to children under a banyan tree, Rewa — 2023.',
    size: 'large',
    orientation: 'landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop',
    caption: 'Nurse Priya conducting maternal checkup during mobile health camp.',
    size: 'small',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80&fit=crop',
    caption: 'Women\'s circle discussing financial planning, Ajmer — March 2024.',
    size: 'medium',
    orientation: 'landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=700&q=80&fit=crop',
    caption: 'Tree planting drive during monsoon season, Satpura foothills.',
    size: 'medium',
    orientation: 'portrait',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&fit=crop',
    caption: 'SYF annual volunteer assembly — 240 youth from 9 states.',
    size: 'wide',
    orientation: 'landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80&fit=crop',
    caption: 'A first-generation computer learner, Hazaribagh — 2024.',
    size: 'small',
    orientation: 'square',
  },
];

function PhotoItem({ photo, delay }: { photo: typeof photos[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative group"
    >
      <div
        className="overflow-hidden"
        style={{
          aspectRatio: photo.orientation === 'portrait' ? '3/4' : photo.orientation === 'square' ? '1/1' : '16/9',
        }}
      >
        <motion.img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ display: 'block' }}
        />
      </div>
      <figcaption
        className="mt-3 text-[#888880] text-[11px] leading-snug italic"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

export default function PhotoEssay() {
  return (
    <section className="py-28 px-10 md:px-20 bg-[#F5F1E8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
          Photo Essay
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-5xl md:text-6xl font-extrabold text-[#1a1a18] leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            In the field.
          </h2>
          <p className="text-[#888880] text-sm max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>
            A visual record of work done quietly, honestly, and at scale.
          </p>
        </div>
      </motion.div>

      {/* Editorial grid layout — deliberately asymmetric */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Row 1: Large left, small right stacked */}
        <div className="md:col-span-8">
          <PhotoItem photo={photos[0]} delay={0} />
        </div>
        <div className="md:col-span-4 flex flex-col gap-6">
          <PhotoItem photo={photos[1]} delay={0.1} />
          <PhotoItem photo={photos[5]} delay={0.2} />
        </div>

        {/* Row 2: two mediums */}
        <div className="md:col-span-5">
          <PhotoItem photo={photos[2]} delay={0.1} />
        </div>
        <div className="md:col-span-7">
          <PhotoItem photo={photos[3]} delay={0.15} />
        </div>

        {/* Row 3: Full width */}
        <div className="md:col-span-12">
          <PhotoItem photo={photos[4]} delay={0.05} />
        </div>
      </div>

      {/* Caption bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 pt-8 border-t border-[#1a1a18]/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <p className="text-[#888880] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          All photographs © Sadaiv Yuva Foundation Archives, 2022–2024
        </p>
        <p className="text-[#B45309] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
          View complete archive →
        </p>
      </motion.div>
    </section>
  );
}

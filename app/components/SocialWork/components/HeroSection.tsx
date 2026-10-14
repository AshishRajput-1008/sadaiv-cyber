'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-end">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1800&q=85&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Cinematic gradient - bottom heavy */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f10]/90 via-[#0a1f10]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f10]/50 to-transparent" />
      </motion.div>

      {/* Top nav strip */}
      <div className="absolute top-0 left-0 right-0 z-20 px-10 py-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#B45309] flex items-center justify-center">
            <span className="text-white text-xs font-bold" style={{ fontFamily: 'var(--font-heading)' }}>S</span>
          </div>
          <span className="text-white/90 text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            Sadaiv Yuva Foundation
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden md:flex items-center gap-8"
        >
          {['Our Work', 'Stories', 'Impact', 'Volunteer'].map((item) => (
            <a key={item} href="#" className="text-white/70 hover:text-white text-sm transition-colors tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
              {item}
            </a>
          ))}
          <a href="#cta" className="border border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white text-sm px-5 py-2 transition-all tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
            Join Us
          </a>
        </motion.div>
      </div>

      {/* Hero Content */}
      <motion.div style={{ opacity }} className="relative z-10 px-10 md:px-20 pb-20 md:pb-28 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[#B45309] text-xs tracking-[0.35em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Est. 2018 · India · Youth-Led
        </motion.p>

    

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row items-start md:items-end gap-8"
        >
          <p
            className="text-white/60 max-w-md leading-relaxed text-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A youth-led movement across India — building futures through education, health, digital empowerment, and environmental action.
          </p>
          <div className="flex items-center gap-6">
            <div className="w-px h-12 bg-white/20" />
            <div>
              {/* <p className="text-[#079245] text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>48,000+</p> */}
              {/* <p className="text-white/50 text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Lives touched</p> */}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 right-10 md:right-20 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4" style={{ fontFamily: 'var(--font-mono)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="cta" className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#FCFCFA]">
      {/* Background large image with grain */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(80%)',
            opacity: 0.12,
          }}
        />
      </div>

      <div className="relative z-10 w-full px-10 md:px-20 py-28">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Become Part of the Change
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-[#1a1a18] leading-[0.95] mb-8"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            This work belongs
            <br />
            <span className="text-[#14532D]">to all of us.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#4a4a42] text-xl leading-relaxed max-w-xl mb-16"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Whether you give your time, your skills, or your support — every action sends a ripple across communities that have been waiting too long for change.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 bg-[#14532D] text-white px-8 py-4 text-sm tracking-wider uppercase hover:bg-[#166534] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Volunteer with us
              <span className="text-[#86efac]">→</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 border-2 border-[#B45309] text-[#B45309] px-8 py-4 text-sm tracking-wider uppercase hover:bg-[#B45309] hover:text-white transition-all"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Support our work
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[#888880] px-4 py-4 text-sm hover:text-[#1a1a18] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Partner with SYF →
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-20 pt-10 border-t border-[#1a1a18]/10 flex flex-wrap gap-10"
          >
            {[
              { label: 'Registered NGO', detail: 'Under Societies Act, MP' },
              { label: '80G Certified', detail: 'Tax exempt donations' },
              { label: '98% Efficiency', detail: 'Funds reach ground' },
              { label: 'FCRA Pending', detail: 'International funds 2024' },
            ].map((t) => (
              <div key={t.label} className="flex flex-col gap-1">
                <p className="text-[#14532D] text-xs font-semibold tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>{t.label}</p>
                <p className="text-[#888880] text-[11px]" style={{ fontFamily: 'var(--font-body)' }}>{t.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative right-side column of text rotated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2"
      >
        <div className="w-px h-24 bg-[#1a1a18]/10" />
        <p
          className="text-[#888880] text-[10px] tracking-[0.4em] uppercase"
          style={{
            writingMode: 'vertical-rl',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.4em',
          }}
        >
          Sadaiv Yuva Foundation · Since 2018
        </p>
        <div className="w-px h-24 bg-[#1a1a18]/10" />
      </motion.div>
    </section>
  );
}

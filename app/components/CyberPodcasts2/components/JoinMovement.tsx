// components/JoinMovement.tsx
'use client'

import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'

export default function JoinMovement() {
  return (
    <section className="relative bg-paper py-28 md:py-20">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="09" label="JOIN THE MOVEMENT" />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-3xl font-display text-balance text-4xl font-extrabold leading-[1.08] tracking-tightest text-navy-900 sm:text-6xl"
        >
          The next scam call is already dialing.
          <span className="text-cyber-600"> Help someone recognise it before they answer.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center"
        >
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-3 bg-navy-900 px-9 py-4 font-display text-base font-bold text-paper transition-colors hover:bg-cyber-700"
          >
            Subscribe to the Podcast
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 border border-navy-900 px-9 py-4 font-display text-base font-bold text-navy-900 transition-colors hover:border-emerald-600 hover:text-emerald-600"
          >
            Host an Awareness Session
          </a>
        </motion.div>

        <div className="mt-20 signal-rule signal-rule--blue" />
{/* 
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-display text-lg font-extrabold tracking-tightest text-navy-900">
              SADAIV YUVA <span className="text-cyber-600">FOUNDATION</span>
            </div>
            <p className="mt-2 max-w-sm text-sm text-navy-400">
              A registered non-profit working on youth empowerment and digital
              safety awareness across Madhya Pradesh, India.
            </p>
          </div>
          <span className="eyebrow text-navy-400">CYBER SURAKSHA KATHA &copy; 2026</span>
        </div> */}
      </div>
    </section>
  )
}

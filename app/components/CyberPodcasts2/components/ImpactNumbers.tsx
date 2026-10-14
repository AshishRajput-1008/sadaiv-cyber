// components/ImpactNumbers.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { impactNumbers } from '@/lib/data'
import SectionLabel from './SectionLabel'

function Counter({ value, suffix, abbreviated }: { value: number; suffix: string; abbreviated?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value)
      setDisplay(abbreviated ? formatAbbrev(current) : current.toLocaleString('en-IN'))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, abbreviated])

  function formatAbbrev(n: number) {
    if (n >= 1000) return `${Math.floor(n / 1000)}K`
    return n.toString()
  }

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function ImpactNumbers() {
  return (
    <section className="relative bg-navy-900 py-24 md:py-16">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="08" label="IMPACT, IN NUMBERS" tone="paper" />
      </div>

      <div className="mx-auto mt-8 grid max-w-editorial grid-cols-1 gap-12 px-6 sm:grid-cols-2 md:px-10">
        {impactNumbers.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border-l border-paper/15 pl-6"
          >
            <div className="font-display text-[3.5rem] font-extrabold leading-none tracking-tightest text-paper sm:text-[5rem]">
              <Counter value={item.value} suffix={item.suffix} abbreviated={item.abbreviated} />
            </div>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-navy-200">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

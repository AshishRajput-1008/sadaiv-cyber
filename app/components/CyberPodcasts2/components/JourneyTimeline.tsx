// components/JourneyTimeline.tsx
'use client'

import { motion } from 'framer-motion'
import { timelineStages } from '@/lib/data'
import SectionLabel from './SectionLabel'

const colorMap = {
  navy: { dot: 'bg-navy-900', text: 'text-navy-900', border: 'border-navy-900' },
  cyber: { dot: 'bg-cyber-600', text: 'text-cyber-600', border: 'border-cyber-600' },
  emerald: { dot: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600' },
}

export default function JourneyTimeline() {
  return (
    <section className="relative bg-paper py-24 md:py-12">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="03" label="THE PODCAST JOURNEY" />

        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
          From the first scam message to a life rebuilt — four stages of the story.
        </h2>

        <div className="relative mt-20">
          {/* the spine — literal signal path running through all stages */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-navy-100 sm:left-[11px]" />

          <div className="space-y-20">
            {timelineStages.map((stage, i) => {
              const c = colorMap[stage.color]
              return (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-1 gap-6 pl-9 sm:grid-cols-[200px_1fr] sm:gap-10 sm:pl-14"
                >
                  {/* node on the spine */}
                  <span
                    className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-paper ${c.dot} sm:h-6 sm:w-6`}
                  />

                  {/* stage label column */}
                  <div>
                    <span className="font-mono-label text-xs tracking-widemono text-navy-200">
                      STAGE {stage.index}
                    </span>
                    <h3 className={`mt-1 font-display text-2xl font-extrabold ${c.text}`}>
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-400">
                      {stage.description}
                    </p>
                  </div>

                  {/* episodes for this stage — horizontal chips, not cards */}
                  <div className="flex flex-col gap-3">
                    {stage.episodes.map((ep) => (
                      <div
                        key={ep.title}
                        className={`group flex items-center justify-between gap-4 border-b ${c.border}/20 pb-3 transition-colors hover:${c.border}/60`}
                      >
                        <span className="font-display text-base font-semibold text-navy-900 sm:text-lg">
                          {ep.title}
                        </span>
                        <span className="eyebrow shrink-0 text-navy-400">{ep.duration}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

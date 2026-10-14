// components/LatestEpisodes.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { latestEpisodes } from '@/app/data/podcasts'
import SectionLabel from './SectionLabel'

export default function LatestEpisodes() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  return (
    <section id="latest-episodes" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="07" label="LATEST EPISODES" />
        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
          New conversations, every week.
        </h2>

        <div className="mt-14 divide-y divide-navy-100 border-t border-b border-navy-100">
          {latestEpisodes.map((ep, i) => {
            const isPlaying = playingIndex === i
            return (
              <motion.div
                key={ep.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-6"
              >
                <button
                  onClick={() => setPlayingIndex(isPlaying ? null : i)}
                  aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isPlaying
                      ? 'border-cyber-600 bg-cyber-600 text-paper'
                      : 'border-navy-200 text-navy-900 group-hover:border-cyber-600 group-hover:text-cyber-600'
                  }`}
                >
                  {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>

                <span className="font-mono-label w-10 shrink-0 text-sm text-navy-200">
                  {ep.number}
                </span>

                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-navy-900">{ep.title}</h3>
                  <p className="mt-1 text-sm text-navy-400">{ep.guest}</p>
                </div>

                {/* faux waveform — purely decorative, signals "audio" without a literal player UI */}
                <div className="hidden items-center gap-[3px] sm:flex">
                  {Array.from({ length: 24 }).map((_, bar) => (
                    <span
                      key={bar}
                      className={`w-[2px] rounded-full transition-colors ${
                        isPlaying ? 'bg-cyber-600' : 'bg-navy-100'
                      }`}
                      style={{ height: `${6 + ((bar * 7) % 18)}px` }}
                    />
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-6 text-right">
                  <span className="eyebrow text-navy-400">{ep.date}</span>
                  <span className="font-mono-label w-12 text-sm text-navy-400">{ep.duration}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

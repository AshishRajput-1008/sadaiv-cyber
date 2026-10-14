// components/RealStories.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { victimStories } from '@/lib/data'
import SectionLabel from './SectionLabel'

export default function RealStories() {
  return (
    <section className="relative bg-navy-900 py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="04" label="REAL STORIES" tone="paper" />
        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
          Behind every statistic is someone who picked up the phone.
        </h2>
      </div>

      <div className="mt-20 flex flex-col gap-px">
        {victimStories.map((story, i) => (
          <motion.div
            key={story.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-1 lg:grid-cols-2 ${story.flip ? '' : ''}`}
          >
            <div
              className={`relative min-h-[420px] lg:min-h-[640px] ${
                story.flip ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <Image
                src={story.image}
                alt={`Portrait of ${story.name}, cyber fraud survivor`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="font-display text-xl font-bold text-paper">{story.name}, {story.age}</div>
                <div className="eyebrow text-navy-200">{story.location}</div>
              </div>
            </div>

            <div
              className={`flex flex-col justify-center bg-navy-600 px-8 py-14 lg:px-16 ${
                story.flip ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <p className="font-display text-balance text-xl font-semibold leading-snug text-paper sm:text-2xl">
                {story.summary}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <span className="eyebrow text-cyber-300">WHAT HAPPENED</span>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">{story.whatHappened}</p>
                </div>
                <div>
                  <span className="eyebrow text-emerald-100">LESSONS LEARNED</span>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">{story.lessons}</p>
                </div>
              </div>

              <a
                href="#latest-episodes"
                className="mt-8 inline-flex items-center gap-2 self-start border-b border-cyber-300 pb-1 font-display text-sm font-semibold text-paper transition-colors hover:border-paper"
              >
                {story.episode} →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

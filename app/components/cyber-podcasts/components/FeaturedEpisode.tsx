// components/FeaturedEpisode.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { featuredEpisode } from '@/app/data/podcasts'
import SectionLabel from './SectionLabel'

export default function FeaturedEpisode() {
  return (
    <section id="featured-episode" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="02" label="THE FEATURED EPISODE" />
      </div>

      <div className="mx-auto mt-12 max-w-editorial px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          {/* image — bleeds wider than the text column, breaking grid symmetry */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[560px]"
          >
            <Image
              src={featuredEpisode.image}
              alt={`${featuredEpisode.guestName} recording the featured episode`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />

            {/* play control sits ON the image, not beside it */}
            <button
              aria-label="Play featured episode"
              className="group absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-paper/95 px-5 py-3 backdrop-blur-sm transition-transform hover:scale-105"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyber-600 text-paper">
                <Play size={15} fill="currentColor" />
              </span>
              <span className="font-display text-sm font-semibold text-navy-900">Play Episode</span>
            </button>

            <span className="absolute right-6 top-6 eyebrow rounded-full bg-paper/90 px-3 py-1.5 text-navy-900">
              {featuredEpisode.duration}
            </span>
          </motion.div>

          {/* text column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center border-t border-navy-100 bg-navy-900 px-8 py-12 lg:border-l lg:border-t-0 lg:px-12 lg:py-0"
          >
            <span className="eyebrow text-cyber-300">{featuredEpisode.number}</span>
            <h2 className="mt-4 font-display text-balance text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
              {featuredEpisode.title}
            </h2>

            <div className="mt-6 flex items-center gap-3 border-y border-paper/15 py-4">
              <div>
                <div className="font-display text-sm font-semibold text-paper">
                  {featuredEpisode.guestName}
                </div>
                <div className="eyebrow text-navy-200">{featuredEpisode.guestRole}</div>
              </div>
            </div>

            <div className="mt-7">
              <span className="eyebrow text-emerald-100">KEY TAKEAWAYS</span>
              <ul className="mt-4 space-y-3">
                {featuredEpisode.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-navy-100">
                    <span className="font-mono-label mt-0.5 shrink-0 text-emerald-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

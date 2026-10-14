// components/ExpertVoices.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { experts, type Expert } from '@/app/data/podcasts'
import SectionLabel from './SectionLabel'

const sizeClasses: Record<Expert['size'], string> = {
  tall: 'sm:row-span-2 aspect-[3/4]',
  wide: 'sm:col-span-2 aspect-[2/1]',
  square: 'aspect-square',
  small: 'aspect-[4/3]',
}

export default function ExpertVoices() {
  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="05" label="EXPERT VOICES" />
        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
          The people who appear on the mic — officers, hackers, lawyers, educators.
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {experts.map((expert, i) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-sm ${sizeClasses[expert.size]}`}
            >
              <Image
                src={expert.image}
                alt={`${expert.name}, ${expert.role}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
              <span className="absolute left-3 top-3 eyebrow rounded-full bg-paper/90 px-2.5 py-1 text-navy-900">
                {expert.category}
              </span>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="font-display text-sm font-bold leading-tight text-paper">
                  {expert.name}
                </div>
                <div className="eyebrow mt-1 text-navy-100">{expert.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

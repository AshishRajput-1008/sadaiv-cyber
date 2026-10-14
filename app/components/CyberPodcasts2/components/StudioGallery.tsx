// components/StudioGallery.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { galleryPhotos } from '@/lib/data'
import SectionLabel from './SectionLabel'

export default function StudioGallery() {
  return (
    <section className="relative overflow-hidden bg-navy-50 py-24 md:py-16">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="06" label="BEHIND THE SCENES" />
        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
          The studio, the green room, the long nights before recording.
        </h2>
      </div>

      {/* scattered polaroid wall — flex-wrap with manual rotation, not a grid */}
      <div className="mx-auto mt-16 flex max-w-editorial flex-wrap justify-center gap-x-6 gap-y-12 px-6 md:px-10 lg:gap-x-10">
        {galleryPhotos.map((photo, i) => (
          <motion.div
            key={photo.caption}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
            className="relative w-[150px] cursor-default bg-paper p-3 pb-10 shadow-[0_12px_28px_rgb(15,23,42,0.14)] sm:w-[190px]"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image src={photo.src} alt={photo.caption} fill className="object-cover" />
            </div>
            <span className="font-mono-label absolute bottom-3 left-3 right-3 text-[10px] leading-snug text-navy-400">
              {photo.caption}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

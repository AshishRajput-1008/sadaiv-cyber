
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

import avatar1 from "@/public/assests/images/avatar/avatar1.jpg"
import avatar2 from "@/public/assests/images/avatar/avatar2.jpg"
import avatar3 from "@/public/assests/images/avatar/avatar3.jpg"
import avatar4 from "@/public/assests/images/avatar/avatar4.jpg"

function SectionLabel({
  index,
  label,
  align = 'left',
  tone = 'navy',
}: {
  index: string
  label: string
  align?: 'left' | 'right'
  tone?: 'navy' | 'paper'
}) {
  const textColor = tone === 'navy' ? 'text-navy-900' : 'text-paper'
  const ruleClass = tone === 'navy' ? 'signal-rule' : 'bg-paper/20 h-px'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-4 ${
        align === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      <span className={`eyebrow ${textColor} opacity-70 shrink-0`}>
        {index} / {label}
      </span>
      <span className={`flex-1 ${ruleClass}`} />
    </motion.div>
  )
}

const testimonials = [
  {
    quote:
      'After listening to the UPI fraud episode, I saved my father from losing ₹2.3 lakhs. This podcast is literally a lifesaver.',
    name: 'Ramesh Patel',
    role: 'Teacher, Ahmedabad',
    avatar: avatar1,
  },
  {
    quote:
      "The Women Cyber Safety series gave me the courage and legal knowledge to file a complaint against my stalker. Anjali's work is transformative.",
    name: 'Priya Mehta',
    role: 'Software Engineer, Pune',
    avatar: avatar2,
  },
  {
    quote:
      "I train 500 police officers a year. I recommend these podcasts before every session — they're better than any textbook.",
    name: 'DCP Vikram Singh',
    role: 'Cyber Crime Division, Delhi Police',
    avatar: avatar3,
  },
  {
    quote:
      'As a parent, I had no idea what dangers my kids face online. The Youth Digital Awareness series changed how we talk about the internet at home.',
    name: 'Meena Krishnan',
    role: 'Parent & Homemaker, Chennai',
    avatar: avatar4,
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-paper py-24 md:py-16">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="12" label="LISTENER STORIES" />

        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
          What people say.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
              }}
              className={`group rounded-sm border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                i % 2 === 0
                  ? 'border-navy-100 bg-paper'
                  : 'border-navy-100 bg-navy-50'
              }`}
            >
              <div
                className="mb-4 font-display text-4xl font-extrabold opacity-20"
                style={{ color: '#0F172A' }}
              >
                "
              </div>

              <p className="mb-7 text-base leading-relaxed text-navy-700">
                {t.quote}
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md transition-all duration-300 group-hover:ring-navy-200">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="56px"
                    priority={i < 2}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <h4 className="font-display text-base font-bold text-navy-900">
                    {t.name}
                  </h4>

                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-navy-500">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

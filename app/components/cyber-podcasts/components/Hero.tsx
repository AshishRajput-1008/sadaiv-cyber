// components/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { stats } from '@/app/data/podcasts'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-paper">
      {/* faint top-left radial wash — the only gradient in this section */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />

      {/* top bar */}
      <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pt-8 md:px-10">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-sm font-extrabold tracking-tightest text-navy-900"
          >
            SADAIV YUVA <span className="text-cyber-600">FOUNDATION</span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow text-navy-400"
          >
            CYBER SURAKSHA KATHA — A PODCAST
          </motion.span>
        </div>
      </div>

      {/* main split */}
      <div className="relative z-10 mx-auto flex w-full max-w-editorial flex-1 flex-col px-6 pt-16 md:px-10 lg:flex-row lg:items-center lg:pt-8">
        {/* LEFT: headline */}
        <div className="lg:w-[52%]">
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            // variants={fadeUp}
            className="eyebrow mb-6 inline-flex items-center gap-2 text-emerald-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse-slow" />
            LIVE AWARENESS SERIES &middot; MADHYA PRADESH
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            // variants={fadeUp}
            className="font-display text-balance text-[2.75rem] font-extrabold leading-[1.05] tracking-tightest text-navy-900 sm:text-6xl lg:text-[4.25rem]"
          >
            Voices Protecting
            <br />
            India&rsquo;s Digital Future
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-md text-lg leading-relaxed text-navy-400"
          >
            A documentary podcast from Sadaiv Yuva Foundation — real interviews with
            cyber police, ethical hackers, lawyers, and the families who survived
            digital fraud, told in their own words.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#latest-episodes"
              className="group inline-flex items-center gap-3 rounded-full bg-navy-900 px-7 py-3.5 font-display text-sm font-semibold text-paper transition-colors hover:bg-cyber-700"
            >
              Listen to the Series
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#featured-episode"
              className="font-display text-sm font-semibold text-navy-900 underline decoration-cyber-600 decoration-2 underline-offset-4 hover:text-cyber-700"
            >
              Start with Episode 47
            </a>
          </motion.div>
        </div>

        {/* RIGHT: documentary collage */}
        <div className="relative mt-16 lg:mt-0 lg:w-[48%]">
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
                alt="Cyber awareness workshop with young attendees in Madhya Pradesh"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square overflow-hidden rounded-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=900&auto=format&fit=crop"
                alt="Podcast microphone in recording studio"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square overflow-hidden rounded-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop"
                alt="Cyber security expert speaking to an audience"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* floating stat chips — staggered, not in a grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -left-6 top-1/4 hidden rounded-sm border border-navy-100 bg-paper px-4 py-3 shadow-[0_8px_30px_rgb(15,23,42,0.08)] sm:block"
          >
            <div className="font-display text-2xl font-extrabold text-navy-900">{stats[0].value}</div>
            <div className="eyebrow text-navy-400">{stats[0].label}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="absolute -right-4 bottom-10 rounded-sm border border-navy-100 bg-paper px-4 py-3 shadow-[0_8px_30px_rgb(15,23,42,0.08)] sm:-right-8"
          >
            <div className="font-display text-2xl font-extrabold text-cyber-600">{stats[1].value}</div>
            <div className="eyebrow text-navy-400">{stats[1].label}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="absolute -bottom-8 left-1/3 hidden rounded-sm border border-navy-100 bg-paper px-4 py-3 shadow-[0_8px_30px_rgb(15,23,42,0.08)] md:block"
          >
            <div className="font-display text-2xl font-extrabold text-emerald-600">{stats[2].value}</div>
            <div className="eyebrow text-navy-400">{stats[2].label}</div>
          </motion.div>
        </div>
      </div>

      {/* bottom scroll cue */}
      <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-10 pt-20 md:px-10">
        <div className="signal-rule" />
        <div className="mt-4 flex justify-between">
          <span className="eyebrow text-navy-400">SCROLL TO EXPLORE</span>
          <span className="eyebrow text-navy-400">EST. 2021 — BHOPAL, INDIA</span>
        </div>
      </div>
    </section>
  )
}

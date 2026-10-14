'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'


function SectionLabel({ index, label, align = 'left', tone = 'navy' }: {
  index: string; label: string; align?: 'left' | 'right'; tone?: 'navy' | 'paper'
}) {
  const textColor = tone === 'navy' ? 'text-navy-900' : 'text-paper'
  const ruleClass = tone === 'navy' ? 'signal-rule' : 'bg-paper/20 h-px'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <span className={`eyebrow ${textColor} opacity-70 shrink-0`}>{index} / {label}</span>
      <span className={`flex-1 ${ruleClass}`} />
    </motion.div>
  )
}


// ─── NEW CONTENT from extended version ──────────────────────────────────────
const podcastSeries = [
  { title: 'Cyber Security Podcast',   host: 'IPS Ravi Shankar Mishra', episodes: 42, tagline: "Deep investigations into India's evolving threat landscape.",             tags: ['Ransomware', 'Phishing', 'Zero-Day', 'CERT-In'],              accent: '#2563EB' },
  { title: 'Cyber Awareness Podcast',  host: 'Manish Tiwari',           episodes: 38, tagline: 'Everyday digital safety for every Indian citizen.',                        tags: ['UPI Fraud', 'Social Media', 'Identity Theft', 'OTP Safety'], accent: '#059669' },
  { title: 'Ethical Hacking Podcast',  host: 'Priya Deshmukh',          episodes: 29, tagline: 'Red team, blue team, and everything in between.',                          tags: ['OSINT', 'Malware', 'Pen Testing', 'Bug Bounty'],             accent: '#7C3AED' },
  { title: 'Women Cyber Safety',       host: 'Dr. Anjali Khare',         episodes: 24, tagline: 'Protecting women in India\'s digital spaces.',                             tags: ['Cyber Stalking', 'Privacy', 'Harassment Law', 'Deepfakes'],  accent: '#DB2777' },
  { title: 'Youth Digital Awareness',  host: 'SI Kavita Rathore',        episodes: 19, tagline: 'Safe internet skills for Gen Z and Gen Alpha.',                            tags: ['Gaming', 'AI Safety', 'Social Media Risks'],                 accent: '#F59E0B' },
]

export default function PodcstSeries() {


  return (
    <section className="relative bg-navy-50 py-24 md:py-12">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="03" label="ALL PODCAST SERIES" />
        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
          Five series. One mission — a safer digital India.
        </h2>

        {/* Featured large + 4 smaller */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr_1fr] lg:grid-rows-2">
          {/* Large card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-sm bg-navy-900 p-8 lg:row-span-2"
          >
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 70% 30%, ${podcastSeries[0].accent}, transparent 60%)` }} />
            <div className="relative space-y-4">
              <span className="eyebrow rounded-full border border-cyber-400/40 bg-cyber-400/20 px-2.5 py-1 text-cyber-300">FLAGSHIP SERIES</span>
              <div className="text-5xl">🛡️</div>
              <h3 className="font-display text-3xl font-extrabold leading-tight text-paper">{podcastSeries[0].title}</h3>
              <p className="text-sm leading-relaxed text-navy-300">{podcastSeries[0].tagline}</p>
              <div className="flex flex-wrap gap-2">
                {podcastSeries[0].tags.map(t => <span key={t} className="eyebrow rounded-full bg-paper/10 px-2.5 py-1 text-navy-200">{t}</span>)}
              </div>
            </div>
            <div className="relative mt-8 space-y-3">
              <div className="flex justify-between text-navy-400">
                <span className="eyebrow">Host: {podcastSeries[0].host}</span>
                <span className="eyebrow">{podcastSeries[0].episodes} Episodes</span>
              </div>
              <a href="#latest-episodes" className="group flex w-full items-center justify-center gap-2 rounded-sm bg-cyber-600 py-3 font-display text-sm font-bold text-paper transition-colors hover:bg-cyber-700">
                <Play size={14} fill="currentColor" /> Listen Now
              </a>
            </div>
          </motion.div>

          {/* 4 smaller cards */}
          {podcastSeries.slice(1).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: (i+1)*0.07 }}
              className="flex flex-col justify-between rounded-sm border border-navy-100 bg-paper p-6"
            >
              <div>
                <div className="mb-4 w-10 h-10 rounded-sm flex items-center justify-center text-xl" style={{ background: `${s.accent}15` }}>
                  {['🔐','💻','👩‍💻','🎯'][i]}
                </div>
                <h3 className="font-display text-base font-extrabold text-navy-900">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-navy-400">{s.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags?.slice(0,2).map(t => <span key={t} className="eyebrow rounded-full px-2 py-0.5" style={{ background: `${s.accent}12`, color: s.accent }}>{t}</span>)}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="eyebrow text-navy-400">{s.episodes} ep · {s.host.split(' ').slice(-1)}</span>
                <button className="flex h-8 w-8 items-center justify-center rounded-full text-paper transition-transform hover:scale-110" style={{ background: s.accent }}>
                  <Play size={12} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


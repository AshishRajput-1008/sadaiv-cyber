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


const cyberNews = [
  { category: 'Threat Intelligence', title: 'CERT-In Issues High-Severity Alert for Indian Banking Apps',               date: 'Jun 20, 2026', readTime: '4 min', color: '#EF4444' },
  { category: 'Ransomware',          title: 'LockBit 4.0 Targets Three Indian Hospitals; AIIMS on High Alert',          date: 'Jun 17, 2026', readTime: '6 min', color: '#F59E0B' },
  { category: 'Govt Advisory',       title: 'MeitY Mandates Multi-Factor Auth for All Government Portals',             date: 'Jun 14, 2026', readTime: '3 min', color: '#2563EB' },
  { category: 'AI Security',         title: 'AI-Generated Voice Scams Surge 340% in India — How to Protect Yourself', date: 'Jun 11, 2026', readTime: '5 min', color: '#059669' },
]




export default function CyberNewsHub() {


  return (
    <section className="relative bg-paper py-24 md:py-16">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="10" label="CYBER NEWS HUB" />
        <div className="mt-10 flex items-end justify-between">
          <h2 className="max-w-xl font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
            Stay ahead of the threat — this week&apos;s alerts.
          </h2>
          <a href="#" className="hidden font-display text-sm font-semibold text-cyber-600 underline decoration-cyber-600 underline-offset-4 hover:text-cyber-700 lg:block">All News →</a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cyberNews.map((news, i) => (
            <motion.div key={news.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i*0.07 }}
              className="group flex gap-4 rounded-sm border border-navy-100 bg-paper p-5 transition-shadow hover:shadow-[0_4px_20px_rgb(15,23,42,0.06)] cursor-pointer">
              <div className="w-1 shrink-0 rounded-full" style={{ background: news.color }} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="eyebrow rounded-full px-2 py-0.5" style={{ background: `${news.color}12`, color: news.color }}>{news.category}</span>
                  <span className="eyebrow text-navy-300">{news.date} · {news.readTime} read</span>
                </div>
                <h4 className="font-display text-base font-bold leading-snug text-navy-900 group-hover:text-cyber-600 transition-colors">{news.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

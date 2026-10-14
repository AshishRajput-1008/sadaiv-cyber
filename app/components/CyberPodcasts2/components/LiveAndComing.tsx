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

// ─── LIVE COUNTDOWN ──────────────────────────────────────────────────────────
function LiveCountdown() {
  const [time, setTime] = useState({ h: 3, m: 47, s: 12 })
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s--; if (s < 0) { s = 59; m-- } ; if (m < 0) { m = 59; h-- }; if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="font-mono-label text-3xl font-black text-paper tabular-nums">
      {String(time.h).padStart(2,'0')}:{String(time.m).padStart(2,'0')}:{String(time.s).padStart(2,'0')}
    </span>
  )
}

// ─── WAVEFORM ────────────────────────────────────────────────────────────────
function Waveform({ active, bars = 24 }: { active: boolean; bars?: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, bar) => (
        <span
          key={bar}
          className={`w-[2px] rounded-full transition-colors ${active ? 'bg-cyber-600' : 'bg-navy-100'}`}
          style={{ height: `${6 + ((bar * 7) % 18)}px` }}
        />
      ))}
    </div>
  )
}


const liveSessionsArchive = [
  { title: 'Social Media Fraud: A Live Investigation',   date: 'Jun 10, 2026', viewers: '2.1K', duration: '1:24:00' },
  { title: 'How Hackers Phish Government Employees',    date: 'Jun 3, 2026',  viewers: '1.8K', duration: '58:30'  },
  { title: "Women's Digital Safety Masterclass LIVE",   date: 'May 27, 2026', viewers: '3.2K', duration: '1:10:15'},
]

export default function LiveAndComing() {

  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-navy-900 py-24 md:py-16">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <SectionLabel index="09" label="LIVE & UPCOMING" tone="paper" />
        <h2 className="mt-10 max-w-xl font-display text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
          Cyber live sessions — join experts in real time.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming card */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
            className="rounded-sm border border-cyber-600/30 bg-navy-800 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="eyebrow text-red-400">STARTS IN</span>
                </div>
                <LiveCountdown />
              </div>
              <span className="eyebrow rounded-full border border-red-400/30 bg-red-400/15 px-3 py-1.5 text-red-300">LIVE SOON</span>
            </div>

            <h3 className="font-display text-xl font-extrabold text-paper mb-2">
              Operation Cyber Shield: Inside India&apos;s Biggest Ransomware Takedown
            </h3>
            <p className="text-sm leading-relaxed text-navy-200 mb-8">
              Join IPS Ravi Shankar Mishra &amp; Priya Deshmukh for a live forensics walkthrough of the LockBit 4.0 hospital attack.
            </p>
            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-red-600 py-3 font-display text-sm font-bold text-paper transition-colors hover:bg-red-700">
                🔔 Notify Me
              </button>
              <button className="rounded-sm border border-paper/20 px-5 py-3 font-display text-sm font-semibold text-navy-200 transition-colors hover:border-paper/40">
                📅 Calendar
              </button>
            </div>
          </motion.div>

          {/* Archive */}
          <div className="space-y-4">
            <span className="eyebrow text-navy-400">PAST SESSIONS</span>
            {liveSessionsArchive.map((session, i) => (
              <motion.div key={session.title} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i*0.08 }}
                className="group flex items-center gap-4 rounded-sm border border-paper/10 p-4 transition-colors hover:border-paper/20 cursor-pointer">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-cyber-400/30 bg-cyber-400/15">
                  <Play size={16} className="text-cyber-400" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-semibold text-paper truncate group-hover:text-cyber-300 transition-colors">{session.title}</p>
                  <p className="eyebrow mt-1 text-navy-400">{session.date} · {session.viewers}K watched · {session.duration}</p>
                </div>
                <span className="eyebrow shrink-0 text-navy-400">Replay →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
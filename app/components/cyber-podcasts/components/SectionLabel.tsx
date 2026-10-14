// components/SectionLabel.tsx
'use client'

import { motion } from 'framer-motion'

type Props = {
  index: string
  label: string
  align?: 'left' | 'right'
  tone?: 'navy' | 'paper'
}

/**
 * Recurring structural device used at the top of every section.
 * Encodes the section's position in the broadcast ("signal") rather
 * than decorating — mono index + label + hairline rule, like a
 * timecode burned into a waveform readout.
 */
export default function SectionLabel({ index, label, align = 'left', tone = 'navy' }: Props) {
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

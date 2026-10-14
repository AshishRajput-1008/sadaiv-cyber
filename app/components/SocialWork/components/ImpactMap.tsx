'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const states = [
  {
    id: 'BPL',
    name: 'Bhopal',
    x: 48,
    y: 48,
    programs: ['Education', 'Cyber Security', 'Digital Literacy'],
    count: 18400,
    active: true,
  },
  {
    id: 'IDR',
    name: 'Indore',
    x: 36,
    y: 58,
    programs: ['Health', 'Women Empowerment'],
    count: 15600,
    active: true,
  },
  {
    id: 'GWL',
    name: 'Gwalior',
    x: 58,
    y: 22,
    programs: ['Education', 'Digital Banking'],
    count: 9200,
    active: true,
  },
  {
    id: 'JBP',
    name: 'Jabalpur',
    x: 62,
    y: 48,
    programs: ['Environment', 'Cyber Awareness'],
    count: 11400,
    active: true,
  },
  {
    id: 'UJN',
    name: 'Ujjain',
    x: 34,
    y: 48,
    programs: ['Education', 'Health'],
    count: 7800,
    active: true,
  },
  {
    id: 'SGR',
    name: 'Sagar',
    x: 58,
    y: 38,
    programs: ['Digital Literacy', 'Education'],
    count: 6900,
    active: true,
  },
  {
    id: 'RWA',
    name: 'Rewa',
    x: 74,
    y: 36,
    programs: ['Health', 'Environment'],
    count: 5300,
    active: true,
  },
  {
    id: 'STR',
    name: 'Satna',
    x: 72,
    y: 32,
    programs: ['Education', 'Cyber Security'],
    count: 5100,
    active: true,
  },
  {
    id: 'CTR',
    name: 'Chhatarpur',
    x: 63,
    y: 30,
    programs: ['Women Empowerment'],
    count: 4700,
    active: true,
  },
  {
    id: 'BTL',
    name: 'Betul',
    x: 48,
    y: 68,
    programs: ['Health', 'Environment'],
    count: 4300,
    active: true,
  },
  {
    id: 'HDO',
    name: 'Hoshangabad',
    x: 50,
    y: 58,
    programs: ['Education', 'Digital Literacy'],
    count: 6200,
    active: true,
  },
  {
    id: 'DHR',
    name: 'Dhar',
    x: 28,
    y: 56,
    programs: ['Environment', 'Health'],
    count: 3900,
    active: true,
  },
];

const programColors: Record<string, string> = {
  'Education': '#14532D',
  'Health': '#B45309',
  'Women Empowerment': '#7C3AED',
  'Digital Literacy': '#0369A1',
  'Cyber Awareness': '#BE123C',
  'Environment': '#166534',
};

export default function ImpactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState<string | null>(null);

  const hoveredState = states.find(s => s.id === hovered);

  return (
    <section ref={ref} className="py-28 bg-[#FCFCFA] overflow-hidden">
      <div className="px-10 md:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Presence Map
          </p>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-[#1a1a18] leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            Across India,
            <br />
            <span className="text-[#14532D]">state by state.</span>
          </h2>
        </motion.div>
      </div>

      <div className="px-10 md:px-20 flex flex-col lg:flex-row gap-16 items-start">
        {/* SVG India map — simplified silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full lg:w-[55%]"
        >
          <div className="relative" style={{ paddingBottom: '100%' }}>
            <div className="absolute inset-0">
              {/* India outline as SVG path */}
              <svg viewBox="0 0 100 120" className="w-full h-full" fill="none">
                {/* Simplified India silhouette */}
                <path
                  d="M28 8 L38 5 L52 6 L68 10 L78 18 L82 30 L80 42 L75 50 L72 60 L68 72 L62 82 L58 92 L52 105 L50 115 L48 105 L44 92 L40 82 L34 72 L28 60 L22 50 L18 40 L20 28 L24 18 Z"
                  fill="#F5F1E8"
                  stroke="#14532D"
                  strokeWidth="1"
                />
                {/* State dots */}
                {states.map((state, i) => (
                  <g key={state.id} onMouseEnter={() => setHovered(state.id)} onMouseLeave={() => setHovered(null)}>
                    <motion.circle
                      cx={state.x}
                      cy={state.y}
                      r={hovered === state.id ? 3.5 : 2.5}
                      fill={hovered === state.id ? '#B45309' : '#14532D'}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4, type: 'spring' }}
                      style={{ cursor: 'pointer' }}
                    />
                    {/* Pulse ring */}
                    <motion.circle
                      cx={state.x}
                      cy={state.y}
                      r={4}
                      fill="none"
                      stroke={hovered === state.id ? '#B45309' : '#14532D'}
                      strokeWidth="0.5"
                      opacity={0.4}
                      animate={{ r: [4, 7, 4], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                    {/* State label */}
                    <text
                      x={state.x + 3.5}
                      y={state.y + 0.5}
                      fontSize="2.8"
                      fill="#1a1a18"
                      opacity={hovered === state.id ? 1 : 0.5}
                      style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, cursor: 'pointer' }}
                    >
                      {state.id}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Tooltip card */}
          {hoveredState && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-8 bg-white border border-[#14532D]/20 p-5 shadow-lg max-w-[220px]"
            >
              <p className="font-bold text-[#1a1a18] text-base mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{hoveredState.name}</p>
              <p className="text-[#B45309] text-2xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {hoveredState.count.toLocaleString()}+
              </p>
              <p className="text-[#888880] text-[10px] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>beneficiaries</p>
              <div className="flex flex-wrap gap-1">
                {hoveredState.programs.map(p => (
                  <span
                    key={p}
                    className="text-[9px] px-2 py-0.5 rounded-sm text-white"
                    style={{ fontFamily: 'var(--font-mono)', background: programColors[p] || '#14532D' }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* State list */}
        <div className="w-full lg:w-[45%]">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#888880] mb-8" style={{ fontFamily: 'var(--font-mono)' }}>
            Active states — Hover to explore
          </p>
          <div className="space-y-0">
            {states.map((state, i) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
                onMouseEnter={() => setHovered(state.id)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center justify-between py-4 border-b border-[#1a1a18]/08 cursor-pointer transition-all ${hovered === state.id ? 'pl-3 border-b-[#14532D]/30' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-[10px] tracking-wider text-[#14532D] font-semibold w-8"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {state.id}
                  </span>
                  <span className="text-[#1a1a18] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {state.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {state.programs.slice(0, 2).map(p => (
                      <div key={p} className="w-2 h-2 rounded-full" style={{ background: programColors[p] }} />
                    ))}
                  </div>
                  <span className="text-[#888880] text-xs tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                    {state.count.toLocaleString()}+
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-10 grid grid-cols-2 gap-2">
            {Object.entries(programColors).map(([prog, color]) => (
              <div key={prog} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-[10px] text-[#888880]" style={{ fontFamily: 'var(--font-mono)' }}>{prog}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const events = [
  { id: 1, title: 'Cybersecurity Awareness for BFSI', type: 'Corporate', date: 'Jul 8', month: 'July 2024', city: 'Mumbai', instructor: 'Rahul Sharma', seats: 12, total: 40, mode: 'On-site', live: false, price: '₹4,999/person' },
  { id: 2, title: 'Women Cyber Safety Camp', type: 'Community', date: 'Jul 13', month: 'July 2024', city: 'Bhopal', instructor: 'Neha Singh', seats: 80, total: 150, mode: 'Offline', live: false, price: 'FREE' },
  { id: 3, title: 'Ethical Hacking Bootcamp', type: 'Individual', date: 'Jul 20', month: 'July 2024', city: 'Online', instructor: 'Amit Gupta', seats: 5, total: 50, mode: 'Virtual', live: true, price: '₹6,999' },
  { id: 4, title: 'School Cyber Awareness Drive', type: 'Community', date: 'Jul 27', month: 'July 2024', city: 'Indore', instructor: 'Priya Verma', seats: 200, total: 300, mode: 'Offline', live: false, price: 'FREE' },
  { id: 5, title: 'Incident Response Masterclass', type: 'Corporate', date: 'Aug 3', month: 'August 2024', city: 'Hyderabad', instructor: 'Rahul Sharma', seats: 8, total: 30, mode: 'On-site', live: false, price: '₹12,999/person' },
  { id: 6, title: 'Bug Bounty Intensive', type: 'Individual', date: 'Aug 10', month: 'August 2024', city: 'Online', instructor: 'Amit Gupta', seats: 22, total: 40, mode: 'Virtual', live: false, price: '₹8,499' },
];

const typeColors: Record<string, string> = { Corporate: '#2563EB', Community: '#F59E0B', Individual: '#059669' };
const filters = ['All', 'Corporate', 'Individual', 'Community', 'Virtual', 'Offline'];

export default function UpcomingWorkshops() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? events : events.filter(e => e.type === active || e.mode === active);

  return (
    <section id="upcoming" ref={ref} className="py-28 bg-[#0F172A]">
      <div className="px-10 md:px-20 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#F59E0B] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>📅 Upcoming Sessions</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
              Register Now.<br /><span className="text-white/30 font-light italic">Seats fill fast.</span>
            </h2>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setActive(f)}
                  className={`text-[10px] px-4 py-1.5 transition-all ${active === f ? 'bg-[#2563EB] text-white' : 'border border-white/10 text-white/50 hover:text-white hover:border-white/30'}`}
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Apple Events horizontal schedule */}
      <div className="px-10 md:px-20 space-y-0">
        {filtered.map((ev, i) => (
          <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 py-6 border-b border-white/[0.06] group cursor-pointer hover:pl-2 transition-all">
            
            {/* Date */}
            <div className="flex-shrink-0 w-16 text-center">
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>{ev.date.split(' ')[1]}</p>
              <p className="text-[10px] tracking-wide text-white/30 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>{ev.date.split(' ')[0]}</p>
            </div>

            {/* Type dot */}
            <div className="w-2 h-2 rounded-full flex-shrink-0 hidden md:block" style={{ background: typeColors[ev.type] }} />

            {/* Main info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[9px] px-2.5 py-0.5 text-white" style={{ background: typeColors[ev.type], fontFamily: 'var(--font-mono)' }}>{ev.type}</span>
                {ev.live && <span className="flex items-center gap-1.5 text-[9px] text-red-400" style={{ fontFamily: 'var(--font-mono)' }}><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />LIVE</span>}
                <span className="text-[10px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>{ev.mode}</span>
              </div>
              <p className="font-bold text-white text-base group-hover:text-[#93C5FD] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{ev.title}</p>
              <p className="text-[#64748B] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{ev.city} · {ev.instructor}</p>
            </div>

            {/* Seats */}
            <div className="flex-shrink-0 text-center hidden md:block">
              <p className="text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{ev.seats}</p>
              <p className="text-[10px] text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>seats left</p>
              <div className="mt-1 w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${((ev.total - ev.seats) / ev.total) * 100}%`, background: typeColors[ev.type] }} />
              </div>
            </div>

            {/* Price */}
            <div className="flex-shrink-0 hidden md:block">
              <p className={`font-bold text-sm ${ev.price === 'FREE' ? 'text-[#34d399]' : 'text-[#F59E0B]'}`} style={{ fontFamily: 'var(--font-heading)' }}>{ev.price}</p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0 flex gap-2">
              <button className="text-white text-[10px] px-4 py-2 transition-colors" style={{ background: typeColors[ev.type], fontFamily: 'var(--font-mono)' }}>Register</button>
              <button className="border border-white/10 text-white/50 hover:text-white text-[10px] px-3 py-2 transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>🔔</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

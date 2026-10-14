'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const events = [
  { date: 'May 2024', title: 'National Cyber Conclave — Bhopal', type: 'Corporate + Community', attendees: 840, cities: 6, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80&fit=crop', outcome: 'Inaugural multi-city event with 12 corporate sponsors and 6 government agencies.' },
  { date: 'March 2024', title: 'Women Cyber Safety Yatra — Rajasthan', type: 'Community', attendees: 1200, cities: 4, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80&fit=crop', outcome: 'Touring awareness drive across 4 Rajasthan districts — 1,200 women trained in 9 days.' },
  { date: 'Jan 2024', title: 'University Security Summit — Delhi NCR', type: 'Academic', attendees: 520, cities: 1, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80&fit=crop', outcome: '8 university CTF teams competed. 14 students received corporate internship offers on-site.' },
];

export default function PastEvents() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="past" ref={ref} className="py-28 bg-[#0F172A] px-10 md:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-16">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#F59E0B] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Past Workshops</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
          A record of<br /><span className="text-white/30 font-light italic">real impact.</span>
        </h2>
      </motion.div>

      <div className="space-y-0">
        {events.map((ev, i) => (
          <motion.div key={ev.title} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: i * 0.12 }}
            className="flex flex-col md:flex-row border-b border-white/[0.06] group cursor-pointer">
            
            {/* Image */}
            <div className="w-full md:w-[38%] h-56 md:h-auto relative overflow-hidden">
              <motion.img src={ev.image} alt={ev.title} className="w-full h-full object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F172A]/80 hidden md:block" />
              <div className="absolute top-5 left-5">
                <span className="bg-[#F59E0B] text-white text-[9px] px-2.5 py-1 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>{ev.type}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 py-10 px-0 md:px-12 flex flex-col justify-center px-6">
              <p className="text-[#F59E0B] text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-mono)' }}>{ev.date}</p>
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-[#93C5FD] transition-colors" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>{ev.title}</h3>
              <p className="text-[#94A3B8] text-base leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>{ev.outcome}</p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>{ev.attendees.toLocaleString()}</p>
                  <p className="text-[10px] text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>attendees</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>{ev.cities}</p>
                  <p className="text-[10px] text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>cities</p>
                </div>
                <a href="#" className="ml-auto text-xs text-[#64748B] hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 transition-all" style={{ fontFamily: 'var(--font-mono)' }}>View Report →</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

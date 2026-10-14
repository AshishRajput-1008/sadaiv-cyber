'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const instructors = [
  { name: 'Rahul Sharma', title: 'Lead Cybersecurity Trainer', exp: '9 yrs', certs: ['CEH', 'OSCP', 'CISM'], bio: 'Former CERT-In analyst. Delivered 80+ corporate workshops across India. APT researcher with 3 published threat intelligence reports.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face', color: '#2563EB', workshops: 80 },
  { name: 'Priya Verma', title: 'Digital Safety Educator', exp: '7 yrs', certs: ['Security+', 'CEH'], bio: 'TEDx speaker. Specialises in translating complex cybersecurity into actionable awareness for non-technical audiences. 40,000+ students trained.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop&crop=face', color: '#059669', workshops: 65 },
  { name: 'Amit Gupta', title: 'Ethical Hacking Instructor', exp: '11 yrs', certs: ['OSCP', 'OSEP', 'eWPT'], bio: '200+ CVEs. Leads technical hacking bootcamps and penetration testing masterclasses for both students and law enforcement.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&crop=face', color: '#F59E0B', workshops: 55 },
  { name: 'Neha Singh', title: 'Cyber Law & Women Safety', exp: '8 yrs', certs: ['Cyber Law', 'CHFI'], bio: 'Cyber law consultant who has assisted 300+ online harassment victims. Trains police cyber cells and women\'s groups on digital rights.', image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80&fit=crop&crop=face', color: '#7C3AED', workshops: 42 },
];

export default function Instructors() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [featured, ...rest] = instructors;

  return (
    <section ref={ref} className="py-28 bg-[#FAFAF8]">
      <div className="px-10 md:px-20 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Expert Trainers</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Learn from<br /><span className="text-[#2563EB]">practitioners.</span>
          </h2>
        </motion.div>
      </div>

      {/* Featured instructor — large */}
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
        className="px-10 md:px-20 flex flex-col md:flex-row gap-0 border-b border-[#0F172A]/[0.07] mb-8">
        <div className="w-full md:w-[36%] h-[420px] relative overflow-hidden">
          <img src={featured.image} alt={featured.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-3xl font-black text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>{featured.workshops}</p>
            <p className="text-xs text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>workshops delivered</p>
          </div>
        </div>
        <div className="flex-1 py-12 pl-0 md:pl-14 flex flex-col justify-center">
          <div className="w-10 h-[2px] mb-6" style={{ background: featured.color }} />
          <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: 'var(--font-mono)', color: featured.color }}>{featured.title} · {featured.exp}</p>
          <h3 className="text-3xl font-extrabold text-[#0F172A] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>{featured.name}</h3>
          <p className="text-[#475569] text-base leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-body)' }}>{featured.bio}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {featured.certs.map(c => (
              <span key={c} className="text-xs px-3 py-1.5 border border-[#0F172A]/15 text-[#475569]" style={{ fontFamily: 'var(--font-mono)' }}>{c}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="#upcoming" className="text-white text-xs px-6 py-3" style={{ background: featured.color, fontFamily: 'var(--font-mono)' }}>View Sessions</a>
          </div>
        </div>
      </motion.div>

      {/* Rest */}
      <div className="px-10 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-0">
        {rest.map((inst, i) => (
          <motion.div key={inst.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 + i * 0.09 }}
            className="py-8 pr-0 md:pr-10 border-r border-[#0F172A]/[0.07] last:border-r-0">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 overflow-hidden flex-shrink-0"><img src={inst.image} alt={inst.name} className="w-full h-full object-cover object-top" /></div>
              <div>
                <span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)', color: inst.color }}>{inst.title}</span>
                <p className="font-bold text-[#0F172A]" style={{ fontFamily: 'var(--font-heading)' }}>{inst.name}</p>
                <p className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>{inst.exp} · {inst.workshops} workshops</p>
              </div>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>{inst.bio}</p>
            <div className="flex flex-wrap gap-1">
              {inst.certs.map(c => <span key={c} className="text-[9px] px-2 py-0.5 bg-[#F1F5F9] text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>{c}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

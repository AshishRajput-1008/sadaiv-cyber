'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const corporatePrograms = [
  { name: 'Cybersecurity Awareness', audience: 'All staff', duration: '4h', mode: 'On-site/Virtual', cert: true },
  { name: 'Threat Detection', audience: 'IT teams', duration: '2 days', mode: 'On-site', cert: true },
  { name: 'Incident Response', audience: 'SOC teams', duration: '3 days', mode: 'On-site', cert: true },
  { name: 'Executive Governance', audience: 'C-Suite', duration: '1 day', mode: 'Board room', cert: false },
  { name: 'Secure SDLC', audience: 'Dev teams', duration: '2 days', mode: 'Virtual/On-site', cert: true },
  { name: 'Red Team vs Blue Team', audience: 'Security pros', duration: '2 days', mode: 'On-site lab', cert: true },
];

const individualPrograms = [
  { name: 'Personal Cyber Safety', level: 'Beginner', career: 'Any', salary: '—', cert: 'SYF Certificate' },
  { name: 'Ethical Hacking', level: 'Intermediate', career: 'Security Analyst', salary: '₹6–12 LPA', cert: 'CEH Aligned' },
  { name: 'Bug Bounty', level: 'Advanced', career: 'Bug Hunter', salary: '₹8–25 LPA', cert: 'Portfolio' },
  { name: 'OSINT Investigation', level: 'Intermediate', career: 'Threat Intel', salary: '₹7–15 LPA', cert: 'SYF Badge' },
  { name: 'Python for Security', level: 'Intermediate', career: 'Security Dev', salary: '₹8–18 LPA', cert: 'Project' },
  { name: 'Career Mentorship', level: 'All levels', career: 'All tracks', salary: 'Varies', cert: '—' },
];

const communityPrograms = [
  { name: 'School Cyber Awareness', audience: 'Ages 10–17', capacity: '100+', free: true },
  { name: 'Women Cyber Safety', audience: 'Women 18+', capacity: '50–200', free: true },
  { name: 'UPI Fraud Prevention', audience: 'General public', capacity: '200+', free: true },
  { name: 'Senior Citizen Safety', audience: '55+ adults', capacity: '30–80', free: true },
  { name: 'Digital Parenting', audience: 'Parents', capacity: '50–100', free: true },
  { name: 'Village Digital Literacy', audience: 'Rural communities', capacity: '50–300', free: true },
];

function CorporateSection({ isInView }: { isInView: boolean }) {
  return (
    <div id="corporate" className="py-24 bg-[#F5F7FA] px-10 md:px-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Visual side */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }} className="w-full lg:w-[40%] relative">
          <div className="relative h-[520px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop" alt="Corporate Workshop" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="bg-[#2563EB] text-white text-[9px] px-3 py-1.5 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Corporate</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white/50 text-xs mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Featured outcome</p>
              <p className="text-white text-lg font-semibold leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>"Zero phishing click-through rate after SYF Awareness Training — HDFC Bank regional branch."</p>
            </div>
          </div>
          {/* Floating program count */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
            className="absolute -right-6 top-12 bg-white shadow-xl p-5 border-t-4 border-[#2563EB]">
            <p className="text-3xl font-black text-[#2563EB]" style={{ fontFamily: 'var(--font-heading)' }}>11</p>
            <p className="text-xs text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>Programs available</p>
          </motion.div>
        </motion.div>

        {/* Content side */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="w-full lg:w-[60%]">
          <div className="w-10 h-[2px] bg-[#2563EB] mb-6" />
          <h3 className="text-4xl font-extrabold text-[#0F172A] leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            Secure Your Organisation<br />From The Inside Out
          </h3>
          <p className="text-[#475569] text-lg leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
            Expert-led cybersecurity training tailored to your industry, threat landscape, compliance requirements, and workforce. From boardroom to tech team.
          </p>

          <div className="space-y-0">
            {corporatePrograms.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-center justify-between py-4 border-b border-[#0F172A]/[0.07] group cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-[#94A3B8] w-5" style={{ fontFamily: 'var(--font-mono)' }}>{String(i+1).padStart(2,'0')}</span>
                  <div>
                    <p className="font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</p>
                    <p className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>{p.audience} · {p.mode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>{p.duration}</span>
                  {p.cert && <span className="text-[9px] bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5" style={{ fontFamily: 'var(--font-mono)' }}>Cert</span>}
                  <span className="text-[#2563EB] text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: 'var(--font-mono)' }}>→</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <a href="#contact" className="bg-[#2563EB] text-white text-xs px-6 py-3 hover:bg-[#1d4ed8] transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>Request Proposal</a>
            <a href="#" className="border border-[#0F172A]/20 text-[#0F172A] text-xs px-6 py-3 hover:bg-[#0F172A] hover:text-white transition-all" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>Download Brochure</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IndividualSection({ isInView }: { isInView: boolean }) {
  return (
    <div id="individual" className="py-24 bg-[#FAFAF8] px-10 md:px-20">
      <div className="flex flex-col lg:flex-row-reverse gap-16">
        {/* Visual */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }} className="w-full lg:w-[40%] relative">
          <div className="h-[520px] overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fit=crop" alt="Individual Learning" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 to-transparent" />
            <span className="absolute top-6 left-6 bg-[#059669] text-white text-[9px] px-3 py-1.5 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Individual</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="w-full lg:w-[60%]">
          <div className="w-10 h-[2px] bg-[#059669] mb-6" />
          <h3 className="text-4xl font-extrabold text-[#0F172A] leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            Become<br /><span className="text-[#059669]">Cyber Ready</span>
          </h3>
          <p className="text-[#475569] text-lg leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
            Designed for students, developers, freelancers, and remote professionals building practical cybersecurity skills for real career outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {individualPrograms.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.07 }}
                className="py-4 pr-6 border-b border-[#0F172A]/[0.07] cursor-pointer group hover:pl-2 transition-all">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#059669] transition-colors text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] px-2 py-0.5 bg-[#ECFDF5] text-[#059669]" style={{ fontFamily: 'var(--font-mono)' }}>{p.level}</span>
                  {p.salary !== '—' && <span className="text-[10px] text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>{p.salary}</span>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <a href="#contact" className="bg-[#059669] text-white text-xs px-6 py-3 hover:bg-[#047857] transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>Enroll Now</a>
            <a href="#" className="text-[#059669] text-xs border border-[#059669]/30 px-6 py-3 hover:bg-[#059669] hover:text-white transition-all" style={{ fontFamily: 'var(--font-mono)' }}>View Roadmap</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CommunitySection({ isInView }: { isInView: boolean }) {
  return (
    <div id="community" className="py-24 bg-[#FFFBEB] px-10 md:px-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Visual */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }} className="w-full lg:w-[45%] relative">
          <div className="h-[500px] overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80&fit=crop" alt="Community Workshop" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 to-transparent" />
            <span className="absolute top-6 left-6 bg-[#F59E0B] text-white text-[9px] px-3 py-1.5 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Community</span>
            <div className="absolute bottom-8 left-8">
              <p className="text-[#F59E0B] text-xs mb-1 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Always free</p>
              <p className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>For every citizen</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="w-full lg:w-[55%]">
          <div className="w-10 h-[2px] bg-[#F59E0B] mb-6" />
          <h3 className="text-4xl font-extrabold text-[#0F172A] leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            Cyber Safety For<br /><span className="text-[#F59E0B]">Every Citizen</span>
          </h3>
          <p className="text-[#475569] text-lg leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
            Because cybersecurity should never be limited to IT professionals. We bring awareness where it matters most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityPrograms.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.07 }}
                className="bg-white p-5 group cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-[#F59E0B]/30">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-[#0F172A] text-sm group-hover:text-[#F59E0B] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</p>
                  {p.free && <span className="text-[9px] bg-[#FEF3C7] text-[#D97706] px-2 py-0.5 flex-shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>FREE</span>}
                </div>
                <p className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)' }}>{p.audience} · Cap: {p.capacity}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <a href="#contact" className="bg-[#F59E0B] text-white text-xs px-6 py-3 hover:bg-[#D97706] transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>Register Community</a>
            <a href="#" className="text-[#F59E0B] text-xs border border-[#F59E0B]/40 px-6 py-3 hover:bg-[#F59E0B] hover:text-white transition-all" style={{ fontFamily: 'var(--font-mono)' }}>Download Toolkit</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FeaturedCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="categories" ref={ref} className="overflow-hidden">
      <div className="px-10 md:px-20 py-16 bg-[#FAFAF8]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#2563EB] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Workshop Programs</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
            Three tracks.<br /><span className="italic font-light text-[#0F172A]/40">One mission.</span>
          </h2>
        </motion.div>
      </div>
      <CorporateSection isInView={isInView} />
      <IndividualSection isInView={isInView} />
      <CommunitySection isInView={isInView} />
    </section>
  );
}

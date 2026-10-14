'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Corporate', href: '#corporate' },
  { label: 'Individual', href: '#individual' },
  { label: 'Community', href: '#community' },
  { label: 'Upcoming Events', href: '#upcoming' },
  { label: 'Past Workshops', href: '#past' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Testimonials', href: '#stories' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function QuickNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Corporate');
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 90);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
      className={`mt-32 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-[#FAFAF8]'} border-b border-[#0F172A]/[0.07]`}>
      <div className="px-10 md:px-20 flex items-center overflow-x-auto scrollbar-hide">
        {navItems.map(item => (
          <a key={item.label} href={item.href} onClick={() => setActive(item.label)}
            className={`flex-shrink-0 px-5 py-4 text-xs border-b-2 transition-all whitespace-nowrap ${
              active === item.label ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#0F172A]/20'
            }`} style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            {item.label}
          </a>
        ))}
        <div className="ml-auto pl-6 flex-shrink-0">
          <a href="#contact" className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[10px] px-4 py-2 my-2 hover:bg-[#1d4ed8] transition-colors tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
            Get a Quote →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

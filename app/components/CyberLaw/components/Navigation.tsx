import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Crimes', href: '#crimes' },
  { label: 'Laws', href: '#laws' },
  { label: 'Rights', href: '#rights' },
  { label: 'Report', href: '#report' },
  { label: 'Safety', href: '#safety' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => handleNav('#hero')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                <Scale className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                CyberLaw<span className="text-brand-600">.in</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-600/25 hover:shadow-brand-700/30 transition-all duration-300"
              >
                Report Crime
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="w-full py-4 text-lg font-medium text-slate-700 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-all"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 py-4 text-center text-lg font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl"
              >
                Report Crime
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { motion } from 'framer-motion';
import { Scale, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 to-slate-900" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Scale className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                CyberLaw<span className="text-brand-400">.in</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              A comprehensive reference for understanding cyber laws in India. Know your rights, understand the laws, and stay protected in the digital world.
            </p>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-brand-400" />
              <span className="text-sm text-slate-400">Knowledge is your strongest defense</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Crimes & Laws', href: '#crimes' },
                { label: 'Cyber Laws', href: '#laws' },
                { label: 'Digital Rights', href: '#rights' },
                { label: 'Report Crime', href: '#report' },
                { label: 'Safety Rules', href: '#safety' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'National Cyber Crime Portal', href: 'https://cybercrime.gov.in' },
                { label: 'CERT-In', href: 'https://www.cert-in.org.in' },
                { label: 'Cyber Crime Helpline: 1930', href: 'tel:1930' },
                { label: 'IT Act 2000 Full Text', href: 'https://www.meity.gov.in' },
                { label: 'DPDP Act 2023', href: 'https://www.meity.gov.in' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('#') ? undefined : '_blank'}
                    rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                    {!link.href.startsWith('#') && !link.href.startsWith('tel:') && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Cyber Laws of India — Educational Reference Only. Not Legal Advice.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-slate-600"
          >
            Built with care for a safer digital India
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

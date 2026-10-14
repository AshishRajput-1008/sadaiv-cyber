import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Siren, Globe, BookOpen, ShieldAlert, Phone, ExternalLink,
} from 'lucide-react';

const resources = [
  { icon: Siren, title: 'Cyber Crime Reporting', desc: 'Report incidents to the National Cyber Crime Portal or call the helpline for immediate assistance.', action: 'Report Now', gradient: 'from-emerald-400 to-emerald-600', shadowColor: 'shadow-emerald-500/20', link: '#' },
  { icon: Globe, title: 'CERT-In', desc: 'Indian Computer Emergency Response Team — the national agency for cyber incident response and security advisories.', action: 'Visit CERT-In', gradient: 'from-teal-400 to-teal-600', shadowColor: 'shadow-teal-500/20', link: '#' },
  { icon: BookOpen, title: 'Digital Safety Guides', desc: 'Step-by-step guides for securing your devices, accounts, and personal data against common threats.', action: 'Read Guides', gradient: 'from-cyan-400 to-cyan-600', shadowColor: 'shadow-cyan-500/20', link: '#' },
  { icon: ShieldAlert, title: 'Cyber Awareness Materials', desc: 'Educational resources, infographics, and training materials to build cyber awareness in your community.', action: 'Access Materials', gradient: 'from-emerald-500 to-teal-500', shadowColor: 'shadow-emerald-500/20', link: '#' },
  { icon: Phone, title: 'Emergency Help Resources', desc: 'Helpline numbers, local cyber cells, and support organizations for victims of cyber crime.', action: 'Get Help', gradient: 'from-teal-500 to-cyan-500', shadowColor: 'shadow-teal-500/20', link: '#' },
];

export default function SafetyToolkit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="toolkit" ref={ref} className="relative section-padding bg-gradient-to-b from-white to-mint-50 overflow-hidden">
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-emerald-100/25 gradient-blob" />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-cyan-100/20 gradient-blob" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Section 07
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Cyber Safety <span className="text-gradient-teal">Toolkit</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 text-lg max-w-2xl mx-auto mb-16"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Essential resources and tools to protect yourself and report incidents.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className={`group ${i === resources.length - 1 && resources.length % 3 === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="h-full p-6 rounded-3xl glass-strong shadow-lg hover-lift cursor-default flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${res.gradient} flex items-center justify-center mb-5 shadow-lg ${res.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                  <res.icon className="w-7 h-7 text-white" />
                </div>

                <h3
                  className="font-bold text-gray-900 text-lg mb-2"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {res.title}
                </h3>
                <p
                  className="text-sm text-gray-500 leading-relaxed mb-6 flex-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {res.desc}
                </p>

                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 group-hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {res.action}
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-2xl shadow-emerald-500/20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className="font-bold text-lg"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  Cyber Crime Helpline
                </p>
                <p
                  className="text-emerald-100 text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  24x7 National Helpline for Cyber Crime Victims
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p
                className="text-3xl sm:text-4xl font-extrabold"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                1930
              </p>
              <p
                className="text-emerald-100 text-xs"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Toll Free Number
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
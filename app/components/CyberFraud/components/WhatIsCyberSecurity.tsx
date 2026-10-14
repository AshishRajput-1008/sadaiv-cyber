import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, User, Globe, ChevronRight } from 'lucide-react';

const flowSteps = [
  {
    icon: Shield,
    title: 'Digital Shield',
    desc: 'Firewalls, encryption, and security protocols',
    gradient: 'from-emerald-400 to-emerald-600',
    shadow: 'shadow-emerald-500/25',
  },
  {
    icon: User,
    title: 'Protected User',
    desc: 'Safe browsing, secure accounts, privacy controls',
    gradient: 'from-teal-400 to-teal-600',
    shadow: 'shadow-teal-500/25',
  },
  {
    icon: Globe,
    title: 'Safe Online Experience',
    desc: 'Trusted connections, verified platforms, secure data',
    gradient: 'from-cyan-400 to-cyan-600',
    shadow: 'shadow-cyan-500/25',
  },
];

export default function WhatIsCyberSecurity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="what-is-cybersecurity" ref={ref} className="relative section-padding bg-gradient-to-b from-white to-mint-50 overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-emerald-100/40 gradient-blob" />
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-cyan-100/30 gradient-blob" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            Section 01
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          What Protects You In The
          <br />
          <span className="text-gradient-emerald">Digital World?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-gray-500 text-lg max-w-3xl mx-auto mb-16 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Cyber Security is the practice of protecting computers, networks, devices, applications, and personal information from unauthorized access, attacks, and digital threats. It is your invisible armor in the connected world.
        </motion.p>

        {/* Flow visualization */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {flowSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
              className="flex items-center gap-6"
            >
              <div className="group relative">
                <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`relative w-48 sm:w-56 p-6 rounded-3xl glass-strong ${step.shadow} shadow-xl hover-lift cursor-default`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-lg ${step.shadow}`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3
                    className="font-bold text-gray-900 text-lg mb-1"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>

              {i < flowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
                  className="hidden md:flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-emerald-600" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 h-1 w-32 mx-auto bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full origin-center"
        />
      </div>
    </section>
  );
}
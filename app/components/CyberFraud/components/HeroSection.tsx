'use client';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock, Eye, Fingerprint, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e17]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0d1420] to-[#0a0e17]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-emerald-500/8 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">

        {/* Badge */}
 

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bold leading-[1.08] tracking-tight mb-8"
style={{ fontSize: 'clamp(42px, 7vw, 82px)', fontFamily: 'var(--font-ui)' }}
        >
          
          <br />
          <span className="text-white">Recognize </span>
          <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Online Scams.
          </span>
          <br />
          <span className="text-white">Protect Your </span>
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Digital Life.
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-3 mb-8 origin-center"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500/50" />
          <Shield className="w-4 h-4 text-emerald-400/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500/50" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed font-light"
style={{ fontFamily: 'var(--font-body)' }}
        >
          Your comprehensive guide to understanding cyber crime, recognizing
          threats, and safeguarding your digital world.
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-8 sm:gap-14 mb-14"
        >
          {[
            { icon: Lock, label: 'Encrypted' },
            { icon: Eye, label: 'Vigilant' },
            { icon: Fingerprint, label: 'Verified' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs text-slate-500 tracking-widest uppercase"
style={{ fontFamily: 'var(--font-body)' }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#what-is-cybersecurity"
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0a0e17] font-semibold rounded-xl shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
style={{ fontFamily: 'var(--font-body)' }}
          >
            Explore Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#golden-rules"
            className="px-8 py-4 border border-slate-700 bg-slate-900/50 backdrop-blur-sm text-slate-200 font-semibold rounded-xl hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all duration-300"
style={{ fontFamily: 'var(--font-body)' }}
          >
            Safety Rules
          </a>
        </motion.div>
      </div>

      {/* Bottom fade — matches the next section's bg */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
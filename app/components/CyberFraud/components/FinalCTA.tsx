import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scale, Siren, BrainCircuit, Shield, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cta" ref={ref} className="relative section-padding bg-gradient-to-b from-mint-50 via-white to-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-200/20 gradient-blob" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-200/15 gradient-blob" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-teal-100/10 gradient-blob" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8 inline-flex"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Stay Alert.
          <br />
          <span className="text-gradient-emerald">Stay Secure.</span>
          <br />
          Stay Protected.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Cyber threats evolve every day. Stay informed, stay vigilant, and take action to protect yourself and those around you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Scale className="w-5 h-5" />
            Learn Cyber Laws
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-2xl shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Siren className="w-5 h-5" />
            Report Cyber Crime
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            className="group w-full sm:w-auto px-8 py-4 glass rounded-2xl font-semibold text-gray-700 hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <BrainCircuit className="w-5 h-5 text-teal-500" />
            Cyber Safety Quiz
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 pt-8 border-t border-gray-200/50"
        >
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Cyber Crime Awareness Center — Empowering digital safety through knowledge.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
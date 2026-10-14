"use client";
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderSearch, Camera, Receipt, FileText, Search, ArrowRight } from 'lucide-react';
import { reportSteps } from "@/app/data/crimes";

const iconMap: Record<string, React.ElementType> = {
  FolderSearch, Camera, Receipt, FileText, Search,
};

function ReportStep({ step, index, isLast }: { step: typeof reportSteps[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[step.icon] || FileText;

  return (
    <div ref={ref} className={`relative flex items-start gap-8 lg:gap-16 ${isLast ? '' : 'pb-16'}`}>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-white border-2 border-brand-300 flex items-center justify-center shadow-lg shadow-brand-500/10"
      >
        <span className="text-2xl font-black text-brand-700" style={{ fontFamily: 'var(--font-ui)' }}>
          {step.step}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="flex-1 pt-2"
      >
        <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-500 hover:border-brand-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-ui)' }}>
              {step.title}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {step.description}
          </p>
        </div>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex absolute left-1/2 top-20 -translate-x-1/2 items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-5 h-5 text-brand-400 rotate-90" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default function ReportSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="report" className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-brand-50/20 to-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      <div className="relative max-w-5xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-6"
          >
            <FileText className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-semibold text-brand-700" style={{ fontFamily: 'var(--font-body)' }}>
              Step-by-Step Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            <span className="text-slate-900">Report </span>
            <span className="text-brand-600">Cyber Crime</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Follow these 5 steps to effectively report a cyber crime and begin the legal process.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-200 via-brand-400 to-brand-200 lg:-translate-x-px" />
          {reportSteps.map((step, i) => (
            <ReportStep key={step.step} step={step} index={i} isLast={i === reportSteps.length - 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center mt-16"
        >
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-2xl shadow-xl shadow-brand-600/25 hover:shadow-brand-700/30 transition-all duration-300 group"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            File Your Complaint Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-4 text-sm text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>
            National Cyber Crime Portal &bull; Helpline: 1930
          </p>
        </motion.div>
      </div>
    </section>
  );
}

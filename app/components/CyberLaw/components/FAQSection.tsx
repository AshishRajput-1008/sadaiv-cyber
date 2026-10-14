"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from "@/app/data/crimes";

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-500 ${
        isOpen
          ? 'bg-white border-brand-300 shadow-lg shadow-brand-500/5'
          : 'bg-white border-slate-200 hover:border-brand-200 hover:bg-brand-50/30'
      }`}
    >
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-6 text-left">
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            isOpen
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
              : 'bg-brand-50 text-brand-700 border border-brand-100'
          }`}
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className={`flex-1 text-base md:text-lg font-semibold transition-colors duration-300 ${
            isOpen ? 'text-brand-800' : 'text-slate-800'
          }`}
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-brand-600' : 'text-slate-400'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-[3.5rem]">
              <div className="border-t border-brand-100 pt-4">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-gradient-to-b from-surface-50 to-white overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-100/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-100/15 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-6">
            <HelpCircle className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-semibold text-brand-700" style={{ fontFamily: 'var(--font-body)' }}>
              Common Questions Answered
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            <span className="text-slate-900">Ask a </span>
            <span className="text-brand-600">Cyber Law Expert</span>
          </h2>
          <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Get answers to the most frequently asked questions about cyber laws in India.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

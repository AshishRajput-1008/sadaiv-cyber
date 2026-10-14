import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  MailWarning, Lock, UserX, Store, Users, Server,
  Smartphone, MessageSquare, HandCoins, Share2, ChevronDown, AlertTriangle,
} from 'lucide-react';

interface Category {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  shadowColor: string;
  description: string;
  examples: string[];
  severity: 'High' | 'Critical' | 'Medium';
}

const categories: Category[] = [
  { id: 'phishing', title: 'Phishing Attacks', icon: MailWarning, gradient: 'from-red-400 to-red-600', shadowColor: 'shadow-red-500/20', description: 'Fraudulent emails, messages, or websites designed to steal sensitive information.', examples: ['Fake bank emails', 'Fake delivery messages', 'Fake account verification links'], severity: 'Critical' },
  { id: 'ransomware', title: 'Ransomware Attacks', icon: Lock, gradient: 'from-orange-400 to-red-500', shadowColor: 'shadow-orange-500/20', description: 'Malware that locks files and demands money to restore access.', examples: ['WannaCry', 'Business ransomware', 'Data hostage attacks'], severity: 'Critical' },
  { id: 'identity', title: 'Identity Theft', icon: UserX, gradient: 'from-amber-400 to-orange-500', shadowColor: 'shadow-amber-500/20', description: 'Stealing personal information to impersonate victims.', examples: ['Aadhaar misuse', 'PAN card fraud', 'Fake social profiles'], severity: 'High' },
  { id: 'scams', title: 'Online Scams', icon: Store, gradient: 'from-yellow-400 to-amber-500', shadowColor: 'shadow-yellow-500/20', description: 'Fake offers designed to steal money from unsuspecting victims.', examples: ['Lottery scams', 'Fake shopping websites', 'Investment scams'], severity: 'High' },
  { id: 'social-eng', title: 'Social Engineering', icon: Users, gradient: 'from-emerald-400 to-teal-500', shadowColor: 'shadow-emerald-500/20', description: 'Manipulating human behavior for fraud and deception.', examples: ['Fake support calls', 'Authority impersonation', 'Emotional manipulation'], severity: 'High' },
  { id: 'breach', title: 'Data Breaches', icon: Server, gradient: 'from-teal-400 to-cyan-500', shadowColor: 'shadow-teal-500/20', description: 'Unauthorized access to sensitive information databases.', examples: ['Customer database leaks', 'Employee record exposure', 'Financial data theft'], severity: 'Critical' },
  { id: 'upi', title: 'UPI Fraud', icon: Smartphone, gradient: 'from-cyan-400 to-blue-500', shadowColor: 'shadow-cyan-500/20', description: 'Fraudulent transactions through UPI payment systems.', examples: ['Fake payment screenshots', 'Collect request scams', 'QR code fraud'], severity: 'High' },
  { id: 'otp', title: 'OTP Fraud', icon: MessageSquare, gradient: 'from-indigo-400 to-purple-500', shadowColor: 'shadow-indigo-500/20', description: 'Tricking victims into sharing one-time passwords.', examples: ['Fake bank calls', 'KYC update scams', 'Account verification scams'], severity: 'Critical' },
  { id: 'loan', title: 'Fake Loan Apps', icon: HandCoins, gradient: 'from-purple-400 to-pink-500', shadowColor: 'shadow-purple-500/20', description: 'Fraudulent lending applications that exploit users.', examples: ['Instant loan fraud', 'Data blackmail', 'Harassment by fake lenders'], severity: 'High' },
  { id: 'social', title: 'Social Media Fraud', icon: Share2, gradient: 'from-pink-400 to-rose-500', shadowColor: 'shadow-pink-500/20', description: 'Deceptive activities on social networking platforms.', examples: ['Fake giveaways', 'Account hijacking', 'Impersonation scams'], severity: 'Medium' },
];

export default function CrimeCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="categories" ref={ref} className="relative section-padding bg-gradient-to-b from-mint-50 to-white overflow-hidden">
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-emerald-100/20 gradient-blob" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-cyan-100/20 gradient-blob" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Section 03
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          Explore <span className="text-gradient-emerald">Cyber Crime</span>
          <br />Categories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 text-lg max-w-2xl mx-auto mb-16"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Each category represents a unique threat vector. Tap to explore case details.
        </motion.p>

        <div className="space-y-4">
          {categories.map((cat, i) => {
            const isExpanded = expandedId === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
              >
                <button
                  onClick={() => toggleExpand(cat.id)}
                  className={`w-full text-left rounded-2xl transition-all duration-500 overflow-hidden ${
                    isExpanded
                      ? 'glass-strong shadow-2xl ring-1 ring-emerald-200/50'
                      : 'glass shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-4 p-5 sm:p-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg ${cat.shadowColor} shrink-0`}>
                      <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3
                          className="font-bold text-gray-900 text-lg truncate"
                          style={{ fontFamily: 'var(--font-ui)' }}
                        >
                          {cat.title}
                        </h3>
                        <span
                          className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                            cat.severity === 'Critical'
                              ? 'bg-red-100 text-red-600'
                              : cat.severity === 'High'
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {cat.severity}
                        </span>
                      </div>
                      <p
                        className="text-sm text-gray-500 line-clamp-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {cat.description}
                      </p>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 border-t border-gray-100/80 pt-4">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <span
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              Common Examples
                            </span>
                          </div>
                          <div className="grid gap-2">
                            {cat.examples.map((ex, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: j * 0.1 }}
                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80"
                              >
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${cat.gradient}`} />
                                <span
                                  className="text-sm text-gray-700"
                                  style={{ fontFamily: 'var(--font-body)' }}
                                >
                                  {ex}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
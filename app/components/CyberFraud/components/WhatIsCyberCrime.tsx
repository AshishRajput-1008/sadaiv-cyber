import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  DollarSign,
  Database,
  UserX,
  MessageCircleWarning,
  CreditCard,
  KeyRound,
  Skull,
  Bug,
  BadgeAlert,
} from 'lucide-react';

const crimeExamples = [
  { icon: DollarSign, label: 'Money Theft', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Database, label: 'Data Theft', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: UserX, label: 'Identity Theft', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: MessageCircleWarning, label: 'Online Harassment', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: CreditCard, label: 'Financial Fraud', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: KeyRound, label: 'Account Hacking', color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function WhatIsCyberCrime() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="what-is-cybercrime" ref={ref} className="relative section-padding bg-white overflow-hidden">
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-teal-100/30 gradient-blob" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-emerald-100/25 gradient-blob" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Section 02
          </span>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Animated illustration area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Central hacker illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Animated code rain effect */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [-20, 200] }}
                        transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
                        className="absolute text-green-400 text-xs font-mono whitespace-nowrap"
                        style={{ left: `${i * 12}%`, top: -20 }}
                      >
                        0x4F2A
                      </motion.div>
                    ))}
                  </div>

                  <Skull className="w-16 h-16 text-emerald-400 mb-3 relative z-10" />
                  <span
                    className="text-emerald-400 font-mono text-sm relative z-10"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    HACKER.exe
                  </span>
                  <Bug className="w-6 h-6 text-red-400 absolute top-4 right-4 animate-pulse" />
                </div>
              </div>

              {/* Orbiting threat icons */}
              {[
                { angle: 0, icon: KeyRound, color: 'text-red-500' },
                { angle: 72, icon: CreditCard, color: 'text-amber-500' },
                { angle: 144, icon: Database, color: 'text-blue-500' },
                { angle: 216, icon: UserX, color: 'text-purple-500' },
                { angle: 288, icon: BadgeAlert, color: 'text-orange-500' },
              ].map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 150;
                const y = Math.sin(rad) * 150;
                return (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30 + i * 5, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', left: '50%', top: '50%' }}
                    className="w-8 h-8 -ml-4 -mt-4"
                  >
                    <motion.div
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      whileHover={{ scale: 1.3 }}
                      className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center"
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              What Is <span className="text-gradient-emerald">Cyber Crime?</span>
            </h2>

            <p
              className="text-lg text-gray-500 leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Cyber Crime refers to illegal activities performed using computers, digital devices, or the internet to steal information, money, identity, or disrupt systems. It is the dark side of our connected world — growing smarter and more dangerous every day.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {crimeExamples.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-4 rounded-2xl ${item.bg} flex flex-col items-center gap-2 cursor-default transition-all duration-300 ${
                    hoveredIdx === i ? 'scale-105 shadow-lg' : ''
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span
                    className="text-xs sm:text-sm font-semibold text-gray-700 text-center"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
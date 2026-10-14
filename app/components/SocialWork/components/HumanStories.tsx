'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import boss from "@/public/images/boss.png"
import varun from "@/public/images/varunsir.png"
import ManishSen from "@/public/images/manishSen.png"

const stories = [
  {
    name: 'Divendu Prakash Verma',
    age: 28,
    role: 'Primary school teacher, SYF Education Volunteer',
    location: 'Sehore, Madhya Pradesh',
    quote: 'The day I saw Raju read his first sentence aloud, I understood why this work matters. He had been out of school for three years.',
    story: 'Kavita joined Sadaiv Yuva Foundation in 2020 after seeing dropout rates in her village skyrocket post-COVID. She now coordinates learning centers across 6 villages and has personally mentored 140 children back into formal schooling.',
    impact: '140 children re-enrolled',
    image: boss.src,
    accent: '#14532D',
  },
  {
    name: 'Varun Kumar Sen',
    age: 24,
    role: 'Cyber Safety Trainer, SYF Digital Unit',
    location: 'Bhopal, Madhya Pradesh',
    quote: 'A 13-year-old girl showed me a WhatsApp message she nearly responded to. It was a blackmail scam. That changed the way I teach.',
    story: 'A computer science graduate who chose field work over corporate placement, Arjun designed SYF\'s school-based cyber safety curriculum that is now used in 114 schools across three states. He has trained over 8,000 students in digital safety.',
    impact: '8,000 students trained',
    image: varun.src,
    accent: '#B45309',
  },
  // {
  //   name: 'Advocate Manish Sen',
  //   age: 45,
  //   role: 'Shakti Circle Leader, Women Empowerment',
  //   location: 'Tonk District, Rajasthan',
  //   quote: 'Before Shakti Circle, I had never held a passbook in my name. Now I run a SHG with 18 women and we have our own savings fund.',
  //   story: 'Sunita was one of the first participants of SYF\'s women empowerment program in Rajasthan. Today she is a facilitator herself — leading financial literacy sessions in her district and helping other women form self-help groups independently.',
  //   impact: '18 women in her SHG',
  //   image: ManishSen.src,
  //   accent: '#14532D',
  // },
];

export default function HumanStories() {
  return (
    <section className="py-28 bg-[#1a1a18] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 px-10 md:px-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#B45309] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            Human Stories
          </p>
          <h2
            className="text-5xl md:text-6xl font-extrabold text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
          >
            The faces behind
            <br />
            <span className="text-[#F5F1E8]/40 italic font-light">the numbers.</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-0">
        {stories.map((person, i) => {
          const ref = useRef<HTMLDivElement>(null);
          const isInView = useInView(ref, { once: true, margin: '-80px' });

          return (
            <motion.div
              key={person.name}
              ref={ref}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} border-t border-white/[0.06]`}
            >
              {/* Portrait */}
              <div className="w-full md:w-[38%] relative">
                <div
                  className="h-[400px] md:h-[540px] w-full"
                  style={{
                    backgroundImage: `url('${person.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    filter: 'grayscale(30%)',
                  }}
                />
                {/* Impact badge */}
                <div className="absolute bottom-8 left-8">
                  <div className="bg-[#B45309] px-4 py-2">
                    <p className="text-white text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>{person.impact}</p>
                  </div>
                </div>
              </div>

              {/* Story content */}
              <div className="w-full md:w-[62%] flex flex-col justify-center px-10 md:px-20 py-16">
                <motion.div
                  initial={{ x: i % 2 === 0 ? 40 : -40, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Quote mark */}
                  <div className="text-[120px] leading-none text-white/[0.06] font-serif mb-[-40px]" style={{ fontFamily: 'Georgia' }}>"</div>

                  <blockquote
                    className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-10 italic"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {person.quote}
                  </blockquote>

                  <div className="w-10 h-[2px] mb-8" style={{ background: person.accent }} />

                  <p className="text-white/60 leading-relaxed text-base mb-10" style={{ fontFamily: 'var(--font-body)' }}>
                    {person.story}
                  </p>

                  <div className="flex flex-col gap-1">
                    <p className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                      {person.name}, {person.age}
                    </p>
                    <p className="text-white/40 text-xs tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
                      {person.role}
                    </p>
                    <p className="text-white/30 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                      {person.location}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

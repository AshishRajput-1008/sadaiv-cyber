"use client";
import Image from "next/image";
import logo1 from "@/Assests/images/logo.png";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

import sadaivsatyalogo from "@/Assests/images/collab/sadavsatyalogo101.png"
import payzonindialogo from "@/Assests/images/collab/payzonindia logo (2).png"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

// ─── Utility: Animated Counter ────────────────────────────────────────────────

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Section 1: Cinematic Hero ─────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const metrics = [
    { value: 50000, suffix: "+", label: "People Reached" },
    { value: 300, suffix: "+", label: "Digital Sessions" },
    { value: 85, suffix: "+", label: "Community Drives" },
    { value: 50, suffix: "+", label: "Strategic Partners" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#0A0F1E]"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Parallax background collage */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Layered photographic grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-40">
          {[
            "bg-[url('/collab/workshop.jpg')]",
            "bg-[url('/collab/classroom.jpg')]",
            "bg-[url('/collab/community.jpg')]",
            "bg-[url('/collab/cyberlab.jpg')]",
            "bg-[url('/collab/volunteers.jpg')]",
            "bg-[url('/collab/corporate.jpg')]",
          ].map((bg, i) => (
            <div
              key={i}
              className={`${bg} bg-cover bg-center`}
              style={{ backgroundImage: `url('/images/collab-${i + 1}.jpg')` }}
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/60 via-[#0A0F1E]/40 to-[#0A0F1E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E]/80 via-transparent to-[#0A0F1E]/40" />
      </motion.div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#FF6B00] via-[#1E6FD9] to-[#138808] z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-40 w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-[1px] w-12 bg-[#FF6B00]" />
          <span
            className="text-xs tracking-[0.25em] uppercase text-[#FF6B00]"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
          >
            Sadaiv Yuva Foundation · Partnerships
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight max-w-5xl"
        >
          Impact Happens When
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#1E6FD9] to-[#10B981]">
            Visionaries
          </span>{" "}
          Collaborate.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
          style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
        >
          We bring together technology leaders, educators, government bodies, and communities to build a safer digital India — one partnership at a time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button className="group relative px-8 py-4 bg-[#FF6B00] text-white font-semibold text-sm tracking-wide rounded-none overflow-hidden transition-all duration-300 hover:bg-[#e55a00]">
            <span className="relative z-10">Become a Partner</span>
          </button>
          <button className="px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-none hover:border-white/70 transition-all duration-300">
            Explore Collaborations ↓
          </button>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black text-white">
                <AnimatedCounter end={m.value} suffix={m.suffix} />
              </div>
              <div
                className="text-xs text-white/40 uppercase tracking-widest mt-1"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section 2: Why Collaboration Matters (Editorial split) ────────────────────

function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    { icon: "⚡", color: "#FF6B00", title: "Amplified Reach", body: "No single organisation can touch every corner of India. Together, we reach rural schools, urban corporates, and government halls." },
    { icon: "🧠", color: "#1E6FD9", title: "Shared Expertise", body: "Cybersecurity researchers, media houses, and educators each bring irreplaceable knowledge to the mission." },
    { icon: "🌱", color: "#10B981", title: "Systemic Change", body: "Collaborations create lasting policy changes, curriculum reforms, and community resilience that outlive any single campaign." },
    { icon: "📊", color: "#F59E0B", title: "Measurable Impact", body: "Joint initiatives produce verifiable outcomes — sessions conducted, fraud cases prevented, communities protected." },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#FAFAF8] py-28 md:py-40 overflow-hidden"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Asymmetric layout */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">
          {/* Left: sticky label block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:sticky md:top-32"
          >
            <div className="h-[3px] w-10 bg-[#FF6B00] mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E] leading-tight">
              Why<br />Collaboration<br />Matters
            </h2>
            <p
              className="mt-6 text-[#4A5568] leading-relaxed text-base"
              style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
            >
              Cybersecurity threats evolve faster than any one institution can respond. The answer isn't larger budgets — it's smarter alliances.
            </p>
            <div className="mt-8 text-xs tracking-[0.2em] uppercase text-[#FF6B00]"
              style={{ fontFamily: "var(--font-mono, monospace)" }}>
              Our Philosophy
            </div>
          </motion.div>

          {/* Right: pillar cards — no repeated card design, each is unique */}
          <div className="space-y-6">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group flex gap-6 p-8 border border-[#E2E8F0] hover:border-[#CBD5E0] transition-all duration-300 hover:shadow-lg bg-white"
              >
                <div
                  className="text-2xl w-12 h-12 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs"
                  style={{ backgroundColor: p.color }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#0A0F1E] mb-2">{p.title}</h3>
                  <p
                    className="text-[#718096] leading-relaxed"
                    style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                  >
                    {p.body}
                  </p>
                </div>
                <div
                  className="ml-auto text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: p.color }}
                >
                  →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Ecosystem Diagram (SVG node map) ──────────────────────────────

function EcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const nodes = [
    { label: "Technology\nPartners", angle: 0, color: "#1E6FD9" },
    { label: "Media\nPartners", angle: 32.7, color: "#7C3AED" },
    { label: "CSR\nPartners", angle: 65.4, color: "#FF6B00" },
    { label: "Educational\nInstitutions", angle: 98.1, color: "#10B981" },
    { label: "Government", angle: 130.8, color: "#0B5394" },
    { label: "Cybersecurity\nExperts", angle: 163.6, color: "#EF4444" },
    { label: "NGOs &\nCivil Society", angle: 196.3, color: "#F59E0B" },
    { label: "Innovation\nLabs", angle: 229, color: "#06B6D4" },
    { label: "Research\nOrganisations", angle: 261.8, color: "#8B5CF6" },
    { label: "Startup\nEcosystem", angle: 294.5, color: "#EC4899" },
    { label: "International\nOrgs", angle: 327.2, color: "#14B8A6" },
  ];

  const cx = 300, cy = 300, r = 200;

  return (
    <section
      ref={ref}
      className="bg-[#0A0F1E] py-28 md:py-40 overflow-hidden"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#FF6B00]" />
            <span
              className="text-xs tracking-[0.25em] uppercase text-[#FF6B00]"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Collaboration Ecosystem
            </span>
            <div className="h-[1px] w-8 bg-[#FF6B00]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            One Foundation.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E6FD9] to-[#10B981]">
              Infinite Connections.
            </span>
          </h2>
        </motion.div>

        {/* SVG ecosystem map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center"
        >
          <svg
            viewBox="0 0 600 600"
            className="w-full max-w-2xl"
            style={{ overflow: "visible" }}
          >
            {/* Connection lines */}
            {nodes.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = cx + r * Math.cos(rad);
              const ny = cy + r * Math.sin(rad);
              return (
                <motion.line
                  key={i}
                  x1={cx} y1={cy} x2={nx} y2={ny}
                  stroke={node.color}
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.06 }}
                />
              );
            })}

            {/* Center node */}
       {/* Center Circle */}
<motion.circle
    cx={cx}
    cy={cy}
    r={52}
    fill="#0a0f1e"
    initial={{ scale: 0 }}
    animate={inView ? { scale: 1 } : {}}
    transition={{ type: "spring", duration: 0.8, delay: 0.4 }}
/>

<motion.image
    href={logo1.src}
    x={265}
    y={265}
    width={70}
    height={70}
    initial={{ scale: 0 }}
    animate={inView ? { scale: 1 } : {}}
    transition={{ delay: 0.5 }}
/>

            {/* Outer nodes */}
            {nodes.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = cx + r * Math.cos(rad);
              const ny = cy + r * Math.sin(rad);
              const lines = node.label.split("\n");
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.06 }}
                >
                  <circle cx={nx} cy={ny} r={28} fill={node.color} fillOpacity="0.15" stroke={node.color} strokeWidth="1.5" />
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={nx}
                      y={ny + (li - (lines.length - 1) / 2) * 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="6"
                      fontWeight="600"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {line}
                    </text>
                  ))}
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 4: Featured Collaborations (Alternating editorial) ───────────────

function FeaturedCollaborations() {
const collaborations = [
  {
    tag: "Technology Partner",
    color: "#1E6FD9",
    logo: payzonindialogo,
    name: "Payzon India Pvt. Ltd.",
    headline: "Securing Payments at Scale Across India",
    story:
      "Payzon India joined forces with SYF to address the surge in digital payment fraud affecting millions of Indian consumers. Together, we designed a comprehensive awareness curriculum and delivered it across 12 states.",
    outcomes: [
      "42,000+ users trained in UPI fraud prevention",
      "18 workshops across Tier-2 and Tier-3 cities",
      "30% reduction in phishing incidents",
    ],
    metrics: [
      { n: "42K+", l: "Trained" },
      { n: "18", l: "Workshops" },
      { n: "12", l: "States" },
    ],
    year: "2023–Present",
  },
  {
    tag: "Media Partner",
    color: "#7C3AED",
    logo: sadaivsatyalogo,
    name: "Sadaiv Satya News",
    headline: "Journalism That Protects the Public",
    story:
      "India's first digital-rights news platform became SYF's media amplifier—producing documentary-style coverage of cyber fraud investigations and educational features reaching millions of readers.",
    outcomes: [
      "4M+ readers reached",
      "14 investigative cyber stories",
      "3 national awareness campaigns",
    ],
    metrics: [
      { n: "4M+", l: "Readers" },
      { n: "14", l: "Stories" },
      { n: "3", l: "Campaigns" },
    ],
    year: "2022–Present",
  },
];
  return (
    <section
      className="bg-white py-28 md:py-40"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <div className="h-[3px] w-10 bg-[#FF6B00] mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E]">
            Featured Collaborations
          </h2>
          <p
            className="mt-4 text-[#718096] max-w-xl"
            style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
          >
            Partnerships built on shared values, measurable outcomes, and long-term commitment to India's digital safety.
          </p>
        </div>

        {/* Alternating editorial rows */}
        <div className="space-y-32">
          {collaborations.map((c, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, margin: "-80px" });
            const isOdd = i % 2 === 1;

            return (
              <motion.div
                ref={ref}
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9 }}
                className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${isOdd ? "md:[direction:rtl]" : ""}`}
              >
                {/* Image placeholder with documentary style */}
                <div className={`${isOdd ? "md:[direction:ltr]" : ""}`}>
                <div
  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg group"
>
  {/* Background */}
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      background: `linear-gradient(135deg, ${c.color}, transparent)`,
    }}
  />

  {/* Logo */}
  <div className="absolute inset-0 flex items-center justify-center p-12">
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={c.logo}
        alt={c.name}
        className="max-w-[75%] max-h-[70%] object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  </div>

  {/* Bottom Overlay */}
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5">
    <div className="flex items-center justify-between">
      <span
        className="text-xs uppercase tracking-[0.25em] text-white/90"
        style={{
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        {c.tag}
      </span>

      <span
        className="text-xs uppercase tracking-[0.2em] text-white/70"
        style={{
          fontFamily: "var(--font-mono, monospace)",
        }}
      >
        {c.year}
      </span>
    </div>
  </div>

  {/* Left Accent */}
  <div
    className="absolute left-0 top-0 bottom-0 w-1"
    style={{ backgroundColor: c.color }}
  />
</div>
                </div>

                {/* Content */}
                <div className={`${isOdd ? "md:[direction:ltr]" : ""} space-y-6`}>
                  <div>
                    <span
                      className="text-xs tracking-[0.2em] uppercase font-semibold"
                      style={{ color: c.color, fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {c.tag}
                    </span>
                    <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#0A0F1E] leading-tight">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-xl font-medium text-[#4A5568]">{c.headline}</p>
                  </div>

                  <p
                    className="text-[#718096] leading-relaxed"
                    style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                  >
                    {c.story}
                  </p>

                  <ul className="space-y-2">
                    {c.outcomes.map((o, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <span
                          className="text-[#4A5568] text-sm"
                          style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                        >
                          {o}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Inline metrics */}
                  <div className="flex gap-8 pt-4 border-t border-[#E2E8F0]">
                    {c.metrics.map((m, j) => (
                      <div key={j}>
                        <div className="text-2xl font-black" style={{ color: c.color }}>{m.n}</div>
                        <div
                          className="text-xs uppercase tracking-widest text-[#A0AEC0]"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          {m.l}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="flex items-center gap-2 text-sm font-semibold hover:gap-4 transition-all duration-300"
                    style={{ color: c.color }}
                  >
                    Read Full Story <span>→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Impact Dashboard (Full-bleed dark metrics) ────────────────────

function ImpactDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { end: 50000, suffix: "+", label: "People Reached", color: "#FF6B00" },
    { end: 300, suffix: "+", label: "Digital Literacy\nSessions", color: "#1E6FD9" },
    { end: 120, suffix: "+", label: "Awareness\nCampaigns", color: "#10B981" },
    { end: 85, suffix: "+", label: "Community\nInitiatives", color: "#F59E0B" },
    { end: 25000, suffix: "+", label: "Educational\nResources", color: "#7C3AED" },
    { end: 50, suffix: "+", label: "Strategic\nPartners", color: "#EC4899" },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#0A0F1E] py-28 md:py-40 relative overflow-hidden"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span
            className="text-xs tracking-[0.25em] uppercase text-[#FF6B00]"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            Partnership Impact Dashboard
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold text-white">
            Numbers That Tell
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#F59E0B]">
              The Real Story
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-10 border border-white/5 relative group hover:bg-white/5 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: s.color }} />
              <div
                className="text-4xl md:text-5xl font-black"
                style={{ color: s.color }}
              >
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <div
                className="mt-3 text-xs text-white/40 uppercase tracking-[0.15em] leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Partnership Journey (Horizontal timeline) ─────────────────────

function PartnershipJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { n: "01", label: "Discover", desc: "We learn about your mission, values, and goals to find strategic alignment." },
    { n: "02", label: "Strategy", desc: "Joint strategy sessions map out shared objectives and success metrics." },
    { n: "03", label: "Planning", desc: "Detailed roadmaps, resource allocation, and timelines are co-designed." },
    { n: "04", label: "Co-Create", desc: "Programs, content, and campaigns are built together with your team." },
    { n: "05", label: "Execute", desc: "Ground-level rollout with SYF trainers, your network, and community leaders." },
    { n: "06", label: "Measure", desc: "Real-time dashboards and impact reports track every outcome." },
    { n: "07", label: "Scale", desc: "Successful pilots are expanded to new geographies and communities." },
    { n: "08", label: "Long-term\nImpact", desc: "Sustainable, institution-level change that outlasts any single project." },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#FAFAF8] py-28 md:py-40 overflow-hidden"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="h-[3px] w-10 bg-[#1E6FD9] mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E]">
            The Partnership Journey
          </h2>
          <p
            className="mt-4 text-[#718096] max-w-lg"
            style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
          >
            From first conversation to lasting systemic change — every step is intentional.
          </p>
        </motion.div>

        {/* Scrollable horizontal timeline */}
        <div className="relative overflow-x-auto pb-4">
          <div className="flex gap-0 min-w-max">
            {/* Connecting line */}
            <div className="absolute top-[52px] left-0 right-0 h-[1px] bg-[#E2E8F0]" />

            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative w-40 flex-shrink-0 px-4 group"
              >
                {/* Node */}
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mx-auto relative z-10 transition-all duration-300 group-hover:scale-125 ${
                  i === steps.length - 1
                    ? "bg-[#FF6B00] border-[#FF6B00]"
                    : "bg-white border-[#CBD5E0] group-hover:border-[#1E6FD9]"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    i === steps.length - 1 ? "bg-white" : "bg-[#CBD5E0] group-hover:bg-[#1E6FD9]"
                  } transition-colors duration-300`} />
                </div>

                {/* Step content */}
                <div className="mt-6 text-center">
                  <div
                    className="text-[10px] text-[#A0AEC0] mb-1"
                    style={{ fontFamily: "var(--font-mono, monospace)" }}
                  >
                    {s.n}
                  </div>
                  <div className="font-bold text-[#0A0F1E] text-sm whitespace-pre-line leading-tight mb-2">
                    {s.label}
                  </div>
                  <p
                    className="text-[10px] text-[#A0AEC0] leading-relaxed"
                    style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Collaboration Categories (Magazine grid) ─────────────────────

function CollaborationCategories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const categories = [
    { id: 0, label: "Technology", color: "#1E6FD9", icon: "💻", objectives: "Integrate digital safety tools with technology products.", benefits: "Co-branded content, CSR fulfilment, talent access, community goodwill.", opportunities: "Platform integrations, hackathons, training content, cybersecurity audits." },
    { id: 1, label: "Media", color: "#7C3AED", icon: "📡", objectives: "Amplify awareness campaigns through trusted editorial channels.", benefits: "Exclusive story access, credibility boost, social impact metrics.", opportunities: "Joint campaigns, documentary series, weekly cyber columns." },
    { id: 2, label: "Education", color: "#10B981", icon: "🎓", objectives: "Embed digital literacy in school and university curricula.", benefits: "Accredited content, faculty development, student engagement.", opportunities: "Curriculum design, annual cyber olympiad, research publications." },
    { id: 3, label: "CSR", color: "#FF6B00", icon: "🤝", objectives: "Fulfil CSR mandates with verified, high-impact digital safety programmes.", benefits: "Full compliance reporting, brand visibility, community recognition.", opportunities: "Village-level camps, women empowerment workshops, youth training." },
    { id: 4, label: "Government", color: "#0B5394", icon: "🏛️", objectives: "Support policy development and public cyber awareness.", benefits: "Policy influence, national reach, credibility in law enforcement outreach.", opportunities: "Police cyber cells, court awareness, DPDP compliance drives." },
    { id: 5, label: "Research", color: "#EC4899", icon: "🔬", objectives: "Produce evidence-based insights on India's cybercrime landscape.", benefits: "Publication access, real-world data, expert network.", opportunities: "Annual reports, white papers, case study repositories." },
  ];

  return (
    <section
      ref={ref}
      className="bg-white py-28 md:py-40"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="h-[3px] w-10 bg-[#10B981] mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E]">
            Collaboration<br />Categories
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] gap-0 border border-[#E2E8F0]">
          {/* Tab list */}
          <div className="border-r border-[#E2E8F0]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`w-full flex items-center gap-3 px-6 py-5 text-left border-b border-[#E2E8F0] transition-all duration-200 ${
                  active === c.id
                    ? "bg-[#FAFAF8]"
                    : "hover:bg-[#FAFAF8]"
                }`}
              >
                <div
                  className="w-1 h-8 flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: active === c.id ? c.color : "transparent" }}
                />
                <span className="text-xl">{c.icon}</span>
                <span className={`font-semibold text-sm ${active === c.id ? "text-[#0A0F1E]" : "text-[#718096]"}`}>
                  {c.label}
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            {categories.map((c) =>
              c.id === active ? (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-10 space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{c.icon}</span>
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#0A0F1E]">{c.label} Partnerships</h3>
                      <div className="h-[2px] w-12 mt-2" style={{ backgroundColor: c.color }} />
                    </div>
                  </div>

                  {[
                    { heading: "Objectives", body: c.objectives },
                    { heading: "Benefits for Partners", body: c.benefits },
                    { heading: "Opportunities", body: c.opportunities },
                  ].map((block, bi) => (
                    <div key={bi}>
                      <h4
                        className="text-xs uppercase tracking-widest mb-2 font-semibold"
                        style={{ color: c.color, fontFamily: "var(--font-mono, monospace)" }}
                      >
                        {block.heading}
                      </h4>
                      <p
                        className="text-[#4A5568] leading-relaxed"
                        style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                      >
                        {block.body}
                      </p>
                    </div>
                  ))}

                  <button
                    className="mt-4 px-6 py-3 text-sm font-semibold text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    Explore {c.label} Partnership →
                  </button>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Success Stories (Magazine layout) ─────────────────────────────

function SuccessStories() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stories = [
    { tag: "Community Impact", headline: "How UPI Fraud Awareness Saved ₹2 Crore in a Single District", teaser: "A 6-week mobile-first campaign in Chhattisgarh reached 8,000 farmers and small business owners — teaching them to spot and report payment fraud.", quote: "For the first time, our village understood what phishing meant.", author: "Block Education Officer, Bilaspur", color: "#FF6B00", size: "large" },
    { tag: "Youth Empowerment", headline: "350 Students Became Cyber Champions in 90 Days", teaser: "SYF's campus residency programme turned curious students into community educators, equipped with certified digital safety skills.", quote: "I taught my parents how to spot fake WhatsApp messages.", author: "Student Ambassador, IIST Bhopal", color: "#1E6FD9", size: "small" },
    { tag: "Women & Digital Safety", headline: "Digital Self-Defence for 1,200 Women Entrepreneurs", teaser: "A partnership with a women's SHG federation delivered WhatsApp-based training modules on identity theft, OTP fraud, and online privacy.", quote: "The training paid for itself in two weeks — I nearly fell for a scam.", author: "SHG Member, Vidisha", color: "#10B981", size: "small" },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#F7F8FA] py-28 md:py-40"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="h-[3px] w-10 bg-[#F59E0B] mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E]">
            Success Stories
          </h2>
          <p
            className="mt-4 text-[#718096] max-w-lg"
            style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
          >
            Real partnerships. Real outcomes. Documented with honesty.
          </p>
        </motion.div>

        {/* Magazine grid: one large + two small */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`bg-white border border-[#E2E8F0] group hover:shadow-xl transition-all duration-500 overflow-hidden ${
                i === 0 ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              {/* Color bar */}
              <div className="h-1" style={{ backgroundColor: s.color }} />

              <div className="p-8 flex flex-col h-full">
                <span
                  className="text-xs tracking-[0.2em] uppercase font-semibold mb-4"
                  style={{ color: s.color, fontFamily: "var(--font-mono, monospace)" }}
                >
                  {s.tag}
                </span>
                <h3
                  className={`font-extrabold text-[#0A0F1E] leading-tight mb-4 ${
                    i === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}
                >
                  {s.headline}
                </h3>
                <p
                  className="text-[#718096] text-sm leading-relaxed mb-6 flex-grow"
                  style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                >
                  {s.teaser}
                </p>

                {/* Pull quote */}
                <div className="border-l-4 pl-4 mb-4" style={{ borderColor: s.color }}>
                  <p
                    className="text-sm italic text-[#4A5568]"
                    style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                  >
                    "{s.quote}"
                  </p>
                  <p className="text-xs text-[#A0AEC0] mt-1 font-medium">{s.author}</p>
                </div>

                <button
                  className="text-xs font-semibold flex items-center gap-2 transition-all duration-300 group-hover:gap-4"
                  style={{ color: s.color }}
                >
                  Read Full Story →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 9: Annual Report (Minimal timeline) ──────────────────────────────

function AnnualReport() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const years = [
    { year: "2021", headline: "Foundation Year", highlights: ["First 5 partnerships established", "10,000 people reached across MP", "Digital Safety Handbook published"] },
    { year: "2022", headline: "Expanding Horizons", highlights: ["Sadaiv Satya media partnership", "First statewide cyber campaign", "50+ schools onboarded"] },
    { year: "2023", headline: "National Scale", highlights: ["Payzon India Pvt. Ltd. joins", "300 sessions milestone crossed", "DPDP Act awareness launched"] },
    { year: "2024", headline: "Deep Impact", highlights: ["50,000 people reached", "6 international org collaborations", "First Annual Partnership Summit"] },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#0A0F1E] py-28 md:py-40"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="h-[3px] w-10 bg-[#F59E0B] mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Annual Partnership<br />Report
            </h2>
          </div>
          <button className="px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-all duration-300 self-start md:self-auto">
            Download 2024 Report ↓
          </button>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[3.5rem] top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />

          <div className="space-y-12">
            {years.map((y, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="grid md:grid-cols-[7rem_1fr] gap-6 md:gap-12"
              >
                {/* Year */}
                <div className="flex md:flex-col items-center gap-4 md:gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FF6B00] flex-shrink-0 relative z-10" />
                  <div className="text-2xl font-black text-white">{y.year}</div>
                </div>

                {/* Content */}
                <div className="pb-8 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">{y.headline}</h3>
                  <ul className="space-y-2">
                    {y.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] flex-shrink-0" />
                        <span
                          className="text-white/60 text-sm"
                          style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                        >
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 10: Become a Partner (Category grid) ────────────────────────────

function BecomePartner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const types = [
    { icon: "🏢", label: "Corporate CSR", desc: "Fulfil your social responsibility mandate with verified, auditable impact." },
    { icon: "💻", label: "Technology Company", desc: "Embed your digital tools in communities that need them most." },
    { icon: "🎓", label: "University", desc: "Build research capabilities and cybersecurity curriculum together." },
    { icon: "🏫", label: "School", desc: "Protect your students with India-specific digital safety education." },
    { icon: "📺", label: "Media House", desc: "Use your reach to change the cybersecurity narrative in India." },
    { icon: "🏛️", label: "Government Agency", desc: "Run evidence-based awareness with certified trainers nationwide." },
    { icon: "🌐", label: "NGO", desc: "Combine forces to reach communities beyond each other's current network." },
    { icon: "🚀", label: "Startup", desc: "Scale your impact story through structured community partnerships." },
    { icon: "🔐", label: "Cybersecurity Expert", desc: "Translate your expertise into life-changing awareness for real people." },
    { icon: "🙌", label: "Volunteer Network", desc: "Organise your people around a national mission that matters." },
  ];

  return (
    <section
      ref={ref}
      className="bg-white py-28 md:py-40"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="h-[3px] w-10 bg-[#FF6B00] mb-6 mx-auto" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E]">
            Become a Partner
          </h2>
          <p
            className="mt-4 text-[#718096] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
          >
            Whether you represent a Fortune 500 corporation or a grassroots volunteer collective, there's a collaboration model built for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#E2E8F0]">
          {types.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white p-6 group hover:bg-[#FAFAF8] transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-bold text-sm text-[#0A0F1E] mb-2 leading-tight">{t.label}</h3>
              <p
                className="text-xs text-[#A0AEC0] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
              >
                {t.desc}
              </p>
              <div className="mt-3 text-[#FF6B00] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Apply →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 11: Why Partner With Us (Asymmetric) ────────────────────────────

function WhyPartner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    "Trusted community presence in 200+ districts",
    "Certified cybersecurity education expertise",
    "Transparent, audit-ready impact reporting",
    "Verified outcome measurement framework",
    "Nationwide trainer and volunteer network",
    "Youth-first engagement methodology",
    "Technology-first programme execution",
    "Established government and police partnerships",
  ];

  return (
    <section
      ref={ref}
      className="bg-[#FAFAF8] py-28 md:py-40 overflow-hidden"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <div className="h-[3px] w-10 bg-[#1E6FD9] mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E] leading-tight">
              Why Partner<br />With Us?
            </h2>
            <p
              className="mt-6 text-[#718096] leading-relaxed"
              style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
            >
              Partners choose SYF not just for our reach — but for the rigour, transparency, and genuine community trust we've built over years.
            </p>
            <div className="mt-10">
              <button className="px-8 py-4 bg-[#0A0F1E] text-white text-sm font-semibold hover:bg-[#1a2540] transition-colors duration-300">
                Download Partnership Brochure →
              </button>
            </div>
          </motion.div>

          {/* Right: numbered reasons */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-1 gap-4"
          >
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                className="flex gap-5 items-start py-4 border-b border-[#E2E8F0] last:border-0 group"
              >
                <span
                  className="text-xs text-[#A0AEC0] w-6 flex-shrink-0 mt-0.5 font-mono"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#0A0F1E] font-medium group-hover:text-[#1E6FD9] transition-colors duration-200">
                  {r}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 12: FAQ (Accordion) ─────────────────────────────────────────────

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Who can become a partner of Sadaiv Yuva Foundation?", a: "Any organisation — corporate, academic, governmental, NGO, or startup — that shares our commitment to digital safety and community empowerment can apply. We evaluate alignment with our mission, reach, and capacity to co-create impact." },
    { q: "What does a typical partnership involve?", a: "Most partnerships involve joint programme design, co-branded campaigns, shared resource allocation, and co-produced impact reports. The specific structure depends on the partner type and geography." },
    { q: "How does SYF measure and report impact?", a: "We use a multi-layer measurement framework: attendance and reach data, pre/post assessments, community feedback surveys, and third-party audits. Partners receive quarterly dashboards and an annual impact report." },
    { q: "Can international organisations partner with SYF?", a: "Yes. We are open to partnerships with global institutions — particularly those working on internet governance, digital rights, and STEM education. All international partnerships are subject to FCRA compliance." },
    { q: "Is there a minimum commitment required for CSR partnerships?", a: "We do not impose a minimum. However, for programmes to reach measurable impact, we recommend a minimum 6-month engagement with at least 3–4 active touchpoints per quarter." },
    { q: "How long does it take to launch a partnership?", a: "From initial discussion to first programme activation, the average timeline is 4–8 weeks, depending on scope and approval processes on both sides." },
  ];

  return (
    <section
      ref={ref}
      className="bg-white py-28 md:py-40"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="h-[3px] w-10 bg-[#FF6B00] mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F1E]">
            Frequently Asked<br />Questions
          </h2>
        </motion.div>

        <div className="space-y-0 border-t border-[#E2E8F0]">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="border-b border-[#E2E8F0]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left gap-4"
              >
                <span className="font-semibold text-[#0A0F1E] text-base md:text-lg">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-[#A0AEC0] flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-6 text-[#718096] leading-relaxed"
                      style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
                    >
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 13: Final CTA ────────────────────────────────────────────────────

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#0A0F1E] py-32 md:py-48 overflow-hidden"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Large background text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div className="text-[12vw] font-black text-white opacity-[0.02] whitespace-nowrap">
          COLLABORATE
        </div>
      </div>

      {/* Tricolor accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] flex">
        <div className="flex-1 bg-[#FF6B00]" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div
            className="text-xs tracking-[0.3em] uppercase text-[#FF6B00] mb-8"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            Ready to Make a Difference?
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
            Let's Build a Safer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#F59E0B] to-[#138808]">
              Digital India
            </span>
            <br />
            Together.
          </h2>
          <p
            className="mt-8 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body, 'Nunito Sans', sans-serif)" }}
          >
            Whether you're a corporate leader, a school principal, a government official, or a technology innovator — your partnership can change how millions of Indians experience the internet.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-[#FF6B00] text-white font-semibold text-sm tracking-wide hover:bg-[#e55a00] transition-all duration-300">
              Start Collaboration
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide hover:bg-white/5 transition-all duration-300">
              Schedule a Meeting
            </button>
            <button className="px-8 py-4 border border-white/10 text-white/60 font-semibold text-sm tracking-wide hover:border-white/30 hover:text-white transition-all duration-300">
              Download Partnership Deck ↓
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom tricolor */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] flex">
        <div className="flex-1 bg-[#FF6B00]" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-[#138808]" />
      </div>
    </section>
  );
}

// ─── Sticky Nav ────────────────────────────────────────────────────────────────

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -64 }}
      animate={{ y: scrolled ? 0 : -64 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
      style={{ fontFamily: "var(--font-heading, 'Plus Jakarta Sans', sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="font-extrabold text-[#0A0F1E] text-sm tracking-tight">
          SYF · Partnerships
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#718096] tracking-wide uppercase">
          {["Ecosystem", "Collaborations", "Impact", "Categories", "Stories", "Partner"].map((l) => (
            <button key={l} className="hover:text-[#FF6B00] transition-colors duration-200">
              {l}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-[#FF6B00] text-white text-xs font-bold tracking-wide hover:bg-[#e55a00] transition-colors duration-200">
          Become a Partner
        </button>
      </div>
    </motion.nav>
  );
}

// ─── Main Page Export ─────────────────────────────────────────────────────────

export default function CollaborationPage() {
  return (
    <main className="bg-white">
      <StickyNav />
      <HeroSection />
      <WhySection />
      <EcosystemSection />
      <FeaturedCollaborations />
      <ImpactDashboard />
      <PartnershipJourney />
      <CollaborationCategories />
      <SuccessStories />
      <AnnualReport />
      <BecomePartner />
      <WhyPartner />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
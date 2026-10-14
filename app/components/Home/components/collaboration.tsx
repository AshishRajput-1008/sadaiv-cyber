'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Pause,
  Play,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import payzon from "@/public/payzon-logo-removebg-preview.png";
import sadaivSatya from "@/Assests/images/logo.png";
import spark from "@/public/inffablesparklogo (1).png";
import smarttax from "@/public/smarttax.png";
import { StaticImageData } from "next/image";

interface Collab {
  id: number;
  company: string;
  category: string;
  logo: StaticImageData;
  rating: number;
  testimonial: string;
  description: string;
  gradient: string;
  bgGradient: string;
  tags: string[];
  stats: {
    improvement: string;
    timeline: string;
    impact: string;
    reach: string;
    adoption?: string;
  };
  industry: string;
  year: string;
  color: string;
  accent: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const collaborations: Collab[] = [
  {
    id: 1,
    company: "Payzon India Pvt Ltd",
    category: "Software Support",
    logo: payzon,
    rating: 5,
    testimonial:
      "The cybersecurity team's expertise transformed our platform. Their AI-driven threat detection and encryption protocols reduced incidents by 95%, ensuring trust for millions of users.",
    description:
      "Payzon India Pvt Ltd partnered with us to fortify their fintech platform with state-of-the-art security measures. We implemented AES-256 encryption, multi-factor authentication, and real-time threat monitoring, achieving full compliance with RBI and PCI-DSS standards.",
    gradient: "from-blue-400 via-cyan-400 to-purple-500",
    bgGradient: "from-blue-500/20 via-cyan-500/15 to-purple-500/20",
    tags: ["Fintech", "Payment Security", "Compliance", "Encryption", "AI Security"],
    stats: {
      improvement: "95% incident reduction",
      timeline: "6 months",
      impact: "1.2M+ transactions secured",
      reach: "Nationwide",
      adoption: "100% platform integration",
    },
    industry: "Financial Technology",
    year: "2024",
    color: "#06b6d4",
    accent: "#8b5cf6",
  },
  {
    id: 2,
    company: "Sadaiv Satya News",
    category: "Media Support",
    logo: sadaivSatya,
    rating: 5,
    testimonial:
      "Our partnership delivered impactful digital safety campaigns, educating 1.5 million readers and fostering a resilient online community across India.",
    description:
      "Sadaiv Satya News collaborated with us to launch a nationwide cybersecurity awareness campaign. Through engaging articles, explainer videos, live webinars, and social media initiatives, we educated users on phishing prevention, data privacy, and secure online practices.",
    gradient: "from-orange-400 via-red-400 to-pink-500",
    bgGradient: "from-orange-500/20 via-red-500/15 to-pink-500/20",
    tags: ["Media", "Education", "Awareness", "Digital Literacy", "Community Outreach"],
    stats: {
      improvement: "220% engagement increase",
      timeline: "4 months",
      impact: "1.5M+ readers educated",
      reach: "Pan-India",
      adoption: "85% reader participation",
    },
    industry: "Digital Media",
    year: "2024",
    color: "#f97316",
    accent: "#ec4899",
  },
  {
    id: 3,
    company: "Smart Tax Idea",
    category: "Media Support",
    logo: smarttax,
    rating: 5,
    testimonial:
      "The team's innovative campaigns on tax compliance and digital security reached 1.3 million users, driving a 210% engagement boost and transforming tax literacy.",
    description:
      "Smart Tax Idea partnered with us to promote tax compliance and digital security through targeted media campaigns. We created comprehensive content, including GST-focused infographics, podcasts, social media series, and interactive Q&A sessions.",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    bgGradient: "from-yellow-500/20 via-orange-500/15 to-red-500/20",
    tags: ["Media", "Education", "Tax Compliance", "GST", "Digital Security"],
    stats: {
      improvement: "210% engagement boost",
      timeline: "4 months",
      impact: "1.3M+ users reached",
      reach: "Multi-state",
      adoption: "80% business adoption",
    },
    industry: "Tax Technology",
    year: "2024",
    color: "#eab308",
    accent: "#f59e0b",
  },
  {
    id: 4,
    company: "Ineffable Spark",
    category: "Media Support",
    logo: spark,
    rating: 5,
    testimonial:
      "The team's creative strategies amplified our global campaigns, engaging 1.4 million users and fostering a worldwide culture of digital responsibility.",
    description:
      "Ineffable Spark collaborated with us to drive global cybersecurity awareness through innovative media initiatives. We launched interactive workshops, viral social media challenges, educational videos, and global webinars on ransomware protection and secure browsing.",
    gradient: "from-purple-400 via-pink-400 to-red-400",
    bgGradient: "from-purple-500/20 via-pink-500/15 to-red-500/20",
    tags: ["Media", "Global Campaigns", "Creative Strategy", "Digital Responsibility"],
    stats: {
      improvement: "200% engagement increase",
      timeline: "4 months",
      impact: "1.4M+ users reached",
      reach: "Global",
      adoption: "90% campaign participation",
    },
    industry: "Creative Media",
    year: "2024",
    color: "#a855f7",
    accent: "#ec4899",
  },
];

// Client-only AnimatedBackground component
const AnimatedBackground = dynamic(() => Promise.resolve(() => {
  const [positions, setPositions] = useState({
    primary: { x: 0, y: 0 },
    secondary: { x: 0, y: 0 },
  });

  useEffect(() => {
    const updatePositions = () => {
      setPositions({
        primary: {
          x: Math.sin(Date.now() * 0.001) * 50,
          y: Math.cos(Date.now() * 0.001) * 25,
        },
        secondary: {
          x: Math.cos(Date.now() * 0.0015) * 40,
          y: Math.sin(Date.now() * 0.0015) * 30,
        },
      });
      requestAnimationFrame(updatePositions);
    };

    const animationId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const currentCollab = collaborations[0];

  return (
    <>
      <div
        className="absolute w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full blur-3xl transition-all duration-1000 hidden sm:block"
        style={{
          background: `radial-gradient(circle, ${currentCollab.color}20, transparent)`,
          left: "5%",
          top: "10%",
          transform: `translate(${positions.primary.x}px, ${positions.primary.y}px)`,
        }}
      />
      <div
        className="absolute w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 rounded-full blur-3xl transition-all duration-1000 hidden sm:block"
        style={{
          background: `radial-gradient(circle, ${currentCollab.accent}20, transparent)`,
          right: "5%",
          bottom: "10%",
          transform: `translate(${positions.secondary.x}px, ${positions.secondary.y}px)`,
        }}
      />
    </>
  );
}), { ssr: false });

export default function NextLevelCollaborationSection() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Responsive particle system
  useEffect(() => {
    const isMobile = window.innerWidth <= 640;
    const particleCount = isMobile ? 15 : 30; // Fewer particles on mobile
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * (isMobile ? 2 : 3) + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: ["#06b6d4", "#8b5cf6", "#f97316", "#ec4899", "#eab308"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setParticles(newParticles);

    const handleResize = () => {
      const isMobile = window.innerWidth <= 640;
      const particleCount = isMobile ? 15 : 30;
      setParticles(
        Array.from({ length: particleCount }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * (isMobile ? 2 : 3) + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: ["#06b6d4", "#8b5cf6", "#f97316", "#ec4899", "#eab308"][
            Math.floor(Math.random() * 5)
          ],
        }))
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && isHovering) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mousePos, isHovering]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (auto) {
      timer.current = setTimeout(() => {
        setCurrent((c) => (c + 1) % collaborations.length);
      }, 8000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [current, auto]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    setAuto(false);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % collaborations.length);
    setAuto(false);
  };

  const prev = () => {
    setCurrent((c) => (c - 1 + collaborations.length) % collaborations.length);
    setAuto(false);
  };

  const currentCollab = collaborations[current];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden border-t border-gray-400">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 1) 100%)",
        }}
      />

      {/* Dynamic Background Effects */}
      <AnimatedBackground />

      {/* Hero Section */}
      <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 w-4 sm:w-5 h-4 sm:h-5 bg-yellow-400/30 rounded-full blur animate-ping" />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Elite Partnerships
            </span>
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              REVOLUTIONARY
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Collaborations
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
            Discover how our strategic partnerships drive transformative innovation,
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
              {" "}
              empower communities
            </span>
            , and set new standards across industries.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
            {/* Main Card */}
            <div className="md:col-span-2 relative">
              <div
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-700 group hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${currentCollab.bgGradient})`,
                }}
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-50 blur-xl transition-all duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${currentCollab.gradient})`,
                  }}
                />

                <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="relative">
                      <div
                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-2xl border-2 transition-transform duration-300 hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${currentCollab.gradient})`,
                          borderColor: currentCollab.color,
                        }}
                      >
                        <Image
                          src={currentCollab.logo}
                          alt={`${currentCollab.company} logo`}
                          width={64}
                          height={64}
                          className="object-contain w-12 sm:w-16 h-12 sm:h-16"
                        />
                      </div>
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 sm:w-6 h-5 sm:h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-900" />
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                        {currentCollab.company}
                      </h2>
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2">
                        <span
                          className="px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold border-2 bg-white/10 backdrop-blur text-white animate-pulse"
                          style={{ borderColor: currentCollab.color }}
                        >
                          ✓ VERIFIED PARTNER
                        </span>
                        <div className="flex">
                          {Array.from({ length: currentCollab.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm">
                        {currentCollab.category} • {currentCollab.industry} •{" "}
                        {currentCollab.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {currentCollab.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium bg-white/10 backdrop-blur border border-white/20 text-white hover:scale-105 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${currentCollab.color}20, transparent)`,
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                      {currentCollab.description}
                    </p>
                    <blockquote className="relative pl-4 sm:pl-6 border-l-4 text-white/90 text-base sm:text-lg md:text-xl italic font-light leading-relaxed">
                      <div
                        className="absolute left-0 top-0 w-1 h-full rounded-full"
                        style={{ backgroundColor: currentCollab.color }}
                      />
                      "{currentCollab.testimonial}"
                    </blockquote>
                  </div>

                  <button
                    className="group relative inline-flex items-center gap-2 sm:gap-3 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg sm:rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 text-sm sm:text-base">Learn More</span>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 group-hover:translate-x-2 relative z-10" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Users className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">Our Partners</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {collaborations.map((collab, index) => (
                    <div
                      key={collab.id}
                      onClick={() => goTo(index)}
                      className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 border ${
                        current === index
                          ? "border-white/40 bg-white/20 shadow-lg scale-105"
                          : "border-white/10 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center text-xl sm:text-2xl">
                        <Image
                          src={collab.logo}
                          alt={`${collab.company} logo`}
                          width={40}
                          height={40}
                          className="object-contain w-8 sm:w-10 h-8 sm:h-10"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-xs sm:text-sm">
                          {collab.company}
                        </div>
                        <div className="text-xs text-gray-400">
                          {collab.category}
                        </div>
                      </div>
                      {current === index && (
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-white">Controls</h4>
                </div>

                <div className="flex items-center justify-center gap-8 sm:gap-12 mb-4 sm:mb-6">
                  <button
                    onClick={prev}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </button>

                  <button
                    onClick={next}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </button>
                </div>

                <div className="flex justify-center gap-2">
                  {collaborations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goTo(index)}
                      className={`transition-all duration-300 rounded-full ${
                        current === index
                          ? "w-6 sm:w-8 h-2 sm:h-3 bg-gradient-to-r from-blue-400 to-purple-400"
                          : "w-2 sm:w-3 h-2 sm:h-3 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        canvas {
          will-change: transform;
        }

        .group:hover {
          will-change: transform, box-shadow;
        }
      `}</style>
    </div>
  );
}
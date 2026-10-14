'use client';

import { ShieldCheck, Gavel, Lock, Globe, BookOpenCheck, Users, AlertTriangle, FileText, Scale, Zap, Brain, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'dot' | 'square' | 'triangle' | 'diamond';
  color: 'orange' | 'blue' | 'green' | 'purple' | 'cyan' | 'pink';
  pulse: boolean;
}

interface FloatingElement {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function CyberLawsSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Generate particles
    const generateParticles = () => {
      const particleCount = isMobile ? 50 : 150; // Fewer particles on mobile
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (isMobile ? 4 : 6) + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          type: ['dot', 'square', 'triangle', 'diamond'][Math.floor(Math.random() * 4)] as 'dot' | 'square' | 'triangle' | 'diamond',
          color: ['orange', 'blue', 'green', 'purple', 'cyan', 'pink'][Math.floor(Math.random() * 6)] as 'orange' | 'blue' | 'green' | 'purple' | 'cyan' | 'pink',
          pulse: Math.random() > 0.5,
        });
      }
      setParticles(newParticles);
    };

    // Generate floating elements
    const generateFloatingElements = () => {
      const elementCount = isMobile ? 10 : 20; // Fewer elements on mobile
      const elements: FloatingElement[] = Array.from({ length: elementCount }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }));
      setFloatingElements(elements);
    };

    generateParticles();
    generateFloatingElements();

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -10 : particle.y + particle.speed * (isMobile ? 0.05 : 0.1),
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * (isMobile ? 0.05 : 0.1),
          opacity: particle.pulse ? 0.3 + Math.sin(Date.now() * 0.005 + particle.id) * 0.3 : particle.opacity,
        }))
      );
    }, isMobile ? 60 : 30); // Slower updates on mobile

    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 300);
    }, 12000);

    return () => clearInterval(glitchInterval);
  }, []);

  const mainLaws = [
    {
      icon: <ShieldCheck className="h-8 sm:h-10 w-8 sm:w-10 text-white" />,
      title: "Data Protection & Privacy",
      description: "Robust legal frameworks safeguarding personal and organizational data against breaches, misuse, and unauthorized access in the digital era.",
      stats: "90% of breaches preventable",
      highlight: "GDPR Compliance",
      gradient: "from-orange-400 via-red-500 to-pink-600",
      accentColor: "orange",
      bgIcon: <Lock className="h-5 sm:h-6 w-5 sm:w-6" />,
    },
    {
      icon: <Gavel className="h-8 sm:h-10 w-8 sm:w-10 text-white" />,
      title: "IT Act 2000 (India)",
      description: "India's cornerstone cybercrime law governing e-commerce, digital signatures, and cyber offenses with penalties up to ₹1 crore.",
      stats: "₹1 Crore max penalty",
      highlight: "National Framework",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      accentColor: "blue",
      bgIcon: <Scale className="h-5 sm:h-6 w-5 sm:w-6" />,
    },
    {
      icon: <Lock className="h-8 sm:h-10 w-8 sm:w-10 text-white" />,
      title: "Cybercrime Regulations",
      description: "Stringent laws combating hacking, identity theft, phishing, ransomware, and digital fraud with up to 10 years imprisonment.",
      stats: "10+ Years imprisonment",
      highlight: "Criminal Liability",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      accentColor: "green",
      bgIcon: <AlertTriangle className="h-5 sm:h-6 w-5 sm:w-6" />,
    },
    {
      icon: <Globe className="h-8 sm:h-10 w-8 sm:w-10 text-white" />,
      title: "International Cyber Laws",
      description: "Global treaties and mutual legal assistance fostering harmonized cybersecurity standards across 195+ countries.",
      stats: "195+ Countries involved",
      highlight: "Global Standards",
      gradient: "from-purple-400 via-violet-500 to-pink-600",
      accentColor: "purple",
      bgIcon: <Globe className="h-5 sm:h-6 w-5 sm:w-6" />,
    },
    {
      icon: <BookOpenCheck className="h-8 sm:h-10 w-8 sm:w-10 text-white" />,
      title: "Intellectual Property Rights",
      description: "Protection for digital copyrights, software patents, trademarks, and measures against online piracy with severe penalties.",
      stats: "Billions in IP protection",
      highlight: "Creative Rights",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      accentColor: "cyan",
      bgIcon: <Brain className="h-5 sm:h-6 w-5 sm:w-6" />,
    },
    {
      icon: <Users className="h-8 sm:h-10 w-8 sm:w-10 text-white" />,
      title: "Consumer Protection Online",
      description: "Regulations ensuring e-commerce safety, online dispute resolution, and consumer rights in digital transactions.",
      stats: "Millions protected daily",
      highlight: "Consumer Rights",
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      accentColor: "yellow",
      bgIcon: <Users className="h-5 sm:h-6 w-5 sm:w-6" />,
    },
  ];

  const additionalTopics = [
    {
      icon: <AlertTriangle className="h-6 sm:h-8 w-6 sm:w-8 text-orange-400" />,
      title: "Cyber Terrorism Laws",
      description: "National security measures targeting cyber attacks on critical infrastructure and state systems.",
      gradient: "from-red-500 to-orange-600",
      bgIcon: <Zap className="w-4 sm:w-5 h-4 sm:h-5" />,
    },
    {
      icon: <FileText className="h-6 sm:h-8 w-6 sm:w-8 text-blue-400" />,
      title: "Digital Evidence Rules",
      description: "Standards for the legal admissibility of electronic evidence in judicial processes.",
      gradient: "from-blue-500 to-indigo-600",
      bgIcon: <FileText className="w-4 sm:w-5 h-4 sm:h-5" />,
    },
    {
      icon: <Scale className="h-6 sm:h-8 w-6 sm:w-8 text-purple-400" />,
      title: "Cyber Jurisdiction",
      description: "Frameworks for determining legal authority in cross-border cyber disputes and enforcement.",
      gradient: "from-purple-500 to-pink-600",
      bgIcon: <Eye className="w-4 sm:w-5 h-4 sm:h-5" />,
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: { bg: 'bg-orange-500', shadow: 'shadow-orange-500/50', glow: 'rgba(249, 115, 22, 0.6)' },
      blue: { bg: 'bg-blue-500', shadow: 'shadow-blue-500/50', glow: 'rgba(59, 130, 246, 0.6)' },
      green: { bg: 'bg-green-500', shadow: 'shadow-green-500/50', glow: 'rgba(16, 185, 129, 0.6)' },
      purple: { bg: 'bg-purple-500', shadow: 'shadow-purple-500/50', glow: 'rgba(168, 85, 247, 0.6)' },
      cyan: { bg: 'bg-cyan-500', shadow: 'shadow-cyan-500/50', glow: 'rgba(6, 182, 212, 0.6)' },
      pink: { bg: 'bg-pink-500', shadow: 'shadow-pink-500/50', glow: 'rgba(236, 72, 153, 0.6)' },
    };
    return colorMap[color] || colorMap.orange;
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Mouse Follower */}
      {!isMobile && (
        <div
          className="fixed w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0"
          style={{
            left: mousePosition.x - (isMobile ? 96 : 192),
            top: mousePosition.y - (isMobile ? 96 : 192),
            transition: 'all 0.3s ease',
          }}
        />
      )}

      {/* Enhanced Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => {
          const colorClasses = getColorClasses(particle.color);
          return (
            <div
              key={particle.id}
              className={`absolute transition-all duration-1000 ease-linear will-change-transform ${
                particle.type === 'dot' ? 'rounded-full' :
                particle.type === 'square' ? 'rounded-sm' :
                particle.type === 'triangle' ? 'rotate-45' : 'rotate-45 rounded-sm'
              } ${colorClasses.bg}`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 3}px ${colorClasses.glow}`,
                transform: particle.type === 'diamond' ? 'rotate(45deg) scale(0.8)' :
                          particle.type === 'triangle' ? 'rotate(45deg)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(90deg,rgba(249,115,22,0.3)_1px,transparent_1px),linear-gradient(rgba(249,115,22,0.3)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] animate-pulse"></div>
      </div>

      {/* Floating Cyber Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-bounce"
            style={{
              left: element.left,
              top: element.top,
              animationDelay: element.animationDelay,
              animationDuration: element.animationDuration,
            }}
          >
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Enhanced Hero Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mb-6 sm:mb-10">
            <div className="relative w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <ShieldCheck className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-ping shadow-md" />
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-bounce shadow-md" />
              <div className="absolute top-1/2 -left-3 sm:-left-5 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-500 rounded-full animate-ping shadow-md" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent tracking-tight animate-pulse">
              CYBER LAWS
            </h1>
          </div>

          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-24 sm:w-40 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
            <div className="w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mx-4 sm:mx-8 animate-spin flex items-center justify-center">
              <div className="w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="w-24 sm:w-40 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto leading-relaxed font-medium mb-6 sm:mb-8 md:mb-12">
            <span className="text-orange-400 font-bold">Safeguarding Digital Frontiers</span> •
            <span className="text-purple-400 font-bold"> Enforcing Cyber Justice</span> •
            <span className="text-cyan-400 font-bold"> Securing the Future</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white font-bold">
            {[
              { icon: "⚖️", text: "Legal Framework", gradient: "from-orange-500/30 to-red-500/30", border: "border-orange-500/60" },
              { icon: "🔒", text: "Security Standards", gradient: "from-blue-500/30 to-purple-500/30", border: "border-blue-500/60" },
              { icon: "🌐", text: "Global Compliance", gradient: "from-green-500/30 to-teal-500/30", border: "border-green-500/60" },
            ].map((badge, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${badge.gradient} backdrop-blur-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full border ${badge.border} shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <span className="text-lg sm:text-xl md:text-2xl mr-2">{badge.icon}</span>
                <span className="text-sm sm:text-base">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Main Laws Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-20">
          {mainLaws.map((law, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-2xl ${
                hoveredCard === index ? 'scale-102 -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${law.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${law.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
              <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-l-4 border-t-4 border-orange-500/40 rounded-tl-2xl sm:rounded-tl-3xl group-hover:border-orange-500 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-r-4 border-b-4 border-purple-500/40 rounded-br-2xl sm:rounded-br-3xl group-hover:border-purple-500 transition-all duration-300"></div>
              <div className={`relative inline-flex items-center justify-center w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br ${law.gradient} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-2xl group-hover:scale-105 transition-transform duration-300`}>
                {law.icon}
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full animate-pulse group-hover:bg-yellow-400 transition-colors"></div>
                <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 opacity-50 text-white">
                  {law.bgIcon}
                </div>
              </div>
              <div className={`inline-block bg-gradient-to-r ${law.gradient} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                {law.highlight}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                {law.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {law.description}
              </p>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                <div className="text-orange-400 font-bold text-sm sm:text-lg group-hover:text-orange-300 transition-colors">
                  {law.stats}
                </div>
              </div>
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-1.5 sm:w-2 h-24 sm:h-32 bg-gradient-to-b from-orange-500 to-transparent animate-pulse opacity-50"></div>
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-24 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-purple-500 to-transparent animate-pulse opacity-50"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Additional Topics */}
        <div className="bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text">
              Specialized Legal Areas
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {additionalTopics.map((topic, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="flex items-center mb-4 sm:mb-6 relative z-10">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${topic.gradient} rounded-full flex items-center justify-center mr-4 sm:mr-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {topic.title}
                    </h3>
                    <div className="opacity-50 mt-1 sm:mt-2">
                      {topic.bgIcon}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed relative z-10 text-sm sm:text-base">
                  {topic.description}
                </p>
                <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-b-2 border-white/20 rounded-br-xl sm:rounded-br-2xl group-hover:border-orange-500/60 transition-colors"></div>
                <div className="absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-t-2 border-white/20 rounded-tl-xl sm:rounded-tl-2xl group-hover:border-purple-500/60 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-spin {
          animation: spin 10s linear infinite;
        }

        .will-change-transform {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
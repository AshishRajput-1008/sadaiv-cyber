import React, { useState, useEffect, useRef } from "react";
import {
  MoveLeft,
  MoveRight,
  HandHeart,
  HeartHandshake,
  HelpingHand,
  ArrowRight,
  Shield,
  Sparkles,
  Zap,
  Star,
  Lock,
  Eye,
  Cpu,
  Network,
  Users,
  BookOpen,
  Target,
  Globe,
} from "lucide-react";

// Interface and card data with cyber foundation theme
interface Workshop {
  id: number;
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  accent: string;
  duration: string;
  level: string;
  participants: string;
}

const workshopsData: Workshop[] = [
  {
    id: 1,
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Corporate Workshop",
    subtitle: "Enterprise Cybersecurity Training",
    description:
      "Advanced cybersecurity workshops designed for corporate teams. Master enterprise-level threat detection, incident response protocols, secure infrastructure management, and build an impenetrable digital fortress for your organization.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-cyan-500 to-blue-600",
    accent: "from-cyan-400 to-blue-500",
    duration: "3 Days",
    level: "Advanced",
    participants: "20-50",
  },
  {
    id: 2,
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "individual Workshop",
    subtitle: "Individual Security Mastery",
    description:
      "Comprehensive personal cybersecurity training for individuals. Learn advanced privacy protection, secure communication protocols, identity theft prevention, and become your own digital security expert.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-purple-500 to-pink-600",
    accent: "from-purple-400 to-pink-500",
    duration: "2 Days",
    level: "Intermediate",
    participants: "10-25",
  },
  {
    id: 3,
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "Social Awarness Workshop",
    subtitle: "Community Awareness Program",
    description:
      "Large-scale digital literacy programs for educational institutions and communities. Covering cyber ethics, digital citizenship, online safety protocols, and building cyber-aware societies for the digital age.",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500 to-green-600",
    accent: "from-emerald-400 to-green-500",
    duration: "1-5 Days",
    level: "Beginner",
    participants: "50-500",
  },
];

// Enhanced Cyber Matrix with more dynamic effects
const CyberMatrix: React.FC = () => {
  const [matrix, setMatrix] = useState<Array<{ 
    id: number; 
    char: string; 
    x: number; 
    y: number; 
    speed: number; 
    opacity: number;
    size: number;
  }>>([]);

  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>()";
    const newMatrix = [];

    for (let i = 0; i < 50; i++) {
      newMatrix.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.1,
        size: Math.random() * 8 + 10
      });
    }
    setMatrix(newMatrix);

    const interval = setInterval(() => {
      setMatrix(prev => prev.map(item => ({
        ...item,
        char: chars[Math.floor(Math.random() * chars.length)],
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {matrix.map((item) => (
        <div
          key={item.id}
          className="absolute text-cyan-400/20 font-mono animate-pulse"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
            fontSize: `${item.size}px`,
            animation: `matrix-cascade ${item.speed * 20}s linear infinite`,
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
          }}
        >
          {item.char}
        </div>
      ))}
    </div>
  );
};

// Advanced Floating Particles System
const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    speed: number; 
    type: string;
    rotation: number;
    pulse: number;
  }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const particleTypes = ['circuit', 'data', 'shield', 'binary', 'node'];
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      speed: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      pulse: Math.random() * 2 + 1,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
    }));
    setParticles(newParticles);

    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: (p.y + p.speed) % 100,
          rotation: (p.rotation + 0.5) % 360,
        }))
      );
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getParticleComponent = (type: string, size: number, rotation: number) => {
    const baseClass = "absolute transition-all duration-1000 filter drop-shadow-lg";

    switch (type) {
      case 'circuit':
        return (
          <div className={`${baseClass} border border-cyan-400/30 rounded-sm`} 
               style={{ 
                 width: `${size}px`, 
                 height: `${size}px`,
                 transform: `rotate(${rotation}deg)`,
                 background: 'linear-gradient(45deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))'
               }}>
            <div className="absolute inset-0 border-t border-l border-cyan-400/50" />
          </div>
        );
      case 'data':
        return (
          <div className={`${baseClass} bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full`}
               style={{ 
                 width: `${size}px`, 
                 height: `${size}px`,
                 boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
               }} />
        );
      case 'shield':
        return (
          <div className={`${baseClass} text-emerald-400/30`}
               style={{ 
                 fontSize: `${size}px`,
                 transform: `rotate(${rotation}deg)`
               }}>
            🛡️
          </div>
        );
      default:
        return (
          <div className={`${baseClass} bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full`}
               style={{ 
                 width: `${size}px`, 
                 height: `${size}px`,
                 boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)'
               }} />
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `cyber-drift ${12 + particle.speed * 15}s infinite ease-in-out`,
          }}
        >
          {getParticleComponent(particle.type, particle.size, particle.rotation)}
        </div>
      ))}
    </div>
  );
};

// Enhanced Holographic Grid
const HolographicGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
      <svg width="100%" height="100%" className="w-full h-full">
        <defs>
          <pattern id="enhanced-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#enhanced-grid-gradient)" strokeWidth="1.5" opacity="0.6" />
            <circle cx="0" cy="0" r="2" fill="url(#node-gradient)" opacity="0.8" />
          </pattern>
          <linearGradient id="enhanced-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="33%" stopColor="#a855f7" />
            <stop offset="66%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <radialGradient id="node-gradient">
            <stop offset="0%" stopColor="#06b6d4" opacity="1" />
            <stop offset="100%" stopColor="#a855f7" opacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#enhanced-grid)" />
        <g className="animate-pulse">
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#enhanced-grid-gradient)" strokeWidth="1" opacity="0.3" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#enhanced-grid-gradient)" strokeWidth="1" opacity="0.3" />
        </g>
      </svg>
    </div>
  );
};

// Smooth Glitch Text Effect
const SmoothGlitchText: React.FC<{ children: React.ReactNode; className?: string; intensity?: 'low' | 'medium' | 'high' }> = ({ 
  children, 
  className = "", 
  intensity = 'medium' 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10 transition-all duration-150">{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 opacity-50 text-red-400 animate-glitch-1" 
                style={{ animationDuration: intensity === 'high' ? '0.1s' : intensity === 'medium' ? '0.15s' : '0.2s' }}>
            {children}
          </span>
          <span className="absolute top-0 left-0 opacity-50 text-cyan-400 animate-glitch-2"
                style={{ animationDuration: intensity === 'high' ? '0.1s' : intensity === 'medium' ? '0.15s' : '0.2s' }}>
            {children}
          </span>
        </>
      )}
    </div>
  );
};

// Advanced Holographic Button
const CyberButton: React.FC<{ 
  children: React.ReactNode; 
  onClick: () => void; 
  className?: string; 
  variant?: 'primary' | 'secondary' | 'nav';
  size?: 'sm' | 'md' | 'lg';
}> = ({
  children,
  onClick,
  className = "",
  variant = 'primary',
  size = 'md'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 shadow-[0_0_30px_rgba(34,211,238,0.3)]",
    secondary: "bg-white/5 hover:bg-white/10 border-2 border-cyan-400/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    nav: "bg-white/10 hover:bg-white/20 border border-cyan-400/40 hover:border-cyan-400"
  };

  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden backdrop-blur-xl relative group ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
      <span className={`relative z-10 flex items-center justify-center gap-2 transition-transform duration-150 ${isPressed ? 'scale-95' : 'scale-100'}`}>
        {children}
      </span>
    </button>
  );
};

// Main Workshop Slider Component
const CyberFoundationWorkshops: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const totalWorkshops: number = workshopsData.length;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalWorkshops);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalWorkshops, isHovered]);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrev = (): void => {
    setCurrentIndex((prev) => (prev - 1 + totalWorkshops) % totalWorkshops);
    setTranslateX(0);
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % totalWorkshops);
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartX(e.pageX - translateX);
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const diff = currentX - startX;
    setTranslateX(Math.max(-200, Math.min(200, diff)));
  };

  const handleMouseUp = (): void => {
    if (!isDragging) return;

    const threshold = 80;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setIsDragging(false);
    setTranslateX(0);
    document.body.style.cursor = "default";
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - translateX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    setTranslateX(Math.max(-200, Math.min(200, diff)));
  };

  const handleTouchEnd = (): void => {
    if (!isDragging) return;

    const threshold = 80;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setIsDragging(false);
    setTranslateX(0);
  };

  const currentWorkshop: Workshop = workshopsData[currentIndex];

  return (
    <section className="relative w-full bg-black select-none pt-20 py-32 overflow-hidden">
      {/* Enhanced Background System */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-purple-950" />
        <HolographicGrid />
        <CyberMatrix />
        <FloatingParticles />
        
        {/* Dynamic Ambient Lighting */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-pink-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow delay-2000" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse-slow delay-3000" />
        </div>

        {/* Scanning Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-down" />
          <div className="h-full w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-scan-right" />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-2 gap-20 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-12 flex flex-col justify-center">
            {/* Header Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl flex items-center justify-center border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-500 shadow-2xl">
                    <Network className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-3xl animate-ping opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                    <Cpu className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-3 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <div className="absolute bottom-3 left-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500" />
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <SmoothGlitchText className="text-cyan-400 font-black text-2xl uppercase tracking-wider">
                      {currentWorkshop.subtitle}
                    </SmoothGlitchText>
                    <SmoothGlitchText className="text-white font-black text-4xl uppercase tracking-wide bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent" intensity="high">
                      {currentWorkshop.title}
                    </SmoothGlitchText>
                  </div>
                  <div className="w-40 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.6)]" />
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-10">
                <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                  <SmoothGlitchText>
                    Cyber{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                      Foundation
                    </span>
                  </SmoothGlitchText>
                  <span className="block text-4xl font-medium text-gray-300 mt-6 leading-relaxed">
                    Professional Workshop Series
                  </span>
                </h1>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/30 shadow-2xl group-hover:border-cyan-400/60 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl" />
                    <p className="relative text-xl text-gray-300 leading-relaxed max-w-2xl font-medium group-hover:text-white transition-colors duration-300">
                      Elevate your cybersecurity expertise through our comprehensive training programs. 
                      Building resilient digital infrastructures and cyber-aware communities through 
                      cutting-edge education and hands-on experience.
                    </p>
                  </div>
                </div>

               
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-8">
              <CyberButton onClick={handlePrev} variant="secondary" size="md">
                <MoveLeft className="w-5 h-5" />
              </CyberButton>
              
              <CyberButton onClick={handleNext} variant="secondary" size="md">
                <MoveRight className="w-5 h-5" />
              </CyberButton>
              
              {/* Enhanced Progress Indicators */}
              <div className="flex items-center gap-6 ml-8">
                {workshopsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`group relative transition-all duration-700 rounded-full overflow-hidden ${
                      index === currentIndex
                        ? "w-20 h-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                        : "w-6 h-6 bg-white/20 hover:bg-white/40 border-2 border-cyan-400/50 hover:border-cyan-400"
                    }`}
                  >
                    {index === currentIndex && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                        <div className="absolute inset-0 animate-pulse">
                          <div className="w-full h-1 bg-white/60 rounded-full" />
                        </div>
                      </>
                    )}
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      index !== currentIndex ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100" : ""
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card Section */}
          <div className="flex items-center justify-center">
            <div
              ref={cardRef}
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(${translateX}px) perspective(1000px) rotateY(${translateX * 0.1}deg)`,
              }}
            >
              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110" />
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-pink-400/40 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-80 transition-all duration-500" />

              {/* Main Card */}
              <div className="relative w-[500px] h-[640px] bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 backdrop-blur-xl rounded-[2rem] border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-700 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                
                {/* Card Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-2xl animate-float" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-400/30 to-transparent rounded-full blur-2xl animate-float-delayed" />
                </div>

                {/* Header Image */}
                <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
                  <img
                    src={currentWorkshop.image}
                    alt={currentWorkshop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    {currentWorkshop.icon}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6 relative">
                  {/* Title and Subtitle */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                      {currentWorkshop.title}
                    </h3>
                    <p className="text-lg text-cyan-400 font-semibold tracking-wide">
                      {currentWorkshop.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                    {currentWorkshop.description}
                  </p>

                  

                  {/* Call to Action */}
                  <div className="pt-4">
                    <CyberButton
                      onClick={() => console.log(`Enroll in ${currentWorkshop.title}`)}
                      className="w-full justify-center group/btn"
                    >
                      <Sparkles className="w-5 h-5 group-hover/btn:animate-spin" />
                      Enroll Now
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </CyberButton>
                  </div>
                </div>

                {/* Hover Overlay Effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-1/4 left-8 w-1 h-16 bg-gradient-to-b from-cyan-400 to-purple-400 animate-pulse" />
                  <div className="absolute bottom-1/4 right-8 w-1 h-16 bg-gradient-to-b from-purple-400 to-pink-400 animate-pulse delay-300" />
                </div>
              </div>

              {/* Side Indicators */}
              <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 space-y-4">
                {workshopsData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-12 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? "bg-gradient-to-b from-cyan-400 to-purple-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-6 relative z-10 space-y-16">
        {/* Mobile Header */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <SmoothGlitchText className="text-4xl md:text-5xl font-black text-white">
              Cyber{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Foundation
              </span>
            </SmoothGlitchText>
            <p className="text-xl text-gray-300 font-medium">Professional Workshop Series</p>
          </div>
          
          <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/30">
            <p className="text-gray-300 leading-relaxed">
              Elevate your cybersecurity expertise through comprehensive training programs.
            </p>
          </div>
        </div>

        {/* Mobile Card */}
        <div className="max-w-md mx-auto">
          <div className="relative group">
            {/* Mobile Card Implementation */}
            <div className="w-full bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/30 overflow-hidden">
              
              {/* Mobile Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={currentWorkshop.image}
                  alt={currentWorkshop.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  {React.cloneElement(currentWorkshop.icon, { className: "w-6 h-6 text-white" })}
                </div>
              </div>

              {/* Mobile Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">{currentWorkshop.title}</h3>
                  <p className="text-cyan-400 font-semibold">{currentWorkshop.subtitle}</p>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{currentWorkshop.description}</p>

                {/* Mobile Stats */}
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white ml-2">{currentWorkshop.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Level:</span>
                    <span className="text-white ml-2">{currentWorkshop.level}</span>
                  </div>
                </div>

                <CyberButton onClick={() => console.log(`Enroll in ${currentWorkshop.title}`)} className="w-full justify-center">
                  <Sparkles className="w-4 h-4" />
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </CyberButton>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <CyberButton onClick={handlePrev} variant="secondary" size="sm">
              <MoveLeft className="w-4 h-4" />
            </CyberButton>

            <div className="flex gap-3">
              {workshopsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-cyan-400 to-purple-400 scale-125"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <CyberButton onClick={handleNext} variant="secondary" size="sm">
              <MoveRight className="w-4 h-4" />
            </CyberButton>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes matrix-cascade {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes cyber-drift {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(20px) translateY(-10px) rotate(90deg); }
          50% { transform: translateX(0) translateY(-20px) rotate(180deg); }
          75% { transform: translateX(-20px) translateY(-10px) rotate(270deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes scan-down {
          0% { top: 0%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes scan-right {
          0% { left: 0%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-scan-down { animation: scan-down 3s ease-in-out infinite; }
        .animate-scan-right { animation: scan-right 4s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite 3s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-glitch-1 { animation: glitch-1 0.15s ease-in-out; }
        .animate-glitch-2 { animation: glitch-2 0.15s ease-in-out; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-3000 { animation-delay: 3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </section>
  );
};

export default CyberFoundationWorkshops;
"use client";

import { useState, useEffect, useRef } from "react";
import { FaShieldAlt, FaGamepad, FaUserShield, FaLock, FaEye, FaBolt } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";

// Simulated images for cards
const financial = "/citizen.jpg";
const citizen = "/cyber-fraude.jpeg";
const crypto = "/cyrpto.jpg";

// Interface for matrix items
interface MatrixItem {
  id: number;
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

// Interface for CyberCard props
interface CyberCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  semicontent: string;
  image: string;
  reverse?: boolean;
}

// Cyber Matrix Background Component
const CyberMatrix = () => {
  const [matrix, setMatrix] = useState<MatrixItem[]>([]);

  useEffect(() => {
    const chars = "01😎🚀🔒🛡️⚡";
    const newMatrix: MatrixItem[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setMatrix(newMatrix);

    const interval = setInterval(() => {
      setMatrix((prev) =>
        prev.map((item) => ({
          ...item,
          y: item.y + item.speed > 100 ? -5 : item.y + item.speed,
          opacity: Math.random() * 0.3 + 0.1,
        }))
      );
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {matrix.map((item) => (
        <div
          key={item.id}
          className="absolute text-green-400 font-mono text-sm transition-all duration-150"
          style={{ 
            left: `${item.x}%`, 
            top: `${item.y}%`, 
            opacity: item.opacity,
            transform: `translateZ(0)` // Hardware acceleration
          }}
        >
          {item.char}
        </div>
      ))}
    </div>
  );
};

// Floating Security Icons
const FloatingIcons = () => {
  const icons = [FaLock, FaShieldAlt, FaEye, FaBolt];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-orange-400/20"
          style={{ left: `${20 + index * 20}%`, top: `${20 + index * 15}%` }}
          animate={{ 
            y: [-10, 10], 
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 6 + index * 2, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Icon className="text-4xl drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
        </motion.div>
      ))}
    </div>
  );
};

// Cyber Card Component
const CyberCard = ({ icon: Icon, title, content, semicontent, image, reverse = false }: CyberCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Active Label */}
      {/* <div className="absolute top-4 right-4 bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">
        Active
      </div> */}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-orange-500/30 rounded-3xl blur-xl"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 md:pt-[43px] border-2 border-green-300/50 hover:border-cyan-400/70 transition-all duration-300 overflow-hidden">
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Scan Line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ y: isHovered ? "400%" : "-100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Corner Decorations */}
        {[
          "top-4 left-4 border-l-2 border-t-2 border-cyan-400/60",
          "top-4 right-4 border-r-2 border-t-2 border-orange-400/60",
          "bottom-4 left-4 border-l-2 border-b-2 border-purple-400/60",
          "bottom-4 right-4 border-r-2 border-b-2 border-green-400/60",
        ].map((style, idx) => (
          <div key={idx} className={`absolute w-6 h-6 transition-all duration-300 ${style}`} />
        ))}

        <div className="flex items-center gap-6 mb-8 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-orange-500/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-400" />
            <div className="relative p-4 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-orange-400/50 group-hover:border-cyan-400 transition-colors duration-300">
              <Icon className="text-orange-400 group-hover:text-cyan-400 text-4xl transition-colors duration-300 drop-shadow-[0_0_8px_currentColor]" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-orange-400 group-hover:from-orange-400 group-hover:via-cyan-400 group-hover:to-purple-400 transition-all duration-400">
              {title}
            </h3>
            <div className="h-1 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full mt-2" />
          </div>
        </div>

        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch gap-8 relative z-10`}>
          <div className="relative w-full lg:w-1/2 min-h-[16rem] rounded-2xl overflow-hidden group/image">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-orange-500/10 z-10" />
            <div className="absolute inset-0 border-2 border-orange-400/50 rounded-2xl group-hover:border-cyan-400/70 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-400" />
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_currentColor] animate-pulse" />
            <div className="absolute bottom-3 left-3 w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_8px_currentColor] animate-pulse" />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300 tracking-wide">
                {content}
              </p>
              <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-gray-200 transition-colors duration-300 tracking-wide italic mt-4">
                "{semicontent}"
              </p>
            </div>

            <div className="mt-6">
              <button className="relative px-6 py-3 bg-gradient-to-r from-gray-800 via-black to-gray-800 hover:from-cyan-900/50 hover:via-purple-900/50 hover:to-orange-900/50 text-white font-bold rounded-full transition-all duration-300 border-2 border-orange-400/50 hover:border-cyan-400 overflow-hidden group/btn">
                <span className="relative flex items-center justify-center gap-2">
                  <span className="text-orange-400 group-hover/btn:text-cyan-400 transition-colors duration-300">Learn More</span>
                  <motion.svg
                    className="w-5 h-5 text-orange-400 group-hover/btn:text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



const InteractiveMarquee = () => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const events = [
    {
      title: "Advanced Cyber Security Workshop",
      date: "January 15, 2025",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
      description:
        "Comprehensive training on latest cybersecurity threats, defense mechanisms, and incident response strategies.",
      category: "Workshop",
      duration: "6 hours",
    },
    {
      title: "Phishing Detection Masterclass",
      date: "December 20, 2024",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80",
      description:
        "Interactive session teaching advanced phishing detection techniques and email security best practices.",
      category: "Masterclass",
      duration: "4 hours",
    },
    {
      title: "Digital Safety for Senior Citizens",
      date: "November 28, 2024",
      image:
"https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      description:
        "Specialized program focusing on online safety, scam prevention, and secure digital practices for elderly users.",
      category: "Community Outreach",
      duration: "3 hours",
    },
    {
      title: "Cryptocurrency & Blockchain Security",
      date: "October 10, 2024",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80",

      description:
        "Expert insights on crypto security, wallet protection, DeFi risks, and identifying fraudulent schemes.",
      category: "Seminar",
      duration: "5 hours",
    },
    {
      title: "Kids Online Safety Program",
      date: "September 15, 2024",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
      description:
        "Fun and educational program teaching children safe internet usage, cyberbullying prevention, and digital citizenship.",
      category: "Educational Program",
      duration: "2 hours",
    },
    {
      title: "UPI Fraud Prevention Workshop",
      date: "August 22, 2024",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
      description:
        "Hands-on training to identify UPI scams, QR code frauds, and secure mobile payment practices.",
      category: "Workshop",
      duration: "3 hours",
    },
    {
      title: "Identity Theft Protection Seminar",
      date: "July 18, 2024",
      image:
        "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=400&q=80",
      description:
        "Comprehensive guide on protecting personal information, preventing identity theft, and recovery strategies.",
      category: "Seminar",
      duration: "4 hours",
    },
    {
      title: "E-commerce Security Awareness",
      date: "June 25, 2024",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
      description:
        "Essential tips for safe online shopping, recognizing fake websites, and secure payment methods.",
      category: "Awareness Session",
      duration: "2.5 hours",
    },
  ];

  // Duplicate for infinite scrolling
  const duplicatedEvents = [...events, ...events];

  useEffect(() => {
    const containerWidth = containerRef.current?.scrollWidth || 0;
    const resetPoint = -(containerWidth / 2);

    controls.start({
      x: [0, resetPoint],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-orange-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Past Events
        </motion.h2>
        <motion.p
          className="text-gray-300 text-lg max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the impactful cybersecurity initiatives we've conducted to
          protect our community
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="relative select-none">
        <motion.div
          ref={containerRef}
          className="flex gap-6"
          style={{ x }}
          animate={controls}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.1}
          onDragStart={() => {
            setIsDragging(true);
            controls.stop();
          }}
          onDragEnd={() => {
            setIsDragging(false);
            const containerWidth = containerRef.current?.scrollWidth || 0;
            const resetPoint = -(containerWidth / 2);

            controls.start({
              x: [x.get(), resetPoint],
              transition: {
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              },
            });
          }}
        >
          {duplicatedEvents.map((event, index) => (
            <motion.div
              key={`${event.title}-${index}`}
              className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-800/90 to-black/90 rounded-2xl overflow-hidden border border-cyan-400/20 hover:border-orange-400/50 transition-all duration-300 group relative"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(34,211,238,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Status */}
              <span className="absolute top-4 right-4 bg-red-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                Completed
              </span>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  {/* <span className="text-cyan-400 text-sm font-medium">
                    {event.date}
                  </span> */}
                  {/* <span className="text-orange-400 text-sm font-medium">
                    {event.duration}
                  </span> */}
                </div>
                <h3 className="text-white text-lg font-bold mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fade Edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
    </div>
  );
};



// Main Component
const SparkingStep = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full">
      <section className="relative min-h-screen bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(34, 211, 238, 0.12) 0%, 
              rgba(168, 85, 247, 0.08) 30%, 
              rgba(249, 115, 22, 0.08) 60%, 
              rgba(0, 0, 0, 1) 100%)`,
          }}
        />

        <CyberMatrix />
        <FloatingIcons />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start max-w-7xl mx-auto mt-16">
            <div className="space-y-5">
              {/* Hero Badge */}
         {/* Hero Badge */}
{/* Hero Badge */}
{/* Hero Badge */}
{/* Hero Badge (desktop only) */}
<motion.div
  className="relative hidden md:inline-block group"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse" />
  <div className="relative bg-gradient-to-r from-cyan-400 to-orange-500 text-black font-bold text-[15px] px-9 py-3 rounded-full shadow-2xl">
    🔒 CYBER SECURITY INITIATIVE
  </div>
</motion.div>

              {/* Main Headlines */}
              <div className="space-y-4 md:space-y-4">
                <motion.h1 
                  className="text-3xl sm:text-6xl lg:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-orange-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Sparking Steps
                </motion.h1>
                <motion.h2 
                  className="text-[18px] sm:text-4xl lg:text-4xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Protecting Every Citizen from Digital Threats
                </motion.h2>
              </div>

              {/* Description Card */}
              <motion.div
                className="relative p-6 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-orange-400/30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-orange-500/5 rounded-2xl" />
                <p className="relative text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
                  At{" "}
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">
                    Sadaiv Yuva Foundation
                  </span>
                  , we aim to build a cyber-aware nation by addressing the most critical forms of cybercrime. Our services educate, empower, and protect people from all walks of life — from children and women to elders and working professionals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <CyberCard
                  icon={FaShieldAlt}
                  title="Financial Frauds Protection"
                  content="We educate people on spotting phishing scams, fake investments, OTP frauds, and UPI misuse. Awareness empowers individuals to protect their finances and take quick action against digital financial threats."
                  semicontent="Our key focus areas include: Identifying suspicious banking & payment messages, Recognizing fake investment opportunities."
                  image={financial}
                />
              </motion.div>
            </div>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <CyberCard
                  icon={FaUserShield}
                  title="Citizen Cyber Fraud"
                  content="Women, children, and elders often face online abuse and fake job scams. We promote digital safety through awareness sessions, teach secure online habits, and encourage prompt reporting to combat cyber threats effectively."
                  semicontent="Stay safe from trolls and scams with our tips! 🛡️"
                  image={citizen}
                  reverse={true}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <CyberCard
                  icon={FaGamepad}
                  title="Crypto & Gaming Scams"
                  content="Crypto and gaming scams are rising fast. We help users detect fake rewards, phishing links, and fraudulent investments, promoting secure digital behavior through awareness, education, and practical tips for online safety."
                  semicontent="No more falling for fake V-Bucks or crypto moon promises! 🚀"
                  image={crypto}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Ambient Light Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        </div>
      </section>

      {/* Enhanced Interactive Marquee Section */}
      <InteractiveMarquee />

      
    </div>
  );
};

export default SparkingStep;
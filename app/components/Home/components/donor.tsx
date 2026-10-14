import React, { useState, useEffect, useRef } from 'react';
import { Shield, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, ExternalLink, PlayCircle } from 'lucide-react';

interface FraudItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  tips: string[];
  position?: number;
}

interface CyberTip {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  platform: string;
  tips: string[];
  difficulty: string;
  impact: string;
}

const fraudData: FraudItem[] = [
  {
    id: 1,
    title: "UPI Fraud",
    description: "Fraudsters trick users into sharing UPI PINs or scanning malicious QR codes to steal money from their accounts.",
    icon: "💳",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    tips: [
      "Never share your UPI PIN with anyone",
      "Verify QR codes before scanning",
      "Check transaction details carefully",
      "Use secure payment apps only"
    ]
  },
  {
    id: 2,
    title: "OTP Fraud",
    description: "Scammers call pretending to be bank officials and ask for OTPs to gain unauthorized access to accounts.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tips: [
      "Banks never ask for OTP over calls",
      "Don't share OTPs with anyone",
      "Verify caller identity independently",
      "Report suspicious calls immediately"
    ]
  },
  {
    id: 3,
    title: "Phishing Emails",
    description: "Fake emails designed to steal personal information by mimicking legitimate organizations.",
    icon: "📧",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    tips: [
      "Check sender's email address carefully",
      "Don't click suspicious links",
      "Verify requests through official channels",
      "Use email security filters"
    ]
  },
  {
    id: 4,
    title: "Social Media Scams",
    description: "Fraudsters use fake profiles and too-good-to-be-true offers to deceive users on social platforms.",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    tips: [
      "Verify profiles before engaging",
      "Be skeptical of unrealistic offers",
      "Don't share personal information",
      "Report suspicious accounts"
    ]
  },
  {
    id: 5,
    title: "Investment Fraud",
    description: "Fake investment schemes promising high returns to lure victims into financial traps.",
    icon: "📈",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
    tips: [
      "Research investment opportunities thoroughly",
      "Verify company credentials",
      "Be wary of guaranteed high returns",
      "Consult financial advisors"
    ]
  },
  {
    id: 6,
    title: "Job Scams",
    description: "Fake job offers that ask for money upfront or personal information for fraudulent purposes.",
    icon: "💼",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop",
    tips: [
      "Legitimate jobs don't require upfront payment",
      "Verify company through official channels",
      "Be cautious of work-from-home offers",
      "Research company reviews online"
    ]
  },
  {
    id: 7,
    title: "Lottery Scams",
    description: "Fake lottery winnings that require fees or personal information to claim non-existent prizes.",
    icon: "🎰",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop",
    tips: [
      "You can't win a lottery you didn't enter",
      "Legitimate lotteries don't ask for fees",
      "Don't share personal information",
      "Report lottery scam calls"
    ]
  },
  {
    id: 8,
    title: "Tech Support Scams",
    description: "Fake tech support calls claiming your computer is infected and offering paid solutions.",
    icon: "🖥️",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    tips: [
      "Never give remote access to strangers",
      "Verify tech support through official channels",
      "Don't install unknown software",
      "Hang up on unsolicited tech calls"
    ]
  }
];

const cyberTips: CyberTip[] = [
  {
    id: 1,
    title: "Strong Password Protection",
    description: "Create unique, complex passwords for all your accounts and enable two-factor authentication.",
    icon: "🔐",
    color: "bg-gradient-to-r from-blue-500 to-purple-600",
    platform: "All Platforms",
    tips: [
      "Use at least 12 characters",
      "Include uppercase, lowercase, numbers, and symbols",
      "Never reuse passwords across accounts",
      "Use a password manager"
    ],
    difficulty: "Easy",
    impact: "High"
  },
  {
    id: 2,
    title: "Safe Online Shopping",
    description: "Shop securely online by verifying websites and using secure payment methods.",
    icon: "🛒",
    color: "bg-gradient-to-r from-green-500 to-teal-600",
    platform: "E-commerce",
    tips: [
      "Look for HTTPS in the URL",
      "Check website reviews and ratings",
      "Use secure payment gateways",
      "Avoid public WiFi for transactions"
    ],
    difficulty: "Easy",
    impact: "High"
  },
  {
    id: 3,
    title: "Email Security",
    description: "Protect yourself from phishing attacks and email-based scams.",
    icon: "✉️",
    color: "bg-gradient-to-r from-red-500 to-pink-600",
    platform: "Email",
    tips: [
      "Verify sender before clicking links",
      "Don't download suspicious attachments",
      "Use spam filters",
      "Report phishing emails"
    ],
    difficulty: "Medium",
    impact: "High"
  },
  {
    id: 4,
    title: "Social Media Privacy",
    description: "Keep your personal information safe on social media platforms.",
    icon: "📱",
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    platform: "Social Media",
    tips: [
      "Review privacy settings regularly",
      "Think before you post",
      "Avoid sharing location data",
      "Be selective with friend requests"
    ],
    difficulty: "Easy",
    impact: "Medium"
  },
  {
    id: 5,
    title: "Mobile Security",
    description: "Secure your smartphone and mobile apps from threats.",
    icon: "📲",
    color: "bg-gradient-to-r from-yellow-500 to-orange-600",
    platform: "Mobile",
    tips: [
      "Keep apps updated",
      "Download from official stores only",
      "Use screen locks",
      "Enable remote wipe feature"
    ],
    difficulty: "Easy",
    impact: "High"
  },
  {
    id: 6,
    title: "WiFi Security",
    description: "Stay safe when using public and home WiFi networks.",
    icon: "📶",
    color: "bg-gradient-to-r from-cyan-500 to-blue-600",
    platform: "Network",
    tips: [
      "Avoid public WiFi for sensitive tasks",
      "Use VPN on public networks",
      "Secure your home WiFi",
      "Turn off auto-connect features"
    ],
    difficulty: "Medium",
    impact: "High"
  }
];

const CyberTrustShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(2);
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'frauds' | 'tips'>('frauds');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragThreshold = 50;

  // Auto-rotate tips
  useEffect(() => {
    if (activeTab === 'tips' && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % cyberTips.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab, isAutoPlaying]);

  // Auto-rotate frauds
  useEffect(() => {
    if (activeTab === 'frauds') {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % fraudData.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % fraudData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + fraudData.length) % fraudData.length);
  };

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % cyberTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + cyberTips.length) % cyberTips.length);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) prevSlide();
      else nextSlide();
    }
    setDragOffset(0);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) handleMouseUp();
    };

    const handleGlobalMouseMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientX = 'clientX' in e ? e.clientX : (e as TouchEvent).touches[0].clientX;
        const diff = clientX - startX;
        setDragOffset(diff);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('touchend', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchend', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalMouseMove);
    };
  }, [isDragging, startX, dragOffset]);

  const getVisibleFrauds = (): FraudItem[] => {
    const result: FraudItem[] = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + fraudData.length) % fraudData.length;
      result.push({ ...fraudData[index], position: i });
    }
    return result;
  };

  const visibleFrauds = getVisibleFrauds();
  const currentTip = cyberTips[currentTipIndex];

  const handleCardClick = (position: number | undefined) => {
    if (position === -2) setCurrentIndex((prev) => (prev - 2 + fraudData.length) % fraudData.length);
    else if (position === -1) prevSlide();
    else if (position === 1) nextSlide();
    else if (position === 2) setCurrentIndex((prev) => (prev + 2) % fraudData.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-2 h-full">
          {[...Array(96)].map((_, i) => (
            <div key={i} className="border border-white/20 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Cyber Tips
              </h1>
              {/* <p className="text-gray-300">🇮🇳 Protecting Digital India</p> */}
            </div>
          </div>
          {/* <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Cyber Tips
          </h2> */}
          <p className="text-gray-300 max-w-2xl mx-auto">
            🛡️ Empowering communities with knowledge to combat cyber threats.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            <button
              onClick={() => setActiveTab('frauds')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'frauds' ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
              <AlertTriangle className="w-5 h-5" /> Fraud Types
            </button>
            <button
              onClick={() => {
                setActiveTab('tips');
                setIsAutoPlaying(true);
              }}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'tips' ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
            >
              <ShieldCheck className="w-5 h-5" /> Safety Tips
            </button>
          </div>
        </div>
        {activeTab === 'frauds' && (
          <div className="relative mb-8">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center hover:from-orange-500 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center hover:from-orange-500 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="px-16">
              <div
                ref={carouselRef}
                className="flex items-center justify-center gap-4 select-none"
                style={{
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transform: `translateX(${dragOffset * 0.15}px)`,
                  transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
              >
                {visibleFrauds.map((fraud) => {
                  const isCenter = fraud.position === 0;
                  const isFirstSide = fraud.position === -1 || fraud.position === 1;
                  const isOuterSide = fraud.position === -2 || fraud.position === 2;

                  let scaleClass = 'scale-50 opacity-40';
                  let heightClass = 'h-[650px]'; // Smallest height for outer cards
                  let zIndex = 'z-10';

                  if (isCenter) {
                    scaleClass = 'scale-100 opacity-100';
                    heightClass = 'h-[480px]'; // Full height for center card
                    zIndex = 'z-20';
                  } else if (isFirstSide) {
                    scaleClass = 'scale-80 opacity-70';
                    heightClass = 'h-[440px]'; // Slightly smaller height for first-side cards
                    zIndex = 'z-15';
                  }

                  return (
                    <div
                      key={fraud.id}
                      className={`relative transition-all duration-500 -mx-20 ${scaleClass} ${zIndex} cursor-pointer`}
                      onClick={() => handleCardClick(fraud.position)}
                      onMouseEnter={() => setHoveredCard(fraud.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`relative w-96 ${heightClass} rounded-2xl overflow-hidden border ${isCenter ? 'border-orange-400/50 shadow-2xl' : 'border-white/20 shadow-lg'
                          } bg-purple-900 flex flex-col hover:border-orange-400/30 transition-all duration-300`}
                      >
                        <div className="w-full h-48 overflow-hidden">
                          <img
                            src={fraud.image}
                            alt={fraud.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-2xl">{fraud.icon}</div>
                            <h3 className="text-lg font-bold text-white">{fraud.title}</h3>
                          </div>
                          <p className="text-gray-200 text-lg font-semibold mb-4 line-clamp-3">{fraud.description}</p>
                          {isCenter && (
                            <div className="space-y-2 mt-auto">
                              <div className="text-lg font-semibold text-gray-300 ">Protection Tips:</div>
                              {fraud.tips.map((tip, tipIndex) => (
                                <div key={tipIndex} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm font-semibold text-gray-200">{tip}</span>
                                </div>
                              ))}
                              <button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 mt-4 transition-all shadow-lg hover:shadow-xl">
                                <Shield className="w-4 h-4" /> Learn Protection
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                        {hoveredCard === fraud.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-2xl animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {fraudData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gradient-to-r from-orange-400 to-orange-600 scale-125 shadow-lg' : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 relative"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={prevTip}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTip}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${currentTip.color} flex items-center justify-center text-2xl shadow-lg`}>{currentTip.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentTip.title}</h3>
                      <p className="text-gray-300 text-sm">{currentTip.platform}</p>
                    </div>
                  </div>
                  <p className="text-gray-200 mb-4 text-sm">{currentTip.description}</p>
                  <div className="space-y-2 mb-4">
                    {currentTip.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-200 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <button className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-all">
                      <ExternalLink className="w-4 h-4" /> Learn More
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">All Safety Tips</h3>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
                  >
                    <PlayCircle className="w-4 h-4" /> {isAutoPlaying ? 'Pause' : 'Auto Play'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cyberTips.map((tip, index) => (
                    <button
                      key={tip.id}
                      onClick={() => setCurrentTipIndex(index)}
                      className={`p-4 rounded-lg border transition-all duration-300 text-left relative ${index === currentTipIndex
                        ? 'bg-gradient-to-r from-orange-400/20 to-orange-600/20 border-orange-400/50'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${tip.color} flex items-center justify-center text-xl`}>{tip.icon}</div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{tip.title}</h4>
                          <p className="text-xs text-gray-300">{tip.platform}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-200 line-clamp-2 mb-3">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-xs text-gray-300">{tip.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full" />
                          <span className="text-xs text-gray-300">{tip.impact}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-300">Tips Progress</span>
                    <span className="text-xs font-medium text-white">{currentTipIndex + 1} / {cyberTips.length}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${((currentTipIndex + 1) / cyberTips.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberTrustShowcase;
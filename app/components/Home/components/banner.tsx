import React, { useState, useEffect, ReactNode } from "react";
import {
  MoveRight,
  Shield,
  Globe,
  Users,
  Lock,
  TrendingUp,
  Heart,
  Play,
  ArrowRight,
  Brain,
  Sparkles,
  Star,
  Gift,
  AlertCircle,
  Check
} from "lucide-react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "glow";
  size?: "sm" | "md" | "lg";
}

interface AnimateElements {
  title: boolean;
  subtitle: boolean;
  buttons: boolean;
  image: boolean;
}

interface FormData {
  name: string;
  mobileNo: string;
  email: string;
  pancard: string;
  amount: string;
}

interface FormErrors {
  name: string;
  mobileNo: string;
  email: string;
  pancard: string;
  amount: string;
}

interface FormField {
  name: keyof FormData;
  placeholder: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const typewriterTexts: string[] = [
  "Cyber Awareness",
  "Digital Safety",
  "Secure Future",
  "Smart Protection",
  "Online Security",
  "Digital Literacy",
  "Cyber Defense",
  "Safe Computing",
  "Digital Trust",
];

const Typewriter: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [textIndex, setTextIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentText.substring(0, prev.length - 1)
          : currentText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [displayedText, isDeleting, textIndex, texts]);

  return (
    <span className="relative inline-block">
      <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        {displayedText}
      </span>
      <span className="absolute -right-1 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-pink-500 animate-pulse" />
    </span>
  );
};

const FloatingParticles: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particleStyles = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  }));

  return isClient ? (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particleStyles.map((style, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-pulse ${i % 3 === 0 ? "w-2 h-2 xs:w-3 xs:h-3 bg-orange-400/20" :
              i % 3 === 1 ? "w-1.5 h-1.5 xs:w-2 xs:h-2 bg-pink-400/20" :
                "w-1 h-1 bg-purple-400/20"
            }`}
          style={style}
        />
      ))}
    </div>
  ) : null;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md"
}) => {
  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40",
    secondary: "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
    glow: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/75"
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs xs:px-4 xs:py-2 xs:text-sm",
    md: "px-4 py-2 text-sm xs:px-5 xs:text-base sm:px-6 sm:py-3",
    lg: "px-5 py-3 text-base xs:px-6 sm:px-8 sm:py-4 sm:text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl font-bold text-white ${variants[variant]} ${sizes[size]} transform hover:scale-105 transition-all duration-300 overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="flex items-center gap-2 z-10 relative">
        {children}
        <MoveRight className="w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
};

const PlayButton: React.FC = () => (
  <div className="relative w-16 h-16 xs:w-20 xs:h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-ping opacity-20" />
    <div className="absolute inset-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-60" />
    <button
      className="relative z-10 w-12 h-12 xs:w-16 xs:h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 group"
      onClick={() => alert("Play video")}
    >
      <Play className="w-5 h-5 xs:w-6 xs:h-6 ml-1 group-hover:scale-110 transition-transform" />
    </button>
  </div>
);

interface DonationFormProps {
  animateElements: AnimateElements;
}

const DonationForm: React.FC<DonationFormProps> = ({ animateElements }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobileNo: "",
    email: "",
    pancard: "",
    amount: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    mobileNo: "",
    email: "",
    pancard: "",
    amount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: FormErrors = {
      name: formData.name ? "" : "Name is required",
      mobileNo: formData.mobileNo
        ? /^\d{10}$/.test(formData.mobileNo)
          ? ""
          : "Mobile number must be 10 digits"
        : "Mobile number is required",
      email: formData.email
        ? /^\S+@\S+\.\S+$/.test(formData.email)
          ? ""
          : "Invalid email address"
        : "Email is required",
      pancard: formData.pancard
        ? /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pancard)
          ? ""
          : "Invalid PAN card format"
        : "PAN card is required",
      amount: formData.amount
        ? /^\d+$/.test(formData.amount) && parseInt(formData.amount) > 0
          ? ""
          : "Please enter a valid amount"
        : "Amount is required",
    };

    setErrors(newErrors);

    setTimeout(() => {
      if (Object.values(newErrors).every((error) => !error)) {
        alert(`Donation submitted: ${JSON.stringify(formData)}`);
        setFormData({ name: "", mobileNo: "", email: "", pancard: "", amount: "" });
      }
      setIsSubmitting(false);
    }, 2000);
  };

  const formFields: FormField[] = [
    { name: "name", placeholder: "Full Name", type: "text", icon: Users, gradient: "from-blue-500 to-purple-600" },
    { name: "mobileNo", placeholder: "Mobile Number", type: "tel", icon: Shield, gradient: "from-green-500 to-teal-600" },
    { name: "email", placeholder: "Email Address", type: "email", icon: Globe, gradient: "from-orange-500 to-red-600" },
    { name: "pancard", placeholder: "PAN Card", type: "text", icon: Lock, gradient: "from-purple-500 to-pink-600" },
    { name: "amount", placeholder: "Donation Amount", type: "number", icon: TrendingUp, gradient: "from-yellow-500 to-orange-600" },
  ];

  return (
    <div className={`relative transition-all duration-1000 ease-out w-full transform ${animateElements.image ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full opacity-30 animate-bounce`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 8}%`,
            animationDelay: `${i * 500}ms`,
            animationDuration: `${2000 + i * 500}ms`,
          }}
        />
      ))}

      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-br from-white/95 via-white/90 to-gray-50/95 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/30 w-full max-w-[450px] mx-auto overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute w-32 h-32 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-2xl transition-all duration-300 pointer-events-none"
          style={{
            left: isHovered ? mousePosition.x * 0.1 : '50%',
            top: isHovered ? mousePosition.y * 0.1 : '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="text-center mb-1 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl border border-white/30 backdrop-blur-xl mb-3 shadow-xl">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <Heart className="w-6 h-6 text-orange-300 opacity-75" />
              </div>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 font-bold text-lg">
              Donation
            </span>
            <Sparkles className="w-5 h-5 text-purple-500 animate-spin" />
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          {formFields.map(({ name, placeholder, type, icon: Icon, gradient }) => (
            <div key={name} className="group">
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                    focusedField === name
                      ? `bg-gradient-to-r ${gradient} p-[px] animate-pulse shadow-2xl`
                      : errors[name]
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 p-[1px]'
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 p-[1px] hover:from-orange-300 hover:to-pink-300'
                  }`}
                >
                  <div className="h-full w-full bg-white rounded-2xl" />
                </div>

                <div
                  className={`relative bg-gradient-to-br from-white via-white to-gray-50/50 backdrop-blur-xl rounded-2xl transition-all duration-500 transform ${
                    focusedField === name
                      ? 'shadow-2xl scale-[1.02] shadow-orange-500/30'
                      : errors[name]
                      ? 'shadow-lg shadow-red-500/20'
                      : 'hover:shadow-xl hover:scale-[1.01] shadow-gray-200/50'
                  }`}
                >
                  <label
                    className={`absolute left-14 transition-all duration-300 pointer-events-none font-semibold text-sm sm:text-base ${
                      focusedField === name || formData[name]
                        ? 'top-3 text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600'
                        : 'top-1/2 -translate-y-1/2 text-orange-500'
                    }`}
                  >
                    {placeholder}
                  </label>

                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      focusedField === name
                        ? `text-transparent bg-clip-text bg-gradient-to-r ${gradient} scale-110`
                        : 'text-orange-500 group-hover:text-orange-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {focusedField === name && (
                      <div className="absolute inset-0 animate-ping opacity-30">
                        <Icon className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField("")}
                    className={`w-full pl-14 pr-16 py-4 bg-transparent text-gray-800 placeholder-transparent focus:outline-none text-base font-medium transition-all duration-300 ${
                      focusedField === name || formData[name] ? 'pt-7 pb-3' : ''
                    }`}
                  />

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {formData[name] && (
                      <div
                        className={`transition-all duration-500 ${
                          errors[name]
                            ? 'text-red-500 animate-bounce'
                            : 'text-green-500 animate-pulse'
                        }`}
                      >
                        {errors[name] ? (
                          <AlertCircle className="w-5 h-5" />
                        ) : (
                          <div className="relative">
                            <Check className="w-5 h-5" />
                            <div className="absolute inset-0 animate-ping opacity-30">
                              <Check className="w-5 h-5" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 ${
                      focusedField === name ? 'w-full shadow-lg' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              <div className="px-2 overflow-hidden">
                <div
                  className={`transform transition-all duration-500 ${
                    errors[name]
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-full opacity-0 scale-95'
                  }`}
                >
                  {errors[name] && (
                    <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 px-3 py-2 rounded-xl">
                      <AlertCircle className="w-4 h-4 animate-pulse flex-shrink-0" />
                      {errors[name]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 shadow-2xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-500 text-lg overflow-hidden group ${
              isSubmitting ? 'opacity-70 cursor-not-allowed scale-95' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <div className="relative z-10">
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Your Donation...</span>
                  <Gift className="w-5 h-5 animate-bounce" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                  <span className="group-hover:tracking-wide transition-all duration-300">
                    Donate Now
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

const CharityDonationPage: React.FC = () => {
  const [animateElements, setAnimateElements] = useState<AnimateElements>({
    title: true,
    subtitle: true,
    buttons: true,
    image: true,
  });

  return (
    <div className="relative px-4 xs:px-6 pt-44 md:pt-20 sm:px-8 md:px-12 lg:px-20 sm:pt-16 min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,107,107,0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.3),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.3),transparent_70%)]" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] xs:bg-[size:50px_50px] sm:bg-[size:60px_60px] animate-pulse" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left w-full lg:w-1/2">
            <div className={`transition-all mt-8 ease-out transform ${animateElements.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Securing Every
                <br />
                <span className="text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text">
                  Digital Life
                </span>
              </h1>
              <div className="text-xl xs:text-2xl sm:text-3xl text-gray-300 font-semibold mb-4 sm:mb-6">
                Building a Safer Tomorrow with
              </div>
              <div className="min-h-[60px] xs:min-h-[70px] sm:min-h-[80px] flex items-center justify-center lg:justify-start">
                <Typewriter texts={typewriterTexts} />
              </div>
            </div>

            <p className={`text-base xs:text-lg sm:text-xl text-gray-300 max-w-full sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all ease-out transform ${animateElements.subtitle ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
              We provide comprehensive <span className="text-orange-400 font-bold">cyber awareness training</span>,
              <span className="text-pink-400 font-bold"> security solutions</span>, and
              <span className="text-purple-400 font-bold"> digital safety support</span> to protect communities worldwide.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start transition-all ease-out transform ${animateElements.buttons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative group w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <button className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white font-bold py-4 xs:py-5 sm:py-6 px-6 xs:px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 group w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center gap-1 xs:gap-1.5 mb-1">
                      <Brain className="w-5 h-5 xs:w-6 xs:h-6" />
                      <span className="text-2xl font-black">Sadaiv Yuva Cyber Shield Certification</span>
                    </div>
                    <div className="text-2xl underline font-bold opacity-90">Test Your Cyber Knowledge Now</div>
                  </div>
                </button>
              </div>
              {/* <PlayButton /> */}
            </div>
          </div>

          <div className="flex justify-center w-full lg:w-1/2">
            <DonationForm animateElements={animateElements} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDonationPage;
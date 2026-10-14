
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Building2, User, Globe2, Shield, ArrowRight, Clock,
  Users, MapPin, Calendar, CheckCircle2, Star, Award,
  Zap, BookOpen, Target, TrendingUp, Lock, Wifi,
  AlertTriangle, Database, Code2, ChevronDown, Mail,
  Phone, Send, BarChart3, Play, FileText, ExternalLink,
  GraduationCap, ChevronRight, Quote, Cpu, Eye,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   FONT
──────────────────────────────────────────────────────────────────*/
const FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,300;1,9..40,400&display=swap');`;

/* ─────────────────────────────────────────────────────────────────
   TOKENS — Deep Obsidian
──────────────────────────────────────────────────────────────────*/
const T = {
  bg:       "#07090F",
  bg2:      "#0C1018",
  card:     "#111520",
  card2:    "#161C2C",
  border:   "rgba(255,255,255,0.07)",
  border2:  "rgba(255,255,255,0.12)",
  white:    "#FFFFFF",
  dim:      "rgba(255,255,255,0.72)",
  muted:    "rgba(255,255,255,0.42)",
  faint:    "rgba(255,255,255,0.18)",

  // Category accents
  corp:     "#3B82F6",     // Vivid blue
  corpGlow: "rgba(59,130,246,0.18)",
  corpFog:  "rgba(59,130,246,0.08)",

  ind:      "#10B981",     // Vivid emerald
  indGlow:  "rgba(16,185,129,0.18)",
  indFog:   "rgba(16,185,129,0.08)",

  soc:      "#F59E0B",     // Vivid amber
  socGlow:  "rgba(245,158,11,0.18)",
  socFog:   "rgba(245,158,11,0.08)",
} as const;

type Cat = "corporate" | "individual" | "social";

interface CatMeta {
  label: string; short: string;
  Icon: React.ElementType;
  accent: string; glow: string; fog: string;
  eyebrow: string; headline: string; sub: string;
  image: string;
}

const CATS: Record<Cat, CatMeta> = {
  corporate: {
    label: "Corporate Workshops", short: "Corporate",
    Icon: Building2,
    accent: T.corp, glow: T.corpGlow, fog: T.corpFog,
    eyebrow: "For Organisations & Teams",
    headline: "Secure your organisation from the inside out",
    sub: "Expert-led programs that build security culture at every level — from the boardroom to the help desk. Tailored to your sector, threats, and regulatory environment.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
  },
  individual: {
    label: "Individual Workshops", short: "Individual",
    Icon: User,
    accent: T.ind, glow: T.indGlow, fog: T.indFog,
    eyebrow: "For Professionals & Students",
    headline: "Build cyber skills that follow you everywhere",
    sub: "Hands-on, practical sessions for developers, freelancers, and career changers who need real, job-ready cybersecurity skills — not just a course completion badge.",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=900&q=80",
  },
  social: {
    label: "Social & Community Events", short: "Social",
    Icon: Globe2,
    accent: T.soc, glow: T.socGlow, fog: T.socFog,
    eyebrow: "For Communities & Schools",
    headline: "Cybersecurity for every citizen",
    sub: "Free seminars, school outreach, hackathons, and inclusive workshops that make digital safety accessible to every student, family, and neighbourhood across India.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  },
};

/* ─────────────────────────────────────────────────────────────────
   PROGRAMS
──────────────────────────────────────────────────────────────────*/
interface Program {
  title: string; tag: string; Icon: React.ElementType;
  duration: string; seats: string; mode: string;
  badge: string | null; desc: string; topics: string[];
  image: string;
}

const CORP: Program[] = [
  {
    title: "Cybersecurity Awareness Foundation",
    tag: "All Employees", Icon: Shield,
    duration: "1 Day", seats: "Up to 80", mode: "In-person or Virtual",
    badge: "Most Popular",
    desc: "A mandatory-baseline program that transforms security from an IT concern into an organisation-wide habit. Covers the attacks most likely to target your staff — phishing, credential theft, social engineering — with practical exercises employees actually retain.",
    topics: ["Phishing & social engineering recognition", "Password hygiene & MFA setup", "Safe cloud, email & device use", "Data handling & classification", "Incident reporting procedures", "Human error & insider threat awareness"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75",
  },
  {
    title: "Threat Detection & Incident Response",
    tag: "IT & Security Teams", Icon: AlertTriangle,
    duration: "2 Days", seats: "Up to 30", mode: "In-person Lab Required",
    badge: "Intensive",
    desc: "A rigorous technical deep-dive using the NIST incident response framework. Participants hunt real threats in a live lab, operate SIEM tooling, and run tabletop exercises simulating ransomware, data breaches, and supply-chain attacks.",
    topics: ["SIEM configuration & log analysis", "Threat intelligence feeds & IOC management", "Network traffic analysis with Wireshark", "Live red team vs blue team exercises", "Post-incident forensics & evidence collection", "NIST IR: Prepare → Detect → Contain → Recover"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=75",
  },
  {
    title: "Executive Cyber Risk & Governance",
    tag: "C-Suite & Board", Icon: BarChart3,
    duration: "Half Day", seats: "Up to 20", mode: "In-person or Virtual",
    badge: "Executive",
    desc: "A sharp, high-signal session that translates technical risk into board language. Covers cyber risk quantification, India's DPDP Act, ISO 27001 obligations, and communicating effectively through a crisis.",
    topics: ["Cyber risk quantification (FAIR model)", "DPDP Act, ISO 27001 & SEBI CSCRF", "Crisis communication & media response", "Security investment business case", "Vendor & third-party risk governance", "Cyber insurance: coverage & claims"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75",
  },
  {
    title: "Secure Software Development Lifecycle",
    tag: "Development Teams", Icon: Code2,
    duration: "2 Days", seats: "Up to 25", mode: "In-person Lab Required",
    badge: null,
    desc: "Security integrated into every sprint — not bolted on at the end. Developers leave with a practical code-review checklist, hands-on SAST/DAST experience, and a clear grasp of the OWASP Top 10.",
    topics: ["OWASP Top 10 vulnerabilities & mitigations", "Secure code review with static analysis", "DevSecOps pipeline: SAST, DAST, SCA", "API authentication, authorisation & rate limiting", "Secrets management & dependency security", "Threat modelling with STRIDE"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=75",
  },
  {
    title: "Industry-Specific Compliance Training",
    tag: "BFSI · Healthcare · Government", Icon: Database,
    duration: "1–2 Days", seats: "Customisable", mode: "In-person or Virtual",
    badge: "Tailored",
    desc: "Built from scratch for your sector. We map your threat landscape directly to the compliance frameworks your auditors check — RBI guidelines, HIPAA, IRDAI cyber framework, or CERT-In directives.",
    topics: ["Sector-specific threat landscape & case studies", "Regulatory control mapping & gap analysis", "Evidence collection for audit readiness", "Penetration test scope & vendor assessment", "Business continuity planning for cyber events", "Staff awareness for sector-specific attacks"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=75",
  },
];

const IND: Program[] = [
  {
    title: "Personal Cyber Safety Bootcamp",
    tag: "Beginners & General Public", Icon: Shield,
    duration: "4 Hours", seats: "Small Group ≤12", mode: "Online or In-person",
    badge: "Beginner Friendly",
    desc: "No jargon, no overwhelm. A practical session that teaches you how to lock down devices, spot scams before they land, protect finances, and respond calmly if something goes wrong.",
    topics: ["Device & account hardening step-by-step", "Recognising UPI, lottery & investment scams", "Safe social media & privacy settings", "Password managers: setup in the room today", "What to do if you've been compromised", "Reporting to cybercrime.gov.in & helpline 1930"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=75",
  },
  {
    title: "Ethical Hacking Fundamentals",
    tag: "Aspiring Security Professionals", Icon: Target,
    duration: "3 Days", seats: "Up to 15", mode: "In-person Lab Required",
    badge: "Hands-On Lab",
    desc: "A structured introduction to penetration testing in a fully legal lab. Participants work through the complete engagement lifecycle using the same tools used in real-world assessments. Aligned to CEH and eJPT objectives.",
    topics: ["Penetration testing methodology & legal scope", "Reconnaissance & OSINT with Maltego & Shodan", "Vulnerability scanning with Nessus & Nikto", "Exploitation fundamentals with Metasploit", "Web application testing with Burp Suite", "Reporting findings clearly & professionally"],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=75",
  },
  {
    title: "Secure Remote Work Masterclass",
    tag: "Freelancers & Remote Workers", Icon: Wifi,
    duration: "Half Day", seats: "Open Enrolment", mode: "Live Virtual",
    badge: "Remote-First",
    desc: "Built for the modern remote professional handling client data from a home office. Covers the exact threat surface of remote work: unsecured networks, shadow IT, video conferencing risks, and data handling obligations.",
    topics: ["VPN selection, setup & split-tunnelling", "Home router hardening & Wi-Fi security audit", "Secure collaboration: file sharing & video calls", "Client data obligations under GDPR & DPDP", "Endpoint security for personal devices", "Phishing detection in a remote-work context"],
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=75",
  },
  {
    title: "Cybersecurity Career Mentoring Programme",
    tag: "Students & Career Changers", Icon: Award,
    duration: "4 Weeks", seats: "1-on-1 Sessions", mode: "Virtual",
    badge: "Mentoring",
    desc: "A personalised four-week programme for anyone entering or pivoting into cybersecurity. Covers certification roadmap planning, building a home lab, creating a portfolio, and interview preparation with an industry mentor.",
    topics: ["Cybersecurity career paths & salary benchmarks", "Certification roadmap: CompTIA → CEH → OSCP", "Setting up a home lab (free & low-cost tools)", "Building a GitHub portfolio & personal blog", "LinkedIn optimisation for security roles", "Live mock interview & resume review session"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=75",
  },
];

const SOC: Program[] = [
  {
    title: "Cyber Safety for Schools & Colleges",
    tag: "Students Age 12–22", Icon: BookOpen,
    duration: "2–3 Hours", seats: "Up to 200 per session", mode: "In-person Outreach",
    badge: "Outreach",
    desc: "An engaging, age-appropriate session delivered at educational institutions. We cover cyberbullying, online predators, deepfakes, and safe social media — in language that resonates with young people, not lectures.",
    topics: ["Cyberbullying: recognition, impact & reporting", "Online identity, privacy & digital footprint", "Safe social media & what you actually share", "Recognising online grooming & predatory behaviour", "Deepfakes, misinformation & AI-generated content", "Gaming safety & in-app purchase scams"],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=75",
  },
  {
    title: "CyberShield Community Seminar",
    tag: "General Public & Senior Citizens", Icon: Users,
    duration: "3 Hours", seats: "Open — 50 to 300", mode: "In-person Community Hall",
    badge: "Free Event",
    desc: "Free-to-attend public seminars held in community centres, libraries, and government offices. We focus on the scams hitting Indian households hardest right now: KYC fraud, OTP theft, fake job offers, and loan app scams.",
    topics: ["KYC & Aadhaar-linked fraud: how it works", "OTP theft & SIM swap attacks", "Fake job offers & work-from-home fraud", "Loan app scams targeting low-income borrowers", "How to verify and report suspicious contacts", "Filing a complaint at cybercrime.gov.in"],
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=75",
  },
  {
    title: "Capture The Flag (CTF) Hackathon",
    tag: "Students & Early Professionals", Icon: Zap,
    duration: "24 Hours", seats: "Up to 40 teams of 3–5", mode: "In-person",
    badge: "Competition",
    desc: "A competitive, gamified event where teams solve real technical challenges across six categories. Top three teams receive certificates, mentoring sessions, and direct internship referrals to partner organisations.",
    topics: ["Web security challenges based on OWASP Top 10", "Digital forensics & memory analysis", "Steganography & hidden data recovery", "Cryptography & encoding/decoding puzzles", "Network traffic capture & packet analysis", "Binary exploitation & reverse engineering (beginner tier)"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=75",
  },
  {
    title: "Women in Cybersecurity Workshop",
    tag: "Women Professionals & Students", Icon: Star,
    duration: "Full Day", seats: "Up to 60", mode: "In-person or Hybrid",
    badge: "Inclusive",
    desc: "A safe, practical, and empowering space for women to build real cybersecurity skills, hear directly from senior women practitioners, and connect with a mentoring network — no prior technical experience required.",
    topics: ["Hands-on practical security skills workshop", "Career pathways: breaking in as a woman", "Panel: Women leaders in Indian cybersecurity", "Impostor syndrome & confidence in technical roles", "Networking circle & mentoring matchmaking", "Scholarships, communities & certifications"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=75",
  },
];

/* ─────────────────────────────────────────────────────────────────
   PAST EVENTS & TESTIMONIALS
──────────────────────────────────────────────────────────────────*/
const EVENTS = [
  { date: "May 2024", name: "RSA Conference Workshop", loc: "San Francisco, CA", n: 500, cat: "corporate" as Cat, desc: "Enterprise threat intelligence and AI-powered defence sessions for Fortune 500 security teams." },
  { date: "Aug 2024", name: "Black Hat USA Training", loc: "Las Vegas, NV", n: 300, cat: "individual" as Cat, desc: "Intensive two-day penetration testing and vulnerability management training in a live lab environment." },
  { date: "Sep 2024", name: "CyberShield Mumbai", loc: "Mumbai, India", n: 420, cat: "social" as Cat, desc: "Free public seminar on UPI fraud and OTP theft prevention across three community halls." },
  { date: "Oct 2024", name: "Women in Cybersecurity Day", loc: "Bengaluru, India", n: 180, cat: "social" as Cat, desc: "Full-day workshop with panel discussions featuring practitioners from Infosys, CERT-In, and Wipro." },
  { date: "Nov 2024", name: "Financial Services Summit", loc: "New York, NY", n: 200, cat: "corporate" as Cat, desc: "Regulatory compliance and operational risk workshop for BFSI CISOs and compliance officers." },
  { date: "Dec 2024", name: "Gartner IAM Summit", loc: "Grapevine, TX", n: 400, cat: "corporate" as Cat, desc: "Zero-trust architecture and identity security deep-dives for enterprise architecture teams." },
];

const TESTI = [
  { name: "Meera Pillai", role: "CISO, HDFC Life Insurance", cat: "corporate" as Cat, q: "The executive governance session fundamentally shifted how our board discusses cyber risk. We now have a shared language that connects security investment directly to business outcomes." },
  { name: "Arjun Verma", role: "Senior Developer, Razorpay", cat: "individual" as Cat, q: "The Secure SDLC workshop was the most practical training I've attended in five years. I left with a code review checklist I use in every PR to this day." },
  { name: "Prof. S. Mehta", role: "Principal, DPS Pune", cat: "social" as Cat, q: "After the school session, our students started asking real questions about online privacy. Two parents called the school to thank us personally." },
  { name: "Priya Nair", role: "Independent UX Consultant", cat: "individual" as Cat, q: "I'd been ignoring my home network security for years. The remote work masterclass fixed that in four hours. I feel genuinely confident about how I handle client data now." },
];

const FAQS = [
  { q: "How long are the workshops?", a: "Duration varies: community seminars run 2–4 hours, individual sessions from a half day to multi-day intensives, and corporate programs typically 1–3 days. Every program card lists the duration." },
  { q: "Are workshops available online?", a: "Most corporate and individual programs are available in-person or via fully live virtual format with the same interactive exercises. Community outreach sessions are primarily in-person." },
  { q: "Who delivers the training?", a: "All workshops are delivered by certified practitioners holding CISSP, CEH, OSCP, or CISM credentials with minimum 8 years of field experience across BFSI, government, and technology sectors." },
  { q: "Can content be customised for our industry?", a: "Yes. Our Industry-Specific Compliance Training is built from scratch for every client. We conduct a scoping call before every engagement to map your sector's regulatory obligations and current threat concerns." },
  { q: "How do I register for a community event?", a: "Community events are free to attend and open to all. Register via the contact form on this page or email workshops@sadavyuva.org. School and NGO outreach can be requested directly by institution administrators." },
];

/* ─────────────────────────────────────────────────────────────────
   TINY HELPERS
──────────────────────────────────────────────────────────────────*/
const f = (s: TemplateStringsArray | string) => `'DM Sans', sans-serif`;

function Pip({ children, accent }: { children: string; accent: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontFamily: f``, fontSize: "0.62rem", fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: 100,
      background: accent + "18", color: accent,
      border: `1px solid ${accent}35`,
    }}>{children}</span>
  );
}

function Meta({ Icon: I, text }: { Icon: React.ElementType; text: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: f``, fontSize: "0.77rem", color: T.muted, fontWeight: 500 }}>
      <I size={12} color={T.faint} /> {text}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROGRAM CARD — Horizontal magazine layout
──────────────────────────────────────────────────────────────────*/
function ProgramCard({ p, accent, glow, fog, idx }: { p: Program; accent: string; glow: string; fog: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const even = idx % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: T.card,
        borderRadius: 20,
        border: `1px solid ${open ? accent + "50" : T.border}`,
        overflow: "hidden",
        boxShadow: open ? `0 0 0 1px ${accent}30, 0 16px 48px ${glow}` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Top: image + summary row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          minHeight: 200,
          cursor: "pointer",
        }}
        onClick={() => setOpen(v => !v)}
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={p.image}
            alt={p.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
            onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"}
            onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
          />
          {/* Dark overlay gradient */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 60%, " + T.card + " 100%)" }} />
          {/* Accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: accent }} />
        </div>

        {/* Content */}
        <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, alignItems: "center" }}>
              <p.Icon size={14} color={accent} />
              <span style={{ fontFamily: f``, fontSize: "0.71rem", fontWeight: 600, color: T.muted, letterSpacing: "0.06em" }}>{p.tag}</span>
              {p.badge && <Pip accent={accent}>{p.badge}</Pip>}
            </div>
            <h3 style={{ fontFamily: f``, fontSize: "1.15rem", fontWeight: 800, color: T.white, letterSpacing: "-0.025em", lineHeight: 1.28, marginBottom: 10 }}>
              {p.title}
            </h3>
            <p style={{ fontFamily: f``, fontSize: "0.87rem", color: T.muted, lineHeight: 1.72, marginBottom: 16 }}>
              {p.desc}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <Meta Icon={Clock} text={p.duration} />
              <Meta Icon={Users} text={p.seats} />
              <Meta Icon={MapPin} text={p.mode} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: f``, fontSize: "0.8rem", fontWeight: 700, color: accent,
              letterSpacing: "0.02em",
            }}>
              {open ? "Collapse" : "View Topics"}
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
                <ChevronDown size={15} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable topics */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "24px 28px 28px 28px",
              borderTop: `1px solid ${T.border}`,
              background: fog,
            }}>
              <p style={{ fontFamily: f``, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.faint, marginBottom: 14 }}>
                Topics Covered
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px 20px", marginBottom: 24 }}>
                {p.topics.map(t => (
                  <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontFamily: f``, fontSize: "0.83rem", color: T.dim, lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
              <button
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "11px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: accent, color: "#000",
                  fontFamily: f``, fontSize: "0.84rem", fontWeight: 800,
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.9"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                Schedule This Session <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ ITEM
──────────────────────────────────────────────────────────────────*/
function FaqItem({ item, idx }: { item: typeof FAQS[0]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.38, delay: idx * 0.06 }}
      style={{
        borderBottom: `1px solid ${T.border}`,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", padding: "20px 0", background: "none", border: "none",
          cursor: "pointer", textAlign: "left",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20,
        }}
      >
        <span style={{ fontFamily: f``, fontWeight: 700, fontSize: "1rem", color: open ? T.white : T.dim, letterSpacing: "-0.015em", transition: "color 0.2s" }}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }}
          style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: open ? T.corp : T.card2,
            color: open ? "#fff" : T.faint,
          }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.26 }} style={{ overflow: "hidden" }}
          >
            <p style={{ fontFamily: f``, fontSize: "0.91rem", color: T.muted, lineHeight: 1.8, paddingBottom: 20 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────────*/
export default function WorkshopPage() {
  const [cat, setCat] = useState<Cat>("corporate");
  const [scrolled, setScrolled] = useState(false);
  const meta = CATS[cat];
  const programs = cat === "corporate" ? CORP : cat === "individual" ? IND : SOC;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const accentOf: Record<Cat, string> = { corporate: T.corp, individual: T.ind, social: T.soc };
  const glowOf: Record<Cat, string> = { corporate: T.corpGlow, individual: T.indGlow, social: T.socGlow };
  const fogOf: Record<Cat, string> = { corporate: T.corpFog, individual: T.indFog, social: T.socFog };

  return (
    <>
      <style>{`
        ${FONT}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.bg}; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${T.corp}40; color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${T.bg2}; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img { display: none !important; }
          .approach-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .approach-grid { grid-template-columns: 1fr !important; }
          .prog-card-inner { grid-template-columns: 1fr !important; }
          .prog-card-inner > *:first-child { height: 200px !important; width: 100% !important; }
          .topics-3 { grid-template-columns: 1fr 1fr !important; }
          .events-grid { grid-template-columns: 1fr 1fr !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .cta-inner { grid-template-columns: 1fr !important; }
          .cta-facts { display: none !important; }
          .stat-row { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
          .cat-label { display: none !important; }
        }
        @media (max-width: 540px) {
          .events-grid { grid-template-columns: 1fr !important; }
          .topics-3 { grid-template-columns: 1fr !important; }
          .wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-wrap { padding: 64px 20px 52px !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: T.bg, color: T.white }}>

        {/* ══════════════════════════════════════════
            STICKY NAV BAR
        ══════════════════════════════════════════ */}
        {/* <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 600,
          height: 60,
          background: scrolled ? "rgba(7,9,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          transition: "all 0.3s",
          display: "flex", alignItems: "center",
        }}>
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 52px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: T.corp, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: f``, fontWeight: 800, fontSize: "0.97rem", color: T.white, letterSpacing: "-0.02em" }}>
                Sadav<span style={{ color: T.corp }}>.</span>Yuva
              </span>
              <span style={{ fontFamily: f``, fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", background: T.corp, color: "#fff", padding: "2px 8px", borderRadius: 20 }}>Foundation</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {(["CISSP","CEH","OSCP","CISM"] as const).map(c => (
                <span key={c} style={{ fontFamily: f``, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", padding: "3px 9px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: T.muted, border: `1px solid ${T.border}` }}>{c}</span>
              ))}
              <button style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
                background: T.corp, color: "#fff",
                fontFamily: f``, fontSize: "0.82rem", fontWeight: 700,
              }}>
                <Send size={14} /> Schedule
              </button>
            </div>
          </div>
        </nav> */}

        {/* ══════════════════════════════════════════
            HERO — Full bleed split
        ══════════════════════════════════════════ */}
        <section style={{ position: "relative", overflow: "hidden", paddingTop: 60 }}>
          {/* Noise texture overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* BG radial accent */}
          <div style={{
            position: "absolute", top: -200, left: -200, width: 900, height: 900,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${meta.accent}10 0%, transparent 60%)`,
            transition: "background 0.6s",
            pointerEvents: "none", zIndex: 0,
          }} />

          <div className="hero-wrap wrap" style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 52px 64px" }}>

            {/* Category switcher tabs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ display: "flex", gap: 6, marginBottom: 52, flexWrap: "wrap" }}
            >
              {(Object.entries(CATS) as [Cat, CatMeta][]).map(([key, m]) => (
                <button
                  key={key}
                  onClick={() => setCat(key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 100,
                    border: `1px solid ${cat === key ? m.accent : T.border}`,
                    background: cat === key ? m.accent + "18" : "transparent",
                    color: cat === key ? m.accent : T.muted,
                    fontFamily: f``, fontSize: "0.84rem", fontWeight: 700,
                    cursor: "pointer", transition: "all 0.22s",
                    letterSpacing: "0.01em",
                    boxShadow: cat === key ? `0 0 18px ${m.glow}` : "none",
                  }}
                >
                  <m.Icon size={15} />
                  <span className="cat-label">{m.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Hero grid */}
            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 500px", gap: 64, alignItems: "center" }}>

              {/* Left — copy */}
              <AnimatePresence mode="wait">
                <motion.div key={cat}
                  initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ height: 2, width: 20, background: meta.accent }} />
                    <span style={{ fontFamily: f``, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: meta.accent }}>
                      {meta.eyebrow}
                    </span>
                  </div>
                  <h1 style={{
                    fontFamily: f``, fontWeight: 800,
                    fontSize: "clamp(2.6rem,5.2vw,4.4rem)",
                    color: T.white, letterSpacing: "-0.04em",
                    lineHeight: 1.06, marginBottom: 22,
                  }}>
                    {meta.headline}
                  </h1>
                  <p style={{ fontFamily: f``, fontSize: "1.06rem", color: T.muted, lineHeight: 1.78, maxWidth: 520, marginBottom: 40, fontWeight: 400 }}>
                    {meta.sub}
                  </p>

                  {/* Stats row */}
                  <div className="stat-row" style={{ display: "flex", gap: 40, marginBottom: 40, alignItems: "center" }}>
                    {[
                      { n: "1,200+", l: "Professionals Trained" },
                      { n: "48", l: "Sessions in 2024" },
                      { n: "96%", l: "Satisfaction Rate" },
                    ].map(({ n, l }) => (
                      <div key={l}>
                        <p style={{ fontFamily: f``, fontSize: "2rem", fontWeight: 800, color: T.white, letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</p>
                        <p style={{ fontFamily: f``, fontSize: "0.74rem", color: T.muted, marginTop: 4, fontWeight: 500 }}>{l}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "13px 28px", borderRadius: 12, border: "none", cursor: "pointer",
                      background: meta.accent, color: "#000",
                      fontFamily: f``, fontSize: "0.9rem", fontWeight: 800,
                      boxShadow: `0 8px 28px ${meta.glow}`, letterSpacing: "0.01em",
                      transition: "transform 0.18s",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "none"}
                    >
                      <Send size={16} /> Schedule a Workshop
                    </button>
                    <a href="#programs" style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "13px 22px", borderRadius: 12, cursor: "pointer",
                      background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`,
                      color: T.dim, fontFamily: f``, fontSize: "0.9rem", fontWeight: 600,
                      textDecoration: "none", transition: "background 0.18s",
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
                    >
                      View Programs <ArrowRight size={15} />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right — large image with overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat + "-img"}
                  className="hero-img"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "relative", height: 460, borderRadius: 22, overflow: "hidden" }}
                >
                  <img src={meta.image} alt={meta.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  {/* Gradient overlays */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(7,9,15,0.85) 100%)" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent 50%, ${meta.accent}08 100%)` }} />
                  {/* Accent border */}
                  <div style={{ position: "absolute", inset: 0, borderRadius: 22, border: `1px solid ${meta.accent}35` }} />

                  {/* Bottom floating badge */}
                  <div style={{
                    position: "absolute", bottom: 20, left: 20, right: 20,
                    background: "rgba(7,9,15,0.88)", backdropFilter: "blur(16px)",
                    borderRadius: 14, padding: "16px 18px",
                    border: `1px solid ${T.border2}`,
                    display: "flex", alignItems: "center", gap: 14,
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: meta.accent + "20", display: "flex", alignItems: "center", justifyContent: "center", color: meta.accent, flexShrink: 0 }}>
                      <meta.Icon size={18} />
                    </div>
                    <div>
                      <p style={{ fontFamily: f``, fontWeight: 800, fontSize: "0.92rem", color: T.white }}>{meta.label}</p>
                      <p style={{ fontFamily: f``, fontSize: "0.75rem", color: T.muted, marginTop: 2 }}>Expert-led · Certified Instructors · Hands-on</p>
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                      {["CISSP", "CEH"].map(c => (
                        <span key={c} style={{ fontFamily: f``, fontSize: "0.63rem", fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.08)", color: T.faint }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Divider line */}
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)` }} />
        </section>

     

        {/* ══════════════════════════════════════════
            PROGRAMS — Horizontal magazine cards
        ══════════════════════════════════════════ */}
        <section id="programs" style={{ background: T.bg }}>

          {/* Corporate */}
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 52px 64px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 40 }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: T.corpFog, display: "flex", alignItems: "center", justifyContent: "center", color: T.corp, border: `1px solid ${T.corp}30`, flexShrink: 0 }}>
                <Building2 size={22} />
              </div>
              <div>
                <Pip accent={T.corp}>Corporate</Pip>
                <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.3rem)", color: T.white, letterSpacing: "-0.03em", marginTop: 8, lineHeight: 1.15 }}>Corporate Cybersecurity Workshops</h2>
                <p style={{ fontFamily: f``, fontSize: "0.92rem", color: T.muted, maxWidth: 560, marginTop: 8, lineHeight: 1.78 }}>
                  Comprehensive programs for organisations of any size — built around your threat landscape, your sector, and your people.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {CORP.map((p, i) => <ProgramCard key={p.title} p={p} accent={T.corp} glow={T.corpGlow} fog={T.corpFog} idx={i} />)}
            </div>
          </div>

          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)` }} />

          {/* Individual */}
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 52px 64px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 40 }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: T.indFog, display: "flex", alignItems: "center", justifyContent: "center", color: T.ind, border: `1px solid ${T.ind}30`, flexShrink: 0 }}>
                <User size={22} />
              </div>
              <div>
                <Pip accent={T.ind}>Individual</Pip>
                <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.3rem)", color: T.white, letterSpacing: "-0.03em", marginTop: 8, lineHeight: 1.15 }}>Individual Workshops</h2>
                <p style={{ fontFamily: f``, fontSize: "0.92rem", color: T.muted, maxWidth: 560, marginTop: 8, lineHeight: 1.78 }}>
                  For professionals, developers, freelancers, and career changers who want genuine, job-ready cybersecurity capability.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {IND.map((p, i) => <ProgramCard key={p.title} p={p} accent={T.ind} glow={T.indGlow} fog={T.indFog} idx={i} />)}
            </div>
          </div>

          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)` }} />

          {/* Social */}
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 52px 64px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 40 }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: T.socFog, display: "flex", alignItems: "center", justifyContent: "center", color: T.soc, border: `1px solid ${T.soc}30`, flexShrink: 0 }}>
                <Globe2 size={22} />
              </div>
              <div>
                <Pip accent={T.soc}>Social & Community</Pip>
                <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.7rem,2.8vw,2.3rem)", color: T.white, letterSpacing: "-0.03em", marginTop: 8, lineHeight: 1.15 }}>Social Workshops & Community Events</h2>
                <p style={{ fontFamily: f``, fontSize: "0.92rem", color: T.muted, maxWidth: 560, marginTop: 8, lineHeight: 1.78 }}>
                  Because cybersecurity shouldn't be a privilege — we take awareness to schools, community halls, and public spaces.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SOC.map((p, i) => <ProgramCard key={p.title} p={p} accent={T.soc} glow={T.socGlow} fog={T.socFog} idx={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PAST EVENTS
        ══════════════════════════════════════════ */}
        <section style={{ background: T.bg2, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 52px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
              <div>
                <p style={{ fontFamily: f``, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>2024 Highlights</p>
                <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: T.white, letterSpacing: "-0.035em", lineHeight: 1.1 }}>Past Workshops & Events</h2>
              </div>
              {/* Quick stats */}
              <div style={{ display: "flex", gap: 32 }}>
                {[{ n: "1,500+", l: "Total Attendees" }, { n: "6", l: "Events" }, { n: "3", l: "Countries" }].map(({ n, l }) => (
                  <div key={l} style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: f``, fontWeight: 800, fontSize: "1.8rem", color: T.white, letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</p>
                    <p style={{ fontFamily: f``, fontSize: "0.72rem", color: T.muted, marginTop: 3, fontWeight: 500 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {EVENTS.map((e, i) => {
                const a = accentOf[e.cat];
                return (
                  <motion.div
                    key={e.name}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.44, delay: i * 0.07 }}
                    style={{
                      background: T.card, borderRadius: 16,
                      border: `1px solid ${T.border}`,
                      padding: "22px",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: a }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Calendar size={11} color={a} />
                        <span style={{ fontFamily: f``, fontSize: "0.7rem", fontWeight: 700, color: a, letterSpacing: "0.04em" }}>{e.date}</span>
                      </div>
                      <Pip accent={a}>{e.cat}</Pip>
                    </div>
                    <h4 style={{ fontFamily: f``, fontSize: "1rem", fontWeight: 700, color: T.white, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.3 }}>{e.name}</h4>
                    <p style={{ fontFamily: f``, fontSize: "0.83rem", color: T.muted, lineHeight: 1.68, marginBottom: 16 }}>{e.desc}</p>
                    <div style={{ display: "flex", gap: 18, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: f``, fontSize: "0.75rem", color: T.faint, fontWeight: 500 }}>
                        <MapPin size={11} color={T.faint} /> {e.loc}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: f``, fontSize: "0.75rem", color: T.faint, fontWeight: 500 }}>
                        <Users size={11} color={T.faint} /> {e.n.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>





   {/* ══════════════════════════════════════════
            WHY US — Approach strip
        ══════════════════════════════════════════ */}
        <section style={{ background: T.bg2, borderBottom: `1px solid ${T.border}` }}>
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 52px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 48, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: f``, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>Our Methodology</p>
                <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: T.white, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
                  Training designed to actually work
                </h2>
              </div>
              <p style={{ fontFamily: f``, fontSize: "0.92rem", color: T.muted, lineHeight: 1.78, maxWidth: 400 }}>
                Security awareness forgotten by Monday is worthless. Every program is anchored to real incidents, applied live, and measured for retention.
              </p>
            </div>

            <div className="approach-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { Icon: Play, a: T.corp, title: "Live Attack Simulations", desc: "Participants respond to real attack patterns in isolated lab environments — not passive walkthroughs. True muscle memory." },
                { Icon: Target, a: T.ind, title: "Scenario-Based Learning", desc: "Every concept is grounded in a real Indian or global incident from the past 24 months. Theory tied to consequences." },
                { Icon: Award, a: T.soc, title: "Certified Instructors", desc: "All facilitators hold active CISSP, CEH, or OSCP credentials with minimum 8 years of field experience." },
                { Icon: BarChart3, a: "#F59E0B", title: "Measurable Outcomes", desc: "Pre and post assessments with quantified improvement reports delivered to every client within 5 business days." },
                { Icon: FileText, a: T.corp, title: "Tailored Content", desc: "No generic decks. Content is mapped to your sector's threat landscape and regulatory obligations before delivery." },
                { Icon: Users, a: T.ind, title: "Any Team Size", desc: "From 10-person executive sessions to 200-person company-wide awareness programmes — same quality, any scale." },
              ].map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.44, delay: i * 0.07 }}
                  style={{
                    background: T.card, borderRadius: 16, padding: "24px",
                    border: `1px solid ${T.border}`,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = m.a + "50"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: m.a + "15", display: "flex", alignItems: "center", justifyContent: "center", color: m.a, marginBottom: 16 }}>
                    <m.Icon size={19} />
                  </div>
                  <h3 style={{ fontFamily: f``, fontWeight: 700, fontSize: "0.95rem", color: T.white, letterSpacing: "-0.02em", marginBottom: 8 }}>{m.title}</h3>
                  <p style={{ fontFamily: f``, fontSize: "0.84rem", color: T.muted, lineHeight: 1.7 }}>{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>





        {/* ══════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section style={{ background: T.bg }}>
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 52px" }}>
            <p style={{ fontFamily: f``, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>Client Outcomes</p>
            <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: T.white, letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 48 }}>What participants say</h2>

            <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {TESTI.map((t, i) => {
                const a = accentOf[t.cat];
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.44, delay: i * 0.1 }}
                    style={{
                      background: T.card, borderRadius: 18,
                      border: `1px solid ${T.border}`,
                      padding: "30px",
                    }}
                  >
                    <Quote size={22} color={a} style={{ marginBottom: 16, opacity: 0.7 }} />
                    <p style={{ fontFamily: f``, fontStyle: "italic", fontWeight: 400, fontSize: "0.97rem", color: T.dim, lineHeight: 1.82, marginBottom: 26 }}>
                      {t.q}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: a + "20", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: f``, fontWeight: 800, fontSize: "1rem", color: a, flexShrink: 0 }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <p style={{ fontFamily: f``, fontWeight: 700, fontSize: "0.9rem", color: T.white }}>{t.name}</p>
                        <p style={{ fontFamily: f``, fontSize: "0.76rem", color: T.muted, marginTop: 1 }}>{t.role}</p>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <div style={{ display: "flex", gap: 2 }}>
                          {[...Array(5)].map((_, j) => <Star key={j} size={12} fill={a} color={a} />)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <section style={{ background: T.bg2, borderTop: `1px solid ${T.border}` }}>
          <div className="wrap" style={{ maxWidth: 760, margin: "0 auto", padding: "80px 52px" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontFamily: f``, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.muted, marginBottom: 10 }}>FAQ</p>
              <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.4rem)", color: T.white, letterSpacing: "-0.035em" }}>Common questions</h2>
            </div>
            <div>
              {FAQS.map((f2, i) => <FaqItem key={f2.q} item={f2} idx={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA
        ══════════════════════════════════════════ */}
        <section style={{ background: T.bg, borderTop: `1px solid ${T.border}` }}>
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 52px" }}>
            <div style={{
              background: T.card2,
              borderRadius: 24, overflow: "hidden",
              border: `1px solid ${T.border2}`,
              position: "relative",
            }}>
              {/* BG orbs */}
              <div style={{ position: "absolute", top: -100, right: -60, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${T.corp}12 0%, transparent 60%)`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -80, left: 80, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${T.ind}10 0%, transparent 60%)`, pointerEvents: "none" }} />

              <div className="cta-inner" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 260px", gap: 0, alignItems: "stretch" }}>
                {/* Left */}
                <div style={{ padding: "60px 56px" }}>
                  <p style={{ fontFamily: f``, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.corp, marginBottom: 14 }}>Get Started Today</p>
                  <h2 style={{ fontFamily: f``, fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3rem)", color: T.white, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 16 }}>
                    Ready to build a<br /><span style={{ color: T.corp }}>security-first</span> culture?
                  </h2>
                  <p style={{ fontFamily: f``, fontSize: "0.97rem", color: T.muted, lineHeight: 1.78, maxWidth: 500, marginBottom: 36 }}>
                    Whether you're securing a company of 10 or 10,000, starting a cybersecurity career, or bringing safety awareness to your community — start with a free 30-minute scoping call.
                  </p>

                  {/* Contact */}
                  <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
                    {[
                      { Icon: Mail, l: "Email", v: "workshops@sadavyuva.org", href: "mailto:workshops@sadavyuva.org" },
                      { Icon: Phone, l: "Call", v: "+91 98765 43210", href: "tel:+919876543210" },
                    ].map(({ Icon: I, l, v, href }) => (
                      <a key={v} href={href} style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "16px 18px",
                        borderRadius: 14, textDecoration: "none",
                        background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`,
                        transition: "border-color 0.2s",
                        flex: 1, minWidth: 200,
                      }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.corp + "60"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}
                      >
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: T.corpFog, display: "flex", alignItems: "center", justifyContent: "center", color: T.corp, flexShrink: 0 }}>
                          <I size={16} />
                        </div>
                        <div>
                          <p style={{ fontFamily: f``, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.faint, marginBottom: 2 }}>{l}</p>
                          <p style={{ fontFamily: f``, fontSize: "0.85rem", color: T.dim, fontWeight: 600 }}>{v}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer",
                    background: T.corp, color: "#fff",
                    fontFamily: f``, fontSize: "0.92rem", fontWeight: 800,
                    boxShadow: `0 10px 36px ${T.corpGlow}`,
                    letterSpacing: "0.01em",
                    transition: "transform 0.18s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "none"}
                  >
                    <Send size={17} /> Schedule Free Consultation
                  </button>
                </div>

                {/* Right — quick facts panel */}
                <div className="cta-facts" style={{
                  borderLeft: `1px solid ${T.border}`,
                  padding: "40px 28px",
                  display: "flex", flexDirection: "column", gap: 0,
                  justifyContent: "center",
                }}>
                  <p style={{ fontFamily: f``, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.faint, marginBottom: 18 }}>Quick Facts</p>
                  {[
                    { l: "Response time", v: "< 24 hours" },
                    { l: "Scoping call", v: "Free, always" },
                    { l: "Min. group size", v: "1 person" },
                    { l: "Certification", v: "All programs" },
                    { l: "Community events", v: "Free to attend" },
                    { l: "Custom content", v: "On request" },
                  ].map(({ l, v }) => (
                    <div key={l} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "13px 0", borderBottom: `1px solid ${T.border}`,
                    }}>
                      <span style={{ fontFamily: f``, fontSize: "0.8rem", color: T.muted, fontWeight: 500 }}>{l}</span>
                      <span style={{ fontFamily: f``, fontSize: "0.82rem", color: T.white, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        {/* <footer style={{ background: T.bg2, borderTop: `1px solid ${T.border}` }}>
          <div style={{ background: T.corp, padding: "11px 52px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Shield size={13} color="#fff" />
            <span style={{ fontFamily: f``, fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
              🇮🇳 India Cyber Crime Helpline: <strong>1930</strong> &nbsp;·&nbsp; cybercrime.gov.in
            </span>
          </div>
          <div className="wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 52px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: T.corp, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={13} color="#fff" />
              </div>
              <span style={{ fontFamily: f``, fontWeight: 800, fontSize: "0.88rem", color: T.white }}>
                Sadav<span style={{ color: T.corp }}>.</span>Yuva Foundation
              </span>
            </div>
            <p style={{ fontFamily: f``, fontSize: "0.74rem", color: T.faint }}>
              Cybersecurity Workshops · Empowering Individuals, Teams & Communities · © 2025
            </p>
            <div style={{ display: "flex", gap: 22 }}>
              {["Corporate", "Individual", "Social", "Events", "Contact"].map(l => (
                <a key={l} href="#" style={{ fontFamily: f``, fontSize: "0.76rem", color: T.faint, textDecoration: "none", fontWeight: 500, transition: "color 0.18s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.white}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.faint}
                >{l}</a>
              ))}
            </div>
          </div>
        </footer> */}

      </div>
    </>
  );
}



// import WorkshopHero from './components/WorkshopHero';
// import QuickNav from './components/QuickNav';
// import ImpactNumbers from './components/ImpactNumbers';
// import LearningEcosystem from './components/LearningEcosystem';
// import FeaturedCategories from './components/FeaturedCategories';
// import UpcomingWorkshops from './components/UpcomingWorkshops';
// import TrainingJourney from './components/TrainingJourney';
// import LiveCyberLab from './components/LiveCyberLab';
// import Methodology from './components/Methodology';
// import Certifications from './components/Certifications';
// import PastEvents from './components/PastEvents';
// import PhotoDocumentary from './components/PhotoDocumentary';
// import Instructors from './components/Instructors';
// import SuccessStories from './components/SuccessStories';
// import ResourceCenter from './components/ResourceCenter';
// import FAQSection from './components/FAQSection';
// import ContactSection from './components/ContactSection';
// import WorkshopFooter from './components/WorkshopFooter';
// import Header from './components/Header';

// export const metadata = {
//   title: 'Cyber Workshops — Sadaiv Yuva Foundation',
//   description: 'Building a Cyber-Secure India Through Education. Expert-led cybersecurity workshops for corporates, individuals, schools and communities.',
// };

// export default function WorkshopsPage() {
//   return (
//     <main className="bg-[#FAFAF8] overflow-x-hidden">
//       <Header/>
//         <QuickNav />
//       <WorkshopHero />
    
//      <FeaturedCategories />
//       <Methodology />
//       <ImpactNumbers />
//       <LearningEcosystem />
     
//       <UpcomingWorkshops />
//       <TrainingJourney />
//       <LiveCyberLab />
     
//       <Certifications />
//       <PastEvents />
//       <PhotoDocumentary />
//       <Instructors />
//       <SuccessStories />
//       <ResourceCenter />
//       <FAQSection />
//       <ContactSection />
//       <WorkshopFooter />
//     </main>
//   );
// }



// @import "tailwindcss";

// :root {
//   --font-heading: 'Plus Jakarta Sans', sans-serif;
//   --font-body: 'Nunito Sans', sans-serif;
//   --font-mono: 'JetBrains Mono', monospace;
  
//   --color-warm-white: #FCFCFA;
//   --color-soft-beige: #F5F1E8;
//   --color-deep-green: #14532D;
//   --color-muted-gold: #B45309;
//   --color-text-primary: #1a1a18;
//   --color-text-secondary: #4a4a42;
//   --color-text-muted: #888880;
// }

// * {
//   box-sizing: border-box;
// }

// html {
//   scroll-behavior: smooth;
// }

// body {
//   font-family: var(--font-body);
//   color: var(--color-text-primary);
//   background-color: var(--color-warm-white);
//   -webkit-font-smoothing: antialiased;
// }

// h1, h2, h3, h4, h5 {
//   font-family: var(--font-heading);
// }

// .font-heading { font-family: var(--font-heading); }
// .font-body { font-family: var(--font-body); }
// .font-mono { font-family: var(--font-mono); }

// /* Custom scrollbar */
// ::-webkit-scrollbar { width: 6px; }
// ::-webkit-scrollbar-track { background: var(--color-warm-white); }
// ::-webkit-scrollbar-thumb { background: var(--color-deep-green); border-radius: 3px; }

// /* Noise texture overlay */
// .noise-texture::before {
//   content: '';
//   position: absolute;
//   inset: 0;
//   background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
//   pointer-events: none;
//   z-index: 1;
// }

// /* Section divider line */
// .divider-line {
//   width: 48px;
//   height: 2px;
//   background: var(--color-muted-gold);
// }

// /* Masonry grid */
// .masonry-grid {
//   columns: 3;
//   column-gap: 1rem;
// }
// .masonry-item {
//   break-inside: avoid;
//   margin-bottom: 1rem;
// }

// @media (max-width: 768px) {
//   .masonry-grid { columns: 2; }
// }
// @media (max-width: 480px) {
//   .masonry-grid { columns: 1; }
// }


// import type { Metadata } from "next";
// import "./globals.css";

// // Fonts loaded via CSS @import in globals.css for sandbox compatibility
// const plusJakarta = { variable: "--font-heading-cls" };
// const nunitoSans = { variable: "--font-body-cls" };
// const jetbrainsMono = { variable: "--font-mono-cls" };

// export const metadata: Metadata = {
//   title: "Sadaiv Yuva Foundation — Small Actions. Lasting Change.",
//   description: "A national-level NGO empowering youth through education, health, women empowerment, cyber awareness, and environmental action.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${plusJakarta.variable} ${nunitoSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col bg-[#FCFCFA]">{children}</body>
//     </html>
//   );
// }

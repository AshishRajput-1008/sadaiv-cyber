"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield, Lock, Globe, Brain, CreditCard, 
  Smartphone, Flag, GraduationCap, MailOpen, X, ArrowRight,
  Search, Zap, Server, Cloud, Code2, Network,
  IdCard, LaptopMinimal, AlertTriangle, CheckCircle2,
  Lightbulb, BookOpen, TrendingUp, Users, Menu,
  MessageCircleWarning, DatabaseZap, School,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   GOOGLE FONTS  (add to your next/font or _document)
   We inject via <style> for portability.
──────────────────────────────────────────────────────────────────*/

/* ─────────────────────────────────────────────────────────────────
   DESIGN TOKENS
──────────────────────────────────────────────────────────────────*/
const T = {
  cream:   "#FFF8F0",
  paper:   "#FEF3E8",
  card:    "#FFFFFF",
  border:  "#F0E4D4",
  border2: "#E8D5BE",
  ink:     "#1A1208",
  ink2:    "#3D2E1E",
  muted:   "#8C7B6B",
  muted2:  "#B8A898",
  orange:  "#E8440A",
  orange2: "#FF6B35",
  amber:   "#D4870A",
  green:   "#1A6B3C",
  blue:    "#1B4FCC",
  shadow:  "rgba(26,18,8,0.08)",
  shadowLg:"rgba(26,18,8,0.14)",
};

/* ─────────────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────────────────*/
type Risk = "high" | "med" | "low" | "info";
interface Step {
  id: number; title: string; cat: string; Icon: React.ElementType;
  risk: Risk; desc: string; detail: string; points: string[]; tip: string;
}
interface Threat { name: string; Icon: React.ElementType; detail: string; }
interface TGroup {
  id: string; Icon: React.ElementType; title: string;
  color: string; bg: string; desc: string; threats: Threat[];
}

/* ─────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────*/
const STEPS: Step[] = [
  { id:1, title:"Phishing Awareness", cat:"Communication", Icon:MailOpen, risk:"high",
    desc:"Learn to spot fraudulent emails and messages designed to steal your personal information.",
    detail:"Phishing is the number-one entry point for cybercriminals in India and worldwide. Attackers craft messages that look exactly like those from your bank, government body, or even a colleague.",
    points:["Verify the sender's actual email address — not just the display name","Hover over links before clicking to reveal the true destination URL","Watch for urgency language: 'Your account will be blocked in 24 hours'","Real organisations never ask for passwords, OTPs, or PINs via email or SMS","Go directly to the official website by typing the URL yourself"],
    tip:"If a message creates fear or urgency and asks you to click something — stop, verify independently, then decide." },
  { id:2, title:"Strong Passwords", cat:"Account Security", Icon:Lock, risk:"high",
    desc:"Create unbreakable passwords and use managers to safeguard your accounts.",
    detail:"Weak or reused passwords cause over 80% of data breaches. A strong password strategy combined with a password manager is the single most impactful change you can make.",
    points:["Use at least 12 characters — mix uppercase, lowercase, numbers, and symbols","Never reuse the same password across different websites or apps","Enable two-factor authentication (2FA) on every important account","Use a trusted password manager: Bitwarden, 1Password, or KeePass","Change passwords immediately when a service you use reports a breach"],
    tip:"Passphrase Method: Three random words — 'BlueTigerRocket!' — is far stronger than 'P@ssw0rd1' and much easier to remember." },
  { id:3, title:"Safe Web Browsing", cat:"Web Browsing", Icon:Globe, risk:"high",
    desc:"Protect yourself from fraudulent websites that mimic legitimate ones to steal your data.",
    detail:"Fraudulent websites can be pixel-perfect copies of real banks, payment portals, or government sites. Every time you enter credentials online, you must verify the site is genuine.",
    points:["Look for HTTPS and the padlock icon before entering any sensitive data","Check the full URL carefully — fraudsters use misspellings like 'paypa1.com'","Keep your browser updated to protect against known vulnerabilities","Use extensions like uBlock Origin to block malicious advertisements","Never log in via links in emails — navigate directly to the official site"],
    tip:"Bookmark your bank and key sites, then always access them from your bookmark — never from search results or email links." },
  { id:4, title:"Social Engineering", cat:"Psychology", Icon:Brain, risk:"med",
    desc:"Recognize manipulation tactics used by fraudsters to trick you into revealing personal info.",
    detail:"Social engineering exploits human psychology rather than technical vulnerabilities. Attackers may pose as tech support, bank officials, or known contacts to manipulate you.",
    points:["Be sceptical of unexpected calls from IT support, banks, or government","Verify the caller's identity — hang up and call back on the official number","Never grant remote access to your computer to anyone who calls unsolicited","Beware of 'pretexting' — elaborate fake scenarios to gain your trust","Pause before responding to any urgent, emotional, or fear-inducing request"],
    tip:"Any request that creates urgency or panic is a manipulation tactic. A 10-second pause can prevent a major loss." },
  { id:5, title:"Secure Transactions", cat:"Financial", Icon:CreditCard, risk:"med",
    desc:"Stay safe while shopping or banking online with these secure transaction practices.",
    detail:"Online financial fraud costs Indians billions each year. Whether shopping or banking, a few simple habits dramatically reduce your exposure to cybercrime.",
    points:["Only transact on sites with HTTPS and clear contact and return policies","Use UPI or virtual credit cards for online purchases when possible","Check your bank statements every week for any unauthorized transactions","Avoid financial transactions on public or shared Wi-Fi networks","Enable instant SMS or app notifications for every transaction on your accounts"],
    tip:"Act Within 3 Hours: If you suspect a fraudulent transaction, contact your bank immediately — many payments can still be held or reversed." },
  { id:6, title:"Software Verification", cat:"File Security", Icon:Shield, risk:"med",
    desc:"Avoid downloading malicious software disguised as legitimate applications.",
    detail:"Malware is frequently disguised as popular apps, game modifications, or free productivity tools. Downloading from unofficial sources is one of the most common infection vectors.",
    points:["Download apps only from Google Play Store, Apple App Store, or vendor websites","Verify file hashes when downloading important or sensitive software","Avoid 'cracked' software — these almost always contain hidden malware","Keep your antivirus or security suite active and updated at all times","Review app permissions — a calculator app should not need your contacts or location"],
    tip:"If something is offered for free that normally costs money, the hidden cost is almost certainly your security and data." },
  { id:7, title:"Device Security", cat:"Hardware", Icon:Smartphone, risk:"low",
    desc:"Protect your smartphones and laptops from fraudsters trying to access personal data.",
    detail:"Your devices contain your entire digital life. Physical and digital access to your device is just as dangerous as any remote attack.",
    points:["Use a strong screen lock: PIN (6+ digits), fingerprint, or face recognition","Enable full-disk encryption on both your laptop and smartphone","Keep your operating system and all applications fully updated","Set up remote wipe capability before you need it (Find My Device)","Never leave devices unattended in public spaces, even briefly"],
    tip:"Prepare Now: Remote wipe only works if set up in advance. If your device is stolen, you can erase everything remotely — if you're ready." },
  { id:8, title:"Fraud Reporting", cat:"Incident Response", Icon:Flag, risk:"low",
    desc:"Know how to report cyber frauds to authorities to protect yourself and others.",
    detail:"Reporting cyber fraud quickly is both your right and your civic duty. Fast reporting increases recovery chances and helps law enforcement track criminal networks.",
    points:["Report financial cyber fraud at cybercrime.gov.in","Call Cyber Crime Helpline 1930 immediately for urgent financial fraud","Preserve all evidence: screenshots, transaction IDs, emails, and call recordings","Report to your bank at once — transactions can sometimes be reversed within hours","File a local police FIR, required for insurance claims and legal proceedings"],
    tip:"Helpline 1930 is India's dedicated cyber crime helpline. Save it now so you have it when you need it most." },
  { id:9, title:"Fraud Education", cat:"Awareness", Icon:GraduationCap, risk:"info",
    desc:"Stay informed about the latest cyber fraud tactics to stay one step ahead of criminals.",
    detail:"The cyber threat landscape evolves every day. Staying informed is itself a security practice. Knowledge of current attack methods is your first and most powerful line of defence.",
    points:["Follow CERT-In for official security alerts and advisories","Subscribe to updates from cybercrime.gov.in for new fraud advisories","Share what you learn with family — elderly relatives are most frequently targeted","Practise healthy scepticism: calm, consistent verification","Test yourself with free phishing simulation tools to sharpen your instincts"],
    tip:"Teach to Learn: Explaining a tip to someone else deepens your own understanding. Share one cyber safety lesson with your family every week." },
  ];

const TGROUPS: TGroup[] = [
  { id:"identity", Icon:IdCard, title:"Identity & Credential Abuse", color:"#E8440A", bg:"#FFF0EB",
    desc:"Attacks targeting user identities, passwords, and authentication systems.",
    threats:[
      { name:"Phishing", Icon:MailOpen, detail:"Mass deceptive emails mimicking trusted brands to harvest credentials and personal data." },
      { name:"Spear Phishing", Icon:AlertTriangle, detail:"Highly personalised phishing targeting a specific individual using information collected about them." },
      { name:"Brute Force Attack", Icon:Shield, detail:"Automated trial-and-error used to guess passwords, PINs, or encryption keys." },
      { name:"Business Email Compromise", Icon:Users, detail:"Impersonation of executives via email to authorise fraudulent wire transfers or data disclosures." },
      { name:"Web Session Cookie Theft", Icon:Globe, detail:"Stealing active authentication cookies to hijack a logged-in session without needing a password." },
    ]},
  { id:"endpoint", Icon:LaptopMinimal, title:"Endpoint Abuse", color:"#1B4FCC", bg:"#EEF2FF",
    desc:"Threats targeting desktops, laptops, and mobile devices to compromise or control them.",
    threats:[
      { name:"Malware", Icon:AlertTriangle, detail:"Any software intentionally designed to damage, disrupt, or gain unauthorised access to systems." },
      { name:"Ransomware", Icon:Lock, detail:"Encrypts the victim's files and demands payment in exchange for the decryption key." },
      { name:"Spyware", Icon:Brain, detail:"Silently monitors user activity and transmits sensitive data back to the attacker." },
      { name:"Zero-Day Exploit", Icon:Zap, detail:"Attacks a previously unknown software vulnerability before the vendor has released a patch." },
    ]},
  { id:"webapp", Icon:Code2, title:"Web Application Attacks", color:"#1A6B3C", bg:"#EDFBF2",
    desc:"Exploits targeting web applications through injection and scripting techniques.",
    threats:[
      { name:"SQL Injection", Icon:Server, detail:"Inserting malicious SQL commands into user input fields to manipulate or extract database contents." },
      { name:"Cross-Site Scripting (XSS)", Icon:Code2, detail:"Injecting malicious JavaScript into web pages viewed by other users, enabling session hijacking." },
    ]},
  { id:"infra", Icon:Network, title:"Infrastructure Availability", color:"#C25A00", bg:"#FFF5E8",
    desc:"Attacks aimed at disrupting the availability of critical infrastructure and networks.",
    threats:[
      { name:"DDoS Attack", Icon:Network, detail:"Flooding a target server with massive traffic from many sources to render it unavailable." },
      { name:"DNS Tunneling", Icon:Server, detail:"Encoding malicious data within DNS queries to bypass firewalls and establish covert channels." },
    ]},
  { id:"cloud", Icon:Cloud, title:"Cloud & SaaS Abuse", color:"#0B6E9E", bg:"#E8F6FF",
    desc:"Threats exploiting cloud services, misconfigurations, and SaaS platforms.",
    threats:[
      { name:"Cloud Misconfiguration", Icon:Cloud, detail:"Improperly secured cloud storage buckets or overly permissive IAM roles exposing sensitive data." },
      { name:"SaaS Account Takeover", Icon:Users, detail:"Compromising cloud-hosted accounts like Google Workspace or Microsoft 365 to access confidential data." },
    ]},
  { id:"personal", Icon:MessageCircleWarning, title:"Harassment & Privacy Abuse", color:"#A0145A", bg:"#FDEAF2",
    desc:"Threats targeting individuals directly through abuse, harassment, and misuse of personal data.",
    threats:[
      { name:"Online Harassment", Icon:MessageCircleWarning, detail:"Cyberbullying, trolling, and sustained digital abuse intended to intimidate, shame, or silence a victim." },
      { name:"Data Misuse", Icon:DatabaseZap, detail:"Unauthorised access to personal data, leading to privacy violations and identity fraud." },
    ]},
];

const RISK_CONFIG: Record<Risk, { label: string; bg: string; text: string; dot: string; border: string }> = {
  high: { label:"High Risk",    bg:"#FEE8E3", text:"#C42B00", dot:"#E8440A", border:"#FBCFC4" },
  med:  { label:"Medium Risk",  bg:"#FEF4D9", text:"#A06200", dot:"#D4870A", border:"#FAEAB4" },
  low:  { label:"Low Risk",     bg:"#E3F5EC", text:"#0D5C2E", dot:"#1A6B3C", border:"#B8E8CC" },
  info: { label:"Awareness",    bg:"#E8EFFE", text:"#1440A8", dot:"#1B4FCC", border:"#C0CEFB" },
};

/* ─────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
──────────────────────────────────────────────────────────────────*/
function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => { i += 1; setN(i); if (i >= to) clearInterval(timer); }, Math.ceil(900 / to));
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

/* ─────────────────────────────────────────────────────────────────
   STEP CARD
──────────────────────────────────────────────────────────────────*/
function StepCard({ s, i, onClick }: { s: Step; i: number; onClick: () => void }) {
  const rc = RISK_CONFIG[s.risk];
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: T.card,
        border: `1.5px solid ${hovered ? T.orange : T.border}`,
        borderRadius: 20,
        padding: "26px 26px 22px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 20px 60px ${T.shadowLg}, 0 0 0 0px ${T.orange}20`
          : `0 2px 12px ${T.shadow}`,
        transform: hovered ? "translateY(-7px)" : "translateY(0px)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Step number watermark */}
      <div style={{
        position: "absolute", top: -12, right: 16,
fontFamily: "var(--font-body), sans-serif",
        fontSize: "5.5rem", fontWeight: 900, lineHeight: 1,
        color: hovered ? "#E8440A" : T.border,
        opacity: hovered ? 0.12 : 0.6,
        transition: "all 0.3s",
        userSelect: "none", pointerEvents: "none",
      }}>
        {String(i + 1).padStart(2, "0")}
      </div>

      {/* Icon + category */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: T.muted, fontFamily: "var(--font-body), sans-serif",
        }}>
          <s.Icon size={11} color={T.orange} />
          {s.cat}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 13, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? T.orange : "#FEF0E9",
          color: hovered ? "#fff" : T.orange,
          transition: "all 0.25s",
        }}>
          <s.Icon size={19} />
        </div>
      </div>

      <h3 style={{
fontFamily: "var(--font-body), sans-serif",        fontSize: "1.15rem", fontWeight: 800,
        color: T.ink, marginBottom: 8, lineHeight: 1.25,
        letterSpacing: "-0.02em",
      }}>{s.title}</h3>

      <p style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: "0.85rem", color: T.muted, lineHeight: 1.68,
        marginBottom: 20,
      }}>{s.desc}</p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", padding: "4px 11px", borderRadius: 100,
          background: rc.bg, color: rc.text, border: `1px solid ${rc.border}`,
          fontFamily: "var(--font-body), sans-serif",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: rc.dot }} />
          {rc.label}
        </span>
        <div style={{
          display: "flex", alignItems: "center", gap: hovered ? 10 : 5,
          fontSize: "0.76rem", fontWeight: 700, color: T.orange,
          transition: "gap 0.18s", fontFamily: "var(--font-body), sans-serif",
        }}>
          Read Guide <ArrowRight size={13} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   THREAT GROUP CARD
──────────────────────────────────────────────────────────────────*/
function ThreatGroup({ g, i, onThreat }: { g: TGroup; i: number; onThreat: (t: Threat, g: TGroup) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: i * 0.07 }}
      style={{
        background: T.card, border: `1.5px solid ${T.border}`,
        borderRadius: 20, padding: "28px 28px 24px",
        boxShadow: `0 2px 12px ${T.shadow}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20, paddingBottom: 18, borderBottom: `1.5px solid ${T.border}` }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: g.bg, color: g.color,
        }}>
          <g.Icon size={22} />
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "1.05rem", fontWeight: 800, color: T.ink, letterSpacing: "-0.02em" }}>{g.title}</h3>
          <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.79rem", color: T.muted, marginTop: 3, lineHeight: 1.5 }}>{g.desc}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
        {g.threats.map(t => (
          <ThreatPill key={t.name} t={t} color={g.color} bg={g.bg} onClick={() => onThreat(t, g)} />
        ))}
      </div>
    </motion.div>
  );
}

function ThreatPill({ t, color, bg, onClick }: { t: Threat; color: string; bg: string; onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "8px 16px", borderRadius: 100,
        background: h ? bg : T.cream,
        border: `1.5px solid ${h ? color : T.border}`,
        color: h ? color : T.ink2,
        fontSize: "0.81rem", fontWeight: 600,
        fontFamily: "var(--font-body), sans-serif",
        cursor: "pointer",
        transform: h ? "translateY(-2px)" : "none",
        boxShadow: h ? `0 6px 18px ${T.shadow}` : "none",
        transition: "all 0.18s",
      }}
    >
      <t.Icon size={13} />
      {t.name}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MODAL
──────────────────────────────────────────────────────────────────*/
type ModalData =
  | { type: "step"; step: Step }
  | { type: "threat"; threat: Threat; group: TGroup }
  | null;

function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
            background: "rgba(26,18,8,0.55)",
            backdropFilter: "blur(12px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            style={{
              background: T.cream,
              borderRadius: 24, maxWidth: 560, width: "100%",
              maxHeight: "88vh", overflowY: "auto",
              boxShadow: "0 32px 100px rgba(26,18,8,0.28)",
              border: `1.5px solid ${T.border}`,
            }}
          >
            {/* Modal top bar */}
            <div style={{
              position: "sticky", top: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 24px",
              background: T.cream,
              borderBottom: `1.5px solid ${T.border}`,
              zIndex: 5, borderRadius: "24px 24px 0 0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Zap size={14} color={T.orange} />
                <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: T.muted }}>
                  {data.type === "step" ? data.step.cat : "Threat Intelligence"}
                </span>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${T.border}`,
                  background: T.paper, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.muted, transition: "all 0.18s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.orange; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = T.orange; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.paper; (e.currentTarget as HTMLElement).style.color = T.muted; (e.currentTarget as HTMLElement).style.borderColor = T.border; }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: "28px 28px 32px" }}>
              {data.type === "step" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "#FEF0E9",
                      display: "flex", alignItems: "center", justifyContent: "center", color: T.orange,
                    }}>
                      <data.step.Icon size={22} />
                    </div>
                    <div>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                        padding: "3px 10px", borderRadius: 100,
                        background: RISK_CONFIG[data.step.risk].bg, color: RISK_CONFIG[data.step.risk].text,
                        border: `1px solid ${RISK_CONFIG[data.step.risk].border}`,
                        marginBottom: 5, fontFamily: "var(--font-body), sans-serif",
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: RISK_CONFIG[data.step.risk].dot }} />
                        {RISK_CONFIG[data.step.risk].label}
                      </span>
                      <h2 style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "1.5rem", fontWeight: 800, color: T.ink, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                        {data.step.title}
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.9rem", color: T.muted, lineHeight: 1.78, marginBottom: 26 }}>{data.step.detail}</p>

                  <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted2, marginBottom: 12 }}>What to Watch For</p>
                  <ul style={{ listStyle: "none", marginBottom: 24 }}>
                    {data.step.points.map((pt, i) => (
                      <li key={i} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        padding: "11px 0", borderBottom: `1px solid ${T.border}`,
                      }}>
                        <CheckCircle2 size={15} color={T.orange} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.88rem", color: T.ink2, lineHeight: 1.65 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{
                    display: "flex", gap: 14, padding: "16px 18px",
                    background: "#FFF4EC",
                    borderLeft: `4px solid ${T.orange}`,
                    borderRadius: "0 14px 14px 0",
                  }}>
                    <Lightbulb size={16} color={T.orange} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.875rem", color: T.ink2, lineHeight: 1.68 }}>{data.step.tip}</p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: data.group.bg, color: data.group.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <data.threat.Icon size={22} />
                    </div>
                    <h2 style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "1.5rem", fontWeight: 800, color: T.ink, letterSpacing: "-0.03em" }}>
                      {data.threat.name}
                    </h2>
                  </div>
                  <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.9rem", color: T.muted, lineHeight: 1.78, marginBottom: 22 }}>{data.threat.detail}</p>
                  <div style={{
                    display: "flex", gap: 14, padding: "16px 18px",
                    background: "#FFF4EC", borderLeft: `4px solid ${T.orange}`, borderRadius: "0 14px 14px 0",
                  }}>
                    <Shield size={15} color={T.orange} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.875rem", color: T.ink2, lineHeight: 1.68 }}>
                      Understanding how this attack works is your first line of defence. Pair this knowledge with the Sparking Steps guides for complete protection.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────────*/
export default function SparkingStep() {
  const [tab, setTab] = useState<"steps" | "threats">("steps");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalData>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = TGROUPS.map(g => ({
    ...g,
    threats: g.threats.filter(t =>
      !search || t.name.toLowerCase().includes(search.toLowerCase()) || g.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.threats.length > 0);

  return (
    <>
     <style>{`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${T.cream}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${T.paper}; }
  ::-webkit-scrollbar-thumb { background: ${T.border2}; border-radius: 3px; }
`}</style>

      <div style={{ minHeight: "100vh", background: T.cream, fontFamily: "var(--font-body), sans-serif", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        {/* <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 48px",
          background: scrolled ? "rgba(255,248,240,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          transition: "all 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: T.orange, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Zap size={17} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.15rem", color: T.ink, letterSpacing: "-0.03em" }}>
              Sadav<span style={{ color: T.orange }}>.</span>Yuva
            </span>
            <span style={{
              fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
              background: T.orange, color: "#fff", padding: "3px 9px", borderRadius: 20,
            }}>Foundation</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {["Home", "Sparking Steps", "Threat Library"].map(l => (
              <a key={l} href="#" style={{
                fontFamily: "var(--font-body), sans-serif", fontSize: "0.85rem", fontWeight: 500,
                color: T.muted, textDecoration: "none", transition: "color 0.18s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.ink}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.muted}
              >{l}</a>
            ))}
            <a href="#" style={{
              fontFamily: "var(--font-body), sans-serif", fontSize: "0.84rem", fontWeight: 700,
              background: T.orange, color: "#fff", padding: "9px 22px", borderRadius: 10,
              textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.01em",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#c43508"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.orange}
            >Report Fraud</a>
          </div>
        </nav> */}

        {/* ── HERO ── */}
        <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 180 }}>

          {/* BG layers */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #FFF2E5 0%, ${T.cream} 55%, #FFF8F5 100%)` }} />
          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: `linear-gradient(${T.ink} 1px, transparent 1px), linear-gradient(90deg, ${T.ink} 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }} />
          {/* Warm orbs */}
          <div style={{ position: "absolute", top: -60, right: -80, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,68,10,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, left: "20%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,135,10,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "40%", right: "15%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,68,10,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "12px 6px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }}>
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
              >
                <div style={{ height: 2, width: 28, background: T.orange }} />
                <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: T.orange }}>Sadav Yuva Foundation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
                style={{ fontFamily: "var(--font-ui), sans-serif", fontSize: "clamp(3.8rem,8.5vw,7rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.045em", color: T.ink, marginBottom: 28 }}
              >
                Sparking<br />
                <span style={{ color: T.orange, fontStyle: "italic" }}>Step</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}
                style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "1.08rem", color: T.muted, lineHeight: 1.78, maxWidth: 500, marginBottom: 44, fontWeight: 400 }}
              >
                Your guided journey into cyber safety. Learn to identify, resist, and report digital threats — every step protects you and your community.
              </motion.p>

              {/* Stat row */}
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.34 }}
                style={{ display: "flex", gap: 0, borderRadius: 18, overflow: "hidden", border: `1.5px solid ${T.border}`, width: "fit-content", boxShadow: `0 4px 20px ${T.shadow}` }}
              >
                {[{ n: STEPS.length, l: "Modules", Icon: BookOpen }, { n: TGROUPS.length, l: "Categories", Icon: Shield }, { n: TGROUPS.reduce((a,g)=>a+g.threats.length,0), l: "Techniques", Icon: TrendingUp }].map(({ n, l, Icon }, i) => (
                  <div key={l} style={{
                    padding: "20px 32px", background: i % 2 === 1 ? T.paper : T.card,
                    borderRight: i < 2 ? `1.5px solid ${T.border}` : "none",
                    display: "flex", flexDirection: "column", alignItems: "center",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <Icon size={14} color={T.orange} />
                      <span style={{ fontFamily: "'var(--font-ui), sans-serif", fontSize: "2rem", fontWeight: 900, color: T.ink, letterSpacing: "-0.04em", lineHeight: 1 }}>
                        <Counter to={n} />
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.72rem", color: T.muted, fontWeight: 600, letterSpacing: "0.05em" }}>{l}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — decorative card stack */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", width: 320, height: 380, flexShrink: 0 }}
              className="hide-on-mobile"
            >
              {/* Back cards */}
              {[{ rotate: -8, top: 30, left: 24, bg: "#FDEBD0" }, { rotate: 5, top: 16, left: 12, bg: "#FEF4E2" }].map((c, i) => (
                <div key={i} style={{
                  position: "absolute", top: c.top, left: c.left, right: 0,
                  height: 340, borderRadius: 22,
                  background: c.bg, border: `1.5px solid ${T.border}`,
                  transform: `rotate(${c.rotate}deg)`,
                  boxShadow: `0 8px 30px ${T.shadow}`,
                }} />
              ))}
              {/* Front card */}
              <div style={{
                position: "relative", zIndex: 3,
                background: T.card, borderRadius: 22, padding: "28px 26px",
                border: `1.5px solid ${T.border2}`,
                boxShadow: `0 20px 60px ${T.shadowLg}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "#FEF0E9", display: "flex", alignItems: "center", justifyContent: "center", color: T.orange }}>
                    <MailOpen size={20} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted }}>Step 01</div>
                    <div style={{ fontFamily: "var(--font-ui), sans-serif", fontSize: "1rem", fontWeight: 800, color: T.ink, letterSpacing: "-0.02em" }}>Phishing Awareness</div>
                  </div>
                </div>
                {[
                  "Verify sender email addresses carefully",
                  "Hover before clicking any link",
                  "Beware of urgency & fear tactics",
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0", borderBottom: i < 2 ? `1px solid ${T.border}` : "none" }}>
                    <CheckCircle2 size={13} color={T.orange} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.82rem", color: T.ink2, lineHeight: 1.5 }}>{pt}</span>
                  </div>
                ))}
                <div style={{
                  marginTop: 18, padding: "12px 14px",
                  background: "#FFF4EC", borderRadius: 11,
                  display: "flex", gap: 10, alignItems: "flex-start",
                }}>
                  <Lightbulb size={13} color={T.orange} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.79rem", color: T.ink2, lineHeight: 1.55 }}>When in doubt, go directly to the official website.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 12px 100px" }} id="steps">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Zap size={13} color={T.orange} />
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted }}>Cyber Safety Program</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-ui), sans-serif", fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: T.ink, marginBottom: 10 }}>
              Sparking <span style={{ color: T.orange, fontStyle: "italic" }}>Steps</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.93rem", color: T.muted, maxWidth: 480, lineHeight: 1.72 }}>
              Actionable, bite-sized guides to protect you from real-world cyber crime. Work through each step or jump to what matters most.
            </p>
          </motion.div>

          {/* Tab bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: "inline-flex", background: T.paper, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: 4, marginBottom: 40 }}
          >
            {(["steps", "threats"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "9px 28px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: "var(--font-body), sans-serif", fontSize: "0.85rem", fontWeight: 700,
                  background: tab === t ? T.card : "transparent",
                  color: tab === t ? T.ink : T.muted,
                  boxShadow: tab === t ? `0 1px 8px ${T.shadow}` : "none",
                  transition: "all 0.22s",
                  letterSpacing: "0.005em",
                }}
              >
                {t === "steps" ? "Current Steps" : "Past Steps"}
              </button>
            ))}
          </motion.div>

          {/* STEPS */}
          <AnimatePresence mode="wait">
            {tab === "steps" && (
              <motion.div key="steps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
                {/* Legend */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 32 }}>
                  {(Object.entries(RISK_CONFIG) as [Risk, typeof RISK_CONFIG[Risk]][]).map(([, v]) => (
                    <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body), sans-serif", fontSize: "0.77rem", fontWeight: 600, color: T.ink2 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: v.dot }} />
                      {v.label}
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
                  {STEPS.map((s, i) => (
                    <StepCard key={s.id} s={s} i={i} onClick={() => setModal({ type: "step", step: s })} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* THREATS */}
            {tab === "threats" && (
              <motion.div key="threats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
                <div style={{ position: "relative", maxWidth: 360, marginBottom: 36 }}>
                  <Search size={15} color={T.muted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    placeholder="Search threats and techniques…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      width: "100%", padding: "12px 14px 12px 40px",
                      border: `1.5px solid ${T.border}`, borderRadius: 12,
                      background: T.card, fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.88rem", color: T.ink, outline: "none",
                      transition: "border-color 0.18s",
                    }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = T.orange}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = T.border}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 18 }}>
                  {filtered.map((g, i) => (
                    <ThreatGroup key={g.id} g={g} i={i} onThreat={(t, group) => setModal({ type: "threat", threat: t, group })} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div style={{ textAlign: "center", padding: "80px 0", color: T.muted }}>
                    <Search size={32} color={T.border2} style={{ margin: "0 auto 12px" }} />
                    <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: "0.9rem" }}>No threats found matching &quot;{search}&quot;</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      

        <Modal data={modal} onClose={() => setModal(null)} />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hide-on-mobile { display: none !important; }
        }
        @media (max-width: 640px) {
          nav { padding: 0 20px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </>
  );
}
"use client";

import Image from "next/image";
import { useState } from "react";

// ── Import your story images — adjust paths as needed ──
import storyImg1 from "../../Assests/images/inspiration1.png";
import storyImg2 from "../../Assests/images/inspiration2.png";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const storiesStyles = `
  /* ══ STORIES SECTION ══ */
  .stories-section {
    background: #f7f9f1;
    padding: 100px 60px;
  }

  .stories-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  /* Top heading block — centered, stacked */
  .stories-top {
    text-align: center;
    margin-bottom: 56px;
  }

  .stories-heading h2 {
    font-family: 'DM Sans', sans-serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 1.12;
    color: #2c3a04;
    margin: 0 0 16px;
    letter-spacing: -1px;
  }

  .stories-subtext {
    font-size: 15px;
    line-height: 1.75;
    color: #46512a;
    margin: 0 auto;
    max-width: 600px;
  }

  /* Cards grid */
  .stories-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .story-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .story-card-img {
    position: relative;
    width: 100%;
    aspect-ratio: 488 / 300;
    overflow: hidden;
  }

  .story-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .story-card:hover .story-card-img img {
    transform: scale(1.04);
  }

  .story-card-body {
    padding: 28px 32px 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }

  .story-card-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #2c3a04;
    margin: 0;
    line-height: 1.25;
  }

  .story-card-desc {
    font-size: 15px;
    line-height: 1.7;
    color: #46512a;
    margin: 0;
    flex: 1;
  }

  .story-card-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #2c3a04;
    text-decoration: none;
    margin-top: 8px;
    transition: gap 0.2s;
  }

  .story-card-link:hover { gap: 14px; }

  .story-card-link svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 921px) {
    .stories-section { padding: 72px 28px; }
    .stories-top { margin-bottom: 36px; }
    .stories-heading h2 { font-size: 34px; }
    .stories-grid { grid-template-columns: 1fr; gap: 20px; }
  }

  @media (max-width: 544px) {
    .stories-section { padding: 56px 20px; }
    .stories-heading h2 { font-size: 28px; }
    .story-card-body { padding: 20px 20px 24px; }
    .story-card-title { font-size: 18px; }
  }

  /* ══ FRAUD AWARENESS SECTION ══ */
  .frauds-section {
    background: #fff;
    padding: 100px 60px;
  }

  .frauds-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .frauds-top {
    text-align: center;
    margin-bottom: 40px;
  }

  .frauds-subtext {
    font-size: 15px;
    line-height: 1.75;
    color: #46512a;
    margin: 0 auto 32px;
    max-width: 700px;
  }

  /* Filter tabs */
  .frauds-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 48px;
  }

  .frauds-tab {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2c3a04;
    background: #f7f9f1;
    border: 1px solid #dfe6cc;
    border-radius: 999px;
    padding: 10px 22px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .frauds-tab:hover {
    background: #eef2e2;
  }

  .frauds-tab--active {
    background: #2c3a04;
    border-color: #2c3a04;
    color: #fff;
  }

  /* Cards grid */
  .frauds-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .fraud-card {
    background: #f7f9f1;
    border-radius: 16px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .fraud-card-category {
    display: inline-block;
    align-self: flex-start;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #6a7a2f;
    background: #e8edd8;
    border-radius: 6px;
    padding: 5px 12px;
  }

  .fraud-card-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: #2c3a04;
    margin: 0;
    line-height: 1.3;
  }

  .fraud-card-desc {
    font-size: 14px;
    line-height: 1.7;
    color: #46512a;
    margin: 0;
    flex: 1;
  }

  .fraud-card-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #2c3a04;
    background: #fff;
    border: 1px solid #2c3a04;
    border-radius: 8px;
    padding: 10px 18px;
    text-decoration: none;
    margin-top: 8px;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
  }

  .fraud-card-btn:hover {
    background: #2c3a04;
    color: #fff;
  }

  @media (max-width: 1024px) {
    .frauds-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 921px) {
    .frauds-section { padding: 72px 28px; }
    .frauds-subtext { margin-bottom: 24px; }
    .frauds-tabs { margin-bottom: 32px; }
  }

  @media (max-width: 640px) {
    .frauds-grid { grid-template-columns: 1fr; }
  }
`;

/* ─────────────────────────────────────────
   DATA — STORIES
───────────────────────────────────────── */
const STORIES = [
  {
    img: storyImg1,
    alt: "Two women exchanging goods at a community event",
    title: "The Special One",
    desc: "Join our non-profit organisation to help create a brighter future for those in need. Every donation counts towards making a difference in the lives of those less fortunate.",
    href: "#",
  },
  {
    img: storyImg2,
    alt: "Children smiling and looking through a doorway",
    title: "A Better Education for Everyone",
    desc: "Our non-profit organisation is dedicated to improving access to education for all. With your support, we can help provide the resources and opportunities needed for success.",
    href: "#",
  },
];

/* ─────────────────────────────────────────
   DATA — FRAUD AWARENESS
───────────────────────────────────────── */
const FRAUD_CATEGORIES = [
  "All Frauds",
  "Phishing",
  "Identity Theft",
  "Financial Scams",
  "Malware",
];

const FRAUDS = [
  {
    category: "Malware",
    title: "Ransomware Attack",
    desc: "Malicious software encrypts victims' files, rendering them inaccessible. Cybercriminals demand ransom payments, often in cryptocurrency, to unlock the data, targeting businesses and individuals, causing significant financial and operational disruptions.",
  },
  {
    category: "Phishing",
    title: "Business Email Compromise (BEC)",
    desc: "Hackers spoof or compromise business email accounts to deceive employees into transferring funds or sharing sensitive data, often posing as executives or vendors, leading to substantial financial losses for organizations.",
  },
  {
    category: "Financial Scams",
    title: "Wire Transfer Fraud",
    desc: "Scammers impersonate trusted contacts to request urgent wire transfers, often targeting businesses or individuals for large financial losses.",
  },
  {
    category: "Malware",
    title: "Rootkit Malware",
    desc: "Malicious software hides itself to gain unauthorized access to systems, stealing data or providing remote control to attackers.",
  },
  {
    category: "Phishing",
    title: "Email Phishing Scam",
    desc: "Fraudsters send deceptive emails mimicking trusted organizations, such as banks or companies, to trick users into revealing sensitive personal information like passwords, credit card details, or social security numbers.",
  },
  {
    category: "Identity Theft",
    title: "Aadhaar Card Misuse",
    desc: "Criminals exploit stolen or misused Aadhaar card details to commit identity theft, fraudulently obtaining loans, opening bank accounts, or engaging in illegal activities under the victim's name, causing significant financial and legal harm.",
  },
  {
    category: "Identity Theft",
    title: "Credential Stuffing Attacks",
    desc: "Cybercriminals use stolen usernames and passwords from data breaches to gain unauthorized access to user accounts on multiple platforms, exploiting password reuse to steal sensitive data or commit fraud.",
  },
  {
    category: "Phishing",
    title: "Fake Tech Support Scams",
    desc: "Scammers pose as tech support agents from reputable companies, using pop-up alerts or cold calls to trick users into granting remote access or paying for fake services, exploiting trust.",
  },
  {
    category: "Financial Scams",
    title: "Investment Scams",
    desc: "Fraudsters promote fake investment opportunities promising high returns with low risk, often through social media or unsolicited calls, leading to significant financial losses for victims.",
  },
];

/* ─────────────────────────────────────────
   ARROW ICON
───────────────────────────────────────── */
const ArrowIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"/>
  </svg>
);

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function StoriesSection() {
  const [activeCategory, setActiveCategory] = useState("All Frauds");

  const filteredFrauds =
    activeCategory === "All Frauds"
      ? FRAUDS
      : FRAUDS.filter((f) => f.category === activeCategory);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: storiesStyles }} />

      {/* ================= STORIES ================= */}
      <section className="stories-section">
        <div className="stories-inner">

          {/* Heading block — centered, subheading below heading */}
          <div className="stories-top">
            <div className="stories-heading">
              <h2>Inspiring tales of transformation</h2>
            </div>
            <p className="stories-subtext">
              Get inspired by the remarkable stories of transformation through our
              non-profit organization. Join us in making a positive impact today.
            </p>
          </div>

          {/* Story cards */}
          <div className="stories-grid">
            {STORIES.map((story) => (
              <div className="story-card" key={story.title}>
                <div className="story-card-img">
                  <Image
                    src={story.img}
                    alt={story.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 921px) 90vw, 44vw"
                  />
                </div>
                <div className="story-card-body">
                  <h5 className="story-card-title">{story.title}</h5>
                  <p className="story-card-desc">{story.desc}</p>
                  <a href={story.href} className="story-card-link">
                    Read More
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FRAUD AWARENESS ================= */}
      <section className="frauds-section">
        <div className="frauds-inner">

          <div className="frauds-top">
            <p className="frauds-subtext">
              Phishing, OTP scams, fake links se suraksha — Sadaiv Yuva fights
              digital frauds with awareness.
            </p>

            {/* Category filter tabs */}
            <div className="frauds-tabs">
              {FRAUD_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`frauds-tab ${
                    activeCategory === cat ? "frauds-tab--active" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Fraud cards */}
          <div className="frauds-grid">
            {filteredFrauds.map((fraud) => (
              <div className="fraud-card" key={fraud.title}>
                <span className="fraud-card-category">{fraud.category}</span>
                <h5 className="fraud-card-title">{fraud.title}</h5>
                <p className="fraud-card-desc">{fraud.desc}</p>
                <button className="fraud-card-btn">Analyze Threat</button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
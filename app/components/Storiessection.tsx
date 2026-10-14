// ── Import your 4 fraud-type images — adjust paths as needed ──

"use client";

import { useRef } from "react";
import Image from "next/image";

// ── Import your 4 fraud-type images — adjust paths as needed ──
import storyImg1 from "../../Assests/images/collab/randsomeattacek.png";
import storyImg2 from"../../Assests/images/collab/email-phising.png";
import storyImg3 from  "../../Assests/images/collab/aadhar.png";
import storyImg4 from  "../../Assests/images/collab/bitcoin.png";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const storiesStyles = `
  /* ══ STORIES SECTION ══ */
  .stories-section {
    background: #f7f9f1;
    padding: 40px 60px;
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
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 1.12;
    color: #2c3a04;
    margin: 0 0 16px;
    letter-spacing: -1px;
  }

  .stories-subtext {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 15px;
    line-height: 1.75;
    color: #46512a;
    margin: 0 auto;
    max-width: 600px;
  }

  /* Wrapper to hold arrows + grid together */
  .stories-carousel-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  /* Cards grid — horizontally scrollable row */
  .stories-grid {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .stories-grid::-webkit-scrollbar { display: none; }

  .story-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(50% - 12px);
    scroll-snap-align: start;
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
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #2c3a04;
    margin: 0;
    line-height: 1.25;
  }

  .story-card-desc {
    font-family: 'Nunito Sans', sans-serif;
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
    font-family: 'Plus Jakarta Sans', sans-serif;
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

  /* Scroll arrow buttons */
  .stories-arrow {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid #d8ddc4;
    background: #fff;
    color: #2c3a04;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .stories-arrow:hover {
    background: #2c3a04;
    color: #fff;
  }

  .stories-arrow svg {
    width: 16px;
    height: 16px;
  }

  /* Small scroll-progress dots — mobile only */
  .stories-dots {
    display: none;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
  }

  .stories-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #d8ddc4;
  }

  /* ══ RESPONSIVE ══ */

  /* Tablet */
  @media (max-width: 921px) {
    .stories-section { padding: 72px 28px; }
    .stories-top { margin-bottom: 36px; }
    .stories-heading h2 { font-size: 34px; letter-spacing: -0.5px; }
    .story-card { flex: 0 0 calc(65% - 12px); }
  }

  /* Mobile — arrows removed, swipe-driven, peeking next card */
  @media (max-width: 767px) {
    .stories-section { padding: 48px 16px; }
    .stories-top { margin-bottom: 28px; }
    .stories-heading h2 { font-size: 26px; letter-spacing: -0.3px; margin-bottom: 10px; }
    .stories-subtext { font-size: 14px; line-height: 1.6; padding: 0 8px; }

    /* hide arrows, let touch scrolling take over */
    .stories-arrow { display: none; }
    .stories-carousel-wrap { gap: 0; }

    .stories-grid {
      gap: 14px;
      /* peek effect: cards bleed slightly past the edge */
      margin: 0 -16px;
      padding: 4px 16px 8px;
      scroll-padding-left: 16px;
    }

    .story-card {
      flex: 0 0 82%;
      border-radius: 14px;
    }

    .story-card-body { padding: 18px 18px 22px; gap: 8px; }
    .story-card-title { font-size: 17px; }
    .story-card-desc { font-size: 13.5px; line-height: 1.6; }
    .story-card-link { font-size: 14px; }

    .stories-dots { display: flex; }
  }

  /* Very small phones */
  @media (max-width: 380px) {
    .stories-section { padding: 40px 12px; }
    .stories-heading h2 { font-size: 22px; }
    .story-card { flex: 0 0 88%; }
    .story-card-body { padding: 16px; }
  }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STORIES = [

    {
    img: storyImg4,
    alt: "Ransomware attack",
    title: "Ransomware Attack",
    desc: "Malicious software encrypts victims' files, rendering them inaccessible. Cybercriminals demand ransom payments, often in cryptocurrency, to unlock the data, targeting businesses and individuals, causing significant financial and operational disruptions.",
    href: "/CyberFraud",
  },
  {
    img: storyImg1,
    alt: "Email phishing scam",
    title: "Email Phishing Scam",
    desc: "Fraudsters send deceptive emails mimicking trusted organizations, such as banks or companies, to trick users into revealing sensitive personal information like passwords, credit card details, or social security numbers.",
    href: "/CyberFraud",
  },
  {
    img: storyImg2,
    alt: "Aadhaar card misuse",
    title: "Aadhaar Card Misuse",
    desc: "Criminals exploit stolen or misused Aadhaar card details to commit identity theft, fraudulently obtaining loans, opening bank accounts, or engaging in illegal activities under the victim's name, causing significant financial and legal harm.",
       href: "/CyberFraud",

  },
  {
    img: storyImg3,
    alt: "Cryptocurrency scam",
    title: "Cryptocurrency Scams",
    desc: "Scammers lure victims into fake cryptocurrency exchanges or wallets, stealing funds through phishing sites, fake apps, or fraudulent ICOs (Initial Coin Offerings).",
    href: "/CyberFraud",
  },

];

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const ArrowIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"/>
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
  </svg>
);

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function StoriesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".story-card");
    const cardWidth = card ? card.getBoundingClientRect().width + 24 : 300;
    track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: storiesStyles }} />

      <section className="stories-section">
        <div className="stories-inner">

          {/* Heading block — centered, subheading below heading */}
          <div className="stories-top">
            <div className="stories-heading">
              <h2>Cyber Fraud</h2>
            </div>
            <p className="stories-subtext">
              Phishing, OTP scams, fake links se suraksha — Sadaiv Yuva fights
              digital frauds with awareness.
            </p>
          </div>

          {/* Story cards with scroll arrows (arrows auto-hide on mobile via CSS) */}
          <div className="stories-carousel-wrap">
            <button
              type="button"
              className="stories-arrow"
              aria-label="Scroll left"
              onClick={() => scrollByAmount(-1)}
            >
              <ChevronLeft />
            </button>

            <div className="stories-grid" ref={trackRef}>
              {STORIES.map((story) => (
                <div className="story-card" key={story.title}>
                  <div className="story-card-img">
                    <Image
                      src={story.img}
                      alt={story.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 380px) 88vw, (max-width: 767px) 82vw, (max-width: 921px) 65vw, 44vw"
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

            <button
              type="button"
              className="stories-arrow"
              aria-label="Scroll right"
              onClick={() => scrollByAmount(1)}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Dots hint that there's more to swipe — mobile only */}
          <div className="stories-dots" aria-hidden="true">
            {STORIES.map((s) => <span key={s.title} />)}
          </div>

        </div>
      </section>
    </>
  );
}
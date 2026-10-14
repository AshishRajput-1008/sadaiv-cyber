"use client";

import Image from "next/image";

// ── Import your partner logo images — adjust paths as needed ──
import logo1 from "../../Assests/images/collab/sadavsatyalogo101.png";
import logo2 from  "../../Assests/images/collab/payzonLOgo.png";
import logo3 from "../../Assests/images/collab/smart tex idea.png";


/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const partnersStyles = `
  /* ══ PARTNERS SECTION ══ */
  .partners-section {
    background: #f7f9f1;
    padding: 60px 60px 100px;
    border-top: 1px solid #d8dfc8;
  }

  .partners-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .partners-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #46512a;
    text-align: center;
    margin-bottom: 40px;
  }

  .partners-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 48px;
  }

  .partner-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
  }

  .partner-item img {
    max-width: 120px;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 921px) {
    .partners-section { padding: 48px 28px 72px; }
    .partners-grid { gap: 32px; }
  }

  @media (max-width: 544px) {
    .partners-section { padding: 40px 20px 56px; }
    .partners-grid { gap: 24px; }
    .partner-item img { max-width: 90px; }
  }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PARTNERS = [
  { src: logo1, alt: "Partner Logo 1" },
  { src: logo2, alt: "Partner Logo 2" },
  { src: logo3, alt: "Partner Logo 3" },

];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function PartnersSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: partnersStyles }} />

      <section className="partners-section">
        <div className="partners-inner">

          <p className="partners-label">Our Partners</p>

          <div className="partners-grid">
            {PARTNERS.map((partner) => (
              <div className="partner-item" key={partner.alt}>
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
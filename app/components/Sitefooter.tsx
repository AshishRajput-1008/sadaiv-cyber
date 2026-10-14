"use client";

import Image from "next/image";
import logo from "@/Assests/images/logo.png"

/* ─────────────────────────────────────────
   NAV-MATCHED FOOTER LINKS
───────────────────────────────────────── */
const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Cyber Article', href: '/CyberArticle' },
      { label: 'Sparking Step', href: '/SparkingStep' },
      { label: 'Workshop', href: '/CyberWorkshop' },
      { label: 'Cyber News', href: '/CyberNews' },
      { label: 'Inspiring Journeys', href: '/InspringJourneys' },
      { label: 'Social Work', href: '/SocialWork' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Cyber Fraud', href: '/CyberFraud' },
      { label: 'Our Profile', href: '/AboutUs' },
      { label: 'Cyber Law', href: '/CyberLaw' },
      { label: 'Collaborations', href: '/Collaborator' },
      { label: 'Podcasts', href: '/CyberPodcasts' },
      { label: 'Contact Us', href: '/ContactUs' },
    ],
  },
];

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const footerStyles = `
  /* ══ FOOTER ══ */
  .site-footer {
    background: #0b160f;
    font-family: 'DM Sans', sans-serif;
  }

  /* Primary footer */
  .footer-primary {
    padding: 64px 60px 56px;
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 60px;
    align-items: flex-start;
  }

  /* Column 1 — brand */
  .footer-brand-logo {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
  }

  .footer-brand-avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .footer-brand-avatar img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .footer-brand-logo-text {
    font-family: 'DM Mono', 'Courier New', monospace;
    font-size: 16px;
    font-weight: 600;
    color: #eef2ec;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .footer-brand-desc {
    font-family: 'DM Mono', 'Courier New', monospace;
    font-size: 15px;
    line-height: 1.7;
    color: #6b7a6a;
    margin-left: 35px;
    max-width: 340px;
  }

  /* Columns 2-3 — links */
  .footer-col-title {
    font-family: 'DM Mono', 'Courier New', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #5a6b58;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }

  .footer-link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .footer-link-list a {
    font-family: 'DM Sans', sans-serif;
    font-size: 17px;
    color: #cfd8cc;
    text-decoration: none;
    transition: color 0.2s;
    line-height: 1.5;
  }

  .footer-link-list a:hover { color: #d9760f; }

  /* Below footer — copyright + legal */
  .footer-below {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 22px 60px;
  }

  .footer-below-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .footer-copyright,
  .footer-legal {
    font-family: 'DM Mono', 'Courier New', monospace;
    font-size: 13px;
    color: #4d5c4b;
    margin: 0;
    letter-spacing: 0.02em;
  }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 921px) {
    .footer-primary {
      grid-template-columns: 1fr 1fr;
      gap: 40px 50px;
      padding: 48px 32px 40px;
    }
    .footer-brand-desc { max-width: none; margin-left: 35px; }
    .footer-below { padding: 20px 32px; }
  }

  @media (max-width: 544px) {
    .footer-primary {
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 40px 24px;
      text-align: center;
    }
    .footer-brand-logo { justify-content: center; }
    .footer-link-list { align-items: center; }
    .footer-below { padding: 20px 24px; }
    .footer-below-inner {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
  }
`;

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: footerStyles }} />

      <footer className="site-footer">

        {/* ── PRIMARY FOOTER ── */}
        <div className="footer-primary">

          {/* Column 1 — Brand */}
          <div>
            <a href="/" className="footer-brand-logo">
              <span className="footer-brand-avatar">
                <Image src={logo} alt="Sadaiv Yuva Foundation Logo" width={98} height={98} />
              </span>
              <span className="footer-brand-logo-text">Sadaiv Yuva Foundation</span>
            </a>
            <p className="footer-brand-desc">
              A youth-led national NGO committed to building an equitable
              India through community-driven action.
            </p>
          </div>

          {/* Columns 2-3 — nav-matched links */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.title}>
              <h6 className="footer-col-title">{col.title}</h6>
              <ul className="footer-link-list">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── BELOW FOOTER ── */}
        <div className="footer-below">
          <div className="footer-below-inner">
            <p className="footer-copyright">
              © {currentYear} Sadaiv Yuva Foundation. All rights reserved.
            </p>
            <p className="footer-legal">
              Registered under Societies Registration Act · CIN: U85300MP2018SGC0XXXXX
            </p>
          </div>
        </div>

      </footer>
    </>
  );
}
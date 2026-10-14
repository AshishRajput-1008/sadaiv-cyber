"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import cyberLogoH from "@/Assests/images/SADAIV CYBER Shield Logo-2.png";
import { useGoogleTranslate } from "@/utils/Usegoogletranslate";
import React from "react";

/* ─── TYPES ─── */
interface DropdownItem { label: string; href: string; description?: string; }
interface NavLink { label: string; href: string; dropdown?: DropdownItem[]; }
interface SiteHeaderProps { activeHref?: string; navLinks?: NavLink[]; }

/* ─── NAV DATA ─── */
const DEFAULT_NAV: NavLink[] = [
    { label: " PROFILE",        href: "/AboutUs" },   // ← moved here

  { label: "CYBER ARTICLE", href: "/CyberArticle" },
  {
    label: "SPARKING STEP", href: "/SparkingStep",
    dropdown: [
      { label: "CURRENT SPARKING",  href: "/SparkingStep", description: "Ongoing sparking initiatives" },
      { label: "SPARKING OVERVIEW", href: "/SparkingStep", description: "History & impact at a glance" },
    ],
  },
  {
    label: "WORKSHOP", href: "/CyberWorkshop",
    dropdown: [
      { label: "CORPORATE",   href: "/CyberWorkshop",             description: "Tailored for organisations"     },
      { label: "SOCIAL",      href: "/CyberWorkshop/social",      description: "Community-driven sessions"      },
      { label: "INDIVIDUALS", href: "/CyberWorkshop/individuals", description: "Personal cyber-safety training" },
    ],
  },
  { label: "CYBER NEWS",         href: "/CyberNews" },
  { label: "INSPIRING JOURNEYS", href: "/InspringJourneys" },
  { label: "PODCASTS",           href: "/CyberPodcasts" },
  { label: "SOCIAL WORK",        href: "/SocialWork" },
  { label: " CONTACT",        href: "/AboutUs" },   // ← moved here
];

/* ─── QUICK LINKS ─── */
/* ─── QUICK LINKS ─── */
const QUICK_LINKS = [
  { label: "CYBER FRAUD",    href: "/CyberFraud", icon: true },
  { label: "CYBER LAW",      href: "/CyberLaw" },
  { label: "COLLABORATIONS", href: "/Collaborator" },
];


/* Desktop utility bar: Collaborations swaps places with the Membership button */
const DESKTOP_LEFT_LINKS = QUICK_LINKS.filter((ql) => ql.href !== "/Collaborator");
const COLLAB_LINK = QUICK_LINKS.find((ql) => ql.href === "/Collaborator")!;

/* ─── 9 LANGUAGES (English default + 8 Indian) ─── */
const LANGUAGES = [
  { code: "en", label: "English"   },
  { code: "hi", label: "हिंदी"     },
  { code: "mr", label: "मराठी"     },
  { code: "gu", label: "ગુજરાતી"   },
  { code: "bn", label: "বাংলা"     },
  { code: "ta", label: "தமிழ்"     },
  { code: "te", label: "తెలుగు"    },
  { code: "kn", label: "ಕನ್ನಡ"     },
  { code: "pa", label: "ਪੰਜਾਬੀ"    },
];

/* ─── STYLES ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.syf-header *,
.syf-header *::before,
.syf-header *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

#google_translate_element { display: none !important; }
.goog-te-banner-frame.skiptranslate { display: none !important; }
.goog-te-gadget-icon { display: none !important; }
body { top: 0 !important; position: static !important; }
.goog-tooltip, .goog-tooltip:hover { display: none !important; }
.goog-text-highlight { background: none !important; box-shadow: none !important; }
.skiptranslate iframe { display: none !important; }

/* ── SHELL ──
   --syf-pad is the single left/right inset used by BOTH desktop bars, so the
   logo, quick links, nav and buttons all share the same left and right edges. */
.syf-header {
  --syf-pad: clamp(20px, 2.4vw, 40px);
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

/* ── 1. TRICOLOR ── */
.syf-tricolor {
  height: 4px;
  width: 100%;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    #FF6B00  0%,   #FF6B00  33.33%,
    #ffffff 33.33%, #ffffff 66.66%,
    #138808 66.66%, #138808 100%
  );
}

/* ── 2. UTILITY BAR ──  [quick links] ........ [membership] [donate] [language] */
.syf-utility {
  background: linear-gradient(90deg, #0a1f33 0%, #0d2740 100%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 var(--syf-pad) 0 51px;   /* left = 64px, right unchanged */
  flex-shrink: 0;
  gap: 12px;
}

.syf-util-center {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 0 1 auto;
  justify-content: flex-start;
  min-width: 0;
  /* nudge so the first link's TEXT (not its hover pill) lines up with the logo edge */
  margin-left: -10px;
}
.syf-util-center-sep {
  width: 1px;
  height: 12px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
  margin: 0 2px;
}
.syf-quick-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  transition: color 0.18s, background 0.18s;
  position: relative;
}
.syf-quick-link:hover {
  color: #FF6B00;
  background: rgba(255,107,0,0.08);
}
.syf-quick-link.ql-active {
  color: #1fa55b;
  background: transparent;
}

.syf-util-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: auto;
}

/* Donate button */
@keyframes donateShimmer {
  0%   { left: -75%; }
  100% { left: 130%; }
}
.syf-btn-donate-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 0 18px;
  height: 30px;
  background: linear-gradient(135deg, #FF7A00 0%, #FF5500 60%, #e04400 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, filter 0.2s;
  box-shadow: 0 0 0 1px rgba(255,107,0,0.55),
              0 4px 20px rgba(255,107,0,0.40),
              inset 0 1px 0 rgba(255,255,255,0.22),
              inset 0 -1px 0 rgba(0,0,0,0.15);
}
.syf-btn-donate-top:hover {
  transform: translateY(-2px);
  filter: brightness(1.12) saturate(1.1);
  box-shadow: 0 0 0 2px rgba(255,150,0,0.90),
              0 8px 32px rgba(255,100,0,0.65),
              0 0 60px rgba(255,120,0,0.25),
              inset 0 1px 0 rgba(255,255,255,0.25),
              inset 0 -1px 0 rgba(0,0,0,0.15);
  color: #fff;
}
.syf-btn-donate-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%);
  transform: skewX(-15deg);
  pointer-events: none;
  transition: left 0s;
}
.syf-btn-donate-top:hover::before { animation: donateShimmer 0.55s ease forwards; }
.syf-btn-donate-top::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(0,0,0,0.20);
  pointer-events: none;
}

/* Language switcher */
.syf-lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.80);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 8px;
  padding: 5px 14px;
  cursor: pointer;
  transition: all 0.18s;
}
.syf-lang-btn:hover {
  background: rgba(255,255,255,0.11);
  color: #fff;
  border-color: rgba(255,107,0,0.32);
}
.syf-lang-btn:disabled { opacity: 0.55; cursor: wait; }

.syf-lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: #0e1d31;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  overflow-y: auto;
  max-height: 320px;
  min-width: 150px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.60);
  z-index: 10000;
}
.syf-lang-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.60);
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
  text-align: left;
}
.syf-lang-option:hover { background: rgba(255,107,0,0.07); color: #fff; }
.syf-lang-option.selected { color: #FF6B00; font-weight: 600; }

/* ── 3. MAIN BAR ──  [horizontal logo] | [foundation info] ........ [nav] */
.syf-main {
  background: linear-gradient(180deg, #0e1c30 0%, #081422 100%);
  border-bottom: 1px solid rgba(255,107,0,0.20);
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 var(--syf-pad);
  flex-shrink: 0;
  position: relative;
  overflow: visible;
}
.syf-main::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,107,0,0.40) 30%, rgba(255,107,0,0.40) 70%, transparent 100%);
}

/* Horizontal logo.
   mix-blend-mode: lighten melts the logo's dark-navy background into the bar,
   so no box is visible around the image. */
.syf-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  margin-right: 22px;
}
.syf-logo-img {
  height: 46px;
  width: auto;
  display: block;
  mix-blend-mode: lighten;
  transition: filter 0.22s ease;
}
.syf-logo:hover .syf-logo-img { filter: brightness(1.12) saturate(1.1); }

/* Foundation credentials — small, quiet, separated by a hairline */
.syf-org {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  flex-shrink: 0;
  white-space: nowrap;
  text-decoration: none;
  padding-left: 22px;
  margin-right: 24px;
  border-left: 1px solid rgba(255,255,255,0.14);
  height: 34px;
}
.syf-org-name {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.6px;
  color: #ffffff;
  line-height: 1;
}
.syf-org-tag {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: rgba(255,255,255,0.50);
  line-height: 1;
}

/* ── MEMBERSHIP BUTTON — ELITE ── */
@keyframes shimmerSlide {
  0%   { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(300%) skewX(-15deg); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 1px rgba(255,107,0,0.40), 0 4px 20px rgba(255,107,0,0.22), 0 0 32px rgba(255,107,0,0.06); }
  50%      { box-shadow: 0 0 0 1px rgba(255,150,50,0.65), 0 4px 28px rgba(255,107,0,0.42), 0 0 48px rgba(255,107,0,0.12); }
}
.syf-btn-elite {
  display: inline-flex;
  align-items: stretch;
  gap: 0;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 11px;
  overflow: hidden;
  background: linear-gradient(135deg, #0c1a2e 0%, #101f35 50%, #0c1828 100%);
  animation: pulseGlow 3s ease-in-out infinite;
  transition: transform 0.22s, filter 0.22s;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
}
.syf-btn-elite:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
  animation: none;
  box-shadow: 0 0 0 1px rgba(255,160,60,0.75), 0 8px 36px rgba(255,107,0,0.45), 0 0 60px rgba(255,107,0,0.15);
}
.syf-btn-elite::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
  transform: translateX(-100%) skewX(-15deg);
  pointer-events: none;
}
.syf-btn-elite:hover::after { animation: shimmerSlide 0.65s ease forwards; }
.syf-elite-body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 16px;
}
.syf-elite-title {
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  line-height: 1;
  background: linear-gradient(90deg, #ffffff 0%, #ffd0a0 60%, #FF8C40 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── DESKTOP NAV (right-aligned, evenly spaced) ── */
.syf-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  overflow: visible;
  min-width: 0;
}
.syf-nav-item {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.syf-nav-item + .syf-nav-item::before {
  content: '';
  display: block;
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
  margin-right: 2px;
}
.syf-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13.5px;
  font-weight: 700;
  color: rgba(255,255,255,0.88);
  padding: 8px 11px;
  border-radius: 6px;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.18s, background 0.18s;
  position: relative;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}
.syf-nav-link:hover { color: #fff; background: rgba(255,255,255,0.09); }
.syf-nav-link.active {
  color: #FF6B00;
  background: rgba(255,107,0,0.12);
  font-weight: 800;
}
.syf-nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 6px; right: 6px;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: #FF6B00;
}
.syf-chev {
  width: 10px; height: 10px;
  opacity: 0.45;
  transition: transform 0.2s;
  flex-shrink: 0;
}
.syf-nav-item:hover .syf-chev { transform: rotate(180deg); opacity: 0.8; }

/* Dropdown */
.syf-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: #0d1c30;
  border: 1px solid rgba(255,107,0,0.18);
  border-radius: 14px;
  overflow: hidden;
  min-width: 220px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.65);
  z-index: 10000;
  padding-top: 4px;
}
.syf-nav-item:hover .syf-dropdown { display: block; animation: ddFade 0.16s ease; }
@keyframes ddFade {
  from { opacity:0; transform: translateX(-50%) translateY(-6px); }
  to   { opacity:1; transform: translateX(-50%) translateY(0); }
}
.syf-dd-header {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: rgba(255,107,0,0.55);
  padding: 8px 16px 4px;
}
.syf-dd-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  border-top: 1px solid rgba(255,255,255,0.04);
  text-decoration: none;
  transition: background 0.14s;
}
.syf-dd-item:hover { background: rgba(255,107,0,0.06); }
.syf-dd-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  transition: color 0.14s;
}
.syf-dd-item:hover .syf-dd-label { color: #FF6B00; }
.syf-dd-desc {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  line-height: 1.4;
}

/* ── MOBILE MAIN BAR ──  [horizontal logo] ........ [hamburger] */
.syf-mobile-main {
  display: none;
  background: linear-gradient(180deg, #0e1c30 0%, #0a1525 100%);
  border-bottom: 1px solid rgba(255,107,0,0.15);
  height: 72px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
  position: relative;
  gap: 14px;
}
.syf-mobile-main::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255,107,0,0.35) 30%, rgba(255,107,0,0.35) 70%, transparent 100%);
}
.syf-mob-logo {
  display: flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0;
  text-decoration: none;
}
.syf-mob-logo-img {
  height: 44px;
  width: auto;
  max-width: 100%;
  display: block;
  mix-blend-mode: lighten;
}
.syf-mob-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px; height: 46px;
  border-radius: 11px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.78);
  cursor: pointer;
  transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.18s;
  flex-shrink: 0;
}
.syf-mob-hamburger:hover {
  background: rgba(255,107,0,0.12);
  border-color: rgba(255,107,0,0.28);
  color: #FF6B00;
}
.syf-mob-hamburger:active { transform: scale(0.93); }
.syf-mob-hamburger.is-active {
  background: rgba(255,107,0,0.14);
  border-color: rgba(255,107,0,0.38);
  color: #FF6B00;
}

/* Morphing hamburger <-> close icon */
.syf-burger {
  position: relative;
  width: 21px;
  height: 15px;
  display: inline-block;
  flex-shrink: 0;
}
.syf-burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2.5px;
  border-radius: 2px;
  background: currentColor;
  transition: top 0.28s cubic-bezier(0.4,0,0.2,1),
              transform 0.28s cubic-bezier(0.4,0,0.2,1),
              opacity 0.18s ease;
}
.syf-burger span:nth-child(1) { top: 0; }
.syf-burger span:nth-child(2) { top: 6.5px; }
.syf-burger span:nth-child(3) { top: 13px; }
.syf-burger.is-open span:nth-child(1) { top: 6.5px; transform: rotate(45deg); }
.syf-burger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.syf-burger.is-open span:nth-child(3) { top: 6.5px; transform: rotate(-45deg); }

/* ── MOBILE UTILITY BAR ── */
.syf-mobile-utility {
  display: none;
  background: #060d18;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,107,0,0.22);
  flex-direction: column;
  flex-shrink: 0;
}
.syf-mob-actions-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
}
.syf-mob-btn-elite {
  flex: 1.15;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  padding: 13px 0;
  background: linear-gradient(135deg, #0c1a2e 0%, #101f35 50%, #0c1828 100%);
  box-shadow: 0 0 0 1px rgba(255,107,0,0.45),
              0 3px 14px rgba(255,107,0,0.28),
              inset 0 1px 0 rgba(255,255,255,0.05);
  transition: transform 0.16s, box-shadow 0.16s;
  position: relative;
  white-space: nowrap;
}
.syf-mob-btn-elite:active { transform: scale(0.97); }
.syf-mob-elite-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  flex: 1;
  min-width: 0;
}
.syf-mob-elite-title {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: linear-gradient(90deg, #ffffff 0%, #ffd0a0 60%, #FF8C40 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.syf-mob-btn-donate {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #FF7A00 0%, #FF5500 60%, #e04400 100%);
  border: none;
  border-radius: 10px;
  padding: 13px 8px;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(255,107,0,0.5), 0 3px 14px rgba(255,85,0,0.45);
  transition: box-shadow 0.18s, transform 0.16s;
  letter-spacing: 0.3px;
}
.syf-mob-btn-donate:active { transform: scale(0.97); }
.syf-mob-btn-donate:hover {
  box-shadow: 0 0 0 1px rgba(255,107,0,0.8), 0 5px 20px rgba(255,85,0,0.65);
  color: #fff;
}
.syf-mob-btn-donate svg { width: 15px; height: 15px; }

.syf-mob-lang-btn {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #ffffff;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 10px;
  padding: 9px 33px;
  min-width: 78px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.18s;
}
.syf-mob-lang-btn svg { width: 17px; height: 17px; flex-shrink: 0; }
.syf-mob-lang-btn:active { transform: scale(0.97); }
.syf-mob-lang-btn:hover {
  background: rgba(255,255,255,0.14);
  border-color: rgba(255,140,60,0.45);
}

.syf-mob-lang-wrap { position: relative; }
.syf-mob-lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: #0e1d31;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 10px;
  overflow-y: auto;
  max-height: 300px;
  min-width: 140px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.60);
  z-index: 10001;
}
.syf-mob-lang-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.60);
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
  text-align: left;
}
.syf-mob-lang-option:hover { background: rgba(255,107,0,0.07); color: #fff; }
.syf-mob-lang-option.selected { color: #FF6B00; font-weight: 600; }

/* ── MOBILE DRAWER ── */
.syf-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4,10,20,0.60);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 9997;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.32s ease, visibility 0s linear 0.32s;
  pointer-events: none;
}
.syf-drawer-backdrop.open {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.32s ease, visibility 0s linear 0s;
  pointer-events: auto;
}
.syf-drawer {
  display: flex;
  flex-direction: column;
  background: #0a1526;
  border-top: 1px solid rgba(255,255,255,0.06);
  position: relative;
  z-index: 9999;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  padding-top: 6px;
  transform: translateY(-10px);
  transition: max-height 0.42s cubic-bezier(0.22,1,0.36,1),
              opacity 0.26s ease,
              transform 0.34s cubic-bezier(0.22,1,0.36,1);
  pointer-events: none;
}
.syf-drawer.open {
  /* header above the drawer is ~145px tall on mobile */
  max-height: calc(100dvh - 150px);
  overflow-y: auto;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  -webkit-overflow-scrolling: touch;
}
.syf-drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 20px 15px 22px;
  margin: 2px 8px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.80);
  text-decoration: none;
  transition: color 0.18s ease, background 0.18s ease, transform 0.15s ease;
  background: none;
  border: none;
  width: calc(100% - 16px);
  text-align: left;
  cursor: pointer;
  position: relative;
}
.syf-drawer-link::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  width: 3px;
  height: 0;
  border-radius: 0 3px 3px 0;
  background: #FF6B00;
  transform: translateY(-50%);
  transition: height 0.2s ease;
}
.syf-drawer-link:hover { color: #fff; background: rgba(255,255,255,0.05); }
.syf-drawer-link:active { transform: scale(0.985); }
.syf-drawer-link.mobile-active,
.syf-drawer-link.dd-open {
  color: #FF6B00;
  background: rgba(255,107,0,0.08);
}
.syf-drawer-link.mobile-active::before,
.syf-drawer-link.dd-open::before { height: 60%; }
.syf-drawer-link .arrow {
  color: rgba(255,255,255,0.25);
  font-size: 18px;
  line-height: 1;
  transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), color 0.2s;
  flex-shrink: 0;
}
.syf-drawer-link.dd-open .arrow { transform: rotate(90deg); color: #FF6B00; }

.syf-drawer-quicklinks {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 6px;
  margin-top: 4px;
  padding-bottom: 14px;
}
.syf-drawer-section-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: rgba(255,107,0,0.60);
  padding: 14px 22px 6px;
}
.syf-mobile-sub {
  display: grid;
  grid-template-rows: 0fr;
  background: rgba(255,107,0,0.045);
  border-left: 2px solid rgba(255,107,0,0.28);
  margin: 0 16px 4px 24px;
  border-radius: 10px;
  transition: grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1), margin 0.32s ease;
}
.syf-mobile-sub.open {
  grid-template-rows: 1fr;
  margin: 2px 16px 10px 24px;
}
.syf-mobile-sub > div { overflow: hidden; min-height: 0; }
.syf-mobile-sub-link {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 16px;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(255,255,255,0.62);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: color 0.15s, background 0.15s, padding-left 0.15s;
  border-radius: 6px;
}
.syf-mobile-sub-link:last-child { border-bottom: none; }
.syf-mobile-sub-link:hover {
  color: #FF6B00;
  background: rgba(255,107,0,0.08);
  padding-left: 20px;
}
.syf-mobile-sub-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: rgba(255,107,0,0.45);
  flex-shrink: 0;
  transition: background 0.15s, transform 0.15s;
}
.syf-mobile-sub-link:hover .syf-mobile-sub-dot {
  background: #FF6B00;
  transform: scale(1.3);
}

/* ── RESPONSIVE ── */
@media (max-width: 1450px) {
  /* foundation credentials hide first to keep the nav comfortable */
  .syf-org { display: none; }
}
@media (max-width: 1300px) {
  .syf-nav-link { font-size: 12.5px; padding: 8px 9px; }
  .syf-quick-link { font-size: 11px; padding: 5px 8px; }
  .syf-logo-img { height: 58px; }
}
@media (max-width: 1200px) {
  .syf-nav-link { font-size: 11.5px; padding: 7px 6px; }
  .syf-logo { margin-right: 14px; }
  .syf-logo-img { height: 56px; }
}
@media (max-width: 1100px) {
  .syf-utility        { display: none !important; }
  .syf-main           { display: none !important; }
  .syf-mobile-utility { display: flex !important; }
  .syf-mobile-main    { display: flex !important; }
}
@media (max-width: 400px) {
  .syf-mobile-main { height: 68px; padding: 0 12px; gap: 10px; }
  .syf-mob-logo-img { height: 51px; }
  .syf-mob-hamburger { width: 42px; height: 42px; }
  .syf-mob-actions-row { padding: 9px 12px; gap: 6px; }
  .syf-mob-elite-title { font-size: 10.5px; }
  .syf-mob-elite-inner { padding: 0 5px; }
  .syf-mob-btn-donate { font-size: 11px; padding: 7px 6px; }
  .syf-mob-lang-btn { font-size: 12px; padding: 7px 31px; min-width: 58px; }
}
@media (prefers-reduced-motion: reduce) {
  .syf-drawer,
  .syf-drawer-backdrop,
  .syf-mobile-sub,
  .syf-burger span,
  .syf-logo-img { transition: none !important; }
  .syf-mob-btn-donate:hover,
  .syf-mob-btn-elite:hover { transform: none; }
}
`;

/* ─── SVG ICONS ─── */
const IcoYouth = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcoHeart = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7" />
    <rect x="2" y="7" width="20" height="5" rx="1" />
    <path d="M12 7v13" />
    <path d="M12 7c-1.5-3-5-3-5-1s2 1.5 5 1z" />
    <path d="M12 7c1.5-3 5-3 5-1s-2 1.5-5 1z" />
  </svg>
);
const IcoGlobe = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IcoChev = ({ cls = "" }: { cls?: string }) => (
  <svg className={`syf-chev ${cls}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ─── COMPONENT ─── */
export default function SiteHeader({
  activeHref = "/",
  navLinks = DEFAULT_NAV,
}: SiteHeaderProps) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [langOpen,    setLangOpen]    = useState(false);
  const [mobLangOpen, setMobLangOpen] = useState(false);
  const [activeLang,  setActiveLang]  = useState("en");
  const [mobileDD,    setMobileDD]    = useState<string | null>(null);

  const langRef    = useRef<HTMLDivElement>(null);
  const mobLangRef = useRef<HTMLDivElement>(null);

  const { isReady, changeLanguage } = useGoogleTranslate("en");

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/[^/]*\/([a-zA-Z-]+)/);
    if (match?.[1]) setActiveLang(match[1]);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (mobLangRef.current && !mobLangRef.current.contains(e.target as Node)) setMobLangOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleDD = useCallback((label: string) =>
    setMobileDD((p) => (p === label ? null : label)), []);

  const handleSelectLanguage = useCallback((code: string) => {
    setActiveLang(code);
    setLangOpen(false);
    setMobLangOpen(false);
    changeLanguage(code);
  }, [changeLanguage]);

  const currentLang = LANGUAGES.find((l) => l.code === activeLang);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="syf-header" role="banner">

        <div className="syf-tricolor" aria-hidden="true" />

        {/* ══ DESKTOP: UTILITY BAR ══ */}
        <div style={{ paddingLeft: "51px" }} className="syf-utility">
          <nav className="syf-util-center" aria-label="Quick navigation">
            {QUICK_LINKS.map((ql, i) => (
              <React.Fragment key={ql.href}>
                {i > 0 && <span className="syf-util-center-sep" aria-hidden="true" />}
                <a
                  href={ql.href}
                  className={`syf-quick-link${activeHref === ql.href ? " ql-active" : ""}`}
                  aria-current={activeHref === ql.href ? "page" : undefined}
                >
                  {ql.icon && <IcoYouth />}
                  {ql.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <div className="syf-util-right">
            <a href="#membership" className="syf-btn-elite">
              <span className="syf-elite-body">
                <span className="syf-elite-title">Sadaiv Cyber Membership</span>
              </span>
            </a>

            <a href="#donate" className="syf-btn-donate-top">
              DONATE
            </a>

            <div ref={langRef} style={{ position: "relative" }}>
              <button
                className="syf-lang-btn"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={`Language: ${currentLang?.label ?? "English"}. ${isReady ? "" : "Loading translator. "}Tap to switch.`}
              >
                <IcoGlobe />
                {currentLang?.label ?? "English"}
                <IcoChev cls={langOpen ? "syf-chev" : ""} />
              </button>
              {langOpen && (
                <div className="syf-lang-dropdown" role="listbox">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={activeLang === lang.code}
                      className={`syf-lang-option${activeLang === lang.code ? " selected" : ""}`}
                      onClick={() => handleSelectLanguage(lang.code)}
                    >
                      {lang.label}
                      {activeLang === lang.code && <IcoCheck />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══ DESKTOP: MAIN BAR ══ */}
        <div className="syf-main">
          <a href="/" className="syf-logo" aria-label="Sadaiv Cyber — Home">
            <Image
              src={cyberLogoH}
              alt="Sadaiv Cyber"
              className="syf-logo-img"
              priority
            />
          </a>

          <a href="/" className="syf-org" aria-label="Sadaiv Yuva Foundation — Home">
            <span className="syf-org-name">SADAIV YUVA FOUNDATION</span>
            <span className="syf-org-tag">12A / 80G / CSR FUND APPROVED</span>
          </a>

          <nav className="syf-nav" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const hasDD = link.dropdown && link.dropdown.length > 0;
              const isActive = link.href === activeHref;
              return (
                <div key={link.label} className="syf-nav-item">
                  <a
                    href={link.href}
                    className={`syf-nav-link${isActive ? " active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={hasDD ? (e) => e.preventDefault() : undefined}
                  >
                    {link.label}
                    {hasDD && <IcoChev />}
                  </a>
                  {hasDD && (
                    <div className="syf-dropdown" role="menu" aria-label={`${link.label} submenu`}>
                      <div className="syf-dd-header">{link.label}</div>
                      {link.dropdown!.map((item) => (
                        <a key={item.label} href={item.href} className="syf-dd-item" role="menuitem">
                          <span className="syf-dd-label">{item.label}</span>
                          {item.description && <span className="syf-dd-desc">{item.description}</span>}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* ══ MOBILE: MAIN BAR ══ */}
        <div className="syf-mobile-main">
          <a href="/" className="syf-mob-logo" aria-label="Sadaiv Cyber — Home">
            <Image
              src={cyberLogoH}
              alt="Sadaiv Cyber"
              className="syf-mob-logo-img"
              priority
            />
          </a>
          <button
            className={`syf-mob-hamburger${menuOpen ? " is-active" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="syf-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`syf-burger${menuOpen ? " is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {/* ══ MOBILE: UTILITY BAR ══ */}
        <div className="syf-mobile-utility">
          <div className="syf-mob-actions-row">
            <a href="#membership" className="syf-mob-btn-elite">
              <span className="syf-mob-elite-inner">
                <span className="syf-mob-elite-title">Membership</span>
              </span>
            </a>
            <a href="#donate" className="syf-mob-btn-donate">
              <IcoHeart /> DONATE
            </a>
            <div ref={mobLangRef} className="syf-mob-lang-wrap">
              <button
                className="syf-mob-lang-btn"
                onClick={() => setMobLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={mobLangOpen}
                aria-label={`Language: ${currentLang?.label ?? "English"}. Tap to switch.`}
              >
                <IcoGlobe />
                {(activeLang || "en").toUpperCase()}
              </button>
              {mobLangOpen && (
                <div className="syf-mob-lang-dropdown" role="listbox">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={activeLang === lang.code}
                      className={`syf-mob-lang-option${activeLang === lang.code ? " selected" : ""}`}
                      onClick={() => handleSelectLanguage(lang.code)}
                    >
                      {lang.label}
                      {activeLang === lang.code && <IcoCheck />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══ MOBILE: DRAWER BACKDROP ══ */}
        <div
          className={`syf-drawer-backdrop${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* ══ MOBILE: DRAWER ══ */}
        <nav
          id="syf-drawer"
          className={`syf-drawer${menuOpen ? " open" : ""}`}
          aria-hidden={!menuOpen}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            const hasDD = link.dropdown && link.dropdown.length > 0;
            const isOpen = mobileDD === link.label;
            const isActive = link.href === activeHref;
            return (
              <div key={link.label}>
                {hasDD ? (
                  <>
                    <button
                      className={`syf-drawer-link${isActive ? " mobile-active" : ""}${isOpen ? " dd-open" : ""}`}
                      onClick={() => toggleDD(link.label)}
                      aria-expanded={isOpen}
                    >
                      {link.label}
                      <span className="arrow" aria-hidden="true">›</span>
                    </button>

                    <div className={`syf-mobile-sub${isOpen ? " open" : ""}`}>
                      <div>
                        {link.dropdown!.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="syf-mobile-sub-link"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span className="syf-mobile-sub-dot" aria-hidden="true" />
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className={`syf-drawer-link${isActive ? " mobile-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span className="arrow" aria-hidden="true">›</span>
                  </a>
                )}
              </div>
            );
          })}

          <div className="syf-drawer-quicklinks">
            <div className="syf-drawer-section-label">Quick Links</div>
            {QUICK_LINKS.map((ql) => (
              <a
                key={ql.href}
                href={ql.href}
                className={`syf-drawer-link${activeHref === ql.href ? " mobile-active" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-current={activeHref === ql.href ? "page" : undefined}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  {ql.icon && <IcoYouth />}
                  {ql.label}
                </span>
                <span className="arrow" aria-hidden="true">›</span>
              </a>
            ))}
          </div>
        </nav>

      </header>
    </>
  );
}
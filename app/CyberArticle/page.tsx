'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Noto_Sans_Devanagari, Space_Grotesk } from 'next/font/google';

/* ------------------------------------------------------------------ */
/*  Typography                                                         */
/*  - Noto Sans Devanagari: every word of Hindi body content.          */
/*  - Space Grotesk: a geometric, technical Latin face used only for   */
/*    numerals, eyebrows and the brand mark — it's what gives this a   */
/*    "security dashboard" edge instead of a generic editorial one.    */
/* ------------------------------------------------------------------ */
const deva = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-deva',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

/* ------------------------------------------------------------------ */
/*  API config                                                         */
/* ------------------------------------------------------------------ */
const API_URL =
  'https://mapi.sadaivsatya.com/api/AdminApi/getnews-bycategoryandsubcat/Cyber%20Duniya/Cyber%20Article?page=1&pageSize=30';

// Thumbnails come back as relative paths e.g. "/Media/NewsImage/xxx.webp".
// Change this if your media is actually served from a different host.
const MEDIA_BASE = 'https://mapi.sadaivsatya.com';

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function getImageUrl(thumbnail) {
  if (!thumbnail) return null;
  return thumbnail.startsWith('http') ? thumbnail : `${MEDIA_BASE}${thumbnail}`;
}

function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getExcerpt(html, max = 150) {
  const text = stripHtml(html);
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function getReadTime(html) {
  const words = stripHtml(html).split(' ').filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

const DEVA_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevaNumeral(n) {
  return String(n)
    .split('')
    .map((ch) => (/[0-9]/.test(ch) ? DEVA_DIGITS[Number(ch)] : ch))
    .join('');
}

function toHashtag(tag = '') {
  return '#' + tag.replace(/[^\p{L}\p{N}]/gu, '');
}

/* ------------------------------------------------------------------ */
/*  Small presentational bits                                          */
/* ------------------------------------------------------------------ */
function EyebrowRule({ index, label }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span
        style={{ fontFamily: 'var(--font-grotesk)' }}
        className="text-[13px] font-semibold text-[#22D3EE]"
      >
        {String(index).padStart(2, '0')}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7C5CFF]">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#232B47] to-transparent" />
    </div>
  );
}

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-[#171E36] ${className}`} />;
}

function Glow({ className }) {
  return <div className={`pointer-events-none absolute rounded-full blur-[100px] ${className}`} />;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function CyberArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json)
        ? json
        : json.data || json.result || json.News || json.news || [];
      setArticles(list);
    } catch (err) {
      console.error('Failed to load cyber news:', err);
      setError('ताज़ा साइबर लेख लोड नहीं हो सके। कृपया कुछ देर बाद पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const featured = articles[0] || null;

  const selected = useMemo(() => {
    if (!articles.length) return null;
    return articles.find((a) => a.newsSlug === selectedSlug) || featured;
  }, [articles, selectedSlug, featured]);

  const alertRail = useMemo(() => articles.slice(0, 3), [articles]);

  const baseGrid = useMemo(() => {
    if (!featured) return [];
    return articles.filter((a) => a.newsId !== featured.newsId);
  }, [articles, featured]);

  const latestGrid = useMemo(() => {
    return activeFilter
      ? baseGrid.filter(
          (a) => a.newsTag === activeFilter || a.subCatNameInHindi === activeFilter
        )
      : baseGrid;
  }, [baseGrid, activeFilter]);

  const visibleArticles = useMemo(
    () => latestGrid.slice(0, visibleCount),
    [latestGrid, visibleCount]
  );

  // Reset pagination whenever the active filter changes so a new topic
  // always starts back at 4 cards.
  useEffect(() => {
    setVisibleCount(4);
  }, [activeFilter]);

  const mostRead = useMemo(
    () => [...articles].sort((a, b) => b.viewCount - a.viewCount).slice(0, 7),
    [articles]
  );

  const related = useMemo(() => {
    if (!selected) return [];
    return articles.filter((a) => a.newsId !== selected.newsId).slice(0, 3);
  }, [articles, selected]);

  const trendingTags = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const a of articles) {
      if (a.newsTag && !seen.has(a.newsTag)) {
        seen.add(a.newsTag);
        out.push(a.newsTag);
      }
      if (out.length >= 8) break;
    }
    return out;
  }, [articles]);

  const categories = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const a of articles) {
      const label = a.subCatNameInHindi || a.newsSubCategory;
      if (label && !seen.has(label)) {
        seen.add(label);
        out.push(label);
      }
    }
    return out.length ? out : ['साइबर लेख'];
  }, [articles]);

  const tickerItems = useMemo(() => {
    const base = articles.slice(0, 8);
    return [...base, ...base];
  }, [articles]);

  const handleSelect = useCallback((slug) => {
    setSelectedSlug(slug);
    document.getElementById('lekh-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <main
      className={`${deva.variable} ${grotesk.variable} relative min-h-screen overflow-x-hidden bg-[#0A0E1A] text-[#F1F3F9]`}
      style={{ fontFamily: 'var(--font-deva)' }}
    >
      {/* Only bit that truly needs a real @keyframes rule — Tailwind can't
          declare new keyframes purely via utility classes without editing
          tailwind.config.js. */}
      <style>{`
        @keyframes advisoryScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .advisory-track { animation: advisoryScroll 34s linear infinite; }
        .advisory-track:hover { animation-play-state: paused; }
        @keyframes livePulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.4); } }
        .live-dot { animation: livePulse 1.6s ease-in-out infinite; }
      `}</style>

      {/* ── Ambient glow field ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Glow className="-left-40 -top-40 h-[560px] w-[560px] bg-[#7C5CFF]/20" />
        <Glow className="right-[-160px] top-[280px] h-[480px] w-[480px] bg-[#22D3EE]/10" />
        <Glow className="left-[30%] top-[1200px] h-[500px] w-[500px] bg-[#7C5CFF]/10" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      {/* ── Sticky nav ── */}
      <header className="sticky top-0 z-50 border-b border-[#232B47] bg-[#0A0E1A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-16">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0E1A">
                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-[14px] font-bold text-white">सदैव युवा फाउंडेशन</div>
              <div
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="text-[9px] uppercase tracking-[0.2em] text-[#6F7793]"
              >
                Cyber Awareness Centre
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {[
              ['होम', '#'],
              ['लेख', '#lekh-suchi'],
              ['अलर्ट', '#advisory'],
              ['श्रेणियाँ', '#lekh-suchi'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-md px-3.5 py-2 text-[13.5px] font-medium text-[#AEB6CC] transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="tel:1930"
            className="flex items-center gap-2 rounded-md bg-gradient-to-r from-[#7C5CFF] to-[#6D4CFF] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_0_24px_rgba(124,92,255,0.35)] transition hover:shadow-[0_0_32px_rgba(124,92,255,0.55)]"
          >
            स्कैम रिपोर्ट करें · 1930
          </a>
        </div>
      </header>

      {/* ── Advisory ticker ── */}
      <div id="advisory" className="relative z-10 overflow-hidden border-b border-[#232B47] bg-[#0D1220] py-2.5">
        <div className="absolute inset-y-0 left-0 z-20 flex items-center gap-1.5 whitespace-nowrap bg-[#FF5470]/15 px-4 text-[11px] font-bold uppercase tracking-widest text-[#FF5470]">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#FF5470]" />
          सतर्कता अलर्ट
        </div>
        <div
          className="advisory-track flex gap-12 pl-[190px] will-change-transform"
          style={{ width: 'max-content' }}
        >
          {(tickerItems.length ? tickerItems : Array.from({ length: 4 })).map((item, i) => (
            <span
              key={i}
              className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[13px] font-medium text-[#AEB6CC] hover:text-[#22D3EE]"
              onClick={() => item?.newsSlug && handleSelect(item.newsSlug)}
            >
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#7C5CFF]" />
              {item ? item.newsTag || item.newsHeading : 'लोड हो रहा है…'}
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative z-10 px-6 py-12 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {loading ? (
            <div className="order-2 space-y-5 lg:order-1">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-3/4" />
              <SkeletonBlock className="h-20 w-full" />
            </div>
          ) : featured ? (
            <div className="order-2 lg:order-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/30 bg-[#7C5CFF]/10 px-4 py-1.5">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
                <span
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#22D3EE]"
                >
                  Live · आज की प्रमुख रिपोर्ट
                </span>
              </div>
              <h2 className="mb-6 text-[32px] font-extrabold leading-[1.22] tracking-tight text-white sm:text-[46px]">
                {featured.newsHeading}
              </h2>
              {featured.newsHeadingTwo && (
                <p className="mb-6 bg-gradient-to-r from-[#22D3EE] to-[#7C5CFF] bg-clip-text text-[17px] font-medium leading-relaxed text-transparent">
                  {featured.newsHeadingTwo}
                </p>
              )}
              <p className="mb-8 text-[15px] leading-[1.85] text-[#AEB6CC]">
                {getExcerpt(featured.newsDetails, 200)}
              </p>
              <div className="mb-9 flex flex-wrap items-center gap-4 text-[13px] text-[#6F7793]">
                <span className="rounded-md bg-[#FF5470]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FF5470]">
                  {featured.newsTag}
                </span>
                <span>{formatDate(featured.updatedDate)}</span>
                <span>·</span>
                <span>{toDevaNumeral(getReadTime(featured.newsDetails))} मिनट में पढ़ें</span>
              </div>
              <button
                onClick={() => handleSelect(featured.newsSlug)}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#6D4CFF] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(124,92,255,0.35)] transition hover:shadow-[0_0_44px_rgba(124,92,255,0.55)]"
              >
                पूरा लेख पढ़ें
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>

              {/* Stat row */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#232B47] pt-8">
                {[
                  ['२.४M+', 'नागरिकों तक पहुंच'],
                  [toDevaNumeral(articles.length || 380) + '+', 'प्रकाशित लेख'],
                  ['१२K+', 'रिपोर्ट किए गए स्कैम'],
                ].map(([num, lbl]) => (
                  <div key={lbl}>
                    <div
                      style={{ fontFamily: 'var(--font-grotesk)' }}
                      className="text-[26px] font-bold text-white"
                    >
                      {num}
                    </div>
                    <div className="mt-1 text-[12px] text-[#6F7793]">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#6F7793]">कोई लेख उपलब्ध नहीं है।</p>
          )}

          {/* Right: image + live alert rail — visible on every breakpoint,
              shown first on mobile so the hero never feels text-only */}
          <div className="relative order-1 mb-10 lg:order-2 lg:mb-0">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#232B47] bg-[#12172A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              {featured && getImageUrl(featured.thumbnail) ? (
                <img
                  src={getImageUrl(featured.thumbnail)}
                  alt={stripHtml(featured.newsHeading)}
                  className="aspect-[16/11] w-full object-cover object-center opacity-95 sm:aspect-[16/10] lg:aspect-[4/5] lg:object-contain lg:bg-[#0D1220]"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <div className="flex aspect-[16/11] w-full items-center justify-center sm:aspect-[16/10] lg:aspect-[4/5]">
                  <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#7C5CFF" strokeWidth="1" className="opacity-30">
                    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
                  </svg>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/5 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#7C5CFF]/20" />
            </div>

            {/* Live alert rail — flows normally below the image on mobile,
                becomes an overlapping glass panel from lg upward */}
            <div className="relative mt-4 rounded-xl border border-[#232B47] bg-[#12172A]/90 shadow-[0_20px_60px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:absolute lg:-bottom-10 lg:left-6 lg:right-6 lg:mt-0">
              <div className="flex items-center gap-2 border-b border-[#232B47] px-5 py-3">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
                <span
                  style={{ fontFamily: 'var(--font-grotesk)' }}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#22D3EE]"
                >
                  आज के अलर्ट
                </span>
              </div>
              {(alertRail.length ? alertRail : Array.from({ length: 3 })).map((a, i) => (
                <div
                  key={a?.newsId ?? i}
                  onClick={() => a?.newsSlug && handleSelect(a.newsSlug)}
                  className="flex cursor-pointer items-start gap-3 px-5 py-3 transition hover:bg-white/5"
                >
                  <span
                    style={{ fontFamily: 'var(--font-grotesk)' }}
                    className="text-[13px] font-bold text-[#7C5CFF]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] leading-snug text-[#DDE1EC]">
                    {a ? a.newsTag || a.newsHeading : 'लोड हो रहा है…'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Page content ── */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-24 pt-24 lg:px-16" id="lekh-suchi">
        {error && (
          <div className="mb-14 flex flex-col items-start gap-3 rounded-xl border border-[#FF5470]/30 bg-[#FF5470]/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-[#FF8FA3]">{error}</p>
            <button
              onClick={fetchNews}
              className="rounded-lg bg-[#7C5CFF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6D4CFF]"
            >
              पुनः प्रयास करें
            </button>
          </div>
        )}

        <div className="grid gap-16 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            {/* Latest articles */}
            <EyebrowRule index={1} label="ताज़ा साइबर लेख" />

            {/* Quick filter chips */}
            {!!categories.length && (
              <div className="mb-8 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter(null)}
                  className={`rounded-full border px-4 py-1.5 text-[12.5px] font-medium transition ${
                    !activeFilter
                      ? 'border-[#7C5CFF] bg-[#7C5CFF]/15 text-[#B4A6FF]'
                      : 'border-[#232B47] text-[#6F7793] hover:border-[#7C5CFF]/40 hover:text-[#AEB6CC]'
                  }`}
                >
                  सभी
                </button>
                {trendingTags.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag === activeFilter ? null : tag)}
                    className={`rounded-full border px-4 py-1.5 text-[12.5px] font-medium transition ${
                      activeFilter === tag
                        ? 'border-[#22D3EE] bg-[#22D3EE]/15 text-[#22D3EE]'
                        : 'border-[#232B47] text-[#6F7793] hover:border-[#22D3EE]/40 hover:text-[#AEB6CC]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div className="mb-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <SkeletonBlock className="h-[180px] w-full" />
                      <SkeletonBlock className="h-4 w-full" />
                      <SkeletonBlock className="h-4 w-2/3" />
                    </div>
                  ))
                : visibleArticles.map((item) => (
                    <article
                      key={item.newsId}
                      onClick={() => handleSelect(item.newsSlug)}
                      className="group cursor-pointer rounded-xl border border-[#232B47] bg-[#12172A]/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/50 hover:shadow-[0_20px_50px_-20px_rgba(124,92,255,0.35)]"
                    >
                      <div className="relative mb-4 h-[180px] overflow-hidden rounded-lg border border-[#232B47] bg-[#0D1220]">
                        {getImageUrl(item.thumbnail) && (
                          <img
                            src={getImageUrl(item.thumbnail)}
                            alt={stripHtml(item.newsHeading)}
                            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.05]"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                        <span className="absolute left-3 top-3 rounded-md bg-[#0A0E1A]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#22D3EE] backdrop-blur">
                          {item.newsTag}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center gap-2.5 text-[12px] text-[#6F7793]">
                        <span>{formatDate(item.updatedDate)}</span>
                        <span>·</span>
                        <span>{toDevaNumeral(getReadTime(item.newsDetails))} मिनट रीड</span>
                      </div>
                      <h3 className="mb-2 text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-[#22D3EE]">
                        {item.newsHeading}
                      </h3>
                      <p className="mb-3 text-[13.5px] leading-relaxed text-[#AEB6CC]">
                        {getExcerpt(item.newsDetails, 110)}
                      </p>
                      <div className="flex items-center justify-between border-t border-[#232B47] pt-3 text-[12px]">
                        <span className="text-[#6F7793]">
                          {item.viewCount?.toLocaleString('en-IN')} बार पढ़ा गया
                        </span>
                        <span className="font-semibold text-[#7C5CFF] group-hover:text-[#22D3EE]">
                          पढ़ें →
                        </span>
                      </div>
                    </article>
                  ))}
              {!loading && !latestGrid.length && !error && (
                <p className="text-sm text-[#6F7793]">इस श्रेणी में अभी कोई लेख नहीं है।</p>
              )}
            </div>

            {/* Load more */}
            {!loading && visibleCount < latestGrid.length && (
              <div className="mb-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((v) => v + 4)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#232B47] bg-[#12172A]/60 px-7 py-3 text-[14px] font-semibold text-[#AEB6CC] transition hover:border-[#7C5CFF]/50 hover:text-white"
                >
                  और ताज़ा लेख देखें
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v10M3 8l5 5 5-5" />
                  </svg>
                </button>
              </div>
            )}
            {!loading && !!latestGrid.length && visibleCount >= latestGrid.length && (
              <p className="mb-12 text-center text-[12.5px] text-[#4C5473]">
                — सभी {toDevaNumeral(latestGrid.length)} लेख दिखाए जा चुके हैं —
              </p>
            )}

            {/* Full article preview */}
            <div id="lekh-preview" className="scroll-mt-24" />
            {selected && (
              <>
                <EyebrowRule index={2} label="विस्तृत लेख" />
                <article className="relative mb-16 overflow-hidden rounded-2xl border border-[#232B47] bg-[#12172A]">
                  <div className="relative overflow-hidden border-b border-[#232B47] px-8 py-12 text-center sm:px-14">
                    <Glow className="right-[-100px] top-[-100px] h-[300px] w-[300px] bg-[#7C5CFF]/25" />
                    <span className="relative mb-5 inline-block rounded-md bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0A0E1A]">
                      {selected.catNameInHindi || 'साइबर जागरूकता'}
                    </span>
                    <h2 className="relative mx-auto mb-6 max-w-[820px] text-[27px] font-extrabold leading-tight tracking-tight text-white sm:text-[38px]">
                      {selected.newsHeading}
                    </h2>
                    {selected.newsHeadingTwo && (
                      <p className="relative mx-auto mb-6 max-w-[820px] text-[16px] text-[#AEB6CC]">{selected.newsHeadingTwo}</p>
                    )}
                    <div className="relative flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#6F7793]">
                      <span>सदैव युवा फाउंडेशन द्वारा प्रकाशित</span>
                      <span>{formatDate(selected.updatedDate)}</span>
                      <span>{toDevaNumeral(getReadTime(selected.newsDetails))} मिनट रीड</span>
                      <span>{selected.viewCount?.toLocaleString('en-IN')} बार पढ़ा गया</span>
                    </div>
                  </div>

                  <div className="px-8 py-12 sm:px-14">
                    {/* newsDetails is trusted CMS-authored HTML from your own API.
                        Sanitize with DOMPurify first if that ever changes. */}
                    <div
                      className="mx-auto max-w-[820px] text-[16.5px] leading-[1.95] text-[#DDE1EC]
                        [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:bg-gradient-to-br [&>p:first-of-type]:first-letter:from-[#7C5CFF] [&>p:first-of-type]:first-letter:to-[#22D3EE] [&>p:first-of-type]:first-letter:bg-clip-text [&>p:first-of-type]:first-letter:text-[66px] [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:leading-[0.78] [&>p:first-of-type]:first-letter:text-transparent
                        [&_p]:mb-6 [&_p]:leading-[1.95]
                        [&_strong]:font-bold [&_strong]:text-white
                        [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:border-b [&_h3]:border-[#232B47] [&_h3]:pb-3 [&_h3]:text-[21px] [&_h3]:font-bold [&_h3]:text-white
                        [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-6 [&_ul]:marker:text-[#7C5CFF]
                        [&_li]:leading-7"
                      dangerouslySetInnerHTML={{ __html: selected.newsDetails }}
                    />

                    <div className="mx-auto my-9 flex max-w-[820px] gap-4 rounded-xl border border-[#22D3EE]/25 bg-[#22D3EE]/[0.06] p-6">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#22D3EE]/15 text-lg">🛡️</div>
                      <div>
                        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#22D3EE]">सुरक्षा सुझाव</div>
                        <p className="text-[14.5px] leading-relaxed text-[#AEB6CC]">
                          किसी के साथ भी OTP, PIN, पासवर्ड या बैंकिंग जानकारी साझा न करें — चाहे वह
                          बैंक, सरकारी विभाग या पुलिस अधिकारी बनकर बात क्यों न कर रहा हो।
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto my-9 flex max-w-[820px] gap-4 rounded-xl border border-[#FF5470]/25 bg-[#FF5470]/[0.06] p-6">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FF5470]/15 text-lg">⚠️</div>
                      <div>
                        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-[#FF5470]">गंभीर चेतावनी</div>
                        <p className="text-[14.5px] leading-relaxed text-[#DDE1EC]">
                          संदेह होने पर तुरंत साइबर क्राइम हेल्पलाइन <strong className="text-white">1930</strong> पर संपर्क करें या{' '}
                          <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-[#22D3EE] underline">
                            cybercrime.gov.in
                          </a>{' '}
                          पर रिपोर्ट दर्ज करें।
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </>
            )}

            {/* Related */}
            {!!related.length && (
              <div className="mb-16">
                <EyebrowRule index={3} label="संबंधित लेख" />
                <div className="grid gap-6 sm:grid-cols-3">
                  {related.map((item) => (
                    <article
                      key={item.newsId}
                      onClick={() => handleSelect(item.newsSlug)}
                      className="group cursor-pointer rounded-lg border border-[#232B47] bg-[#12172A]/60 p-3 transition hover:border-[#7C5CFF]/40"
                    >
                      <div className="mb-3 h-[130px] overflow-hidden rounded-md border border-[#232B47] bg-[#0D1220]">
                        {getImageUrl(item.thumbnail) && (
                          <img
                            src={getImageUrl(item.thumbnail)}
                            alt={stripHtml(item.newsHeading)}
                            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                      </div>
                      <h3 className="mb-1.5 text-[14.5px] font-bold leading-snug text-white group-hover:text-[#22D3EE]">
                        {item.newsHeading}
                      </h3>
                      <p className="text-[12.5px] leading-relaxed text-[#6F7793]">{getExcerpt(item.newsDetails, 85)}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="relative overflow-hidden rounded-2xl border border-[#232B47] bg-[#12172A] px-8 py-16 text-center sm:px-16">
              <Glow className="left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 bg-[#7C5CFF]/15" />
              <span
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22D3EE]"
              >
                साप्ताहिक अलर्ट
              </span>
              <h2 className="relative mb-4 mt-3 text-[28px] font-extrabold text-white sm:text-[36px]">
                साइबर सुरक्षा अपडेट सीधे अपने इनबॉक्स में पाएं
              </h2>
              <p className="relative mx-auto mb-9 max-w-[540px] text-[15px] leading-relaxed text-[#AEB6CC]">
                सत्यापित साइबर अलर्ट, जागरूकता गाइड और स्कैम से बचाव की जानकारी — कोई स्पैम नहीं।
              </p>
              <form
                className="relative mx-auto flex max-w-[440px] flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="आपका ईमेल पता"
                  className="flex-1 rounded-lg border border-[#232B47] bg-[#0D1220] px-4 py-3 text-[14px] text-white placeholder-[#6F7793] outline-none transition focus:border-[#7C5CFF]"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#6D4CFF] px-7 py-3 text-[14px] font-bold text-white shadow-[0_0_24px_rgba(124,92,255,0.35)] transition hover:shadow-[0_0_36px_rgba(124,92,255,0.55)]"
                >
                  सब्सक्राइब करें
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-10 lg:sticky lg:top-24">
            {/* Most read */}
            <div className="rounded-xl border border-[#232B47] bg-[#12172A]/60 p-5">
              <h3
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white"
              >
                इस सप्ताह सर्वाधिक पढ़े गए
              </h3>
              <div>
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-3 border-b border-[#232B47] py-3 last:border-none">
                      <SkeletonBlock className="h-6 w-6" />
                      <div className="flex-1 space-y-2">
                        <SkeletonBlock className="h-3 w-full" />
                        <SkeletonBlock className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                {!loading &&
                  mostRead.map((item, i) => (
                    <div
                      key={item.newsId}
                      onClick={() => handleSelect(item.newsSlug)}
                      className="group flex cursor-pointer items-start gap-3 border-b border-[#232B47] py-3 last:border-none"
                    >
                      <span
                        style={{ fontFamily: 'var(--font-grotesk)' }}
                        className="min-w-[20px] text-[15px] font-bold text-[#3A4368] group-hover:text-[#22D3EE]"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="mb-1 text-[13.5px] font-semibold leading-snug text-[#F1F3F9] group-hover:text-[#22D3EE]">
                          {item.newsHeading}
                        </div>
                        <div className="text-[11.5px] text-[#6F7793]">
                          {item.newsTag} · {item.viewCount?.toLocaleString('en-IN')} बार पढ़ा गया
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white"
              >
                श्रेणियाँ
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-md border border-[#232B47] bg-[#12172A]/60 px-3 py-1.5 text-[12.5px] text-[#AEB6CC]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <h3
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white"
              >
                ट्रेंडिंग टॉपिक्स
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag === activeFilter ? null : tag)}
                    className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition ${
                      activeFilter === tag
                        ? 'bg-[#22D3EE]/20 text-[#22D3EE]'
                        : 'bg-[#7C5CFF]/10 text-[#B4A6FF] hover:bg-[#7C5CFF]/20'
                    }`}
                  >
                    {toHashtag(tag)}
                  </button>
                ))}
              </div>
            </div>

            {/* Foundation blurb */}
            <div className="rounded-xl border border-[#232B47] bg-gradient-to-br from-[#12172A] to-[#0D1220] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0E1A">
                  <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
                </svg>
              </div>
              <div className="mb-1 text-[14px] font-bold text-white">सदैव युवा फाउंडेशन</div>
              <div
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="mb-3 text-[10px] uppercase tracking-wide text-[#6F7793]"
              >
                Cyber Research &amp; Awareness Team
              </div>
              <p className="text-[13px] leading-relaxed text-[#AEB6CC]">
                डिजिटल साक्षरता, साइबर जागरूकता, ऑनलाइन सुरक्षा और जिम्मेदार तकनीकी उपयोग को
                बढ़ावा देने हेतु समर्पित।
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Footer ── */}
      {/* <footer className="relative z-10 border-t border-[#232B47] bg-[#060811] px-6 pb-8 pt-14 lg:px-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-[17px] font-bold text-white">सदैव युवा फाउंडेशन</div>
              <div
                style={{ fontFamily: 'var(--font-grotesk)' }}
                className="mt-1 text-[10px] uppercase tracking-wider text-[#6F7793]"
              >
                Cyber Awareness Centre
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-[#8890A8]">
                जागरूकता, शिक्षा और सामुदायिक पहल के माध्यम से एक सुरक्षित डिजिटल भारत का निर्माण।
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">संसाधन</h4>
              {['साइबर अलर्ट', 'स्कैम से बचाव', 'शोध रिपोर्ट', 'जागरूकता गाइड'].map((l) => (
                <a key={l} href="#" className="mb-2 block text-[13px] text-[#8890A8] transition hover:text-[#22D3EE]">
                  {l}
                </a>
              ))}
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">श्रेणियाँ</h4>
              {categories.slice(0, 4).map((c) => (
                <a key={c} href="#lekh-suchi" className="mb-2 block text-[13px] text-[#8890A8] transition hover:text-[#22D3EE]">
                  {c}
                </a>
              ))}
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold text-white">स्कैम रिपोर्ट करें</h4>
              <a href="tel:1930" className="mb-2 block text-[13px] text-[#8890A8] transition hover:text-[#22D3EE]">
                साइबर क्राइम हेल्पलाइन: 1930
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="mb-2 block text-[13px] text-[#8890A8] transition hover:text-[#22D3EE]"
              >
                cybercrime.gov.in
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#181F38] pt-6 text-[12px] text-[#4C5473]">
            <span>© {new Date().getFullYear()} सदैव युवा फाउंडेशन। सर्वाधिकार सुरक्षित।</span>
            <span style={{ fontFamily: 'var(--font-grotesk)' }}>Data · sadaivsatya.com</span>
          </div>
        </div>
      </footer> */}
    </main>
  );
}
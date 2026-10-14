"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { articleHref } from "@/utils/Utils";
import type { NewsItem } from "@/lib/Types/types";
import {
  AlertTriangle,
  ArrowRight,
  RotateCw,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  Noto_Sans_Devanagari,
  Nunito_Sans,
  IBM_Plex_Mono,
} from "next/font/google";

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const API_BASE_URL = "https://mapi.sadaivsatya.com";
const SCAM_ALERTS_URL = `${API_BASE_URL}/api/AdminApi/getnews-bycategoryandsubcat/${encodeURIComponent(
  "Cyber Duniya",
)}/${encodeURIComponent("Scam Alerts")}?page=1&pageSize=6`;
const NEWS_LIMIT = 3;

// ---------- Card Color Themes ----------

const CARD_THEMES = [
  {
    border: "border-red-500/40 hover:border-red-500/80",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
    glow: "shadow-[0_18px_45px_-15px_rgba(225,29,72,0.35)]",
    accentText: "text-red-400",
    iconBg: "bg-gradient-to-br from-red-600 to-rose-950",
  },
  {
    border: "border-amber-500/40 hover:border-amber-500/80",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    glow: "shadow-[0_18px_45px_-15px_rgba(245,158,11,0.35)]",
    accentText: "text-amber-400",
    iconBg: "bg-gradient-to-br from-amber-600 to-amber-950",
  },
  {
    border: "border-indigo-500/40 hover:border-indigo-500/80",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    glow: "shadow-[0_18px_45px_-15px_rgba(99,102,241,0.35)]",
    accentText: "text-indigo-400",
    iconBg: "bg-gradient-to-br from-indigo-600 to-indigo-950",
  },
];

function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  const withoutTags = html.replace(/<[^>]*>/g, " ");
  const withoutEntities = withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return withoutEntities.replace(/\s+/g, " ").trim();
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function normalizeNewsResponse(json: unknown): NewsItem[] {
  if (Array.isArray(json)) return json as NewsItem[];
  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as NewsItem[];
    if (Array.isArray(obj.result)) return obj.result as NewsItem[];
  }
  return [];
}

async function fetchScamAlerts(): Promise<NewsItem[]> {
  const res = await fetch(SCAM_ALERTS_URL);
  if (!res.ok) throw new Error(`Failed to fetch Scam Alerts news: ${res.status}`);
  return normalizeNewsResponse(await res.json());
}

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const items = await fetchScamAlerts();
      const sorted = [...items].sort(
        (a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
      );
      setNews(sorted.slice(0, NEWS_LIMIT));
    } catch (e) {
      console.error("Error loading Scam Alerts news:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  return (
    <section
      id="cta"
      ref={ref}
      className={`${notoSansDevanagari.className} relative w-full bg-[#0B0906] px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden`}
    >
      {/* ---------- Ambient Background Lighting ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-radial from-red-600/10 via-rose-950/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-radial from-amber-600/10 via-amber-950/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#EF4444 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] text-center">
        {/* ---------- Header Badge & Headline ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-red-500/40 bg-[#1A0E0B]/90 px-4 py-1.5 shadow-[0_0_25px_rgba(239,68,68,0.2)] backdrop-blur-md mb-5"
        >
          <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
          <span
            className={`${nunitoSans.className} uppercase text-[11px] font-extrabold tracking-[0.18em] text-red-400`}
          >
            SCAM ALERT INTELLIGENCE NETWORK
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[32px] sm:text-[48px] lg:text-[54px] font-black text-[#F5EFDD] tracking-tight leading-[1.12] mb-4"
        >
          सतर्क रहें। सुरक्षित रहें। <br />
          <span className="bg-gradient-to-r from-red-400 via-amber-300 to-red-500 bg-clip-text text-transparent">
            नवीनतम साइबर फ्रॉड से बचाव
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[14.5px] sm:text-[16px] text-[#C9BFA8] font-medium leading-relaxed max-w-xl mx-auto mb-12 sm:mb-16"
        >
          ऑनलाइन ठगी और डिजिटल घोटालों के नए तरीकों की जानकारी ही आपकी सबसे मजबूत सुरक्षा है।
        </motion.p>

        {/* ---------- Scam Alert Cards Grid ---------- */}

        {loading && <ScamAlertGridSkeleton />}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-2xl bg-[#14100C] border border-red-500/30 text-center mb-16">
            <p className={`${plexMono.className} text-[13px] text-[#C9BFA8]`}>
              अलर्ट लोड नहीं हो सके — कृपया पुनः प्रयास करें।
            </p>
            <button
              onClick={loadNews}
              className="inline-flex items-center gap-2 rounded-full bg-red-500/15 border border-red-500/40 px-5 py-2 text-[12.5px] font-bold text-red-400 transition-all hover:bg-red-500/30"
            >
              <RotateCw className="w-3.5 h-3.5" /> पुनः प्रयास करें
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-2xl bg-[#14100C] border border-dashed border-red-500/30 text-center mb-16">
            <p className="text-[13.5px] text-[#B7AC93] font-medium">
              फिलहाल कोई अलर्ट उपलब्ध नहीं है — जल्द अपडेट होगी।
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-10 sm:mb-16 text-left"
          >
            {news.map((item, i) => (
              <ScamAlertCard
                key={item.newsId}
                item={item}
                theme={CARD_THEMES[i % CARD_THEMES.length]}
                index={i}
                isInView={isInView}
              />
            ))}
          </motion.div>
        )}

        {/* ---------- Footer Security Strip ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="rounded-2xl border border-white/10 bg-[#16120E]/80 px-6 py-5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A94D] to-[#8F7230] text-[#140F0A] ring-1 ring-[#D4A94D]/50 shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[13.5px] font-extrabold text-[#F5EFDD] leading-tight">
                Cyber Safety Intelligence Center
              </p>
              <p className="text-[11.5px] text-[#A79C86] font-medium mt-0.5">
                सदैव युवा फाउंडेशन एवं सदैव सत्य न्यूज़ की संयुक्त साइबर जन-हितैषी पहल
              </p>
            </div>
          </div>

          <Link
            href="https://sadaivsatya.com/cyber-duniya/scam-alerts"
            target="_blank"
            className={`${nunitoSans.className} inline-flex items-center gap-2 text-[12px] font-extrabold text-[#E8C468] hover:text-[#F5EFDD] transition-colors shrink-0`}
          >
            <span>सभी फ्रॉड अलर्ट्स देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- Scam Alert Card Component ----------

function ScamAlertCard({
  item,
  theme,
  index,
  isInView,
}: {
  item: NewsItem;
  theme: (typeof CARD_THEMES)[number];
  index: number;
  isInView: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasThumbnail = Boolean(item.thumbnail && item.thumbnail.trim().length > 0);
  const imgSrc = hasThumbnail
    ? item.thumbnail.startsWith("http")
      ? item.thumbnail
      : `${API_BASE_URL}${item.thumbnail}`
    : "";
  const showImage = hasThumbnail && !imgFailed;
  const description = stripHtml(item.newsDetails).slice(0, 110);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
      className="h-full"
    >
      <Link href={articleHref(item)} className="group block h-full">
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C1712] to-[#130F0C] border sm:border-2 ${theme.border} ${theme.glow} transition-all duration-300 group-hover:-translate-y-1.5`}
        >
          {/* Thumbnail Mount */}
          <div className="relative px-2.5 pt-2.5 pb-1.5 sm:px-3.5 sm:pt-3.5 sm:pb-2">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#0C0A07] ring-1 ring-white/10">
              {showImage ? (
                <Image
                  src={imgSrc}
                  alt={item.newsHeading}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-950/40 to-black">
                  <AlertTriangle className="w-7 h-7 sm:w-10 sm:h-10 text-red-500/80" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Alert Badge over Image */}
              <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 flex items-center gap-1 sm:gap-1.5 rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-red-600/90 text-white text-[7px] sm:text-[9.5px] font-extrabold uppercase tracking-wide shadow-md backdrop-blur-md">
                <AlertTriangle className="w-2 h-2 sm:w-3 sm:h-3" />
                <span>SCAM ALERT</span>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="relative flex flex-1 flex-col px-2.5 pb-2.5 pt-2 sm:px-4 sm:pb-4 sm:pt-2.5 min-w-0">
            <h3
              className={`${notoSansDevanagari.className} text-[12px] sm:text-[15.5px] font-bold text-[#F0E6D2] leading-[1.4] sm:leading-[1.48] line-clamp-2 min-h-[34px] sm:min-h-[44px] group-hover:text-white transition-colors`}
            >
              {item.newsHeading}
            </h3>

            {description && (
              <p
                className={`${notoSansDevanagari.className} text-[10.5px] sm:text-[12.5px] text-[#A79C86] mt-1.5 sm:mt-2 leading-snug sm:leading-relaxed line-clamp-2 min-h-[27px] sm:min-h-[36px]`}
              >
                {description}
              </p>
            )}

            <div className="flex-1" />

            {/* Footer Meta */}
            <div className="flex items-center justify-between mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-white/[0.07]">
              <span
                className={`${plexMono.className} text-[7.5px] sm:text-[9px] text-[#786F5C] tracking-wide whitespace-nowrap`}
              >
                {formatDate(item.updatedDate)}
              </span>

              <span
                className={`flex items-center gap-1 text-[9.5px] sm:text-[11.5px] font-bold whitespace-nowrap ${theme.accentText} group-hover:translate-x-0.5 transition-transform`}
              >
                अलर्ट पढ़ें
                <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------- Skeleton Component ----------

function ScamAlertGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-10 sm:mb-16">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-[#17130F] border sm:border-2 border-red-500/30 overflow-hidden animate-pulse"
        >
          <div className="p-2.5 sm:p-3.5">
            <div className="w-full aspect-[16/10] rounded-xl bg-[#221C16]" />
          </div>
          <div className="px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-2 space-y-2 sm:space-y-3">
            <div className="h-3 sm:h-4 bg-[#221C16] rounded w-5/6" />
            <div className="h-2.5 sm:h-3 bg-[#221C16] rounded w-3/4" />
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/5">
              <div className="h-2.5 sm:h-3 bg-[#221C16] rounded w-14 sm:w-16" />
              <div className="h-2.5 sm:h-3 bg-[#221C16] rounded w-10 sm:w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
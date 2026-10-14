"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { articleHref } from "@/utils/Utils";
import type { NewsItem } from "@/lib/Types/types";
import {
  Handshake,
  Newspaper,
  ArrowRight,
  RotateCw,
  ShieldAlert,
  Landmark,
  Gavel,
  Bitcoin,
  GraduationCap,
  AlertTriangle,
  TrendingUp,
  Zap,
  Radio,
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
const NEWS_CATEGORY = "Cyber Duniya";
const SUBCATS_URL = `${API_BASE_URL}/api/AdminApi/subcatsbycategory/${encodeURIComponent(
  "cyber duniya",
)}`;
const NEWS_LIMIT = 4;
const PER_SUBCAT_PULL = 12;

// Subcategories that should never be fetched or shown here.
const EXCLUDED_SUBCATEGORIES = new Set(["cyber article"]);
function isExcludedSubCategory(subCatName: string | null | undefined) {
  if (!subCatName) return false;
  return EXCLUDED_SUBCATEGORIES.has(subCatName.trim().toLowerCase());
}

// ---------- Dynamic Category Accent Styles ----------

const NEWS_ACCENTS = [
  {
    bg: "from-[#4F46E5]/20 to-[#3730A3]/5",
    text: "text-[#818CF8]",
    badgeBg: "bg-[#4F46E5]/25 text-[#C7D2FE] border-[#818CF8]/40",
    glow: "shadow-[0_12px_30px_-10px_rgba(212,169,77,0.35)]",
  },
  {
    bg: "from-[#D4A94D]/20 to-[#8F7230]/5",
    text: "text-[#E8C468]",
    badgeBg: "bg-[#D4A94D]/25 text-[#F5EFDD] border-[#D4A94D]/40",
    glow: "shadow-[0_12px_30px_-10px_rgba(212,169,77,0.35)]",
  },
  {
    bg: "from-[#10B981]/20 to-[#047857]/5",
    text: "text-[#34D399]",
    badgeBg: "bg-[#10B981]/25 text-[#A7F3D0] border-[#10B981]/40",
    glow: "shadow-[0_12px_30px_-10px_rgba(212,169,77,0.35)]",
  },
  {
    bg: "from-[#E11D48]/20 to-[#9F1239]/5",
    text: "text-[#FB7185]",
    badgeBg: "bg-[#E11D48]/25 text-[#FECDD3] border-[#E11D48]/40",
    glow: "shadow-[0_12px_30px_-10px_rgba(212,169,77,0.35)]",
  },
];

type NewsAccent = (typeof NEWS_ACCENTS)[number];

type SubCategoryApi = {
  nameinHindi: string;
  subCat_Name: string;
  cat_Name: string;
};

function iconForSubCategory(subCatName: string | null | undefined) {
  if (!subCatName) return ShieldAlert;
  const s = subCatName.toLowerCase();
  if (s.includes("crime")) return ShieldAlert;
  if (s.includes("fraud")) return Landmark;
  if (s.includes("arrest")) return Gavel;
  if (s.includes("crypto") || s.includes("gaming")) return Bitcoin;
  if (s.includes("workshop")) return GraduationCap;
  if (s.includes("article")) return Newspaper;
  if (s.includes("scam")) return AlertTriangle;
  if (s.includes("trading")) return TrendingUp;
  return ShieldAlert;
}

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

async function fetchSubCategories(): Promise<SubCategoryApi[]> {
  const res = await fetch(SUBCATS_URL);
  if (!res.ok) throw new Error(`Failed to fetch subcategories: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? (json as SubCategoryApi[]) : [];
}

async function fetchSubCategoryNews(subCategory: string): Promise<NewsItem[]> {
  const url = `${API_BASE_URL}/api/AdminApi/getnews-bycategoryandsubcat/${encodeURIComponent(
    NEWS_CATEGORY,
  )}/${encodeURIComponent(subCategory)}?page=1&pageSize=${PER_SUBCAT_PULL}`;
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Failed to fetch "${subCategory}" news: ${res.status}`);
  return normalizeNewsResponse(await res.json());
}

export default function SadaivSatyaCollab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [subCats, setSubCats] = useState<SubCategoryApi[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const allSubcats = subCats.length ? subCats : await fetchSubCategories();
      const subcats = allSubcats.filter((sc) => !isExcludedSubCategory(sc.subCat_Name));
      if (!subCats.length) setSubCats(subcats);

      const results = await Promise.allSettled(
        subcats.map((sc) => fetchSubCategoryNews(sc.subCat_Name)),
      );

      const merged = results
        .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
        .flatMap((r) => r.value);

      const seen = new Set<number>();
      const deduped = merged.filter((item) => {
        if (seen.has(item.newsId)) return false;
        seen.add(item.newsId);
        return true;
      });

      deduped.sort(
        (a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
      );

      setNews(deduped.slice(0, NEWS_LIMIT));
    } catch (e) {
      console.error("Error loading Cyber Duniya news:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [subCats]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const accentForSubCat = useCallback(
    (subCatName: string): NewsAccent => {
      const idx = subCats.findIndex((sc) => sc.subCat_Name === subCatName);
      if (idx < 0) return NEWS_ACCENTS[0];
      return NEWS_ACCENTS[idx % NEWS_ACCENTS.length];
    },
    [subCats],
  );

  return (
    <section
      id="collaboration"
      ref={ref}
      className={`${notoSansDevanagari.className} relative w-full bg-[#0B0906] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden`}
    >
      {/* ---------- Ambient Glowing Background Elements ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 w-[550px] h-[550px] rounded-full bg-radial from-indigo-500/10 via-indigo-900/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-36 -left-20 w-[500px] h-[500px] rounded-full bg-radial from-[#D4A94D]/10 via-amber-900/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#D4A94D 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* ---------- Header Badge & Title ---------- */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.42 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#D4A94D]/35 bg-[#17130F]/90 px-4 py-1.5 shadow-[0_0_20px_rgba(212,169,77,0.15)] backdrop-blur-md"
          >
            <Radio className="w-3.5 h-3.5 text-[#E8C468] animate-pulse" />
            <span
              className={`${nunitoSans.className} uppercase text-[11px] font-extrabold tracking-[0.18em] text-[#E8C468]`}
            >
              Media Intelligence Partnership
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-[28px] sm:text-[42px] font-black text-[#F5EFDD] tracking-tight leading-[1.18]"
          >
            साइबर सुरक्षा एवं <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F5EFDD] via-[#E8C468] to-[#997632] bg-clip-text text-transparent">
              डिजिटल जागरूकता पहल
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[14px] sm:text-[15px] text-[#C9BFA8] font-medium leading-relaxed max-w-xl mx-auto"
          >
            नागरिकों को साइबर अपराधों से सुरक्षित रखने के लिए विश्वसनीय मीडिया पार्टनर के साथ प्रमाणित सूचना प्रसार
          </motion.p>
        </div>

        {/* ---------- Interactive Alliance Glass Hub ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative mb-12 sm:mb-16 rounded-2xl border border-[#D4A94D]/25 bg-gradient-to-b from-[#181410]/95 via-[#130F0C]/95 to-[#0E0B08]/95 p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Left Node: Knowledge Partner */}
            <div className="flex items-center gap-4 w-full md:w-auto p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-950 shadow-[0_0_20px_rgba(99,102,241,0.35)] ring-1 ring-indigo-400/40 group-hover:scale-105 transition-transform">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[15px] sm:text-[16px] font-extrabold text-[#F5EFDD] truncate">
                  सदैव युवा फाउंडेशन
                </h4>
                <span
                  className={`${nunitoSans.className} inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-indigo-400 mt-0.5`}
                >
                  Knowledge Partner • ज्ञान साझेदार
                </span>
              </div>
            </div>

            {/* Connecting Alliance Core Node */}
            <div className="flex items-center gap-3 shrink-0 py-1">
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-transparent via-[#D4A94D]/60 to-transparent" />
              <div className="flex items-center gap-2 rounded-full border border-[#D4A94D]/40 bg-[#120E0A] px-4 py-2 shadow-[0_0_20px_rgba(212,169,77,0.25)] ring-1 ring-[#D4A94D]/20">
                <Zap className="w-3.5 h-3.5 text-[#E8C468] animate-bounce" />
                <span
                  className={`${nunitoSans.className} text-[11px] font-extrabold uppercase tracking-widest text-[#E8C468]`}
                >
                  LIVE MEDIA COLLAB
                </span>
              </div>
              <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-transparent via-[#D4A94D]/60 to-transparent" />
            </div>

            {/* Right Node: Media Partner */}
            <div className="flex items-center gap-4 w-full md:w-auto p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#D4A94D]/30 transition-all duration-300 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A94D] to-[#8F7230] shadow-[0_0_20px_rgba(212,169,77,0.35)] ring-1 ring-[#D4A94D]/50 group-hover:scale-105 transition-transform">
                <Newspaper className="w-6 h-6 text-[#1A1208]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[15px] sm:text-[16px] font-extrabold text-[#F5EFDD] truncate">
                  सदैव सत्य न्यूज़
                </h4>
                <span
                  className={`${nunitoSans.className} inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#E8C468] mt-0.5`}
                >
                  Media Partner • मीडिया साझेदार
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Cyber News Cards Showcase ---------- */}

        {loading && <CyberNewsGridSkeleton />}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-2xl bg-[#14100C] border-2 border-[#D4A94D]/60 text-center">
            <p className={`${plexMono.className} text-[13px] text-[#C9BFA8]`}>
              खबरें लोड नहीं हो सकीं — कृपया पुनः प्रयास करें।
            </p>
            <button
              onClick={loadNews}
              className="inline-flex items-center gap-2 rounded-full bg-[#D4A94D]/15 border border-[#D4A94D]/40 px-5 py-2 text-[12.5px] font-bold text-[#E8C468] transition-all hover:bg-[#D4A94D]/30"
            >
              <RotateCw className="w-3.5 h-3.5" /> पुनः प्रयास करें
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-2xl bg-[#14100C] border-2 border-dashed border-[#D4A94D]/60 text-center">
            <p className="text-[13.5px] text-[#B7AC93] font-medium">
              फिलहाल कोई खबर उपलब्ध नहीं है — जल्द अपडेट होगी।
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
            {news.map((item, i) => (
              <CyberNewsCard
                key={item.newsId}
                item={item}
                accent={accentForSubCat(item.newsSubCategory)}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        )}

        {/* ---------- Bottom Call to Action ---------- */}
        <div className="text-center pt-2">
          <Link
            href="https://sadaivsatya.com/cyber-duniya"
            target="_blank"
            className={`${nunitoSans.className} group inline-flex items-center gap-3 rounded-full border border-[#D4A94D] bg-gradient-to-r from-[#D4A94D]/25 via-[#D4A94D]/15 to-[#D4A94D]/25 px-8 py-3.5 text-[13.5px] font-extrabold tracking-wide text-[#F5EFDD] shadow-[0_0_30px_-5px_rgba(212,169,77,0.4)] ring-1 ring-[#D4A94D]/50 transition-all duration-300 hover:scale-[1.03] hover:bg-[#D4A94D]/35 hover:shadow-[0_0_40px_-5px_rgba(212,169,77,0.7)] active:scale-[0.98]`}
          >
            <span>सभी साइबर सुरक्षा फाइलें देखें</span>
            <ArrowRight
              className="w-4 h-4 text-[#E8C468] transition-transform duration-300 group-hover:translate-x-1.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- Cyber News Card Component ----------

function CyberNewsCard({
  item,
  accent,
  index,
  isInView,
}: {
  item: NewsItem;
  accent: NewsAccent;
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
  const FallbackIcon = iconForSubCategory(item.newsSubCategory);
  const description = stripHtml(item.newsDetails).slice(0, 130);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
      className="h-full"
    >
      <Link href={articleHref(item)} className="group block h-full">
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C1712] to-[#14100D] border sm:border-2 border-[#D4A94D]/60 sm:-translate-y-1 transition-all duration-300 hover:scale-[1.01] ${accent.glow}`}
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
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${accent.bg}`}
                >
                  <FallbackIcon className={`w-7 h-7 sm:w-9 sm:h-9 ${accent.text}`} />
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content Body */}
          <div className="relative flex flex-1 flex-col px-2.5 pb-2.5 pt-2 sm:px-4 sm:pb-4 sm:pt-2.5 min-w-0">
            <h3
              className={`${notoSansDevanagari.className} text-[12px] sm:text-[15px] font-bold text-[#F0E6D2] leading-[1.4] sm:leading-[1.48] line-clamp-2 min-h-[34px] sm:min-h-[44px] group-hover:text-white transition-colors`}
            >
              {item.newsHeading}
            </h3>

            {description && (
              <p
                className={`${notoSansDevanagari.className} text-[10.5px] sm:text-[12px] text-[#A79C86] mt-1.5 sm:mt-2 leading-snug sm:leading-relaxed line-clamp-2 min-h-[27px] sm:min-h-[36px]`}
              >
                {description}
              </p>
            )}

            <div className="flex-1" />

            {/* Footer Meta */}
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-white/[0.07]">
              {/* Category Name Badge (Moved to bottom row) */}
              <span
                className={`max-w-[80px] sm:max-w-[140px] truncate rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-1 ${accent.badgeBg} border text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-wide shrink-0`}
              >
                {item.subCatNameInHindi || item.newsSubCategory}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                {/* <span
                  className={`${plexMono.className} text-[9px] text-[#786F5C] tracking-wide whitespace-nowrap`}
                >
                  {formatDate(item.updatedDate)}
                </span> */}

                <span
                  className={`flex items-center gap-1 text-[10px] sm:text-[11.5px] font-bold whitespace-nowrap ${accent.text} group-hover:translate-x-0.5 transition-transform`}
                >
                  पढ़ें
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={2.2} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------- Skeleton Component ----------

function CyberNewsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-[#17130F] border sm:border-2 border-[#D4A94D]/60 overflow-hidden animate-pulse"
        >
          <div className="p-2.5 sm:p-3.5">
            <div className="w-full aspect-[16/10] rounded-xl bg-[#221C16]" />
          </div>
          <div className="px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-2 space-y-2 sm:space-y-3">
            <div className="h-3 sm:h-4 bg-[#221C16] rounded w-5/6" />
            <div className="h-2.5 sm:h-3 bg-[#221C16] rounded w-3/4" />
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/5">
              <div className="h-2.5 sm:h-3 bg-[#221C16] rounded w-12 sm:w-16" />
              <div className="h-2.5 sm:h-3 bg-[#221C16] rounded w-8 sm:w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
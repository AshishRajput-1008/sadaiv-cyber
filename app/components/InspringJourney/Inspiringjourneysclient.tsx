"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Noto_Sans_Devanagari } from "next/font/google";
import {
    JOURNEY_CATEGORY,
    JOURNEY_PAGE_SIZE,
    JOURNEY_ALL_TAB_KEY,
    type JourneyTabConfig,
    type NewsItem,
    type TabDataMap,
} from "@/lib/Types/types";
import { articleHref, formatDate, imageSrc, isVideoContent, stripHtml } from "@/utils/Utils";
import { getCategoryArticles, getSubCategoryArticles } from "@/lib/news-api";

// All card copy (headings, descriptions, meta, buttons) renders in this
// face — applied once at the section root and inherited by every child,
// so no card can accidentally end up in the browser's default font.
const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari", "latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const IconAll = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
);

const IconCalendar = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[18px] h-[18px]">
        <rect x="3.5" y="5" width="19" height="17" rx="2" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
);


const IconEye = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-[20px] h-[20px]">
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="2.6" />
    </svg>
);

const IconArrow = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
);

const IconDefaultTab = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <path d="M6 3.5h12a1 1 0 011 1V21l-7-4-7 4V4.5a1 1 0 011-1z" />
    </svg>
);

// Time-filter icons — kept visually distinct (a clock face family) so users
// don't confuse this row with the category tab row above it.
const IconClockToday = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
    </svg>
);

const IconClockWeek = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" />
    </svg>
);

const IconClockMonth = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="M8 13.5h8M8 17h5" />
    </svg>
);

const IconClockYear = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="M7 13.5l1.6 1.6L11 12.5M13.5 14h3" />
    </svg>
);

// Best-effort icon match by English subcategory name. Anything not listed
// here (new subcategories added on the backend) automatically falls back
// to IconDefaultTab — nothing breaks when the API adds/removes entries.
const TAB_ICON_MAP: Record<string, React.ReactNode> = {
    "success stories": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <path d="M8 21h8M12 17v4" />
            <path d="M6 4h12v3a6 6 0 01-12 0V4z" />
            <path d="M6 6H4a3 3 0 003 3M18 6h2a3 3 0 01-3 3" />
        </svg>
    ),
    "career motivation": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
            <path d="M3 12h18" />
        </svg>
    ),
    "youth motivation": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
            <circle cx="12" cy="12" r="3.2" />
        </svg>
    ),
    "community impact": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <circle cx="9" cy="8" r="3" />
            <path d="M2.5 19c1-3.3 3.4-5 6.5-5s5.5 1.7 6.5 5" />
            <circle cx="17.5" cy="9" r="2.3" />
            <path d="M15.5 14.2c2.4.4 4 1.9 4.8 4.8" />
        </svg>
    ),
    "women empowerment": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 12v8M9 17h6" />
        </svg>
    ),
    "inspirational quotes": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <path d="M7 8c-2 0-3.2 1.4-3.2 3.4 0 1.8 1.2 3 2.8 3 .3 2-1 3.4-2.6 4M15.5 8c-2 0-3.2 1.4-3.2 3.4 0 1.8 1.2 3 2.8 3 .3 2-1 3.4-2.6 4" />
        </svg>
    ),
    "self improvement": (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 6h6v6" />
        </svg>
    ),
};

function getTabIcon(labelEn: string) {
    return TAB_ICON_MAP[labelEn.trim().toLowerCase()] ?? IconDefaultTab;
}

const PlayBadge = () => (
    <span className="absolute top-2 right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0A2E22]/75 text-[#EFE6CE] backdrop-blur-sm border border-[#C9A15A]/40">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 translate-x-[1px]">
            <path d="M6 4l14 8-14 8V4z" />
        </svg>
    </span>
);

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

// The API returns description HTML with un-decoded entities (e.g. a literal
// "&#39;" instead of an apostrophe). stripHtml only strips tags, so those
// entities were leaking straight into the card as visible text. Decode
// first, then strip/truncate, so a cut mid-entity can't happen either.
function decodeHtmlEntities(input: string): string {
    if (!input) return "";
    return input
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec: string) => String.fromCharCode(parseInt(dec, 10)))
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'");
}

function cleanDescription(html: string | undefined | null, maxLen: number): string {
    if (!html) return "";
    return stripHtml(decodeHtmlEntities(html), maxLen);
}

// ---------------------------------------------------------------------------
// Time filter
// ---------------------------------------------------------------------------

type TimeFilterKey = "today" | "weekly" | "monthly" | "yearly";

const TIME_FILTERS: { key: TimeFilterKey; label: string; icon: React.ReactNode }[] = [
    { key: "today", label: "आज", icon: IconClockToday },
    { key: "weekly", label: "साप्ताहिक", icon: IconClockWeek },
    { key: "monthly", label: "मासिक", icon: IconClockMonth },
    // "yearly" is treated as the "show everything" bucket per product spec —
    // it intentionally applies no date restriction.
    { key: "yearly", label: "वार्षिक", icon: IconClockYear },
];

const DEFAULT_TIME_FILTER: TimeFilterKey = "yearly";

/** Returns true when `dateStr` falls inside the selected time bucket. */
function isWithinTimeRange(dateStr: string, filter: TimeFilterKey): boolean {
    if (filter === "yearly") return true; // yearly = all news, no restriction

    const itemDate = new Date(dateStr);
    if (Number.isNaN(itemDate.getTime())) return false;

    const now = new Date();

    if (filter === "today") {
        return (
            itemDate.getFullYear() === now.getFullYear() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getDate() === now.getDate()
        );
    }

    const daysBack = filter === "weekly" ? 7 : 30; // monthly
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - daysBack);
    cutoff.setHours(0, 0, 0, 0);

    return itemDate >= cutoff && itemDate <= now;
}

function filterItemsByTime(items: NewsItem[], filter: TimeFilterKey) {
    if (filter === "yearly") return items;
    return items.filter((item) => isWithinTimeRange(item.updatedDate, filter));
}

// ---------------------------------------------------------------------------
// Layout / reveal helpers
// ---------------------------------------------------------------------------

// Initial reveal counts. Both line up to exactly two full row-groups
// (desktop: 2 × [1 spotlight + 8 squares] = 18, mobile: 2 × [1 spotlight +
// 4 squares] = 10) so the first "और देखें" click always lands on a clean
// group boundary instead of an awkward half-row.
const DESKTOP_INITIAL_VISIBLE = 18;
const MOBILE_INITIAL_VISIBLE = 10;

/** 8 square cards per group on >=640px (sm), 4 per group below that. */
function useSquaresPerGroup() {
    const [squares, setSquares] = useState(8);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        const update = () => setSquares(mq.matches ? 4 : 8);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return squares;
}

type Group = { spotlight: NewsItem; squares: NewsItem[] };

/** Splits a flat, date-sorted list into [1 horizontal + N square] groups. */
function chunkIntoGroups(items: NewsItem[], squaresPerGroup: number): Group[] {
    const groups: Group[] = [];
    let i = 0;
    while (i < items.length) {
        const spotlight = items[i];
        i += 1;
        const squareSlice = items.slice(i, i + squaresPerGroup);
        i += squareSlice.length;
        groups.push({ spotlight, squares: squareSlice });
    }
    return groups;
}

function sortByLatest(items: NewsItem[]) {
    return [...items].sort(
        (a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
    );
}

function dedupeById(items: NewsItem[]) {
    return Array.from(new Map(items.map((i) => [i.newsId, i])).values());
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function InspiringJourneysClient({
    tabs,
    tabData,
}: {
    tabs: JourneyTabConfig[];
    tabData: TabDataMap;
}) {
    const [activeTab, setActiveTab] = useState<string>(JOURNEY_ALL_TAB_KEY);
    const [activeTimeFilter, setActiveTimeFilter] = useState<TimeFilterKey>(DEFAULT_TIME_FILTER);
    const [data, setData] = useState<TabDataMap>(tabData);
    const [pageMap, setPageMap] = useState<Record<string, number>>({});
    const [hasMoreMap, setHasMoreMap] = useState<Record<string, boolean>>({});
    const [visibleCountMap, setVisibleCountMap] = useState<Record<string, number>>({});
    const [loadingMore, setLoadingMore] = useState(false);

    const resultsRef = useRef<HTMLDivElement>(null);
    const squaresPerGroup = useSquaresPerGroup();
    const isDesktop = squaresPerGroup === 8;
    const initialVisible = isDesktop ? DESKTOP_INITIAL_VISIBLE : MOBILE_INITIAL_VISIBLE;

    // Sync from parent once initial data arrives, and figure out whether
    // each tab likely has more pages (returned a full page => probably more).
    useEffect(() => {
        setData(tabData);
        const nextHasMore: Record<string, boolean> = {};
        Object.entries(tabData).forEach(([key, items]) => {
            nextHasMore[key] = (items?.length || 0) >= JOURNEY_PAGE_SIZE;
        });
        setHasMoreMap(nextHasMore);
    }, [tabData]);

    const activeConfig = tabs.find((t) => t.key === activeTab);

    const items = useMemo(() => sortByLatest(data[activeTab] ?? []), [data, activeTab]);

    // How many of the already-loaded (raw, unfiltered) items are revealed
    // right now for this tab. Falls back to the breakpoint-appropriate
    // initial count the first time a tab is visited.
    const visibleCount = visibleCountMap[activeTab] ?? Math.min(initialVisible, items.length);

    const revealedItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
    const timeFilteredItems = useMemo(
        () => filterItemsByTime(revealedItems, activeTimeFilter),
        [revealedItems, activeTimeFilter],
    );
    const groups = useMemo(
        () => chunkIntoGroups(timeFilteredItems, squaresPerGroup),
        [timeFilteredItems, squaresPerGroup],
    );

    // "और देखें" stays visible if there's already-loaded content we haven't
    // revealed yet, OR the API might still have more pages to fetch.
    const canRevealMore = visibleCount < items.length;
    const apiHasMore = hasMoreMap[activeTab] ?? false;
    const showLoadMore = canRevealMore || apiHasMore;

    const jumpToResults = () => {
        const el = resultsRef.current;
        if (!el) return;
        const headerOffset = 96;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "auto" });
    };

    const handleTabClick = (key: string) => {
        setActiveTab(key);
        jumpToResults();
    };

    const handleTimeFilterClick = (key: TimeFilterKey) => {
        setActiveTimeFilter(key);
        jumpToResults();
    };

    const handleLoadMore = async () => {
        if (loadingMore || !showLoadMore) return;
        setLoadingMore(true);

        const step = isDesktop ? DESKTOP_INITIAL_VISIBLE : MOBILE_INITIAL_VISIBLE;
        const targetVisible = visibleCount + step;

        try {
            let rawItems = data[activeTab] ?? [];
            let page = pageMap[activeTab] ?? 1;
            let more = hasMoreMap[activeTab] ?? false;

            // Reveal from what's already loaded first; only hit the API when
            // the target exceeds the loaded pool and more pages might exist.
            while (rawItems.length < targetVisible && more) {
                const nextPage = page + 1;
                let fetched: NewsItem[] = [];

                if (activeTab === JOURNEY_ALL_TAB_KEY) {
                    fetched = (await getCategoryArticles(
                        JOURNEY_CATEGORY,
                        nextPage,
                        JOURNEY_PAGE_SIZE,
                    )) as NewsItem[];
                } else if (activeConfig) {
                    fetched = (await getSubCategoryArticles(
                        activeConfig.apiCategory,
                        activeConfig.apiSubCategory,
                        nextPage,
                        JOURNEY_PAGE_SIZE,
                    )) as NewsItem[];
                }

                page = nextPage;
                more = fetched.length >= JOURNEY_PAGE_SIZE;
                rawItems = dedupeById([...rawItems, ...fetched]);
                if (fetched.length === 0) break;
            }

            const sorted = sortByLatest(rawItems);
            setData((prev) => ({ ...prev, [activeTab]: sorted }));
            setPageMap((prev) => ({ ...prev, [activeTab]: page }));
            setHasMoreMap((prev) => ({ ...prev, [activeTab]: more }));
            setVisibleCountMap((prev) => ({
                ...prev,
                [activeTab]: Math.min(targetVisible, sorted.length),
            }));
        } catch (err) {
            console.error("Error loading more journeys:", err);
        } finally {
            setLoadingMore(false);
        }
    };

    const renderTabBar = () => (
        <div className="flex flex-wrap items-center justify-center gap-2 bg-gradient-to-b from-white to-[#FBF9F1] backdrop-blur-sm border border-[#C9A15A]/25 rounded-full p-2 shadow-[0_10px_30px_rgba(10,46,34,0.08)]">
            <button
                onClick={() => handleTabClick(JOURNEY_ALL_TAB_KEY)}
                aria-pressed={activeTab === JOURNEY_ALL_TAB_KEY}
                className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                    activeTab === JOURNEY_ALL_TAB_KEY
                        ? "bg-gradient-to-b from-[#0F4432] to-[#0A2E22] text-[#EFE6CE] shadow-[0_8px_20px_rgba(10,46,34,0.30)]"
                        : "text-[#3E463F] hover:text-[#0A2E22]"
                }`}
            >
                <span className={activeTab === JOURNEY_ALL_TAB_KEY ? "text-[#D8B872]" : "text-[#8A6531]"}>
                    {IconAll}
                </span>
                सभी
            </button>
            {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                    <button
                        key={tab.key}
                        onClick={() => handleTabClick(tab.key)}
                        aria-pressed={isActive}
                        className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                            isActive
                                ? "bg-gradient-to-b from-[#0F4432] to-[#0A2E22] text-[#EFE6CE] shadow-[0_8px_20px_rgba(10,46,34,0.30)]"
                                : "text-[#3E463F] hover:text-[#0A2E22]"
                        }`}
                    >
                        <span className={isActive ? "text-[#D8B872]" : "text-[#8A6531]"}>
                            {getTabIcon(tab.labelEn)}
                        </span>
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );

    // Secondary row — filters the currently revealed results by recency.
    // Deliberately shares the tab bar's dark-green/gold vocabulary (rather
    // than a separate gold-fill active state) so the two rows read as one
    // control family, not two unrelated widgets. Sized down and given a
    // small "अवधि" label so the hierarchy — category first, then time — is
    // legible at a glance. "वार्षिक" is the catch-all (no date restriction).
    const renderTimeFilterBar = () => (
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-[#0A2E22]/10 bg-white/70 backdrop-blur-sm px-2 py-1.5 shadow-[0_4px_16px_rgba(10,46,34,0.05)]">
            <span className="hidden sm:inline-flex items-center gap-1.5 pl-2 pr-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[#8A6531]">
                अवधि
                <span className="h-3.5 w-px bg-[#0A2E22]/12" />
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1">
                {TIME_FILTERS.map((tf) => {
                    const isActive = tf.key === activeTimeFilter;
                    return (
                        <button
                            key={tf.key}
                            onClick={() => handleTimeFilterClick(tf.key)}
                            aria-pressed={isActive}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 ${
                                isActive
                                    ? "bg-gradient-to-b from-[#0F4432] to-[#0A2E22] text-[#EFE6CE] shadow-[0_6px_16px_rgba(10,46,34,0.28)]"
                                    : "text-[#5B655F] hover:text-[#0A2E22] hover:bg-[#0A2E22]/[0.05]"
                            }`}
                        >
                            <span className={isActive ? "text-[#D8B872]" : "text-[#8A6531]"}>{tf.icon}</span>
                            {tf.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    // Sequential numbering across the whole list (01, 02, 03…) regardless
    // of whether a card is the horizontal spotlight or a square card.
    let runningIndex = 0;

    const activeTimeFilterLabel = TIME_FILTERS.find((tf) => tf.key === activeTimeFilter)?.label ?? "";

    return (
        <section
            className={`${notoSansDevanagari.className} relative overflow-hidden bg-gradient-to-b from-[#EFEFE6] via-[#F5F7F2] to-[#F5F7F2]`}
        >
            <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/40 to-transparent" />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(circle, #0A2E22 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage: "radial-gradient(ellipse 65% 45% at 50% 0%, black, transparent)",
                    opacity: 0.035,
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(201,161,90,0.10),transparent_65%)]" />

            <div className="relative px-4 sm:px-6 lg:px-8 py-14 sm:py-18 max-w-6xl mx-auto">
                <div className="relative text-center mb-10">
                    <p className="font-[family-name:var(--font-nunito)] text-[11px] sm:text-xs font-bold tracking-[0.32em] uppercase text-[#8A6531]">
                        Browse by Chapter
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#0A2E22]/25" />
                        <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#C9A15A]/50 bg-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A]" />
                        </span>
                        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#0A2E22]/25" />
                    </div>
                </div>

                <div className="relative flex flex-col items-center gap-3 mb-14">
                    {renderTabBar()}
                    {renderTimeFilterBar()}
                </div>

                <div ref={resultsRef} className="scroll-mt-24">
                    {timeFilteredItems.length === 0 ? (
                        <div className="relative flex flex-col items-center gap-3 text-center py-20 px-6 rounded-2xl border border-dashed border-[#C9A15A]/40 bg-white/60 backdrop-blur-sm shadow-[0_10px_30px_rgba(10,46,34,0.05)] max-w-md mx-auto">
                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0A2E22]/[0.06] text-[#8A6531]">
                                {IconAll}
                            </span>
                            <p className="text-sm text-[#6B756E]">
                                {items.length === 0
                                    ? "इस श्रेणी में फिलहाल कोई कहानी उपलब्ध नहीं है।"
                                    : `"${activeTimeFilterLabel}" में फिलहाल कोई कहानी उपलब्ध नहीं है।`}
                            </p>
                            {items.length > 0 && activeTimeFilter !== "yearly" && (
                                <button
                                    onClick={() => handleTimeFilterClick("yearly")}
                                    className="text-xs font-bold text-[#0A2E22] underline underline-offset-2 hover:text-[#8A6531]"
                                >
                                    सभी कहानियां देखें
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="relative space-y-7">
                            {groups.map((group) => {
                                const spotlightIndex = ++runningIndex;
                                return (
                                    <div key={group.spotlight.newsId} className="space-y-5">
                                        <SpotlightCard item={group.spotlight} index={spotlightIndex} />
                                        {group.squares.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                                                {group.squares.map((sq) => (
                                                    <JourneyCard key={sq.newsId} item={sq} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="flex justify-center pt-3">
                                {showLoadMore ? (
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/40 text-[#0A2E22] bg-white hover:bg-[#0A2E22] hover:text-[#EFE6CE] hover:border-[#0A2E22] px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(10,46,34,0.06)] hover:shadow-[0_10px_28px_rgba(10,46,34,0.20)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loadingMore ? (
                                            <>
                                                <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                                लोड हो रहा है...
                                            </>
                                        ) : (
                                            <>
                                                और खबरें देखें
                                                <span aria-hidden>↓</span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <p className="text-xs text-[#8B948E] tracking-wide">
                                        आपने सभी खबरें देख ली हैं
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom tab bar — mirrors the top controls for easy re-filtering further down the page */}
                <div className="relative flex flex-col items-center gap-3 mb-2 mt-10">
                    {renderTabBar()}
                    {renderTimeFilterBar()}
                </div>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function SpotlightCard({ item, index }: { item: NewsItem; index: number }) {
    const src = imageSrc(item);
    return (
        <Link
            href={articleHref(item)}
            className="group relative grid grid-cols-[140px_1fr] sm:grid-cols-[320px_1fr] gap-0 bg-white rounded-[22px] overflow-hidden border shadow-[0_12px_28px_rgba(10,46,34,0.10),0_36px_72px_-16px_rgba(10,46,34,0.22)] border-[#0A2E22]/45"
        >
            <span className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-[#0A2E22]/30" />

            <div className="relative h-full min-h-[150px] sm:min-h-[210px] bg-gray-100 overflow-hidden">
                {src && (
                    <Image
                        src={src}
                        alt={item.newsHeading}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 140px, 320px"
                        priority={index === 1}
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 sm:to-black/0" />

                {isVideoContent(item) && <PlayBadge />}
            </div>

            <div className="relative flex flex-col justify-center p-4 sm:p-7 pl-5 sm:pl-8 border-l border-[#C9A15A]/40 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-[60%] before:bg-gradient-to-b before:from-transparent before:via-[#C9A15A]/70 before:to-transparent">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-[#0A2E22] uppercase mb-2">
                    {item.subCatNameInHindi || item.newsSubCategory}
                </span>
                <h3 className="text-base sm:text-2xl font-bold text-[#122E22] leading-snug line-clamp-2 tracking-tight group-hover:text-[#0A2E22] transition-colors">
                    {item.newsHeading}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B655F] mt-2 sm:mt-3 leading-relaxed line-clamp-2">
                    {cleanDescription(item.newsDetails, 140)}
                </p>

                <div className="flex items-center justify-between mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-[#0A2E22]/8">
                    <div className="flex items-center gap-3.5 text-[10.5px] sm:text-[11px] tracking-wide text-[#8B948E]">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="text-[#C9A15A]">{IconCalendar}</span>
                            {formatDate(item.updatedDate)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="text-[#C9A15A]">{IconEye}</span>
                            {item.viewCount?.toLocaleString("hi-IN")}
                        </span>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0A2E22] px-3 py-1.5 rounded-full translate-x-1 ">
                        पूरी कहानी पढ़ें {IconArrow}
                    </span>
                </div>
            </div>
        </Link>
    );
}

function JourneyCard({ item }: { item: NewsItem }) {
    const src = imageSrc(item);
    const category = item.subCatNameInHindi || item.newsSubCategory;

    return (
        <Link
            href={articleHref(item)}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#0A2E22]/10 shadow-[0_10px_24px_rgba(10,46,34,0.08),0_28px_48px_-12px_rgba(10,46,34,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A15A]/60 hover:shadow-[0_16px_32px_rgba(10,46,34,0.12),0_36px_60px_-14px_rgba(10,46,34,0.24)]"
        >
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C9A15A]/0 via-[#C9A15A]/60 to-[#C9A15A]/0 group-hover:via-[#C9A15A] transition-all duration-300 z-10" />
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#C9A15A]/0 group-hover:ring-[#C9A15A]/25 transition-all duration-400 z-10" />

            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                {src && (
                    <Image
                        src={src}
                        alt={item.newsHeading}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
                {isVideoContent(item) && <PlayBadge />}

                {category && (
                    <span className="absolute bottom-2 left-2 inline-flex items-center rounded-full bg-[#0A2E22]/80 backdrop-blur-sm px-2.5 py-1 text-[9.5px] font-bold tracking-[0.08em] uppercase text-[#EFE6CE] max-w-[calc(100%-1rem)] truncate">
                        {category}
                    </span>
                )}
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                <h3 className="text-[13px] sm:text-sm font-bold text-[#122E22] leading-snug line-clamp-2 tracking-tight group-hover:text-[#0A2E22] transition-colors">
                    {item.newsHeading}
                </h3>

                <p className="hidden sm:block text-[12px] text-[#7A837C] mt-1.5 leading-relaxed line-clamp-2">
                    {cleanDescription(item.newsDetails, 90)}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#0A2E22]/8">
                    <div className="flex items-center gap-3 text-[10.5px] sm:text-[11px] text-[#8B948E]">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="text-[#C9A15A]">{IconCalendar}</span>
                            {formatDate(item.updatedDate)}
                        </span>
                        {/* View count: desktop only, hidden on mobile to keep the card compact there */}
                        <span className="hidden sm:inline-flex items-center gap-1.5">
                            <span className="text-[#C9A15A]">{IconEye}</span>
                            {item.viewCount?.toLocaleString("hi-IN")}
                        </span>
                    </div>

                    <span className="text-[#0A2E22] translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                        {IconArrow}
                    </span>
                </div>
            </div>
        </Link>
    );
}
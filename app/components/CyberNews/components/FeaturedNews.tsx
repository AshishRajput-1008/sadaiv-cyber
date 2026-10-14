"use client";
import { articleHref } from "@/utils/Utils";
import type { NewsItem } from "@/lib/Types/types";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import sadavSatyaLogo from "@/Assests/images/collab/sadavsatyalogo101.png";
import { Noto_Sans_Devanagari, IBM_Plex_Mono, Nunito_Sans } from "next/font/google";
import {
    LayoutGrid,
    ShieldAlert,
    Landmark,
    Gavel,
    Bitcoin,
    GraduationCap,
    Newspaper,
    AlertTriangle,
    TrendingUp,
    Eye,
    ShieldCheck,
    ArrowRight,
    RotateCw,
    Loader2,
    CalendarClock,
} from "lucide-react";
import { toSlug } from "@/lib/news-api";

const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari", "latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    display: "swap",
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["500", "600", "700", "800"],
    display: "swap",
});

const API_BASE_URL = "https://mapi.sadaivsatya.com";
const CATEGORY = "Cyber Duniya";
const SUBCATS_URL = `${API_BASE_URL}/api/AdminApi/subcatsbycategory/${encodeURIComponent(
    "cyber duniya",
)}`;

// Subcategories that should never appear as a tab and should never be
// fetched (neither directly nor as part of the merged "All" pool).
const EXCLUDED_SUBCATEGORIES = new Set(["cyber article"]);

function isExcludedSubCategory(subCatName: string | null | undefined) {
    if (!subCatName) return false;
    return EXCLUDED_SUBCATEGORIES.has(subCatName.trim().toLowerCase());
}

// ---------- Layout constants ----------
const DESKTOP_GROUP_SIZE = 9; // 1 horizontal + 8 square
const MOBILE_GROUP_SIZE = 5; // 1 horizontal + 4 square
const LOAD_MORE_INCREMENT = 20;
const SUBCAT_PAGE_SIZE = 20; // per-page size when paging a single subcategory
const ALL_TAB_SUBCAT_PULL = 30; // per-subcategory pull when building the merged "All" pool
const ALL_TAB_POOL_CAP = 120; // total merged pool size, client-paginated from here

// ---------- Types ----------

type SubCategoryApi = {
    nameinHindi: string;
    subCat_Name: string;
    cat_Name: string;
};

type CyberTab = {
    key: string;
    label: string;
    apiSubCategory: string | null;
};

type CategoryStyle = {
    tabActiveText: string;
    tabActiveBg: string;
    tabActiveRing: string;
    tabIdleBg: string;
    tabIdleText: string;
    tabIdleIcon: string;
    badgeBg: string;
    badgeText: string;
    linkText: string;
    accentBar: string;
    photoMount: string;
    ring: string;
    glow: string;
};

type TabDataState = {
    items: NewsItem[];
    page: number; // last API page fetched (subcategory tabs only)
    hasMoreApi: boolean; // whether the API might have more pages (subcategory tabs only)
    visibleCount: number;
};

// Time-range filter applied on top of whatever tab/subcategory is active.
type TimeFilterKey = "all" | "today" | "weekly" | "monthly" | "yearly";

const TIME_FILTERS: { key: TimeFilterKey; label: string }[] = [
    { key: "all", label: "सभी" },
    { key: "today", label: "आज" },
    { key: "weekly", label: "साप्ताहिक" },
    { key: "monthly", label: "मासिक" },
    { key: "yearly", label: "वार्षिक" },
];

// ---------- Static colour pool (kept literal so Tailwind can statically
// pick up every class — colours are assigned by POSITION, not by name,
// since subcategories arrive dynamically from the API) ----------

const ALL_STYLE: CategoryStyle = {
    tabActiveText: "text-[#E8C468]",
    tabActiveBg: "bg-[#D4A94D]/[0.16]",
    tabActiveRing: "ring-[#D4A94D]/20",
    tabIdleBg: "bg-[#D4A94D]",
    tabIdleText: "text-[#241A08]",
    tabIdleIcon: "text-[#241A08]",
    badgeBg: "bg-[#D4A94D]",
    badgeText: "text-[#241A08]",
    linkText: "text-[#E8C468] hover:text-[#F1D48A]",
    accentBar: "from-[#F1D48A] via-[#D4A94D] to-[#8F7230]",
    photoMount: "from-[#D4A94D]/12 to-transparent",
    ring: "ring-[#D4A94D]/20",
    glow: "hover:shadow-[0_24px_60px_-20px_rgba(212,169,77,0.35)]",
};

const STYLE_POOL: CategoryStyle[] = [
    {
        tabActiveText: "text-white",
        tabActiveBg: "bg-[#C4434F]",
        tabActiveRing: "ring-[#C4434F]/20",
        tabIdleBg: "bg-[#C4434F]/[0.16]",
        tabIdleText: "text-[#E9838C]",
        tabIdleIcon: "text-[#E9838C]",
        badgeBg: "bg-[#C4434F]",
        badgeText: "text-white",
        linkText: "text-[#E9838C] hover:text-[#F3AEB4]",
        accentBar: "from-[#E9838C] via-[#C4434F] to-[#6E1F28]",
        photoMount: "from-[#C4434F]/12 to-transparent",
        ring: "ring-[#C4434F]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(196,67,79,0.35)]",
    },
    {
        tabActiveText: "text-[#241A08]",
        tabActiveBg: "bg-[#D19A45]",
        tabActiveRing: "ring-[#D19A45]/20",
        tabIdleBg: "bg-[#D19A45]/[0.16]",
        tabIdleText: "text-[#EBC17F]",
        tabIdleIcon: "text-[#EBC17F]",
        badgeBg: "bg-[#D19A45]",
        badgeText: "text-[#241A08]",
        linkText: "text-[#EBC17F] hover:text-[#F3D6A6]",
        accentBar: "from-[#EBC17F] via-[#D19A45] to-[#7C591F]",
        photoMount: "from-[#D19A45]/12 to-transparent",
        ring: "ring-[#D19A45]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(209,154,69,0.35)]",
    },
    {
        tabActiveText: "text-white",
        tabActiveBg: "bg-[#4C6FD1]",
        tabActiveRing: "ring-[#4C6FD1]/20",
        tabIdleBg: "bg-[#4C6FD1]/[0.16]",
        tabIdleText: "text-[#93A9EC]",
        tabIdleIcon: "text-[#93A9EC]",
        badgeBg: "bg-[#4C6FD1]",
        badgeText: "text-white",
        linkText: "text-[#93A9EC] hover:text-[#B7C6F2]",
        accentBar: "from-[#93A9EC] via-[#4C6FD1] to-[#233871]",
        photoMount: "from-[#4C6FD1]/12 to-transparent",
        ring: "ring-[#4C6FD1]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(76,111,209,0.35)]",
    },
    {
        tabActiveText: "text-white",
        tabActiveBg: "bg-[#8B6FD6]",
        tabActiveRing: "ring-[#8B6FD6]/20",
        tabIdleBg: "bg-[#8B6FD6]/[0.16]",
        tabIdleText: "text-[#BCA9EC]",
        tabIdleIcon: "text-[#BCA9EC]",
        badgeBg: "bg-[#8B6FD6]",
        badgeText: "text-white",
        linkText: "text-[#BCA9EC] hover:text-[#D6C9F2]",
        accentBar: "from-[#BCA9EC] via-[#8B6FD6] to-[#452F82]",
        photoMount: "from-[#8B6FD6]/12 to-transparent",
        ring: "ring-[#8B6FD6]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(139,111,214,0.35)]",
    },
    {
        tabActiveText: "text-[#082019]",
        tabActiveBg: "bg-[#2FA98A]",
        tabActiveRing: "ring-[#2FA98A]/20",
        tabIdleBg: "bg-[#2FA98A]/[0.16]",
        tabIdleText: "text-[#7ED4BC]",
        tabIdleIcon: "text-[#7ED4BC]",
        badgeBg: "bg-[#2FA98A]",
        badgeText: "text-[#082019]",
        linkText: "text-[#7ED4BC] hover:text-[#A6E5D2]",
        accentBar: "from-[#7ED4BC] via-[#2FA98A] to-[#125E4A]",
        photoMount: "from-[#2FA98A]/12 to-transparent",
        ring: "ring-[#2FA98A]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(47,169,138,0.35)]",
    },
    {
        tabActiveText: "text-white",
        tabActiveBg: "bg-[#D6577A]",
        tabActiveRing: "ring-[#D6577A]/20",
        tabIdleBg: "bg-[#D6577A]/[0.16]",
        tabIdleText: "text-[#F0A9C0]",
        tabIdleIcon: "text-[#F0A9C0]",
        badgeBg: "bg-[#D6577A]",
        badgeText: "text-white",
        linkText: "text-[#F0A9C0] hover:text-[#F7CBDA]",
        accentBar: "from-[#F0A9C0] via-[#D6577A] to-[#7A2B44]",
        photoMount: "from-[#D6577A]/12 to-transparent",
        ring: "ring-[#D6577A]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(214,87,122,0.35)]",
    },
    {
        tabActiveText: "text-white",
        tabActiveBg: "bg-[#E2703A]",
        tabActiveRing: "ring-[#E2703A]/20",
        tabIdleBg: "bg-[#E2703A]/[0.16]",
        tabIdleText: "text-[#F1AE84]",
        tabIdleIcon: "text-[#F1AE84]",
        badgeBg: "bg-[#E2703A]",
        badgeText: "text-white",
        linkText: "text-[#F1AE84] hover:text-[#F8CFB4]",
        accentBar: "from-[#F1AE84] via-[#E2703A] to-[#7C3618]",
        photoMount: "from-[#E2703A]/12 to-transparent",
        ring: "ring-[#E2703A]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(226,112,58,0.35)]",
    },
    {
        tabActiveText: "text-[#08222E]",
        tabActiveBg: "bg-[#3FA9DD]",
        tabActiveRing: "ring-[#3FA9DD]/20",
        tabIdleBg: "bg-[#3FA9DD]/[0.16]",
        tabIdleText: "text-[#8FCDEF]",
        tabIdleIcon: "text-[#8FCDEF]",
        badgeBg: "bg-[#3FA9DD]",
        badgeText: "text-[#08222E]",
        linkText: "text-[#8FCDEF] hover:text-[#C0E4F6]",
        accentBar: "from-[#8FCDEF] via-[#3FA9DD] to-[#1F5A78]",
        photoMount: "from-[#3FA9DD]/12 to-transparent",
        ring: "ring-[#3FA9DD]/20",
        glow: "hover:shadow-[0_24px_60px_-20px_rgba(63,169,221,0.35)]",
    },
];

function styleForTabIndex(tabIndex: number): CategoryStyle {
    if (tabIndex <= 0) return ALL_STYLE;
    return STYLE_POOL[(tabIndex - 1) % STYLE_POOL.length];
}

function iconForSubCategory(subCatName: string | null) {
    if (!subCatName) return LayoutGrid;
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

// ---------- Fetch helpers ----------

async function fetchSubCategories(): Promise<SubCategoryApi[]> {
    const res = await fetch(SUBCATS_URL);
    if (!res.ok) throw new Error(`Failed to fetch subcategories: ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? (json as SubCategoryApi[]) : [];
}

function buildSubCategoryUrl(subCategory: string, page: number, pageSize: number) {
    return `${API_BASE_URL}/api/AdminApi/getnews-bycategoryandsubcat/${encodeURIComponent(
        CATEGORY,
    )}/${encodeURIComponent(subCategory)}?page=${page}&pageSize=${pageSize}`;
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

async function fetchSubCategoryNews(
    subCategory: string,
    page = 1,
    pageSize = SUBCAT_PAGE_SIZE,
): Promise<NewsItem[]> {
    const res = await fetch(buildSubCategoryUrl(subCategory, page, pageSize));
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`Failed to fetch "${subCategory}" news: ${res.status}`);
    return normalizeNewsResponse(await res.json());
}

async function fetchAllTabPool(subCats: string[]): Promise<NewsItem[]> {
    const results = await Promise.allSettled(
        subCats.map((sc) => fetchSubCategoryNews(sc, 1, ALL_TAB_SUBCAT_PULL)),
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

    // latest date first
    deduped.sort(
        (a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
    );

    return deduped.slice(0, ALL_TAB_POOL_CAP);
}

// ---------- Helpers ----------

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

// Returns true if `dateStr` falls inside the selected time-range filter.
// "today" = same calendar day; "weekly" = last 7 days; "monthly" = last 30
// days; "yearly" = last 365 days. All ranges are inclusive of "now".
function isWithinTimeFilter(dateStr: string, filter: TimeFilterKey): boolean {
    if (filter === "all") return true;
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return false;

    const now = new Date();

    if (filter === "today") {
        return (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate()
        );
    }

    const msDiff = now.getTime() - date.getTime();
    if (msDiff < 0) return false; // future-dated items don't count toward a "past X" filter

    const DAY_MS = 24 * 60 * 60 * 1000;
    if (filter === "weekly") return msDiff <= 7 * DAY_MS;
    if (filter === "monthly") return msDiff <= 30 * DAY_MS;
    if (filter === "yearly") return msDiff <= 365 * DAY_MS;

    return true;
}

function subCategoryHref(tab: CyberTab) {
    if (!tab.apiSubCategory) return `/${toSlug(CATEGORY)}`;
    return `/${toSlug(CATEGORY)}/${toSlug(tab.apiSubCategory)}`;
}

function chunkForLayout<T>(items: T[], groupSize: number): T[][] {
    const groups: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
        groups.push(items.slice(i, i + groupSize));
    }
    return groups;
}

// Detects desktop (>= lg breakpoint) so the 1+8 vs 1+4 grouping can be
// computed correctly on the client. Defaults to desktop to avoid layout
// jump on first paint for most visitors; corrects itself immediately on mount.
function useIsDesktop(breakpointPx = 1024) {
    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${breakpointPx}px)`);
        const update = () => setIsDesktop(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, [breakpointPx]);
    return isDesktop;
}

// ---------- Main component ----------

export default function FeaturedCyberNews() {
    const [tabs, setTabs] = useState<CyberTab[]>([
        { key: "all", label: "सभी फाइलें", apiSubCategory: null },
    ]);
    const [tabsReady, setTabsReady] = useState(false);
    const [tabsError, setTabsError] = useState(false);
    const tabsRef = useRef(tabs);
    tabsRef.current = tabs;

    const [activeTab, setActiveTab] = useState("all");
    const [timeFilter, setTimeFilter] = useState<TimeFilterKey>("all");
    const [tabData, setTabData] = useState<Record<string, TabDataState>>({});
    const [loadingTab, setLoadingTab] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [tabError, setTabError] = useState(false);

    const cardsRef = useRef<HTMLDivElement | null>(null);
    const isDesktop = useIsDesktop();

    // Step 1 — discover subcategories for this category
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
            const subcats = await fetchSubCategories();
if (cancelled) return;
const dynamicTabs: CyberTab[] = [
    { key: "all", label: "सभी फाइलें", apiSubCategory: null },
    ...subcats
        .filter((sc) => !isExcludedSubCategory(sc.subCat_Name))
        .map((sc) => ({
            key: toSlug(sc.subCat_Name),
            label: sc.nameinHindi,
            apiSubCategory: sc.subCat_Name,
        })),
];
setTabs(dynamicTabs);
            } catch (e) {
                console.error("Error loading cyber subcategories:", e);
                if (!cancelled) setTabsError(true);
            } finally {
                if (!cancelled) setTabsReady(true);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const activeIndex = tabs.findIndex((t) => t.key === activeTab);
    const activeConfig = tabs[activeIndex] ?? tabs[0];

    const jumpToCards = useCallback(() => {
        const el = cardsRef.current;
        if (!el) return;
        const headerOffset = 24;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "auto" });
    }, []);

    const handleTabClick = useCallback(
        (key: string) => {
            setActiveTab(key);
            jumpToCards();
        },
        [jumpToCards],
    );

    const handleTimeFilterClick = useCallback(
        (key: TimeFilterKey) => {
            setTimeFilter(key);
            jumpToCards();
        },
        [jumpToCards],
    );

    const initialVisibleFor = useCallback(
        (desktop: boolean) => (desktop ? DESKTOP_GROUP_SIZE : MOBILE_GROUP_SIZE),
        [],
    );

    const initTab = useCallback(
        async (tab: CyberTab) => {
            setLoadingTab(true);
            setTabError(false);
            const initialVisible = initialVisibleFor(isDesktop);
            try {
                if (tab.apiSubCategory) {
                    const items = await fetchSubCategoryNews(tab.apiSubCategory, 1, SUBCAT_PAGE_SIZE);
                    setTabData((prev) => ({
                        ...prev,
                        [tab.key]: {
                            items,
                            page: 1,
                            hasMoreApi: items.length === SUBCAT_PAGE_SIZE,
                            visibleCount: Math.min(initialVisible, items.length),
                        },
                    }));
                } else {
                    const subCatNames = tabsRef.current
                        .filter((t) => t.apiSubCategory)
                        .map((t) => t.apiSubCategory as string);
                    const items = await fetchAllTabPool(subCatNames);
                    setTabData((prev) => ({
                        ...prev,
                        [tab.key]: {
                            items,
                            page: 1,
                            hasMoreApi: false,
                            visibleCount: Math.min(initialVisible, items.length),
                        },
                    }));
                }
            } catch (e) {
                console.error("Error loading cyber news tab:", tab.key, e);
                setTabError(true);
            } finally {
                setLoadingTab(false);
            }
        },
        [isDesktop, initialVisibleFor],
    );

    // Step 2 — once tabs are known, load news for whichever tab is active
    useEffect(() => {
        if (!tabsReady) return;
        if (!tabData[activeTab]) {
            initTab(activeConfig);
        } else {
            setLoadingTab(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, tabsReady]);

    const current = tabData[activeTab];

    const handleLoadMore = useCallback(async () => {
        if (!current) return;
        setLoadingMore(true);
        try {
            let items = current.items;
            let page = current.page;
            let hasMoreApi = current.hasMoreApi;
            const targetVisible = current.visibleCount + LOAD_MORE_INCREMENT;

            // Subcategory tabs: page the real API until we have enough items
            // (or the API runs out) to satisfy the next 20-item reveal.
            if (activeConfig.apiSubCategory) {
                while (items.length < targetVisible && hasMoreApi) {
                    const nextPage = page + 1;
                    const more = await fetchSubCategoryNews(
                        activeConfig.apiSubCategory,
                        nextPage,
                        SUBCAT_PAGE_SIZE,
                    );
                    page = nextPage;
                    hasMoreApi = more.length === SUBCAT_PAGE_SIZE;
                    items = [...items, ...more];
                }
            }
            // "All" tab: pool was already pulled in full; just reveal more of it.

            const visibleCount = Math.min(targetVisible, items.length);
            setTabData((prev) => ({
                ...prev,
                [activeTab]: { items, page, hasMoreApi, visibleCount },
            }));
        } catch (e) {
            console.error("Error loading more cyber news:", e);
        } finally {
            setLoadingMore(false);
        }
    }, [current, activeConfig, activeTab]);

    // Apply the today/weekly/monthly/yearly filter on top of whatever's been
    // revealed so far for the active tab. Filtering happens client-side since
    // the API doesn't expose a date-range parameter.
    const timeFilteredItems = useMemo(() => {
        if (!current) return [];
        if (timeFilter === "all") return current.items;
        return current.items.filter((item) => isWithinTimeFilter(item.updatedDate, timeFilter));
    }, [current, timeFilter]);

    const visibleNews = current ? timeFilteredItems.slice(0, current.visibleCount) : [];
    const groupSize = isDesktop ? DESKTOP_GROUP_SIZE : MOBILE_GROUP_SIZE;
    const groups = useMemo(() => chunkForLayout(visibleNews, groupSize), [visibleNews, groupSize]);

    // "Load more" should stay available if there's more raw data to reveal
    // OR more pages to fetch — even if the current time filter is hiding
    // some of what's already been loaded.
    const showLoadMore = Boolean(
        current && (current.visibleCount < current.items.length || current.hasMoreApi),
    );

    // Colours/icons are assigned by each item's own subcategory (not the
    // active tab) so the "All" tab still shows correct per-item colouring.
    const styleForItem = useCallback(
        (item: NewsItem): CategoryStyle => {
            const idx = tabs.findIndex((t) => t.apiSubCategory === item.newsSubCategory);
            return styleForTabIndex(idx);
        },
        [tabs],
    );

    return (
        <section
            className={`${notoSansDevanagari.className} relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-42 sm:pt-38 bg-black`}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{ background: "#0B0906" }}
            />

            <div className="relative mx-auto max-w-[1400px]">
                <div className="relative rounded-[22px] overflow-hidden shadow-[0_40px_100px_-24px_rgba(0,0,0,0.7)] ring-1 ring-[#D4A94D]/20">
                    {/* ---------- Header ---------- */}
                    <div
                        className="relative overflow-hidden px-5 sm:px-9 pt-9 pb-9"
                        style={{
                            background:
                                "linear-gradient(150deg, #1B140A 0%, #14100A 55%, #0E0B07 100%)",
                        }}
                    >
                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A94D]/70 to-transparent" />

                        <div className="relative flex items-start justify-between gap-4 sm:gap-6">
                            <div className="max-w-lg">
                                <div className="relative inline-flex items-center gap-2 mb-5 rounded-full border border-[#D4A94D]/30 bg-white/[0.03] pl-2.5 pr-3.5 py-[5px]">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="motion-reduce:animate-none animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E9636D] opacity-60" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E9636D]" />
                                    </span>
                                    <span className={`${nunitoSans.className} uppercase text-[10.5px] font-bold tracking-[0.15em] text-[#E8C468]`}>
                                        Sadaiv Satya News Desk
                                    </span>
                                    <span className="w-px h-3 bg-[#D4A94D]/30" />
                                    <span className={`${nunitoSans.className} hidden md:block uppercase text-[10.5px] font-bold tracking-[0.15em] text-[#E9636D]`}>
                                        Live Filing
                                    </span>
                                </div>

                                <h2 className={`${notoSansDevanagari.className} text-[29px] sm:text-[39px] font-extrabold text-[#F5EFDD] tracking-tight leading-[1.15]`}>
                                    साइबर सुरक्षा डेस्क
                                </h2>
                                <p className="mt-3 text-[13.5px] text-[#C9BFA8] font-medium leading-relaxed">
                                    हर मामले की फाइल, सत्यापित तथ्यों के साथ — अपराध से सुरक्षा तक
                                </p>

                                <div className="flex items-center gap-2.5 mt-6 pt-5 border-t border-[#D4A94D]/15">
                                    <ShieldCheck className="w-4 h-4 text-[#D4A94D] flex-shrink-0" strokeWidth={1.8} />
                                    <p className={`${nunitoSans.className} text-[12px] font-medium text-[#B7AC93] tracking-wide`}>
                                        Sadaiv Satya Broadcasting Pvt. Ltd. द्वारा संचालित
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex flex-shrink-0 w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] md:w-[104px] md:h-[104px] lg:w-[120px] lg:h-[120px] rounded-full ring-1 ring-[#D4A94D]/40 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.6)] overflow-hidden bg-[#100C07]">
                                <Image src={sadavSatyaLogo} alt="Sadaiv Satya" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* ---------- Body: category panel + news ---------- */}
                    <div ref={cardsRef} className="relative px-5 sm:px-8 py-8 scroll-mt-6 space-y-7" style={{ background: "#14110D" }}>
                        <CategoryPanel
                            tabs={tabs}
                            activeTab={activeTab}
                            onSelect={handleTabClick}
                            loading={!tabsReady}
                            error={tabsError}
                        />

                        <TimeFilterPanel value={timeFilter} onChange={handleTimeFilterClick} />

                        {loadingTab && <NewsGridSkeleton />}

                        {!loadingTab && tabsReady && tabError && (
                            <div className={`${plexMono.className} text-center py-12 text-[12.5px] text-[#C9BFA8]`}>
                                फाइल लोड नहीं हो सकी — रिकॉर्ड तक पहुंच में समस्या।
                                <button
                                    onClick={() => initTab(activeConfig)}
                                    className="ml-2 inline-flex items-center gap-1 font-semibold underline text-[#E9636D] hover:text-[#F3AEB4]"
                                >
                                    <RotateCw className="w-3 h-3" /> पुनः प्रयास करें
                                </button>
                            </div>
                        )}

                        {!loadingTab && tabsReady && !tabError && visibleNews.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                                <div className="w-11 h-11 rounded-full border border-dashed border-[#D4A94D]/40 flex items-center justify-center">
                                    <ShieldAlert className="w-5 h-5 text-[#D4A94D]/60" />
                                </div>
                                <p className="text-[13px] text-[#B7AC93] font-medium">
                                    {timeFilter === "all"
                                        ? "इस श्रेणी की फाइल फिलहाल खाली है — जल्द अपडेट होगी।"
                                        : "चुनी गई अवधि में इस श्रेणी की कोई फाइल नहीं मिली।"}
                                </p>
                                {timeFilter !== "all" && (
                                    <button
                                        onClick={() => handleTimeFilterClick("all")}
                                        className="inline-flex items-center gap-1 text-[12px] font-bold underline text-[#E8C468] hover:text-[#F1D48A]"
                                    >
                                        सभी समय दिखाएं
                                    </button>
                                )}
                            </div>
                        )}

                        {!loadingTab && tabsReady && !tabError && visibleNews.length > 0 && (
                            <>
                                <div className="space-y-6">
                                    {groups.map((group, gi) => {
                                        const [featured, ...squares] = group;
                                        return (
                                            <div key={gi} className="space-y-6">
                                                <FeaturedNewsCard
                                                    item={featured}
                                                    position={gi * groupSize + 1}
                                                    style={styleForItem(featured)}
                                                />
                                                {squares.length > 0 && (
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                                        {squares.map((item, si) => {
                                                            // Desktop: 8 grid cards per group (4 cols per row -> si >= 4 is row 2)
                                                            // Mobile: 4 grid cards per group (2 cols per row -> si >= 2 is row 2)
                                                            const isSecondRow = si >= (isDesktop ? 4 : 2);
                                                            return (
                                                                <GridNewsCard
                                                                    key={item.newsId}
                                                                    item={item}
                                                                    position={gi * groupSize + si + 2}
                                                                    style={styleForItem(item)}
                                                                    alwaysActive={isSecondRow}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col items-center gap-5 pt-3">
                                    {showLoadMore && (
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            className={`${nunitoSans.className} inline-flex items-center gap-2.5 rounded-full border border-[#D4A94D] bg-gradient-to-r from-[#D4A94D]/25 via-[#D4A94D]/15 to-[#D4A94D]/25 px-7 py-3 text-[13px] font-extrabold tracking-wide text-[#F5EFDD] shadow-[0_0_25px_-4px_rgba(212,169,77,0.45)] ring-1 ring-[#D4A94D]/50 transition-all duration-300 hover:scale-[1.02] hover:bg-[#D4A94D]/35 hover:shadow-[0_0_35px_-4px_rgba(212,169,77,0.7)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed`}
                                        >
                                            {loadingMore ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-[#E8C468]" />
                                                    लोड हो रहा है...
                                                </>
                                            ) : (
                                                "और खबरें देखें"
                                            )}
                                        </button>
                                    )}
                                </div>

                                <CategoryPanel
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    onSelect={handleTabClick}
                                    loading={!tabsReady}
                                    error={tabsError}
                                    title="अन्य श्रेणी चुनें"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ---------- Category panel ----------

function CategoryPanel({
    tabs,
    activeTab,
    onSelect,
    loading,
    error,
    title = "श्रेणी चुनें",
}: {
    tabs: CyberTab[];
    activeTab: string;
    onSelect: (key: string) => void;
    loading: boolean;
    error: boolean;
    title?: string;
}) {
    return (
        <div className="rounded-2xl bg-[#171310] ring-1 ring-[#D4A94D]/15 px-4 sm:px-6 py-5">
            <div className="flex items-center gap-3 mb-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A94D]/30" />
                <span className={`${nunitoSans.className} uppercase text-[10px] font-bold tracking-[0.22em] text-[#B7AC93] whitespace-nowrap`}>
                    {title}
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A94D]/30" />
            </div>

            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-10 rounded-full bg-white/[0.04] animate-pulse last:odd:col-span-2 last:odd:max-w-[calc(50%-5px)] last:odd:w-full last:odd:mx-auto sm:last:odd:col-span-1 sm:last:odd:max-w-none"
                        />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className={`${plexMono.className} text-[12px] text-[#C9BFA8]`}>
                    श्रेणियाँ लोड नहीं हो सकीं।
                </p>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {tabs.map((tab, i) => {
                        const isActive = tab.key === activeTab;
                        const style = styleForTabIndex(i);
                        const Icon = iconForSubCategory(tab.apiSubCategory);
                        return (
                            <button
                                key={tab.key}
                                onClick={() => onSelect(tab.key)}
                                aria-pressed={isActive}
                                className={`flex items-center gap-2.5 rounded-full px-3 py-2.5 text-left ring-1 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A94D] ${
                                    isActive
                                        ? `${style.tabIdleBg} ${style.tabIdleText} ring-transparent shadow-[0_6px_16px_-4px_rgba(0,0,0,0.5)]`
                                        : `${style.tabActiveBg} ${style.tabActiveText} ${style.tabActiveRing} hover:brightness-125`
                                } last:odd:col-span-2 last:odd:max-w-[calc(50%-5px)] last:odd:w-full last:odd:mx-auto sm:last:odd:col-span-1 sm:last:odd:max-w-none`}
                            >
                                <span
                                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                                        isActive ? "bg-black/15" : "bg-white/[0.08]"
                                    }`}
                                >
                                    <Icon
                                        className={`w-3.5 h-3.5 ${isActive ? style.tabIdleIcon : style.tabActiveText}`}
                                        strokeWidth={1.8}
                                    />
                                </span>
                                <span className="text-[12px] font-bold tracking-tight truncate">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ---------- Time-range filter panel (Today / Weekly / Monthly / Yearly) ----------

function TimeFilterPanel({
    value,
    onChange,
}: {
    value: TimeFilterKey;
    onChange: (key: TimeFilterKey) => void;
}) {
    return (
        <div className="rounded-2xl bg-[#171310] ring-1 ring-[#D4A94D]/15 px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3 mb-3.5">
                <CalendarClock className="w-3.5 h-3.5 text-[#D4A94D]/70 flex-shrink-0" strokeWidth={1.8} />
                <span className={`${nunitoSans.className} uppercase text-[10px] font-bold tracking-[0.22em] text-[#B7AC93] whitespace-nowrap`}>
                    समय के अनुसार देखें
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#D4A94D]/30 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-2">
                {TIME_FILTERS.map((tf) => {
                    const isActive = tf.key === value;
                    return (
                        <button
                            key={tf.key}
                            onClick={() => onChange(tf.key)}
                            aria-pressed={isActive}
                            className={`${nunitoSans.className} rounded-full px-4 py-2 text-[11.5px] font-bold tracking-wide transition-all duration-200 ring-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A94D] ${
                                isActive
                                    ? "bg-[#D4A94D] text-[#241A08] ring-transparent shadow-[0_6px_16px_-4px_rgba(0,0,0,0.5)]"
                                    : "bg-[#D4A94D]/[0.08] text-[#C9BFA8] ring-[#D4A94D]/20 hover:bg-[#D4A94D]/[0.16] hover:text-[#E8C468]"
                            }`}
                        >
                            {tf.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ---------- Featured (horizontal) card ----------

function FeaturedNewsCard({
    item,
    position,
    style,
}: {
    item: NewsItem;
    position: number;
    style: CategoryStyle;
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

    const description = stripHtml(item.newsDetails).slice(0, 300);

    return (
        <Link href={articleHref(item)} className="group block">
            <div
                className={`relative flex flex-row overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C1712] via-[#16120E] to-[#120E0B] ring-1 ring-[#D4A94D]/30 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:ring-2 group-hover:ring-[#D4A94D]/60 group-hover:-translate-y-0.5 ${style.glow}`}
            >
                {/* Background Mesh Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#D4A94D]/[0.04] via-transparent to-transparent opacity-80" />

                <div className={`relative w-[38%] sm:w-[34%] flex-shrink-0 bg-gradient-to-b ${style.photoMount}`}>
                    <div className="relative h-full min-h-[150px] sm:min-h-[220px] w-full overflow-hidden">
                        {showImage ? (
                            <Image
                                src={imgSrc}
                                alt={item.newsHeading}
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 40vw, 30vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={() => setImgFailed(true)}
                            />
                        ) : (
                            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${style.accentBar}`}>
                                <FallbackIcon className="w-9 h-9 text-white/80" />
                            </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                </div>

                <div className="relative flex flex-1 flex-col px-3.5 sm:px-6 py-3.5 sm:py-5 min-w-0 justify-between">
                    <div>
                        <h3 className={`${notoSansDevanagari.className} text-[14.5px] sm:text-[19px] font-bold text-[#F0E6D2] leading-[1.4] line-clamp-2 group-hover:text-white transition-colors`}>
                            {item.newsHeading}
                        </h3>

                        {item.newsHeadingTwo && (
                            <p className={`${notoSansDevanagari.className} hidden sm:block text-[13px] text-[#C9BFA8] font-semibold mt-1.5 leading-snug line-clamp-1`}>
                                {item.newsHeadingTwo}
                            </p>
                        )}

                        {description && (
                            <p className={`${notoSansDevanagari.className} text-[12px] sm:text-[13.5px] text-[#A79C86] mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3`}>
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <span className={`${plexMono.className} flex items-center gap-1 text-[9.5px] sm:text-[10px] text-[#8A8272] tracking-tight whitespace-nowrap shrink-0`}>
                                <Eye className="w-3 h-3 shrink-0" strokeWidth={1.8} />
                                {item.viewCount?.toLocaleString("hi-IN")}
                            </span>
                            <span className={`${plexMono.className} text-[9px] sm:text-[9.5px] text-[#786F5C] tracking-wide whitespace-nowrap shrink-0`}>
                                {formatDate(item.updatedDate)}
                            </span>
                        </div>

                        <span className={`flex items-center gap-1 text-[11px] sm:text-[12px] font-bold whitespace-nowrap shrink-0 ${style.linkText}`}>
                            और पढ़ें
                            <ArrowRight className="w-3 h-3 shrink-0 translate-x-0.5 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ---------- Grid (square) card ----------

function GridNewsCard({
    item,
    position,
    style,
    alwaysActive = false,
}: {
    item: NewsItem;
    position: number;
    style: CategoryStyle;
    alwaysActive?: boolean;
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
    const glowClass = style.glow.replace(/hover:/g, "");

    return (
        <Link href={articleHref(item)} className="group block h-full">
            <div
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C1712] via-[#16120E] to-[#120E0B] transition-all duration-300 ${
                    alwaysActive
                        ? `ring-2 ${style.ring} ${glowClass} -translate-y-1`
                        : `ring-1 ${style.ring} shadow-[0_18px_40px_-16px_rgba(0,0,0,0.65)] group-hover:-translate-y-1 group-hover:ring-2 ${style.glow}`
                }`}
            >
                <div className={`relative px-3 sm:px-3.5 pt-3 sm:pt-3.5 pb-2`}>
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#0F0D0A] ring-1 ring-white/5">
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
                            <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${style.accentBar}`}>
                                <FallbackIcon className="w-9 h-9 text-white/80" />
                            </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>
                </div>

                <div className="relative flex flex-1 flex-col px-3 sm:px-4 pb-3.5 sm:pb-4 pt-2.5 min-w-0">
                    <h3 className={`${notoSansDevanagari.className} text-[13px] sm:text-[15.5px] font-bold text-[#F0E6D2] leading-[1.5] sm:leading-[1.55] line-clamp-3 min-h-[59px] sm:min-h-[73px]`}>
                        {item.newsHeading}
                        {item.newsHeadingTwo && (
                            <span className="font-normal text-[#A79C86]"> : {item.newsHeadingTwo}</span>
                        )}
                    </h3>

                    <div className="flex-1" />

                    <div className="flex items-center justify-between mt-3 pt-2.5 sm:pt-3 border-t border-white/[0.06]">
                        <span className={`${plexMono.className} flex items-center gap-1 text-[9px] sm:text-[10px] text-[#8A8272] tracking-tight whitespace-nowrap shrink-0`}>
                            <Eye className="w-3 h-3 shrink-0" strokeWidth={1.8} />
                            {item.viewCount?.toLocaleString("hi-IN")}
                        </span>

                        {/* Category name — desktop only */}
                        <div className="hidden sm:flex justify-center px-3 min-w-0">
                            <span
                                title={item.subCatNameInHindi || item.newsSubCategory}
                                className={`max-w-full truncate rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white`}
                            >
                                {item.subCatNameInHindi || item.newsSubCategory}
                            </span>
                        </div>

                        <span className={`${plexMono.className} text-[8.5px] sm:text-[9px] text-[#786F5C] tracking-wide whitespace-nowrap shrink-0`}>
                            {formatDate(item.updatedDate)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function NewsGridSkeleton() {
    return (
        <div className="space-y-6">
            <div className="h-[150px] sm:h-[220px] rounded-2xl bg-[#1C1712] ring-1 ring-white/[0.05] animate-pulse" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl bg-[#1C1712] ring-1 ring-white/[0.05] overflow-hidden animate-pulse">
                        <div className="px-3.5 pt-3.5 pb-2">
                            <div className="w-full aspect-[16/10] rounded-xl bg-[#241E17]" />
                        </div>
                        <div className="px-4 pb-4 pt-2 space-y-3">
                            <div className="space-y-1.5">
                                <div className="h-3 bg-[#241E17] rounded w-5/6" />
                                <div className="h-3 bg-[#241E17] rounded w-3/5" />
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                <div className="h-2 bg-[#241E17] rounded w-10" />
                                <div className="h-2 bg-[#241E17] rounded w-8" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
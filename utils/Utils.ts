// utils/Utils.ts

import { toSlug } from "@/lib/news-api";
import type { JourneyTabConfig, NewsItem } from "@/lib/Types/types";

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://mapi.sadaivsatya.com";

export function formatDate(dateStr: string) {
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

export function stripHtml(html: string, maxLen = 150) {
    const text = html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return text.length > maxLen ? text.slice(0, maxLen).trim() + "…" : text;
}

export function imageSrc(item: NewsItem) {
    if (!item.thumbnail) return "";
    return item.thumbnail.startsWith("http")
        ? item.thumbnail
        : `${API_BASE_URL}${item.thumbnail}`;
}

// Resolves the actual playable file for a video/gif item. Falls back to the
// thumbnail for animated gifs, since those are self-playing images.
export function videoSrc(item: NewsItem) {
    if (item.videoUrl) {
        return item.videoUrl.startsWith("http")
            ? item.videoUrl
            : `${API_BASE_URL}${item.videoUrl}`;
    }
    if (isGif(item)) return imageSrc(item);
    return "";
}

export function isGif(item: NewsItem) {
    return (
        item.dataType?.toLowerCase() === "gif" ||
        item.thumbnail?.toLowerCase().endsWith(".gif")
    );
}

export function isVideoContent(item: NewsItem) {
    return item.dataType?.toLowerCase() === "video" || isGif(item);
}

// Uses a query param, not a dynamic path segment, because this app is a
// pure static export (output: "export") with no server at runtime. A path
// segment like /news/[slug] requires every slug to be known and baked in
// at build time via generateStaticParams() — not viable for live,
// constantly-changing API content. /news/view?slug=... compiles to one
// static HTML file that fetches the right article client-side on load.
export function articleHref(item: NewsItem) {
    const cleanSlug = item.newsSlug.replace(/\.html$/i, "");
    return `/news/view?slug=${encodeURIComponent(cleanSlug)}`;
}

export function tabHref(tab: JourneyTabConfig) {
    return `/${toSlug(tab.apiCategory)}/${toSlug(tab.apiSubCategory)}`;
}

// Your listing pages don't follow the auto-slugified category name
// (e.g. "Cyber Duniya" would slugify to "/cyber-duniya", but your real
// route is "/CyberNews"). Map each known category explicitly so
// breadcrumbs and back-links always land on the correct existing page.
const CATEGORY_ROUTE_MAP: Record<string, string> = {
    "Cyber Duniya": "/CyberNews",
    "Motivational Effort": "/InspringJourneys",
    // add more categories here as you build their listing pages
};

export function categoryHref(categoryName: string): string {
    return CATEGORY_ROUTE_MAP[categoryName] ?? `/${toSlug(categoryName)}`;
}

// Subcategories that should never appear as a tab and should never be
// fetched (neither directly nor as part of the merged "All" pool).
const EXCLUDED_SUBCATEGORIES = new Set(["cyber article"]);

function isExcludedSubCategory(subCatName: string | null | undefined) {
    if (!subCatName) return false;
    return EXCLUDED_SUBCATEGORIES.has(subCatName.trim().toLowerCase());
}
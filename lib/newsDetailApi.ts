// lib/newsDetailApi.ts

const API_BASE_URL = "https://mapi.sadaivsatya.com";

export type NewsDetail = {
    id: number;
    newsCategoryName: string;
    newsSubsCategory: string;
    reporter: string;
    newsTag: string;
    newsHeading: string;
    newsDetails: string;
    newsDetailsTwo?: string;
    media: string;
    thumbNail: string;
    metaTag: string;
    keyWord: string;
    socialImage: string;
    updatedDate: string;
    viewCount: number;
    dataType: string;
    urgent: boolean;
};

export function resolveMediaUrl(path?: string): string {
    if (!path) return "";
    return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
}

export function isDevanagari(text: string): boolean {
    return /[\u0900-\u097F]/.test(text);
}

export function stripHtmlToText(html: string, maxLen?: number): string {
    const text = html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (!maxLen) return text;
    return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

export function estimateReadingMinutes(...htmlBlocks: (string | undefined)[]): number {
    const words = htmlBlocks
        .filter(Boolean)
        .map((html) => stripHtmlToText(html as string))
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length;
    return Math.max(1, Math.round(words / 180));
}

export function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function normalizeDetailResponse(json: unknown): NewsDetail | null {
    if (!json) return null;
    const obj = Array.isArray(json)
        ? json[0]
        : (json as Record<string, unknown>).data ?? (json as Record<string, unknown>).result ?? json;
    if (!obj || typeof obj !== "object") return null;
    return obj as NewsDetail;
}

/** Pure client-side fetch — call this from inside a "use client" component's
 *  useEffect. No server, no build-time fetch, nothing SSR-dependent. */
export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
    const cleanSlug = slug.replace(/\.html$/i, "");
    const url = `${API_BASE_URL}/api/AdminApi/GetNewsBySlug/${cleanSlug}.html`;

    const res = await fetch(url);

    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`Failed to fetch article "${slug}": ${res.status}`);
    }

    return normalizeDetailResponse(await res.json());
}
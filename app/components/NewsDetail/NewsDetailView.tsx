"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans, Nunito_Sans, Noto_Sans_Devanagari } from "next/font/google";
import {
    Calendar,
    Eye,
    Clock,
    Share2,
    Link as LinkIcon,
    Check,
    ChevronLeft,
    ChevronRight,
    ArrowUp,
    AlertTriangle,
    Home,
} from "lucide-react";
import {
    type NewsDetail,
    getNewsBySlug,
    resolveMediaUrl,
    isDevanagari,
    estimateReadingMinutes,
} from "@/lib/newsDetailApi";
import { categoryHref } from "@/utils/Utils";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["500", "600", "700", "800"],
    display: "swap",
});
const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});
const notoSansDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari", "latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

type LoadState = "loading" | "ready" | "not-found" | "error";

// Tries your tagged navbar first (most reliable), then falls back to
// common patterns in case you haven't added the data attribute yet.
const HEADER_SELECTORS = [
    "[data-site-header]",
    "header",
    "nav.fixed",
    ".site-header",
    ".navbar",
];

function measureHeaderHeight(): number {
    for (const selector of HEADER_SELECTORS) {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (el) {
            const height = el.getBoundingClientRect().height;
            if (height > 0) return height;
        }
    }
    return 0;
}

export default function NewsDetailClient() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug") ?? "";

    const [item, setItem] = useState<NewsDetail | null>(null);
    const [state, setState] = useState<LoadState>("loading");
    const [headerOffset, setHeaderOffset] = useState(0);

    // Measures your site's real fixed-navbar height at runtime so the
    // article (and its breadcrumb) always starts right below it, instead
    // of hiding underneath it. Re-measures on resize and shortly after
    // mount, since navbar height can shift once fonts/images finish
    // loading or when switching between the mobile/desktop navbar layout.
    useEffect(() => {
        const measure = () => setHeaderOffset(measureHeaderHeight());

        measure();
        window.addEventListener("resize", measure);
        const t1 = setTimeout(measure, 150);
        const t2 = setTimeout(measure, 500);

        return () => {
            window.removeEventListener("resize", measure);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    useEffect(() => {
        if (!slug) {
            setState("not-found");
            return;
        }

        let cancelled = false;
        setState("loading");

        getNewsBySlug(slug)
            .then((data) => {
                if (cancelled) return;
                if (!data) {
                    setState("not-found");
                    return;
                }
                setItem(data);
                setState("ready");
                document.title = `${data.newsHeading} | Sadaiv Satya`;
            })
            .catch((err) => {
                console.error("Failed to load article:", err);
                if (!cancelled) setState("error");
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (state === "loading") return <LoadingSkeleton headerOffset={headerOffset} />;
    if (state === "not-found") return <NotFoundState headerOffset={headerOffset} />;
    if (state === "error" || !item) return <ErrorState headerOffset={headerOffset} />;

    return <ArticleView item={item} headerOffset={headerOffset} />;
}

// ---------- Loading / empty / error states ----------

function LoadingSkeleton({ headerOffset }: { headerOffset: number }) {
    return (
        <div className="min-h-screen bg-[#FAF7EF] px-4 sm:px-6 lg:px-8 py-12" style={{ paddingTop: headerOffset + 48 }}>
            <div className="max-w-3xl mx-auto animate-pulse">
                <div className="h-3 w-40 bg-[#e5ddc7] rounded mb-6" />
                <div className="h-10 sm:h-14 w-11/12 bg-[#e5ddc7] rounded mb-3" />
                <div className="h-10 sm:h-14 w-2/3 bg-[#e5ddc7] rounded mb-6" />
                <div className="w-full aspect-[16/9] bg-[#e5ddc7] rounded-2xl mb-10" />
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-3.5 bg-[#e5ddc7] rounded" style={{ width: `${86 - (i % 4) * 10}%` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function NotFoundState({ headerOffset }: { headerOffset: number }) {
    return (
        <div className="min-h-screen bg-[#FAF7EF] flex items-center justify-center px-4" style={{ paddingTop: headerOffset }}>
            <div className="text-center max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#0A2E22]/[0.06] flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-[#8A6531]" strokeWidth={1.8} />
                </div>
                <h1 className="text-lg font-bold text-[#122E22] mb-2">यह लेख नहीं मिला</h1>
                <p className="text-sm text-[#6B756E] mb-6">
                    हो सकता है लिंक गलत हो या लेख हटा दिया गया हो।
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0A2E22] text-[#EFE6CE] px-5 py-2.5 text-sm font-semibold"
                >
                    <ChevronLeft className="w-3.5 h-3.5" /> होम पर जाएं
                </Link>
            </div>
        </div>
    );
}

function ErrorState({ headerOffset }: { headerOffset: number }) {
    return (
        <div className="min-h-screen bg-[#FAF7EF] flex items-center justify-center px-4" style={{ paddingTop: headerOffset }}>
            <div className="text-center max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#A63A38]/10 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-[#A63A38]" strokeWidth={1.8} />
                </div>
                <h1 className="text-lg font-bold text-[#122E22] mb-2">लोड करने में समस्या हुई</h1>
                <p className="text-sm text-[#6B756E] mb-6">कृपया अपना इंटरनेट कनेक्शन जांचें और दोबारा प्रयास करें।</p>
                <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0A2E22] text-[#EFE6CE] px-5 py-2.5 text-sm font-semibold"
                >
                    पुनः प्रयास करें
                </button>
            </div>
        </div>
    );
}

// ---------- Article view ----------

function ArticleView({ item, headerOffset }: { item: NewsDetail; headerOffset: number }) {
    const isHindi = isDevanagari(item.newsHeading);
    const headingFont = isHindi ? notoSansDevanagari.className : plusJakarta.className;
    const bodyFont = isHindi ? notoSansDevanagari.className : nunitoSans.className;

    const heroSrc = resolveMediaUrl(item.media || item.thumbNail);
    const readingMinutes = estimateReadingMinutes(item.newsDetails, item.newsDetailsTwo);
    const categoryLink = categoryHref(item.newsCategoryName || "");

    const tags = useMemo(() => {
        return (item.keyWord || "")
            .split(",")
            .map((t) => t.replace(/^#/, "").trim())
            .filter(Boolean)
            .slice(0, 10);
    }, [item.keyWord]);

    const [progress, setProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        setShareUrl(window.location.href);
        const onScroll = () => {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop || document.body.scrollTop;
            const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
            const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, pct)));
            setShowBackToTop(scrollTop > 700);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // ignore
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: item.newsHeading, url: shareUrl });
            } catch {
                // user cancelled
            }
        } else {
            handleCopyLink();
        }
    };

    const formattedDate = useMemo(() => {
        try {
            return new Date(item.updatedDate).toLocaleDateString(isHindi ? "hi-IN" : "en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } catch {
            return "";
        }
    }, [item.updatedDate, isHindi]);

    const reporterInitial = (item.reporter || "S").trim().charAt(0).toUpperCase();

    const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${item.newsHeading} — ${shareUrl}`)}`;
    const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(item.newsHeading)}&url=${encodeURIComponent(shareUrl)}`;
    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    return (
        // paddingTop pushes ALL article content (including the breadcrumb)
        // below your site's fixed navbar, using its real measured height —
        // this is what fixes both the invisible breadcrumb and the
        // half-hidden headline on mobile.
        <article className={`${bodyFont} relative min-h-screen bg-[#FAF7EF]`} style={{ paddingTop: headerOffset }}>
            {/* ---------- Reading progress — thin fixed strip pinned to the true top ---------- */}
            <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[#EFE6CE]">
                <div
                    className="h-full bg-gradient-to-r from-[#C9A15A] to-[#8F7230] transition-[width] duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* ---------- Breadcrumb — normal document flow, now correctly clears the navbar ---------- */}
            <div className="border-b border-[#0A2E22]/8 bg-[#FAF7EF]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 mt-4">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex items-center gap-1.5 py-3 text-[11.5px] sm:text-[12px] font-semibold tracking-wide text-[#8A6531] overflow-x-auto whitespace-nowrap"
                        style={{ scrollbarWidth: "none" }}
                    >
                        <Link href="/" className="inline-flex items-center gap-1 hover:text-[#0A2E22] transition-colors">
                            <Home className="w-3.5 h-3.5" strokeWidth={1.8} />
                            होम
                        </Link>
                        {item.newsCategoryName && (
                            <>
                                <ChevronRight className="w-3 h-3 text-[#C9A15A] flex-shrink-0" />
                                <Link href={categoryLink} className="hover:text-[#0A2E22] transition-colors">
                                    {item.newsCategoryName}
                                </Link>
                            </>
                        )}
                        {item.newsSubsCategory && (
                            <>
                                <ChevronRight className="w-3 h-3 text-[#C9A15A] flex-shrink-0" />
                                <span className="text-[#8A6531]">{item.newsSubsCategory}</span>
                            </>
                        )}
                        <ChevronRight className="w-3 h-3 text-[#C9A15A] flex-shrink-0" />
                        <span className="text-[#0A2E22]/50 truncate max-w-[160px] sm:max-w-[280px]">
                            {item.newsHeading}
                        </span>
                    </nav>
                </div>
            </div>

            {/* ---------- Ambient texture ---------- */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 opacity-[0.4]"
                style={{
                    backgroundImage: "radial-gradient(rgba(107,83,35,0.08) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(201,161,90,0.10),transparent_65%)]"
            />

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 pt-8">
                {/* ---------- Category / urgent badges ---------- */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#047a53] px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#EFE6CE] shadow-[0_4px_14px_-4px_rgba(10,46,34,0.4)] ml-3">
                        <span className="w-1 h-1 mb-1 rounded-full bg-[#D8B872]" />
                        {item.newsSubsCategory || item.newsCategoryName}
                    </span>
                    {item.urgent && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A63A38]/10 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#A63A38]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A63A38] opacity-60" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#A63A38]" />
                            </span>
                            ब्रेकिंग
                        </span>
                    )}
                </div>

                {/* ---------- Headline ---------- */}
                <div className="flex items-start gap-3 mb-4">
                    <span className="mt-3.5 sm:mt-4 h-2 w-2 flex-shrink-0 rotate-45 border border-[#C9A15A]" />
                    <h1
                        className={`${headingFont} text-[27px] sm:text-[38px] lg:text-[44px] font-extrabold text-[#122E22] leading-[1.2] tracking-tight`}
                    >
                        {item.newsHeading}
                    </h1>
                </div>

                {/* ---------- Dek ---------- */}
                {item.newsTag && (
                    <p className="ml-5 text-[15px] sm:text-[17.5px] text-[#454F49] leading-relaxed italic mb-8 border-l-2 border-[#C9A15A]/60 pl-4">
                        {item.newsTag}
                    </p>
                )}

                {/* ---------- Byline card ---------- */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8 rounded-2xl border border-[#0A2E22]/8 bg-white/60 px-4 sm:px-5 py-3.5 shadow-[0_4px_20px_-8px_rgba(10,46,34,0.08)]">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0F4432] to-[#0A2E22] text-[#D8B872] font-bold text-sm flex-shrink-0">
                            {reporterInitial}
                        </span>
                        <div>
                            <p className="text-[13px] font-bold text-[#122E22] leading-tight">
                                {item.reporter || "Sadaiv Satya Desk"}
                            </p>
                            <p className="text-[11px] text-[#8B948E]">रिपोर्टर</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11.5px] text-[#6B756E]">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A15A]" strokeWidth={1.8} />
                            {formattedDate}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C9A15A]" strokeWidth={1.8} />
                            {readingMinutes} मिनट
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-[#C9A15A]" strokeWidth={1.8} />
                            {item.viewCount?.toLocaleString("hi-IN")}
                        </span>
                    </div>
                </div>

                {/* ---------- Hero media ---------- */}
                {heroSrc && (
                    <figure className="relative mb-10 -mx-4 sm:mx-0">
                        <div className="relative w-full aspect-[16/9] sm:rounded-[20px] overflow-hidden ring-1 ring-[#C9A15A]/30 shadow-[0_28px_60px_-24px_rgba(10,46,34,0.4)]">
                            {item.dataType?.toUpperCase() === "VIDEO" ? (
                                <video src={heroSrc} controls className="absolute inset-0 w-full h-full object-cover bg-black" />
                            ) : (
                                <Image
                                    src={heroSrc}
                                    alt={item.newsHeading}
                                    fill
                                    unoptimized
                                    priority
                                    sizes="(max-width: 768px) 100vw, 768px"
                                    className="object-cover"
                                />
                            )}
                            <div
                                className="pointer-events-none absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#E4C170] via-[#C9A15A] to-[#8F7230] opacity-90"
                                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                            />
                        </div>
                    </figure>
                )}

                {/* ---------- Share bar ---------- */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-10 pb-8 border-b border-dashed border-[#0A2E22]/12">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A6531]">
                        <Share2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                        शेयर करें
                    </span>
                    <div className="flex items-center gap-2">
                        <ShareButton href={whatsappHref} label="WhatsApp" />
                        <ShareButton href={twitterHref} label="X" />
                        <ShareButton href={facebookHref} label="Facebook" />
                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C9A15A]/40 text-[#0A2E22] bg-white hover:bg-[#0A2E22] hover:text-[#EFE6CE] transition-colors"
                            aria-label="Copy link"
                        >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
                        </button>
                        <button
                            onClick={handleNativeShare}
                            className="sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C9A15A]/40 text-[#0A2E22] bg-white"
                            aria-label="Share"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* ---------- Article body ---------- */}
                <div
                    className={`${bodyFont} article-body text-[15.5px] sm:text-[16.5px] text-[#2E362F] leading-[1.9]`}
                    dangerouslySetInnerHTML={{ __html: item.newsDetails || "" }}
                />
                {item.newsDetailsTwo && (
                    <div
                        className={`${bodyFont} article-body text-[15.5px] sm:text-[16.5px] text-[#2E362F] leading-[1.9] mt-2`}
                        dangerouslySetInnerHTML={{ __html: item.newsDetailsTwo }}
                    />
                )}

                {/* ---------- Tags ---------- */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#0A2E22]/10">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-[#C9A15A]/35 bg-[#C9A15A]/[0.07] px-3 py-1 text-[11.5px] font-semibold text-[#8A6531] hover:bg-[#C9A15A]/[0.14] transition-colors"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* ---------- Credential footer ---------- */}
                <div className="flex items-center gap-2.5 mt-8 pt-6 border-t border-[#0A2E22]/10">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[#C9A15A]/50 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A15A]" />
                    </span>
                    <p className="text-[11.5px] font-medium text-[#6B756E] tracking-wide">
                        Sadaiv Satya Broadcasting Pvt. Ltd. द्वारा सत्यापित एवं प्रकाशित
                    </p>
                </div>

                {/* ---------- Back link ---------- */}
                <div className="mt-10">
                    <Link
                        href={categoryLink}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A15A]/40 text-[#0A2E22] bg-white hover:bg-[#0A2E22] hover:text-[#EFE6CE] hover:border-[#0A2E22] px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_16px_rgba(10,46,34,0.06)] transition-all duration-300"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        {item.newsCategoryName || "होम"} पर वापस जाएं
                    </Link>
                </div>
            </div>

            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-5 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0A2E22] text-[#EFE6CE] shadow-[0_10px_30px_rgba(10,46,34,0.35)] hover:bg-[#0F4432] transition-colors"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-4 h-4" strokeWidth={2.2} />
                </button>
            )}

            <style jsx global>{`
                .article-body p { margin-bottom: 1.15em; }
                .article-body strong { color: #0a2e22; font-weight: 700; }
                .article-body a { color: #8a6531; text-decoration: underline; text-underline-offset: 2px; }
                .article-body ul, .article-body ol { margin: 0 0 1.15em 1.25em; }
                .article-body blockquote {
                    border-left: 3px solid #c9a15a;
                    padding-left: 1rem;
                    color: #454f49;
                    font-style: italic;
                    margin: 1.5em 0;
                }
                .article-body img { border-radius: 12px; margin: 1.5em 0; }
                .article-body > p:first-of-type::first-letter {
                    float: left;
                    font-family: ${plusJakarta.style.fontFamily}, sans-serif;
                    font-size: 3.4em;
                    line-height: 0.85;
                    font-weight: 800;
                    padding: 0.05em 0.08em 0 0;
                    color: #0a2e22;
                }
            `}</style>
        </article>
    );
}

function ShareButton({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C9A15A]/40 text-[#0A2E22] bg-white hover:bg-[#0A2E22] hover:text-[#EFE6CE] transition-colors text-[10px] font-bold"
            aria-label={`Share on ${label}`}
        >
            {label[0]}
        </a>
    );
}
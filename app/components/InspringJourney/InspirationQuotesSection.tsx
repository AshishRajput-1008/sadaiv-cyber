"use client";

import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "@/lib/Types/types";
import { articleHref, formatDate, imageSrc, stripHtml } from "@/utils/Utils";

const EN = "font-[family-name:var(--font-nunito)]";

const IconPin = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
        <circle cx="12" cy="9" r="4" />
        <path d="M12 13v8" />
    </svg>
);

// stripHtml only removes tags — leftover entities like &#39; &amp; &quot;
// &nbsp; still show up raw in the source feed. Decode them here so the
// quote reads as clean text instead of showing HTML-entity artifacts.
function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#0*39;|&apos;/g, "'")
        .replace(/&#0*34;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/\s+/g, " ")
        .trim();
}

export default function InspirationQuotesSection({
    items,
    viewAllHref = "/InspringJourneys/",
}: {
    items: NewsItem[];
    viewAllHref?: string;
}) {
    const entries = items.slice(0, 9);

    return (
        <section className="relative overflow-hidden bg-[#F5F1E4]">
            {/* soft paper grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                    backgroundImage: "radial-gradient(circle, #0A2E22 0.6px, transparent 0.6px)",
                    backgroundSize: "16px 16px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent)",
                    opacity: 0.03,
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(201,161,90,0.10),transparent_65%)]" />

            <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-6xl mx-auto">
                {/* header */}
                <div className="text-center mb-14 sm:mb-16">
                    <span
                        className={`${EN} inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#8A6531]`}
                    >
                        Pearls of Inspiration
                    </span>
                    <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-[#122E22] tracking-tight">
                        प्रेरणा के मोती
                    </h2>
                    <p className={`${EN} mt-2 text-sm sm:text-base italic text-[#8A6531]`}>Inspirational Quotes</p>
                    <p className="mt-4 text-sm text-[#5B655F] max-w-md mx-auto leading-relaxed">
                        छोटे-छोटे शब्द, बड़ा हौसला — हर दिन साथ रखने लायक विचार।
                    </p>
                </div>

                {/* postcard wall — masonry via CSS columns */}
                {entries.length === 0 ? (
                    <p className="text-center text-sm text-[#6B756E] py-16">
                        फिलहाल कोई प्रेरणादायक विचार उपलब्ध नहीं है।
                    </p>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
                        {entries.map((item, i) => {
                            const src = imageSrc(item);
                            const quoteText = decodeHtmlEntities(
                                stripHtml(item.newsDetails, 150) || item.newsHeading,
                            );

                            // Mobile: alternate the corner photo left/right by index so
                            // consecutive cards don't all echo the same silhouette.
                            // sm and up: always settle on the bottom-right (consistent grid feel).
                            const isEven = i % 2 === 0;
                            const cornerPositionClass = isEven
                                ? "-bottom-3 -left-3 sm:left-auto sm:-right-3"
                                : "-bottom-3 -right-3";

                            return (
                                <Link
                                    key={item.newsId}
                                    href={articleHref(item)}
                                    className="group relative block mb-6 break-inside-avoid rounded-[4px] bg-[#FFFDF6] border border-[#0A2E22]/10 shadow-[0_10px_24px_rgba(10,46,34,0.10)] hover:shadow-[0_18px_36px_rgba(10,46,34,0.18)] p-6 sm:p-7 pt-9 pb-14 hover:-translate-y-1 transition-all duration-400 ease-out"
                                >
                                    {/* pin */}
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-[#C9A15A] text-[#0A2E22] shadow-[0_3px_8px_rgba(0,0,0,0.25)] ring-4 ring-[#F5F1E4]">
                                        {IconPin}
                                    </span>

                                    {/* oversized background glyph */}
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute -top-2 -left-1 text-[80px] sm:text-[96px] font-black leading-none text-[#0A2E22]/[0.05] select-none"
                                    >
                                        “
                                    </span>

                                    <div className="relative">
                                        <span
                                            className={`${EN} inline-block text-[9.5px] font-bold tracking-[0.14em] uppercase text-[#8A6531] mb-3`}
                                        >
                                            {item.subCatNameInHindi || "विचार"}
                                        </span>

                                        <p className="text-[15px] sm:text-base font-semibold text-[#122E22] leading-relaxed">
                                            {quoteText}
                                        </p>

                                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-dashed border-[#0A2E22]/15">
                                            <span
                                                className={`${EN} text-[11px] font-bold tracking-wide text-[#8A6531]`}
                                            >
                                                — और पढ़ें
                                            </span>
                                            <span className={`${EN} text-[10px] text-[#9CA69E] mr-2`}>
                                                {formatDate(item.updatedDate)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* corner photo — always visible, position alternates on mobile */}
                                    {src && (
                                        <div
                                            className={`absolute ${cornerPositionClass} w-12 h-12 rounded-full overflow-hidden ring-4 ring-[#F5F1E4] shadow-[0_4px_10px_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.28)] transition-all duration-300`}
                                        >
                                            <Image
                                                src={src}
                                                alt={item.newsHeading}
                                                fill
                                                unoptimized
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}

                {entries.length > 0 && (
                    <div className="flex justify-center mt-10">
                        <Link
                            href={viewAllHref}
                            className={`${EN} inline-flex items-center gap-2 rounded-full border border-[#0A2E22]/20 px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#122E22] bg-white hover:bg-[#0A2E22] hover:text-[#EFE6CE] hover:border-[#0A2E22] transition-all duration-300 shadow-[0_4px_14px_rgba(10,46,34,0.06)]`}
                        >
                            सभी विचार देखें — View All Quotes
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
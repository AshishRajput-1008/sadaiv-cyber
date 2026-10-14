"use client";

import Link from "next/link";
import Image from "next/image";
import type { NewsItem } from "@/lib/Types/types";
import { articleHref, formatDate, imageSrc, stripHtml } from "@/utils/Utils";

const EN = "font-[family-name:var(--font-nunito)]";

const IconLaurel = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-4 h-4">
        <path d="M12 4v16" />
        <path d="M12 6c-2 1-3.5 3-3.5 5.5S10 15 12 15M12 6c2 1 3.5 3 3.5 5.5S14 15 12 15M12 9c-1.4.7-2.3 1.9-2.3 3.3M12 9c1.4.7 2.3 1.9 2.3 3.3" />
        <path d="M9 18.5c1 .8 2 1.2 3 1.2s2-.4 3-1.2" />
    </svg>
);

const IconMedal = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-3.5 h-3.5">
        <circle cx="12" cy="14" r="5" />
        <path d="M9.5 9.5L7 3M14.5 9.5L17 3" />
        <path d="M10.5 14l1 1.3L14 12" />
    </svg>
);

const IconArrow = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
);

export default function SuccessStoriesSection({
    items,
    viewAllHref = "#",
}: {
    items: NewsItem[];
    viewAllHref?: string;
}) {
    const [featured, ...rest] = items;
    const rail = rest.slice(0, 12);
    const featuredSrc = featured ? imageSrc(featured) : null;

    return (
        <section className="relative overflow-hidden bg-[#081F17]">
            {/* museum-wall spotlight lighting, not a flat gradient */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(201,161,90,0.14),transparent_42%),radial-gradient(circle_at_82%_8%,rgba(201,161,90,0.10),transparent_38%),radial-gradient(circle_at_50%_95%,rgba(201,161,90,0.08),transparent_45%)]" />
            <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/40 to-transparent" />

            <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-6xl mx-auto">
                {/* header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span
                        className={`${EN} inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#D8B872]`}
                    >
                        <span className="text-[#C9A15A]">{IconLaurel}</span>
                        Hall of Honour
                    </span>
                    <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-[#F6F1E4] tracking-tight">
                        सम्मान की दीवार
                    </h2>
                    <p className={`${EN} mt-2 text-sm sm:text-base italic text-[#C9A15A]`}>Success Stories</p>
                </div>

                {featured ? (
                    <>
                        {/* editorial feature spread */}
                        <div className="grid md:grid-cols-[1.05fr_1fr] gap-8 md:gap-12 items-center">
                            <Link
                                href={articleHref(featured)}
                                className="group relative block"
                                aria-label={featured.newsHeading}
                            >
                                {/* museum double-frame */}
                                <div className="relative p-2.5 rounded-[6px] border border-[#C9A15A]/50">
                                    <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden border border-[#C9A15A]/25">
                                        {featuredSrc && (
                                            <Image
                                                src={featuredSrc}
                                                alt={featured.newsHeading}
                                                fill
                                                unoptimized
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority
                                                className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    </div>
                                </div>
                                {/* corner plaque */}
                                <span
                                    className={`${EN} absolute -bottom-3 left-6 inline-flex items-center gap-1.5 bg-[#C9A15A] text-[#0A2E22] text-[10px] font-extrabold uppercase tracking-[0.12em] px-3 py-1.5 rounded-sm shadow-[0_6px_16px_rgba(0,0,0,0.35)]`}
                                >
                                    {IconMedal} विशेष सम्मान
                                </span>
                            </Link>

                            <div>
                                <span
                                    className={`${EN} inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-[#8FA79A] mb-3`}
                                >
                                    फीचर्ड कहानी • Featured Story
                                </span>
                                <Link href={articleHref(featured)} className="group block">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F6F1E4] leading-snug group-hover:text-white transition-colors">
                                        {featured.newsHeading}
                                    </h3>
                                </Link>
                                <p className="text-sm text-[#B8C6BC] mt-4 leading-relaxed line-clamp-3">
                                    {stripHtml(featured.newsDetails, 180)}
                                </p>
                                <div className="flex items-center gap-4 mt-6 text-[11px] text-[#8FA79A]">
                                    <span>{formatDate(featured.updatedDate)}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#8FA79A]/50" />
                                    <span>{featured.subCatNameInHindi || "उपलब्धि"}</span>
                                </div>
                                <Link
                                    href={articleHref(featured)}
                                    className={`${EN} inline-flex items-center gap-2 mt-6 text-xs sm:text-sm font-bold tracking-wide text-[#0A2E22] bg-[#C9A15A] hover:bg-[#D8B872] px-5 py-2.5 rounded-full transition-colors duration-300`}
                                >
                                    पूरी कहानी पढ़ें {IconArrow}
                                </Link>
                            </div>
                        </div>

                        {/* medallion rail — portraits hung on a picture wire */}
                        {rail.length > 0 && (
                            <div className="mt-16 sm:mt-20">
                                <p
                                    className={`${EN} text-center text-[10px] font-bold tracking-[0.22em] uppercase text-[#8FA79A] mb-8`}
                                >
                                    और सम्मानित कहानियां • More Honoured Stories
                                </p>

                                <div className="relative">
                                    <span className="pointer-events-none absolute top-[42px] sm:top-[50px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/45 to-transparent" />

                                    <div className="honour-rail flex gap-7 sm:gap-9 overflow-x-auto pb-3 px-1 snap-x snap-proximity">
                                        {rail.map((item) => {
                                            const src = imageSrc(item);
                                            return (
                                                <Link
                                                    key={item.newsId}
                                                    href={articleHref(item)}
                                                    className="group shrink-0 snap-start flex flex-col items-center w-24 sm:w-28"
                                                >
                                                    <div className="relative w-[84px] h-[84px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden ring-[3px] ring-[#C9A15A]/60 group-hover:ring-[#C9A15A] shadow-[0_10px_24px_rgba(0,0,0,0.35)] group-hover:-translate-y-2.5 transition-all duration-400 ease-out bg-[#0F4432]">
                                                        {src && (
                                                            <Image
                                                                src={src}
                                                                alt={item.newsHeading}
                                                                fill
                                                                unoptimized
                                                                sizes="100px"
                                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        )}
                                                    </div>
                                                    <p className="mt-3 text-[11px] sm:text-xs font-semibold text-[#E3E9E1] text-center leading-snug line-clamp-2 group-hover:text-white transition-colors">
                                                        {item.newsHeading}
                                                    </p>
                                                    <span className={`${EN} mt-1 text-[9.5px] text-[#8FA79A]`}>
                                                        {formatDate(item.updatedDate)}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-sm text-[#9FB3A6] py-16">
                        फिलहाल कोई सफलता की कहानी उपलब्ध नहीं है।
                    </p>
                )}

                {items.length > 0 && (
                    <div className="flex justify-center mt-14">
                        <Link
                            href={viewAllHref}
                            className={`${EN} inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/40 px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#EFE6CE] hover:bg-[#C9A15A] hover:text-[#0A2E22] hover:border-[#C9A15A] transition-all duration-300`}
                        >
                            पूरा संग्रह देखें — View Full Collection
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                .honour-rail {
                    scrollbar-width: none;
                }
                .honour-rail::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
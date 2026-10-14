"use client";

import { useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/lib/Types/types";
import { formatDate, imageSrc, isGif, videoSrc } from "@/utils/Utils";

const IconPlay = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6 4l14 8-14 8V4z" />
    </svg>
);

const IconClose = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

const IconChevron = ({ dir }: { dir: "up" | "down" | "left" | "right" }) => {
    const rotation = { up: 0, right: 90, down: 180, left: 270 }[dir];
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-5 h-5"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <path d="M18 15l-6-6-6 6" />
        </svg>
    );
};

const IconVolume = ({ muted }: { muted: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M4 9v6h4l5 4V5L8 9H4z" />
        {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17.5 8.5a5 5 0 010 7" />}
    </svg>
);

/** Grid trigger button + panel. Renders nothing if there's no video/gif content. */
export default function VideoGallery({ items }: { items: NewsItem[] }) {
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (items.length === 0) return null;

    return (
        <>
            <button
                onClick={() => setPanelOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[#0F4432] to-[#0A2E22] text-[#EFE6CE] pl-3 pr-5 py-2.5 text-xs sm:text-sm font-semibold shadow-[0_8px_20px_rgba(10,46,34,0.30)] hover:from-[#125036] hover:to-[#0C3527] transition-colors"
            >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#C9A15A]/25 text-[#D8B872]">
                    {IconPlay}
                </span>
                वीडियो गैलरी देखें
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#C9A15A] text-[#0A2E22] text-[10px] font-bold">
                    {items.length}
                </span>
            </button>

            {panelOpen && (
                <GalleryPanel
                    items={items}
                    onClose={() => setPanelOpen(false)}
                    onSelect={(i) => setActiveIndex(i)}
                />
            )}

            {activeIndex !== null && (
                <Player items={items} startIndex={activeIndex} onClose={() => setActiveIndex(null)} />
            )}
        </>
    );
}

function GalleryPanel({
    items,
    onClose,
    onSelect,
}: {
    items: NewsItem[];
    onClose: () => void;
    onSelect: (i: number) => void;
}) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[70] bg-gradient-to-b from-[#0A2E22] to-[#071F17] backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-[#C9A15A]/20">
                <div>
                    <h3 className="text-[#F6F1E4] font-semibold text-lg sm:text-xl">वीडियो गैलरी</h3>
                    <p className="text-[#9FB3A6] text-xs mt-0.5">{items.length} वीडियो / GIF उपलब्ध</p>
                </div>
                <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#EFE6CE] flex items-center justify-center transition-colors border border-[#C9A15A]/25"
                    aria-label="बंद करें"
                >
                    {IconClose}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {items.map((item, idx) => (
                        <button
                            key={item.newsId}
                            onClick={() => onSelect(idx)}
                            className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-white/[0.03] border border-[#C9A15A]/15 hover:border-[#C9A15A]/70 transition-colors text-left"
                        >
                            {imageSrc(item) && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={imageSrc(item)}
                                    alt={item.newsHeading}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span className="w-10 h-10 rounded-full bg-[#F6F1E4]/95 text-[#0A2E22] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {IconPlay}
                                </span>
                            </span>
                            <span className="absolute bottom-2 left-2 right-2 text-[#F6F1E4] text-[11px] font-medium line-clamp-2 leading-snug">
                                {item.newsHeading}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Desktop: centered modal, one video at a time, prev/next arrows.
 * Mobile (<768px): full-screen vertical reels — native scroll-snap gives
 * the swipe-up/down feel without extra gesture libraries.
 */
function Player({
    items,
    startIndex,
    onClose,
}: {
    items: NewsItem[];
    startIndex: number;
    onClose: () => void;
}) {
    const [index, setIndex] = useState(startIndex);
    const [muted, setMuted] = useState(true);
    const reelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Keep the mobile reel scrolled to the item opened from the grid.
    useEffect(() => {
        const node = reelRef.current;
        if (!node) return;
        const child = node.children[startIndex] as HTMLElement | undefined;
        child?.scrollIntoView({ block: "start" });
    }, [startIndex]);

    const goTo = (next: number) => {
        if (next < 0 || next >= items.length) return;
        setIndex(next);
    };

    const active = items[index];

    return (
        <div className="fixed inset-0 z-[80] bg-black">
            {/* Desktop modal */}
            <div className="hidden md:flex h-full items-center justify-center px-16">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#EFE6CE] flex items-center justify-center border border-[#C9A15A]/25"
                    aria-label="बंद करें"
                >
                    {IconClose}
                </button>

                <button
                    onClick={() => goTo(index - 1)}
                    disabled={index === 0}
                    className="absolute left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-[#EFE6CE] flex items-center justify-center border border-[#C9A15A]/25"
                    aria-label="पिछला"
                >
                    <IconChevron dir="left" />
                </button>
                <button
                    onClick={() => goTo(index + 1)}
                    disabled={index === items.length - 1}
                    className="absolute right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-[#EFE6CE] flex items-center justify-center border border-[#C9A15A]/25"
                    aria-label="अगला"
                >
                    <IconChevron dir="right" />
                </button>

                <div className="w-full max-w-3xl">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0A2E22] border border-[#C9A15A]/25">
                        <MediaPlayer item={active} muted={muted} autoFocus />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-[#F6F1E4] font-semibold text-base leading-snug">
                                {active.newsHeading}
                            </h3>
                            <p className="text-[#9FB3A6] text-xs mt-1">
                                {formatDate(active.updatedDate)} • {index + 1}/{items.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile reels */}
            <div className="md:hidden h-full">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-[#EFE6CE] flex items-center justify-center"
                    aria-label="बंद करें"
                >
                    {IconClose}
                </button>
                <div
                    ref={reelRef}
                    className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
                    style={{ scrollSnapType: "y mandatory" }}
                >
                    {items.map((item) => (
                        <div
                            key={item.newsId}
                            className="relative h-full w-full snap-start flex items-center justify-center bg-black"
                            style={{ scrollSnapAlign: "start", height: "100dvh" }}
                        >
                            <MediaPlayer item={item} muted={muted} fill />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 pb-8">
                                <p className="text-[#F6F1E4] font-medium text-sm leading-snug line-clamp-2">
                                    {item.newsHeading}
                                </p>
                                <p className="text-[#CBD6CE] text-[11px] mt-1">{formatDate(item.updatedDate)}</p>
                            </div>
                            <button
                                onClick={() => setMuted((m) => !m)}
                                className="absolute bottom-24 right-4 w-10 h-10 rounded-full bg-white/15 text-[#EFE6CE] flex items-center justify-center"
                                aria-label="ध्वनि टॉगल करें"
                            >
                                <IconVolume muted={muted} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="absolute top-4 left-4 z-10 text-[#D8B872]/90 text-[11px] flex items-center gap-1.5">
                    <IconChevron dir="up" />
                    स्वाइप करें
                </div>
            </div>
        </div>
    );
}

function MediaPlayer({
    item,
    muted,
    fill,
    autoFocus,
}: {
    item: NewsItem;
    muted: boolean;
    fill?: boolean;
    autoFocus?: boolean;
}) {
    const src = videoSrc(item);

    if (isGif(item)) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src || imageSrc(item)}
                alt={item.newsHeading}
                className={fill ? "absolute inset-0 w-full h-full object-cover" : "w-full h-full object-contain"}
            />
        );
    }

    return (
        <video
            key={item.newsId}
            src={src}
            poster={imageSrc(item)}
            autoPlay
            muted={muted}
            loop
            playsInline
            controls={!fill}
            className={fill ? "absolute inset-0 w-full h-full object-cover" : "w-full h-full object-contain"}
            autoFocus={autoFocus}
        />
    );
}
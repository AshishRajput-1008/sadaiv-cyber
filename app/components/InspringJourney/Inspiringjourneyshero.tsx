import type { NewsItem } from "@/lib/Types/types";
import { isVideoContent } from "@/utils/Utils";

const EN = "font-[family-name:var(--font-nunito)]";

function BadgePill({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <span
            className={`${EN} inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/35 bg-white/[0.05] px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wide text-[#EFE6CE] backdrop-blur-sm`}
        >
            <span className="text-[#D8B872]">{icon}</span>
            {label}
        </span>
    );
}

const IconSpark = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
        <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="3.2" />
    </svg>
);

const IconShieldCheck = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
        <path d="M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
);

const IconUsers = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
        <circle cx="9" cy="8" r="3" />
        <path d="M2.5 19c1-3.3 3.4-5 6.5-5s5.5 1.7 6.5 5" />
        <circle cx="17.5" cy="9" r="2.3" />
        <path d="M15.5 14.2c2.4.4 4 1.9 4.8 4.8" />
    </svg>
);

const IconTrendingUp = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
        <path d="M3 17l6-6 4 4 7-8" />
        <path d="M15 7h5v5" />
    </svg>
);

const IconPlay = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
        <path d="M6 4l14 8-14 8V4z" />
    </svg>
);

export default function InspiringJourneysHero({
    tickerItems,
}: {
    tickerItems: NewsItem[];
}) {
    const tickerText =
        tickerItems.length > 0
            ? tickerItems
            : [{ newsId: 0, newsHeading: "प्रेरणादायक कहानियां जल्द उपलब्ध होंगी" } as NewsItem];

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2E22] via-[#0C3527] to-[#0A2E22] pt-28 md:pt-[70px]">
            {/* fine gold foil dot texture — reads as textile/pressed metal rather than a generic grid */}
            <div
                className="pointer-events-none absolute inset-0 "
                style={{
                    backgroundImage: "radial-gradient(circle, #C9A15A 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                    maskImage: "radial-gradient(ellipse 75% 65% at 50% 15%, black, transparent)",
                    opacity: 0.09,
                }}
            />
            {/* layered light: gold crown glow, deep base vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,161,90,0.16),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_110%,rgba(0,0,0,0.35),transparent_60%)]" />
            {/* hairline top edge — a jewel-case seam */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/50 to-transparent" />

            <div className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 max-w-5xl mx-auto text-center">
                <span
                    className={`${EN} inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/45 px-4 py-1.5 text-[10.5px] sm:text-xs font-bold tracking-[0.24em] text-[#D8B872] uppercase`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8B872]" />
                    Sadaiv Yuva Foundation
                </span>

                <h1 className={`${EN} mt-7 leading-[1.05] tracking-tight`}>
                    <span className="block text-[2.7rem] sm:text-6xl lg:text-7xl font-extrabold text-[#F6F1E4]">
                        Inspiring
                    </span>
                    <span className="block text-[2.7rem] sm:text-6xl lg:text-7xl font-extrabold italic mt-1 text-transparent bg-clip-text bg-gradient-to-b from-[#F3DFAE] to-[#C9A15A]">
                        Journeys
                    </span>
                </h1>

                <p className={`${EN} mt-5 text-[12.5px] sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#9FB3A6]`}>
                    Real Stories of Change
                </p>

                <p className="mt-6 text-sm sm:text-base text-[#CBD6CE] max-w-2xl mx-auto leading-relaxed">
                    असली लोगों की असली कहानियां — संघर्ष, करियर और यूथ लीडरशिप से जुड़ी
                    प्रेरणादायक यात्राएं, जो हर कदम पर हौसला देती हैं।
                </p>

                {/* medallion divider — a small emblem rather than a bare icon */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A15A]/60" />
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#C9A15A]/50 bg-white/[0.03]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#D8B872" strokeWidth={1.5} className="w-4.5 h-4.5">
                            <path d="M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3z" />
                        </svg>
                    </span>
                    <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A15A]/60" />
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                    <BadgePill icon={IconSpark} label="Real Stories" />
                    <BadgePill icon={IconShieldCheck} label="Verified Voices" />
                    <BadgePill icon={IconUsers} label="Youth Leadership" />
                    <BadgePill icon={IconTrendingUp} label="Career Growth" />
                </div>
            </div>

            {/* Floating press dock — ticker + attribution housed in one elevated panel */}
            <div className="relative px-4 sm:px-6 lg:px-8 pb-9 sm:pb-11 max-w-5xl mx-auto">
                <div className="rounded-2xl border border-[#C9A15A]/25 bg-black/25 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden">
                    <div className="flex items-stretch">
                        <div
                            className={`${EN} flex-shrink-0 flex items-center gap-2 bg-[#C9A15A] text-[#0A2E22] text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] px-3.5 sm:px-5`}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2E22] animate-pulse" />
                            ताज़ा प्रेरणा
                        </div>
                        <div className="relative flex-1 overflow-hidden py-3">
                            <div className="journeys-marquee flex items-center gap-10 whitespace-nowrap text-xs sm:text-sm text-[#E3E9E1] pr-10">
                                {[...tickerText, ...tickerText].map((item, idx) => (
                                    <span key={`${item.newsId}-${idx}`} className="flex items-center gap-2">
                                        {isVideoContent(item) && (
                                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C9A15A] text-[#0A2E22] shrink-0">
                                                {IconPlay}
                                            </span>
                                        )}
                                        {item.newsHeading}
                                        <span className="text-[#C9A15A]/80">•</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Powered by / media partner attribution */}
                    <div className="border-t border-[#C9A15A]/15 bg-black/20 px-4 py-2.5 text-center">
                        <p className={`${EN} text-[9.5px] sm:text-[10.5px] font-medium tracking-[0.1em] text-[#9FB3A6]`}>
                            <span className="mx-2 text-[#C9A15A]">✦</span>
                            MEDIA PARTNER:{" "}
                            <span className="font-bold text-[#E7CE97]">
                                SADAIV SATYA BROADCASTING PRIVATE LIMITED
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .journeys-marquee {
                    animation: journeys-scroll 32s linear infinite;
                }
                .journeys-marquee:hover {
                    animation-play-state: paused;
                }
                @keyframes journeys-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
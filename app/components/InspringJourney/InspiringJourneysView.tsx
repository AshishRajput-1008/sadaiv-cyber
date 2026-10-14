"use client";

import InspiringJourneysHero from "@/app/components/InspringJourney/Inspiringjourneyshero";
import InspiringJourneysClient from "@/app/components/InspringJourney/Inspiringjourneysclient";
import SuccessStoriesSection from "@/app/components/InspringJourney/SuccessStoriesSection";
import InspirationQuotesSection from "@/app/components/InspringJourney/InspirationQuotesSection";
import type { JourneyTabConfig, NewsItem, TabDataMap } from "@/lib/Types/types";
import { notoDevanagari, nunitoSans } from "@/lib/Fonts";

function getTabItems(tabs: JourneyTabConfig[], tabData: TabDataMap, labelEn: string): NewsItem[] {
    const tab = tabs.find((t) => t.labelEn.trim().toLowerCase() === labelEn);
    return tab ? tabData[tab.key] ?? [] : [];
}

export default function InspiringJourneysView({
    tabs,
    tabData,
    tickerItems,
    loading,
}: {
    tabs: JourneyTabConfig[];
    tabData: TabDataMap;
    tickerItems: NewsItem[];
    loading: boolean;
}) {
    const successStories = getTabItems(tabs, tabData, "success stories");
    const inspirationQuotes = getTabItems(tabs, tabData, "inspirational quotes");

    return (
        <main
            className={`${notoDevanagari.variable} ${nunitoSans.variable} font-[family-name:var(--font-devanagari)] bg-[#F5F7F2]`}
        >
            <InspiringJourneysHero tickerItems={tickerItems} />
            {loading ? (
                <div className="flex items-center justify-center py-24 text-sm text-[#6B756E]">
                    लोड हो रहा है...
                </div>
            ) : (
                <>
                    <InspiringJourneysClient tabs={tabs} tabData={tabData} />
                    <SuccessStoriesSection items={successStories} />
                    <InspirationQuotesSection items={inspirationQuotes} />
                </>
            )}
        </main>
    );
}
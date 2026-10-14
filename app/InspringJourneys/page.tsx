"use client";

import { useEffect, useState } from "react";
import {
    getJourneySubCategories,
    getSubCategoryArticles,
    getCategoryArticles,
    toSlug,
} from "@/lib/news-api";
import InspiringJourneysView from "@/app/components/InspringJourney/InspiringJourneysView";
import {
    JOURNEY_CATEGORY,
    JOURNEY_PAGE_SIZE,
    JOURNEY_ALL_TAB_KEY,
    type JourneyTabConfig,
    type NewsItem,
    type TabDataMap,
} from "@/lib/Types/types";

export default function InspiringJourneysPage() {
    const [tabs, setTabs] = useState<JourneyTabConfig[]>([]);
    const [tabData, setTabData] = useState<TabDataMap>({});
    const [tickerItems, setTickerItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadEverything() {
            setLoading(true);

            // Step 1 — discover subcategories dynamically for this category.
            const subcats = await getJourneySubCategories(JOURNEY_CATEGORY);
            if (cancelled) return;

            const nextTabs: JourneyTabConfig[] = subcats.map((s) => ({
                key: toSlug(s.subCat_Name),
                label: s.nameinHindi,
                labelEn: s.subCat_Name,
                apiCategory: s.cat_Name,
                apiSubCategory: s.subCat_Name,
            }));
            setTabs(nextTabs);

            if (nextTabs.length === 0) {
                setTabData({});
                setTickerItems([]);
                setLoading(false);
                return;
            }

            // Step 2 — fetch page 1 for the merged "All" tab AND every
            // subcategory tab, in parallel.
            const results = await Promise.allSettled([
                getCategoryArticles(JOURNEY_CATEGORY, 1, JOURNEY_PAGE_SIZE),
                ...nextTabs.map((t) =>
                    getSubCategoryArticles(t.apiCategory, t.apiSubCategory, 1, JOURNEY_PAGE_SIZE),
                ),
            ]);

            if (cancelled) return;

            const [allResult, ...subResults] = results;

            const nextTabData: TabDataMap = {};
            nextTabData[JOURNEY_ALL_TAB_KEY] =
                allResult.status === "fulfilled" ? (allResult.value as NewsItem[]) : [];

            nextTabs.forEach((t, i) => {
                const r = subResults[i];
                nextTabData[t.key] = r.status === "fulfilled" ? (r.value as NewsItem[]) : [];
            });

            const nextTicker = [...nextTabData[JOURNEY_ALL_TAB_KEY]]
                .sort(
                    (a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime(),
                )
                .slice(0, 8);

            setTabData(nextTabData);
            setTickerItems(nextTicker);
            setLoading(false);
        }

        loadEverything();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <InspiringJourneysView
            tabs={tabs}
            tabData={tabData}
            tickerItems={tickerItems}
            loading={loading}
        />
    );
}
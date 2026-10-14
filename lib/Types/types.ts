// lib/Types/types.ts





// Exact category/subcategory strings your API expects (confirmed from your
// curl calls). The last two entries are PLACEHOLDERS — swap apiCategory/
// apiSubCategory for the real values once confirmed; everything else
// (tabs, grid, video gallery) already loops over this array automatically.
export const JOURNEY_TABS: JourneyTabConfig[] = [
    {
        key: "career-motivation",
        label: "करियर मोटिवेशन",
        labelEn: "Career Motivation",
        apiCategory: "Motivational Effort",
        apiSubCategory: "Career Motivation",
    },
    {
        key: "success-stories",
        label: "सफलता की कहानियां",
        labelEn: "Success Stories",
        apiCategory: "Motivational Effort",
        apiSubCategory: "Success Stories",
    },
    {
        key: "youth-motivation",
        label: "यूथ मोटिवेशन",
        labelEn: "Youth Motivation",
        apiCategory: "Motivational Effort",
        apiSubCategory: "Youth Motivation",
    },
    {
        key: "community-impact",
        label: "समाज सेवा",
        labelEn: "Community Impact",
        apiCategory: "Motivational Effort", // TODO: confirm real apiCategory
        apiSubCategory: "Community Impact", // TODO: confirm real apiSubCategory
    },
    {
        key: "women-empowerment",
        label: "महिला सशक्तिकरण",
        labelEn: "Women Empowerment",
        apiCategory: "Motivational Effort", // TODO: confirm real apiCategory
        apiSubCategory: "Women Empowerment", // TODO: confirm real apiSubCategory
    },
];

// lib/Types/types.ts

export type NewsItem = {
    newsId: number;
    newsTag: string;
    newsHeading: string;
    newsHeadingTwo: string;
    newsDetails: string;
    newsCategory: string;
    newsSubCategory: string;
    newsSlug: string;
    thumbnail: string;
    dataType: string;
    videoUrl?: string;
    updatedDate: string;
    catNameInHindi: string;
    subCatNameInHindi: string;
    viewCount: number;
};

// Raw shape returned by /api/AdminApi/subcatsbycategory/{category}
export type SubCategoryApiItem = {
    nameinHindi: string;
    subCat_Name: string;
    cat_Name: string;
};

// Tab is now built dynamically from SubCategoryApiItem instead of being a
// hardcoded union. `key` is a slug derived from subCat_Name, used as the
// React key / active-tab id / data map key.

// Keyed by tab.key, plus the reserved "all" key for the merged/all-news tab.
export type TabDataMap = Record<string, NewsItem[]>;

// The category this whole page is scoped to. Used both for the
// subcategory-list endpoint and the "All" tab's getCategoryArticles call.
export const JOURNEY_CATEGORY = "Motivational Effort";

// Kept identical for initial load and every "Load More" click so page
// numbers line up with no gaps/overlaps (see Inspiringjourneysclient.tsx).
export const JOURNEY_PAGE_SIZE = 20;

export const JOURNEY_ALL_TAB_KEY = "all";


export type JourneyTabKey =
    | "success-stories"
    | "career-motivation"
    | "youth-motivation"
    | "community-impact"
    | "women-empowerment";

export type JourneyTabConfig = {
    key: JourneyTabKey;
    label: string;
    labelEn: string;
    apiCategory: string;
    apiSubCategory: string;
};
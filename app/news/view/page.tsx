// app/news/view/page.tsx
import { Suspense } from "react";
import NewsDetailClient from "@/app/components/NewsDetail/NewsDetailView";

// This is a single, statically-exported HTML file (/news/view/index.html).
// The actual article is chosen and fetched entirely in the browser based
// on the ?slug= query param — no server, no per-article build step needed.
export default function NewsViewPage() {
    return (
        <Suspense fallback={<NewsDetailFallback />}>
            <NewsDetailClient />
        </Suspense>
    );
}

function NewsDetailFallback() {
    return (
        <div className="min-h-screen bg-[#FAF7EF] px-4 sm:px-6 lg:px-8 py-12">
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
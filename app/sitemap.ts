import type { MetadataRoute } from "next";

export const dynamic = "force-static";   // ← add this line

const BASE = "https://sadaivcyber.com";

// ...the rest of your file stays exactly the same
const routes = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/AboutUs", priority: 0.8, freq: "monthly" },
  { path: "/CyberFraud", priority: 0.9, freq: "weekly" },
  { path: "/CyberLaw", priority: 0.8, freq: "monthly" },
  { path: "/CyberArticle", priority: 0.8, freq: "weekly" },
  { path: "/CyberNews", priority: 0.8, freq: "daily" },
  { path: "/SparkingStep", priority: 0.8, freq: "weekly" },
  { path: "/CyberWorkshop", priority: 0.8, freq: "monthly" },
  { path: "/CyberWorkshop/social", priority: 0.6, freq: "monthly" },
  { path: "/CyberWorkshop/individuals", priority: 0.6, freq: "monthly" },
  { path: "/InspringJourneys", priority: 0.6, freq: "monthly" },
  { path: "/CyberPodcasts", priority: 0.6, freq: "weekly" },
  { path: "/SocialWork", priority: 0.6, freq: "monthly" },
  { path: "/Collaborator", priority: 0.5, freq: "monthly" },
  { path: "/ContactUs", priority: 0.5, freq: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
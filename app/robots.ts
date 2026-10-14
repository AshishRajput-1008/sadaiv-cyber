import type { MetadataRoute } from "next";

export const dynamic = "force-static";   // ← add this line

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://sadaivcyber.com/sitemap.xml",
  };
}
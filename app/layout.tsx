import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  Plus_Jakarta_Sans,
  Nunito_Sans,
  JetBrains_Mono,
} from "next/font/google";

import cyberLogoH from "@/Assests/images/SADAIV CYBER Shield Logo-2.png";
import SiteHeader from "@/app/components/Header";
import LayoutFooter from "@/app/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ui",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/* ─── SEO CONSTANTS ─── */
const SITE_URL = "https://sadaivcyber.com";
const SITE_NAME = "Sadaiv Yuva Foundation";
const TITLE =
  "Sadaiv Yuva Foundation | Cyber Awareness & Cyber Fraud Prevention in India";
const DESCRIPTION =
  "Youth-led NGO in India (12A / 80G, CSR approved) running cyber awareness workshops, cyber fraud prevention, cyber law guidance and social welfare programs.";

// Used only for social share previews (WhatsApp, Facebook, LinkedIn, X).
// The browser tab icon comes from app/icon.png and app/apple-icon.png.
// Later, replace this with a 1200x630 image such as /og-image.jpg.
const LOGO = {
  url: cyberLogoH.src,
  width: cyberLogoH.width,
  height: cyberLogoH.height,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "cyber awareness India",
    "cyber fraud prevention",
    "UPI fraud",
    "OTP fraud",
    "cyber law India",
    "cyber security workshop",
    "NGO cyber safety",
    "Sadaiv Yuva Foundation",
    "Sadaiv Cyber",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Non-profit",

  // No `icons` block on purpose: Next.js automatically uses
  // app/icon.png (tab icon) and app/apple-icon.png (iPhone home screen).

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ ...LOGO, alt: "Sadaiv Cyber Shield – Sadaiv Yuva Foundation" }],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [LOGO.url],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Uncomment after you add the site in Google Search Console:
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_CODE" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1f33", // matches your header colour
};

/* ─── STRUCTURED DATA (JSON-LD) ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Sadaiv Cyber",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
      description: DESCRIPTION,
      areaServed: "IN",
      knowsAbout: [
        "Cyber awareness",
        "Cyber fraud prevention",
        "Cyber law",
        "Digital safety workshops",
      ],
      // Add your real profiles, for example:
      // sameAs: [
      //   "https://www.instagram.com/...",
      //   "https://www.youtube.com/@...",
      //   "https://www.linkedin.com/company/...",
      // ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${plusJakarta.variable} ${nunitoSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <SiteHeader />

        <main className="flex-1 pt-[var(--header-h)]">{children}</main>

        <LayoutFooter />
      </body>
    </html>
  );
}
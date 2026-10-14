import { Noto_Sans_Devanagari, Nunito_Sans } from "next/font/google";

// Hindi text (article headings, tabs, meta, UI copy) across the Inspiring
// Journeys section.
export const notoDevanagari = Noto_Sans_Devanagari({
    subsets: ["devanagari", "latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-devanagari",
    display: "swap",
});

// English text (brand headline, eyebrow labels, badges, attribution line).
export const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-nunito",
    display: "swap",
});
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/app/Footer";

export default function LayoutFooter() {
  const pathname = usePathname();

  // Hide footer on the home page
  if (pathname === "/") {
    return null;
  }

  return <Footer />;
}
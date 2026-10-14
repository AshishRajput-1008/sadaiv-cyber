"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ───────────────────────────────────────────────
   Google Translate Website Translator — React hook
   ───────────────────────────────────────────────
   This hook loads Google's official (free) website
   translator script once, mounts the required hidden
   container, and exposes a `changeLanguage(code)`
   function you can call from any button/dropdown.

   No API key required — this is the free
   "Google Translate Website Widget", the same one
   used by translate.google.com/manager-style embeds.
*/

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const GOOGLE_TRANSLATE_CONTAINER_ID = "google_translate_element";
const GOOGLE_TRANSLATE_COOKIE = "googtrans";

export function useGoogleTranslate(pageLanguage: string = "en") {
  const [isReady, setIsReady] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Hidden container Google Translate needs in the DOM
    if (!document.getElementById(GOOGLE_TRANSLATE_CONTAINER_ID)) {
      const container = document.createElement("div");
      container.id = GOOGLE_TRANSLATE_CONTAINER_ID;
      container.style.display = "none";
      document.body.appendChild(container);
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage,
            autoDisplay: false,
          },
          GOOGLE_TRANSLATE_CONTAINER_ID
        );
        setIsReady(true);
      }
    };

    // Avoid injecting the script twice across remounts/navigations
    const existingScript = document.querySelector(
      'script[src*="translate_a/element.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Script already present (e.g. fast refresh) — just re-run init
      window.googleTranslateElementInit?.();
    }
  }, [pageLanguage]);

  /**
   * Switches the page's translation language.
   * code: "en" to restore original, or a Google language code e.g. "hi", "mr"
   */
  const changeLanguage = useCallback(
    (code: string) => {
      if (code === pageLanguage) {
        // Restore original language by clearing the cookie
        document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        window.location.reload();
        return;
      }

      const cookieValue = `/${pageLanguage}/${code}`;
      // Set for current path and root path so it survives navigation
      document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=${cookieValue}; path=/;`;
      document.cookie = `${GOOGLE_TRANSLATE_COOKIE}=${cookieValue}; path=/; domain=${window.location.hostname}`;

      // If the widget is already initialized on this page, drive its
      // hidden <select> directly for an instant switch (no reload).
      const select = document.querySelector<HTMLSelectElement>(
        `#${GOOGLE_TRANSLATE_CONTAINER_ID} select.goog-te-combo`
      );
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event("change"));
      } else {
        // Widget not ready yet on this load — reload so the cookie takes effect
        window.location.reload();
      }
    },
    [pageLanguage]
  );

  return { isReady, changeLanguage };
}
'use client'

import { useEffect } from 'react'

export default function GTranslateWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const configScript = document.createElement('script')
    configScript.innerHTML = `
      window.gtranslateSettings = {
        default_language: "en",
        native_language_names: true,
        detect_browser_language: true,
        url_structure: "none",
        wrapper_selector: ".gtranslate_wrapper",
        languages: [
          "en", "hi", "te", "pa", "ml", 
          "ur", "bn", "gu", "kn", "ta"
        ]
      };
    `
    document.body.appendChild(configScript)

    const translateScript = document.createElement('script')
    translateScript.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js'
    translateScript.defer = true
    document.body.appendChild(translateScript)
  }, [])

  return (
    <div className="gtranslate_wrapper inline-block text-sm z-50">
      <style>{`
        .gtranslate_wrapper select {
          background-color: #f9fafb; /* Light grey background */
          color: #111827; /* Black text */
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease-in-out;
        }

        .gtranslate_wrapper select:hover {
          background-color: #e5e7eb;
        }

        .gtranslate_wrapper select:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  )
}

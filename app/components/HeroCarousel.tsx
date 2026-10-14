"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { StaticImageData } from "next/image";

export interface CarouselSlide {
  img: StaticImageData;
  alt: string;
}

const AUTOPLAY_DURATION = 5000;

const ChevLeftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function HeroCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      void progressRef.current.offsetWidth; // force reflow
      progressRef.current.style.transition = `width ${AUTOPLAY_DURATION}ms linear`;
      progressRef.current.style.width = "100%";
    }
  }, []);

  const goNext = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // Autoplay
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(goNext, AUTOPLAY_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goNext]);

  // Kick off progress bar on first mount
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      void progressRef.current.offsetWidth;
      progressRef.current.style.transition = `width ${AUTOPLAY_DURATION}ms linear`;
      progressRef.current.style.width = "100%";
    }
  }, []);

  // Swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? goNext() : goPrev());
  };

  return (
    <div
      className="relative isolate w-full overflow-hidden bg-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero image carousel"
    >
      {/* Track */}
      <div
        className="flex w-full items-start transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative w-full flex-[0_0_100%]"
            aria-hidden={i !== current}
          >
            <img src={slide.img.src} alt={slide.alt} className="block h-auto w-full" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3.5 top-1/2 z-[5] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-[#0a1423]/45 text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.06] hover:border-[#f0a500]/85 hover:bg-[#f0a500]/85 min-[545px]:flex md:left-6 md:h-[52px] md:w-[52px]"
      >
        <ChevLeftIcon />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3.5 top-1/2 z-[5] hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-[#0a1423]/45 text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.06] hover:border-[#f0a500]/85 hover:bg-[#f0a500]/85 min-[545px]:flex md:right-6 md:h-[52px] md:w-[52px]"
      >
        <ChevRightIcon />
      </button>

      {/* Dots */}
      {/* <div
        className="absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 md:bottom-5"
        role="tablist"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 cursor-pointer rounded-full border-none p-0 transition-all duration-300 ${
              i === current ? "w-7 bg-[#66b40b]" : "w-2 bg-white/45"
            }`}
          />
        ))}
      </div> */}

      {/* Progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 h-[3px] w-0 bg-[#66b40b]"
      />
    </div>
  );
}
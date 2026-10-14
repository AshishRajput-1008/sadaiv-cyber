"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  children: ReactNode
  autoPlay?: boolean
  autoPlayInterval?: number
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
  showDots?: boolean
  showArrows?: boolean
}

export function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Convert children to array
  const childrenArray = Array.isArray(children) ? children : [children]

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile)
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet)
      } else {
        setItemsToShow(itemsPerView.desktop)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsPerView])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && childrenArray.length > itemsToShow) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, childrenArray.length - itemsToShow)
          return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
      }, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, childrenArray.length, itemsToShow, isHovered])

  const maxIndex = Math.max(0, childrenArray.length - itemsToShow)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // If there's only one child or fewer items than itemsToShow, render without carousel functionality
  if (childrenArray.length <= itemsToShow) {
    return <div className="w-full">{children}</div>
  }

  return (
    <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div key={index} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsToShow}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && childrenArray.length > itemsToShow && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && childrenArray.length > itemsToShow && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

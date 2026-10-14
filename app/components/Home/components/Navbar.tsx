"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import GTranslateWidget from "./WeglotScript";

// Define menu items for the navbar
const menuItems = [
  { title: "Cyber Article", href: "/cybertips", dropdown: null },
  {
    title: "Sparking Step",
    href: "#",
    dropdown: [
      { title: "Current Sparking", href: "/currentsparking" },
      { title: "Sparking Overview", href: "/sparking-overview" },
    ],
  },
  {
    title: "Corporate Workshop",
    href: "#",
    dropdown: [
      { title: "Corporate", href: "/corporateworkshop" },
      { title: "Individuals", href: "/individualworkshop" },
      { title: "Social", href: "/socialworkshop" },
    ],
  },
  { title: "Cyber News", href: "/cybertalks", dropdown: null },
  { title: "Cyber Frauds", href: "/cyberfraud", dropdown: null },
  { title: "Media", href: "/blog", dropdown: null },
  { title: "Collaborations", href: "/collaborations", dropdown: null },
  { title: "Cyber Laws", href: "/cyberlaws", dropdown: null },
];

// Contact Button Component
const ContactButton = () => {
  return (
    <div className="inline-block">
      <Link
        href="/membership"
        aria-label="Contact Us"
        className="inline-flex items-center gap-2 lg:px-[10px] lg:py-[7px] text-xs font-sans font-bold rounded-sm shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200"
      >
        <ShieldCheck className="w-5 h-5" />
        <span className="leading-tight text-left">
          <span className="block">SADAIV CYBER</span>
          <span className="block text-xs opacity-80">MEMBERSHIP</span>
        </span>
      </Link>
    </div>
  );
};

// Dropdown Component
const Dropdown = ({
  items,
  isOpen,
  onClose,
  isMobile = false,
  onMobileMenuClose,
  parentRef,
}: {
  items: Array<{ title: string; href: string }>;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  onMobileMenuClose: () => void;
  parentRef?: React.RefObject<HTMLDivElement>;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking inside dropdown or parent element
      if (
        (dropdownRef.current && dropdownRef.current.contains(target)) ||
        (parentRef?.current && parentRef.current.contains(target))
      ) {
        return;
      }
      
      onClose();
    };

    if (isOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, isMobile, parentRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`
        ${isMobile
          ? "w-full bg-orange-50 rounded-md mt-2"
          : "absolute top-full left-0 mt-1 w-56 bg-white shadow-xl rounded-lg border border-orange-200/50 z-50"
        }
        py-2 animate-slideIn
      `}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`
            block px-4 py-2 text-sm transition-all duration-200
            ${isMobile
              ? "text-gray-700 hover:bg-orange-100 hover:text-orange-700"
              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
            }
          `}
          onClick={(e) => {
            console.log(`Navigating to: ${item.href}`);
            // Don't prevent default - let Next.js handle navigation
            setTimeout(() => {
              onClose();
              if (isMobile) {
                onMobileMenuClose();
              }
            }, 100);
          }}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [hoverDropdown, setHoverDropdown] = useState<number | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle resize events with debounce
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        const mobile = window.innerWidth <= 1024;
        console.log(`Is Mobile: ${mobile}`);
        setIsMobile(mobile);
        if (!mobile) {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  // Handle scroll events with debounce
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsAtTop(window.scrollY <= 10);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const toggleMobileMenu = () => {
    console.log(`Toggling Mobile Menu: ${!isMobileMenuOpen}`);
    setIsMobileMenuOpen((prev) => !prev);
    if (isMobileMenuOpen) setActiveDropdown(null);
  };

  const handleDesktopDropdown = (index: number, hasDropdown: boolean) => {
    if (!hasDropdown || isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    console.log(`Desktop Dropdown Open: ${index}`);
    setHoverDropdown(index);
  };

  const handleDesktopDropdownLeave = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      console.log("Desktop Dropdown Close");
      setHoverDropdown(null);
    }, 150);
  };

  const handleMobileDropdown = (index: number) => {
    if (!isMobile) return;
    console.log(`Mobile Dropdown Toggle: ${index}`);
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeDropdown = () => {
    console.log("Closing Dropdown");
    setActiveDropdown(null);
    setHoverDropdown(null);
  };

  const closeMobileMenu = () => {
    console.log("Closing Mobile Menu");
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const currentDropdown = isMobile ? activeDropdown : hoverDropdown;

  return (
    <>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(-12px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .mobile-menu-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
          transition: all 0.3s ease-in-out;
        }

        .mobile-dropdown {
          width: 100%;
          background: #fff;
          z-index: 10;
        }

        .desktop-dropdown {
          z-index: 50;
          pointer-events: auto;
        }

        .primary-navbar {
          transition: all 0.3s ease-in-out;
        }

        .mobile-menu-button {
          position: relative;
          z-index: 60;
          background: white;
          border-radius: 4px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          min-height: 40px;
          border: 1px solid #e5e7eb;
        }

        .mobile-menu-button:hover {
          background: #f97316;
          color: white;
        }

        .mobile-menu-button:active {
          transform: scale(0.95);
        }

        .dropdown-chevron {
          margin-left: 4px;
          flex-shrink: 0;
          width: 12px;
          height: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .nav-item {
          position: relative;
          z-index: 10;
        }

        .nav-item:hover {
          z-index: 20;
        }

        .separator {
          height: 24px;
          width: 2px;
          background-color: #f97316;
          opacity: 0.5;
        }
      `}</style>

      {/* Primary Navbar */}
      <header
        className={`primary-navbar text-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isAtTop ? "py-2 bg-transparent" : "py-1 shadow-lg bg-white"
        }`}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-16 flex flex-col items-center gap-2">
          {/* Title Section */}
          <div
            className={`${
              isMobile ? "flex flex-col" : "flex flex-wrap"
            } text-center pb-2 text-lg sm:text-2xl font-extrabold text-orange-600 justify-center items-center gap-2 lg:ml-[110px] lg:mb-[8px]`}
          >
            <span
              className={`${
                isAtTop ? "text-white" : "text-gray-700"
              } font-extrabold text-[12px] flex items-center gap-2`}
            >
              (12A / 80G / CSR FUND approved foundation)
            </span>
            <div className="flex items-center gap-2">
              <span className="border-l-2 border-orange-300 h-6"></span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 font-bold"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
              >
                SADAIV YUVA FOUNDATION
              </span>
              <span className="border-r-2 border-orange-300 h-6"></span>
            </div>
            <div className="relative">
              <button className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-bold py-[8px] px-[10px] rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50 active:scale-95">
                <Link href="/membership">
                  <div className="relative flex items-center space-x-3 font-extrabold tracking-wide cursor-pointer">
                    <span className="font-sans text-sm bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                      DONATE NOW
                    </span>
                  </div>
                </Link>
              </button>
            </div>
            <div><GTranslateWidget /></div>
          </div>

          {/* Navbar Row */}
          <div
            className={`w-full ${
              isMobile ? "flex justify-between items-center" : "-mt-6 flex justify-between items-center "
            }`}
          >
            {/* Logo and Mobile Menu Toggle */}
            <div
              className={`${
                isMobile ? "h-5 w-[5rem]" : "h-16 w-32"
              } -mt-24 sm:mt-0 flex items-center z-10 transition-all duration-300 `}
            >
              <Link href="/" aria-label="Foundation Home">
                <Image
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  src="/Sadaiv_logo.png"
                  alt="Foundation Cyber Logo"
                  width={isMobile ? 90 : 100}
                  height={isMobile ? 24 : 100}
                  priority
                />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                className="-mt-24 sm:mt-0 mobile-menu-button text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center items-center text-base font-medium gap-0">
              <div className="h-5 w-px bg-orange-500" />
              {menuItems.map((item, index) => (
                <div key={index} className="flex items-center h-full lg:ml-[9px]">
                  <div
                    ref={(el) => (dropdownRefs.current[index] = el)}
                    className="nav-item relative flex items-center"
                    onMouseEnter={() => handleDesktopDropdown(index, !!item.dropdown)}
                    onMouseLeave={() => handleDesktopDropdownLeave(index)}
                  >
                    {item.dropdown ? (
                      <div className="relative">
                        <button
                          className={`
                            flex items-center gap-1 px-2 py-2 text-sm font-semibold 
                            ${isAtTop ? "text-white" : "text-gray-800"} 
                            hover:text-orange-500 hover:bg-orange-50 rounded-md transition-all duration-200
                          `}
                          aria-label={item.title}
                          aria-haspopup="true"
                          aria-expanded={currentDropdown === index}
                        >
                          <span>{item.title}</span>
                          <span className="dropdown-chevron">
                            {currentDropdown === index ? (
                              <FaChevronUp className="transition-transform duration-300" />
                            ) : (
                              <FaChevronDown className="transition-transform duration-300" />
                            )}
                          </span>
                        </button>
                        <Dropdown
                          items={item.dropdown}
                          isOpen={currentDropdown === index}
                          onClose={closeDropdown}
                          isMobile={isMobile}
                          onMobileMenuClose={closeMobileMenu}
                          parentRef={dropdownRefs.current[index] ? { current: dropdownRefs.current[index] } : undefined}
                        />
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`
                          px-2 py-2 text-sm font-semibold 
                          ${isAtTop ? "text-white" : "text-gray-800"} 
                          hover:text-orange-500 hover:bg-orange-50 rounded-md transition-all duration-200
                        `}
                        aria-label={item.title}
                        onClick={() => console.log(`Navigating to: ${item.href}`)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                  <div className="h-5 w-px bg-orange-500 mx-2" />
                </div>
              ))}
            </nav>

            {/* Contact Button */}
            <div className="hidden lg:block">
              <ContactButton />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
      <div 
  className={`lg:hidden fixed inset-x-3 bg-white shadow-xl transition-all duration-300 ease-in-out ${
    isMobileMenuOpen ? "max-h-[calc(100vh-80px)] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
  }`}
  style={{ top: isMobile ? '76px' : '80px' }}
>
          <nav className="mobile-menu-nav py-4">
            {menuItems.map((item, index) => (
              <div key={index} className="w-full px-4">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleMobileDropdown(index)}
                      className={`
                        block w-full text-center py-3 text-base font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200 rounded-md hover:bg-orange-50
                        ${currentDropdown === index ? "text-orange-500 bg-orange-50" : ""}
                      `}
                      aria-label={item.title}
                      aria-expanded={currentDropdown === index}
                    >
                      <span className="flex justify-center items-center gap-2">
                        {item.title}
                        <span className="dropdown-chevron">
                          {currentDropdown === index ? (
                            <FaChevronUp className="transition-transform duration-300" />
                          ) : (
                            <FaChevronDown className="transition-transform duration-300" />
                          )}
                        </span>
                      </span>
                    </button>
                    <Dropdown
                      items={item.dropdown}
                      isOpen={currentDropdown === index}
                      onClose={closeDropdown}
                      isMobile={true}
                      onMobileMenuClose={closeMobileMenu}
                    />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      block text-center py-3 text-base font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200 rounded-md hover:bg-orange-50
                      ${item.href === "/" ? "text-orange-500 font-bold" : ""}
                    `}
                    aria-label={item.title}
                    onClick={() => {
                      console.log(`Navigating to: ${item.href}`);
                      closeMobileMenu();
                    }}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-4 py-4">
              <ContactButton />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
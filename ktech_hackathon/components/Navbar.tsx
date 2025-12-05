"use client";

import Link from "next/link";
import { AlignLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false); // Start with light/safe default

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Detect if background is dark or light based on scroll position
      // Check if we're on homepage with hero (path is "/") and not scrolled much
      const isHomePage = window.location.pathname === "/";
      const isInHeroSection = scrollY < 400;

      // Only show white text if on homepage AND in hero section
      setIsDarkBackground(isHomePage && isInHeroSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 sm:top-10 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] max-w-[1200px] z-50 transition-all duration-300">
      <motion.div
        className={`backdrop-blur-xl border shadow-lg px-2 sm:pl-4 transition-all duration-300 overflow-hidden ${
          isDarkBackground && !isScrolled
            ? "bg-white/10 border-white/30"
            : "bg-white/95 border-gray-200"
        }`}
        initial={false}
        animate={{
          borderRadius: isMenuOpen ? "24px" : "100px",
          paddingTop: isMenuOpen ? "16px" : "8px",
          paddingBottom: isMenuOpen ? "16px" : "8px",
        }}
        transition={{
          paddingTop: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
          paddingBottom: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
          borderRadius: {
            duration: 0.04,
            ease: [0.2, 0, 0.4, 1],
            delay: isMenuOpen ? 0.08 : 0, // Change radius after dropdown fully expands
          },
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img
              src="/logo.svg"
              alt="luxehaven"
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                href="#rooms"
                className={`text-sm font-medium transition-colors ${
                  isDarkBackground && !isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Rooms
              </Link>
              <Link
                href="#about"
                className={`text-sm font-medium transition-colors ${
                  isDarkBackground && !isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                About
              </Link>
              <Link
                href="#experiences"
                className={`text-sm font-medium transition-colors ${
                  isDarkBackground && !isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Experiences
              </Link>
            </div>
            <Button
              size="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 shadow-sm"
            >
              Reserve
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              ) : (
                <AlignLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Dropdown Menu - Expanded navbar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
              }}
              className="md:hidden"
            >
              <div className="flex flex-col gap-1 pt-6 pb-2">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <Link
                    href="#rooms"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-medium transition-colors py-3 px-4 rounded-xl ${
                      isDarkBackground && !isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Rooms
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 }}
                >
                  <Link
                    href="#about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-medium transition-colors py-3 px-4 rounded-xl ${
                      isDarkBackground && !isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.11 }}
                >
                  <Link
                    href="#experiences"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-medium transition-colors py-3 px-4 rounded-xl ${
                      isDarkBackground && !isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    Experiences
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.14 }}
                  className={`pt-2 mt-2 ${
                    isDarkBackground && !isScrolled
                      ? "border-t border-white/20"
                      : "border-t border-gray-200"
                  }`}
                >
                  <Button
                    size="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full w-full"
                  >
                    Reserve
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

// All animated values must be same unit type for smooth interpolation.
// width stays "92%" always — only maxWidth (px→px) drives the pill↔bar morph.
const SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

const EASE = {
  duration: 0.38,
  ease: [0.32, 0.72, 0, 1] as const,
};

export default function DynamicIslandNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ["hero", "about", "skills", "projects", "experience", "guestbook", "contact"];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Guestbook", href: "#guestbook", id: "guestbook" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pointer-events-none pt-4 md:pt-6">
      {/* Row: pill + hire button */}
      <div className="flex items-center justify-center gap-3 w-full px-4">
        <motion.header
          ref={headerRef}
          // width is always 92% — only maxWidth animates (px → px = smooth spring)
          className="pointer-events-auto flex items-center justify-between glass-panel text-white"
          style={{ width: "92%" }}
          initial={false}
          animate={{
            maxWidth: isScrolled
              ? isMobile ? "360px" : "660px"
              : "1060px",
            borderRadius: isScrolled ? "9999px" : "20px",
            paddingLeft:  isScrolled ? (isMobile ? "14px" : "20px") : (isMobile ? "20px" : "28px"),
            paddingRight: isScrolled ? (isMobile ? "14px" : "20px") : (isMobile ? "20px" : "28px"),
            paddingTop:    isScrolled ? "7px" : (isMobile ? "12px" : "16px"),
            paddingBottom: isScrolled ? "7px" : (isMobile ? "12px" : "16px"),
            backgroundColor: isScrolled
              ? "rgba(8, 12, 24, 0.88)"
              : "rgba(255, 255, 255, 0.02)",
            borderColor: isScrolled
              ? "rgba(255, 255, 255, 0.14)"
              : "rgba(255, 255, 255, 0.07)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
          transition={SPRING}
        >
          {/* LOGO */}
          <a href="#hero" className="flex items-center gap-2 select-none group shrink-0 pr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_#6366f1]" />
            <span className="font-bold tracking-tight text-base md:text-lg group-hover:text-primary transition-colors duration-200">
              Rojin Roy
            </span>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-1.5 text-xs font-semibold tracking-wide text-text-muted hover:text-white transition-colors duration-200"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      layoutId="activePill"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <X className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  <Menu className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.header>

        {/* HIRE BUTTON — outside the pill */}
        <a
          href="#contact"
          className="pointer-events-auto hidden md:inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-white text-bg-primary text-xs font-bold shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:bg-white/90 hover:scale-105 active:scale-100 transition-all duration-200 shrink-0 whitespace-nowrap"
        >
          Hire <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* MOBILE NAV PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={EASE}
            className="pointer-events-auto mt-2 mx-4 w-[calc(100%-2rem)] max-w-sm p-5 glass-panel rounded-[20px] border border-white/10 flex flex-col gap-1 md:hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
            style={{ backdropFilter: "blur(32px) saturate(180%)", WebkitBackdropFilter: "blur(32px) saturate(180%)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.22 }}
                className={`py-2.5 px-3 text-sm font-semibold rounded-xl border-b border-white/5 last:border-0 hover:text-primary hover:bg-white/5 transition-colors duration-200 ${
                  activeSection === link.id ? "text-primary" : "text-text-muted"
                }`}
              >
                {link.name}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 py-3 rounded-xl bg-white text-bg-primary text-center font-bold text-xs hover:bg-white/90 transition-colors duration-200"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

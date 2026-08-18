"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Trang chủ", href: "#hero" },
  { name: "Giới thiệu", href: "#about" },
  { name: "Dịch vụ", href: "#services" },
  { name: "Sản phẩm", href: "#portfolio" },
  { name: "Liên hệ", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Basic scroll spy using functional approach
      const sections = ["hero", "about", "services", "portfolio", "contact"];
      const activeSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (activeSection) {
        setActiveSection(activeSection);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    >
      <nav className="flex justify-between items-center px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-widest text-primary-container drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] font-headline">
            NEON_NOCTURNE
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 font-label uppercase tracking-widest text-[10px]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors duration-300 relative py-1",
                activeSection === item.href.slice(1)
                  ? "text-primary-container"
                  : "text-on-surface-variant hover:text-primary-container"
              )}
            >
              {item.name}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container"
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary-container transition-transform active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-container overflow-hidden border-b border-white/5"
          >
            <div className="flex flex-col p-8 gap-6 font-label uppercase tracking-widest text-xs">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors duration-300",
                    activeSection === item.href.slice(1)
                      ? "text-primary-container"
                      : "text-on-surface-variant"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

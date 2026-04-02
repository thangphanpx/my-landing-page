"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon, Globe, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background w-full py-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[32px_32px]" />
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container text-xl drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]">
              blur_on
            </span>
            <span className="text-xl font-black tracking-[0.3em] text-primary-container drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] font-headline">
              NEON_NOCTURNE
            </span>
          </div>
          <p className="font-label text-[10px] text-on-surface-variant tracking-[0.2em] uppercase max-w-sm text-center md:text-left leading-relaxed">
            © {currentYear} DIGITAL CURATOR. ĐỊNH HƯỚNG TƯƠNG LAI SỐ TỪ VIỆT NAM. BẢO LƯU MỌI QUYỀN.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: LinkIcon, name: "LinkedIn", href: "#" },
            { icon: ExternalLink, name: "GitHub", href: "#" },
            { icon: Globe, name: "Dribbble", href: "#" },
            { icon: Globe, name: "Instagram", href: "#" },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              whileHover={{ y: -3, color: "var(--color-primary-container)" }}
              className="text-on-surface-variant/60 hover:text-white transition-all flex items-center gap-2 group"
            >
              <social.icon size={18} strokeWidth={1.5} className="group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] transition-all" />
              <span className="font-label text-xs uppercase tracking-widest hidden sm:inline">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* signature glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary-container/20 to-transparent" />
    </footer>
  );
}

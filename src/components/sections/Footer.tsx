"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon, Globe, ExternalLink, Camera } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background w-full py-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[32px_32px]" />
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-primary-container font-headline">
              NEON_NOCTURNE
            </span>
          </div>
          <p className="font-label text-[10px] text-on-surface-variant tracking-tighter uppercase max-w-sm text-center md:text-left leading-relaxed">
            © {currentYear} DIGITAL CURATOR. ĐỊNH HƯỚNG TƯƠNG LAI SỐ TỪ VIỆT NAM. BẢO LƯU MỌI QUYỀN.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: LinkIcon, name: "LinkedIn", href: "#" },
            { icon: ExternalLink, name: "GitHub", href: "#" },
            { icon: Globe, name: "Dribbble", href: "#" },
            { icon: Camera, name: "Instagram", href: "#" },
          ].map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              whileHover={{ y: -3, color: "var(--color-primary-container)" }}
              className="text-on-surface-variant hover:text-primary-container transition-all flex items-center gap-2 group"
            >
              <social.icon size={18} strokeWidth={1.5} className="group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] transition-all" />
              <span className="font-label text-xs uppercase tracking-widest">
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

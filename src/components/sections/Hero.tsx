"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-32 px-8 relative overflow-hidden bg-linear-to-br from-background via-surface to-surface-container-low" id="hero">
      {/* Signature Texture Ambient Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary-container/10 border border-primary-container/20">
            <span className="font-label text-primary text-[10px] uppercase tracking-[0.3em]">
              Sẵn sàng cho dự án mới
            </span>
          </div>
          
          <h1 className="font-headline font-extrabold text-7xl lg:text-[100px] text-on-surface leading-[0.95] tracking-tighter">
            Kiến tạo <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-container to-primary drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]">
              Trải nghiệm
            </span> <br />
            Số.
          </h1>
          
          <p className="text-on-surface-variant text-xl max-w-lg font-body leading-relaxed">
            Tôi là Người Định hướng Kỹ thuật số, kết hợp thẩm mỹ neon tương lai với kỹ thuật hiệu suất cao để xây dựng thế hệ web tiếp theo.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-primary-container to-primary text-on-primary-container font-headline font-bold py-5 px-10 rounded-2xl flex items-center gap-3 transition-shadow hover:shadow-[0_0_30px_rgba(0,210,255,0.4)]"
            >
              Xem Sản phẩm <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface-variant/20 backdrop-blur-md border border-white/10 text-on-surface font-headline font-bold py-5 px-10 rounded-2xl flex items-center gap-3 hover:bg-surface-variant/40 transition-all"
            >
              Trao đổi ngay <MessageSquare size={20} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-[320px] h-[320px] lg:w-[500px] lg:h-[500px] rounded-full p-2 bg-linear-to-tr from-primary-container via-transparent to-secondary-container shadow-[0_0_80px_rgba(0,210,255,0.2)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface-container relative">
              <Image 
                alt="Avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDpmK-Xft1cG2PH1_bX1ZMEJ7BUnNN70pKj-5Po8uUylFLDbuiHU1JdDVvFczQDpks8lebCqKswdzqjAssXe8fDleYBlgHjJg-qnbAHqeEvI28Cf6rTDG2QT0a2lvSMgsjQ8oAztmxf3qqRlYKf4vAPlrPD8OyrqAT8yVB0kEvbV8JYX17OPCWfsjoqBoubmZE7djyps9sAbNv4KYC7TC_cRQybESitVw0sWCPuCZUOEiug4F-SQVjOQBQb5paxlOsS16W-lQQCO4"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-primary-container/40 rounded-tr-[40px] pointer-events-none"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-secondary/40 rounded-bl-[40px] pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant/40 vertical-rl">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-primary-container/60 to-transparent" />
      </div>
    </section>
  );
}

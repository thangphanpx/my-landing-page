"use client";

import { motion } from "framer-motion";
import { Terminal, Layout, Database, Zap } from "lucide-react";

const skills = [
  { icon: Terminal, name: "Phát triển" },
  { icon: Layout, name: "Thiết kế UI/UX" },
  { icon: Database, name: "Hệ thống" },
  { icon: Zap, name: "Tối ưu hóa" },
];

export default function About() {
  return (
    <section className="py-32 bg-surface-container-low relative" id="about">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-label text-primary-container text-sm tracking-[0.4em] uppercase mb-4">Bản sắc</h2>
          <h3 className="font-headline text-5xl md:text-6xl text-on-surface font-bold tracking-tight">Phía sau Màn hình</h3>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bento Style Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-surface-container-high rounded-3xl p-12 flex flex-col justify-between border border-white/5 relative overflow-hidden group"
          >
            <div className="z-10 relative">
              <h4 className="font-headline text-3xl md:text-4xl text-on-surface mb-8 leading-tight">Dẫn lối bởi sự <br /><span className="text-primary-container">Chính xác</span></h4>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl font-body">
                Với hơn 8 năm trong không gian kỹ thuật số, tôi đã tạo ra các trải nghiệm cho các thương hiệu toàn cầu và các startup triển vọng. Triết lý của tôi rất đơn giản: công nghệ nên được cảm nhận, không chỉ được nhìn thấy. Tôi chuyên về các giao diện có độ trung thực cao, ưu tiên trực giác người dùng trong khi phá vỡ các ranh giới của thẩm mỹ hiện đại.
              </p>
            </div>
            
            <div className="mt-16 flex gap-12 z-10 relative">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-headline font-extrabold text-primary-container drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                >
                  08+
                </motion.div>
                <div className="font-label text-[10px] uppercase tracking-[0.3em] mt-3 text-on-surface-variant/60">Years Experience.</div>
              </div>
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-headline font-extrabold text-secondary drop-shadow-[0_0_15px_rgba(237,177,255,0.3)]"
                >
                  150+
                </motion.div>
                <div className="font-label text-[10px] uppercase tracking-[0.3em] mt-3 text-on-surface-variant/60">Dự án Hoàn thành</div>
              </div>
            </div>

            {/* Decorative background effects */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-container/5 blur-[120px] rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-1000" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/5 rounded-br-3xl" />
          </motion.div>

          {/* Skills Side Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container-highest rounded-3xl p-10 border border-white/5 space-y-8 flex flex-col justify-center"
          >
            <h4 className="font-label text-xs uppercase tracking-[0.3em] text-primary-container border-b border-primary-container/20 pb-6 w-fit">Vũ khí cốt lõi</h4>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="p-6 rounded-2xl bg-surface-container border border-white/2 flex flex-col items-center gap-4 transition-all duration-300 group"
                >
                  <skill.icon className="text-primary-container group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.6)] transition-all" size={32} strokeWidth={1.5} />
                  <span className="font-label text-[9px] text-center uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-primary-container font-bold">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-4 px-2">
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40 leading-relaxed">
                Liên tục cập nhật công nghệ mới nhất để mang lại hiệu suất tối ưu cho mọi sản phẩm.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

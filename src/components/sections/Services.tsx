"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, Monitor, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Monitor,
    title: "Kiến trúc Hình ảnh",
    description: "Phát triển các kiến trúc web mạnh mẽ, có khả năng mở rộng, đóng vai trò là xương sống cho sự hiện diện kỹ thuật số của bạn.",
    color: "primary-container",
  },
  {
    icon: Palette,
    title: "Định vị Thương hiệu",
    description: "Xây dựng những bản sắc độc đáo, tạo được tiếng vang trong một thị trường bão hòa thông qua kể chuyện bằng hình ảnh chiến lược.",
    color: "secondary",
  },
  {
    icon: Sparkles,
    title: "Tích hợp AI",
    description: "Tận dụng các công cụ AI tiên tiến để nâng cao năng suất và tạo ra trải nghiệm người dùng thông minh hơn.",
    color: "primary-container",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-surface relative" id="services">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col mb-16 md:flex-row md:justify-between md:items-end gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="font-label text-secondary text-sm tracking-[0.3em] uppercase mb-4">Năng lực</h2>
            <h3 className="font-headline text-5xl md:text-6xl text-on-surface font-bold tracking-tight leading-tight">
              Giải pháp cho <br /><span className="text-secondary drop-shadow-[0_0_15px_rgba(237,177,255,0.4)]">Tương lai</span>
            </h3>
          </div>
          <p className="text-on-surface-variant font-body max-w-sm mb-2 opacity-60">
            Kết hợp tư duy thiết kế chiến lược với kỹ thuật hiện đại để tạo ra những sản phẩm nổi bật.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0 border border-white/5 rounded-xl overflow-hidden bg-surface-container-low shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={cn(
                "p-12 bg-surface-container border-b md:border-b-0 group hover:bg-surface-container-high transition-all duration-500 relative flex flex-col justify-between min-h-[480px]",
                index !== services.length - 1 && "md:border-r border-white/5"
              )}
            >
              <div className="z-10 relative h-full flex flex-col justify-between">
                <div>
                  <div className={cn(
                    "w-0 h-1 group-hover:w-full transition-all duration-500 mb-8",
                    service.color === "primary-container" ? "bg-primary-container glow-indicator" : "bg-secondary shadow-[0_0_15px_rgba(237,177,255,0.5)]"
                  )} />
                  <div className="mb-10 p-5 rounded-3xl bg-background w-fit group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/3">
                    <service.icon className={cn(
                      "transition-all duration-500 group-hover:drop-shadow-[0_0_12px_currentColor]",
                      service.color === "primary-container" ? "text-primary-container" : "text-secondary"
                    )} size={36} strokeWidth={1} />
                  </div>
                  <h4 className="font-headline text-2xl text-on-surface mb-4 leading-tight group-hover:text-white transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant/40 group-hover:text-on-surface transition-colors">
                  <span>Khám phá thêm</span>
                  <Workflow size={12} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300" />
                </div>
              </div>

              {/* Hover highlight background */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-1000",
                service.color === "primary-container" ? "bg-primary-container" : "bg-secondary"
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

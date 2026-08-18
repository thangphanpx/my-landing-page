"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Nexus Dashboard",
    category: "Tài chính 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnYWfM96z8j7Typ1IpbtY6vQpDADOqtehKE7ShiG1u23mxkBaWK-Om2ASUUma7pDs9lQD4V2VUW-N66Gz0eTkSK-tx7gDxqSyHNF26xQCYX2jZ-Ot9kWfixydrciUUQKSP-8b_4NjY-bekcsFu0n0EPYZPtPhYhebzFvq2a-qWOd8MTP4F-jpNlKDr0Fxa8Cd5mI57WgQFq0eeN_OXgy3vk7UAyvsjjwraWf9a9cY-AGxjBkwdZ-9ZMra0WJyt0nW7D7tb8KziwFE",
    size: "large",
    color: "primary",
  },
  {
    title: "Lumina Store",
    category: "Thương mại Điện tử",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB87hDdYqDrCCL9gIZFAvXg6EWvZ-euXU7jQ9KlgWaZrqMXor5aYqTrQRGEiHBnsC6LZf2foYgoZA6FZpCq6s_ILNnN5GZExVETNsbJQiRtc3nONt6FvhK4XCUMbR3hDCT9O1XpshEq4jT4ShlivJkja5R7Ex1vvtbbYSLA3FZR3rMd9VWLXa9vdTbZdLAgnZoIKdvIXaDdyweNtDMDNDb7g7Ca6nSPPYWzvUsN3HcR9-fofadfL4gqZdrtyoMgwh8ScvbU6eR5OCE",
    size: "small",
    color: "secondary",
  },
  {
    title: "Synapse AI",
    category: "Phần mềm AI",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG4njV4hZeD_cZAffnXRqrWOVOujYQHK26YltNcYtFYoKe9rJNIhX9wZpeaD0Ck4SXVb4axbJnws0dGDoKj7hWNaAN3NqpP-iQPSGMgjBfSD57Q6DT1-OEw_7Fwz6RixsgZFu6RyfHUaKkfBroR_OtaGVp_LJSwl_1UAFFjDJI29DfCIt9ICdNp_wlXx5MVOWiOcd4eGnB_EjGu6qoKAPBo2u5qmeDDo2CQmwyoZlIPiHlX5B1HkiZNAhjJNhCgZc7TUTE3lLo8eQ",
    size: "small",
    color: "primary",
  },
  {
    title: "Ether Flow",
    category: "Nền tảng Web3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN5xTfatltFMrPkFA9YWWJiODSQ3c4X2W13vwyTnhKHBHR-J4IHOJNhPfaV5fbJOW-yt4JIftEUJU8cnP6FhQzyetsyL3KHkenROt7DIcOgIi3LWJo2qZp0vc9nADN2L1iszlFF_kqvfUsT29SRuL23v7Bif0f6rThxQE7E3txfdvOoK-ED0VhfcEvWBFR69WsmtqMLtBLNV5z3LEKhLI45K2yjIAb_2Z48lIsu32fjyM9ql42RwLK04WSQi5mwIFECzXTeZi9q_g",
    size: "large",
    color: "secondary",
  },
];

export default function Portfolio() {
  return (
    <section className="py-24 bg-surface-container-low relative" id="portfolio">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-container/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-label text-primary-container text-sm tracking-[0.4em] uppercase mb-4">Lưu trữ</h2>
          <h3 className="font-headline text-5xl md:text-7xl text-on-surface font-black tracking-tighter">
            Dự án <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-container to-secondary">Tiêu biểu</span>
          </h3>
          <p className="text-on-surface-variant max-w-xl mx-auto mt-8 text-lg font-body leading-relaxed opacity-60">
            Một tập hợp các dự án kỹ thuật số kết hợp hiệu suất cao với thiết kế tiên phong.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={cn(
                "relative group rounded-xl overflow-hidden bg-surface-container-low border border-white/5 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,210,255,0.3)] shadow-2xl",
                project.size === "large" ? "lg:col-span-2 aspect-video" : "aspect-4/5"
              )}
            >
              {/* project image */}
              <div className="w-full h-full relative overflow-hidden">
                <Image 
                  alt={project.title}
                  src={project.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
              </div>

              {/* project info */}
              <div className="absolute inset-x-0 bottom-0 p-12 w-full flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-3">
                  <span className={cn(
                    "font-label text-xs uppercase tracking-[0.3em] block transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700",
                    project.color === "primary" ? "text-primary" : "text-secondary"
                  )}>
                    {project.category}
                  </span>
                  <h4 className="font-headline text-3xl md:text-4xl text-on-surface font-extrabold group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h4>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  className={cn(
                    "backdrop-blur-xl p-5 rounded-full border border-white/20 transition-all duration-500 shadow-lg group-hover:translate-x-2",
                    project.color === "primary" ? "hover:bg-primary-container hover:text-on-primary-container" : "hover:bg-secondary hover:text-on-secondary"
                  )}
                >
                  <ArrowUpRight size={28} />
                </motion.button>
              </div>

              {/* dynamic rim light effect on hover */}
              <div className={cn(
                "absolute inset-0 border-[3px] border-transparent rounded-xl transition-colors duration-700 group-hover:border-white/10 pointer-events-none",
                project.color === "primary" ? "group-hover:shadow-[inset_0_0_20px_rgba(0,210,255,0.2)]" : "group-hover:shadow-[inset_0_0_20px_rgba(237,177,255,0.2)]"
              )} />
            </motion.div>
          ))}
        </div>
        
        {/* view more CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <button className="font-label text-[10px] uppercase tracking-[0.5em] text-on-surface-variant hover:text-primary transition-colors border-b border-primary/20 pb-2">
            Xem tất cả lưu trữ của tôi
          </button>
        </motion.div>
      </div>
    </section>
  );
}

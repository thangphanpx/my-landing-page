"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const FORM_SUBMISSION_DELAY = 2000;
  const SUCCESS_DISPLAY_DURATION = 5000;

  const simulateFormSubmission = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, FORM_SUBMISSION_DELAY);
    });
  };

  const resetFormAfterDelay = (): void => {
    setTimeout(() => setIsSubmitted(false), SUCCESS_DISPLAY_DURATION);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await simulateFormSubmission();
      setIsSubmitted(true);
      resetFormAfterDelay();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="contact">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-container/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-container/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-label text-primary-container text-sm tracking-[0.3em] uppercase mb-4">Kết nối</h2>
          <h3 className="font-headline text-5xl md:text-7xl text-on-surface font-black tracking-tight mb-8">Bắt đầu <span className="text-primary-container">Hợp tác</span></h3>
          <p className="text-on-surface-variant text-lg font-body max-w-xl mx-auto opacity-70">
            Bạn có một ý tưởng táo bạo? Hãy chia sẻ với tôi và chúng ta sẽ cùng nhau thực hiện nó.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface-container-low border border-white/5 rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 text-left"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant ml-2">Họ và Tên</label>
                    <input
                      required
                      className="w-full bg-surface-container-low border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all font-body"
                      placeholder="Tên của bạn"
                      type="text"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant ml-2">Địa chỉ Email</label>
                    <input
                      required
                      className="w-full bg-surface-container-low border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all font-body"
                      placeholder="email@vidu.com" 
                      type="email"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant ml-2">Mô tả Dự án</label>
                  <textarea
                    required
                    className="w-full bg-surface-container-low border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all font-body min-h-[220px] resize-none"
                    placeholder="Hãy cho tôi biết về tầm nhìn của bạn..."
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-primary-container to-primary text-on-primary-container font-headline font-bold py-5 rounded-xl hover:scale-[1.01] transition-transform shadow-[0_10px_25px_-5px_rgba(0,210,255,0.4)] flex items-center justify-center gap-4 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Gửi tin nhắn <Send size={24} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 space-y-8 text-center"
              >
                <div className="w-24 h-24 bg-primary-container/20 border border-primary-container/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} className="text-primary-container" />
                </div>
                <div className="space-y-4">
                  <h4 className="font-headline text-3xl font-extrabold text-on-surface">Đã gửi thành công!</h4>
                  <p className="text-on-surface-variant font-body text-lg">Cảm ơn bạn đã quan tâm. Tôi sẽ phản hồi lại sớm nhất có thể.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="font-label text-xs uppercase tracking-widest text-primary-container hover:underline"
                >
                  Gửi một tin nhắn khác
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-size-[32px_32px]" />
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row justify-center gap-12 border-t border-white/5 pt-12">
          <motion.a 
            whileHover={{ y: -5 }}
            className="text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-4 group" 
            href="mailto:hello@nocturne.io"
          >
            <div className="p-4 rounded-2xl bg-surface-container border border-white/5 group-hover:border-primary-container/20 group-hover:bg-primary-container/5 transition-all">
              <Mail size={24} />
            </div>
            <div className="text-left">
              <div className="font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 mb-1">Email liên hệ</div>
              <span className="font-label text-sm uppercase tracking-widest font-bold">hello@nocturne.io</span>
            </div>
          </motion.a>
          
          <motion.a 
            whileHover={{ y: -5 }}
            className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-4 group" 
            href="#"
          >
            <div className="p-4 rounded-2xl bg-surface-container border border-white/5 group-hover:border-secondary/20 group-hover:bg-secondary/5 transition-all">
              <MessageCircle size={24} />
            </div>
            <div className="text-left">
              <div className="font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 mb-1">Hỗ trợ trực tuyến</div>
              <span className="font-label text-sm uppercase tracking-widest font-bold">Lên lịch cuộc gọi</span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

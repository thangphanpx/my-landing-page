"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý AI của **NEON_NOCTURNE**. Tôi có thể giúp gì cho bạn?\n\n> Hãy thử hỏi về: **giá**, **dịch vụ** hoặc **làm dự án**.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string) => {
    const text = input.toLowerCase();
    if (text.includes("giá") || text.includes("chi phí")) return "Giá các dự án phụ thuộc vào quy mô và yêu cầu cụ thể. Hãy để lại thông tin trong **form liên hệ** bên dưới để nhận `báo giá chi tiết` nhé!";
    if (text.includes("dịch vụ") || text.includes("làm gì")) return "Chúng tôi cung cấp các dịch vụ:\n- **Kiến trúc hình ảnh**\n- **Định vị thương hiệu**\n- **Tích hợp AI cao cấp**";
    if (text.includes("xin chào") || text.includes("hello")) return "Chào bạn! Rất vui được hỗ trợ bạn. Bạn quan tâm đến dịch vụ nào của chúng tôi?";
    return "Cảm ơn bạn đã nhắn tin! Tôi đang trong giai đoạn thử nghiệm, nhưng tôi có thể ghi lại yêu cầu của bạn để chuyên viên tư vấn liên hệ lại.\n\n*Ghi chú: Tin nhắn của bạn đã được mã hóa.*";
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(0,210,255,0.5)] border border-white/20 transition-all cursor-pointer",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <Sparkles size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" }}
            className="fixed bottom-8 right-8 z-50 w-[380px] h-[520px] bg-surface-container-high/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-linear-to-r from-primary-container/20 to-transparent border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-container/20 rounded-xl border border-primary-container/20">
                  <Bot size={20} className="text-primary-container" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-on-surface">Trợ lý AI</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-label">Đang trực tuyến</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant/60 hover:text-on-surface transition-colors cursor-pointer"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                    msg.sender === "bot"
                      ? "bg-primary-container/10 border-primary-container/20 text-primary-container"
                      : "bg-surface-container-highest border-white/10 text-on-surface-variant"
                  )}>
                    {msg.sender === "bot" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed chat-markdown",
                    msg.sender === "bot"
                      ? "bg-surface-container border border-white/5 text-on-surface"
                      : "bg-primary-container text-on-primary-container font-medium"
                  )}
                    dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(marked.parse(msg.text) as string) 
                    }}
                  />
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 text-primary-container flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container border border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-surface-container-high border-t border-white/5">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="w-full bg-background border border-white/5 rounded-2xl py-4 pl-5 pr-14 text-sm text-on-surface placeholder:text-outline/30 focus:outline-none focus:border-primary-container/40 transition-all font-body"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-primary-container text-on-primary-container disabled:opacity-30 enabled:cursor-pointer transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[9px] text-on-surface-variant/30 uppercase tracking-widest text-center mt-4 font-label">
                Powered by NOCTURNE AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

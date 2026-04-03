"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Message } from "@/types";
import { ChatService } from "@/lib/chatService";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: ChatService.getWelcomeMessage(),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);

  const shouldAppendSpace = (currentInput: string): boolean => {
    return !currentInput.endsWith(" ");
  };

  const isTextAlreadyPresent = (currentInput: string, newText: string): boolean => {
    return currentInput.trim().endsWith(newText);
  };

  const insertSuggestion = (text: string): void => {
    setInputValue((current) => {
      const trimmedCurrent = current.trim();
      
      if (!trimmedCurrent) {
        return text;
      }

      if (isTextAlreadyPresent(current, text)) {
        return current;
      }

      const separator = shouldAppendSpace(current) ? " " : "";
      return `${current}${separator}${text}`;
    });
  };

  const suggestionList = [
    "khóa học K89 - Agentic AI",
    "MCP server & N8N AI",
    "AI branding & automation",
  ];

  // Scroll to the top of the newest message when chat updates
  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, isTyping]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Send message to AI
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    // Validate message
    const validation = ChatService.validateMessage(inputValue);
    if (!validation.isValid) {
      setError(validation.error || "Tin nhắn không hợp lệ");
      return;
    }

    setError(null);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Get chat history (excluding welcome message for API)
      const chatHistory = messages.filter(msg => msg.id !== "welcome");
      const allMessages = [...chatHistory, userMessage];
      
      // Call AI API
      const aiResponse = await ChatService.sendMessage(allMessages);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "❌ **Xin lỗi!** Tôi đang gặp sự cố kỹ thuật.\n\n🔄 Vui lòng thử lại sau hoặc liên hệ trực tiếp:\n📧 [a@example.com](mailto:a@example.com) | 💬 Zalo: 0123456789",
        sender: "bot", 
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
            className="fixed bottom-8 right-8 z-50 w-95 h-130 bg-surface-container-high/90 backdrop-blur-2xl border border-white/10 rounded-4xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden overflow-x-hidden"
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
              className="chatbot-scrollbar-hidden flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-4"
            >
              {messages.map((msg, index) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  ref={index === messages.length - 1 ? latestMessageRef : undefined}
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
                  {msg.sender === "bot" ? (
                    <div className="p-4 rounded-2xl text-sm leading-relaxed chat-markdown wrap-break-word overflow-wrap-anywhere whitespace-pre-wrap bg-surface-container border border-white/5 text-on-surface">
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.text) as string) }} />
                      {msg.id === "welcome" && (
                        <ul className="mt-3 space-y-2 list-disc pl-5">
                          {suggestionList.map((item) => (
                            <li key={item} className="text-on-surface">
                              <button
                                type="button"
                                onClick={() => insertSuggestion(item)}
                                className="text-primary-container font-semibold hover:underline cursor-pointer text-left"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl text-sm leading-relaxed chat-markdown wrap-break-word overflow-wrap-anywhere whitespace-pre-wrap bg-primary-container text-on-primary-container font-medium">
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.text) as string) }} />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-1 max-w-[89%]">
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
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs"
                >
                  {error}
                </motion.div>
              )}
              
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Nhập tin nhắn... (Enter để gửi)"
                  disabled={isTyping}
                  className="w-full bg-background border border-white/5 rounded-2xl py-4 pl-5 pr-14 text-sm text-on-surface placeholder:text-outline/30 focus:outline-none focus:border-primary-container/40 transition-all font-body disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-primary-container text-on-primary-container disabled:opacity-30 enabled:cursor-pointer transition-all hover:bg-primary-container/80"
                >
                  <Send size={18} />
                </button>
              </form>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-[9px] text-on-surface-variant/30 uppercase tracking-widest font-label">
                  Powered by AI Expert Assistant
                </p>
                {isTyping && (
                  <div className="flex items-center gap-2 text-[9px] text-primary-container/60 uppercase tracking-widest font-label">
                    <div className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary-container/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-1 rounded-full bg-primary-container/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-1 rounded-full bg-primary-container/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    Đang suy nghĩ...
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

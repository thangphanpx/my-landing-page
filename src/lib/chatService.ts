/**
 * 🤖 Chat Service - Điều phối AI Chat & Data Storage
 */

import { Message } from '@/types';
import { 
  processAIResponse, 
  ChatSession, 
  createChatSession, 
  formatChatHistory 
} from './leadDataExtractor';
import { 
  sendLeadWithRetry, 
  sendOrderToGoogleSheets 
} from './googleSheetsService';

interface ChatResponse {
  message: string;
  timestamp: string;
  error?: string;
}

export class ChatService {
  private static readonly API_ENDPOINT = '/api/chatbot';
  private static currentSession: ChatSession | null = null;
  
  static getCurrentSession(): ChatSession {
    if (!this.currentSession) {
      this.currentSession = createChatSession();
    }
    return this.currentSession;
  }

  /**
   * Reset session khi đóng chat
   */
  static resetSession(): void {
    this.currentSession = null;
    console.log("🔄 Chat session reset successfully.");
  }

  static async sendMessage(messages: Message[]): Promise<string> {
    const session = this.getCurrentSession();
    
    try {
      const apiMessages = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data: ChatResponse = await response.json();
      if (!data.message) throw new Error('API reply missing');

      const processed = processAIResponse(data.message);
      let statusAppend = '';

      if (processed.hasLeadData && processed.leadData) {
        const history = formatChatHistory([...messages]);
        const res = await sendLeadWithRetry(processed.leadData, history, session.sessionId);
        if (res.statusMessage) statusAppend += `\n\n${res.statusMessage}`;
      }

      if (processed.hasOrderData && processed.orderData) {
        const res = await sendOrderToGoogleSheets(processed.orderData, session.sessionId);
        if (res.statusMessage) statusAppend += `\n\n${res.statusMessage}`;
      }

      return processed.cleanResponse + statusAppend;
      
    } catch (error) {
      console.error("❌ Chat error:", error);
      return `❌ **Xin lỗi!** Tôi đang gặp sự cố. Vui lòng liên hệ Zalo 0123456789.`;
    }
  }

  /**
   * ✅ KHÔI PHỤC HÀM VALIDATE
   */
  static validateMessage(text: string): { isValid: boolean; error?: string } {
    const trimmed = (text || "").trim();
    if (trimmed.length === 0) return { isValid: false, error: "Tin nhắn không được để trống" };
    if (trimmed.length > 1000) return { isValid: false, error: "Tin nhắn quá dài (tối đa 1000 ký tự)" };
    return { isValid: true };
  }

  static getWelcomeMessage(): string {
    return `👋 Chào mừng bạn! Tôi là chuyên gia hỗ trợ của Phan Xuân Thăng. Bạn muốn tư vấn khóa học AI hay dịch vụ Automation nào ạ?`;
  }
}
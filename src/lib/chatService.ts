import { Message } from '@/types';
import { processAIResponse, ChatSession, createChatSession, LeadData, formatChatHistory } from './leadDataExtractor';
import { sendLeadWithRetry, isGoogleScriptConfigured, logLeadSubmission } from './googleSheetsService';

interface ChatResponse {
  message: string;
  timestamp: string;
  error?: string;
}

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatService {
  private static readonly API_ENDPOINT = '/api/chatbot';
  private static currentSession: ChatSession | null = null;
  
  /**
   * Khởi tạo hoặc lấy session chat hiện tại
   * @returns Current chat session
   */
  static getCurrentSession(): ChatSession {
    if (!this.currentSession) {
      this.currentSession = createChatSession();
      console.log("🆕 Tạo session chat mới:", this.currentSession.sessionId);
    }
    return this.currentSession;
  }

  /**
   * Reset session chat (khi user làm mới trang hoặc đóng chat)
   */
  static resetSession(): void {
    this.currentSession = null;
    console.log("🔄 Reset chat session");
  }

  /**
   * Gửi tin nhắn đến AI chatbot và xử lý lead data
   * @param messages - Lịch sử chat (không bao gồm system message)
   * @returns Clean response từ AI (đã bỏ lead data tags)
   */
  static async sendMessage(messages: Message[]): Promise<string> {
    const session = this.getCurrentSession();
    
    try {
      // Chuyển đổi Message[] thành format API
      const apiMessages: ApiMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'API returned an error');
      }

      // ============================================================
      // XỬ LÝ LEAD DATA TỪ AI RESPONSE (Theo hướng dẫn Prompt Engineering)
      // ============================================================
      
      // BƯỚC 1: Bóc tách tag ||LEAD_DATA: {...}|| và clean response
      // Tương đương: botReply = processAIResponse(botReply, conversationHistory);  
      const processedResponse = processAIResponse(data.message);
      
      // BƯỚC 2: Xử lý lead data nếu có (background, không chặn UI)
      if (processedResponse.hasLeadData && processedResponse.leadData) {
        // Cập nhật session với tin nhắn mới (conversation history)
        session.messages = [...messages];
        
        // Format chat history từ session để gửi lên Google Sheets
        const chatHistory = formatChatHistory(session.messages);
        
        // Gửi dữ liệu lên Google Sheets (async, không chặn UI)
        this.handleLeadDataSubmission(
          processedResponse.leadData, 
          chatHistory,
          session.sessionId
        );
      }

      // BƯỚC 3: Return clean response (đã bỏ tag) cho user
      // Tương đương: chatBox.innerHTML += marked.parse(botReply);
      return processedResponse.cleanResponse;
      
    } catch (error) {
      console.error('Chat service error:', error);
      const detail = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định.';
      
      // Return fallback error message
      return `❌ **Xin lỗi!** Tôi đang gặp sự cố kỹ thuật.

    **Chi tiết:** ${detail}

🔄 **Vui lòng:**
- Thử lại sau ít phút
- Hoặc liên hệ trực tiếp với chuyên gia:

📧 **Email:** [a@example.com](mailto:a@example.com)
💬 **Zalo:** 0123456789

Cảm ơn bạn đã thông cảm! 🙏`;
    }
  }

  /**
   * Xử lý việc gửi lead data lên Google Sheets (async, không chặn UI)
   * @param leadData - Dữ liệu khách hàng
   * @param chatHistory - Lịch sử chat đã format
   * @param sessionId - Session ID
   */
  private static async handleLeadDataSubmission(
    leadData: LeadData,
    chatHistory: string,
    sessionId: string
  ): Promise<void> {
    try {
      // Kiểm tra xem Google Sheets có được cấu hình không
      if (!isGoogleScriptConfigured()) {
        console.warn("⚠️ Google Apps Script URL chưa được cấu hình");
        return;
      }

      console.log("📊 Bắt đầu xử lý lead data:", leadData);
      
      // Gửi dữ liệu với retry logic
      const result = await sendLeadWithRetry(leadData, chatHistory, sessionId);
      
      // Log kết quả
      logLeadSubmission(leadData, result);
      
      if (result.success) {
        console.log("✅ Lead data đã được lưu thành công vào Google Sheets!");
      } else {
        console.warn("⚠️ Không thể lưu lead data:", result.error);
      }
      
    } catch (error) {
      console.error("❌ Lỗi xử lý lead data submission:", error);
    }
  }

  /**
   * Validate tin nhắn trước khi gửi
   * @param text - Nội dung tin nhắn
   * @returns true nếu hợp lệ
   */
  static validateMessage(text: string): { isValid: boolean; error?: string } {
    const trimmedText = text.trim();
    
    if (!this.isValidTextLength(trimmedText)) {
      return { isValid: false, error: 'Tin nhắn không được để trống' };
    }
    
    if (!this.isWithinMaxLength(trimmedText)) {
      return { isValid: false, error: 'Tin nhắn quá dài (tối đa 1000 ký tự)' };
    }
    
    return { isValid: true };
  }

  /**
   * Kiểm tra text có độ dài hợp lệ không
   * @param text - Text cần kiểm tra
   * @returns true nếu text không rỗng
   */
  private static isValidTextLength(text: string): boolean {
    return text.length > 0;
  }

  /**
   * Kiểm tra text có trong giới hạn độ dài không
   * @param text - Text cần kiểm tra
   * @returns true nếu text trong giới hạn
   */
  private static isWithinMaxLength(text: string): boolean {
    const MAX_MESSAGE_LENGTH = 1000;
    return text.length <= MAX_MESSAGE_LENGTH;
  }

  /**
   * Tạo welcome message
   * @returns Welcome message cho bot
   */
  static getWelcomeMessage(): string {
    return `👋 **Xin chào!** Tôi là **AI trợ lý** của chuyên gia **Phan Xuân Thăng**.

🎯 **Tôi có thể giúp bạn:**
- Thông tin về **khóa học K89 - Agentic AI**
- Dịch vụ **MCP server & N8N AI**
- Tư vấn **AI branding & automation**

💬 **Hãy hỏi tôi bất cứ điều gì bạn muốn biết!**

---
*💡 Gợi ý: Thử hỏi về "khóa học", "giá cả", hoặc "dịch vụ"*`;
  }
}
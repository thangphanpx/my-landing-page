import { Message } from '@/types';

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
  
  /**
   * Gửi tin nhắn đến AI chatbot
   * @param messages - Lịch sử chat (không bao gồm system message)
   * @returns Response từ AI
   */
  static async sendMessage(messages: Message[]): Promise<string> {
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

      return data.message;
      
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
   * Validate tin nhắn trước khi gửi
   * @param text - Nội dung tin nhắn
   * @returns true nếu hợp lệ
   */
  static validateMessage(text: string): { isValid: boolean; error?: string } {
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      return { isValid: false, error: 'Tin nhắn không được để trống' };
    }
    
    if (trimmedText.length > 1000) {
      return { isValid: false, error: 'Tin nhắn quá dài (tối đa 1000 ký tự)' };
    }
    
    return { isValid: true };
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
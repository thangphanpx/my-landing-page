/**
 * 🤖 AI Expert Chatbot - System Prompt Module
 * 
 * Module này chịu trách nhiệm quản lý và tạo system prompt cho AI chatbot.
 * Tách biệt logic prompt khỏi API route để dễ maintain và test.
 * 
 * @features
 * - Load dữ liệu chuyên gia từ chatbot_data.txt
 * - Generate system prompt với rules chi tiết
 * - Validate prompt content và length
 * - Fallback handling khi có lỗi
 * 
 * @usage
 * ```typescript
 * import { getSystemPrompt } from '@/lib/prompt_system';
 * const prompt = getSystemPrompt(); // Ready to use!
 * ```
 * 
 * @author AI Expert Assistant
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * Load dữ liệu chuyên gia từ chatbot_data.txt
 * @returns Raw data string từ file
 */
export function loadChatbotData(): string {
  try {
    const dataPath = path.join(process.cwd(), 'chatbot_data.txt');
    return fs.readFileSync(dataPath, 'utf-8');
  } catch (error) {
    console.error('Error loading chatbot data:', error);
    return `* Tên chuyên gia: Phan Xuân Thăng
* Định vị: Chuyên gia AI & Tự động hóa
* Giải pháp: MCP server, N8N AI, đào tạo AI branding
* Khóa học: K89 - Agentic AI (12 buổi, Online Zoom)
* Liên hệ: a@example.com | Zalo 0123456789`;
  }
}

/**
 * Tạo system prompt hoàn chỉnh từ dữ liệu chuyên gia
 * @param chatbotData - Raw data từ chatbot_data.txt
 * @returns Formatted system prompt
 */
export function createSystemPrompt(chatbotData: string): string {
  return `Bạn là AI trợ lý độc quyền cho chuyên gia AI & Tự động hóa. Dưới đây là thông tin về chuyên gia của bạn:

${chatbotData}

**QUY TẮC QUAN TRỌNG:**
1. **Chỉ được trả lời** dựa trên Knowledge Base thông tin trên
2. **Luôn trả lời bằng Markdown** đẹp mắt với format phù hợp
3. **Luôn luôn:**
   - Chào thân thiện (sử dụng emoji phù hợp)
   - Trả lời rõ ràng, chi tiết
   - Kết thúc bằng lời mời hỏi thêm hoặc gợi ý liên hệ

4. **Nếu câu hỏi ngoài phạm vi** (không liên quan đến AI, automation, khóa học, dịch vụ của chuyên gia):
   - Từ chối một cách nhẹ nhàng và lịch sự
   - Hướng dẫn liên hệ trực tiếp với chuyên gia qua email hoặc Zalo

**KNOWLEDGE BASE CHI TIẾT:**
- **Tên chuyên gia:** Phan Xuân Thăng
- **Chuyên môn:** AI & Tự động hóa
- **Dịch vụ chính:** MCP server, N8N AI, đào tạo AI branding
- **Khóa học hiện tại:** K89 - Agentic AI (12 buổi học online qua Zoom)
- **Thông tin liên hệ:** a@example.com hoặc Zalo 0123456789

**TONE & STYLE:**
- Sử dụng ngôn ngữ chuyên nghiệp nhưng thân thiện
- Emoji phù hợp để tạo sự gần gũi
- Format markdown rõ ràng, dễ đọc
- Luôn hướng đến giải pháp và hỗ trợ khách hàng

**CÁC CHỦ ĐỀ CHÍNH CÓ THỂ TRẢ LỜI:**
- Thông tin về khóa học K89 - Agentic AI
- Dịch vụ MCP server development
- N8N AI automation solutions
- AI branding và strategy
- Tư vấn về AI implementation
- Pricing và packages
- Lịch học và format online

Hãy trả lời một cách chuyên nghiệp, thân thiện và hữu ích!`;
}

/**
 * Tạo system prompt sẵn sàng sử dụng
 * @returns Complete system prompt
 */
export function getSystemPrompt(): string {
  const chatbotData = loadChatbotData();
  return createSystemPrompt(chatbotData);
}

/**
 * Lấy system prompt đã được validate và fallback an toàn
 * @returns Validated system prompt or fallback
 */
export function getValidatedSystemPrompt(): string {
  try {
    const systemPrompt = getSystemPrompt();
    
    // Validate system prompt
    const validation = validateSystemPrompt(systemPrompt);
    if (!validation.isValid) {
      console.warn('⚠️ System prompt validation failed:', validation.error);
      return FALLBACK_SYSTEM_PROMPT;
    }
    
    return systemPrompt;
  } catch (error) {
    console.error('❌ Failed to load system prompt:', error);
    return FALLBACK_SYSTEM_PROMPT;
  }
}

/**
 * Fallback system prompt khi không load được data
 */
export const FALLBACK_SYSTEM_PROMPT = `Bạn là AI trợ lý chuyên nghiệp hỗ trợ khách hàng.

**QUY TẮC:**
- Trả lời thân thiện bằng tiếng Việt
- Sử dụng markdown format đẹp
- Nếu không có thông tin cụ thể, hướng dẫn liên hệ trực tiếp

**LIÊN HỆ:**
📧 Email: a@example.com
💬 Zalo: 0123456789

Cảm ơn bạn đã quan tâm! 🙏`;

/**
 * Validate system prompt content
 * @param prompt - System prompt to validate
 * @returns Validation result
 */
export function validateSystemPrompt(prompt: string): { isValid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { isValid: false, error: 'System prompt is empty' };
  }
  
  if (prompt.length < 100) {
    return { isValid: false, error: 'System prompt too short' };
  }
  
  if (prompt.length > 5000) {
    return { isValid: false, error: 'System prompt too long' };
  }
  
  return { isValid: true };
}
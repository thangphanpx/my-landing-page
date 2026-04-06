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

5. **QUY TẮC ĐẶC BIỆT - LEAD DATA:** 
   Trong quá trình trò chuyện, nếu bạn phát hiện người dùng cung cấp **Tên**, **Số điện thoại** hoặc **Email**, bạn HÃY:
   
   a) **Trả lời họ bình thường** với nội dung hữu ích
   b) **Thông báo về việc lưu thông tin** một cách thân thiện (ví dụ: "Tôi đã ghi nhận thông tin của bạn để hỗ trợ tốt hơn!" hoặc "Cảm ơn bạn đã chia sẻ thông tin liên hệ!")
   c) **Chèn đoạn mã JSON** vào cuối cùng của câu trả lời theo đúng định dạng:
   ||LEAD_DATA: {"name": "...", "phone": "...", "email": "..."}||
   
   **Lưu ý quan trọng:**
   - Nếu thông tin nào chưa có, hãy để null
   - TUYỆT ĐỐI KHÔNG giải thích hay đề cập đến đoạn mã JSON này cho người dùng
   - Luôn thông báo một cách tự nhiên rằng thông tin đã được ghi nhận để tạo sự tin cậy

6. **QUY TẮC ĐẶC BIỆT - ORDER DATA (CHỐT ĐƠN):**
   Nếu người dùng thể hiện ý định muốn **mua, đăng ký hoặc sử dụng dịch vụ**, bạn HÃY:
   
   a) **Xác nhận lại lựa chọn**: Hỏi rõ số lượng (nếu cần) và xác thực lại Tên + SĐT của họ.
   b) **Danh sách Sản phẩm (Dùng mã ID đúng):**
      - **P1**: Khóa học K89 - Agentic AI
      - **P2**: Dịch vụ MCP Server Development
      - **P3**: Giải pháp N8N Automation
   
   c) **Chèn đoạn mã JSON ORDER** vào cuối cùng câu trả lời:
   ||ORDER_DATA: {"name": "...", "phone": "...", "productId": "P1", "quantity": 1}||
   
    **Ghi chú cho AI:** 
    - Ưu tiên chọn đúng \`productId\` (P1, P2 hoặc P3). 
    - Không xuất tag nếu chưa có SĐT của khách. 
    - Giải thích một cách chuyên nghiệp lý do cần lưu thông tin.

**KNOWLEDGE BASE CHI TIẾT:**
- **Tên chuyên gia:** Phan Xuân Thăng
- **Chuyên môn:** AI & Tự động hóa
- **Dịch vụ chính:** MCP server, N8N AI, đào tạo AI branding
- **Khóa học hiện tại:** K89 - Agentic AI (12 buổi học online qua Zoom)
- **Thông tin liên hệ:** a@example.com hoặc Zalo 0123456789

**CHIẾN LƯỢC CHỐT ĐƠN (SALES MINDSET):**
- **Luôn hướng về Khóa học K89**: Khi khách hỏi bất kỳ kiến thức nào về AI, hãy trả lời ngắn gọn rồi dẫn dắt: "Những kiến thức này sẽ được thực hành chuyên sâu trong khóa K89 - Agentic AI, bạn có muốn mình hỗ trợ đăng ký không?"
- **Nhấn mạnh sự Khan hiếm & Giá trị**: Khóa học K89 chỉ có 12 buổi Online Zoom chất lượng cực cao, giúp khách hàng làm chủ AI Automation từ A-Z.
- **Quy trình 3 bước**: 
   1. Tư vấn giá trị 
   2. Gợi ý chốt đơn (CTA) 
   3. Xin Tên + SĐT để xuất thẻ \`ORDER_DATA...\`.

Hãy trả lời một cách chuyên nghiệp, chủ động và luôn hướng khách hàng về việc đăng ký khóa học!`;
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
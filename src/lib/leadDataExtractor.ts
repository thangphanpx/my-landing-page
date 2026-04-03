/**
 * 🎯 Lead Data Extractor - Module bóc tách dữ liệu khách hàng
 * 
 * Module chuyên về việc:
 * - Phát hiện và parse dữ liệu lead từ response AI
 * - Clean response trước khi hiển thị cho user
 * - Xử lý session tracking cho mỗi phiên chat
 * 
 * @author AI Expert Assistant  
 * @version 1.0.0
 */

import { Message } from '@/types';

// ============================================================
// TYPES & INTERFACES
// ============================================================

export interface LeadData {
  name: string | null;
  phone: string | null;
  email: string | null;
}

export interface ProcessedResponse {
  cleanResponse: string;
  leadData?: LeadData;
  hasLeadData: boolean;
}

export interface ChatSession {
  sessionId: string;
  startTime: number;
  messages: Message[];
}

// ============================================================
// SESSION MANAGEMENT
// ============================================================

/**
 * Tạo Session ID duy nhất cho mỗi phiên chat
 * @returns Session ID string
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Tạo object phiên chat mới
 * @returns ChatSession object
 */
export function createChatSession(): ChatSession {
  return {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    messages: []
  };
}

// ============================================================
// LEAD DATA EXTRACTION
// ============================================================

/**
 * Regex pattern để phát hiện tag dữ liệu lead trong AI response
 */
const LEAD_DATA_PATTERN = /\|\|LEAD_DATA:\s*(\{.*?\})\s*\|\|/;

/**
 * Parse và validate JSON data từ tag ||LEAD_DATA:..||
 * @param jsonString - JSON string từ AI response
 * @returns LeadData object hoặc null nếu invalid
 */
function parseLeadDataJSON(jsonString: string): LeadData | null {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Validate structure
    if (typeof parsed !== 'object' || parsed === null) {
      console.warn('❌ Lead data phải là object');
      return null;
    }

    return {
      name: parsed.name || null,
      phone: parsed.phone || null,
      email: parsed.email || null,
    };
  } catch (error) {
    console.error('❌ Lỗi parse JSON lead data:', error);
    return null;
  }
}

/**
 * Xử lý response từ AI - bóc tách lead data và làm sạch text
 * @param aiResponse - Response từ AI chatbot
 * @returns Processed response với lead data (nếu có)
 */
export function processAIResponse(aiResponse: string): ProcessedResponse {
  // Tìm lead data tag
  const match = aiResponse.match(LEAD_DATA_PATTERN);
  
  if (!match || !match[1]) {
    // Không có lead data
    return {
      cleanResponse: aiResponse.trim(),
      hasLeadData: false
    };
  }

  // Parse lead data
  const leadData = parseLeadDataJSON(match[1]);
  
  if (!leadData) {
    // JSON không valid - chỉ xóa tag
    return {
      cleanResponse: aiResponse.replace(LEAD_DATA_PATTERN, "").trim(),
      hasLeadData: false
    };
  }

  // Có lead data hợp lệ
  console.log("✅ Dữ liệu khách hàng bóc được:", leadData);
  
  return {
    cleanResponse: aiResponse.replace(LEAD_DATA_PATTERN, "").trim(),
    leadData,
    hasLeadData: true
  };
}

// ============================================================
// CHAT HISTORY FORMATTING
// ============================================================

/**
 * Format lại lịch sử chat thành text dễ đọc cho Google Sheets
 * @param messages - Mảng tin nhắn chat
 * @returns Formatted chat history string
 */
export function formatChatHistory(messages: Message[]): string {
  if (!messages || messages.length === 0) {
    return "";
  }

  return messages
    .filter(msg => msg.id !== "welcome") // Bỏ welcome message
    .map(msg => {
      const role = msg.sender === 'user' ? 'Khách' : 'AI';
      // Lọc bỏ tag lead data khỏi content trước khi lưu
      const content = msg.text.replace(LEAD_DATA_PATTERN, "").trim();
      return `${role}: ${content}`;
    })
    .join('\n\n');
}

// ============================================================
// LEAD DATA VALIDATION
// ============================================================

/**
 * Kiểm tra xem lead data có thông tin hữu ích không
 * @param leadData - Lead data object
 * @returns true nếu có ít nhất 1 field không null
 */
export function hasValidLeadData(leadData: LeadData): boolean {
  return !!(leadData.name || leadData.phone || leadData.email);
}

/**
 * Validate format số điện thoại Việt Nam
 * @param phone - Số điện thoại
 * @returns true nếu format hợp lệ
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  
  // Regex cho số điện thoại VN (10-11 số, bắt đầu bằng 0)
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Validate format email
 * @param email - Email address
 * @returns true nếu format hợp lệ
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
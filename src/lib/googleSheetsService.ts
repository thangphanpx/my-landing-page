/**
 * 📊 Google Sheets Lead Storage Service 
 * 
 * Service chuyên về việc:
 * - Gửi dữ liệu lead lên Google Apps Script
 * - Xử lý lưu trữ vào Google Sheets
 * - Error handling và retry logic
 * - Logging và monitoring
 * 
 * @author AI Expert Assistant
 * @version 1.0.0
 */

import { LeadData } from './leadDataExtractor';

// ============================================================
// CONFIGURATION
// ============================================================

/**
 * URL của Google Apps Script Web App 
 * TODO: Cập nhật URL thật sau khi deploy Google Apps Script
 */
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbz0ljz3kAcpf2GVChqhW21oUd1hb78MAPJNws3KUwh0MZW-CHiJFX_6MlNkdspZw442/exec';

/**
 * Timeout cho request (milliseconds)
 */
const REQUEST_TIMEOUT = 10000; // 10 seconds

// ============================================================
// TYPES & INTERFACES  
// ============================================================

export interface LeadSubmissionData {
  name: string;
  phone: string;
  email: string;
  source: string;
  sessionId: string;
  chatHistory: string;
  timestamp: string;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
  timestamp: number;
}

// ============================================================
// GOOGLE SHEETS INTEGRATION
// ============================================================

/**
 * Gửi dữ liệu lead lên Google Apps Script → Google Sheets
 * @param leadData - Dữ liệu khách hàng
 * @param chatHistoryText - Lịch sử chat đã format
 * @param sessionId - ID phiên chat
 * @returns Promise<SubmissionResult>
 */
export async function sendLeadToGoogleSheets(
  leadData: LeadData,
  chatHistoryText: string,
  sessionId: string
): Promise<SubmissionResult> {
  try {
    console.log("📤 Bắt đầu gửi dữ liệu lead:", leadData);

    // Chuẩn bị payload
    const payload: LeadSubmissionData = {
      name: leadData.name || '',
      phone: leadData.phone || '',
      email: leadData.email || '',
      source: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      sessionId: sessionId,
      chatHistory: chatHistoryText,
      timestamp: new Date().toLocaleString('vi-VN')
    };

    // Tạo AbortController để handle timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    // Gửi request
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script yêu cầu mode này
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    // Clear timeout
    clearTimeout(timeoutId);

    console.log("✅ Đã gửi dữ liệu lead thành công!");

    // Note: Với mode 'no-cors', response.ok luôn là true
    // Chúng ta phải rely vào không có exception để biết thành công
    return {
      success: true,
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("❌ Lỗi gửi dữ liệu lead:", error);

    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
      timestamp: Date.now()
    };
  }
}

// ============================================================
// RETRY & ERROR HANDLING
// ============================================================

/**
 * Gửi dữ liệu với retry logic (fallback nếu lần đầu thất bại)
 * @param leadData - Dữ liệu khách hàng
 * @param chatHistoryText - Lịch sử chat
 * @param sessionId - Session ID
 * @param maxRetries - Số lần retry tối đa
 * @returns Promise<SubmissionResult>
 */
export async function sendLeadWithRetry(
  leadData: LeadData,
  chatHistoryText: string,
  sessionId: string,
  maxRetries: number = 2
): Promise<SubmissionResult> {
  let lastError: string = '';

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    console.log(`📤 Attempt ${attempt}/${maxRetries + 1} - Gửi lead data...`);

    const result = await sendLeadToGoogleSheets(leadData, chatHistoryText, sessionId);

    if (result.success) {
      if (attempt > 1) {
        console.log(`✅ Thành công sau ${attempt} lần thử!`);
      }
      return result;
    }

    lastError = result.error || 'Unknown error';

    if (attempt <= maxRetries) {
      // Wait với exponential backoff
      const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s...
      console.log(`⏳ Retry sau ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.error(`❌ Tất cả ${maxRetries + 1} lần thử đều thất bại. Lỗi cuối: ${lastError}`);

  return {
    success: false,
    error: `Failed after ${maxRetries + 1} attempts: ${lastError}`,
    timestamp: Date.now()
  };
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Validate Google Apps Script URL
 * @returns true nếu URL đã được cấu hình
 */
export function isGoogleScriptConfigured(): boolean {
  return GOOGLE_SCRIPT_URL.length > 0;
}

/**
 * Log lead submission để tracking
 * @param leadData - Dữ liệu lead
 * @param result - Kết quả submission
 */
export function logLeadSubmission(leadData: LeadData, result: SubmissionResult): void {
  const logData = {
    timestamp: new Date().toISOString(),
    leadData: {
      hasName: !!leadData.name,
      hasPhone: !!leadData.phone,
      hasEmail: !!leadData.email,
    },
    result: result.success ? 'success' : 'failed',
    error: result.error
  };

  console.log("📊 Lead Submission Log:", logData);

  // TODO: Có thể gửi lên analytics service để tracking
  // trackEvent('lead_submission', logData);
}

/**
 * Tạo summary ngắn gọn về dữ liệu lead để logging
 * @param leadData - Lead data
 * @returns Summary string
 */
export function createLeadSummary(leadData: LeadData): string {
  const fields = [];
  if (leadData.name) fields.push(`Name: ${leadData.name}`);
  if (leadData.phone) fields.push(`Phone: ${leadData.phone}`);
  if (leadData.email) fields.push(`Email: ${leadData.email}`);

  return fields.length > 0 ? fields.join(', ') : 'No lead data';
}
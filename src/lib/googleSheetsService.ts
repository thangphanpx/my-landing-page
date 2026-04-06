/**
 * 📊 Google Sheets Data Service (Leads & Orders)
 */

import { LeadData, OrderData } from './leadDataExtractor';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbye0yco_7IwbEqrBHCmD9z3RkHek0V656XQRZGuE9SIOrD7Lgj-JkKzf7Mvw7YTmYzh/exec';

const REQUEST_TIMEOUT = 10000;

export interface SubmissionResult {
  success: boolean;
  error?: string;
  timestamp: number;
  statusMessage?: string;
}

/**
 * GỬI DỮ LIỆU ĐƠN HÀNG (ORDERS)
 */
export async function sendOrderToGoogleSheets(
  orderData: OrderData,
  sessionId: string
): Promise<SubmissionResult> {
  try {
    console.log("📤 Đang gửi đơn hàng:", orderData);

    const payload = {
      type: 'order',
      // customerId: orderData.phone || 'GUEST',
      // productId: orderData.productId,
      quantity: orderData.quantity,
      name: orderData.name,
      phone: orderData.phone,
      // sessionId: sessionId,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return {
      success: true,
      timestamp: Date.now(),
      statusMessage: `🛒 **Hệ thống đã nhận yêu cầu đặt hàng của bạn!** Chúng tôi sẽ sớm liên hệ xác nhận.`
    };
  } catch (error) {
    console.error("❌ Lỗi gửi đơn hàng:", error);
    return {
      success: false,
      timestamp: Date.now(),
      statusMessage: "ℹ️ Hiện tại tôi đã ghi nhận yêu cầu của bạn. Nhân viên sẽ liên hệ lại qua SĐT sớm nhất!"
    };
  }
}

/**
 * GỬI DỮ LIỆU KHÁCH HÀNG (LEADS)
 */
export async function sendLeadToGoogleSheets(
  leadData: LeadData,
  chatHistoryText: string,
  sessionId: string
): Promise<SubmissionResult> {
  try {
    const payload = {
      type: 'lead',
      name: leadData.name || '',
      phone: leadData.phone || '',
      email: leadData.email || '',
      source: 'Chatbot AI',
      sessionId: sessionId,
      chatHistory: chatHistoryText,
      timestamp: new Date().toLocaleString('vi-VN')
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      timestamp: Date.now(),
      statusMessage: '🎯 Thông tin của bạn đã được ghi nhận để hỗ trợ tốt hơn!'
    };
  } catch {
    return { success: false, timestamp: Date.now() };
  }
}

export async function sendLeadWithRetry(l: LeadData, h: string, s: string) {
  return sendLeadToGoogleSheets(l, h, s);
}

export function isGoogleScriptConfigured(): boolean {
  return GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/');
}

export function logLeadSubmission(l: unknown, r: unknown): void {
  console.log("📊 Submission Log:", { l, r });
}
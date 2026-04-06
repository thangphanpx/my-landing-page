/**
 * 🎯 Lead & Order Data Extractor
 */

import { Message } from '@/types';

export interface LeadData {
  name: string | null;
  phone: string | null;
  email: string | null;
}

export interface OrderData {
  name: string | null;
  phone: string | null;
  productId: string;
  quantity: number;
}

export interface ProcessedResponse {
  cleanResponse: string;
  leadData?: LeadData;
  orderData?: OrderData;
  hasLeadData: boolean;
  hasOrderData: boolean;
}

export interface ChatSession {
  sessionId: string;
  startTime: number;
  messages: Message[];
}

export function generateSessionId(): string {
  return `session_${Date.now()}`;
}

export function createChatSession(): ChatSession {
  return {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    messages: []
  };
}

export function processAIResponse(aiResponse: string): ProcessedResponse {
  let cleanResponse = aiResponse;
  let leadData: LeadData | undefined;
  let orderData: OrderData | undefined;
  
  const leadMatch = aiResponse.match(/\|\|LEAD_DATA:\s*(\{[\s\S]*?\})\s*\|\|/);
  if (leadMatch) {
    try {
      leadData = JSON.parse(leadMatch[1]);
      cleanResponse = cleanResponse.replace(leadMatch[0], "");
    } catch(e) {}
  }

  const orderMatch = aiResponse.match(/\|\|ORDER_DATA:\s*(\{[\s\S]*?\})\s*\|\|/);
  if (orderMatch) {
    try {
      orderData = JSON.parse(orderMatch[1]);
      cleanResponse = cleanResponse.replace(orderMatch[0], "");
    } catch(e) {}
  }

  return {
    cleanResponse: cleanResponse.trim(),
    leadData,
    orderData,
    hasLeadData: !!leadData,
    hasOrderData: !!orderData
  };
}

export function formatChatHistory(messages: Message[]): string {
  return messages.map(m => `${m.sender}: ${m.text}`).join('\n\n');
}
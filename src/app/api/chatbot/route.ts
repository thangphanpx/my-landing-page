import { NextRequest, NextResponse } from 'next/server';
import { getOpenRouterClient, getOpenRouterModel } from '@/lib/openrouter';
import { getValidatedSystemPrompt } from '@/lib/prompt_system';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

/**
 * Extracts error message from error cause or falls back to main error message
 */
const extractErrorMessage = (errorCause: unknown, fallbackMessage: string): string => {
  if (typeof errorCause === 'object' && errorCause !== null && 'message' in errorCause) {
    return String((errorCause as { message?: unknown }).message);
  }
  return fallbackMessage;
};

/**
 * Checks if error message indicates authentication/authorization issues
 */
const isAuthenticationError = (message: string): boolean => {
  return message.includes('User not found') || message.includes('Unauthorized');
};



export async function POST(request: NextRequest) {
  console.log('🚀 Chatbot API called');
  
  try {
    const { messages }: ChatRequest = await request.json();
    console.log('📥 Received messages:', messages?.length || 0);
    
    if (!messages || !Array.isArray(messages)) {
      console.log('❌ Invalid messages format');
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Load system prompt từ prompt_system.ts
    console.log('🔄 Loading system prompt...');
    const systemPrompt = getValidatedSystemPrompt();
    console.log('✅ System prompt loaded, length:', systemPrompt.length);
    
    // Chuẩn bị messages cho API
    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.filter(msg => msg.role !== 'system')
    ];
    console.log('📤 Sending to CES API, messages count:', apiMessages.length);

    console.log('🌐 Calling CES API via OpenAI SDK...');
    const cesClient = getOpenRouterClient();
    const completion = await cesClient.chat.completions.create({
      model: getOpenRouterModel(),
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log('✅ CES API response received');

    // Extract response
    const assistantMessage = completion.choices?.[0]?.message?.content || 
      'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này. Vui lòng liên hệ trực tiếp với chuyên gia qua email a@example.com hoặc Zalo 0123456789.';

    console.log('✅ Returning response to client');    
    return NextResponse.json({
      message: assistantMessage,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCause =
      typeof error === 'object' && error !== null && 'cause' in error
        ? (error as { cause?: unknown }).cause
        : undefined;

    console.error('❌ Chat API error:', {
      message: errorMessage,
      cause: errorCause,
      stack: error instanceof Error ? error.stack : undefined,
    });

    const upstreamMessage = extractErrorMessage(errorCause, errorMessage);

    return NextResponse.json(
      {
        error: 'CES API request failed',
        message: isAuthenticationError(upstreamMessage)
          ? 'CES API key hoặc cấu hình không hợp lệ. Vui lòng kiểm tra lại cấu hình API trong openrouter.ts'
          : upstreamMessage,
      },
      { status: 500 }
    );
  }
}
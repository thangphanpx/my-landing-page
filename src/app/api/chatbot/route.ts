import { NextRequest, NextResponse } from 'next/server';
import { getOpenRouterClient, getOpenRouterModel } from '@/lib/openrouter';
import { getSystemPrompt, FALLBACK_SYSTEM_PROMPT, validateSystemPrompt } from '@/lib/prompt_system';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}



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
    let systemPrompt: string;
    try {
      systemPrompt = getSystemPrompt();
      console.log('✅ System prompt loaded, length:', systemPrompt.length);
      
      // Validate system prompt
      const validation = validateSystemPrompt(systemPrompt);
      if (!validation.isValid) {
        console.warn('⚠️ System prompt validation failed:', validation.error);
        systemPrompt = FALLBACK_SYSTEM_PROMPT;
      }
    } catch (error) {
      console.error('❌ Failed to load system prompt:', error);
      systemPrompt = FALLBACK_SYSTEM_PROMPT;
    }
    
    // Chuẩn bị messages cho API
    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.filter(msg => msg.role !== 'system')
    ];
    console.log('📤 Sending to OpenRouter, messages count:', apiMessages.length);

    console.log('🌐 Calling OpenRouter API via OpenAI SDK...');
    const openRouter = getOpenRouterClient();
    const completion = await openRouter.chat.completions.create({
      model: getOpenRouterModel(),
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log('✅ OpenRouter response received');

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

    const upstreamMessage =
      typeof errorCause === 'object' && errorCause !== null && 'message' in errorCause
        ? String((errorCause as { message?: unknown }).message)
        : errorMessage;

    return NextResponse.json(
      {
        error: 'OpenRouter request failed',
        message: upstreamMessage.includes('User not found')
          ? 'OpenRouter từ chối API key hiện tại. Hãy tạo API key mới trên OpenRouter và cập nhật biến môi trường OPENROUTER_API_KEY.'
          : upstreamMessage,
      },
      { status: 500 }
    );
  }
}
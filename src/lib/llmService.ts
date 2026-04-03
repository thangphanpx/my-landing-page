import { ChatCompletionRequestMessage } from '@/types';
import { getCESClient, getCESModel } from '@/lib/openrouter';

/**
 * 🤖 CES LLM Service
 *
 * Sử dụng OpenAI SDK chính thức với API endpoint tùy chỉnh của CES.
 * Đảm bảo nhất quán với cấu hình trong openrouter.ts
 */

export async function callLLM(messages: ChatCompletionRequestMessage[]): Promise<string> {
  try {
    console.log('🔄 Calling CES LLM API with OpenAI SDK...');
    
    const cesClient = getCESClient();
    const completion = await cesClient.chat.completions.create({
      model: getCESModel(),
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || 'No response from AI';
    console.log('✅ CES LLM API response received');
    
    return response;
  } catch (error) {
    console.error('❌ Error calling CES LLM API:', error);
    throw new Error(`CES API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
import { ChatCompletionRequestMessage, ChatCompletionResponse } from '@/types';

const API_BASE = 'https://openrouter.ai/api/v1';
const MODEL = 'z-ai/glm-4.5-air:free';

export async function callLLM(messages: ChatCompletionRequestMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not defined in environment variables');
  }

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        // Optional: you can add temperature, max_tokens, etc.
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: ChatCompletionResponse = await response.json();
    return data.choices[0]?.message?.content || 'No response from AI';
  } catch (error) {
    console.error('Error calling LLM API:', error);
    throw error;
  }
}
import OpenAI from 'openai';

function normalizeEnvValue(value: string | undefined): string {
  return value?.trim().replace(/^['\"]|['\"]$/g, '') ?? '';
}

export function getOpenRouterClient(): OpenAI {
  const apiKey = normalizeEnvValue(process.env.OPENROUTER_API_KEY);

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured.');
  }

  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
    defaultHeaders: {
      'HTTP-Referer': normalizeEnvValue(process.env.NEXT_PUBLIC_SITE_URL) || 'http://localhost:3000',
      'X-OpenRouter-Title': normalizeEnvValue(process.env.OPENROUTER_SITE_NAME) || 'AI Expert Chatbot',
    },
  });
}

export function getOpenRouterModel(): string {
  return normalizeEnvValue(process.env.OPENROUTER_MODEL) || 'nvidia/nemotron-3-super-120b-a12b:free';
}
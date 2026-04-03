import OpenAI from 'openai';

/**
 * 🤖 CES Custom LLM Client
 *
 * Sử dụng OpenAI SDK chính thức với baseURL override trỏ về
 * API endpoint tùy chỉnh của CES (OpenAI-compatible).
 */

const CES_API_BASE_URL = process.env.CES_API_BASE_URL;
const CES_API_KEY = process.env.CES_API_KEY;
const CES_MODEL = process.env.CES_MODEL;

function getRequiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${name} is not defined in environment variables`);
  }

  return value;
}

/**
 * Khởi tạo OpenAI client nhưng override baseURL về API CES.
 * Toàn bộ cách gọi giữ nguyên chuẩn OpenAI SDK.
 */
export function getCESClient(): OpenAI {
  return new OpenAI({
    baseURL: getRequiredEnv('CES_API_BASE_URL', CES_API_BASE_URL),
    apiKey: getRequiredEnv('CES_API_KEY', CES_API_KEY),
  });
}

/**
 * Trả về tên model đang dùng.
 */
export function getCESModel(): string {
  return getRequiredEnv('CES_MODEL', CES_MODEL);
}

// --- Backward-compatible aliases (phòng khi code cũ vẫn import) ---
export const getOpenRouterClient = getCESClient;
export const getOpenRouterModel = getCESModel;
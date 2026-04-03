# 🤖 CES API Configuration

## Thông tin API LLM tùy chỉnh

Dự án này đã được cấu hình để sử dụng API LLM tùy chỉnh của CES, hoàn toàn tương thích với chuẩn OpenAI.

### 📋 Thông số cấu hình

| Thông số | Giá trị |
|----------|---------|
| **Base URL** | `` |
| **Endpoint** | `` |
| **Model** | `` |
| **API Key** | `` |

### 🔧 Files đã được cấu hình

1. **`src/lib/openrouter.ts`** - Cấu hình chính CES client với OpenAI SDK
2. **`src/lib/llmService.ts`** - Service sử dụng CES client
3. **`src/app/api/chatbot/route.ts`** - API route handler cho chatbot

### 🎯 Cách hoạt động

- Sử dụng **OpenAI SDK chính thức** với `baseURL` override
- API key được hard-code như yêu cầu  
- Model `ces-chatbot-gpt-5.4` được sử dụng cho tất cả requests
- Tuân thủ 100% chuẩn OpenAI API format

### 🚀 Testing

Để test API, chạy development server:

```bash
npm run dev
```

Sau đó truy cập chatbot trên trang web để test.

### 🔄 Thay đổi cấu hình

Nếu cần thay đổi API key, base URL hoặc model, chỉ cần cập nhật constants trong file `src/lib/openrouter.ts`:

```typescript
const CES_API_BASE_URL = 'https://9router.vuhai.io.vn/v1';
const CES_API_KEY = 'sk-4bd27113b7dc78d1-lh6jld-f4f9c69f';
const CES_MODEL = 'ces-chatbot-gpt-5.4';
```

---
✅ **Trạng thái:** API đã được tích hợp hoàn chỉnh và sẵn sàng sử dụng!
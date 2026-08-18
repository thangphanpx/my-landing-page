# 🤖 CES API Configuration

## Thông tin API LLM tùy chỉnh

Dự án này đã được cấu hình để sử dụng API LLM tùy chỉnh của CES, hoàn toàn tương thích với chuẩn OpenAI.

### 📋 Thông số cấu hình

Các thông số được đọc từ biến môi trường trong file `.env` (xem template ở `.env.example`), **không** hard-code trong source code:

| Biến môi trường | Ý nghĩa |
|----------|---------|
| `CES_API_BASE_URL` | Base URL của API CES (OpenAI-compatible) |
| `CES_API_KEY` | API key để xác thực với CES |
| `CES_MODEL` | Tên model sử dụng cho mọi request |

### 🔧 Files đã được cấu hình

1. **`src/lib/openrouter.ts`** - Cấu hình chính CES client với OpenAI SDK, đọc 3 biến trên từ `process.env`
2. **`src/lib/llmService.ts`** - Service sử dụng CES client
3. **`src/app/api/chatbot/route.ts`** - API route handler cho chatbot

### 🎯 Cách hoạt động

- Sử dụng **OpenAI SDK chính thức** với `baseURL` override
- API key được đọc từ biến môi trường (`.env`), nếu thiếu sẽ throw lỗi ngay khi khởi tạo client
- Tuân thủ 100% chuẩn OpenAI API format

### 🚀 Testing

1. Tạo file `.env` từ template và điền giá trị thật:
   ```bash
   cp .env.example .env
   ```
2. Chạy development server:
   ```bash
   npm run dev
   ```
3. Truy cập chatbot trên trang web để test.

### 🔄 Thay đổi cấu hình

Nếu cần thay đổi API key, base URL hoặc model, chỉ cần cập nhật giá trị tương ứng trong file `.env` — **không** sửa trực tiếp trong `src/lib/openrouter.ts`:

```bash
CES_API_BASE_URL=https://your-api-host/v1
CES_API_KEY=sk-your-real-key
CES_MODEL=your-model-name
```

---
✅ **Trạng thái:** API đã được tích hợp hoàn chỉnh và sẵn sàng sử dụng!
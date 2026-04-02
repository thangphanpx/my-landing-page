# 🤖 AI Expert Chatbot System

Hệ thống chatbot AI chuyên nghiệp được tích hợp với OpenRouter API để hỗ trợ khách hàng tự động.

## ⚙️ Thiết Lập API

### 1. Tạo API Key OpenRouter
1. Truy cập [OpenRouter](https://openrouter.ai/keys)
2. Đăng ký/Đăng nhập tài khoản
3. Tạo API key mới
4. Copy API key

### 2. Cấu Hình Environment Variables
```bash
# Tạo file .env.local từ template
cp .env.example .env.local

# Chỉnh sửa .env.local và thêm:
OPENROUTER_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Cài Đặt Dependencies (nếu cần)
```bash
npm install marked dompurify
npm install -D @types/marked @types/dompurify
```

## 🏗️ Cấu Trúc Hệ Thống

### Files Chính:
- `chatbot_data.txt` - Dữ liệu chuyên gia
- `src/lib/prompt_system.ts` - **[NEW]** System prompt logic & validation
- `src/app/api/chatbot/route.ts` - API endpoint 
- `src/lib/chatService.ts` - Logic xử lý chat
- `src/components/sections/Chatbot.tsx` - UI component
- `src/types/index.ts` - TypeScript interfaces

### 🎯 System Prompt Module (`prompt_system.ts`):

#### **Core Functions:**

```typescript
// Load dữ liệu từ chatbot_data.txt
loadChatbotData(): string

// Tạo system prompt hoàn chỉnh
createSystemPrompt(data: string): string

// Get system prompt sẵn sàng dùng
getSystemPrompt(): string

// Validate system prompt
validateSystemPrompt(prompt: string): ValidationResult
```

#### **Features:**
- ✅ **Auto-load data** từ `chatbot_data.txt`
- ✅ **Error handling** với fallback prompt
- ✅ **Validation** prompt length & content  
- ✅ **Modular design** dễ maintain
- ✅ **TypeScript typed** đầy đủ

#### **Fallback System:**
```typescript
FALLBACK_SYSTEM_PROMPT // Backup khi file lỗi
```

### Flow Hoạt Động:
1. **Load Data**: `prompt_system.ts` đọc `chatbot_data.txt` → validate → tạo system prompt
2. **User Input**: Người dùng gửi tin nhắn
3. **API Call**: Gửi request đến OpenRouter Claude API với system prompt
4. **Response**: Nhận phản hồi → render markdown
5. **History**: Lưu lịch sử chat trong session

## 🤖 Quy Tắc AI Assistant

### Logic System Prompt:
- ✅ **Chỉ trả lời** dựa trên Knowledge Base
- ✅ **Format Markdown** đẹp mắt
- ✅ **Thân thiện** + kết thúc bằng lời mời
- ✅ **Từ chối nhẹ** nếu ngoài phạm vi + hướng dẫn liên hệ

### Knowledge Base:
- Tên: Nguyễn Văn A
- Chuyên môn: AI & Tự động hóa  
- Dịch vụ: MCP server, N8N AI, AI branding
- Khóa học: K89 - Agentic AI (12 buổi, Online Zoom)
- Liên hệ: a@example.com | Zalo 0123456789

## 🎨 Features

### ✨ UI/UX:
- [x] **Floating button** với hiệu ứng
- [x] **Chat window** responsive
- [x] **Auto scroll** xuống tin mới
- [x] **Enter to send** message
- [x] **Loading indicators** mượt mà
- [x] **Error handling** thân thiện
- [x] **Markdown rendering** với DOMPurify

### 🔧 Technical:
- [x] **Clean code** structure
- [x] **TypeScript** typed
- [x] **Error boundaries**
- [x] **Input validation**
- [x] **Loading states**
- [x] **Responsive design**

### 🚀 Bonus Features:
- [x] **Auto scroll** to bottom
- [x] **Enter key** support
- [x] **Mobile responsive**
- [x] **Smooth animations** (fade/slide)
- [x] **Real-time typing** indicators

## 🔌 API Endpoints

### POST `/api/chatbot`
```typescript
// Request
{
  messages: [
    { role: "user", content: "Câu hỏi của user" }
  ]
}

// Response - Success
{
  message: "Phản hồi AI markdown",
  timestamp: "2024-01-01T00:00:00.000Z"
}

// Response - Error
{
  error: "Error type",
  message: "User-friendly error message"
}
```

## 🎯 Cách Sử Dụng

### 1. Development:
```bash
npm run dev
```

### 2. Production:
```bash
npm run build
npm start
```

### 3. Tùy Chỉnh Data:
- Chỉnh sửa `chatbot_data.txt`
- Server sẽ tự động reload system prompt

## 🐛 Troubleshooting

### Lỗi API Key:
```
Error: API request failed
→ Kiểm tra OPENROUTER_API_KEY trong .env.local
```

### Lỗi Network:
```
Error: Failed to fetch
→ Kiểm tra internet connection
→ Kiểm tra CORS settings
```

### Lỗi System Prompt:
```
→ Kiểm tra file chatbot_data.txt tồn tại
→ Kiểm tra quyền đọc file
```

## 📝 Development Notes

### Code Style:
- **Components**: PascalCase
- **Functions**: camelCase  
- **Constants**: UPPER_CASE
- **Files**: kebab-case

### Best Practices:
- ✅ Error handling cho mọi API call
- ✅ Input validation user input
- ✅ Loading states cho UX
- ✅ TypeScript strict mode
- ✅ Responsive mobile-first

---

**🎉 Hệ thống sẵn sàng production!** 

Chỉ cần thêm OPENROUTER_API_KEY và deploy!
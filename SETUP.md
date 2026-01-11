# 🚀 Hướng Dẫn Cài Đặt và Chạy Dự Án

Dự án Nhà Đất - Full Stack Application với Next.js (Frontend) và Express.js + MongoDB (Backend)

## 📋 Yêu cầu hệ thống

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** >= 6.0 (hoặc MongoDB Atlas)

## 🔧 Cài đặt

### 1. Clone repository (nếu có)

```bash
git clone <repository-url>
cd nha_dat
```

### 2. Cài đặt Frontend (Next.js)

```bash
# Cài đặt dependencies cho frontend
npm install

# Tạo file .env.local
copy .env.example .env.local  # Windows
# hoặc
cp .env.example .env.local    # Linux/Mac
```

**Cấu hình .env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 3. Cài đặt Backend (Express.js)

```bash
# Di chuyển vào thư mục server
cd server

# Cài đặt dependencies
npm install

# Tạo file .env
copy .env.example .env  # Windows
# hoặc
cp .env.example .env    # Linux/Mac
```

**Cấu hình server/.env:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nhadat
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### 4. Cài đặt MongoDB

#### Option 1: MongoDB Local

**Windows:**
1. Download MongoDB Community Server từ [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install và chạy MongoDB service
3. Verify: mở Command Prompt và chạy `mongod --version`

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**macOS:**
```bash
# Dùng Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Đăng ký tài khoản tại [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster miễn phí
3. Lấy connection string
4. Cập nhật `MONGODB_URI` trong file `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nhadat
```

## 🏃 Chạy ứng dụng

### Option 1: Chạy cả Frontend và Backend riêng biệt

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server chạy tại: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend chạy tại: `http://localhost:3000`

### Option 2: Chạy đồng thời (thêm script vào package.json root)

Bạn có thể thêm vào `package.json` (root):
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev\" \"cd server && npm run dev\"",
    "dev:client": "npm run dev",
    "dev:server": "cd server && npm run dev"
  }
}
```

Sau đó cài `concurrently`:
```bash
npm install -D concurrently
```

Chạy:
```bash
npm run dev
```

## ✅ Kiểm tra

### 1. Kiểm tra Backend

Mở browser hoặc dùng curl:
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-10T10:00:00.000Z"
}
```

### 2. Kiểm tra Frontend

Mở browser: `http://localhost:3000`

### 3. Test API với Postman/Thunder Client

Import collection từ file `API_DOCS.md` hoặc test thủ công:

**Register:**
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

## 🎨 Frontend sử dụng Backend

Update file `services/api.service.ts` để kết nối với backend:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
```

Ví dụ sử dụng:

```typescript
import { apiService } from '@/services/api.service';

// Login
const response = await apiService.post('/auth/login', {
  email: 'test@example.com',
  password: '123456'
});

// Get properties
const properties = await apiService.get('/properties?page=1&limit=10');
```

## 🔐 Authentication Flow

1. User đăng ký/đăng nhập
2. Backend trả về JWT token
3. Frontend lưu token (localStorage/cookies)
4. Gửi token trong header cho các request cần auth:
```
Authorization: Bearer YOUR_TOKEN
```

## 📁 Cấu trúc Project

```
nha_dat/
├── app/              # Next.js pages (Frontend)
├── components/       # React components
├── lib/              # Frontend utilities
├── hooks/            # React hooks
├── types/            # Frontend types
├── services/         # API services
├── constants/        # Constants
├── config/           # Frontend config
└── server/           # Backend (Express.js)
    ├── src/
    │   ├── config/       # Database config
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Mongoose models
    │   ├── routes/       # API routes
    │   ├── middlewares/  # Custom middlewares
    │   ├── utils/        # Utilities
    │   └── index.ts      # Entry point
    └── package.json
```

## 🐛 Troubleshooting

### MongoDB connection error
- Kiểm tra MongoDB service đã chạy chưa: `mongod --version`
- Kiểm tra connection string trong `.env`
- Nếu dùng Atlas, kiểm tra IP whitelist

### Port already in use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### CORS errors
- Kiểm tra `CORS_ORIGIN` trong backend `.env`
- Đảm bảo frontend chạy đúng port (3000)

### JWT errors
- Kiểm tra `JWT_SECRET` đã được set chưa
- Token có thể đã hết hạn, đăng nhập lại

## 📚 Tài liệu

- **Backend API:** Xem `server/API_DOCS.md`
- **Frontend Structure:** Xem `STRUCTURE.md`
- **Backend README:** Xem `server/README.md`

## 🎯 Next Steps

1. ✅ Setup project
2. ✅ Chạy backend và frontend
3. 🔲 Tạo UI components
4. 🔲 Kết nối frontend với backend
5. 🔲 Implement authentication flow
6. 🔲 Tạo các trang: Home, Properties, Property Detail, Profile
7. 🔲 Upload images (Cloudinary)
8. 🔲 Deploy production

## 🤝 Support

Nếu gặp vấn đề, hãy check:
1. Console logs (Frontend: Browser DevTools, Backend: Terminal)
2. Network tab trong DevTools
3. MongoDB logs
4. Documentation files

Happy coding! 🚀

# 🚀 Quick Start - Authentication System

## Khởi động nhanh hệ thống đăng nhập/đăng ký

### 📋 Yêu cầu

- Node.js 18+
- MongoDB (local hoặc cloud)
- npm hoặc yarn

### ⚡ Bước 1: Cấu hình Backend (2 phút)

```bash
# 1. Tạo file .env trong thư mục server/
cd server
```

Tạo file `server/.env`:

```env
NODE_ENV=development
PORT=5000
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/nha_dat_dev
JWT_SECRET=nha-dat-secret-key-2024
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=nha-dat-refresh-key-2024
JWT_REFRESH_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

```bash
# 2. Cài đặt dependencies
npm install

# 3. Khởi động backend
npm run dev
```

✅ Backend chạy tại: http://localhost:5000

### ⚡ Bước 2: Cấu hình Frontend (1 phút)

```bash
# Quay về thư mục root
cd ..
```

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

```bash
# Cài đặt dependencies (nếu chưa)
npm install

# Khởi động frontend
npm run dev
```

✅ Frontend chạy tại: http://localhost:3000

### 🎯 Bước 3: Test (30 giây)

1. Mở browser: http://localhost:3000
2. Click "Đăng ký" ở header
3. Điền form và submit
4. ✅ Thành công! Bạn sẽ được chuyển đến dashboard

### 📝 Test Accounts

#### Tạo Admin Account

```bash
# Connect to MongoDB
mongosh

# Switch to database
use nha_dat_dev

# Create admin (password: admin123)
db.users.insertOne({
  name: "Admin",
  email: "admin@nhadat.com",
  password: "$2a$10$rXzJ7KlZQqYlF9.X5YYqEOxGxXW8B8xJQ5YMZh7YxYLZ9xYz8Z9.m",
  role: "admin",
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Login admin tại: http://localhost:3000/admin/login

### 🔍 Kiểm tra

#### Backend Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

#### Test Register API

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test Login API

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 📱 Pages đã có

| URL | Mô tả |
|-----|-------|
| `/dang-nhap` | Đăng nhập user |
| `/dang-ky` | Đăng ký tài khoản |
| `/quen-mat-khau` | Quên mật khẩu |
| `/admin/login` | Đăng nhập admin |
| `/dashboard` | Dashboard user (protected) |

### 🛠️ Troubleshooting

#### Backend không khởi động

```bash
# Kiểm tra MongoDB đang chạy
mongosh
# hoặc
mongo

# Nếu chưa cài MongoDB, dùng Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### CORS Error

Kiểm tra `server/.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

Restart backend sau khi thay đổi.

#### Frontend không connect Backend

Kiểm tra `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Restart frontend sau khi thay đổi (Ctrl+C và `npm run dev`).

### ✨ Features

- ✅ Đăng ký tài khoản
- ✅ Đăng nhập (User & Admin)
- ✅ Đăng xuất
- ✅ Quên mật khẩu
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ User Menu trong Header
- ✅ Responsive Design

### 📚 Tài liệu chi tiết

- `AUTHENTICATION.md` - Hướng dẫn authentication đầy đủ
- `BACKEND_FRONTEND_INTEGRATION.md` - Hướng dẫn tích hợp
- `server/README_BACKEND_JWT.md` - Backend API docs

### 🎉 Hoàn thành!

Bây giờ bạn có thể:

1. Đăng ký tài khoản mới
2. Đăng nhập
3. Truy cập dashboard
4. Đăng xuất
5. Quên mật khẩu
6. Login admin

**Happy coding! 🚀**

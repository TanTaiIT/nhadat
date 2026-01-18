# Hướng Dẫn Tích Hợp Backend JWT với Frontend

## 🎯 Tổng Quan

Hướng dẫn chi tiết để kết nối Frontend (Next.js) với Backend (Express + JWT).

## 📋 Checklist Tích Hợp

### ✅ Backend (Đã hoàn thành)

- [x] User Model với JWT methods
- [x] Auth Controller với đầy đủ endpoints
- [x] JWT utilities (generate, verify tokens)
- [x] Auth middleware (protect, authorize)
- [x] Password reset flow
- [x] Refresh token endpoint
- [x] Input validation
- [x] Error handling

### ✅ Frontend (Đã hoàn thành)

- [x] Auth Service (API calls)
- [x] Auth Context (State management)
- [x] Login/Register components
- [x] Protected routes middleware
- [x] Header with user menu
- [x] Token management (localStorage)

## 🚀 Bước 1: Cấu hình Backend

### 1.1. Tạo file `.env` trong thư mục `server/`

```env
NODE_ENV=development
PORT=5000
API_VERSION=v1

# CORS - URL của Frontend
CORS_ORIGIN=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/nha_dat_dev

# JWT Secrets (PHẢI THAY ĐỔI TRONG PRODUCTION!)
JWT_SECRET=nha-dat-jwt-secret-key-2024-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=nha-dat-refresh-secret-key-2024-change-this-in-production
JWT_REFRESH_EXPIRE=30d

# Frontend URL (cho password reset links)
FRONTEND_URL=http://localhost:3000
```

### 1.2. Cài đặt và khởi động MongoDB

```bash
# Mac (với Homebrew)
brew services start mongodb-community

# Windows (với MongoDB service)
net start MongoDB

# Linux
sudo systemctl start mongod

# Hoặc dùng Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 1.3. Khởi động Backend Server

```bash
cd server
npm install
npm run dev
```

Backend sẽ chạy tại: **http://localhost:5000**

Kiểm tra health: http://localhost:5000/health

## 🌐 Bước 2: Cấu hình Frontend

### 2.1. Tạo file `.env.local` trong thư mục root (nha_dat/)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 2.2. Khởi động Frontend

```bash
# Ở thư mục root (nha_dat/)
npm install
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

## 🧪 Bước 3: Test Tích Hợp

### 3.1. Test Đăng Ký

1. Mở browser: http://localhost:3000/dang-ky
2. Điền form đăng ký:
   - Họ: `Nguyen`
   - Tên: `Van A`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - ✓ Đồng ý điều khoản
3. Click "Đăng ký"
4. Kiểm tra:
   - ✅ Chuyển hướng đến `/dashboard`
   - ✅ Header hiển thị tên user
   - ✅ Token được lưu trong localStorage

### 3.2. Test Đăng Nhập

1. Đăng xuất (nếu đang login)
2. Mở: http://localhost:3000/dang-nhap
3. Điền form:
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Đăng nhập"
5. Kiểm tra tương tự như đăng ký

### 3.3. Test Admin Login

1. Tạo admin user trong MongoDB:

```javascript
// Connect to MongoDB shell
use nha_dat_dev

// Tạo admin user (password: admin123)
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

2. Login tại: http://localhost:3000/admin/login
3. Kiểm tra chuyển đến `/admin`

### 3.4. Test Protected Routes

1. Đăng xuất
2. Truy cập: http://localhost:3000/dashboard
3. Kiểm tra được redirect về `/dang-nhap?redirect=/dashboard`

### 3.5. Test Refresh Token

1. Đăng nhập
2. Đợi token hết hạn (hoặc xóa accessToken trong localStorage)
3. Reload trang
4. Kiểm tra token được refresh tự động

## 🔍 Kiểm tra Browser DevTools

### Kiểm tra Network Tab

1. Mở DevTools (F12)
2. Chuyển đến tab "Network"
3. Đăng nhập
4. Kiểm tra request:

```
POST http://localhost:5000/api/v1/auth/login
Status: 200
Response:
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": {...},
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 604800
  }
}
```

### Kiểm tra Console

Không có errors. Nếu có errors, check:

- CORS errors → Kiểm tra `CORS_ORIGIN` trong backend .env
- Network errors → Kiểm tra backend đang chạy
- 401 errors → Kiểm tra token

### Kiểm tra Application/Storage Tab

1. Chuyển đến tab "Application" (Chrome) hoặc "Storage" (Firefox)
2. Xem "Local Storage" → `http://localhost:3000`
3. Kiểm tra có 2 keys:
   - `accessToken`: eyJhbGc...
   - `refreshToken`: eyJhbGc...

## 🛠️ Debugging

### Backend không khởi động

```bash
# Kiểm tra MongoDB đang chạy
mongosh
# Hoặc
mongo

# Kiểm tra port 5000 đã được dùng chưa
# Mac/Linux
lsof -i :5000

# Windows
netstat -ano | findstr :5000
```

### Frontend không kết nối được Backend

1. Kiểm tra Backend đang chạy: http://localhost:5000/health
2. Kiểm tra `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```
3. Restart frontend sau khi thay đổi .env:
   ```bash
   # Ctrl+C để stop, sau đó
   npm run dev
   ```

### CORS Errors

```
Access to fetch at 'http://localhost:5000/...' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Fix:**
1. Kiểm tra `server/.env`:
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```
2. Restart backend server

### Token không được lưu

1. Kiểm tra browser console có errors không
2. Kiểm tra response từ API có chứa tokens:
   ```json
   {
     "data": {
       "accessToken": "...",
       "refreshToken": "..."
     }
   }
   ```
3. Kiểm tra `authService.setTokens()` được gọi

### Redirect loop

1. Kiểm tra `middleware.ts`
2. Đảm bảo auth routes không bị protect:
   ```typescript
   if (pathname === '/admin/login') {
     return NextResponse.next();
   }
   ```

## 📊 Flow Diagram

### Registration Flow

```
User → Frontend (/dang-ky)
  → Fill form
  → Submit
    → POST /api/v1/auth/register
      → Backend validates
      → Hash password
      → Save to MongoDB
      → Generate tokens
      → Return user + tokens
    ← Response
  → Save tokens to localStorage
  → Update Auth Context
  → Redirect to /dashboard
```

### Login Flow

```
User → Frontend (/dang-nhap)
  → Fill form
  → Submit
    → POST /api/v1/auth/login
      → Backend validates
      → Check user exists
      → Compare password
      → Generate tokens
      → Return user + tokens
    ← Response
  → Save tokens to localStorage
  → Update Auth Context
  → Redirect based on role
    - admin → /admin
    - user → /dashboard
```

### Protected Route Flow

```
User → Access /dashboard
  → Middleware checks token
    → Has token?
      YES → Allow access
      NO  → Redirect to /dang-nhap?redirect=/dashboard
```

### Token Refresh Flow

```
Frontend → API call with expired token
  ← 401 Unauthorized
  → Check has refreshToken?
    YES → POST /api/v1/auth/refresh
      → Backend verifies refreshToken
      → Generate new accessToken
      ← Return new accessToken
    → Save new accessToken
    → Retry original API call
    NO → Redirect to /dang-nhap
```

## 🎨 API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": {
      "id": "6579...",
      "name": "Nguyen Van A",
      "email": "test@example.com",
      "role": "user",
      "profile": {
        "firstName": "Nguyen",
        "lastName": "Van A",
        "fullName": "Nguyen Van A"
      }
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 604800
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Email hoặc mật khẩu không đúng"
}
```

## 🔒 Security Best Practices

### ✅ Đã Implement

- Password hashing với bcrypt
- JWT tokens với expiration
- Protected routes với middleware
- CORS configuration
- Input validation
- Error handling
- HTTPS ready (production)

### ⚠️ Cần Implement (Production)

- [ ] Rate limiting
- [ ] Refresh token rotation
- [ ] Token blacklist khi logout
- [ ] IP whitelisting cho admin
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Audit logging

## 📝 Next Steps

1. **Email Service**: Implement nodemailer trong `sendEmail.ts`
2. **File Upload**: Avatar upload cho user profile
3. **Social Login**: Google, Facebook OAuth
4. **Admin Dashboard**: Hoàn thiện admin features
5. **Testing**: Unit tests, integration tests
6. **Documentation**: API docs với Swagger

## ✨ Hoàn thành!

Bây giờ bạn đã có hệ thống authentication hoàn chỉnh:

- ✅ Backend API với JWT
- ✅ Frontend với React Context
- ✅ Protected routes
- ✅ User management
- ✅ Admin portal

**Chạy cả 2 servers và test toàn bộ flow!**

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Truy cập: http://localhost:3000 🚀

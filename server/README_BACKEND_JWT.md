# Backend JWT Authentication - Hướng Dẫn Tích Hợp

## 🎯 Tổng Quan

Backend đã được hoàn thiện với JWT authentication đầy đủ để tích hợp với Frontend.

## 📦 Cài Đặt

### 1. Dependencies đã được cài

```json
{
  "bcryptjs": "^2.4.3",          // Hash passwords
  "jsonwebtoken": "^9.0.2",      // JWT tokens
  "express-validator": "^7.0.1", // Input validation
  "mongoose": "^8.0.3"           // MongoDB ODM
}
```

### 2. Cấu hình Environment Variables

Tạo file `.env` trong thư mục `server/`:

```env
# Server
NODE_ENV=development
PORT=5000
API_VERSION=v1

# CORS
CORS_ORIGIN=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/nha_dat_dev

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_REFRESH_EXPIRE=30d

# Frontend
FRONTEND_URL=http://localhost:3000

# Email (optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Khởi động server

```bash
cd server
npm install
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

## 🔐 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### 1. Đăng Ký (Register)

**Endpoint:** `POST /auth/register`

**Body:**
```json
{
  "name": "Nguyen Van A",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0912345678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "user": {
      "id": "...",
      "name": "Nguyen Van A",
      "email": "user@example.com",
      "phone": "0912345678",
      "role": "user",
      "avatar": "...",
      "emailVerified": false,
      "phoneVerified": false,
      "profile": {
        "firstName": "Nguyen",
        "lastName": "Van A",
        "fullName": "Nguyen Van A",
        "avatar": "...",
        "phone": "0912345678"
      },
      "createdAt": "...",
      "updatedAt": "..."
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 604800
  }
}
```

### 2. Đăng Nhập (Login)

**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Giống như Register

### 3. Làm mới Token (Refresh Token)

**Endpoint:** `POST /auth/refresh`

**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Làm mới token thành công",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 604800
  }
}
```

### 4. Lấy thông tin User hiện tại (Get Me)

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Nguyen Van A",
    "email": "user@example.com",
    "role": "user",
    ...
  }
}
```

### 5. Đăng xuất (Logout)

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

### 6. Quên mật khẩu (Forgot Password)

**Endpoint:** `POST /auth/forgot-password`

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email đặt lại mật khẩu đã được gửi"
}
```

### 7. Đặt lại mật khẩu (Reset Password)

**Endpoint:** `PUT /auth/reset-password`

**Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đặt lại mật khẩu thành công",
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### 8. Cập nhật thông tin (Update Details)

**Endpoint:** `PUT /auth/updatedetails`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Body:**
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "phone": "0987654321"
}
```

### 9. Đổi mật khẩu (Update Password)

**Endpoint:** `PUT /auth/updatepassword`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

## 🔧 Cách Frontend gọi API

### 1. Cấu hình API Service (Đã có)

File: `services/api.service.ts`

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
```

Thêm vào `.env.local` của Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 2. Auth Service đã tích hợp

File: `services/auth.service.ts` đã được tạo và tích hợp với các endpoints trên.

### 3. Sử dụng trong Components

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123'
      });
      // Success - user is logged in
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## 🔒 Bảo mật

### 1. Password Hashing

Passwords được hash bằng bcrypt với salt rounds = 10 trước khi lưu vào database.

### 2. JWT Tokens

- **Access Token**: Expires sau 7 ngày (configurable)
- **Refresh Token**: Expires sau 30 ngày (configurable)
- Tokens được sign với secret keys riêng biệt

### 3. Protected Routes

Middleware `protect` kiểm tra và verify JWT token:

```typescript
import { protect } from '../middlewares/auth';

router.get('/protected', protect, controller);
```

### 4. Role-based Authorization

```typescript
import { protect, authorize } from '../middlewares/auth';

// Only admin can access
router.get('/admin', protect, authorize('admin'), controller);

// Admin and agent can access
router.get('/data', protect, authorize('admin', 'agent'), controller);
```

## 🧪 Testing với Postman/Thunder Client

### 1. Register

```
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login

```
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy `accessToken` từ response.

### 3. Get Me (Protected)

```
GET http://localhost:5000/api/v1/auth/me
Authorization: Bearer <your-access-token>
```

## 📊 Database Schema

### User Model

```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String,
  role: 'user' | 'agent' | 'admin',
  isVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Production Deployment

### 1. Environment Variables

Đảm bảo set các env vars trong production:

- `NODE_ENV=production`
- `JWT_SECRET` - Strong secret key
- `JWT_REFRESH_SECRET` - Different strong secret key
- `MONGODB_URI` - Production database
- `CORS_ORIGIN` - Production frontend URL

### 2. Security Checklist

- ✅ Use HTTPS in production
- ✅ Set strong JWT secrets (min 32 characters)
- ✅ Enable rate limiting
- ✅ Use helmet for security headers
- ✅ Validate and sanitize all inputs
- ✅ Set proper CORS origin
- ✅ Use environment variables for secrets

## 🐛 Troubleshooting

### 1. Token không hợp lệ

- Kiểm tra JWT_SECRET trong .env
- Verify token chưa hết hạn
- Đảm bảo format: `Bearer <token>`

### 2. CORS errors

- Kiểm tra CORS_ORIGIN trong server/.env
- Đảm bảo frontend URL đúng

### 3. Database connection failed

- Kiểm tra MongoDB đang chạy
- Verify MONGODB_URI trong .env

### 4. Email không gửi được

- Implement nodemailer trong `sendEmail.ts`
- Cấu hình SMTP credentials

## 📚 Tài liệu tham khảo

- [JWT.io](https://jwt.io/)
- [Express Validator](https://express-validator.github.io/)
- [Mongoose](https://mongoosejs.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## 🎉 Hoàn thành!

Backend JWT authentication đã sẵn sàng tích hợp với Frontend. Chạy cả frontend và backend để test toàn bộ flow!

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

# ⚡ Quick Start Guide

Hướng dẫn nhanh để bắt đầu với dự án Nhà Đất.

## 🎯 Bước 1: Cài đặt MongoDB

### Option A: MongoDB Local (Windows)
```bash
# Download từ: https://www.mongodb.com/try/download/community
# Sau khi install, MongoDB sẽ tự động chạy như một service
```

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Đăng ký miễn phí tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster
3. Lấy connection string
4. Whitelist IP của bạn

## 🎯 Bước 2: Cài đặt Dependencies

```bash
# Root (Frontend)
npm install

# Backend
cd server
npm install
cd ..
```

## 🎯 Bước 3: Cấu hình Environment

### Frontend: Tạo `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Backend: Tạo `server/.env`
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nhadat
JWT_SECRET=my-secret-key-123456
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Nếu dùng MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nhadat
```

## 🎯 Bước 4: Chạy Ứng Dụng

### Windows PowerShell

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```
Chờ thấy: `✅ MongoDB Connected` và `🚀 Server is running`

**Terminal 2 - Frontend:**
```powershell
# Mở terminal mới ở root folder
npm run dev
```

### Linux/Mac

**Terminal 1 - Backend:**
```bash
cd server && npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🎯 Bước 5: Kiểm Tra

### 1. Kiểm tra Backend
Mở browser: http://localhost:5000/health

Nên thấy:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 2. Kiểm tra Frontend
Mở browser: http://localhost:3000

### 3. Test API đầu tiên

**Đăng ký user mới:**

Dùng Postman, Thunder Client, hoặc curl:

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"123456\"}"
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/register" -Method Post -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

Nếu thành công, bạn sẽ nhận được token!

## 🎯 Bước 6: Test các API khác

### Đăng nhập
```bash
POST http://localhost:5000/api/v1/auth/login
{
  "email": "test@example.com",
  "password": "123456"
}
```

Copy `token` từ response.

### Tạo bất động sản (cần token)
```bash
POST http://localhost:5000/api/v1/properties
Authorization: Bearer YOUR_TOKEN_HERE

{
  "title": "Căn hộ Vinhomes",
  "description": "Căn hộ 2PN đẹp",
  "price": 3000000000,
  "area": 80,
  "type": "apartment",
  "address": {
    "street": "123 Nguyễn Huệ",
    "ward": "Bến Nghé",
    "district": "Quận 1",
    "city": "Hồ Chí Minh"
  },
  "images": ["https://via.placeholder.com/400"]
}
```

**Note:** Để tạo property, user cần role `agent` hoặc `admin`. Update trong MongoDB:
```javascript
// MongoDB Shell hoặc Compass
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "agent" } }
)
```

### Lấy danh sách bất động sản
```bash
GET http://localhost:5000/api/v1/properties?page=1&limit=10
```

## 📱 Sử dụng với Frontend

Trong React component:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api.service';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiService.get('/properties');
      setProperties(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {properties.map(property => (
        <div key={property.id}>{property.title}</div>
      ))}
    </div>
  );
}
```

## 🐛 Common Issues

### Port đã được sử dụng

**Windows:**
```powershell
# Tìm process đang dùng port 5000
netstat -ano | findstr :5000

# Kill process (thay <PID> bằng số PID từ lệnh trên)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:5000 | xargs kill -9
```

### MongoDB không kết nối được

1. Kiểm tra MongoDB đã chạy:
```bash
# Windows (PowerShell as Admin)
Get-Service MongoDB

# Linux/Mac
sudo systemctl status mongodb
```

2. Kiểm tra connection string trong `.env`
3. Nếu dùng Atlas, kiểm tra IP whitelist

### CORS errors

Đảm bảo `CORS_ORIGIN` trong `server/.env` đúng với port frontend:
```env
CORS_ORIGIN=http://localhost:3000
```

### TypeScript errors trong server

```bash
cd server
npm run build
```

Nếu có lỗi, check `tsconfig.json` và install `@types/*` packages.

## 📚 Next Steps

1. ✅ Server chạy thành công
2. ✅ Test API với Postman
3. 🔲 Tạo UI components trong `components/`
4. 🔲 Tạo pages trong `app/`
5. 🔲 Kết nối frontend với backend API
6. 🔲 Implement authentication flow
7. 🔲 Build các tính năng chính

## 🆘 Need Help?

- Backend API docs: `server/API_DOCS.md`
- Frontend structure: `STRUCTURE.md`
- Full setup guide: `SETUP.md`

Happy coding! 🚀

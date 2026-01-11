# Backend API - Nhà Đất

Backend RESTful API cho ứng dụng Nhà Đất, được xây dựng với Express.js, Node.js, MongoDB và TypeScript.

## 🚀 Công nghệ sử dụng

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **TypeScript** - Type safety
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📁 Cấu trúc thư mục

```
server/
├── src/
│   ├── config/          # Cấu hình (Database, etc.)
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── index.ts         # Entry point
├── dist/                # Compiled JavaScript (auto-generated)
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## 🔧 Cài đặt

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Cấu hình môi trường

Copy file `.env.example` thành `.env` và cập nhật các giá trị:

```bash
cp .env.example .env
```

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nhadat
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### 3. Cài đặt MongoDB

**Windows:**
- Download MongoDB từ [mongodb.com](https://www.mongodb.com/try/download/community)
- Hoặc dùng MongoDB Atlas (cloud)

**Kiểm tra MongoDB:**
```bash
mongod --version
```

## 🏃 Chạy ứng dụng

### Development mode (with hot reload)
```bash
npm run dev
```

### Production mode
```bash
npm run build
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Đăng ký tài khoản | ❌ |
| POST | `/api/v1/auth/login` | Đăng nhập | ❌ |
| GET | `/api/v1/auth/me` | Lấy thông tin user hiện tại | ✅ |
| PUT | `/api/v1/auth/updatedetails` | Cập nhật thông tin | ✅ |
| PUT | `/api/v1/auth/updatepassword` | Đổi mật khẩu | ✅ |

### Properties

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/properties` | Lấy danh sách BĐS | ❌ |
| GET | `/api/v1/properties/:id` | Lấy chi tiết BĐS | ❌ |
| POST | `/api/v1/properties` | Tạo BĐS mới | ✅ |
| PUT | `/api/v1/properties/:id` | Cập nhật BĐS | ✅ |
| DELETE | `/api/v1/properties/:id` | Xóa BĐS | ✅ |
| GET | `/api/v1/properties/user/:userId` | Lấy BĐS của user | ❌ |

## 📝 API Examples

### 1. Đăng ký

```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "123456",
  "phone": "0123456789"
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
      "name": "Nguyễn Văn A",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Đăng nhập

```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "123456"
}
```

### 3. Tạo bất động sản

```bash
POST http://localhost:5000/api/v1/properties
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Căn hộ cao cấp Vinhomes",
  "description": "Căn hộ 2 phòng ngủ, view đẹp",
  "price": 3000000000,
  "area": 80,
  "type": "apartment",
  "address": {
    "street": "123 Nguyễn Huệ",
    "ward": "Bến Nghé",
    "district": "Quận 1",
    "city": "Hồ Chí Minh"
  },
  "features": {
    "bedrooms": 2,
    "bathrooms": 2,
    "furniture": "full",
    "parking": true
  },
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

### 4. Lấy danh sách bất động sản (with filters)

```bash
GET http://localhost:5000/api/v1/properties?page=1&limit=10&type=apartment&city=Hồ Chí Minh&minPrice=1000000000&maxPrice=5000000000
```

## 🔐 Authentication

API sử dụng JWT (JSON Web Tokens) để authentication. Sau khi đăng nhập/đăng ký, bạn sẽ nhận được token.

**Cách sử dụng:**

Thêm token vào header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 🛡️ Security Features

- Helmet.js - Security headers
- CORS protection
- Rate limiting
- Password hashing với bcrypt
- JWT authentication
- Input validation
- MongoDB injection protection

## 📊 Database Schema

### User Schema
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String,
  role: 'user' | 'agent' | 'admin',
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Property Schema
```typescript
{
  title: String,
  description: String,
  price: Number,
  area: Number,
  address: {
    street: String,
    ward: String,
    district: String,
    city: String,
    coordinates: { lat, lng }
  },
  type: 'apartment' | 'house' | 'land' | 'villa' | 'office',
  status: 'available' | 'sold' | 'rented' | 'pending',
  features: { ... },
  images: [String],
  owner: ObjectId (User),
  views: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Test API với curl
curl http://localhost:5000/health

# Hoặc dùng Postman, Insomnia, Thunder Client
```

## 📚 Scripts

```bash
npm run dev        # Chạy development mode
npm run build      # Build TypeScript -> JavaScript
npm start          # Chạy production
npm run watch      # Watch TypeScript changes
npm run lint       # Run ESLint
npm run format     # Format code với Prettier
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT

# 🏠 Nhà Đất - Real Estate Platform

Nền tảng mua bán và cho thuê bất động sản được xây dựng với Next.js, Express.js và MongoDB.

## 🚀 Công nghệ sử dụng

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **TypeScript** - Type safety

## 📁 Cấu trúc dự án

```
nha_dat/
├── app/              # Next.js App Router (Frontend)
├── components/       # React Components
│   ├── ui/          # UI components
│   ├── layout/      # Layout components
│   └── features/    # Feature components
├── lib/             # Utilities & helpers
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
├── services/        # API services
├── constants/       # Constants
├── config/          # Configuration
└── server/          # Backend API
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── middlewares/  # Middlewares
    │   └── config/       # Config files
    └── package.json
```

## 🔧 Cài đặt

### Yêu cầu
- Node.js >= 18
- MongoDB >= 6.0 (hoặc MongoDB Atlas)

### Quick Start

1. **Clone và cài đặt dependencies:**

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

2. **Cấu hình môi trường:**

Tạo file `.env.local` (frontend) và `server/.env` (backend). Xem chi tiết trong file `SETUP.md`.

3. **Chạy ứng dụng:**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📖 Tài liệu

- **[SETUP.md](./SETUP.md)** - Hướng dẫn cài đặt chi tiết
- **[STRUCTURE.md](./STRUCTURE.md)** - Cấu trúc frontend
- **[server/README.md](./server/README.md)** - Backend documentation
- **[server/API_DOCS.md](./server/API_DOCS.md)** - API endpoints

## ✨ Tính năng

- ✅ Authentication (Register/Login/JWT)
- ✅ Quản lý bất động sản (CRUD)
- ✅ Tìm kiếm và lọc BĐS
- ✅ Phân trang
- ✅ Upload hình ảnh
- ✅ User roles (user, agent, admin)
- ✅ RESTful API
- ✅ TypeScript full stack
- ✅ Responsive design

## 🛠️ Scripts

### Frontend
```bash
npm run dev          # Chạy dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend
```bash
cd server
npm run dev          # Chạy dev server (with hot reload)
npm run build        # Build TypeScript
npm start            # Start production server
```

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Đăng ký
- `POST /api/v1/auth/login` - Đăng nhập
- `GET /api/v1/auth/me` - Lấy thông tin user

### Properties
- `GET /api/v1/properties` - Danh sách BĐS
- `GET /api/v1/properties/:id` - Chi tiết BĐS
- `POST /api/v1/properties` - Tạo BĐS mới
- `PUT /api/v1/properties/:id` - Cập nhật BĐS
- `DELETE /api/v1/properties/:id` - Xóa BĐS

Chi tiết: [server/API_DOCS.md](./server/API_DOCS.md)

## 🎯 Roadmap

- [ ] Implement UI pages
- [ ] Connect frontend với backend
- [ ] Image upload với Cloudinary
- [ ] Google Maps integration
- [ ] Email notifications
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 📝 License

MIT

---

Made with ❤️ by Nhà Đất Team

# API Documentation - Nhà Đất

## Base URL
```
Development: http://localhost:5000/api/v1
Production: https://your-domain.com/api/v1
```

---

## 🔐 Authentication

### Register
Đăng ký tài khoản mới.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "123456",
  "phone": "0123456789"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Nguyễn Văn A",
      "email": "user@example.com",
      "phone": "0123456789",
      "role": "user",
      "avatar": "https://via.placeholder.com/150"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email đã được sử dụng"
}
```

---

### Login
Đăng nhập vào hệ thống.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

---

### Get Current User
Lấy thông tin user hiện tại.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "phone": "0123456789",
    "role": "user",
    "avatar": "https://via.placeholder.com/150",
    "isVerified": false,
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

---

### Update User Details
Cập nhật thông tin cá nhân.

**Endpoint:** `PUT /auth/updatedetails`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:**
```json
{
  "name": "Nguyễn Văn B",
  "email": "newmail@example.com",
  "phone": "0987654321"
}
```

---

### Update Password
Đổi mật khẩu.

**Endpoint:** `PUT /auth/updatepassword`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:**
```json
{
  "currentPassword": "123456",
  "newPassword": "newpassword123"
}
```

---

## 🏠 Properties

### Get All Properties
Lấy danh sách bất động sản (có phân trang và filter).

**Endpoint:** `GET /properties`

**Query Parameters:**
- `page` (number, default: 1) - Trang hiện tại
- `limit` (number, default: 10) - Số items mỗi trang
- `type` (string) - Loại BĐS: apartment, house, land, villa, office
- `status` (string) - Trạng thái: available, sold, rented, pending
- `city` (string) - Tỉnh/thành phố
- `district` (string) - Quận/huyện
- `minPrice` (number) - Giá tối thiểu
- `maxPrice` (number) - Giá tối đa
- `minArea` (number) - Diện tích tối thiểu
- `maxArea` (number) - Diện tích tối đa
- `search` (string) - Tìm kiếm theo tiêu đề/mô tả
- `sort` (string) - Sắp xếp: price, area, createdAt
- `order` (string) - Thứ tự: asc, desc

**Example:**
```
GET /properties?page=1&limit=10&type=apartment&city=Hồ Chí Minh&minPrice=1000000000&maxPrice=5000000000&sort=price&order=asc
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Căn hộ cao cấp Vinhomes",
      "description": "Căn hộ 2 phòng ngủ, view đẹp",
      "price": 3000000000,
      "area": 80,
      "address": {
        "street": "123 Nguyễn Huệ",
        "ward": "Bến Nghé",
        "district": "Quận 1",
        "city": "Hồ Chí Minh"
      },
      "type": "apartment",
      "status": "available",
      "features": {
        "bedrooms": 2,
        "bathrooms": 2,
        "furniture": "full",
        "parking": true
      },
      "images": ["url1", "url2"],
      "owner": {
        "id": "...",
        "name": "Nguyễn Văn A",
        "email": "user@example.com",
        "phone": "0123456789"
      },
      "views": 150,
      "isActive": true,
      "createdAt": "2024-01-10T10:00:00.000Z",
      "updatedAt": "2024-01-10T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### Get Single Property
Lấy chi tiết một bất động sản.

**Endpoint:** `GET /properties/:id`

**Success Response (200):**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Không tìm thấy bất động sản"
}
```

---

### Create Property
Tạo bất động sản mới (yêu cầu role: agent hoặc admin).

**Endpoint:** `POST /properties`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:**
```json
{
  "title": "Căn hộ cao cấp Vinhomes",
  "description": "Căn hộ 2 phòng ngủ, view đẹp, đầy đủ nội thất",
  "price": 3000000000,
  "area": 80,
  "type": "apartment",
  "address": {
    "street": "123 Nguyễn Huệ",
    "ward": "Bến Nghé",
    "district": "Quận 1",
    "city": "Hồ Chí Minh",
    "coordinates": {
      "lat": 10.7769,
      "lng": 106.7009
    }
  },
  "features": {
    "bedrooms": 2,
    "bathrooms": 2,
    "floors": 10,
    "furniture": "full",
    "parking": true,
    "balcony": true,
    "elevator": true
  },
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Tạo bất động sản thành công",
  "data": { ... }
}
```

---

### Update Property
Cập nhật bất động sản (chỉ owner hoặc admin).

**Endpoint:** `PUT /properties/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body:** (partial update)
```json
{
  "price": 3500000000,
  "status": "rented"
}
```

---

### Delete Property
Xóa bất động sản (chỉ owner hoặc admin).

**Endpoint:** `DELETE /properties/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Xóa bất động sản thành công",
  "data": {}
}
```

---

### Get User Properties
Lấy tất cả bất động sản của một user.

**Endpoint:** `GET /properties/user/:userId`

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

---

## 🔒 Authorization Levels

- **Public** - Không cần authentication
- **Private** - Cần authentication (Bearer token)
- **Agent/Admin** - Cần role agent hoặc admin

## ⚠️ Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request thành công |
| 201 | Created - Tạo resource thành công |
| 400 | Bad Request - Dữ liệu không hợp lệ |
| 401 | Unauthorized - Chưa đăng nhập hoặc token không hợp lệ |
| 403 | Forbidden - Không có quyền truy cập |
| 404 | Not Found - Không tìm thấy resource |
| 500 | Internal Server Error - Lỗi máy chủ |

## 📝 Notes

- Tất cả dates được trả về theo format ISO 8601
- Tất cả prices được tính bằng VND (đồng)
- Tất cả areas được tính bằng m²
- Token expires sau 7 ngày
- Refresh token expires sau 30 ngày

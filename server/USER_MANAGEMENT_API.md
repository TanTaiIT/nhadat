# User Management API Documentation

## Tổng quan

API quản lý người dùng đã được tách riêng thành 2 phần:

1. **Auth Controller** (`/api/v1/auth`) - Xử lý authentication (đăng nhập, đăng ký, token)
2. **User Controller** (`/api/v1/users`) - Xử lý quản lý thông tin người dùng

---

## 🔐 Authentication Routes (`/api/v1/auth`)

### Public Routes

#### 1. Đăng ký
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0912345678"
}
```

#### 2. Đăng nhập
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. Làm mới token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### 4. Quên mật khẩu
```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### 5. Đặt lại mật khẩu
```http
PUT /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

### Protected Routes (Yêu cầu đăng nhập)

#### 6. Đăng xuất
```http
POST /api/v1/auth/logout
Authorization: Bearer <access-token>
```

#### 7. Đổi mật khẩu
```http
PUT /api/v1/auth/updatepassword
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

---

## 👤 User Management Routes (`/api/v1/users`)

### User's Own Profile (Protected - Cho chính user đó)

#### 1. Lấy thông tin profile của mình
```http
GET /api/v1/users/me
Authorization: Bearer <access-token>
```

#### 2. Cập nhật profile của mình
```http
PUT /api/v1/users/me
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "phone": "0912345678",
  "zaloNumber": "0912345678",
  "avatar": "https://example.com/avatar.jpg",
  "address": {
    "street": "123 Đường ABC",
    "ward": "Phường 1",
    "district": "Quận 1",
    "city": "Hồ Chí Minh"
  },
  "bio": "Giới thiệu về bản thân",
  "agentInfo": {
    "companyName": "Công ty ABC",
    "yearsOfExperience": 5,
    "specializations": ["Căn hộ", "Nhà phố"],
    "serviceAreas": ["Quận 1", "Quận 2"]
  }
}
```

### Admin Routes (Yêu cầu quyền Admin)

#### 3. Lấy thống kê người dùng
```http
GET /api/v1/users/statistics
Authorization: Bearer <admin-access-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 100,
    "activeUsers": 85,
    "verifiedUsers": 60,
    "inactiveUsers": 15,
    "unverifiedUsers": 40,
    "usersByRole": {
      "user": 70,
      "agent": 25,
      "admin": 5
    },
    "newUsersThisMonth": 12
  }
}
```

#### 4. Lấy danh sách người dùng (có phân trang & filter)
```http
GET /api/v1/users?page=1&limit=10&role=agent&isActive=true&search=nguyen
Authorization: Bearer <admin-access-token>
```

**Query Parameters:**
- `page` (number): Trang hiện tại (default: 1)
- `limit` (number): Số lượng mỗi trang (default: 10, max: 100)
- `role` (string): Lọc theo role (user, agent, admin)
- `isActive` (boolean): Lọc theo trạng thái active
- `isVerified` (boolean): Lọc theo trạng thái verified
- `search` (string): Tìm kiếm theo name, email, phone
- `sort` (string): Sắp xếp theo field (createdAt, name, email)
- `order` (string): asc hoặc desc

#### 5. Lấy thông tin user theo ID
```http
GET /api/v1/users/:id
Authorization: Bearer <admin-access-token>
```

#### 6. Cập nhật thông tin user
```http
PUT /api/v1/users/:id
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "name": "Nguyễn Văn B",
  "email": "newmail@example.com",
  "phone": "0987654321",
  "verification": {
    "isEmailVerified": true,
    "isPhoneVerified": true
  },
  "statistics": {
    "totalProperties": 10,
    "rating": 4.5
  }
}
```

#### 7. Xóa user
```http
DELETE /api/v1/users/:id
Authorization: Bearer <admin-access-token>
```

**Lưu ý:** Không thể xóa tài khoản admin

#### 8. Chặn user (Block)
```http
PUT /api/v1/users/:id/block
Authorization: Bearer <admin-access-token>
```

Đặt `isActive = false` để chặn user không thể đăng nhập

#### 9. Bỏ chặn user (Unblock)
```http
PUT /api/v1/users/:id/unblock
Authorization: Bearer <admin-access-token>
```

Đặt `isActive = true` để cho phép user đăng nhập lại

#### 10. Thay đổi quyền user
```http
PUT /api/v1/users/:id/role
Authorization: Bearer <admin-access-token>
Content-Type: application/json

{
  "role": "agent"
}
```

**Các role hợp lệ:**
- `user` - Người dùng thông thường
- `agent` - Môi giới bất động sản
- `admin` - Quản trị viên

**Lưu ý:** Không thể thay đổi quyền của chính mình

#### 11. Xác thực danh tính user
```http
PUT /api/v1/users/:id/verify
Authorization: Bearer <admin-access-token>
```

Đánh dấu user đã xác thực danh tính (CCCD/CMND)

#### 12. Hủy xác thực danh tính user
```http
PUT /api/v1/users/:id/unverify
Authorization: Bearer <admin-access-token>
```

---

## 📋 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Thông báo thành công",
  "data": {
    // Dữ liệu trả về
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Thông báo lỗi"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
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

## 🔒 Authorization

### Middleware sử dụng:

1. **`protect`** - Yêu cầu đăng nhập (có access token hợp lệ)
2. **`authorize('admin')`** - Yêu cầu quyền admin

### Cách sử dụng:

```typescript
// Chỉ cần đăng nhập
router.get('/me', protect, getMyProfile);

// Cần quyền admin
router.get('/', protect, authorize('admin'), getUsers);

// Cần quyền admin hoặc agent
router.get('/agents', protect, authorize('admin', 'agent'), getAgents);
```

---

## 📊 User Model Fields

```typescript
{
  name: string;              // Tên người dùng
  email: string;             // Email (unique)
  password: string;          // Mật khẩu (đã hash)
  phone?: string;            // Số điện thoại
  zaloNumber?: string;       // Số Zalo
  avatar?: string;           // URL avatar
  address?: {                // Địa chỉ
    street?: string;
    ward?: string;
    district?: string;
    city?: string;
  };
  bio?: string;              // Giới thiệu
  role: 'user' | 'agent' | 'admin';  // Quyền
  
  // Thông tin môi giới (cho agent)
  agentInfo?: {
    companyName?: string;
    businessLicense?: string;
    taxCode?: string;
    website?: string;
    yearsOfExperience?: number;
    specializations?: string[];
    serviceAreas?: string[];
  };
  
  // Xác thực
  verification?: {
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    isIdentityVerified?: boolean;
    identityDocument?: string;
    identityDocumentImages?: string[];
    verifiedAt?: Date;
    verifiedBy?: string;
  };
  
  // Thống kê
  statistics?: {
    totalProperties?: number;
    totalViews?: number;
    totalContacts?: number;
    successfulDeals?: number;
    rating?: number;
    reviewCount?: number;
  };
  
  isVerified: boolean;       // Đã xác thực email
  isActive: boolean;         // Tài khoản active (không bị chặn)
  lastLoginAt?: Date;        // Lần đăng nhập cuối
  createdAt: Date;           // Ngày tạo
  updatedAt: Date;           // Ngày cập nhật
}
```

---

## 🚀 Use Cases

### 1. User tự quản lý profile
- Xem thông tin: `GET /api/v1/users/me`
- Cập nhật thông tin: `PUT /api/v1/users/me`
- Đổi mật khẩu: `PUT /api/v1/auth/updatepassword`

### 2. Admin quản lý users
- Xem danh sách: `GET /api/v1/users`
- Xem chi tiết: `GET /api/v1/users/:id`
- Chặn user: `PUT /api/v1/users/:id/block`
- Bỏ chặn: `PUT /api/v1/users/:id/unblock`
- Đổi quyền: `PUT /api/v1/users/:id/role`
- Xác thực: `PUT /api/v1/users/:id/verify`

### 3. Admin xem thống kê
- Thống kê tổng quan: `GET /api/v1/users/statistics`

---

## ⚠️ Lưu ý

1. **Không thể xóa admin**: API sẽ từ chối xóa tài khoản có role = admin
2. **Không thể chặn admin**: API sẽ từ chối chặn tài khoản admin
3. **Không thể đổi quyền của chính mình**: Admin không thể thay đổi role của chính mình
4. **Password không được trả về**: Tất cả API đều loại bỏ password khỏi response
5. **Validation**: Tất cả input đều được validate trước khi xử lý

---

## 🔄 Migration từ Auth Controller

**Trước đây:**
- `GET /api/v1/auth/me` → Lấy thông tin user
- `PUT /api/v1/auth/updatedetails` → Cập nhật thông tin

**Bây giờ:**
- `GET /api/v1/users/me` → Lấy thông tin user
- `PUT /api/v1/users/me` → Cập nhật thông tin

**Lưu ý:** Cần cập nhật frontend để gọi đúng endpoint mới!

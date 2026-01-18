# Hướng Dẫn Xác Thực (Authentication Guide)

## Tổng Quan

Hệ thống xác thực đã được triển khai đầy đủ cho cả người dùng thường và admin với các tính năng:

- ✅ Đăng ký tài khoản
- ✅ Đăng nhập (User & Admin)
- ✅ Đăng xuất
- ✅ Quên mật khẩu
- ✅ Bảo vệ routes với middleware
- ✅ Quản lý session với JWT
- ✅ User menu và profile dropdown

## Cấu Trúc Files

```
├── app/
│   ├── (auth)/                      # Auth route group
│   │   ├── dang-nhap/              # Trang đăng nhập user
│   │   │   └── page.tsx
│   │   ├── dang-ky/                # Trang đăng ký
│   │   │   └── page.tsx
│   │   ├── quen-mat-khau/          # Trang quên mật khẩu
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   └── login/                   # Trang đăng nhập admin
│   │       └── page.tsx
│   └── layout.tsx                   # Bọc AuthProvider
├── components/
│   └── auth/
│       ├── LoginForm.tsx            # Component form đăng nhập
│       ├── RegisterForm.tsx         # Component form đăng ký
│       ├── index.ts
│       └── README.md
├── contexts/
│   └── AuthContext.tsx              # Auth state management
├── services/
│   └── auth.service.ts              # Auth API calls
├── middleware.ts                    # Route protection
└── AUTHENTICATION.md                # File này
```

## Routes

### Public Routes (Không cần đăng nhập)

| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ |
| `/dang-nhap` | Đăng nhập user |
| `/dang-ky` | Đăng ký tài khoản |
| `/quen-mat-khau` | Quên mật khẩu |
| `/admin/login` | Đăng nhập admin |

### Protected Routes (Cần đăng nhập)

| Route | Mô tả |
|-------|-------|
| `/dashboard` | Tổng quan người dùng |
| `/dang-tin` | Đăng tin BĐS |
| `/quan-ly-tin` | Quản lý tin đã đăng |
| `/tai-khoan` | Thông tin tài khoản |
| `/yeu-thich` | Tin yêu thích |
| `/cai-dat` | Cài đặt |

### Admin Routes (Cần đăng nhập với role admin)

| Route | Mô tả |
|-------|-------|
| `/admin` | Admin dashboard |
| `/admin/dashboard` | Bảng điều khiển |
| `/admin/properties` | Quản lý BĐS |
| `/admin/users` | Quản lý người dùng |
| `/admin/orders` | Quản lý đơn hàng |
| `/admin/settings` | Cài đặt hệ thống |

## Sử Dụng

### 1. Đăng Ký Tài Khoản

```tsx
// Người dùng truy cập /dang-ky
// Điền thông tin:
- Họ
- Tên  
- Email
- Số điện thoại (tùy chọn)
- Mật khẩu (tối thiểu 6 ký tự)
- Xác nhận mật khẩu
- Đồng ý điều khoản ✓

// Sau khi đăng ký thành công → Chuyển đến /dashboard
```

### 2. Đăng Nhập User

```tsx
// Người dùng truy cập /dang-nhap
// Điền thông tin:
- Email
- Mật khẩu
- Ghi nhớ đăng nhập (tùy chọn)

// Sau khi đăng nhập thành công:
// - Nếu role = 'admin' → Chuyển đến /admin
// - Nếu role = 'user' hoặc 'agent' → Chuyển đến /dashboard
```

### 3. Đăng Nhập Admin

```tsx
// Admin truy cập /admin/login
// Sử dụng tài khoản có role = 'admin'
// Sau khi đăng nhập → Chuyển đến /admin
```

### 4. Quên Mật Khẩu

```tsx
// Người dùng truy cập /quen-mat-khau
// Nhập email
// Hệ thống gửi link reset password qua email
```

### 5. Sử Dụng Auth Context

```tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Vui lòng đăng nhập</p>;
  }

  return (
    <div>
      <p>Xin chào, {user?.profile?.fullName}</p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}
```

### 6. Sử Dụng Auth Service

```tsx
import { authService } from '@/services/auth.service';

// Login
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('User:', response.user);
} catch (error) {
  console.error('Login failed:', error);
}

// Register
try {
  const response = await authService.register({
    firstName: 'Nguyen',
    lastName: 'Van A',
    email: 'user@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    agreeToTerms: true
  });
} catch (error) {
  console.error('Register failed:', error);
}

// Check authentication
const isAuth = authService.isAuthenticated();
```

## Header UI

Header được cập nhật để hiển thị:

### Khi chưa đăng nhập:
- Link "Đăng nhập"
- Link "Đăng ký"
- Button "Đăng tin"

### Khi đã đăng nhập:
- Button "Đăng tin"
- Avatar + Dropdown menu với:
  - Thông tin user (tên, email)
  - Tổng quan
  - Quản lý tin
  - Yêu thích
  - Tài khoản
  - Cài đặt
  - Đăng xuất

## Middleware Protection

File `middleware.ts` bảo vệ các routes:

1. **Protected routes**: Chuyển hướng đến `/dang-nhap` nếu chưa auth
2. **Admin routes**: Chuyển hướng đến `/admin/login` nếu chưa auth
3. **Auth routes**: Chuyển hướng đến `/dashboard` nếu đã auth

## API Endpoints

Backend API endpoints (từ `constants/routes.ts`):

```typescript
API_ROUTES.AUTH = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  VERIFY_EMAIL: '/api/auth/verify-email',
  ME: '/api/auth/me',
}
```

## Token Management

Tokens được lưu trong localStorage:
- `accessToken`: Token để xác thực các API calls
- `refreshToken`: Token để làm mới accessToken khi hết hạn

```typescript
// Get token
const token = authService.getAccessToken();

// Check if authenticated
const isAuth = authService.isAuthenticated();
```

## Error Handling

Errors được hiển thị trong các trường hợp:

1. **Validation errors**: Email không hợp lệ, mật khẩu quá ngắn, etc.
2. **API errors**: Email đã tồn tại, sai mật khẩu, etc.
3. **Network errors**: Không kết nối được server

Tất cả errors đều hiển thị trong alert box màu đỏ phía trên form.

## Social Login (Placeholder)

Các nút đăng nhập với Google và Facebook đã được tạo (chưa có chức năng). 
Để triển khai, cần:

1. Cấu hình OAuth providers
2. Tạo callback handlers
3. Kết nối với backend API

## Testing

### Test Đăng Ký
1. Truy cập `/dang-ky`
2. Điền đầy đủ thông tin
3. Submit form
4. Kiểm tra được chuyển đến `/dashboard`
5. Kiểm tra Header hiển thị user info

### Test Đăng Nhập User
1. Truy cập `/dang-nhap`
2. Nhập email và password
3. Submit form
4. Kiểm tra được chuyển đến `/dashboard`

### Test Đăng Nhập Admin
1. Truy cập `/admin/login`
2. Nhập email và password của admin
3. Submit form
4. Kiểm tra được chuyển đến `/admin`

### Test Protected Routes
1. Đăng xuất
2. Truy cập `/dashboard`
3. Kiểm tra được redirect đến `/dang-nhap`

### Test Quên Mật Khẩu
1. Truy cập `/quen-mat-khau`
2. Nhập email
3. Submit form
4. Kiểm tra message thành công

## Next Steps

Các tính năng có thể bổ sung:

1. ✅ Xác thực email (verify email)
2. ✅ Đặt lại mật khẩu (reset password page)
3. ✅ Đổi mật khẩu trong settings
4. ⏳ Social login (Google, Facebook)
5. ⏳ Two-factor authentication
6. ⏳ Session management dashboard
7. ⏳ Login history
8. ⏳ Biometric authentication

## Troubleshooting

### Token không được lưu
- Kiểm tra localStorage trong DevTools
- Kiểm tra API response có chứa token

### Redirect loop
- Kiểm tra middleware.ts
- Kiểm tra token validation logic

### User menu không hiển thị
- Kiểm tra AuthProvider được wrap đúng
- Kiểm tra useAuth hook được gọi trong client component

## Support

Để được hỗ trợ hoặc báo lỗi, vui lòng tạo issue trong repository.

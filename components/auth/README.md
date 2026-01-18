# Authentication Components

Các components liên quan đến xác thực người dùng (đăng nhập, đăng ký).

## Components

### LoginForm
Form đăng nhập cho cả người dùng và admin.

**Props:**
- `redirectUrl?: string` - URL để chuyển hướng sau khi đăng nhập thành công
- `isAdmin?: boolean` - Chế độ admin (ẩn link quên mật khẩu và đăng ký)

**Usage:**
```tsx
import { LoginForm } from '@/components/auth';

// User login
<LoginForm />

// Admin login
<LoginForm isAdmin={true} />
```

### RegisterForm
Form đăng ký tài khoản mới cho người dùng.

**Usage:**
```tsx
import { RegisterForm } from '@/components/auth';

<RegisterForm />
```

## Authentication Flow

### 1. User Registration
1. Người dùng điền form đăng ký tại `/dang-ky`
2. Validation client-side
3. Gọi API `POST /api/auth/register`
4. Nhận token và thông tin user
5. Lưu token vào localStorage
6. Chuyển hướng đến dashboard

### 2. User Login
1. Người dùng điền form đăng nhập tại `/dang-nhap`
2. Validation client-side
3. Gọi API `POST /api/auth/login`
4. Nhận token và thông tin user
5. Lưu token vào localStorage
6. Chuyển hướng dựa trên role:
   - `admin` → `/admin`
   - `user/agent` → `/dashboard`

### 3. Admin Login
1. Admin truy cập `/admin/login`
2. Đăng nhập với tài khoản admin
3. Kiểm tra role sau khi login
4. Chuyển hướng đến admin dashboard

### 4. Logout
1. Người dùng click nút đăng xuất
2. Gọi API `POST /api/auth/logout`
3. Xóa token khỏi localStorage
4. Chuyển hướng về trang chủ

## Protected Routes

Các route sau yêu cầu authentication (được bảo vệ bởi middleware):

### User Routes
- `/dashboard` - Tổng quan
- `/dang-tin` - Đăng tin
- `/quan-ly-tin` - Quản lý tin
- `/tai-khoan` - Tài khoản
- `/yeu-thich` - Yêu thích
- `/cai-dat` - Cài đặt

### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/properties` - Quản lý BĐS
- `/admin/users` - Quản lý users
- `/admin/orders` - Quản lý đơn hàng
- `/admin/settings` - Cài đặt hệ thống

## Auth Context

### useAuth Hook

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const {
    user,              // User object or null
    isAuthenticated,   // Boolean
    isLoading,         // Boolean
    error,             // Error message or null
    login,             // Login function
    register,          // Register function
    logout,            // Logout function
    clearError,        // Clear error function
  } = useAuth();

  // ...
}
```

## Services

### authService

```tsx
import { authService } from '@/services/auth.service';

// Login
await authService.login({ email, password });

// Register
await authService.register({ firstName, lastName, email, password, ... });

// Logout
await authService.logout();

// Get current user
const user = await authService.getCurrentUser();

// Check if authenticated
const isAuth = authService.isAuthenticated();

// Forgot password
await authService.forgotPassword(email);

// Reset password
await authService.resetPassword(token, password);
```

## Validation Rules

### Email
- Bắt buộc
- Format: email hợp lệ

### Password
- Bắt buộc
- Tối thiểu 6 ký tự

### Register Additional
- Họ: Bắt buộc
- Tên: Bắt buộc
- Xác nhận mật khẩu: Phải khớp với mật khẩu
- Đồng ý điều khoản: Bắt buộc

## Error Handling

Errors được xử lý ở nhiều cấp độ:

1. **Client Validation**: Kiểm tra ngay khi submit form
2. **API Errors**: Hiển thị thông báo lỗi từ server
3. **Network Errors**: Xử lý lỗi kết nối

Tất cả errors đều hiển thị trong alert box màu đỏ phía trên form.

## Security Features

- Password masking
- CSRF protection (via API)
- Token-based authentication
- Secure password storage (backend)
- Session timeout handling
- Remember me functionality
- Middleware route protection

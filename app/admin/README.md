# Admin Panel Documentation

## 📁 Cấu trúc Admin

Hệ thống quản trị đã được tổ chức theo cấu trúc sau:

```
app/admin/
├── layout.tsx              # Layout chính cho admin (sidebar + topbar)
├── page.tsx                # Redirect đến dashboard
├── dashboard/
│   └── page.tsx           # Trang tổng quan
├── properties/
│   └── page.tsx           # Quản lý bất động sản
├── users/
│   └── page.tsx           # Quản lý người dùng
└── settings/
    └── page.tsx           # Cài đặt hệ thống

components/admin/
├── AdminSidebar.tsx       # Sidebar navigation
├── AdminTopBar.tsx        # Top navigation bar
├── StatsCard.tsx          # Card thống kê
├── PropertyTable.tsx      # Bảng danh sách BĐS
├── UserTable.tsx          # Bảng danh sách người dùng
├── RecentProperties.tsx   # Widget tin đăng gần đây
├── RecentUsers.tsx        # Widget người dùng mới
├── ActivityChart.tsx      # Biểu đồ hoạt động
└── index.ts              # Export tất cả components

services/
└── admin.service.ts       # API calls cho admin

hooks/
└── useAdmin.ts            # Custom hooks cho admin

types/
└── admin.types.ts         # Type definitions cho admin
```

## 🚀 Tính năng chính

### 1. Dashboard
- **Thống kê tổng quan**: Tổng số BĐS, người dùng, lượt xem
- **Biểu đồ hoạt động**: Theo dõi hoạt động theo ngày/tuần/tháng
- **Tin đăng gần đây**: Danh sách tin đăng mới nhất
- **Người dùng mới**: Danh sách người dùng đăng ký gần đây

### 2. Quản lý Bất Động Sản
- Xem danh sách tất cả BĐS
- Tìm kiếm và lọc theo: tiêu đề, địa chỉ, trạng thái, loại
- Duyệt/từ chối tin đăng
- Chỉnh sửa thông tin BĐS
- Xóa BĐS
- Đánh dấu BĐS nổi bật

### 3. Quản lý Người Dùng
- Xem danh sách người dùng
- Tìm kiếm theo tên, email
- Lọc theo vai trò và trạng thái
- Thay đổi vai trò (User/Agent/Admin)
- Khóa/Mở khóa tài khoản
- Xóa người dùng

### 4. Cài đặt Hệ Thống
- Cài đặt chung (tên website, mô tả, liên hệ)
- Email & Thông báo
- Thanh toán
- Bảo mật
- API & Integrations

## 🔧 Cách sử dụng

### Truy cập Admin Panel

```
http://localhost:3000/admin
```

Trang này sẽ tự động redirect đến `/admin/dashboard`.

### Sử dụng Components

```tsx
import { 
  StatsCard, 
  PropertyTable, 
  UserTable 
} from '@/components/admin';

// Sử dụng StatsCard
<StatsCard
  title="Tổng BĐS"
  value="1,234"
  change="+12.5%"
  changeType="increase"
  icon="building"
/>

// Sử dụng PropertyTable
<PropertyTable searchQuery={searchQuery} />

// Sử dụng UserTable
<UserTable searchQuery={searchQuery} />
```

### Sử dụng Services

```tsx
import { adminService } from '@/services/admin.service';

// Lấy thống kê dashboard
const stats = await adminService.getDashboardStats();

// Lấy danh sách properties
const properties = await adminService.getProperties({
  status: 'pending',
  page: 1,
  limit: 10
});

// Duyệt property
await adminService.approveProperty(propertyId);

// Khóa user
await adminService.blockUser(userId, 'Spam');
```

### Sử dụng Hooks

```tsx
import { useAdminStats, useAdminProperties, useAdminUsers } from '@/hooks/useAdmin';

function DashboardPage() {
  const { stats, loading, error } = useAdminStats();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Total Properties: {stats.totalProperties}</h1>
    </div>
  );
}

function PropertiesPage() {
  const { 
    properties, 
    loading, 
    deleteProperty,
    approveProperty 
  } = useAdminProperties({ status: 'pending' });
  
  return (
    <div>
      {properties.map(property => (
        <div key={property.id}>
          <h3>{property.title}</h3>
          <button onClick={() => approveProperty(property.id)}>
            Duyệt
          </button>
          <button onClick={() => deleteProperty(property.id)}>
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 🎨 Customization

### Thay đổi màu sắc

Các màu sắc được định nghĩa trong Tailwind CSS. Bạn có thể thay đổi trong file `tailwind.config.js`.

### Thêm menu mới

Chỉnh sửa file `components/admin/AdminSidebar.tsx`:

```tsx
const navigation: NavItem[] = [
  // ... existing items
  { name: 'Menu mới', href: '/admin/new-menu', icon: 'icon-name' },
];
```

### Thêm trang mới

1. Tạo file page trong `app/admin/new-page/page.tsx`
2. Thêm route vào sidebar navigation
3. Tạo components cần thiết trong `components/admin/`

## 🔐 Bảo mật

**Lưu ý quan trọng**: Hiện tại admin panel chưa có authentication. Cần implement:

1. **Middleware Authentication**: Kiểm tra user đã đăng nhập
2. **Role-based Access Control**: Chỉ admin mới truy cập được
3. **API Protection**: Bảo vệ các API endpoints admin

### Ví dụ Middleware

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check if user is admin
  // ... verify role from token
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## 📊 Mock Data

Hiện tại các components đang sử dụng mock data. Để kết nối với API thực:

1. Cập nhật `services/admin.service.ts` với URL API thực
2. Thay thế mock data trong components bằng hooks
3. Xử lý loading và error states

## 🔄 Next Steps

- [ ] Implement authentication & authorization
- [ ] Kết nối với API backend thực
- [ ] Thêm trang chi tiết property/user
- [ ] Implement upload ảnh
- [ ] Thêm bulk actions
- [ ] Export data (CSV, Excel)
- [ ] Email notifications
- [ ] Activity logs
- [ ] Advanced analytics
- [ ] Real-time updates với WebSocket

## 📝 Notes

- Tất cả pages đều là Client Components (`'use client'`) để sử dụng hooks
- Components sử dụng Tailwind CSS cho styling
- Responsive design đã được implement
- Icons sử dụng Heroicons (SVG inline)

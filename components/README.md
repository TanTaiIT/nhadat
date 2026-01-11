# Components

Thư mục này chứa tất cả các React components của dự án.

## Cấu trúc

### 📁 ui/
Components UI cơ bản, có thể tái sử dụng cao
- **Mục đích**: Các components nhỏ, độc lập như Button, Input, Card, Modal, etc.
- **Đặc điểm**: Không chứa business logic, dễ dàng tái sử dụng
- **Ví dụ**: Button, Input, Card, Badge, Avatar, Dialog

### 📁 layout/
Components liên quan đến layout của trang
- **Mục đích**: Các components xây dựng cấu trúc chung của website
- **Đặc điểm**: Thường xuất hiện trên nhiều trang
- **Ví dụ**: Header, Footer, Sidebar, Navbar, Container

### 📁 features/
Components theo tính năng cụ thể
- **Mục đích**: Components phức tạp hơn, liên quan đến tính năng cụ thể
- **Đặc điểm**: Có thể chứa business logic, kết hợp nhiều UI components
- **Ví dụ**: PropertyCard, SearchBar, FilterPanel, UserProfile

## Quy tắc đặt tên

- Sử dụng **PascalCase** cho tên component
- File name phải trùng với component name
- Mỗi component nên có file riêng

```
✅ Good:
- Button.tsx (exports Button component)
- PropertyCard.tsx (exports PropertyCard component)

❌ Bad:
- button.tsx
- propertycard.tsx
- myComponent.tsx
```

## Ví dụ sử dụng

```typescript
// Import từ UI components
import { Button } from '@/components/ui/Button';

// Import từ Layout components  
import { Header } from '@/components/layout/Header';

// Import từ Feature components
import { PropertyCard } from '@/components/features/PropertyCard';
```

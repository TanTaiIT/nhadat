# Cấu Trúc Thư Mục Dự Án

Đây là cấu trúc thư mục chuẩn cho dự án Next.js với TypeScript.

## 📁 Cấu trúc chi tiết

```
nha_dat/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Route groups
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
│
├── components/              # React Components
│   ├── ui/                  # Components UI tái sử dụng (Button, Input, Card...)
│   ├── layout/              # Components layout (Header, Footer, Sidebar...)
│   └── features/            # Components theo tính năng cụ thể
│
├── lib/                     # Utility functions & helpers
│   ├── utils.ts             # Các hàm tiện ích chung
│   ├── validations.ts       # Schema validation (Zod, Yup...)
│   └── api-client.ts        # API client configuration
│
├── hooks/                   # Custom React Hooks
│   ├── useAuth.ts           # Authentication hook
│   ├── useDebounce.ts       # Debounce hook
│   └── useFetch.ts          # Data fetching hook
│
├── types/                   # TypeScript Types & Interfaces
│   ├── index.ts             # Xuất tất cả types
│   ├── user.ts              # User related types
│   └── api.ts               # API response types
│
├── services/                # API & External services
│   ├── auth.service.ts      # Authentication services
│   ├── user.service.ts      # User services
│   └── api.service.ts       # Base API service
│
├── constants/               # Constants & Configurations
│   ├── index.ts             # Xuất tất cả constants
│   ├── routes.ts            # Route constants
│   └── config.ts            # App configuration
│
├── config/                  # Configuration files
│   ├── site.ts              # Site metadata
│   └── env.ts               # Environment variables
│
├── public/                  # Static assets
│   ├── images/              # Images
│   ├── icons/               # Icons
│   └── fonts/               # Fonts
│
└── styles/                  # Global styles (nếu cần)

```

## 📝 Hướng dẫn sử dụng

### 1. **app/** - Next.js App Router
- Chứa tất cả các routes, layouts, và pages
- API routes trong `app/api/`
- Sử dụng route groups `(routes)` để tổ chức tốt hơn

### 2. **components/**
- **ui/**: Components UI cơ bản, tái sử dụng cao (Button, Input, Modal...)
- **layout/**: Components layout chung (Header, Footer, Navbar...)
- **features/**: Components theo từng tính năng cụ thể của ứng dụng

### 3. **lib/**
- Các utility functions, helpers
- API client configuration
- Validation schemas
- Database connections

### 4. **hooks/**
- Custom React hooks
- Business logic có thể tái sử dụng
- State management logic

### 5. **types/**
- TypeScript interfaces, types
- Shared type definitions
- API response types

### 6. **services/**
- API calls và integration
- External service integrations
- Business logic liên quan đến data fetching

### 7. **constants/**
- Application constants
- Configuration values
- Route paths
- Environment-independent values

### 8. **config/**
- Environment-specific configuration
- Site metadata
- Third-party service configs

## 🎯 Best Practices

1. **Tái sử dụng code**: Đặt logic có thể tái sử dụng vào `lib/` hoặc `hooks/`
2. **Type safety**: Luôn định nghĩa types trong `types/`
3. **Separation of concerns**: Tách biệt UI, logic, và data
4. **Naming convention**: Sử dụng PascalCase cho components, camelCase cho functions
5. **Index files**: Sử dụng `index.ts` để export nhiều modules

## 📦 Import Examples

```typescript
// Components
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'

// Hooks
import { useAuth } from '@/hooks/useAuth'

// Services
import { userService } from '@/services/user.service'

// Types
import type { User } from '@/types/user'

// Constants
import { ROUTES } from '@/constants/routes'

// Utils
import { cn, formatDate } from '@/lib/utils'
```

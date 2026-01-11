# Kiến Trúc Dự Án Nhà Đất - Chuẩn Senior Developer

## 🎯 Tổng Quan Kiến Trúc

Dựa trên phân tích trang chủ groupnhadat.vn, đây là kiến trúc chuẩn cho dự án Next.js 14+ với App Router.

---

## 📱 1. PAGES & ROUTES STRUCTURE

```typescript
app/
├── (public)/                          # Public routes (không cần auth)
│   ├── layout.tsx                     # Layout với Header + Footer
│   ├── page.tsx                       # Trang chủ (/)
│   ├── bat-dong-san/                  # Danh sách bất động sản
│   │   ├── page.tsx                   # /bat-dong-san
│   │   ├── [id]/
│   │   │   └── page.tsx               # /bat-dong-san/[id] - Chi tiết
│   │   └── loading.tsx                # Loading state
│   ├── du-an/                         # Dự án
│   │   ├── page.tsx                   # /du-an
│   │   └── [id]/page.tsx              # /du-an/[id]
│   ├── dich-vu/                       # Dịch vụ
│   │   └── page.tsx                   # /dich-vu
│   ├── tin-tuc/                       # Tin tức
│   │   ├── page.tsx                   # /tin-tuc
│   │   └── [slug]/page.tsx            # /tin-tuc/[slug]
│   └── lien-he/                       # Liên hệ
│       └── page.tsx                   # /lien-he
│
├── (auth)/                            # Auth routes
│   ├── dang-nhap/                     # Đăng nhập
│   │   └── page.tsx                   # /dang-nhap
│   └── dang-ky/                       # Đăng ký
│       └── page.tsx                   # /dang-ky
│
├── (protected)/                       # Protected routes (cần auth)
│   ├── layout.tsx                     # Layout với auth check
│   ├── dashboard/                     # Dashboard
│   │   └── page.tsx                   # /dashboard
│   ├── dang-tin/                      # Đăng tin
│   │   ├── page.tsx                   # /dang-tin
│   │   └── [id]/edit/page.tsx         # /dang-tin/[id]/edit
│   ├── quan-ly-tin/                   # Quản lý tin đăng
│   │   └── page.tsx                   # /quan-ly-tin
│   └── tai-khoan/                     # Tài khoản
│       └── page.tsx                   # /tai-khoan
│
├── api/                               # API Routes (nếu cần)
│   └── revalidate/
│       └── route.ts                   # ISR revalidation
│
├── layout.tsx                         # Root layout
├── globals.css                        # Global styles
├── not-found.tsx                      # 404 page
└── error.tsx                          # Error boundary
```

---

## 🧩 2. COMPONENTS ARCHITECTURE

### 2.1 Component Hierarchy

```typescript
components/
├── layout/                            # Layout Components
│   ├── Header/
│   │   ├── Header.tsx                 # Main header
│   │   ├── Navigation.tsx             # Nav menu
│   │   ├── UserMenu.tsx               # User dropdown
│   │   └── MobileMenu.tsx             # Mobile nav
│   ├── Footer/
│   │   ├── Footer.tsx                 # Main footer
│   │   ├── FooterLinks.tsx            # Footer links
│   │   └── FooterInfo.tsx             # Company info
│   └── Sidebar/
│       └── Sidebar.tsx                # Dashboard sidebar
│
├── home/                              # Home Page Components
│   ├── HeroSection/
│   │   ├── HeroSection.tsx            # Hero with background
│   │   └── SearchForm.tsx             # Search form chính
│   ├── FeaturedProperties/
│   │   ├── FeaturedProperties.tsx     # Section wrapper
│   │   └── PropertyGrid.tsx           # Grid layout
│   └── CTASection/
│       └── CTASection.tsx             # Call to action
│
├── properties/                        # Property Components
│   ├── PropertyCard/
│   │   ├── PropertyCard.tsx           # Card component
│   │   ├── PropertyImage.tsx          # Image với carousel
│   │   ├── PropertyInfo.tsx           # Thông tin
│   │   └── PropertyPrice.tsx          # Giá
│   ├── PropertyList/
│   │   ├── PropertyList.tsx           # List view
│   │   ├── PropertyGrid.tsx           # Grid view
│   │   └── PropertyMap.tsx            # Map view
│   ├── PropertyDetail/
│   │   ├── PropertyGallery.tsx        # Gallery ảnh
│   │   ├── PropertyOverview.tsx       # Tổng quan
│   │   ├── PropertyFeatures.tsx       # Đặc điểm
│   │   ├── PropertyDescription.tsx    # Mô tả
│   │   ├── PropertyLocation.tsx       # Vị trí + Map
│   │   └── ContactForm.tsx            # Form liên hệ
│   ├── PropertyFilters/
│   │   ├── FilterBar.tsx              # Filter bar
│   │   ├── FilterItem.tsx             # Single filter
│   │   └── FilterModal.tsx            # Mobile filter modal
│   └── PropertyForm/
│       ├── PropertyForm.tsx           # Form đăng tin
│       ├── BasicInfoStep.tsx          # Step 1: Thông tin cơ bản
│       ├── LocationStep.tsx           # Step 2: Vị trí
│       ├── MediaStep.tsx              # Step 3: Hình ảnh/Video
│       └── PreviewStep.tsx            # Step 4: Xem trước
│
├── search/                            # Search Components
│   ├── SearchBar.tsx                  # Search bar đơn giản
│   ├── AdvancedSearch.tsx             # Advanced search
│   ├── SearchSuggestions.tsx          # Autocomplete suggestions
│   └── RecentSearches.tsx             # Recent searches
│
├── forms/                             # Form Components
│   ├── ContactForm.tsx                # Form liên hệ
│   ├── LoginForm.tsx                  # Form đăng nhập
│   ├── RegisterForm.tsx               # Form đăng ký
│   └── ProfileForm.tsx                # Form cập nhật profile
│
├── ui/                                # UI Components (Reusable)
│   ├── Button/
│   │   └── Button.tsx                 # Button với variants
│   ├── Input/
│   │   ├── Input.tsx                  # Text input
│   │   ├── Select.tsx                 # Select dropdown
│   │   ├── Checkbox.tsx               # Checkbox
│   │   ├── Radio.tsx                  # Radio button
│   │   └── TextArea.tsx               # Text area
│   ├── Card/
│   │   ├── Card.tsx                   # Card container
│   │   ├── CardHeader.tsx             # Card header
│   │   ├── CardBody.tsx               # Card body
│   │   └── CardFooter.tsx             # Card footer
│   ├── Modal/
│   │   ├── Modal.tsx                  # Modal base
│   │   └── ModalContent.tsx           # Modal content
│   ├── Dropdown/
│   │   └── Dropdown.tsx               # Dropdown menu
│   ├── Badge/
│   │   └── Badge.tsx                  # Badge/Tag
│   ├── Tabs/
│   │   ├── Tabs.tsx                   # Tabs container
│   │   └── TabPanel.tsx               # Tab panel
│   ├── Pagination/
│   │   └── Pagination.tsx             # Pagination
│   ├── Breadcrumb/
│   │   └── Breadcrumb.tsx             # Breadcrumb
│   ├── Loading/
│   │   ├── Spinner.tsx                # Loading spinner
│   │   └── Skeleton.tsx               # Skeleton loader
│   ├── Toast/
│   │   └── Toast.tsx                  # Toast notification
│   └── Image/
│       └── OptimizedImage.tsx         # Optimized image với lazy load
│
└── shared/                            # Shared Components
    ├── ErrorBoundary.tsx              # Error boundary
    ├── NoData.tsx                     # No data state
    ├── ErrorMessage.tsx               # Error message
    └── SectionTitle.tsx               # Section title
```

### 2.2 Component Design Principles

1. **Atomic Design**: UI → Layout → Features → Pages
2. **Single Responsibility**: Mỗi component làm 1 việc duy nhất
3. **Composition over Configuration**: Ưu tiên composition pattern
4. **Server vs Client Components**:
   - Server Components (mặc định): Static content, SEO
   - Client Components ('use client'): Interactivity, state

---

## 🎨 3. DATA FETCHING STRATEGY

### 3.1 Server Components (Recommended)

```typescript
// app/(public)/bat-dong-san/page.tsx
export default async function PropertiesPage() {
  // Fetch data trực tiếp trong Server Component
  const properties = await propertyService.getProperties({
    page: 1,
    limit: 20
  });

  return <PropertyList properties={properties} />;
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate mỗi 1 giờ
```

### 3.2 Client Components (Khi cần interactivity)

```typescript
// components/properties/PropertyList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProperties } from '@/hooks/useProperties';

export default function PropertyList() {
  const { properties, loading, error } = useProperties({
    page: 1,
    filters: {}
  });

  // Client-side logic here
}
```

### 3.3 API Routes (Khi cần)

```typescript
// app/api/properties/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // API logic
  return NextResponse.json({ data: [] });
}
```

---

## 🔄 4. STATE MANAGEMENT

### 4.1 URL State (Recommended cho filtering/pagination)

```typescript
// Sử dụng searchParams
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function PropertyFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };
}
```

### 4.2 React Context (Cho global state đơn giản)

```typescript
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Auth logic
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
```

### 4.3 Zustand (Cho complex state)

```typescript
// stores/useFilterStore.ts
import { create } from 'zustand';

interface FilterState {
  filters: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {},
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    })),
  resetFilters: () => set({ filters: {} })
}));
```

---

## 🎯 5. HOOKS ARCHITECTURE

```typescript
hooks/
├── useAuth.ts                 # Authentication hook
├── useProperties.ts           # Fetch properties
├── useProperty.ts             # Fetch single property
├── useFilters.ts              # Filter management
├── useDebounce.ts             # Debounce hook
├── useMediaQuery.ts           # Responsive hook
├── useIntersectionObserver.ts # Infinite scroll
├── useLocalStorage.ts         # LocalStorage hook
├── usePagination.ts           # Pagination logic
└── useForm.ts                 # Form management
```

---

## 🚀 6. PERFORMANCE OPTIMIZATION

### 6.1 Image Optimization

```typescript
import Image from 'next/image';

<Image
  src={property.image}
  alt={property.title}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="/placeholder.jpg"
/>
```

### 6.2 Code Splitting

```typescript
// Dynamic imports cho components nặng
import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  loading: () => <Skeleton />,
  ssr: false // Disable SSR cho map
});
```

### 6.3 Caching Strategy

```typescript
// services/api.service.ts
import { cache } from 'react';

// Cache cho server components
export const getProperties = cache(async () => {
  // Fetch logic
});

// Next.js fetch với cache
fetch('...', {
  next: { revalidate: 3600 } // Cache 1 giờ
});
```

---

## 🔒 7. AUTHENTICATION FLOW

```typescript
middleware.ts (Root level)
├── Check auth token
├── Redirect unauthorized users
└── Protect routes

app/(protected)/layout.tsx
├── Verify session server-side
├── Redirect if no session
└── Provide auth context
```

---

## 📊 8. TYPE SYSTEM

```typescript
types/
├── index.ts                   # Export all types
├── property.types.ts          # Property related types
│   ├── Property              # Main property type
│   ├── PropertyType          # Enum: apartment, house, land
│   ├── PropertyStatus        # Enum: available, sold, rented
│   ├── PropertyFilter        # Filter params
│   └── PropertyFormData      # Form data
├── user.types.ts              # User types
├── api.types.ts               # API response types
└── common.types.ts            # Common types
```

---

## 🎨 9. STYLING STRATEGY

### 9.1 Tailwind CSS + CSS Modules

```typescript
// Tailwind cho utility classes
<div className="flex items-center gap-4 p-4 rounded-lg shadow-md">

// CSS Modules cho complex styling
import styles from './PropertyCard.module.css';
<div className={styles.propertyCard}>
```

### 9.2 Design Tokens

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color'
      },
      spacing: {
        // Custom spacing
      }
    }
  }
};
```

---

## 📝 10. FOLDER STRUCTURE BEST PRACTICES

### ✅ DO

```
components/
├── properties/
│   ├── PropertyCard/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyCard.test.tsx
│   │   ├── PropertyCard.module.css
│   │   └── index.ts           # Export từ đây
```

### ❌ DON'T

```
components/
├── PropertyCard.tsx           # Không nên flat structure
├── PropertyList.tsx
├── PropertyDetail.tsx
```

---

## 🔥 11. CRITICAL FEATURES IMPLEMENTATION

### Trang Chủ - Priority #1

1. **HeroSection với SearchForm** ⭐⭐⭐
   - Background image đẹp
   - Search form với filters (Loại hình, Khu vực, Giá, Diện tích)
   - Responsive design

2. **Featured Properties Grid** ⭐⭐⭐
   - Grid layout responsive (4 cols desktop, 2 cols tablet, 1 col mobile)
   - PropertyCard với image, title, price, area, location
   - Hover effects

3. **Quick Stats Section** ⭐⭐
   - Số lượng BĐS đang bán/cho thuê
   - Số lượng dự án
   - Số lượng khách hàng

### Danh Sách BĐS - Priority #2

1. **Filter Bar** ⭐⭐⭐
   - Multiple filters
   - Sort options
   - View toggle (grid/list/map)

2. **Property List với Pagination** ⭐⭐⭐
   - Server-side pagination
   - Loading states
   - No data states

3. **Map View** ⭐⭐
   - Google Maps integration
   - Markers với property info

### Chi Tiết BĐS - Priority #3

1. **Image Gallery** ⭐⭐⭐
   - Lightbox
   - Thumbnails
   - 360 view (optional)

2. **Property Information** ⭐⭐⭐
   - Overview
   - Features list
   - Description
   - Location với map

3. **Contact Form** ⭐⭐⭐
   - Quick contact
   - Phone/Email
   - Schedule viewing

---

## 🚀 12. IMPLEMENTATION ORDER

1. **Phase 1**: Core Infrastructure
   - Setup types
   - Create base UI components
   - Setup services & hooks

2. **Phase 2**: Home Page
   - Header/Footer
   - Hero Section
   - Featured Properties

3. **Phase 3**: Properties Listing
   - Filter system
   - Property list/grid
   - Pagination

4. **Phase 4**: Property Detail
   - Gallery
   - Information sections
   - Contact form

5. **Phase 5**: User Features
   - Authentication
   - Post property
   - User dashboard

---

## 📚 13. TECH STACK RECOMMENDATIONS

```json
{
  "core": {
    "framework": "Next.js 14+",
    "language": "TypeScript",
    "styling": "Tailwind CSS"
  },
  "ui": {
    "components": "shadcn/ui hoặc Radix UI",
    "icons": "lucide-react",
    "animations": "framer-motion"
  },
  "forms": {
    "validation": "zod",
    "forms": "react-hook-form"
  },
  "state": {
    "global": "zustand hoặc context",
    "server": "React Query / TanStack Query"
  },
  "maps": "Google Maps API hoặc Mapbox",
  "images": "Next.js Image + Cloudinary",
  "dates": "date-fns"
}
```

---

## ✨ SUMMARY

Kiến trúc này được thiết kế theo chuẩn:

✅ **Scalable**: Dễ mở rộng khi thêm features  
✅ **Maintainable**: Code dễ maintain và debug  
✅ **Performance**: Optimize cho speed và SEO  
✅ **Type-safe**: Full TypeScript support  
✅ **Best Practices**: Follow Next.js 14+ best practices  
✅ **Developer Experience**: Clear structure, easy to understand


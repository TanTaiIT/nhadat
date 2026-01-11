# Hướng Dẫn Triển Khai - Dự Án Nhà Đất

## 📚 Tổng Quan

Tài liệu này hướng dẫn chi tiết cách triển khai các tính năng cho dự án Nhà Đất dựa trên kiến trúc đã thiết kế.

---

## 🎯 Những Gì Đã Hoàn Thành

### ✅ Phase 1: Core Infrastructure (100%)

1. **Types System** ✓
   - `types/property.types.ts` - Tất cả types liên quan đến property
   - `types/user.types.ts` - Tất cả types liên quan đến user
   - `types/common.types.ts` - Types dùng chung
   - `types/index.ts` - Export centralized

2. **Constants & Config** ✓
   - `constants/routes.ts` - Định nghĩa tất cả routes
   - `constants/properties.ts` - Constants cho properties (filters, options...)
   - `config/site.ts` - Cấu hình site, SEO, API

3. **Utility Functions** ✓
   - `lib/utils.ts` - Tất cả helper functions
   - Format: price, area, date, phone
   - Validation: email, phone, URL
   - Helpers: debounce, throttle, slug generation

4. **Base UI Components** ✓
   - `components/ui/Button.tsx` - Button với variants
   - `components/ui/Input.tsx` - Text input
   - `components/ui/Select.tsx` - Select dropdown
   - `components/ui/Card.tsx` - Card components

5. **Services** ✓
   - `services/property.service.ts` - Property API service

### ✅ Phase 2: Home Page (100%)

1. **Layout Components** ✓
   - `components/layout/Header.tsx` - Responsive header với navigation
   - `components/layout/Footer.tsx` - Footer với links và company info
   - `app/layout.tsx` - Root layout với Header + Footer

2. **Home Page Components** ✓
   - `components/home/HeroSection.tsx` - Hero với background image
   - `components/home/SearchForm.tsx` - Advanced search form
   - `components/home/FeaturedProperties.tsx` - Featured properties section
   - `components/properties/PropertyCard.tsx` - Property card component
   - `app/page.tsx` - Home page với mock data

---

## 🚀 Bước Tiếp Theo - Triển Khai Từng Phase

### Phase 3: Properties Listing Page

#### 1. Tạo Properties Page

```bash
# Tạo folder structure
app/
  (public)/
    bat-dong-san/
      page.tsx              # Main listing page
      loading.tsx           # Loading state
      [id]/
        page.tsx            # Detail page
```

**File: `app/(public)/bat-dong-san/page.tsx`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyList } from '@/components/properties/PropertyList';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { propertyService } from '@/services/property.service';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    // Fetch properties based on filters
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const filters = {
          type: searchParams.get('type'),
          city: searchParams.get('city'),
          // ... other filters
        };
        
        const data = await propertyService.getProperties(filters);
        setProperties(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyFilters />
      <PropertyList properties={properties} loading={loading} />
      {/* Add Pagination component */}
    </div>
  );
}
```

#### 2. Tạo Filter Components

**File: `components/properties/PropertyFilters.tsx`**

```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, Button } from '@/components/ui';
import { PROPERTY_TYPE_OPTIONS, PRICE_RANGES_SELL } from '@/constants';

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          options={PROPERTY_TYPE_OPTIONS}
          placeholder="Loại hình"
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
        {/* Add more filters */}
      </div>
    </div>
  );
}
```

#### 3. Tạo Property List Component

**File: `components/properties/PropertyList.tsx`**

```typescript
import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  loading?: boolean;
}

export function PropertyList({ properties, loading }: PropertyListProps) {
  if (loading) {
    return <div>Loading...</div>; // Add skeleton loader
  }

  if (properties.length === 0) {
    return <div>Không tìm thấy bất động sản nào</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

---

### Phase 4: Property Detail Page

#### File: `app/(public)/bat-dong-san/[id]/page.tsx`

```typescript
import { propertyService } from '@/services/property.service';
import { PropertyGallery } from '@/components/properties/PropertyDetail/PropertyGallery';
import { PropertyOverview } from '@/components/properties/PropertyDetail/PropertyOverview';
import { PropertyFeatures } from '@/components/properties/PropertyDetail/PropertyFeatures';
import { PropertyDescription } from '@/components/properties/PropertyDetail/PropertyDescription';
import { PropertyLocation } from '@/components/properties/PropertyDetail/PropertyLocation';
import { ContactForm } from '@/components/properties/PropertyDetail/ContactForm';

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await propertyService.getPropertyById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyGallery images={property.media.images} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <PropertyOverview property={property} />
          <PropertyFeatures features={property.features} />
          <PropertyDescription description={property.description} />
          <PropertyLocation location={property.location} />
        </div>
        
        <div className="lg:col-span-1">
          <ContactForm property={property} />
        </div>
      </div>
    </div>
  );
}
```

---

### Phase 5: Authentication

#### 1. Create Auth Context

**File: `contexts/AuthContext.tsx`**

```typescript
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    // Load from localStorage or verify token
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error: null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

#### 2. Create Login Page

**File: `app/(auth)/dang-nhap/page.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    // Call authService.login(formData)
    // Save token
    // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Mật khẩu"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}
```

---

### Phase 6: Post Property

#### File: `app/(protected)/dang-tin/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { PropertyForm } from '@/components/properties/PropertyForm';

export default function PostPropertyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Đăng tin bất động sản</h1>
      <PropertyForm />
    </div>
  );
}
```

**File: `components/properties/PropertyForm/PropertyForm.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { BasicInfoStep } from './BasicInfoStep';
import { LocationStep } from './LocationStep';
import { MediaStep } from './MediaStep';
import { PreviewStep } from './PreviewStep';

export function PropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 1, title: 'Thông tin cơ bản', component: BasicInfoStep },
    { id: 2, title: 'Vị trí', component: LocationStep },
    { id: 3, title: 'Hình ảnh', component: MediaStep },
    { id: 4, title: 'Xem trước', component: PreviewStep },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div>
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className="font-semibold">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Step */}
      <CurrentStepComponent
        formData={formData}
        setFormData={setFormData}
        onNext={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
      />
    </div>
  );
}
```

---

## 🛠️ Custom Hooks

### useProperties Hook

**File: `hooks/useProperties.ts`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { propertyService } from '@/services/property.service';
import { Property, PropertySearchParams } from '@/types';

export function useProperties(params: PropertySearchParams) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getProperties(params);
        setProperties(data.data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [JSON.stringify(params)]);

  return { properties, loading, error };
}
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Classes

```typescript
// Colors
primary: 'bg-blue-600 text-white hover:bg-blue-700'
secondary: 'bg-gray-600 text-white hover:bg-gray-700'
danger: 'bg-red-600 text-white hover:bg-red-700'

// Spacing
container: 'container mx-auto px-4'
section: 'py-16'
card-padding: 'p-6'

// Shadows
card: 'shadow-sm hover:shadow-md'
elevated: 'shadow-lg'

// Transitions
default: 'transition-all duration-200'
```

---

## 📝 Best Practices

### 1. Component Structure

```
Component/
├── Component.tsx          # Main component
├── Component.test.tsx     # Tests
├── Component.module.css   # Styles (if needed)
├── index.ts               # Export
└── subcomponents/         # Related components
```

### 2. Server vs Client Components

**Server Components (Default)**
- Fetch data
- Access backend resources
- Keep sensitive info on server
- Use for SEO content

**Client Components ('use client')**
- Event handlers
- Browser APIs
- State management
- Interactive UI

### 3. Data Fetching

```typescript
// Server Component
async function getData() {
  const res = await fetch('...', { cache: 'no-store' });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{/* Use data */}</div>;
}

// Client Component with SWR or React Query
'use client';

import useSWR from 'swr';

export default function Page() {
  const { data, error, isLoading } = useSWR('/api/data', fetcher);
  // ...
}
```

---

## 🔐 Environment Variables

Create `.env.local`:

```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google Maps (if needed)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key

# Cloudinary (for image upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 📦 Deployment

### Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🎯 Checklist Triển Khai

### Phase 3: Properties Listing ☐
- [ ] Tạo properties listing page
- [ ] Implement filters
- [ ] Add pagination
- [ ] Add sorting
- [ ] Add view toggle (grid/list/map)

### Phase 4: Property Detail ☐
- [ ] Tạo detail page
- [ ] Implement image gallery
- [ ] Add property information sections
- [ ] Add contact form
- [ ] Add similar properties
- [ ] Add share functionality

### Phase 5: Authentication ☐
- [ ] Setup auth context
- [ ] Create login page
- [ ] Create register page
- [ ] Implement JWT handling
- [ ] Add protected routes
- [ ] Add user profile page

### Phase 6: Post Property ☐
- [ ] Create multi-step form
- [ ] Implement image upload
- [ ] Add form validation
- [ ] Add preview step
- [ ] Implement submit logic

### Phase 7: Dashboard ☐
- [ ] Create dashboard layout
- [ ] Add statistics
- [ ] List user's properties
- [ ] Add edit/delete functionality

---

## 💡 Tips & Tricks

1. **Use TypeScript Strictly**: Always define types for props and states
2. **Component Reusability**: Create small, reusable components
3. **Performance**: Use `React.memo` for expensive components
4. **SEO**: Use proper meta tags and semantic HTML
5. **Accessibility**: Add aria labels and keyboard navigation
6. **Error Handling**: Always handle errors gracefully
7. **Loading States**: Show loading indicators
8. **Responsive Design**: Mobile-first approach

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

## 🆘 Getting Help

Nếu bạn gặp vấn đề:

1. Kiểm tra console logs
2. Xem lại ARCHITECTURE.md
3. Đọc documentation của thư viện
4. Search trên Stack Overflow
5. Hỏi team members

---

**Good luck with your implementation! 🚀**

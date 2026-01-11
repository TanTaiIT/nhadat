# Custom Hooks

Thư mục này chứa các custom React hooks của dự án.

## Quy tắc

1. **Đặt tên**: Luôn bắt đầu với `use` (vd: `useDebounce`, `useAuth`)
2. **Mục đích**: Tách biệt và tái sử dụng logic
3. **Single Responsibility**: Mỗi hook nên có một mục đích rõ ràng

## Các loại hooks phổ biến

### State Management Hooks
```typescript
useAuth.ts          // Quản lý authentication state
useUser.ts          // Quản lý user state
useCart.ts          // Quản lý shopping cart
```

### Data Fetching Hooks
```typescript
useFetch.ts         // Generic data fetching
useProperties.ts    // Fetch danh sách bất động sản
useProperty.ts      // Fetch chi tiết một bất động sản
```

### Utility Hooks
```typescript
useDebounce.ts      // Debounce giá trị
useLocalStorage.ts  // Tương tác với localStorage
useMediaQuery.ts    // Responsive breakpoints
useClickOutside.ts  // Detect click outside element
```

### Form Hooks
```typescript
useForm.ts          // Form state management
useValidation.ts    // Form validation
```

## Ví dụ tạo custom hook

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## Sử dụng

```typescript
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/hooks/useAuth';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { user, isAuthenticated } = useAuth();
  
  // ... rest of component
}
```

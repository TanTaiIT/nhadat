# Library / Utilities

Thư mục này chứa các utility functions, helpers, và shared logic.

## Cấu trúc thường gặp

```
lib/
├── utils.ts           # Các hàm tiện ích chung
├── validations.ts     # Schema validation (Zod, Yup)
├── api-client.ts      # Cấu hình API client
├── date.ts            # Date utilities
├── format.ts          # Formatting functions
├── auth.ts            # Auth helpers
└── db.ts              # Database connection
```

## Quy tắc

1. **Pure Functions**: Functions nên là pure, không có side effects
2. **Type Safety**: Luôn define types/interfaces cho params và return values
3. **Documentation**: Comment rõ ràng cho các functions phức tạp
4. **Single Responsibility**: Mỗi file nên có một mục đích cụ thể

## Ví dụ

### utils.ts - Utilities chung
```typescript
/**
 * Kết hợp classNames với Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sleep function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
```

### format.ts - Formatting functions
```typescript
/**
 * Format tiền tệ VND
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Format số điện thoại
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
}
```

### validations.ts - Schema validation với Zod
```typescript
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
});

export const propertySchema = z.object({
  title: z.string().min(10, 'Tiêu đề phải có ít nhất 10 ký tự'),
  price: z.number().positive('Giá phải lớn hơn 0'),
  area: z.number().positive('Diện tích phải lớn hơn 0'),
});
```

## Sử dụng

```typescript
import { cn, formatVND, generateId } from '@/lib/utils';
import { userSchema } from '@/lib/validations';

// Sử dụng cn để kết hợp classes
const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50'
);

// Format tiền
const price = formatVND(5000000); // "5.000.000 ₫"

// Validate data
const result = userSchema.safeParse(data);
if (!result.success) {
  console.error(result.error);
}
```

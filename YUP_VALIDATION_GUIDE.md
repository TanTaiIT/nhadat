# Yup Validation - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Dự án đã được tích hợp **Yup** validation với **React Hook Form** để validate dữ liệu form một cách mạnh mẽ và type-safe.

## 📦 Dependencies

```json
{
  "yup": "^1.3.3",
  "react-hook-form": "^7.49.0",
  "@hookform/resolvers": "^3.3.2"
}
```

## 🏗️ Cấu Trúc

```
lib/validations/
├── auth.schema.ts       # Auth validation schemas
├── property.schema.ts   # Property validation schemas
├── common.schema.ts     # Common/reusable schemas
├── utils.ts            # Validation utilities
└── index.ts            # Export all
```

## 📝 Validation Schemas

### Auth Schemas

**Login:**
```typescript
import { loginSchema, type LoginInput } from '@/lib/validations';

const schema = loginSchema;
// {
//   email: string (required, email format),
//   password: string (required, min 6 chars),
//   remember: boolean (optional)
// }
```

**Register:**
```typescript
import { registerSchema, type RegisterInput } from '@/lib/validations';

const schema = registerSchema;
// {
//   firstName: string (required, 2-50 chars),
//   lastName: string (required, 2-50 chars),
//   email: string (required, email format),
//   phone: string (optional, 10-11 digits),
//   password: string (required, min 6 chars),
//   confirmPassword: string (must match password),
//   agreeToTerms: boolean (must be true)
// }
```

**Forgot Password:**
```typescript
import { forgotPasswordSchema } from '@/lib/validations';
```

**Reset Password:**
```typescript
import { resetPasswordSchema } from '@/lib/validations';
```

**Change Password:**
```typescript
import { changePasswordSchema } from '@/lib/validations';
```

**Update Profile:**
```typescript
import { updateProfileSchema } from '@/lib/validations';
```

### Property Schemas

**Create/Update Property:**
```typescript
import { propertySchema, type PropertyInput } from '@/lib/validations';

const schema = propertySchema;
// {
//   title: string (10-200 chars),
//   description: string (50-5000 chars),
//   price: number (min 1M, max 1T),
//   area: number (min 1, max 100k),
//   type: 'apartment' | 'house' | 'land' | 'villa' | 'office',
//   status: 'available' | 'sold' | 'rented' | 'pending',
//   address: {
//     street: string,
//     ward: string,
//     district: string,
//     city: string,
//     coordinates?: { lat: number, lng: number }
//   },
//   features?: {
//     bedrooms?: number,
//     bathrooms?: number,
//     floors?: number,
//     furniture?: 'full' | 'partial' | 'none',
//     parking?: boolean,
//     balcony?: boolean,
//     elevator?: boolean
//   },
//   images: string[] (1-20 URLs)
// }
```

**Search/Filter:**
```typescript
import { propertySearchSchema } from '@/lib/validations';
```

**Contact Property:**
```typescript
import { contactPropertySchema } from '@/lib/validations';
```

## 🎨 Sử Dụng với React Hook Form

### Basic Form

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginInput } from '@/lib/validations';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    console.log(data); // Type-safe data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
```

### With Custom Input Component

```typescript
<Input
  {...register('email')}
  error={errors.email?.message}
  placeholder="Email"
/>
```

### Nested Objects

```typescript
const { register } = useForm({
  resolver: yupResolver(propertySchema),
});

<input {...register('address.street')} />
<input {...register('address.city')} />
<input {...register('features.bedrooms')} type="number" />
```

### Arrays

```typescript
const { register } = useForm();

<input {...register('images.0')} />
<input {...register('images.1')} />
```

## 🔧 Validation Utilities

### Validate Data

```typescript
import { validateData } from '@/lib/validations/utils';

const result = await validateData(loginSchema, formData);

if (result.isValid) {
  console.log('Valid data:', result.data);
} else {
  console.log('Errors:', result.errors);
}
```

### Validate Sync

```typescript
import { validateDataSync } from '@/lib/validations/utils';

const result = validateDataSync(loginSchema, formData);
```

### Custom Validators

```typescript
import { createValidator } from '@/lib/validations/utils';

const ageValidator = createValidator(
  'age',
  'Tuổi phải từ 18-100',
  (value) => value >= 18 && value <= 100
);
```

### Vietnamese Phone

```typescript
import { vietnamesePhoneValidator } from '@/lib/validations/utils';

const schema = yup.object({
  phone: vietnamesePhoneValidator.required(),
});
```

### Strong Password

```typescript
import { strongPasswordValidator } from '@/lib/validations/utils';

const schema = yup.object({
  password: strongPasswordValidator.required(),
});
```

### File Validators

```typescript
import { fileSizeValidator, fileTypeValidator } from '@/lib/validations/utils';

const schema = yup.object({
  avatar: yup.mixed()
    .concat(fileSizeValidator(5)) // Max 5MB
    .concat(fileTypeValidator(['image/jpeg', 'image/png']))
});
```

### Date Range

```typescript
import { dateRangeValidator } from '@/lib/validations/utils';

const schema = yup.object({
  startDate: yup.date().required(),
  endDate: yup.date().required(),
}).concat(dateRangeValidator('startDate', 'endDate'));
```

## 📋 Common Patterns

### Conditional Validation

```typescript
const schema = yup.object({
  type: yup.string().oneOf(['buy', 'rent']),
  price: yup.number().when('type', {
    is: 'buy',
    then: (schema) => schema.min(1000000, 'Giá mua tối thiểu 1 triệu'),
    otherwise: (schema) => schema.min(1000, 'Giá thuê tối thiểu 1 nghìn'),
  }),
});
```

### Cross-Field Validation

```typescript
const schema = yup.object({
  password: yup.string().required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});
```

### Transform Values

```typescript
const schema = yup.object({
  email: yup.string().trim().lowercase().email(),
  price: yup.string().transform((value) => Number(value)),
});
```

### Custom Error Messages

```typescript
const schema = yup.object({
  email: yup.string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng'),
});
```

### Array Validation

```typescript
const schema = yup.object({
  tags: yup.array()
    .of(yup.string().min(2))
    .min(1, 'Phải có ít nhất 1 tag')
    .max(5, 'Tối đa 5 tags'),
});
```

## 🎯 Best Practices

### 1. Tạo Reusable Schemas

```typescript
// lib/validations/common.schema.ts
export const emailField = yup.string()
  .required('Email không được để trống')
  .email('Email không hợp lệ')
  .trim()
  .lowercase();

// Sử dụng:
const loginSchema = yup.object({
  email: emailField,
  password: passwordField,
});
```

### 2. Type Safety

```typescript
import { type LoginInput } from '@/lib/validations';

// TypeScript sẽ check types
const data: LoginInput = {
  email: 'test@example.com',
  password: '123456',
  remember: true,
};
```

### 3. Error Handling

```typescript
const {
  formState: { errors },
} = useForm();

// Display errors
{errors.email && (
  <p className="text-red-600">{errors.email.message}</p>
)}
```

### 4. Server-Side Validation

```typescript
// Backend validation
import { loginSchema } from './validations';

try {
  const validData = await loginSchema.validate(req.body);
  // Process valid data
} catch (error) {
  // Handle validation errors
  res.status(400).json({ errors: error.errors });
}
```

## 🔍 Debugging

### Log Validation Errors

```typescript
const onSubmit = async (data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.log('Validation errors:', error.inner);
    }
  }
};
```

### Test Schema

```typescript
// Test schema in isolation
const testData = { email: 'invalid', password: '123' };

schema.validate(testData, { abortEarly: false })
  .then((valid) => console.log('Valid:', valid))
  .catch((error) => console.log('Errors:', error.errors));
```

## 📚 Examples

### Complete Login Form

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginInput } from '@/lib/validations';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input 
          {...register('password')} 
          type="password" 
          placeholder="Password" 
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

## ✅ Migration Checklist

- [x] Yup installed
- [x] React Hook Form installed
- [x] Auth schemas created
- [x] Property schemas created
- [x] Common schemas created
- [x] Validation utilities created
- [x] LoginForm updated
- [x] RegisterForm updated
- [x] Type exports added

## 📖 Tài Liệu

- [Yup Documentation](https://github.com/jquense/yup)
- [React Hook Form](https://react-hook-form.com/)
- [Hookform Resolvers](https://github.com/react-hook-form/resolvers)

## 🎉 Hoàn Thành!

Dự án đã sẵn sàng với Yup validation mạnh mẽ và type-safe!

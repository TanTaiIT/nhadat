# 🚀 Yup Validation - Quick Start

## ⚡ Sử Dụng Nhanh (3 phút)

### 1. Import Schema

```typescript
import { loginSchema, type LoginInput } from '@/lib/validations';
```

### 2. Tạo Form với React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginInput>({
  resolver: yupResolver(loginSchema),
});
```

### 3. Render Form

```typescript
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  {errors.email && <span>{errors.email.message}</span>}
  
  <input type="password" {...register('password')} />
  {errors.password && <span>{errors.password.message}</span>}
  
  <button type="submit">Login</button>
</form>
```

## 📋 Available Schemas

### Auth
```typescript
import {
  loginSchema,           // Login form
  registerSchema,        // Register form
  forgotPasswordSchema,  // Forgot password
  resetPasswordSchema,   // Reset password
  changePasswordSchema,  // Change password
  updateProfileSchema,   // Update profile
} from '@/lib/validations';
```

### Property
```typescript
import {
  propertySchema,        // Create/update property
  propertySearchSchema,  // Search filters
  contactPropertySchema, // Contact form
} from '@/lib/validations';
```

### Common
```typescript
import {
  emailField,           // Reusable email field
  phoneField,           // Reusable phone field
  passwordField,        // Reusable password field
  contactSchema,        // Contact form
  paginationSchema,     // Pagination params
} from '@/lib/validations';
```

## 💡 Common Use Cases

### Login Form

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, type LoginInput } from '@/lib/validations';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input type="password" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### Register Form

```typescript
import { registerSchema, type RegisterInput } from '@/lib/validations';

const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
  resolver: yupResolver(registerSchema),
});
```

### Property Form

```typescript
import { propertySchema, type PropertyInput } from '@/lib/validations';

const { register, handleSubmit } = useForm<PropertyInput>({
  resolver: yupResolver(propertySchema),
});
```

## 🎯 Error Messages

Tất cả validation messages đã được translate sang tiếng Việt:

```typescript
// Email validation
"Email không được để trống"
"Email không hợp lệ"

// Password validation
"Mật khẩu không được để trống"
"Mật khẩu phải có ít nhất 6 ký tự"
"Mật khẩu xác nhận không khớp"

// Phone validation
"Số điện thoại không hợp lệ (10-11 số)"

// Required fields
"Họ không được để trống"
"Tên không được để trống"
```

## 🔧 Utilities

### Validate Data

```typescript
import { validateData } from '@/lib/validations/utils';

const result = await validateData(loginSchema, formData);
if (result.isValid) {
  // Use result.data
}
```

### Vietnamese Phone

```typescript
import { vietnamesePhoneValidator } from '@/lib/validations/utils';
```

### Strong Password

```typescript
import { strongPasswordValidator } from '@/lib/validations/utils';
```

### File Validation

```typescript
import { fileSizeValidator, fileTypeValidator } from '@/lib/validations/utils';
```

## 📂 Files Structure

```
lib/validations/
├── auth.schema.ts       # ✅ Auth schemas
├── property.schema.ts   # ✅ Property schemas
├── common.schema.ts     # ✅ Common schemas
├── utils.ts            # ✅ Validation utilities
└── index.ts            # ✅ Exports
```

## 🎨 With Components

Các form đã được update:

- ✅ **LoginForm** - Sử dụng `loginSchema`
- ✅ **RegisterForm** - Sử dụng `registerSchema`

## 🐛 Debugging

### View Errors

```typescript
const { formState: { errors } } = useForm();

console.log('All errors:', errors);
console.log('Email error:', errors.email?.message);
```

### Test Schema

```typescript
import { loginSchema } from '@/lib/validations';

loginSchema.validate({ email: 'test', password: '123' })
  .then(() => console.log('Valid'))
  .catch((err) => console.log('Errors:', err.errors));
```

## ✅ Checklist

- [x] Yup installed
- [x] React Hook Form installed  
- [x] Schemas created
- [x] Forms updated
- [x] Type-safe
- [x] Vietnamese messages

## 📖 Full Documentation

Xem `YUP_VALIDATION_GUIDE.md` cho hướng dẫn đầy đủ.

## 🎉 Done!

Bạn đã sẵn sàng sử dụng Yup validation!

```bash
npm run dev
```

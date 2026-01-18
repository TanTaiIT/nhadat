import * as yup from 'yup';

// Common validation messages
const MESSAGES = {
  required: (field: string) => `${field} không được để trống`,
  email: 'Email không hợp lệ',
  min: (field: string, min: number) => `${field} phải có ít nhất ${min} ký tự`,
  max: (field: string, max: number) => `${field} không được quá ${max} ký tự`,
  phone: 'Số điện thoại không hợp lệ',
  match: (field: string) => `${field} không khớp`,
};

// Login validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required(MESSAGES.required('Email'))
    .email(MESSAGES.email)
    .trim(),
  password: yup
    .string()
    .required(MESSAGES.required('Mật khẩu'))
    .min(6, MESSAGES.min('Mật khẩu', 6)),
  remember: yup.boolean().optional(),
});

// Register validation schema
export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required(MESSAGES.required('Họ'))
    .trim()
    .min(2, MESSAGES.min('Họ', 2))
    .max(50, MESSAGES.max('Họ', 50)),
  lastName: yup
    .string()
    .required(MESSAGES.required('Tên'))
    .trim()
    .min(2, MESSAGES.min('Tên', 2))
    .max(50, MESSAGES.max('Tên', 50)),
  email: yup
    .string()
    .required(MESSAGES.required('Email'))
    .email(MESSAGES.email)
    .trim()
    .lowercase(),
  phone: yup
    .string()
    .optional()
    .matches(/^[0-9]{10,11}$/, {
      message: MESSAGES.phone,
      excludeEmptyString: true,
    }),
  password: yup
    .string()
    .required(MESSAGES.required('Mật khẩu'))
    .min(6, MESSAGES.min('Mật khẩu', 6))
    .max(100, MESSAGES.max('Mật khẩu', 100)),
  confirmPassword: yup
    .string()
    .required(MESSAGES.required('Xác nhận mật khẩu'))
    .oneOf([yup.ref('password')], MESSAGES.match('Mật khẩu xác nhận')),
  agreeToTerms: yup
    .boolean()
    .required()
    .oneOf([true], 'Bạn phải đồng ý với điều khoản sử dụng'),
});

// Forgot password schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required(MESSAGES.required('Email'))
    .email(MESSAGES.email)
    .trim(),
});

// Reset password schema
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required(MESSAGES.required('Mật khẩu mới'))
    .min(6, MESSAGES.min('Mật khẩu', 6))
    .max(100, MESSAGES.max('Mật khẩu', 100)),
  confirmPassword: yup
    .string()
    .required(MESSAGES.required('Xác nhận mật khẩu'))
    .oneOf([yup.ref('password')], MESSAGES.match('Mật khẩu xác nhận')),
});

// Change password schema
export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required(MESSAGES.required('Mật khẩu hiện tại')),
  newPassword: yup
    .string()
    .required(MESSAGES.required('Mật khẩu mới'))
    .min(6, MESSAGES.min('Mật khẩu mới', 6))
    .max(100, MESSAGES.max('Mật khẩu mới', 100))
    .notOneOf([yup.ref('currentPassword')], 'Mật khẩu mới phải khác mật khẩu hiện tại'),
  confirmPassword: yup
    .string()
    .required(MESSAGES.required('Xác nhận mật khẩu'))
    .oneOf([yup.ref('newPassword')], MESSAGES.match('Mật khẩu xác nhận')),
});

// Update profile schema
export const updateProfileSchema = yup.object({
  firstName: yup
    .string()
    .required(MESSAGES.required('Họ'))
    .trim()
    .min(2, MESSAGES.min('Họ', 2))
    .max(50, MESSAGES.max('Họ', 50)),
  lastName: yup
    .string()
    .required(MESSAGES.required('Tên'))
    .trim()
    .min(2, MESSAGES.min('Tên', 2))
    .max(50, MESSAGES.max('Tên', 50)),
  phone: yup
    .string()
    .optional()
    .matches(/^[0-9]{10,11}$/, {
      message: MESSAGES.phone,
      excludeEmptyString: true,
    }),
  address: yup.string().optional().max(200, MESSAGES.max('Địa chỉ', 200)),
  bio: yup.string().optional().max(500, MESSAGES.max('Giới thiệu', 500)),
  company: yup.string().optional().max(100, MESSAGES.max('Công ty', 100)),
  website: yup
    .string()
    .optional()
    .url('Website không hợp lệ')
    .max(100, MESSAGES.max('Website', 100)),
});

// Export types
export type LoginInput = yup.InferType<typeof loginSchema>;
export type RegisterInput = yup.InferType<typeof registerSchema>;
export type ForgotPasswordInput = yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordInput = yup.InferType<typeof resetPasswordSchema>;
export type ChangePasswordInput = yup.InferType<typeof changePasswordSchema>;
export type UpdateProfileInput = yup.InferType<typeof updateProfileSchema>;

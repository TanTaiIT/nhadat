import * as yup from 'yup';

// Common reusable field schemas
export const emailField = yup
  .string()
  .required('Email không được để trống')
  .email('Email không hợp lệ')
  .trim()
  .lowercase();

export const phoneField = yup
  .string()
  .matches(/^[0-9]{10,11}$/, {
    message: 'Số điện thoại không hợp lệ (10-11 số)',
    excludeEmptyString: true,
  });

export const passwordField = yup
  .string()
  .required('Mật khẩu không được để trống')
  .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  .max(100, 'Mật khẩu không được quá 100 ký tự');

export const urlField = yup
  .string()
  .url('URL không hợp lệ')
  .max(500, 'URL không được quá 500 ký tự');

export const priceField = yup
  .number()
  .required('Giá không được để trống')
  .positive('Giá phải là số dương')
  .min(0, 'Giá không được âm');

// Common validation messages
export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} không được để trống`,
  min: (field: string, min: number) => `${field} phải có ít nhất ${min} ký tự`,
  max: (field: string, max: number) => `${field} không được quá ${max} ký tự`,
  minValue: (field: string, min: number) => `${field} phải lớn hơn hoặc bằng ${min}`,
  maxValue: (field: string, max: number) => `${field} không được quá ${max}`,
  email: 'Email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  url: 'URL không hợp lệ',
  positive: (field: string) => `${field} phải là số dương`,
  match: (field: string) => `${field} không khớp`,
};

// Pagination schema
export const paginationSchema = yup.object({
  page: yup.number().min(1).default(1),
  limit: yup.number().min(1).max(100).default(10),
  sortBy: yup.string().optional(),
  sortOrder: yup.string().oneOf(['asc', 'desc']).default('desc'),
});

// File upload schema
export const fileUploadSchema = yup.object({
  file: yup
    .mixed()
    .required('Vui lòng chọn file')
    .test('fileSize', 'File quá lớn (max 5MB)', (value: any) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Định dạng file không hợp lệ', (value: any) => {
      if (!value) return true;
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      return validTypes.includes(value.type);
    }),
});

// Contact form schema
export const contactSchema = yup.object({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.required('Họ tên'))
    .min(2, VALIDATION_MESSAGES.min('Họ tên', 2))
    .max(100, VALIDATION_MESSAGES.max('Họ tên', 100)),
  email: emailField,
  phone: phoneField.required(VALIDATION_MESSAGES.required('Số điện thoại')),
  subject: yup
    .string()
    .required(VALIDATION_MESSAGES.required('Chủ đề'))
    .min(5, VALIDATION_MESSAGES.min('Chủ đề', 5))
    .max(200, VALIDATION_MESSAGES.max('Chủ đề', 200)),
  message: yup
    .string()
    .required(VALIDATION_MESSAGES.required('Nội dung'))
    .min(10, VALIDATION_MESSAGES.min('Nội dung', 10))
    .max(1000, VALIDATION_MESSAGES.max('Nội dung', 1000)),
});

// Export types
export type PaginationInput = yup.InferType<typeof paginationSchema>;
export type ContactInput = yup.InferType<typeof contactSchema>;

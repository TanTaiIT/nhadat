import * as yup from 'yup';

// Common validation messages
const MESSAGES = {
  required: (field: string) => `${field} không được để trống`,
  min: (field: string, min: number) => `${field} phải có ít nhất ${min} ký tự`,
  max: (field: string, max: number) => `${field} không được quá ${max} ký tự`,
  minValue: (field: string, min: number) => `${field} phải lớn hơn ${min}`,
  maxValue: (field: string, max: number) => `${field} không được quá ${max}`,
  positive: (field: string) => `${field} phải là số dương`,
};

// Property type options
export const PROPERTY_TYPES = ['apartment', 'house', 'land', 'villa', 'office'] as const;
export const PROPERTY_STATUS = ['available', 'sold', 'rented', 'pending'] as const;
export const FURNITURE_OPTIONS = ['full', 'partial', 'none'] as const;

// Create/Update property schema
export const propertySchema = yup.object({
  title: yup
    .string()
    .required(MESSAGES.required('Tiêu đề'))
    .min(10, MESSAGES.min('Tiêu đề', 10))
    .max(200, MESSAGES.max('Tiêu đề', 200))
    .trim(),
  
  description: yup
    .string()
    .required(MESSAGES.required('Mô tả'))
    .min(50, MESSAGES.min('Mô tả', 50))
    .max(5000, MESSAGES.max('Mô tả', 5000))
    .trim(),
  
  price: yup
    .number()
    .required(MESSAGES.required('Giá'))
    .positive(MESSAGES.positive('Giá'))
    .min(1000000, MESSAGES.minValue('Giá', 1000000))
    .max(1000000000000, MESSAGES.maxValue('Giá', 1000000000000)),
  
  area: yup
    .number()
    .required(MESSAGES.required('Diện tích'))
    .positive(MESSAGES.positive('Diện tích'))
    .min(1, MESSAGES.minValue('Diện tích', 1))
    .max(100000, MESSAGES.maxValue('Diện tích', 100000)),
  
  type: yup
    .string()
    .required(MESSAGES.required('Loại BĐS'))
    .oneOf(PROPERTY_TYPES as unknown as string[], 'Loại bất động sản không hợp lệ'),
  
  status: yup
    .string()
    .required(MESSAGES.required('Trạng thái'))
    .oneOf(PROPERTY_STATUS as unknown as string[], 'Trạng thái không hợp lệ'),
  
  // Address
  address: yup.object({
    street: yup
      .string()
      .required(MESSAGES.required('Địa chỉ'))
      .min(5, MESSAGES.min('Địa chỉ', 5))
      .max(200, MESSAGES.max('Địa chỉ', 200)),
    ward: yup
      .string()
      .required(MESSAGES.required('Phường/Xã')),
    district: yup
      .string()
      .required(MESSAGES.required('Quận/Huyện')),
    city: yup
      .string()
      .required(MESSAGES.required('Tỉnh/Thành phố')),
    coordinates: yup.object({
      lat: yup.number().optional().min(-90).max(90),
      lng: yup.number().optional().min(-180).max(180),
    }).optional(),
  }),
  
  // Features (optional)
  features: yup.object({
    bedrooms: yup.number().optional().min(0).max(50),
    bathrooms: yup.number().optional().min(0).max(50),
    floors: yup.number().optional().min(1).max(100),
    furniture: yup
      .string()
      .optional()
      .oneOf(FURNITURE_OPTIONS as unknown as string[], 'Tình trạng nội thất không hợp lệ'),
    parking: yup.boolean().optional(),
    balcony: yup.boolean().optional(),
    elevator: yup.boolean().optional(),
  }).optional(),
  
  // Images (validate URLs or file types)
  images: yup
    .array()
    .of(yup.string().url('URL hình ảnh không hợp lệ'))
    .min(1, 'Phải có ít nhất 1 hình ảnh')
    .max(20, 'Không được quá 20 hình ảnh')
    .required(MESSAGES.required('Hình ảnh')),
});

// Search/Filter schema
export const propertySearchSchema = yup.object({
  q: yup.string().optional().max(200),
  type: yup.string().optional().oneOf(PROPERTY_TYPES as unknown as string[]),
  status: yup.string().optional().oneOf(PROPERTY_STATUS as unknown as string[]),
  minPrice: yup.number().optional().min(0),
  maxPrice: yup.number().optional().min(0),
  minArea: yup.number().optional().min(0),
  maxArea: yup.number().optional().min(0),
  city: yup.string().optional(),
  district: yup.string().optional(),
  bedrooms: yup.number().optional().min(0),
  bathrooms: yup.number().optional().min(0),
  page: yup.number().optional().min(1).default(1),
  limit: yup.number().optional().min(1).max(100).default(10),
});

// Contact form schema
export const contactPropertySchema = yup.object({
  name: yup
    .string()
    .required(MESSAGES.required('Họ tên'))
    .min(2, MESSAGES.min('Họ tên', 2))
    .max(100, MESSAGES.max('Họ tên', 100)),
  email: yup
    .string()
    .required(MESSAGES.required('Email'))
    .email('Email không hợp lệ'),
  phone: yup
    .string()
    .required(MESSAGES.required('Số điện thoại'))
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  message: yup
    .string()
    .required(MESSAGES.required('Nội dung'))
    .min(10, MESSAGES.min('Nội dung', 10))
    .max(1000, MESSAGES.max('Nội dung', 1000)),
  propertyId: yup.string().required(),
});

// Export types
export type PropertyInput = yup.InferType<typeof propertySchema>;
export type PropertySearchInput = yup.InferType<typeof propertySearchSchema>;
export type ContactPropertyInput = yup.InferType<typeof contactPropertySchema>;

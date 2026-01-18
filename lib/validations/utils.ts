import * as yup from 'yup';

/**
 * Helper function to validate data against a schema
 */
export async function validateData<T>(
  schema: yup.Schema<T>,
  data: unknown
): Promise<{ isValid: boolean; data?: T; errors?: Record<string, string> }> {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: { _error: 'Validation failed' },
    };
  }
}

/**
 * Validate data synchronously
 */
export function validateDataSync<T>(
  schema: yup.Schema<T>,
  data: unknown
): { isValid: boolean; data?: T; errors?: Record<string, string> } {
  try {
    const validatedData = schema.validateSync(data, { abortEarly: false });
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: { _error: 'Validation failed' },
    };
  }
}

/**
 * Create a conditional schema
 */
export function conditionalSchema<T>(
  condition: boolean,
  trueSchema: yup.Schema<T>,
  falseSchema: yup.Schema<T>
): yup.Schema<T> {
  return condition ? trueSchema : falseSchema;
}

/**
 * Merge multiple schemas
 */
export function mergeSchemas<T extends Record<string, any>>(
  ...schemas: yup.ObjectSchema<any>[]
): yup.ObjectSchema<T> {
  return schemas.reduce((acc, schema) => acc.concat(schema), yup.object()) as yup.ObjectSchema<T>;
}

/**
 * Create a custom validator
 */
export function createValidator<T>(
  name: string,
  message: string,
  validator: (value: T) => boolean
) {
  return yup.mixed<T>().test(name, message, validator);
}

/**
 * Vietnamese phone number validator
 */
export const vietnamesePhoneValidator = yup
  .string()
  .matches(
    /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
    'Số điện thoại không hợp lệ'
  );

/**
 * Password strength validator
 */
export const strongPasswordValidator = yup
  .string()
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  .matches(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
  .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
  .matches(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số')
  .matches(/[^a-zA-Z0-9]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt');

/**
 * Vietnamese identity card validator
 */
export const identityCardValidator = yup
  .string()
  .matches(/^[0-9]{9}$|^[0-9]{12}$/, 'CMND/CCCD không hợp lệ (9 hoặc 12 số)');

/**
 * Date range validator
 */
export function dateRangeValidator(
  startDateField: string,
  endDateField: string,
  message: string = 'Ngày kết thúc phải sau ngày bắt đầu'
) {
  return yup.object().test('date-range', message, function (value: any) {
    const startDate = value[startDateField];
    const endDate = value[endDateField];
    
    if (!startDate || !endDate) return true;
    
    return new Date(endDate) >= new Date(startDate);
  });
}

/**
 * File size validator
 */
export function fileSizeValidator(maxSizeInMB: number) {
  return yup.mixed().test(
    'fileSize',
    `Kích thước file không được vượt quá ${maxSizeInMB}MB`,
    (value: any) => {
      if (!value || !value.size) return true;
      return value.size <= maxSizeInMB * 1024 * 1024;
    }
  );
}

/**
 * File type validator
 */
export function fileTypeValidator(allowedTypes: string[]) {
  return yup.mixed().test(
    'fileType',
    `Chỉ chấp nhận các định dạng: ${allowedTypes.join(', ')}`,
    (value: any) => {
      if (!value || !value.type) return true;
      return allowedTypes.includes(value.type);
    }
  );
}

/**
 * URL validator (Vietnamese domains)
 */
export const vietnameseUrlValidator = yup
  .string()
  .matches(
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    'URL không hợp lệ'
  );

/**
 * Create array with min/max length
 */
export function arrayValidator<T>(
  itemSchema: yup.Schema<T>,
  min?: number,
  max?: number,
  minMessage?: string,
  maxMessage?: string
) {
  let schema = yup.array().of(itemSchema);
  
  if (min !== undefined) {
    schema = schema.min(min, minMessage || `Phải có ít nhất ${min} mục`);
  }
  
  if (max !== undefined) {
    schema = schema.max(max, maxMessage || `Không được quá ${max} mục`);
  }
  
  return schema;
}

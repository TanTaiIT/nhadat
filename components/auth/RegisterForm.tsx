'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegister } from '@/hooks/queries';
import { useAppSelector } from '@/store';
import { selectIsLoading, selectError } from '@/store/slices/authSlice';
import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import { registerSchema } from '@/lib/validations';

export function RegisterForm() {
  const registerMutation = useRegister();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: Record<string, any>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await registerMutation.mutateAsync(data as any);
    } catch (err) {
      // Error handled by React Query
      console.error('Register error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Global Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Họ <span className="text-red-500">*</span>
          </label>
          <Input
            id="firstName"
            type="text"
            {...register('firstName')}
            placeholder="Nguyễn Văn"
            autoComplete="given-name"
            error={errors.firstName?.message}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên <span className="text-red-500">*</span>
          </label>
          <Input
            id="lastName"
            type="text"
            {...register('lastName')}
            placeholder="An"
            autoComplete="family-name"
            error={errors.lastName?.message}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="name@example.com"
          autoComplete="email"
          error={errors.email?.message}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Số điện thoại
        </label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="0912345678"
          autoComplete="tel"
          error={errors.phone?.message}
        />
        <p className="mt-1 text-xs text-gray-500">10-11 số</p>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.password?.message}
        />
        <p className="mt-1 text-xs text-gray-500">Tối thiểu 6 ký tự</p>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Xác nhận mật khẩu <span className="text-red-500">*</span>
        </label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register('agreeToTerms')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
        />
        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
          Tôi đồng ý với{' '}
          <Link href="/dieu-khoan" className="text-blue-600 hover:text-blue-500">
            Điều khoản sử dụng
          </Link>{' '}
          và{' '}
          <Link href="/chinh-sach" className="text-blue-600 hover:text-blue-500">
            Chính sách bảo mật
          </Link>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading || registerMutation.isPending || isSubmitting}
      >
        {(isLoading || registerMutation.isPending || isSubmitting) ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang xử lý...
          </span>
        ) : (
          'Đăng ký'
        )}
      </Button>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </form>
  );
}

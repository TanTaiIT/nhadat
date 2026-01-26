'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/hooks/queries';
import { useAppSelector } from '@/store';
import { selectIsLoading, selectError } from '@/store/slices/authSlice';
import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import { loginSchema, type LoginInput } from '@/lib/validations';

interface LoginFormProps {
  isAdmin?: boolean;
}

export function LoginForm({ isAdmin = false }: LoginFormProps) {
  const login = useLogin();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(loginSchema) as any,
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = handleSubmit(async (data: LoginInput) => {
    try {
      await login.mutateAsync(data);
    } catch (err) {
      // Error handled by React Query
      console.error('Login error:', err);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Global Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
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

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          {!isAdmin && (
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Quên mật khẩu?
            </Link>
          )}
        </div>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
        />
      </div>

      {/* Remember Me */}
      {!isAdmin && (
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            {...register('remember')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Ghi nhớ đăng nhập
          </label>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading || login.isPending || isSubmitting}
      >
        {(isLoading || login.isPending || isSubmitting) ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang xử lý...
          </span>
        ) : (
          'Đăng nhập'
        )}
      </Button>

      {/* Register Link */}
      {!isAdmin && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link
              href={ROUTES.REGISTER}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      )}
    </form>
  );
}

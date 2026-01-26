'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAppDispatch } from '@/store';
import { setCredentials, logout as logoutAction, setLoading, setError } from '@/store/slices/authSlice';
import type { LoginCredentials, RegisterData, User } from '@/types';
import { ROUTES } from '@/constants';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

/**
 * Hook to get current user
 * Syncs with Redux store on successful fetch
 */
export function useCurrentUser() {
  const dispatch = useAppDispatch();
  
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async (): Promise<User | null> => {
      try {
        if (!authService.isAuthenticated()) {
          return null;
        }
        const user = await authService.getCurrentUser() as User;
        
        // Sync with Redux store
        if (user) {
          const accessToken = authService.getAccessToken();
          const refreshToken = typeof window !== 'undefined' 
            ? localStorage.getItem('refreshToken') 
            : null;
          
          dispatch(setCredentials({
            user: user,
            accessToken: accessToken || '',
            refreshToken: refreshToken || '',
          }));
        }
        
        return user;
      } catch (error) {
        // If token is invalid, logout
        authService.logout();
        dispatch(logoutAction());
        return null;
      }
    },
    enabled: authService.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes - avoid refetching too often
  });
}

/**
 * Hook for login mutation
 */
export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      return await authService.login(credentials);
    },
    onSuccess: (data) => {
      // Save to Redux
      dispatch(setCredentials({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
      
      // Invalidate and refetch user query
      queryClient.setQueryData(authKeys.me(), data.user);
      
      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push(ROUTES.DASHBOARD);
      }
      
      dispatch(setLoading(false));
    },
    onError: (error: Error) => {
      dispatch(setError(error.message || 'Đăng nhập thất bại'));
      dispatch(setLoading(false));
    },
  });
}

/**
 * Hook for register mutation
 */
export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      return await authService.register(data);
    },
    onSuccess: (data) => {
      // Save to Redux
      dispatch(setCredentials({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
      
      // Set user in cache
      queryClient.setQueryData(authKeys.me(), data.user);
      
      // Redirect to dashboard
      router.push(ROUTES.DASHBOARD);
      
      dispatch(setLoading(false));
    },
    onError: (error: Error) => {
      dispatch(setError(error.message || 'Đăng ký thất bại'));
      dispatch(setLoading(false));
    },
  });
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      // Clear Redux state
      dispatch(logoutAction());
      
      // Clear all queries
      queryClient.clear();
      
      // Redirect to home
      router.push(ROUTES.HOME);
    },
  });
}

/**
 * Hook for forgot password mutation
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      await authService.forgotPassword(email);
    },
  });
}

/**
 * Hook for reset password mutation
 */
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      await authService.resetPassword(token, password);
    },
    onSuccess: () => {
      router.push(ROUTES.LOGIN);
    },
  });
}

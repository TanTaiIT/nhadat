// Auth Service
import { apiService } from './api.service';
import { API_ROUTES } from '@/constants';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types';

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ROUTES.AUTH.LOGIN,
      credentials
    );
    
    if (response.success && response.data) {
      // Store tokens
      this.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    }
    
    throw new Error(response.message || 'Đăng nhập thất bại');
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ROUTES.AUTH.REGISTER,
      {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
      }
    );
    
    if (response.success && response.data) {
      // Store tokens
      this.setTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    }
    
    throw new Error(response.message || 'Đăng ký thất bại');
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    const response = await apiService.get(API_ROUTES.AUTH.ME, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error('Không thể lấy thông tin người dùng');
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiService.post<{ accessToken: string }>(
      API_ROUTES.AUTH.REFRESH,
      { refreshToken }
    );
    
    if (response.success && response.data) {
      this.setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    }
    
    throw new Error('Không thể làm mới token');
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.post(API_ROUTES.AUTH.FORGOT_PASSWORD, {
      email,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Gửi yêu cầu thất bại');
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, password: string): Promise<void> {
    const response = await apiService.post(API_ROUTES.AUTH.RESET_PASSWORD, {
      token,
      password,
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Đặt lại mật khẩu thất bại');
    }
  }

  // Token management
  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  private setAccessToken(accessToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();

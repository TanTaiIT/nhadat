// User Types
export enum UserRole {
  USER = 'user', // Người dùng thường
  AGENT = 'agent', // Môi giới
  ADMIN = 'admin', // Quản trị viên
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  PENDING = 'pending', // Chờ xác thực
}

export enum AccountType {
  FREE = 'free', // Tài khoản miễn phí
  BASIC = 'basic', // Gói cơ bản
  PRO = 'pro', // Gói chuyên nghiệp
  ENTERPRISE = 'enterprise', // Gói doanh nghiệp
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string; // Giới thiệu bản thân
  company?: string; // Công ty
  website?: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: 'vi' | 'en';
  currency: 'VND' | 'USD';
  timezone: string;
}

export interface UserStats {
  totalProperties: number; // Tổng số tin đăng
  activeProperties: number; // Tin đang hiển thị
  soldProperties: number; // Đã bán/cho thuê
  totalViews: number; // Tổng lượt xem
  totalFavorites: number; // Tổng lượt yêu thích
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  accountType: AccountType;
  
  // Profile
  profile: UserProfile;
  
  // Settings
  settings?: UserSettings;
  
  // Stats
  stats?: UserStats;
  
  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Password Reset
export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Profile Update
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  bio?: string;
  company?: string;
  website?: string;
  avatar?: File | string;
}

// Change Password
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// User List/Search
export interface UserFilter {
  role?: UserRole;
  status?: UserStatus;
  accountType?: AccountType;
  q?: string; // Search query
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'email' | 'fullName';
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

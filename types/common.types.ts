// Common API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string; // Field that caused error
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Filter & Sort
export interface FilterOption {
  label: string;
  value: string | number;
  count?: number; // Number of items
}

export interface SortOption {
  label: string;
  value: string;
  order: 'asc' | 'desc';
}

// Form States
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

// File Upload
export interface UploadedFile {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface FileUploadProgress {
  file: File;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Location Types
export interface Province {
  id: string;
  name: string;
  code: string;
}

export interface District {
  id: string;
  name: string;
  code: string;
  provinceId: string;
}

export interface Ward {
  id: string;
  name: string;
  code: string;
  districtId: string;
}

// Coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapBounds {
  northeast: Coordinates;
  southwest: Coordinates;
}

// Stats/Analytics
export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

// Notification Types
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

// SEO Types
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

// Breadcrumb
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

// Menu/Navigation
export interface MenuItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: MenuItem[];
  active?: boolean;
}

// Contact
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  propertyId?: string; // Nếu liên hệ về property cụ thể
  read: boolean;
  createdAt: Date;
}

// Review/Rating
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  propertyId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  helpful?: number; // Số người thấy hữu ích
}

// Favorite/Wishlist
export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
}

// Search History
export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  filters: Record<string, any>;
  createdAt: Date;
}

// Price Range
export interface PriceRange {
  min: number;
  max: number;
  label: string;
}

// Area Range
export interface AreaRange {
  min: number;
  max: number;
  label: string;
}

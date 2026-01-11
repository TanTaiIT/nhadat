// Frontend Route Constants
export const ROUTES = {
  // Public routes
  HOME: '/',
  PROPERTIES: '/bat-dong-san',
  PROPERTY_DETAIL: (id: string) => `/bat-dong-san/${id}`,
  PROJECTS: '/du-an',
  PROJECT_DETAIL: (id: string) => `/du-an/${id}`,
  SERVICES: '/dich-vu',
  NEWS: '/tin-tuc',
  NEWS_DETAIL: (slug: string) => `/tin-tuc/${slug}`,
  CONTACT: '/lien-he',
  ABOUT: '/gioi-thieu',
  
  // Auth routes
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  FORGOT_PASSWORD: '/quen-mat-khau',
  RESET_PASSWORD: '/dat-lai-mat-khau',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  POST_PROPERTY: '/dang-tin',
  EDIT_PROPERTY: (id: string) => `/dang-tin/${id}/chinh-sua`,
  MY_PROPERTIES: '/quan-ly-tin',
  PROFILE: '/tai-khoan',
  FAVORITES: '/yeu-thich',
  SETTINGS: '/cai-dat',
} as const;

// API Route Constants
export const API_ROUTES = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    ME: '/api/auth/me',
  },
  
  // Property endpoints
  PROPERTIES: {
    LIST: '/api/properties',
    DETAIL: (id: string) => `/api/properties/${id}`,
    CREATE: '/api/properties',
    UPDATE: (id: string) => `/api/properties/${id}`,
    DELETE: (id: string) => `/api/properties/${id}`,
    FEATURED: '/api/properties/featured',
    SEARCH: '/api/properties/search',
    MY_PROPERTIES: '/api/properties/my',
    STATS: '/api/properties/stats',
  },
  
  // User endpoints
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password',
    UPLOAD_AVATAR: '/api/users/avatar',
  },
  
  // Favorite endpoints
  FAVORITES: {
    LIST: '/api/favorites',
    ADD: '/api/favorites',
    REMOVE: (id: string) => `/api/favorites/${id}`,
    CHECK: (propertyId: string) => `/api/favorites/check/${propertyId}`,
  },
  
  // Upload endpoints
  UPLOAD: {
    IMAGE: '/api/upload/image',
    IMAGES: '/api/upload/images',
    VIDEO: '/api/upload/video',
    DELETE: (id: string) => `/api/upload/${id}`,
  },
  
  // Location endpoints
  LOCATION: {
    PROVINCES: '/api/location/provinces',
    DISTRICTS: (provinceId: string) => `/api/location/districts/${provinceId}`,
    WARDS: (districtId: string) => `/api/location/wards/${districtId}`,
  },
  
  // Contact endpoints
  CONTACT: {
    SEND: '/api/contact',
  },
} as const;

// Navigation Menu Items
export const NAV_ITEMS = [
  {
    label: 'Trang chủ',
    href: ROUTES.HOME,
  },
  {
    label: 'Bất động sản',
    href: ROUTES.PROPERTIES,
  },
  {
    label: 'Dự án',
    href: ROUTES.PROJECTS,
  },
  {
    label: 'Dịch vụ',
    href: ROUTES.SERVICES,
  },
  {
    label: 'Tin tức',
    href: ROUTES.NEWS,
  },
  {
    label: 'Liên hệ',
    href: ROUTES.CONTACT,
  },
] as const;

// Dashboard Menu Items
export const DASHBOARD_NAV_ITEMS = [
  {
    label: 'Tổng quan',
    href: ROUTES.DASHBOARD,
    icon: 'dashboard',
  },
  {
    label: 'Quản lý tin',
    href: ROUTES.MY_PROPERTIES,
    icon: 'list',
  },
  {
    label: 'Đăng tin mới',
    href: ROUTES.POST_PROPERTY,
    icon: 'add',
  },
  {
    label: 'Yêu thích',
    href: ROUTES.FAVORITES,
    icon: 'favorite',
  },
  {
    label: 'Tài khoản',
    href: ROUTES.PROFILE,
    icon: 'person',
  },
  {
    label: 'Cài đặt',
    href: ROUTES.SETTINGS,
    icon: 'settings',
  },
] as const;

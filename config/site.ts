import type { SEOMeta } from '@/types';

// Site Configuration
export const siteConfig = {
  name: 'Nhà Đất',
  title: 'Nhà Đất - Mua bán cho thuê bất động sản uy tín',
  description: 'Trang web mua bán, cho thuê bất động sản uy tín hàng đầu Việt Nam. Tìm kiếm căn hộ, nhà riêng, đất nền, biệt thự với giá tốt nhất.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  creator: 'Nhà Đất Team',
  
  // Company Info
  company: {
    name: 'Công ty Bất Động Sản Nhà Đất',
    address: '123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
    phone: '1900 xxxx',
    email: 'contact@nhadat.vn',
    hotline: '0909 xxx xxx',
  },
  
  // Social Links
  links: {
    facebook: 'https://facebook.com/nhadat',
    youtube: 'https://youtube.com/@nhadat',
    zalo: 'https://zalo.me/nhadat',
    instagram: 'https://instagram.com/nhadat',
  },
  
  // SEO
  keywords: [
    'bất động sản',
    'mua bán nhà đất',
    'cho thuê nhà đất',
    'căn hộ chung cư',
    'nhà riêng',
    'đất nền',
    'biệt thự',
    'bds việt nam',
  ],
} as const;

export type SiteConfig = typeof siteConfig;

// Default SEO Meta
export const defaultSEO: SEOMeta = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogImage: siteConfig.ogImage,
  ogTitle: siteConfig.title,
  ogDescription: siteConfig.description,
};

// API Configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  timeout: 30000, // 30 seconds
};

// App Configuration
export const appConfig = {
  // Pagination
  defaultPageSize: 12,
  maxPageSize: 100,
  
  // Upload
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxVideoSize: 50 * 1024 * 1024, // 50MB
  maxImages: 20,
  maxVideos: 3,
  
  // Property
  propertyTitleMinLength: 10,
  propertyTitleMaxLength: 200,
  propertyDescriptionMinLength: 50,
  propertyDescriptionMaxLength: 5000,
  
  // Authentication
  tokenKey: 'nhadat_access_token',
  refreshTokenKey: 'nhadat_refresh_token',
  
  // Cache
  cacheTime: {
    properties: 5 * 60 * 1000, // 5 minutes
    user: 10 * 60 * 1000, // 10 minutes
  },
};

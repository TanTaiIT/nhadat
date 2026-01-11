// Property Types
export enum PropertyType {
  APARTMENT = 'apartment', // Căn hộ/Chung cư
  HOUSE = 'house', // Nhà riêng
  VILLA = 'villa', // Biệt thự
  LAND = 'land', // Đất nền
  OFFICE = 'office', // Văn phòng
  SHOP = 'shop', // Mặt bằng kinh doanh
  WAREHOUSE = 'warehouse', // Kho xưởng
}

export enum PropertyStatus {
  AVAILABLE = 'available', // Đang bán/cho thuê
  SOLD = 'sold', // Đã bán
  RENTED = 'rented', // Đã cho thuê
  PENDING = 'pending', // Đang chờ duyệt
  DRAFT = 'draft', // Bản nháp
}

export enum TransactionType {
  SELL = 'sell', // Bán
  RENT = 'rent', // Cho thuê
  BOTH = 'both', // Cả bán và cho thuê
}

export enum PropertyDirection {
  EAST = 'east', // Đông
  WEST = 'west', // Tây
  SOUTH = 'south', // Nam
  NORTH = 'north', // Bắc
  NORTHEAST = 'northeast', // Đông Bắc
  NORTHWEST = 'northwest', // Tây Bắc
  SOUTHEAST = 'southeast', // Đông Nam
  SOUTHWEST = 'southwest', // Tây Nam
}

export interface PropertyLocation {
  address: string; // Địa chỉ đầy đủ
  ward?: string; // Phường/Xã
  district: string; // Quận/Huyện
  city: string; // Thành phố/Tỉnh
  latitude?: number;
  longitude?: number;
}

export interface PropertyFeatures {
  bedrooms?: number; // Số phòng ngủ
  bathrooms?: number; // Số phòng tắm
  floors?: number; // Số tầng
  balconies?: number; // Số ban công
  parkingSpots?: number; // Chỗ đậu xe
  direction?: PropertyDirection; // Hướng nhà
  furniture?: boolean; // Có nội thất
  amenities?: string[]; // Tiện ích: ['gym', 'pool', 'security', 'elevator']
}

export interface PropertyMedia {
  images: string[]; // Danh sách URL hình ảnh
  videos?: string[]; // Danh sách URL video
  virtualTour?: string; // URL virtual tour 360
  thumbnail?: string; // Ảnh đại diện
}

export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Property {
  id: string;
  title: string; // Tiêu đề tin đăng
  description: string; // Mô tả chi tiết
  
  // Type & Status
  type: PropertyType;
  status: PropertyStatus;
  transactionType: TransactionType;
  
  // Price & Area
  price: number; // Giá (VNĐ)
  pricePerM2?: number; // Giá/m2
  area: number; // Diện tích (m2)
  landArea?: number; // Diện tích đất (m2)
  usableArea?: number; // Diện tích sử dụng (m2)
  
  // Location
  location: PropertyLocation;
  
  // Features
  features: PropertyFeatures;
  
  // Media
  media: PropertyMedia;
  
  // Owner
  owner: PropertyOwner;
  ownerId: string;
  
  // Legal
  legalDocuments?: string; // Giấy tờ pháp lý: 'red-book' | 'pink-book' | 'pending'
  
  // SEO
  slug?: string; // URL friendly slug
  
  // Stats
  views?: number; // Lượt xem
  favorites?: number; // Lượt yêu thích
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  expiresAt?: Date; // Ngày hết hạn đăng tin
}

// Filter Types
export interface PropertyFilter {
  type?: PropertyType | PropertyType[];
  transactionType?: TransactionType;
  status?: PropertyStatus | PropertyStatus[];
  city?: string;
  district?: string;
  ward?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  direction?: PropertyDirection;
  furniture?: boolean;
  sortBy?: 'createdAt' | 'price' | 'area' | 'views';
  sortOrder?: 'asc' | 'desc';
}

// Search Types
export interface PropertySearchParams extends PropertyFilter {
  q?: string; // Search query
  page?: number;
  limit?: number;
}

// Form Types
export interface PropertyFormData {
  // Step 1: Basic Info
  title: string;
  description: string;
  type: PropertyType;
  transactionType: TransactionType;
  price: number;
  area: number;
  landArea?: number;
  
  // Step 2: Location
  address: string;
  ward?: string;
  district: string;
  city: string;
  latitude?: number;
  longitude?: number;
  
  // Step 3: Features
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  direction?: PropertyDirection;
  furniture?: boolean;
  amenities?: string[];
  
  // Step 4: Media
  images: File[] | string[];
  videos?: File[] | string[];
  virtualTour?: string;
  
  // Step 5: Legal & Contact
  legalDocuments?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

// API Response Types
export interface PropertyListResponse {
  data: Property[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PropertyDetailResponse {
  data: Property;
}

// Summary/Stats Types
export interface PropertyStats {
  totalProperties: number;
  propertiesForSale: number;
  propertiesForRent: number;
  totalViews: number;
  avgPrice: number;
  avgPricePerM2: number;
}

// Featured/Highlighted Properties
export interface FeaturedProperty extends Property {
  featured: boolean;
  featuredUntil?: Date;
}

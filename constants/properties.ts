import { PropertyType, PropertyDirection, TransactionType } from '@/types';
import type { FilterOption, PriceRange, AreaRange } from '@/types';

// Property Type Options
export const PROPERTY_TYPE_OPTIONS: FilterOption[] = [
  { label: 'Căn hộ/Chung cư', value: PropertyType.APARTMENT },
  { label: 'Nhà riêng', value: PropertyType.HOUSE },
  { label: 'Biệt thự', value: PropertyType.VILLA },
  { label: 'Đất nền', value: PropertyType.LAND },
  { label: 'Văn phòng', value: PropertyType.OFFICE },
  { label: 'Mặt bằng KD', value: PropertyType.SHOP },
  { label: 'Kho xưởng', value: PropertyType.WAREHOUSE },
];

// Transaction Type Options
export const TRANSACTION_TYPE_OPTIONS: FilterOption[] = [
  { label: 'Bán', value: TransactionType.SELL },
  { label: 'Cho thuê', value: TransactionType.RENT },
];

// Direction Options
export const DIRECTION_OPTIONS: FilterOption[] = [
  { label: 'Đông', value: PropertyDirection.EAST },
  { label: 'Tây', value: PropertyDirection.WEST },
  { label: 'Nam', value: PropertyDirection.SOUTH },
  { label: 'Bắc', value: PropertyDirection.NORTH },
  { label: 'Đông Bắc', value: PropertyDirection.NORTHEAST },
  { label: 'Đông Nam', value: PropertyDirection.SOUTHEAST },
  { label: 'Tây Bắc', value: PropertyDirection.NORTHWEST },
  { label: 'Tây Nam', value: PropertyDirection.SOUTHWEST },
];

// Price Ranges (VNĐ)
export const PRICE_RANGES_SELL: PriceRange[] = [
  { min: 0, max: 1000000000, label: 'Dưới 1 tỷ' },
  { min: 1000000000, max: 3000000000, label: '1 - 3 tỷ' },
  { min: 3000000000, max: 5000000000, label: '3 - 5 tỷ' },
  { min: 5000000000, max: 10000000000, label: '5 - 10 tỷ' },
  { min: 10000000000, max: 20000000000, label: '10 - 20 tỷ' },
  { min: 20000000000, max: 50000000000, label: '20 - 50 tỷ' },
  { min: 50000000000, max: 999999999999, label: 'Trên 50 tỷ' },
];

export const PRICE_RANGES_RENT: PriceRange[] = [
  { min: 0, max: 3000000, label: 'Dưới 3 triệu' },
  { min: 3000000, max: 5000000, label: '3 - 5 triệu' },
  { min: 5000000, max: 10000000, label: '5 - 10 triệu' },
  { min: 10000000, max: 20000000, label: '10 - 20 triệu' },
  { min: 20000000, max: 50000000, label: '20 - 50 triệu' },
  { min: 50000000, max: 999999999, label: 'Trên 50 triệu' },
];

// Area Ranges (m²)
export const AREA_RANGES: AreaRange[] = [
  { min: 0, max: 30, label: 'Dưới 30 m²' },
  { min: 30, max: 50, label: '30 - 50 m²' },
  { min: 50, max: 80, label: '50 - 80 m²' },
  { min: 80, max: 100, label: '80 - 100 m²' },
  { min: 100, max: 150, label: '100 - 150 m²' },
  { min: 150, max: 200, label: '150 - 200 m²' },
  { min: 200, max: 300, label: '200 - 300 m²' },
  { min: 300, max: 500, label: '300 - 500 m²' },
  { min: 500, max: 99999, label: 'Trên 500 m²' },
];

// Bedroom Options
export const BEDROOM_OPTIONS: FilterOption[] = [
  { label: '1 phòng', value: 1 },
  { label: '2 phòng', value: 2 },
  { label: '3 phòng', value: 3 },
  { label: '4 phòng', value: 4 },
  { label: '5+ phòng', value: 5 },
];

// Bathroom Options
export const BATHROOM_OPTIONS: FilterOption[] = [
  { label: '1 phòng', value: 1 },
  { label: '2 phòng', value: 2 },
  { label: '3 phòng', value: 3 },
  { label: '4+ phòng', value: 4 },
];

// Amenities
export const AMENITIES_OPTIONS = [
  { label: 'Thang máy', value: 'elevator', icon: '🛗' },
  { label: 'Hồ bơi', value: 'pool', icon: '🏊' },
  { label: 'Gym', value: 'gym', icon: '💪' },
  { label: 'An ninh 24/7', value: 'security', icon: '🔒' },
  { label: 'Sân chơi trẻ em', value: 'playground', icon: '🎪' },
  { label: 'Sân vườn', value: 'garden', icon: '🌳' },
  { label: 'Chỗ đậu xe', value: 'parking', icon: '🚗' },
  { label: 'Ban công', value: 'balcony', icon: '🌅' },
  { label: 'Phòng giặt', value: 'laundry', icon: '🧺' },
  { label: 'Điều hòa', value: 'ac', icon: '❄️' },
  { label: 'Nóng lạnh', value: 'water-heater', icon: '🚿' },
  { label: 'Tủ bếp', value: 'kitchen', icon: '🍳' },
];

// Legal Documents
export const LEGAL_DOCUMENTS_OPTIONS: FilterOption[] = [
  { label: 'Sổ đỏ', value: 'red-book' },
  { label: 'Sổ hồng', value: 'pink-book' },
  { label: 'Hợp đồng mua bán', value: 'contract' },
  { label: 'Giấy tờ hợp lệ khác', value: 'other' },
  { label: 'Đang chờ', value: 'pending' },
];

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Mới nhất', value: 'createdAt', order: 'desc' as const },
  { label: 'Cũ nhất', value: 'createdAt', order: 'asc' as const },
  { label: 'Giá thấp đến cao', value: 'price', order: 'asc' as const },
  { label: 'Giá cao đến thấp', value: 'price', order: 'desc' as const },
  { label: 'Diện tích nhỏ đến lớn', value: 'area', order: 'asc' as const },
  { label: 'Diện tích lớn đến nhỏ', value: 'area', order: 'desc' as const },
];

// Items per page options
export const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48];

// Default pagination
export const DEFAULT_PAGE_SIZE = 12;

// Map default center (Vietnam)
export const MAP_DEFAULT_CENTER = {
  latitude: 21.028511,
  longitude: 105.804817,
};

// Map default zoom
export const MAP_DEFAULT_ZOOM = 13;

// Image upload limits
export const MAX_IMAGES = 20;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Video upload limits
export const MAX_VIDEOS = 3;
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

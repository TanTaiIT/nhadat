import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { propertyService } from '@/services/property.service';
import { Property } from '@/types';

// Mock data for development
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Căn hộ cao cấp view sông Sài Gòn',
    description: 'Căn hộ 2 phòng ngủ, full nội thất cao cấp, view sông tuyệt đẹp',
    type: 'apartment' as any,
    status: 'available' as any,
    transactionType: 'sell' as any,
    price: 3500000000,
    pricePerM2: 45000000,
    area: 78,
    location: {
      address: '123 Nguyễn Hữu Cảnh',
      district: 'Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      floors: 1,
      furniture: true,
      amenities: ['elevator', 'pool', 'gym', 'security'],
    },
    media: {
      images: [''],
      thumbnail: '/batdongsan.jpg',
    },
    owner: {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'user@example.com',
      phone: '0909123456',
    },
    ownerId: '1',
    views: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Nhà phố 3 tầng khu Thảo Điền',
    description: 'Nhà mới xây, thiết kế hiện đại, gần trường quốc tế',
    type: 'house' as any,
    status: 'available' as any,
    transactionType: 'sell' as any,
    price: 12000000000,
    pricePerM2: 60000000,
    area: 200,
    landArea: 120,
    location: {
      address: '456 Xuân Thủy',
      district: 'Thủ Đức',
      city: 'TP. Hồ Chí Minh',
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      floors: 3,
      furniture: false,
      amenities: ['parking', 'garden', 'balcony'],
    },
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/public/batdongsan.jpg',
    },
    owner: {
      id: '2',
      name: 'Trần Thị B',
      email: 'user2@example.com',
      phone: '0909876543',
    },
    ownerId: '2',
    views: 230,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Đất nền dự án Vincity',
    description: 'Đất nền giá tốt, vị trí đẹp, gần khu công nghiệp',
    type: 'land' as any,
    status: 'available' as any,
    transactionType: 'sell' as any,
    price: 2500000000,
    pricePerM2: 25000000,
    area: 100,
    location: {
      address: 'Khu đô thị Vincity',
      district: 'Quận 9',
      city: 'TP. Hồ Chí Minh',
    },
    features: {},
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/placeholder-property.jpg',
    },
    owner: {
      id: '3',
      name: 'Lê Văn C',
      email: 'user3@example.com',
      phone: '0909456789',
    },
    ownerId: '3',
    views: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Biệt thự đơn lập Phú Mỹ Hưng',
    description: 'Biệt thự cao cấp, sân vườn rộng rãi, an ninh 24/7',
    type: 'villa' as any,
    status: 'available' as any,
    transactionType: 'sell' as any,
    price: 25000000000,
    pricePerM2: 50000000,
    area: 500,
    landArea: 300,
    location: {
      address: 'Phú Mỹ Hưng',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh',
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      floors: 2,
      furniture: true,
      amenities: ['pool', 'garden', 'parking', 'security'],
    },
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/placeholder-property.jpg',
    },
    owner: {
      id: '4',
      name: 'Phạm Thị D',
      email: 'user4@example.com',
      phone: '0909321654',
    },
    ownerId: '4',
    views: 320,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Căn hộ studio đầy đủ tiện nghi',
    description: 'Căn hộ studio hiện đại, full nội thất, giá tốt',
    type: 'apartment' as any,
    status: 'available' as any,
    transactionType: 'rent' as any,
    price: 8000000,
    pricePerM2: 250000,
    area: 32,
    location: {
      address: '789 Lê Văn Sỹ',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      floors: 1,
      furniture: true,
      amenities: ['elevator', 'ac', 'water-heater'],
    },
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/placeholder-property.jpg',
    },
    owner: {
      id: '5',
      name: 'Hoàng Văn E',
      email: 'user5@example.com',
      phone: '0909654321',
    },
    ownerId: '5',
    views: 175,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Nhà mặt tiền Phan Văn Trị',
    description: 'Nhà mặt tiền kinh doanh, vị trí đắc địa',
    type: 'house' as any,
    status: 'available' as any,
    transactionType: 'sell' as any,
    price: 18000000000,
    pricePerM2: 80000000,
    area: 225,
    landArea: 150,
    location: {
      address: 'Phan Văn Trị',
      district: 'Gò Vấp',
      city: 'TP. Hồ Chí Minh',
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      floors: 3,
      furniture: false,
      amenities: ['parking', 'balcony'],
    },
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/placeholder-property.jpg',
    },
    owner: {
      id: '6',
      name: 'Vũ Thị F',
      email: 'user6@example.com',
      phone: '0909789456',
    },
    ownerId: '6',
    views: 280,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    title: 'Căn hộ chung cư Vinhomes Central Park',
    description: 'Căn hộ 3PN view công viên, nội thất cao cấp',
    type: 'apartment' as any,
    status: 'available' as any,
    transactionType: 'rent' as any,
    price: 25000000,
    pricePerM2: 250000,
    area: 100,
    location: {
      address: 'Vinhomes Central Park',
      district: 'Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      floors: 1,
      furniture: true,
      amenities: ['elevator', 'pool', 'gym', 'security', 'playground'],
    },
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/placeholder-property.jpg',
    },
    owner: {
      id: '7',
      name: 'Đặng Văn G',
      email: 'user7@example.com',
      phone: '0909147258',
    },
    ownerId: '7',
    views: 410,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    title: 'Đất nền khu dân cư Sadeco',
    description: 'Đất nền sổ hồng riêng, xây dựng tự do',
    type: 'land' as any,
    status: 'available' as any,
    transactionType: 'sell' as any,
    price: 4500000000,
    pricePerM2: 45000000,
    area: 100,
    location: {
      address: 'Khu dân cư Sadeco',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh',
    },
    features: {},
    media: {
      images: ['/public/batdongsan.jpg'],
      thumbnail: '/placeholder-property.jpg',
    },
    owner: {
      id: '8',
      name: 'Bùi Thị H',
      email: 'user8@example.com',
      phone: '0909369258',
    },
    ownerId: '8',
    views: 125,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default async function HomePage() {
  // In production, fetch from API
  // const properties = await propertyService.getFeaturedProperties(8);
  
  // For development, use mock data
  const properties = mockProperties;

  return (
    <div>
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Featured Properties */}
      <FeaturedProperties properties={properties} />

      {/* Additional Sections can be added here */}
      {/* - Property Types Section */}
      {/* - Why Choose Us Section */}
      {/* - Testimonials Section */}
      {/* - Latest News Section */}
      {/* - CTA Section */}
    </div>
  );
}

import mongoose, { Schema } from 'mongoose';

export interface IPackageDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  duration: number; // Số ngày
  features: {
    maxProperties: number; // Số tin đăng tối đa
    priorityLevel: number; // Mức độ ưu tiên (0-10)
    featuredListing: boolean; // Tin nổi bật
    hotListing: boolean; // Tin hot
    autoRenewal: boolean; // Tự động gia hạn
    highlightColor?: string; // Màu highlight
    badge?: string; // Nhãn đặc biệt
    showOnTop: boolean; // Hiển thị đầu trang
    socialMediaSharing: boolean; // Chia sẻ mạng xã hội
    analyticsAccess: boolean; // Truy cập thống kê
  };
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackageDocument>(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên gói'],
      trim: true,
      maxlength: [100, 'Tên gói không được quá 100 ký tự'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả'],
      maxlength: [500, 'Mô tả không được quá 500 ký tự'],
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá'],
      min: [0, 'Giá phải lớn hơn hoặc bằng 0'],
    },
    duration: {
      type: Number,
      required: [true, 'Vui lòng nhập thời hạn'],
      min: [1, 'Thời hạn phải lớn hơn 0'],
    },
    features: {
      maxProperties: {
        type: Number,
        required: true,
        min: 1,
      },
      priorityLevel: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
      },
      featuredListing: {
        type: Boolean,
        default: false,
      },
      hotListing: {
        type: Boolean,
        default: false,
      },
      autoRenewal: {
        type: Boolean,
        default: false,
      },
      highlightColor: {
        type: String,
      },
      badge: {
        type: String,
      },
      showOnTop: {
        type: Boolean,
        default: false,
      },
      socialMediaSharing: {
        type: Boolean,
        default: true,
      },
      analyticsAccess: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index để query
PackageSchema.index({ isActive: 1, displayOrder: 1 });
PackageSchema.index({ price: 1 });

export default mongoose.model<IPackageDocument>('Package', PackageSchema);

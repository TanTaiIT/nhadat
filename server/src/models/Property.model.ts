import mongoose, { Schema } from 'mongoose';
import { IPropertyDocument } from '../types';

const PropertySchema = new Schema<IPropertyDocument>(
  {
    title: {
      type: String,
      required: [true, 'Vui lòng nhập tiêu đề'],
      trim: true,
      maxlength: [200, 'Tiêu đề không được quá 200 ký tự'],
    },
    description: {
      type: String,
      required: [true, 'Vui lòng nhập mô tả'],
      maxlength: [2000, 'Mô tả không được quá 2000 ký tự'],
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá'],
      min: [0, 'Giá phải lớn hơn 0'],
    },
    area: {
      type: Number,
      required: [true, 'Vui lòng nhập diện tích'],
      min: [0, 'Diện tích phải lớn hơn 0'],
    },
    address: {
      street: {
        type: String,
        required: [true, 'Vui lòng nhập địa chỉ đường'],
      },
      ward: {
        type: String,
        required: [true, 'Vui lòng nhập phường/xã'],
      },
      district: {
        type: String,
        required: [true, 'Vui lòng nhập quận/huyện'],
      },
      city: {
        type: String,
        required: [true, 'Vui lòng nhập tỉnh/thành phố'],
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'land', 'villa', 'office', 'commercial', 'room'],
      required: [true, 'Vui lòng chọn loại bất động sản'],
    },
    listingType: {
      type: String,
      enum: ['sale', 'rent'],
      required: [true, 'Vui lòng chọn loại giao dịch'],
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented', 'pending', 'expired'],
      default: 'available',
    },
    priceNegotiable: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      enum: ['east', 'west', 'south', 'north', 'northeast', 'northwest', 'southeast', 'southwest'],
    },
    features: {
      bedrooms: {
        type: Number,
        min: 0,
      },
      bathrooms: {
        type: Number,
        min: 0,
      },
      floors: {
        type: Number,
        min: 0,
      },
      furniture: {
        type: String,
        enum: ['full', 'partial', 'none'],
        default: 'none',
      },
      parking: {
        type: Boolean,
        default: false,
      },
      balcony: {
        type: Boolean,
        default: false,
      },
      elevator: {
        type: Boolean,
        default: false,
      },
      frontWidth: {
        type: Number,
        min: 0,
      },
    },
    images: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return v.length >= 1;
        },
        message: 'Phải có ít nhất 1 hình ảnh',
      },
    },
    videoUrl: {
      type: String,
    },
    contactInfo: {
      phoneNumber: {
        type: String,
        required: true,
      },
      zaloNumber: {
        type: String,
      },
      showPhoneNumber: {
        type: Boolean,
        default: true,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    expiresAt: {
      type: Date,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create indexes for better query performance
PropertySchema.index({ title: 'text', description: 'text' });
PropertySchema.index({ 'address.city': 1, 'address.district': 1 });
PropertySchema.index({ type: 1, status: 1, listingType: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ area: 1 });
PropertySchema.index({ createdAt: -1 });
PropertySchema.index({ priority: -1, createdAt: -1 });
PropertySchema.index({ owner: 1, isActive: 1 });
PropertySchema.index({ direction: 1 });
PropertySchema.index({ 'features.bedrooms': 1 });
PropertySchema.index({ expiresAt: 1 });
PropertySchema.index({ isActive: 1, isVerified: 1 });

export default mongoose.model<IPropertyDocument>('Property', PropertySchema);

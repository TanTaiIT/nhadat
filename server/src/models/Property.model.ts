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
      enum: ['apartment', 'house', 'land', 'villa', 'office'],
      required: [true, 'Vui lòng chọn loại bất động sản'],
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented', 'pending'],
      default: 'available',
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
PropertySchema.index({ type: 1, status: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ createdAt: -1 });

export default mongoose.model<IPropertyDocument>('Property', PropertySchema);

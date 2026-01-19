import mongoose, { Schema } from 'mongoose';

export interface ISavedSearchDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  name: string;
  searchCriteria: {
    listingType?: 'sale' | 'rent';
    type?: string[];
    priceMin?: number;
    priceMax?: number;
    areaMin?: number;
    areaMax?: number;
    city?: string;
    district?: string;
    ward?: string;
    bedrooms?: number;
    bathrooms?: number;
    direction?: string[];
    furniture?: string;
    keywords?: string;
  };
  notificationEnabled: boolean;
  lastNotifiedAt?: Date;
  searchCount: number; // Số lần tìm kiếm
  createdAt: Date;
  updatedAt: Date;
}

const SavedSearchSchema = new Schema<ISavedSearchDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên tìm kiếm'],
      trim: true,
      maxlength: [100, 'Tên không được quá 100 ký tự'],
    },
    searchCriteria: {
      listingType: {
        type: String,
        enum: ['sale', 'rent'],
      },
      type: {
        type: [String],
      },
      priceMin: {
        type: Number,
        min: 0,
      },
      priceMax: {
        type: Number,
        min: 0,
      },
      areaMin: {
        type: Number,
        min: 0,
      },
      areaMax: {
        type: Number,
        min: 0,
      },
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      ward: {
        type: String,
      },
      bedrooms: {
        type: Number,
        min: 0,
      },
      bathrooms: {
        type: Number,
        min: 0,
      },
      direction: {
        type: [String],
      },
      furniture: {
        type: String,
      },
      keywords: {
        type: String,
      },
    },
    notificationEnabled: {
      type: Boolean,
      default: true,
    },
    lastNotifiedAt: {
      type: Date,
    },
    searchCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index để query
SavedSearchSchema.index({ user: 1, createdAt: -1 });
SavedSearchSchema.index({ user: 1, notificationEnabled: 1 });

export default mongoose.model<ISavedSearchDocument>('SavedSearch', SavedSearchSchema);

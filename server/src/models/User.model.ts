import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../types';

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      trim: true,
      maxlength: [50, 'Tên không được quá 50 ký tự'],
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không hợp lệ',
      ],
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
      select: false, // Don't return password by default
    },
    phone: {
      type: String,
      match: [/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'],
    },
    zaloNumber: {
      type: String,
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    address: {
      street: String,
      ward: String,
      district: String,
      city: String,
    },
    bio: {
      type: String,
      maxlength: [500, 'Giới thiệu không được quá 500 ký tự'],
    },
    role: {
      type: String,
      enum: ['user', 'agent', 'admin'],
      default: 'user',
    },
    // Thông tin cho Agent/Môi giới
    agentInfo: {
      companyName: String,
      businessLicense: String,
      taxCode: String,
      website: String,
      yearsOfExperience: {
        type: Number,
        min: 0,
      },
      specializations: [String], // Chuyên về loại BĐS nào
      serviceAreas: [String], // Khu vực phục vụ
    },
    // Xác thực thông tin
    verification: {
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
      isPhoneVerified: {
        type: Boolean,
        default: false,
      },
      isIdentityVerified: {
        type: Boolean,
        default: false,
      },
      identityDocument: String, // CCCD/CMND
      identityDocumentImages: [String],
      verifiedAt: Date,
      verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    // Thống kê
    statistics: {
      totalProperties: {
        type: Number,
        default: 0,
      },
      totalViews: {
        type: Number,
        default: 0,
      },
      totalContacts: {
        type: Number,
        default: 0,
      },
      successfulDeals: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      reviewCount: {
        type: Number,
        default: 0,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT Token
UserSchema.methods.getSignedJwtToken = function (): string {
  const secret = process.env.JWT_SECRET || 'default-secret';
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  
  return jwt.sign(
    { id: this._id.toString(), email: this.email, role: this.role },
    secret,
    { expiresIn } as jwt.SignOptions
  ) as string;
};

// Generate Refresh Token
UserSchema.methods.getRefreshToken = function (): string {
  const secret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';
  const expiresIn = process.env.JWT_REFRESH_EXPIRE || '30d';
  
  return jwt.sign(
    { id: this._id.toString() },
    secret,
    { expiresIn } as jwt.SignOptions
  ) as string;
};

// Virtual for user's properties
UserSchema.virtual('properties', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'owner',
  justOne: false,
});

// Virtual for user's favorites
UserSchema.virtual('favorites', {
  ref: 'Favorite',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

// Virtual for user's subscriptions
UserSchema.virtual('subscriptions', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

// Indexes
UserSchema.index({ role: 1, isActive: 1 });
UserSchema.index({ 'address.city': 1, 'address.district': 1 });
UserSchema.index({ 'verification.isIdentityVerified': 1 });
UserSchema.index({ 'statistics.rating': -1 });

export default mongoose.model<IUserDocument>('User', UserSchema);

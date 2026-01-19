import { Request } from 'express';
import { Document } from 'mongoose';

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: IUserDocument;
}

// User Interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  zaloNumber?: string;
  avatar?: string;
  address?: {
    street?: string;
    ward?: string;
    district?: string;
    city?: string;
  };
  bio?: string;
  role: 'user' | 'agent' | 'admin';
  agentInfo?: {
    companyName?: string;
    businessLicense?: string;
    taxCode?: string;
    website?: string;
    yearsOfExperience?: number;
    specializations?: string[];
    serviceAreas?: string[];
  };
  verification?: {
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    isIdentityVerified?: boolean;
    identityDocument?: string;
    identityDocumentImages?: string[];
    verifiedAt?: Date;
    verifiedBy?: string;
  };
  statistics?: {
    totalProperties?: number;
    totalViews?: number;
    totalContacts?: number;
    successfulDeals?: number;
    rating?: number;
    reviewCount?: number;
  };
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  getRefreshToken(): string;
}

// Property Interface
export interface IProperty {
  title: string;
  description: string;
  price: number;
  priceNegotiable: boolean;
  area: number;
  address: {
    street: string;
    ward: string;
    district: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  type: 'apartment' | 'house' | 'land' | 'villa' | 'office' | 'commercial' | 'room';
  listingType: 'sale' | 'rent';
  status: 'available' | 'sold' | 'rented' | 'pending' | 'expired';
  direction?: 'east' | 'west' | 'south' | 'north' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  features: {
    bedrooms?: number;
    bathrooms?: number;
    floors?: number;
    furniture?: 'full' | 'partial' | 'none';
    parking?: boolean;
    balcony?: boolean;
    elevator?: boolean;
    frontWidth?: number;
  };
  images: string[];
  videoUrl?: string;
  contactInfo: {
    phoneNumber: string;
    zaloNumber?: string;
    showPhoneNumber?: boolean;
  };
  owner: any; // User ID (can be string or ObjectId)
  views: number;
  priority: number;
  expiresAt?: Date;
  verifiedBy?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPropertyDocument extends IProperty, Document {}

// API Response Interface
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
}

// Pagination Interface
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

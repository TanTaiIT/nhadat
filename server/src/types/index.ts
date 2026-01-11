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
  avatar?: string;
  role: 'user' | 'agent' | 'admin';
  isVerified: boolean;
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
  type: 'apartment' | 'house' | 'land' | 'villa' | 'office';
  status: 'available' | 'sold' | 'rented' | 'pending';
  features: {
    bedrooms?: number;
    bathrooms?: number;
    floors?: number;
    furniture?: 'full' | 'partial' | 'none';
    parking?: boolean;
    balcony?: boolean;
    elevator?: boolean;
  };
  images: string[];
  owner: string; // User ID
  views: number;
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

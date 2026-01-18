/**
 * Admin-specific types
 */

// Dashboard Types
export interface DashboardStats {
  totalProperties: number;
  totalUsers: number;
  totalViews: number;
  totalRevenue: number;
  propertiesChange: number;
  usersChange: number;
  viewsChange: number;
  revenueChange: number;
}

export interface Activity {
  id: string;
  type: 'property_created' | 'property_updated' | 'user_registered' | 'property_sold';
  description: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Analytics Types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year';
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface PropertyViewsAnalytics {
  propertyId?: string;
  totalViews: number;
  uniqueViews: number;
  viewsByDate: {
    date: string;
    views: number;
  }[];
  viewsBySource: {
    source: string;
    count: number;
  }[];
}

export interface UserGrowthAnalytics {
  totalUsers: number;
  newUsersThisMonth: number;
  usersByRole: {
    role: string;
    count: number;
  }[];
  usersByStatus: {
    status: string;
    count: number;
  }[];
  growthByMonth: {
    month: string;
    count: number;
  }[];
}

// Settings Types
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maxFileUploadSize: number; // in MB
  allowedFileTypes: string[];
  itemsPerPage: number;
  currency: string;
  language: string;
  timezone: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    ogImage?: string;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  payment: {
    enabled: boolean;
    providers: {
      name: string;
      enabled: boolean;
      credentials: Record<string, string>;
    }[];
  };
}

// Report Types
export interface ReportConfig {
  type: 'properties' | 'users' | 'revenue' | 'custom';
  startDate: Date;
  endDate: Date;
  filters?: Record<string, any>;
  groupBy?: 'day' | 'week' | 'month';
  includeCharts?: boolean;
}

export interface ReportData {
  id: string;
  type: string;
  generatedAt: Date;
  generatedBy: {
    id: string;
    name: string;
  };
  config: ReportConfig;
  data: any;
  summary: {
    total: number;
    average: number;
    min: number;
    max: number;
  };
}

// Notification Types
export interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
  metadata?: Record<string, any>;
}

// Audit Log Types
export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// Bulk Operation Types
export interface BulkOperation {
  action: 'delete' | 'update' | 'approve' | 'reject' | 'feature';
  ids: string[];
  data?: Record<string, any>;
}

export interface BulkOperationResult {
  success: number;
  failed: number;
  errors: {
    id: string;
    error: string;
  }[];
}

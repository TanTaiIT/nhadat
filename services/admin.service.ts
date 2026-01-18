import { apiClient } from './api.service';
import type { 
  Property, 
  PropertyListResponse, 
  PropertyStats,
  User,
  UserListResponse,
  UserFilter,
  PropertyFilter 
} from '@/types';

/**
 * Admin Service
 * Handles all admin-related API calls
 */
class AdminService {
  // ==================== Dashboard ====================
  
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<PropertyStats> {
    const response = await apiClient.get<PropertyStats>('/admin/dashboard/stats');
    return response.data;
  }

  /**
   * Get recent activities
   */
  async getRecentActivities(limit: number = 10) {
    const response = await apiClient.get('/admin/dashboard/activities', {
      params: { limit }
    });
    return response.data;
  }

  // ==================== Properties Management ====================
  
  /**
   * Get all properties with filters (Admin view)
   */
  async getProperties(filters?: PropertyFilter): Promise<PropertyListResponse> {
    const response = await apiClient.get<PropertyListResponse>('/admin/properties', {
      params: filters
    });
    return response.data;
  }

  /**
   * Get property by ID (Admin view with full details)
   */
  async getPropertyById(id: string): Promise<Property> {
    const response = await apiClient.get<{ data: Property }>(`/admin/properties/${id}`);
    return response.data.data;
  }

  /**
   * Update property
   */
  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    const response = await apiClient.put<{ data: Property }>(`/admin/properties/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete property
   */
  async deleteProperty(id: string): Promise<void> {
    await apiClient.delete(`/admin/properties/${id}`);
  }

  /**
   * Approve property (change status to available)
   */
  async approveProperty(id: string): Promise<Property> {
    const response = await apiClient.post<{ data: Property }>(`/admin/properties/${id}/approve`);
    return response.data.data;
  }

  /**
   * Reject property
   */
  async rejectProperty(id: string, reason: string): Promise<Property> {
    const response = await apiClient.post<{ data: Property }>(`/admin/properties/${id}/reject`, {
      reason
    });
    return response.data.data;
  }

  /**
   * Feature property (make it featured)
   */
  async featureProperty(id: string, featuredUntil: Date): Promise<Property> {
    const response = await apiClient.post<{ data: Property }>(`/admin/properties/${id}/feature`, {
      featuredUntil
    });
    return response.data.data;
  }

  // ==================== Users Management ====================
  
  /**
   * Get all users with filters
   */
  async getUsers(filters?: UserFilter): Promise<UserListResponse> {
    const response = await apiClient.get<UserListResponse>('/admin/users', {
      params: filters
    });
    return response.data;
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<{ data: User }>(`/admin/users/${id}`);
    return response.data.data;
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await apiClient.put<{ data: User }>(`/admin/users/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  }

  /**
   * Block user
   */
  async blockUser(id: string, reason: string): Promise<User> {
    const response = await apiClient.post<{ data: User }>(`/admin/users/${id}/block`, {
      reason
    });
    return response.data.data;
  }

  /**
   * Unblock user
   */
  async unblockUser(id: string): Promise<User> {
    const response = await apiClient.post<{ data: User }>(`/admin/users/${id}/unblock`);
    return response.data.data;
  }

  /**
   * Change user role
   */
  async changeUserRole(id: string, role: 'user' | 'agent' | 'admin'): Promise<User> {
    const response = await apiClient.post<{ data: User }>(`/admin/users/${id}/role`, {
      role
    });
    return response.data.data;
  }

  // ==================== Analytics ====================
  
  /**
   * Get analytics data
   */
  async getAnalytics(period: 'day' | 'week' | 'month' | 'year') {
    const response = await apiClient.get('/admin/analytics', {
      params: { period }
    });
    return response.data;
  }

  /**
   * Get property views analytics
   */
  async getPropertyViewsAnalytics(propertyId?: string) {
    const response = await apiClient.get('/admin/analytics/property-views', {
      params: { propertyId }
    });
    return response.data;
  }

  /**
   * Get user growth analytics
   */
  async getUserGrowthAnalytics() {
    const response = await apiClient.get('/admin/analytics/user-growth');
    return response.data;
  }

  // ==================== Settings ====================
  
  /**
   * Get site settings
   */
  async getSettings() {
    const response = await apiClient.get('/admin/settings');
    return response.data;
  }

  /**
   * Update site settings
   */
  async updateSettings(settings: Record<string, any>) {
    const response = await apiClient.put('/admin/settings', settings);
    return response.data;
  }

  // ==================== Reports ====================
  
  /**
   * Generate report
   */
  async generateReport(type: 'properties' | 'users' | 'revenue', params?: any) {
    const response = await apiClient.post('/admin/reports/generate', {
      type,
      ...params
    });
    return response.data;
  }

  /**
   * Export data
   */
  async exportData(type: 'properties' | 'users', format: 'csv' | 'xlsx' | 'pdf') {
    const response = await apiClient.get('/admin/export', {
      params: { type, format },
      responseType: 'blob'
    });
    return response.data;
  }
}

export const adminService = new AdminService();

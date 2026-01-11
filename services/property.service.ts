import { apiConfig } from '@/config/site';
import type {
  Property,
  PropertyFilter,
  PropertySearchParams,
  PropertyListResponse,
  PropertyDetailResponse,
  PropertyFormData,
  PropertyStats,
  ApiResponse,
} from '@/types';

// Base API client
class PropertyService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
  }

  /**
   * Get all properties with filters and pagination
   */
  async getProperties(params: PropertySearchParams = {}): Promise<PropertyListResponse> {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${this.baseUrl}/api/properties?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enable caching
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    return response.json();
  }

  /**
   * Get featured properties
   */
  async getFeaturedProperties(limit: number = 8): Promise<Property[]> {
    const response = await fetch(`${this.baseUrl}/api/properties/featured?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured properties');
    }

    const data: ApiResponse<Property[]> = await response.json();
    return data.data || [];
  }

  /**
   * Get property by ID
   */
  async getPropertyById(id: string): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/api/properties/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    const data: PropertyDetailResponse = await response.json();
    return data.data;
  }

  /**
   * Search properties
   */
  async searchProperties(query: string, filters?: PropertyFilter): Promise<PropertyListResponse> {
    return this.getProperties({
      q: query,
      ...filters,
    });
  }

  /**
   * Create property (authenticated)
   */
  async createProperty(data: PropertyFormData, token: string): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/api/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create property');
    }

    const result: ApiResponse<Property> = await response.json();
    return result.data!;
  }

  /**
   * Update property (authenticated)
   */
  async updateProperty(id: string, data: Partial<PropertyFormData>, token: string): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/api/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update property');
    }

    const result: ApiResponse<Property> = await response.json();
    return result.data!;
  }

  /**
   * Delete property (authenticated)
   */
  async deleteProperty(id: string, token: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete property');
    }
  }

  /**
   * Get my properties (authenticated)
   */
  async getMyProperties(params: PropertySearchParams, token: string): Promise<PropertyListResponse> {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${this.baseUrl}/api/properties/my?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch my properties');
    }

    return response.json();
  }

  /**
   * Get property stats
   */
  async getPropertyStats(): Promise<PropertyStats> {
    const response = await fetch(`${this.baseUrl}/api/properties/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch property stats');
    }

    const data: ApiResponse<PropertyStats> = await response.json();
    return data.data!;
  }

  /**
   * Get similar properties
   */
  async getSimilarProperties(propertyId: string, limit: number = 4): Promise<Property[]> {
    const response = await fetch(
      `${this.baseUrl}/api/properties/${propertyId}/similar?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch similar properties');
    }

    const data: ApiResponse<Property[]> = await response.json();
    return data.data || [];
  }
}

// Export singleton instance
export const propertyService = new PropertyService();

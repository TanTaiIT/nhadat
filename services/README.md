# Services

Thư mục này chứa các service layer để tương tác với APIs và external services.

## Cấu trúc

```
services/
├── api.service.ts       # Base API service
├── auth.service.ts      # Authentication services
├── user.service.ts      # User-related services
├── property.service.ts  # Property services
└── upload.service.ts    # File upload services
```

## Quy tắc

1. **Separation of Concerns**: Tách biệt API logic khỏi components
2. **Error Handling**: Xử lý errors một cách nhất quán
3. **Type Safety**: Sử dụng TypeScript types cho requests/responses
4. **Reusability**: Tạo base service để tái sử dụng

## Ví dụ

### auth.service.ts
```typescript
import { apiService } from './api.service';
import type { User, ApiResponse } from '@/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    return apiService.post<User>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<ApiResponse<User>> {
    return apiService.post<User>('/auth/register', data);
  },

  async logout(): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/logout');
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/me');
  },
};
```

### property.service.ts
```typescript
import { apiService } from './api.service';
import type { Property, PaginatedResponse, PaginationParams } from '@/types';

interface CreatePropertyData {
  title: string;
  description: string;
  price: number;
  area: number;
  address: string;
}

export const propertyService = {
  async getProperties(
    params: PaginationParams
  ): Promise<PaginatedResponse<Property>> {
    const queryString = new URLSearchParams(params as any).toString();
    const response = await apiService.get<PaginatedResponse<Property>>(
      `/properties?${queryString}`
    );
    return response.data!;
  },

  async getPropertyById(id: string): Promise<Property> {
    const response = await apiService.get<Property>(`/properties/${id}`);
    return response.data!;
  },

  async createProperty(data: CreatePropertyData): Promise<Property> {
    const response = await apiService.post<Property>('/properties', data);
    return response.data!;
  },

  async updateProperty(id: string, data: Partial<CreatePropertyData>): Promise<Property> {
    const response = await apiService.put<Property>(`/properties/${id}`, data);
    return response.data!;
  },

  async deleteProperty(id: string): Promise<void> {
    await apiService.delete(`/properties/${id}`);
  },
};
```

## Sử dụng trong Components

```typescript
'use client';

import { useState, useEffect } from 'react';
import { propertyService } from '@/services/property.service';
import type { Property } from '@/types';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await propertyService.getProperties({
          page: 1,
          limit: 10,
        });
        setProperties(data.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // ... render
}
```

## Best Practices

1. **Error Handling**: Luôn wrap API calls trong try-catch
2. **Loading States**: Quản lý loading states cho UX tốt hơn
3. **Type Safety**: Define interfaces cho request/response
4. **Caching**: Consider caching với React Query hoặc SWR
5. **Authentication**: Tự động thêm auth tokens vào requests

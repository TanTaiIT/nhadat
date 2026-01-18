'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '@/services/property.service';
import type { Property } from '@/types';

// Query Keys
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters?: any) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
  featured: () => [...propertyKeys.all, 'featured'] as const,
  search: (query: string) => [...propertyKeys.all, 'search', query] as const,
};

/**
 * Hook to get all properties with optional filters
 */
export function useProperties(filters?: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: async () => {
      // Call API service - you'll need to implement this
      // For now, return empty array
      return [];
    },
  });
}

/**
 * Hook to get a single property
 */
export function useProperty(id: string) {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: async () => {
      // Call API service
      return null;
    },
    enabled: !!id,
  });
}

/**
 * Hook to get featured properties
 */
export function useFeaturedProperties(limit: number = 6) {
  return useQuery({
    queryKey: propertyKeys.featured(),
    queryFn: async () => {
      // Call API service
      return [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to search properties
 */
export function useSearchProperties(searchQuery: string) {
  return useQuery({
    queryKey: propertyKeys.search(searchQuery),
    queryFn: async () => {
      if (!searchQuery) return [];
      // Call API service
      return [];
    },
    enabled: !!searchQuery && searchQuery.length > 2,
  });
}

/**
 * Hook to create property
 */
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyData: Partial<Property>) => {
      // Call API service
      return propertyData;
    },
    onSuccess: () => {
      // Invalidate properties list
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}

/**
 * Hook to update property
 */
export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Property> }) => {
      // Call API service
      return data;
    },
    onSuccess: (_, variables) => {
      // Invalidate specific property and list
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}

/**
 * Hook to delete property
 */
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Call API service
      return id;
    },
    onSuccess: () => {
      // Invalidate properties list
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}

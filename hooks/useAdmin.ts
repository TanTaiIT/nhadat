import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import type { 
  Property, 
  PropertyListResponse,
  PropertyStats,
  User,
  UserListResponse,
  PropertyFilter,
  UserFilter 
} from '@/types';

/**
 * Hook for admin dashboard stats
 */
export function useAdminStats() {
  const [stats, setStats] = useState<PropertyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

/**
 * Hook for managing properties in admin
 */
export function useAdminProperties(filters?: PropertyFilter) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await adminService.getProperties(filters);
      setProperties(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const deleteProperty = async (id: string) => {
    try {
      await adminService.deleteProperty(id);
      await fetchProperties(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete property');
    }
  };

  const approveProperty = async (id: string) => {
    try {
      await adminService.approveProperty(id);
      await fetchProperties(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to approve property');
    }
  };

  const rejectProperty = async (id: string, reason: string) => {
    try {
      await adminService.rejectProperty(id, reason);
      await fetchProperties(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to reject property');
    }
  };

  return {
    properties,
    pagination,
    loading,
    error,
    refetch: fetchProperties,
    deleteProperty,
    approveProperty,
    rejectProperty,
  };
}

/**
 * Hook for managing users in admin
 */
export function useAdminUsers(filters?: UserFilter) {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(filters);
      setUsers(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const deleteUser = async (id: string) => {
    try {
      await adminService.deleteUser(id);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const blockUser = async (id: string, reason: string) => {
    try {
      await adminService.blockUser(id, reason);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to block user');
    }
  };

  const unblockUser = async (id: string) => {
    try {
      await adminService.unblockUser(id);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to unblock user');
    }
  };

  const changeUserRole = async (id: string, role: 'user' | 'agent' | 'admin') => {
    try {
      await adminService.changeUserRole(id, role);
      await fetchUsers(); // Refresh list
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to change user role');
    }
  };

  return {
    users,
    pagination,
    loading,
    error,
    refetch: fetchUsers,
    deleteUser,
    blockUser,
    unblockUser,
    changeUserRole,
  };
}

/**
 * Hook for admin analytics
 */
export function useAdminAnalytics(period: 'day' | 'week' | 'month' | 'year' = 'week') {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await adminService.getAnalytics(period);
        setAnalytics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  return { analytics, loading, error };
}

'use client';

import React from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { RecentProperties } from '@/components/admin/RecentProperties';
import { RecentUsers } from '@/components/admin/RecentUsers';
import { ActivityChart } from '@/components/admin/ActivityChart';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Tổng quan hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng BĐS"
          value="1,234"
          change="+12.5%"
          changeType="increase"
          icon="building"
        />
        <StatsCard
          title="Người dùng"
          value="856"
          change="+8.2%"
          changeType="increase"
          icon="users"
        />
        <StatsCard
          title="Đang bán"
          value="432"
          change="-3.1%"
          changeType="decrease"
          icon="tag"
        />
        <StatsCard
          title="Lượt xem"
          value="45.2K"
          change="+15.3%"
          changeType="increase"
          icon="eye"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProperties />
        <RecentUsers />
      </div>
    </div>
  );
}

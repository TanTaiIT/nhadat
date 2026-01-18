'use client';

import React, { useState } from 'react';
import { PropertyTable } from '@/components/admin/PropertyTable';
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function AdminPropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Bất Động Sản</h1>
          <p className="text-gray-600 mt-1">Quản lý tất cả tin đăng bất động sản</p>
        </div>
        <Link href="/admin/properties/create">
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm BĐS
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề, địa chỉ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Tất cả trạng thái</option>
            <option value="available">Đang bán/cho thuê</option>
            <option value="sold">Đã bán</option>
            <option value="rented">Đã cho thuê</option>
            <option value="pending">Chờ duyệt</option>
            <option value="draft">Bản nháp</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Tất cả loại</option>
            <option value="apartment">Căn hộ</option>
            <option value="house">Nhà riêng</option>
            <option value="villa">Biệt thự</option>
            <option value="land">Đất nền</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <PropertyTable searchQuery={searchQuery} />
    </div>
  );
}

'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn Hàng</h1>
        <p className="text-gray-600 mt-1">Quản lý các giao dịch và đơn hàng</p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đang phát triển</h2>
          <p className="text-gray-600 mb-6">
            Tính năng quản lý đơn hàng đang được phát triển và sẽ sớm ra mắt.
          </p>
          <Button variant="outline">
            Quay lại Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

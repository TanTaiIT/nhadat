'use client';

import React from 'react';
import Link from 'next/link';

const recentProperties = [
  {
    id: '1',
    title: 'Căn hộ studio đầy đủ tiện nghi',
    status: 'available',
    price: '8 triệu',
    time: '2 giờ trước',
  },
  {
    id: '2',
    title: 'Nhà mặt tiền Phan Văn Trị',
    status: 'pending',
    price: '18.00 tỷ',
    time: '5 giờ trước',
  },
  {
    id: '3',
    title: 'Căn hộ Vinhomes Central Park',
    status: 'available',
    price: '25 triệu',
    time: '1 ngày trước',
  },
];

const statusColors: Record<string, string> = {
  available: 'text-green-600',
  pending: 'text-yellow-600',
  sold: 'text-gray-600',
};

export function RecentProperties() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Tin đăng gần đây</h3>
        <Link href="/admin/properties" className="text-sm text-blue-600 hover:text-blue-700">
          Xem tất cả
        </Link>
      </div>
      <div className="space-y-4">
        {recentProperties.map((property) => (
          <div key={property.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
              <p className="text-sm text-gray-500">{property.time}</p>
            </div>
            <div className="ml-4 text-right">
              <p className="text-sm font-semibold text-gray-900">{property.price}</p>
              <p className={`text-xs ${statusColors[property.status]}`}>
                {property.status === 'available' ? 'Đang bán' : 'Chờ duyệt'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

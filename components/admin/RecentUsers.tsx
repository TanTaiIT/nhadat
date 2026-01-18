'use client';

import React from 'react';
import Link from 'next/link';

const recentUsers = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'Người dùng',
    time: '1 giờ trước',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'Môi giới',
    time: '3 giờ trước',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'Người dùng',
    time: '5 giờ trước',
  },
];

export function RecentUsers() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Người dùng mới</h3>
        <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700">
          Xem tất cả
        </Link>
      </div>
      <div className="space-y-4">
        {recentUsers.map((user) => (
          <div key={user.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">{user.name.charAt(0)}</span>
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
            <div className="ml-4 text-right">
              <p className="text-xs text-blue-600 font-medium">{user.role}</p>
              <p className="text-xs text-gray-500">{user.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

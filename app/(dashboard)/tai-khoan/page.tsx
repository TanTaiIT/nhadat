'use client';

import React, { useState } from 'react';
import { ProfileForm } from '@/components/dashboard';
import { cn } from '@/lib/utils';

type TabType = 'edit' | 'security';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('edit');

  const tabs = [
    { id: 'edit' as TabType, label: 'Chỉnh sửa thông tin' },
    // { id: 'security' as TabType, label: 'Bảo mật' }, // Uncomment when implementing
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý tài khoản</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'edit' && <ProfileForm />}
        {activeTab === 'security' && (
          <div className="text-center py-12 text-gray-500">
            Tính năng bảo mật sẽ được triển khai sau
          </div>
        )}
      </div>
    </div>
  );
}

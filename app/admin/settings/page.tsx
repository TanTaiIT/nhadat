'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-600 mt-1">Cấu hình hệ thống</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
              Cài đặt chung
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
              Email & Thông báo
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
              Thanh toán
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
              Bảo mật
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
              API & Integrations
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt chung</h2>
            
            <div className="space-y-6">
              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên website
                </label>
                <input
                  type="text"
                  defaultValue="Nhà Đất"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Site Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả website
                </label>
                <textarea
                  rows={3}
                  defaultValue="Nền tảng mua bán cho thuê bất động sản hàng đầu Việt Nam"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email liên hệ
                </label>
                <input
                  type="email"
                  defaultValue="contact@nhadat.vn"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  defaultValue="1900 xxxx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Maintenance Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chế độ bảo trì
                  </label>
                  <p className="text-sm text-gray-500">Tạm ngưng truy cập website</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button>
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

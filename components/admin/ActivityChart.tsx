'use client';

import React from 'react';

export function ActivityChart() {
  // Mock data for demonstration
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const data = [45, 52, 38, 65, 72, 58, 42];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Hoạt động trong tuần</h3>
          <p className="text-sm text-gray-500 mt-1">Số lượng tin đăng mới theo ngày</p>
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
          <option>3 tháng qua</option>
        </select>
      </div>

      {/* Simple Bar Chart */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-around">
          {data.map((value, index) => {
            const height = (value / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center w-full">
                <div className="relative w-full px-2 flex items-end justify-center h-full">
                  <div
                    className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all cursor-pointer relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {value} tin đăng
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-around mt-4 border-t border-gray-200 pt-4">
        {days.map((day, index) => (
          <div key={index} className="text-sm text-gray-600 text-center flex-1">
            {day}
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">372</p>
          <p className="text-sm text-gray-500 mt-1">Tổng tin đăng</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">+53</p>
          <p className="text-sm text-gray-500 mt-1">Tuần này</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">8.2%</p>
          <p className="text-sm text-gray-500 mt-1">Tăng trưởng</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import { Button, Input, Select } from '@/components/ui';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/slices/authSlice';

// Vietnam provinces data (simplified - you can expand this)
const provinces = [
  { value: '', label: '-- Vui lòng chọn --' },
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'danang', label: 'Đà Nẵng' },
  { value: 'haiphong', label: 'Hải Phòng' },
  { value: 'cantho', label: 'Cần Thơ' },
  // Add more provinces as needed
];

const districts: Record<string, { value: string; label: string }[]> = {
  hanoi: [
    { value: '', label: '-- Vui lòng chọn --' },
    { value: 'ba-dinh', label: 'Ba Đình' },
    { value: 'hoan-kiem', label: 'Hoàn Kiếm' },
    { value: 'dong-da', label: 'Đống Đa' },
    { value: 'hai-ba-trung', label: 'Hai Bà Trưng' },
    { value: 'cau-giay', label: 'Cầu Giấy' },
  ],
  hcm: [
    { value: '', label: '-- Vui lòng chọn --' },
    { value: 'quan-1', label: 'Quận 1' },
    { value: 'quan-2', label: 'Quận 2' },
    { value: 'quan-3', label: 'Quận 3' },
    { value: 'binh-thanh', label: 'Bình Thạnh' },
    { value: 'phu-nhuan', label: 'Phú Nhuận' },
  ],
  // Add more as needed
};

interface ProfileFormData {
  fullName: string;
  taxCode: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  address: string;
  avatar: string | null;
}

export function ProfileForm() {
  const user = useAppSelector(selectUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: user?.profile?.fullName || '',
    taxCode: '',
    phone: '',
    email: user?.email || '',
    province: '',
    district: '',
    address: '',
    avatar: user?.profile?.avatar || null,
  });

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(formData.avatar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset district when province changes
      ...(name === 'province' ? { district: '' } : {}),
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyPhone = () => {
    // TODO: Implement phone verification
    alert('Tính năng xác thực số điện thoại sẽ được triển khai sau');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Call API to update profile
      console.log('Submitting form data:', formData);
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Phone verification warning */}
      {!isPhoneVerified && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-700 font-medium">
            Thông tin cá nhân{' '}
            <span className="text-red-600">(Tài khoản chưa xác thực số điện thoại)</span>
          </p>
        </div>
      )}

      {/* Avatar Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div
            onClick={handleAvatarClick}
            className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 cursor-pointer border-4 border-white shadow-lg"
          >
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        {/* Tax Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã số thuế cá nhân
          </label>
          <Input
            name="taxCode"
            value={formData.taxCode}
            onChange={handleChange}
            placeholder="Ví dụ: 232434222212"
          />
          <p className="text-xs text-gray-500 mt-1">MST gồm 10 hoặc 13 chữ số</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-red-500 mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              required
              className="flex-1"
            />
            <button
              type="button"
              onClick={handleVerifyPhone}
              className="text-red-500 hover:text-red-600 text-sm font-medium whitespace-nowrap"
            >
              Xác thực
            </button>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-red-500 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
            required
          />
        </div>

        {/* Province */}
        <div>
          <label className="block text-sm font-medium text-red-500 mb-1">
            Tỉnh/ Thành phố <span className="text-red-500">*</span>
          </label>
          <Select
            name="province"
            value={formData.province}
            onChange={handleChange}
            options={provinces}
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-red-500 mb-1">
            Phường/ Xã <span className="text-red-500">*</span>
          </label>
          <Select
            name="district"
            value={formData.district}
            onChange={handleChange}
            options={
              formData.province && districts[formData.province]
                ? districts[formData.province]
                : [{ value: '', label: '-- Vui lòng chọn --' }]
            }
            required
            disabled={!formData.province}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Địa chỉ
        </label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </form>
  );
}

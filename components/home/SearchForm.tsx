'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select } from '@/components/ui';
import {
  PROPERTY_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
  PRICE_RANGES_SELL,
  PRICE_RANGES_RENT,
  AREA_RANGES,
} from '@/constants';
import { TransactionType } from '@/types';

export function SearchForm() {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.SELL);
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    district: '',
    priceRange: '',
    areaRange: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query params
    const params = new URLSearchParams();
    params.set('transactionType', transactionType);
    
    if (filters.type) params.set('type', filters.type);
    if (filters.city) params.set('city', filters.city);
    if (filters.district) params.set('district', filters.district);
    if (filters.priceRange) params.set('priceRange', filters.priceRange);
    if (filters.areaRange) params.set('areaRange', filters.areaRange);
    
    router.push(`/bat-dong-san?${params.toString()}`);
  };

  const priceRanges = transactionType === TransactionType.SELL ? PRICE_RANGES_SELL : PRICE_RANGES_RENT;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-black">
      {/* Transaction Type Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTransactionType(TransactionType.SELL)}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            transactionType === TransactionType.SELL
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Mua
        </button>
        <button
          type="button"
          onClick={() => setTransactionType(TransactionType.RENT)}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
            transactionType === TransactionType.RENT
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Thuê
        </button>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Row 1: Property Type & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            options={PROPERTY_TYPE_OPTIONS}
            placeholder="Loại hình"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          />
          
          <Input
            placeholder="Khu vực (Quận, Thành phố...)"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />
        </div>

        {/* Row 2: Price & Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            options={priceRanges.map(range => ({
              label: range.label,
              value: `${range.min}-${range.max}`
            }))}
            placeholder="Mức giá"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          />
          
          <Select
            options={AREA_RANGES.map(range => ({
              label: range.label,
              value: `${range.min}-${range.max}`
            }))}
            placeholder="Diện tích"
            value={filters.areaRange}
            onChange={(e) => setFilters({ ...filters, areaRange: e.target.value })}
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          rightIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        >
          Tìm kiếm
        </Button>
      </form>
    </div>
  );
}

import React from 'react';
import { SearchForm } from './SearchForm';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Tìm Ngôi Nhà Mơ Ước
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Khám phá hàng ngàn bất động sản chất lượng với giá tốt nhất
            </p>
          </div>

          {/* Search Form */}
          <SearchForm />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm md:text-base text-white/80">Bất động sản</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">5K+</div>
              <div className="text-sm md:text-base text-white/80">Khách hàng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
              <div className="text-sm md:text-base text-white/80">Dự án</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
              <div className="text-sm md:text-base text-white/80">Môi giới</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

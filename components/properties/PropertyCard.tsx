import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { formatPrice, formatArea } from '@/lib/utils';
import { Card, Button } from '@/components/ui';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.media.thumbnail || property.media.images[0] || '/placeholder-property.jpg';

  return (
    <Link href={`/bat-dong-san/${property.id}`}>
      <Card hover className="overflow-hidden group cursor-pointer">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {property.transactionType === 'sell' ? 'Bán' : 'Cho thuê'}
            </span>
            {property.features.furniture && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Nội thất
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
            // onClick={(e) => {
            //   e.preventDefault();
            //   // Handle favorite
            // }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-2">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </span>
            {property.pricePerM2 && (
              <span className="text-sm text-gray-500 ml-2">
                ({formatPrice(property.pricePerM2)}/m²)
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">
              {property.location.district}, {property.location.city}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>{formatArea(property.area)}</span>
            </div>
            
            {property.features.bedrooms && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{property.features.bedrooms} PN</span>
              </div>
            )}
            
            {property.features.bathrooms && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{property.features.bathrooms} WC</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">
                  {property.owner.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600">{property.owner.name}</span>
            </div>
            
            {property.views && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{property.views}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

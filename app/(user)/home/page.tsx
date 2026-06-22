'use client';
import { ChevronDown, MapPin, Navigation, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { LocationPickerModal } from '@/components/pages/home/LocationPickerModal';
import { MOCK_BARBERS } from '@/constants';
import { useLocationStore } from '@/store/useLocationStore';

export default function Home() {
  const { provinceName, cityName } = useLocationStore();

  const bannerImages = [
    'https://images.unsplash.com/photo-1503951914875-befbb7135952?w=800&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80',
  ];
  const [showLocationModal, setShowLocationModal] = useState(false);

  const locationDisplayName = cityName
    ? `${cityName}، ${provinceName}`
    : 'انتخاب شهر';

  const displayedBarbers = MOCK_BARBERS.filter(b => {
    if (cityName) return b.city === cityName;
    return true;
  });

  return (
    <>
      {/* Header */}
      <div className="px-5 py-2 bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between w-full">
            <span className="text-gray-500 text-xs">موقعیت مکانی شما</span>
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-gray-900 font-bold text-sm cursor-pointer hover:bg-gray-50 rounded p-1 -mr-1 transition-colors"
            >
              <Navigation
                size={14}
                className="text-primary-600 fill-primary-600"
              />
              <span>{locationDisplayName}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Banner Slider */}

      <div className="px-5 mt-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar rounded-3xl">
          {bannerImages.map((img, index) => (
            <div
              key={index}
              className="min-w-full snap-center relative aspect-21/9 rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src={img}
                alt={`Banner ${index}`}
                className="w-full h-full object-cover"
                fill
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Barbers - Optimized Smaller Cards */}
      <div className="px-5 mt-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">پیشنهادها</h3>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
          {displayedBarbers.length === 0 ? (
            <div className="w-full text-center text-gray-400 text-sm py-8 bg-gray-50 rounded-2xl mx-5">
              آرایشگری در این شهر یافت نشد.
            </div>
          ) : (
            displayedBarbers
              .filter(b => b.isVerified)
              .map(barber => (
                <Link
                  key={barber.id}
                  href={`/barber/${barber.id}`}
                  className="bg-white border border-gray-100 p-2 rounded-2xl shadow-sm min-w-[160px] w-[160px] flex flex-col gap-2 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="relative aspect-square">
                    <Image
                      fill
                      src={barber.image}
                      alt={barber.name}
                      className="w-full h-full rounded-xl object-cover bg-gray-200"
                    />
                    <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-lg text-[10px] font-bold text-gray-800 flex items-center gap-0.5 shadow-sm">
                      <span>{barber.rating}</span>
                      <Star
                        size={8}
                        fill="currentColor"
                        className="text-yellow-500"
                      />
                    </div>
                  </div>
                  <div className="px-1">
                    <h4 className="font-bold text-gray-800 text-xs truncate">
                      {barber.shopName}
                    </h4>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">
                      {barber.name}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[9px] text-gray-400 flex items-center gap-0.5 truncate">
                        <MapPin size={10} />
                        {barber.city}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>

      <LocationPickerModal
        open={showLocationModal}
        onOpenChange={setShowLocationModal}
      />
    </>
  );
}

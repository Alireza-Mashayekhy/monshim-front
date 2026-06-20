'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bell,
  ChevronDown,
  MapPin,
  Navigation,
  SearchIcon,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, MOCK_BARBERS } from '@/constants';
import { toast } from 'sonner';

export default function Home() {
  const router = useRouter();
  const notifications: { isRead: boolean }[] = [];
  const cities: string[] = [];
  const [userLocation, setUserLocation] = useState();
  const bannerImages = [
    'https://images.unsplash.com/photo-1503951914875-befbb7135952?w=800&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80',
  ];
  const unreadCount = notifications.filter(n => !n.isRead).length;
  // Set default manually to first city
  const [locationName, setLocationName] = useState(`${cities[0]}، پیش‌فرض`);
  const [selectedCityState, setSelectedCityState] = useState<string | null>(
    cities[0],
  );
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    // Attempt Geolocation only if not set and no manual selection
    if (
      navigator.geolocation &&
      !userLocation &&
      selectedCityState === cities[0]
    ) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation(pos.coords.latitude, pos.coords.longitude);
          // Simple approximate logic for demo
          const distToMaragheh = Math.sqrt(
            Math.pow(pos.coords.latitude - 37.39, 2) +
              Math.pow(pos.coords.longitude - 46.23, 2),
          );
          if (distToMaragheh < 0.5) {
            setLocationName('مراغه، موقعیت یابی شد');
            setSelectedCityState('مراغه');
          }
        },
        err => {
          console.log('Geolocation error', err);
        },
        { timeout: 5000 },
      );
    }
  }, [userLocation]);

  const handleCategoryClick = (cat: string) => {
    router.push(`/explore?category=${encodeURIComponent(cat)}`);
  };

  const handleCitySelect = (city: string) => {
    setLocationName(city);
    setSelectedCityState(city);
    setShowLocationModal(false);
    toast.info(`نمایش آرایشگاه‌های شهر ${city}`);
  };

  // Filter Barbers based on selected city
  const displayedBarbers = MOCK_BARBERS.filter(b => {
    if (selectedCityState) return b.city === selectedCityState;
    return true; // Show all if no city selected yet
  }).sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs mb-1">موقعیت مکانی شما</span>
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-gray-900 font-bold text-sm cursor-pointer hover:bg-gray-50 rounded p-1 -mr-1 transition-colors"
            >
              <Navigation
                size={14}
                className="text-primary-600 fill-primary-600"
              />
              <span>{locationName}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
          <Link href="/notifications">
            <Button
              variant="ghost"
              className="bg-gray-50 border border-gray-100 p-2.5 rounded-full relative hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              )}
            </Button>
          </Link>
        </div>

        {/* Search Placeholder */}
        <Link
          href="/explore"
          className="bg-gray-100 rounded-2xl px-4 py-3 text-gray-500 text-sm flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-colors border border-transparent hover:border-gray-300"
        >
          <SearchIcon />
          <span>جستجوی نام آرایشگاه، خدمات...</span>
        </Link>
      </div>

      {/* Banner Slider */}

      <div className="px-5 mt-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar rounded-3xl">
          {bannerImages.map((img, index) => (
            <div
              key={index}
              className="min-w-full snap-center relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={img}
                alt={`Banner ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">خدمات محبوب</h3>
          <Link href="explore">
            <Button
              variant="link"
              className="text-xs text-primary-600 font-bold"
            >
              مشاهده همه
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer group"
            >
              <div className="w-14 h-14 bg-gray-50 group-hover:bg-primary-50 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-gray-100 transition-colors">
                {idx === 0
                  ? '💇‍♂️'
                  : idx === 1
                    ? '🧖'
                    : idx === 2
                      ? '🧴'
                      : idx === 3
                        ? '🎨'
                        : '💆'}
              </div>
              <span className="text-[10px] font-bold text-gray-600 group-hover:text-primary-700">
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Barbers - Optimized Smaller Cards */}
      <div className="px-5 mt-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">
            پیشنهادهای{' '}
            {selectedCityState ? `شهر ${selectedCityState}` : 'نزدیک'}
          </h3>
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

      {/* Location Modal Fallback */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl">
            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">
              انتخاب شهر
            </h3>
            <p className="text-xs text-gray-500 text-center mb-4">
              لطفا شهر خود را انتخاب کنید.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`p-3 border rounded-xl hover:bg-primary-50 hover:border-primary-200 transition-colors text-sm font-medium ${selectedCityState === city ? 'bg-primary-50 border-primary-200 text-primary-700 font-bold' : 'text-gray-700'}`}
                >
                  {city}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLocationModal(false)}
              className="w-full mt-4 py-3 text-red-500 font-bold text-sm"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}

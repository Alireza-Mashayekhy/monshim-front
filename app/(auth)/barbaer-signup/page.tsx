'use client';
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
  Locate,
  MapPin,
  Plus,
  Scissors,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function BarberSignup() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    image: null as string | null,
    shopName: '',
    city: '',
    address: '',
    latitude: null as number | null,
    longitude: null as number | null,
    bio: '',
    portfolio: [] as string[],
    services: [] as {
      id: string;
      name: string;
      price: string;
      duration: string;
    }[],
  });

  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) router.push('/');
    else setStep(step - 1);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePortfolioClick = () => {
    if (formData.portfolio.length >= 5) {
      toast.warning('در ثبت نام اولیه حداکثر ۵ عکس مجاز است.');
      return;
    }
    portfolioInputRef.current?.click();
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (formData.portfolio.length + files.length > 5) {
        toast.error('مجموع عکس‌ها نباید بیشتر از ۵ باشد.');
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === 'string') {
            setFormData(prev => ({
              ...prev,
              portfolio: [...prev.portfolio, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removePortfolioImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index),
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const mockAddress = `مراغه، خیابان قدس، کوچه ${Math.floor(Math.random() * 20) + 1}، پلاک ${Math.floor(Math.random() * 50)}`;

        setFormData({
          ...formData,
          latitude,
          longitude,
          address: mockAddress,
        });
        setIsLocating(false);
        toast.success('آدرس شما بر اساس موقعیت یافت شد.');
      },
      error => {
        console.error(error);
        setIsLocating(false);
        toast.warning(
          'دسترسی به موقعیت مکانی امکان‌پذیر نیست. لطفا آدرس را دستی وارد کنید.',
        );
      },
    );
  };

  const handleServiceAdd = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { id: Date.now().toString(), name: '', price: '', duration: '30' },
      ],
    });
  };

  const updateService = (id: string, field: string, value: string) => {
    // If updating price, format it
    const finalValue = value;

    const newServices = formData.services.map(s =>
      s.id === id ? { ...s, [field]: finalValue } : s,
    );
    setFormData({ ...formData, services: newServices });
  };

  const removeService = (id: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s.id !== id),
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);

    setTimeout(() => {
      //   const newBarber = {
      //     id: 'b_' + Date.now(),
      //     name: formData.name,
      //     shopName: formData.shopName,
      //     phone: formData.phone,
      //     city: formData.city,
      //     address: formData.address,
      //     image: formData.image, // Use default fallback
      //     bio: 'تازه وارد',
      //     portfolio: formData.portfolio,
      //     // Clean price before saving
      //     services: formData.services.map(s => ({
      //       ...s,
      //       price: s.price,
      //       durationMinutes: parseInt(s.duration),
      //     })),
      //     isVerified: false,
      //     isActive: false,
      //     rating: 5.0,
      //     reviewCount: 0,
      //     latitude: formData.latitude || undefined,
      //     longitude: formData.longitude || undefined,
      //     subscriptionLevel: 'BRONZE',
      //   };

      //   registerBarber(newBarber);

      setIsLoading(false);
      setStep(5);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="p-5 border-b sticky top-0 bg-white z-10 flex items-center justify-between shadow-sm">
        <button
          onClick={handleBack}
          className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft />
        </button>
        <h1 className="font-bold text-gray-800">ثبت نام آرایشگر</h1>
        <div className="w-8"></div>
      </div>

      <div className="w-full bg-gray-100 h-1.5 dir-ltr">
        <div
          className="bg-primary-600 h-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 p-5 pb-24 max-w-lg mx-auto w-full">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* ... Info Form ... */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-600 border border-primary-100 shadow-sm">
                <User size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">اطلاعات فردی</h2>
              <p className="text-xs text-gray-500 mt-1">
                مشخصات مدیر سالن یا آرایشگر
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder:text-gray-400"
                  placeholder="مثلا: علی رضایی"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  شماره موبایل
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none dir-ltr text-right placeholder:text-gray-400"
                  placeholder="0912..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                تصویر پروفایل
              </label>
              <div className="flex justify-center">
                <div
                  onClick={handleImageClick}
                  className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-primary-300 transition-all relative overflow-hidden group bg-gray-50"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {formData.image ? (
                    <img
                      src={formData.image}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera size={24} className="text-primary-600 mb-1" />
                      <span className="text-[10px] font-bold">آپلود عکس</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600 border border-orange-100 shadow-sm">
                <MapPin size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">اطلاعات سالن</h2>
              <p className="text-xs text-gray-500 mt-1">
                موقعیت و مشخصات محل کار
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  نام آرایشگاه (تابلو)
                </label>
                <input
                  type="text"
                  value={formData.shopName}
                  onChange={e =>
                    setFormData({ ...formData, shopName: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none placeholder:text-gray-400"
                  placeholder="مثلا: پیرایش کلاسیک"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  شهر
                </label>
                <select
                  value={formData.city}
                  onChange={e =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-500 outline-none"
                >
                  {adminSettings.availableCities.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-400 mt-1">
                  فقط شهرهای فعال در سامانه قابل انتخاب هستند.
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-700">
                    آدرس دقیق
                  </label>
                  <button
                    onClick={handleGetLocation}
                    className="text-xs text-primary-600 font-bold flex items-center gap-1 hover:text-primary-700"
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Locate size={12} />
                    )}
                    {isLocating ? 'در حال یافتن...' : 'دریافت آدرس از روی نقشه'}
                  </button>
                </div>
                <textarea
                  value={formData.address}
                  onChange={e =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none h-24 resize-none placeholder:text-gray-400"
                  placeholder={
                    formData.latitude
                      ? 'آدرس به صورت خودکار پر شده است. می‌توانید آن را ویرایش کنید.'
                      : 'خیابان، کوچه، پلاک...'
                  }
                ></textarea>
                {formData.latitude && (
                  <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                    <CheckCircle size={10} /> آدرس شما بر اساس موقعیت مکانی یافت
                    شد.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 border border-purple-100 shadow-sm">
                <ImageIcon size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">نمونه کارها</h2>
              <p className="text-xs text-gray-500 mt-1">
                تصاویری از محیط کار یا نمونه کارهای خود اضافه کنید (حداکثر ۵ عکس
                برای شروع)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {formData.portfolio.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-gray-100"
                  onClick={() => setLightboxImage(img)}
                >
                  <img src={img} className="w-full h-full object-cover" />
                  <button
                    onClick={e => removePortfolioImage(e, idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              {formData.portfolio.length < 5 && (
                <div
                  onClick={handlePortfolioClick}
                  className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary-300 transition-colors bg-gray-50"
                >
                  <Plus size={24} />
                  <span className="text-[10px] mt-1 font-bold">افزودن</span>
                </div>
              )}
              <input
                type="file"
                ref={portfolioInputRef}
                onChange={handlePortfolioChange}
                className="hidden"
                accept="image/*"
                multiple
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            {/* ... same services step ... */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 border border-green-100 shadow-sm">
                <Scissors size={28} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                خدمات و قیمت‌ها
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                حداقل یک خدمت اضافه کنید
              </p>
            </div>

            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group hover:border-primary-200 transition-colors"
                >
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeService(service.id);
                    }}
                    className="absolute top-3 left-3 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-lg transition-colors z-10"
                  >
                    <Trash2 size={16} />
                  </button>
                  <h4 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">
                      {index + 1}
                    </span>
                    مشخصات خدمت
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <input
                        placeholder="نام خدمت (مثلا اصلاح مو)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-colors"
                        value={service.name}
                        onChange={e =>
                          updateService(service.id, 'name', e.target.value)
                        }
                      />
                    </div>
                    <input
                      placeholder="قیمت (تومان)"
                      type="text"
                      inputMode="numeric"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-colors dir-ltr text-right"
                      value={service.price}
                      onChange={e =>
                        updateService(service.id, 'price', e.target.value)
                      }
                    />
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 text-sm text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-colors"
                      value={service.duration}
                      onChange={e =>
                        updateService(service.id, 'duration', e.target.value)
                      }
                    >
                      <option value="15">۱۵ دقیقه</option>
                      <option value="30">۳۰ دقیقه</option>
                      <option value="45">۴۵ دقیقه</option>
                      <option value="60">۱ ساعت</option>
                    </select>
                  </div>
                </div>
              ))}

              <button
                onClick={handleServiceAdd}
                className="w-full py-3 border-2 border-dashed border-primary-200 text-primary-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-50 hover:border-primary-300 transition-all text-sm active:scale-95"
              >
                <Plus size={18} />
                افزودن خدمت جدید
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-10 animate-fade-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-green-200 shadow-xl">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ثبت نام موفقیت‌آمیز بود!
              </h2>
              <p className="text-gray-500 max-w-xs mx-auto text-sm leading-6">
                اطلاعات شما (شامل نمونه کارها) با موفقیت در سیستم ثبت شد. پس از
                تایید توسط مدیریت، پیامک تایید برای شما ارسال خواهد شد.
              </p>
            </div>
            <button
              onClick={() => navigate('/barber/dashboard')} // Direct to dashboard
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-transform active:scale-95"
            >
              ورود به پنل آرایشگر
            </button>
          </div>
        )}
      </div>

      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 flex justify-center z-50">
          <div className="w-full max-w-lg">
            <button
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={isLoading || (step === 1 && !formData.name)}
              className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary-500/40 disabled:opacity-50 disabled:shadow-none flex justify-center items-center gap-2 hover:bg-primary-700 active:scale-95 transition-all"
            >
              {isLoading
                ? 'در حال پردازش...'
                : step === 4
                  ? 'تکمیل ثبت نام'
                  : 'مرحله بعد'}
            </button>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-5 right-5 text-white bg-white/20 p-2 rounded-full z-[101]">
            <X size={24} />
          </button>
          <img
            src={lightboxImage}
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl z-[101]"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

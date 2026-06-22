'use client';

import {
  CheckCircle,
  ImageIcon,
  Loader2,
  Scissors,
  Store,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRegisterBarber, useSendOtp } from '@/services/features/auth/hooks';
import { useBarberSignupStore } from '@/store/useBarberSignupStore';

const base64ToBlob = (base64: string): Blob => {
  const parts = base64.split(',');
  const contentType = parts[0].match(/:(.*?);/)?.[1] || 'image/webp';
  const byteCharacters = atob(parts[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

export default function BarbaerStep5() {
  const router = useRouter();
  const store = useBarberSignupStore();
  const [otpCode, setOtpCode] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const registerMutation = useRegisterBarber();
  const sendOtpMutation = useSendOtp();

  const {
    fullName,
    phone,
    image,
    shopName,
    provinceId,
    cityId,
    provinceName,
    cityName,
    address,
    bio,
    portfolio,
    services,
  } = store;

  // مرحله ۱: ارسال OTP
  const handleSendOtp = async () => {
    setIsSendingOtp(true);
    try {
      await sendOtpMutation.mutateAsync({ phone });
      setIsOtpModalOpen(true);
      toast.success('کد تأیید به شماره شما ارسال شد.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'خطا در ارسال کد تأیید');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // مرحله ۲: تأیید کد و ثبت نهایی
  const handleFinalSubmit = async () => {
    try {
      // ساخت FormData
      const formData = new FormData();

      // فیلدهای متنی به صورت JSON
      const payload = {
        fullName,
        phone,
        salonName: shopName,
        provinceId,
        cityId,
        address,
        bio: bio || '',
        password: '123456', // مقدار واقعی را جایگزین کنید
        code: otpCode, // کد وارد شده توسط کاربر
        services: services.map(s => ({
          name: s.name,
          price: parseFloat(s.price),
          durationMinutes: parseInt(s.duration, 10),
        })),
      };
      formData.append('data', JSON.stringify(payload));

      // عکس پروفایل
      if (image) {
        const imageBlob = base64ToBlob(image);
        formData.append('profileImage', imageBlob, 'profile.webp');
      }

      // نمونه کارها
      portfolio.forEach((img, index) => {
        const blob = base64ToBlob(img);
        formData.append('portfolio', blob, `portfolio-${index + 1}.webp`);
      });

      await registerMutation.mutateAsync(formData);

      toast.success('ثبت‌نام شما با موفقیت انجام شد!');
      store.reset();
      router.push('/barber/dashboard');
    } catch (error: any) {
      console.error('❌ Submission error:', error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'خطا در ارسال اطلاعات. لطفاً مجدداً تلاش کنید.',
      );
    } finally {
      setIsOtpModalOpen(false);
      setOtpCode('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-600 border border-primary-100 shadow-sm">
          <CheckCircle size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">تایید و ثبت نهایی</h2>
        <p className="text-xs text-gray-500 mt-1">
          لطفاً اطلاعات زیر را بررسی کنید و در صورت صحت، ثبت نام را نهایی کنید.
        </p>
      </div>

      {/* کارت‌های پیش‌نمایش */}
      <div className="space-y-4">
        {/* اطلاعات فردی */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <User size={16} className="text-primary-600" />
            <h3 className="font-bold text-sm">اطلاعات فردی</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">نام و نام خانوادگی:</span>
              <span className="font-medium mr-1">{fullName || '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">شماره موبایل:</span>
              <span className="font-medium mr-1">{phone || '—'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">عکس پروفایل:</span>
              {image ? (
                <img
                  src={image}
                  alt="پروفایل"
                  className="w-12 h-12 rounded-full object-cover border mt-1"
                />
              ) : (
                <span className="text-gray-400 mr-1">انتخاب نشده</span>
              )}
            </div>
          </div>
        </div>

        {/* اطلاعات سالن */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <Store size={16} className="text-primary-600" />
            <h3 className="font-bold text-sm">اطلاعات سالن</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">نام آرایشگاه:</span>
              <span className="font-medium mr-1">{shopName || '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">استان:</span>
              <span className="font-medium mr-1">{provinceName || '—'}</span>
            </div>
            <div>
              <span className="text-gray-500">شهر:</span>
              <span className="font-medium mr-1">{cityName || '—'}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">آدرس:</span>
              <span className="font-medium mr-1">{address || '—'}</span>
            </div>
          </div>
        </div>

        {/* نمونه کارها */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <ImageIcon size={16} className="text-primary-600" />
            <h3 className="font-bold text-sm">نمونه کارها</h3>
          </div>
          {portfolio.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {portfolio.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`نمونه کار ${idx + 1}`}
                  className="w-full aspect-square object-cover rounded-lg border"
                />
              ))}
              {portfolio.length > 4 && (
                <div className="flex items-center justify-center w-full aspect-square bg-gray-100 rounded-lg text-xs text-gray-500 border">
                  +{portfolio.length - 4} بیشتر
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              هیچ نمونه کاری انتخاب نشده است.
            </p>
          )}
        </div>

        {/* خدمات */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <Scissors size={16} className="text-primary-600" />
            <h3 className="font-bold text-sm">خدمات</h3>
          </div>
          {services.length > 0 ? (
            <div className="space-y-1">
              {services.map(s => (
                <div
                  key={s.id}
                  className="flex justify-between text-sm border-b border-gray-50 py-1 last:border-0"
                >
                  <span className="font-medium">{s.name || 'بدون نام'}</span>
                  <span className="text-gray-600">
                    {s.price ? `${s.price.toLocaleString()} تومان` : '—'}
                    {' / '}
                    {s.duration ? `${s.duration} دقیقه` : '—'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">هیچ خدمتی ثبت نشده است.</p>
          )}
        </div>
      </div>

      {/* دکمه‌های پایین */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 z-50">
        <div className="max-w-lg mx-auto flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={store.prevStep}
            disabled={registerMutation.isPending || isSendingOtp}
          >
            مرحله قبل
          </Button>
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={registerMutation.isPending || isSendingOtp}
            className="min-w-[120px]"
          >
            {isSendingOtp ? (
              <>
                <Loader2 size={18} className="animate-spin ml-2" />
                ارسال کد...
              </>
            ) : (
              'ثبت نهایی'
            )}
          </Button>
        </div>
      </div>

      {/* مودال ورود کد */}
      <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تأیید شماره موبایل</DialogTitle>
            <DialogDescription>
              کد تأیید به شماره {phone} ارسال شد. لطفاً آن را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <InputOTP
              maxLength={4}
              value={otpCode}
              onChange={value => setOtpCode(value)}
              dir="ltr"
              id="input-otp-ltr"
            >
              <InputOTPGroup className="w-full gap-2 flex-row-reverse">
                <InputOTPSlot
                  index={0}
                  className="w-full h-11 border rounded-md"
                />
                <InputOTPSlot
                  index={1}
                  className="w-full h-11 border rounded-md"
                />
                <InputOTPSlot
                  index={2}
                  className="w-full h-11 border rounded-md"
                />
                <InputOTPSlot
                  index={3}
                  className="w-full h-11 border rounded-md"
                />
              </InputOTPGroup>
            </InputOTP>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsOtpModalOpen(false);
                  setOtpCode('');
                }}
              >
                انصراف
              </Button>
              <Button
                onClick={handleFinalSubmit}
                disabled={otpCode.length < 4 || registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin ml-2" />
                    در حال ثبت...
                  </>
                ) : (
                  'تأیید و ثبت'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

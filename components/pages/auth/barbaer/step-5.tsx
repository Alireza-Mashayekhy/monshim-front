import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function BarbaerStep5() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-10 animate-fade-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-green-200 shadow-xl">
        <CheckCircle size={48} className="text-green-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ثبت نام موفقیت‌آمیز بود!
        </h2>
        <p className="text-gray-500 max-w-xs mx-auto text-sm leading-6">
          اطلاعات شما (شامل نمونه کارها) با موفقیت در سیستم ثبت شد. پس از تایید
          توسط مدیریت، پیامک تایید برای شما ارسال خواهد شد.
        </p>
      </div>
      <Link href="/barber/dashboard">
        <Button>ورود به پنل آرایشگر</Button>
      </Link>
    </div>
  );
}

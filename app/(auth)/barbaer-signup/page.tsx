'use client';
import BarbaerStep1 from '@/components/pages/auth/barbaer/step-1';
import BarbaerStep2 from '@/components/pages/auth/barbaer/step-2';
import BarbaerStep3 from '@/components/pages/auth/barbaer/step-3';
import BarbaerStep4 from '@/components/pages/auth/barbaer/step-4';
import BarbaerStep5 from '@/components/pages/auth/barbaer/step-5';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BarberSignup() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
        {step === 1 && <BarbaerStep1 />}

        {step === 2 && <BarbaerStep2 />}

        {step === 3 && <BarbaerStep3 />}

        {step === 4 && <BarbaerStep4 />}

        {step === 5 && <BarbaerStep5 />}
      </div>

      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 flex justify-center z-50">
          <div className="w-full max-w-lg">
            <Button
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={isLoading || (step === 1 && !formData.name)}
              loading={isLoading}
            >
              {isLoading
                ? 'در حال پردازش...'
                : step === 4
                  ? 'تکمیل ثبت نام'
                  : 'مرحله بعد'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

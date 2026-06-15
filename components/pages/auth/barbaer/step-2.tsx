import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, Locate, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import FormProvider from '@/components/form/form-provider';
import RHFInput from '@/components/form/rhf-input';
import RHFSelect from '@/components/form/rhf-select';
import RHFTextArea from '@/components/form/rhf-textarea';
import { Button } from '@/components/ui/button';

export default function BarbaerStep2() {
  const [isLocating, setIsLocating] = useState(false);

  const schema = z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    address: z.string(),
  });

  const methods = useForm({
    defaultValues: {
      latitude: undefined,
      longitude: undefined,
      address: '',
    },
    resolver: zodResolver(schema),
  });

  const { setValue } = methods;

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

        setValue('latitude', latitude);
        setValue('longitude', longitude);
        setValue('address', mockAddress);

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

  return (
    <FormProvider methods={methods} className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600 border border-orange-100 shadow-sm">
          <MapPin size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">اطلاعات سالن</h2>
        <p className="text-xs text-gray-500 mt-1">موقعیت و مشخصات محل کار</p>
      </div>

      <div className="space-y-4">
        <RHFInput name="barbaerName" label="نام آرایشگاه (تابلو)" />
        <RHFSelect name="city" label="شهر" />
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
          <RHFTextArea
            name="address"
            label="آدرس"
            placeholder={
              methods.getValues('latitude')
                ? 'آدرس به صورت خودکار پر شده است. می‌توانید آن را ویرایش کنید.'
                : 'خیابان، کوچه، پلاک...'
            }
          />

          {methods.getValues('latitude') && (
            <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle size={10} /> آدرس شما بر اساس موقعیت مکانی یافت شد.
            </p>
          )}
        </div>
      </div>

      <Button type="submit">مرcحله بعد</Button>
    </FormProvider>
  );
}

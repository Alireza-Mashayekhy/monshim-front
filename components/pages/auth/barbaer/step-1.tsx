// components/pages/auth/barbaer/step-1.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import FormProvider from '@/components/form/form-provider';
import { PersianDatePicker } from '@/components/form/persian-date-picker';
import { RHFImageUploader } from '@/components/form/rhf-image-uploader';
import RHFInput from '@/components/form/rhf-input';
import RHFPhoneInput from '@/components/form/rhf-phone-input';
import { Button } from '@/components/ui/button';
import { normalizePhone, phoneSchema } from '@/lib/phone';
import { useBarberSignupStore } from '@/store/useBarberSignupStore';

interface Step1Props {
  onSubmit: (data: any) => void;
}

export default function BarbaerStep1({ onSubmit }: Step1Props) {
  const { fullName, phone, image: storedImage, birthDate } = useBarberSignupStore();

  const schema = z.object({
    fullName: z.string().nonempty('نام و نام خانوادگی اجباری است.'),
    // ارقام فارسی/عربی را هم می‌پذیرد و به انگلیسی نرمال می‌کند
    phone: phoneSchema,
    birthDate: z.string().optional(),
    image: z
      .instanceof(File, { message: 'عکس پروفایل اجباری است' })
      .refine(file => file.size <= 5 * 1024 * 1024, `حداکثر حجم 5MB`)
      .refine(
        file => ['image/webp'].includes(file.type),
        'فقط فرمت‌ webp مجازند',
      )
      .optional() // اختیاری می‌کنیم تا اگر از قبل تصویر وجود دارد، مجبور به آپلود مجدد نباشد
      .or(z.string().nullable()), // اجازه می‌دهیم که base64 هم قبول شود (برای حالت preview)
  });

  const methods = useForm({
    defaultValues: {
      fullName: fullName || '',
      phone: phone || '',
      image: storedImage || undefined,
      birthDate: birthDate || '',
    },
    resolver: zodResolver(schema),
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  // اگر بخواهیم وقتی استور تغییر کرد، فرم هم به‌روز شود (اختیاری)
  useEffect(() => {
    if (storedImage) {
      setValue('image', storedImage);
    }
  }, [storedImage, setValue]);

  const onFormSubmit = async (data: any) => {
    // تبدیل image به base64
    let imageBase64 = storedImage; // مقدار قبلی را نگه دار

    // اگر فایل جدید آپلود شده بود
    if (data.image && data.image instanceof File) {
      imageBase64 = await new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(data.image);
      });
    }

    // ارسال داده به والد
    onSubmit({
      fullName: data.fullName,
      phone: normalizePhone(data.phone),
      image: imageBase64,
      birthDate: data.birthDate || '',
    });
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={onFormSubmit}
      className="space-y-6 animate-fade-in"
    >
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
        <RHFInput label="نام و نام خانوادگی" name="fullName" />
        <RHFPhoneInput label="شماره موبایل" name="phone" />
        <PersianDatePicker
          name="birthDate"
          label="تاریخ تولد"
          placeholder="انتخاب تاریخ تولد"
        />
        <RHFImageUploader
          name="image"
          label="عکس پروفایل"
          setValue={setValue}
          error={errors.image}
          maxSize={5 * 1024 * 1024}
          accept="image/webp"
          aspectRatio={1}
          className="col-span-2"
          defaultValue={storedImage || undefined} // به کامپوننت بده تا نمایش دهد
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 z-50">
        <div className="max-w-lg mx-auto flex justify-end">
          <Button type="submit">مرحله بعد</Button>
        </div>
      </div>
    </FormProvider>
  );
}

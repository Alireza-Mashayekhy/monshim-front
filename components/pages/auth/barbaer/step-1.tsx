import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import FormProvider from '@/components/form/form-provider';
import { RHFImageUploader } from '@/components/form/rhf-image-uploader';
import RHFInput from '@/components/form/rhf-input';
import { Button } from '@/components/ui/button';

export default function BarbaerStep1() {
  const schema = z.object({
    fullName: z
      .string()
      .length(11, 'شماره تلفن وارد شده اشتباه است.')
      .startsWith('09', 'شماره تلفن وارد شده اشتباه است.'),

    image: z
      .instanceof(File, { message: 'عکس دسته بندی اجباری است' })
      .refine(file => file.size <= 5 * 1024 * 102, `حداکثر حجم 5MB`)
      .refine(
        file => ['image/webp'].includes(file.type),
        'فقط فرمت‌ webp مجازند',
      ),
  });

  const methods = useForm({
    defaultValues: {
      fullName: '',
      image: undefined,
    },
    resolver: zodResolver(schema),
  });

  const {
    setValue,
    formState: { errors },
  } = methods;

  return (
    <FormProvider methods={methods} className="space-y-6 animate-fade-in">
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
        <RHFInput label="شماره موبایل" name="phone" />
        <RHFImageUploader
          name="image"
          label="عکس پروفایل"
          setValue={setValue}
          error={errors.image}
          maxSize={5 * 1024 * 1024}
          accept="image/webp"
          aspectRatio={1}
          className="col-span-2"
        />
      </div>
      <Button type="submit">مرحله بعد</Button>
    </FormProvider>
  );
}

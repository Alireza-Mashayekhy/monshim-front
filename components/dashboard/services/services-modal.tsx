// components/dashboard/services/ServiceModal.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import FormProvider from '@/components/form/form-provider';
import RHFInput from '@/components/form/rhf-input';
import RHFSelect from '@/components/form/rhf-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatNumberInput } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(1, 'نام خدمت الزامی است'),
  price: z.string().min(1, 'قیمت الزامی است'),
  duration: z.string().min(1, 'مدت زمان الزامی است'),
});

type FormData = z.infer<typeof schema>;

interface ServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingService: any;
}

const durationOptions = [
  { value: '15', label: '۱۵ دقیقه' },
  { value: '30', label: '۳۰ دقیقه' },
  { value: '45', label: '۴۵ دقیقه' },
  { value: '60', label: '۱ ساعت' },
  { value: '90', label: '۱.۵ ساعت' },
  { value: '120', label: '۲ ساعت' },
];

export function ServiceModal({
  open,
  onOpenChange,
  editingService,
}: ServiceModalProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: '',
      duration: '30',
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (editingService) {
      reset({
        name: editingService.name,
        price: formatNumberInput(editingService.price.toString()),
        duration: editingService.durationMinutes.toString(),
      });
    } else {
      reset({ name: '', price: '', duration: '30' });
    }
  }, [editingService, reset, open]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // const price = unformatNumberInput(data.price);
    // let updatedServices = [...(currentBarber?.services || [])];
    // if (editingService) {
    //   updatedServices = updatedServices.map(s =>
    //     s.id === editingService.id
    //       ? {
    //           ...s,
    //           name: data.name,
    //           price,
    //           durationMinutes: parseInt(data.duration),
    //         }
    //       : s,
    //   );
    // } else {
    //   updatedServices.push({
    //     id: Date.now().toString(),
    //     name: data.name,
    //     price,
    //     durationMinutes: parseInt(data.duration),
    //   });
    // }
    // updateBarber(barberId, { services: updatedServices });
    // addNotification({
    //   title: 'موفق',
    //   message: 'لیست خدمات بروزرسانی شد.',
    //   type: 'SUCCESS',
    // });
    // onOpenChange(false);
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="font-bold text-lg text-gray-800">
            {editingService ? 'ویرایش خدمت' : 'افزودن خدمت جدید'}
          </DialogTitle>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </DialogHeader>

        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <RHFInput
            name="name"
            label="نام خدمت"
            placeholder="مثلاً کوتاهی مو"
          />
          <RHFInput
            name="price"
            label="قیمت (تومان)"
            placeholder="مثلاً ۱۵۰۰۰۰"
            inputMode="numeric"
          />
          <RHFSelect
            name="duration"
            label="مدت زمان"
            items={durationOptions}
            placeholder="انتخاب مدت زمان"
          />
          <Button type="submit" className="w-full">
            {editingService ? 'ویرایش' : 'افزودن'}
          </Button>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

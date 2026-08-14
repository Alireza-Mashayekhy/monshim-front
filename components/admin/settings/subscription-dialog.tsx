'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateSubscriptionPlan,
  useUpdateSubscriptionPlan,
} from '@/services/features/subscription/hooks';
import { SubscriptionPlan } from '@/services/features/subscription/types';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription?: SubscriptionPlan | null;
}

export default function SubscriptionDialog({
  open,
  onOpenChange,
  subscription,
}: SubscriptionDialogProps) {
  const isEdit = !!subscription;

  const createMutation = useCreateSubscriptionPlan();
  const updateMutation = useUpdateSubscriptionPlan();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (subscription) {
      setName(subscription.name);
      setPrice(String(subscription.price));
      setDurationDays(String(subscription.durationDays));
      setDescription(subscription.description ?? '');
      setSortOrder(String(subscription.sortOrder));
      setIsActive(subscription.isActive);
    } else {
      setName('');
      setPrice('');
      setDurationDays('');
      setDescription('');
      setSortOrder('0');
      setIsActive(true);
    }
  }, [subscription, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dto = {
      name: name.trim(),
      price: Number(price),
      durationDays: Number(durationDays),
      description: description.trim() || null,
      sortOrder: Number(sortOrder),
      isActive,
    };

    if (isEdit) {
      updateMutation.mutate(
        {
          id: subscription.id,
          dto,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        },
      );
    } else {
      createMutation.mutate(dto, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'ویرایش پلن اشتراک' : 'افزودن پلن اشتراک'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>نام اشتراک</Label>

            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="مثلاً اشتراک طلایی"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>قیمت</Label>

              <Input
                type="number"
                min={0}
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="مثلاً 500000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>مدت اشتراک (روز)</Label>

              <Input
                type="number"
                min={1}
                value={durationDays}
                onChange={e => setDurationDays(e.target.value)}
                placeholder="30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>توضیحات</Label>

            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="توضیحات مربوط به اشتراک..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ترتیب نمایش</Label>

              <Input
                type="number"
                min={0}
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 mt-6">
              <Label>فعال</Label>

              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending
                ? 'در حال ذخیره...'
                : isEdit
                  ? 'ذخیره تغییرات'
                  : 'ایجاد اشتراک'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

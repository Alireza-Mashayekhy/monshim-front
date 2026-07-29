// components/dashboard/appointments/AppointmentCard.tsx
'use client';

import { Check, MessageCircle, Phone, XCircle } from 'lucide-react';

import AppCard from '@/components/shared/app-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import {
  useCancelBooking,
  useConfirmBooking,
  useUpdateBookingStatus,
} from '@/services/features/booking/hooks';
import { Booking } from '@/services/features/booking/types';

interface AppointmentCardProps {
  booking: Booking;
}

export default function AppointmentCard({ booking }: AppointmentCardProps) {
  const { id, customer, service, date, time, price, status } = booking;
  const updateStatus = useUpdateBookingStatus();
  const confirmBooking = useConfirmBooking();
  const cancelBooking = useCancelBooking();

  const statusVariant =
    {
      PENDING: 'bg-yellow-100 text-yellow-700',
      CONFIRMED: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-blue-100 text-blue-700',
      CANCELLED: 'bg-red-100 text-red-700',
      REJECTED: 'bg-gray-100 text-gray-700',
    }[status] || 'bg-gray-100 text-gray-700';

  const statusLabel =
    {
      PENDING: 'در انتظار',
      CONFIRMED: 'تایید شده',
      COMPLETED: 'انجام شده',
      CANCELLED: 'لغو شده',
      REJECTED: 'رد شده',
    }[status] || status;

  const handleCall = () => {
    if (customer?.phone) window.location.href = `tel:${customer.phone}`;
  };

  const handleChat = () => {
    // پیاده‌سازی چت
  };

  return (
    <AppCard>
      <div className="flex justify-between items-start">
        <div>
          <Badge className={`rounded-full ${statusVariant}`}>
            {statusLabel}
          </Badge>
          <h3 className="mt-4 text-xl font-bold">
            {customer?.fullName || 'مشتری'}
          </h3>
          <p className="text-slate-500">{service?.name || 'خدمت'}</p>
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold">{time}</h3>
          <p className="text-slate-500">{date}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="font-bold">{formatPrice(price)}</span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={handleCall}
          >
            <Phone size={18} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={handleChat}
          >
            <MessageCircle size={18} />
          </Button>

          {status === 'PENDING' && (
            <>
              <Button
                size="icon"
                className="rounded-full"
                onClick={() => confirmBooking.mutate(id)}
                disabled={confirmBooking.isPending}
              >
                <Check size={18} />
              </Button>
              <Button
                size="icon"
                className="rounded-full"
                variant="destructive"
                onClick={() => updateStatus.mutate({ id, status: 'REJECTED' })}
                disabled={updateStatus.isPending}
              >
                <XCircle size={18} />
              </Button>
            </>
          )}

          {status === 'CONFIRMED' && (
            <Button
              size="icon"
              className="rounded-full"
              variant="outline"
              onClick={() => updateStatus.mutate({ id, status: 'COMPLETED' })}
              disabled={updateStatus.isPending}
            >
              <Check size={18} />
            </Button>
          )}

          {(status === 'PENDING' || status === 'CONFIRMED') && (
            <Button
              size="icon"
              className="rounded-full"
              variant="destructive"
              onClick={() => updateStatus.mutate({ id, status: 'CANCELLED' })}
              disabled={updateStatus.isPending}
            >
              <XCircle size={18} />
            </Button>
          )}
        </div>
      </div>
    </AppCard>
  );
}

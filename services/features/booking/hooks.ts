// services/features/booking/hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  cancelBooking,
  confirmBooking,
  createBooking,
  CreateBookingDto,
  getAvailableSlots,
  getBarberBookings,
  updateBookingStatus,
} from './api';
import { Booking, BookingQueryParams } from './types';

export const useAvailableSlots = (
  barberId: string,
  date: string | null,
  serviceId: string | null,
) => {
  return useQuery({
    queryKey: ['available-slots', barberId, date, serviceId],
    queryFn: async () => {
      const data = getAvailableSlots(barberId, date, serviceId);
      return data;
    },
    enabled: !!barberId && !!date && !!serviceId,
    staleTime: 2 * 60 * 1000,
  });
};
export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateBookingDto) => createBooking(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useBarberBookings = (params: BookingQueryParams) => {
  return useQuery({
    queryKey: ['barber-bookings', params],
    queryFn: () => getBarberBookings(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Booking['status'] }) =>
      updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barber-bookings'] });
      toast.success('وضعیت نوبت با موفقیت تغییر کرد.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در تغییر وضعیت نوبت');
    },
  });
};

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => confirmBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barber-bookings'] });
      toast.success('نوبت با موفقیت تأیید شد.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در تأیید نوبت');
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barber-bookings'] });
      toast.success('نوبت با موفقیت لغو شد.');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'خطا در لغو نوبت');
    },
  });
};

// services/features/booking/hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createBooking, CreateBookingDto, getAvailableSlots } from './api';

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

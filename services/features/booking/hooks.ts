// services/features/booking/hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createBooking, CreateBookingDto, getAvailableTimes } from './api';

export const useAvailableTimes = (
  barberId: number | undefined,
  date: string | null,
) => {
  return useQuery({
    queryKey: ['available-times', barberId, date],
    queryFn: () => getAvailableTimes(barberId!, date!),
    enabled: !!barberId && !!date,
    staleTime: 5 * 60 * 1000,
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

// services/features/booking/api.ts
import { api } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';
import { ApiListResponse } from '@/services/api/types';

import { WorkHours } from '../barber/types';
import { Booking } from './types';

export interface CreateBookingDto {
  barberId: number;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  note?: string;
}

export const createBooking = async (
  dto: CreateBookingDto,
): Promise<Booking> => {
  const { data } = await api.post(endpoints.booking.create, dto);
  return data;
};

export const getAvailableSlots = async (
  barberId: string,
  date: string | null,
  serviceId: string | null,
) => {
  const { data } = await api.get<ApiListResponse<WorkHours>>(
    endpoints.booking.availableTimes,
    {
      params: { barberId, date, serviceId },
    },
  );
  return data;
};

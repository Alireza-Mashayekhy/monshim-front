// services/features/booking/api.ts
import { api } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';

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

export const getAvailableTimes = async (
  barberId: number,
  date: string,
): Promise<string[]> => {
  const { data } = await api.get(endpoints.booking.availableTimes, {
    params: { barberId, date },
  });
  return data;
};

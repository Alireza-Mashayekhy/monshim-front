import { api } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';
import { ApiListResponse, ApiSingleResponse } from '@/services/api/types';

import { Barber, BarberResponse } from './types';

export async function barberList(query?: {
  page: number;
  limit: number;
  cityId?: number;
  search?: string;
}) {
  const { data } = await api.get<ApiListResponse<BarberResponse>>(
    endpoints.barber.list,
    {
      params: query,
    },
  );

  return data;
}

export const getBarberById = async (id: number) => {
  const url = endpoints.barber.detail(id);
  const { data } = await api.get<ApiSingleResponse<Barber>>(url);
  return data;
};

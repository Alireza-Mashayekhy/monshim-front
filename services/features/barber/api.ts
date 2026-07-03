import { api } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';
import { ApiListResponse } from '@/services/api/types';

import { BarberResponse } from './types';

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

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { barberList } from './api';

export const useBarberList = (params: {
  cityId?: number;
  search?: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ['barbers', params],
    queryFn: ({ pageParam = 1 }) =>
      barberList({
        page: pageParam,
        limit: params.limit || 10,
        cityId: params.cityId,
        search: params.search,
      }),
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000, // 2 دقیقه
  });
};

export const useHomeBarberList = (params: {
  cityId?: number;
  search?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['homeBarbers', params],
    queryFn: () =>
      barberList({
        page: 1,
        limit: params.limit || 10,
        cityId: params.cityId,
        search: params.search,
      }),
    staleTime: 2 * 60 * 1000,
    enabled: true,
  });
};

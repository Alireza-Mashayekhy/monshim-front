import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchMe, login, registerBarber, sendOtp } from './api';

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: sendOtp,
  });
}

export function useRegisterBarber() {
  return useMutation({
    mutationFn: registerBarber,
  });
}

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    staleTime: 5 * 60 * 1000, // 5 دقیقه کش
  });
};

import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchMe, login, logout, registerBarber, sendOtp, signUp } from './api';

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

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
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

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}

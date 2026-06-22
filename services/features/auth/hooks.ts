import { useMutation } from '@tanstack/react-query';

import { login, registerBarber, sendOtp } from './api';

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

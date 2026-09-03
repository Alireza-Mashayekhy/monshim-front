import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { isAdmin, isBarber, rolesOf } from '@/lib/roles';
import { useAuthStore } from '@/store/auth.store';

import {
  fetchMe,
  login,
  logout,
  refreshSession,
  registerBarber,
  sendOtp,
  signUp,
} from './api';

export const authKeys = {
  me: ['me'] as const,
};

/**
 * تنها منبع حقیقی اطلاعات کاربر در سمت کلاینت.
 * بعد از لاگین/ثبت‌نام/تغییر نقش، کش آن باطل می‌شود تا همه‌جا به‌روزرسانی شود.
 */
export const useMe = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: fetchMe,
    staleTime: 60 * 1000, // ۱ دقیقه
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

/**
 * هوک یکپارچه برای خواندن کاربر جاری در کامپوننت‌ها.
 * نیازی به نوشتن منطق تشخیص نقش در هر کامپوننت نیست.
 */
export function useCurrentUser() {
  const { data, isLoading, isFetching, isError, refetch } = useMe();

  const user = data?.data ?? null;

  return {
    user,
    roles: rolesOf(user),
    isBarber: isBarber(user),
    isAdmin: isAdmin(user),
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // بعد از لاگین، اطلاعات کاربر حتماً دوباره خوانده شود
      await queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: sendOtp,
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useRegisterBarber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerBarber,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

/** دریافت توکن تازه — برای وقتی که نقش کاربر در سرور تغییر کرده است */
export function useRefreshSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refreshSession,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // پاک کردن کامل کش تا اطلاعات کاربر قبلی باقی نماند
      useAuthStore.getState().clearUser();
      queryClient.clear();
    },
  });
}

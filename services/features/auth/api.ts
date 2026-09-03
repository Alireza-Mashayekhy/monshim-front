import { extractUser } from '@/lib/roles';
import { api } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';
import { ApiSingleResponse } from '@/services/api/types';

import {
  LoginDto,
  LoginResponse,
  sendOtpDto,
  sendOtpResponse,
  SignUpDto,
  UserResponse,
} from './types';

export async function login(dto: LoginDto) {
  const { data } = await api.post<ApiSingleResponse<LoginResponse>>(
    endpoints.auth.login,
    dto,
  );

  return data;
}

export async function sendOtp(dto: sendOtpDto) {
  const { data } = await api.post<ApiSingleResponse<sendOtpResponse>>(
    endpoints.auth.otp,
    dto,
  );

  return data;
}

export async function signUp(dto: SignUpDto) {
  const { data } = await api.post<ApiSingleResponse<LoginResponse>>(
    endpoints.auth.signUp,
    dto,
  );

  return data;
}

export async function registerBarber(dto: FormData) {
  const { data } = await api.post(endpoints.auth.registerBarber, dto, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}

/**
 * دریافت اطلاعات کاربر جاری.
 * پاسخ همیشه نرمال می‌شود: یک کاربر با نقش‌های آرایه‌ای
 * (گاهی بک‌اند آرایه برمی‌گرداند یا نقش‌ها رشته‌ی جداشده با کاما هستند)
 */
export async function fetchMe(): Promise<ApiSingleResponse<UserResponse>> {
  const { data } = await api.get(endpoints.auth.me);

  return {
    ...data,
    data: extractUser(data?.data) as UserResponse,
  } as ApiSingleResponse<UserResponse>;
}

/**
 * گرفتن توکن تازه به همراه کاربرِ به‌روز
 * (برای زمانی که نقش‌های کاربر تغییر کرده و توکن قدیمی است)
 */
export async function refreshSession() {
  const { data: refreshed } = await api.post(endpoints.auth.refresh);
  const { data: me } = await api.get(endpoints.auth.me);

  return {
    refresh: refreshed,
    user: extractUser(me?.data),
  };
}

export async function logout() {
  const { data } = await api.post(endpoints.auth.logout);

  return data;
}

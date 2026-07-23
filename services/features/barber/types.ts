export interface BarberProfile {
  profileImage: string;
  salonName: string;
}
export interface BarberResponse {
  id: string;
  barberProfile: BarberProfile;
  cityName: string;
  provinceName: string;
  fullName: string;
  profileImage: string;
  salonName: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
}

// types/barber.types.ts
export interface Barber {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  salonName: string;
  provinceId?: number | null;
  cityId?: number | null;
  provinceName?: string | null;
  cityName?: string | null;
  address: string;
  bio?: string | null;
  profileImage?: string | null;
  portfolioImages?: string[];
  workStartTime?: string | null;
  workEndTime?: string | null;
  isApproved: boolean;
  rejectionReason?: string | null;
  createdAt: string;
}

export interface UpdateBarberProfile {
  fullName?: string;
  salonName?: string;
  provinceId?: number | null;
  cityId?: number | null;
  address?: string;
  bio?: string | null;
  workStartTime?: string | null;
  workEndTime?: string | null;
  profileImage?: string | null;
  isApproved?: boolean;
  rejectionReason?: string | null;
}

export interface User {
  id: number;
  fullName: string;
  walletBalance: number;
  roles: string[];
  phone: string;
}

export interface Notification {
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR';
}

export type PaymentMethod = 'ONLINE' | 'WALLET';

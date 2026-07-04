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

export interface Barber {
  id: number;
  name: string;
  shopName: string;
  image: string | null;
  address: string;
  bio: string;
  rating: number;
  reviewCount: number;
  services: Service[];
  portfolio: string[];
  city: string | null;
  province: string | null;
}

export interface User {
  id: number;
  name: string;
  walletBalance: number;
  roles: string[];
}

export interface Notification {
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR';
}

export type PaymentMethod = 'ONLINE' | 'WALLET';

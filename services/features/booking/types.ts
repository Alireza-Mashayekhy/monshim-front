// types/booking.types.ts
export interface Booking {
  id: string;
  customerId: number;
  barberId: number;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  price: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  note?: string;
  createdAt: string;
  updatedAt: string;
  // روابط (برای نمایش)
  customer?: {
    id: number;
    fullName: string;
    phone: string;
  };
  service?: {
    id: string;
    name: string;
    durationMinutes: number;
  };
  barber?: {
    id: string;
    salonName: string;
  };
}

export interface BookingQueryParams {
  page?: number;
  limit?: number;
  status?: Booking['status'];
  date?: string; // YYYY-MM-DD
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

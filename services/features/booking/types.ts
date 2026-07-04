export interface Booking {
  id: string;
  barberId: number;
  customerId: number;
  serviceId: string;
  date: string;
  time: string;
  price: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELED' | 'REJECTED';
  note?: string;
  createdAt: string;
  updatedAt: string;
}

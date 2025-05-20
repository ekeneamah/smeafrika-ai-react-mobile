export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  totalDuration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
  totalAmount: number;
  createdAt: string;
  services: Array<{
    id: string;
    name: string;
    duration: number;
    price: number;
  }>;
} 
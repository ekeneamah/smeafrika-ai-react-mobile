import { Booking } from '../types/booking';

const API_URL = 'https://api.example.com/bookings'; // Replace with your actual API URL

export const bookingService = {
  async getBookings(page: number): Promise<Booking[]> {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch booking');
    return response.json();
  },

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  async updateBooking(id: string, bookingData: Partial<Booking>): Promise<Booking> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) throw new Error('Failed to update booking');
    return response.json();
  },

  async deleteBooking(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete booking');
  },

  async cancelBooking(id: string): Promise<Booking> {
    const response = await fetch(`${API_URL}/${id}/cancel`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to cancel booking');
    return response.json();
  }
}; 
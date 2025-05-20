import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { bookingService } from '../../services/bookingService';
import { Booking } from '../../types/booking';

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null
};

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (page: number) => {
    return await bookingService.getBookings(page);
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (bookingId: string) => {
    return await bookingService.getBookingById(bookingId);
  }
);

export const saveBooking = createAsyncThunk(
  'bookings/saveBooking',
  async (bookingData: Partial<Booking>) => {
    if (bookingData.id) {
      return await bookingService.updateBooking(bookingData.id, bookingData);
    }
    return await bookingService.createBooking(bookingData);
  }
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (bookingId: string) => {
    await bookingService.deleteBooking(bookingId);
    return bookingId;
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (bookingId: string) => {
    return await bookingService.cancelBooking(bookingId);
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      })
      .addCase(saveBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.currentBooking = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const booking = state.bookings.find(b => b.id === action.payload.id);
        if (booking) booking.status = 'cancelled';
        if (state.currentBooking && state.currentBooking.id === action.payload.id) {
          state.currentBooking.status = 'cancelled';
        }
      });
  },
});

export default bookingSlice.reducer; 
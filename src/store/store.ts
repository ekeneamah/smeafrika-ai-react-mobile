import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import tasksReducer from './slices/tasksSlice';
import analyticsReducer from './slices/analyticsSlice';
import expensesReducer from './slices/expensesSlice';
import purchaseReducer from './slices/purchaseSlice';
import metaReducer from './slices/metaSlice';
import bookingReducer from './slices/bookingSlice';
import expenseReducer from './slices/expenseSlice';
import productReducer from './slices/productSlice';
import integrationReducer from './slices/integrationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    orders: ordersReducer,
    tasks: tasksReducer,
    expenses: expensesReducer,
    analytics: analyticsReducer,
    purchase: purchaseReducer,
    meta: metaReducer,
    bookings: bookingReducer,
    expense: expenseReducer,
    integrations: integrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
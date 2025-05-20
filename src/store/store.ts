import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import tasksReducer from './slices/tasksSlice';
import analyticsReducer from './slices/analyticsSlice';
import expensesReducer from './slices/expensesSlice';
import purchaseReducer from './slices/purchaseSlice';
import metaReducer from './slices/metaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    tasks: tasksReducer,
    expenses: expensesReducer,
    analytics: analyticsReducer,
    purchase: purchaseReducer,
    meta: metaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
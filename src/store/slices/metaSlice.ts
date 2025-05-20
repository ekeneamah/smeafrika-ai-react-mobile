// store/slices/metaSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Supplier {
  id: string;
  name: string;
  contact: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface MetaState {
  suppliers: Supplier[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MetaState = {
  suppliers: [],
  products: [],
  isLoading: false,
  error: null,
};

// Simulated async calls
export const fetchSuppliers = createAsyncThunk('meta/fetchSuppliers', async (_, { rejectWithValue }) => {
  try {
    return await new Promise<Supplier[]>((resolve) =>
      setTimeout(() => resolve([
        { id: '1', name: 'Tech Supplies Inc.', contact: 'John Smith' },
        { id: '2', name: 'Global Electronics', contact: 'Jane Doe' },
      ]), 500)
    );
  } catch {
    return rejectWithValue('Failed to load suppliers');
  }
});

export const fetchProducts = createAsyncThunk('meta/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    return await new Promise<Product[]>((resolve) =>
      setTimeout(() => resolve([
        { id: 'p1', name: 'Wireless Earbuds', price: 50 },
        { id: 'p2', name: 'Smart Watch', price: 100 },
        { id: 'p3', name: 'Bluetooth Speaker', price: 80 },
      ]), 500)
    );
  } catch {
    return rejectWithValue('Failed to load products');
  }
});

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Suppliers
      .addCase(fetchSuppliers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default metaSlice.reducer;

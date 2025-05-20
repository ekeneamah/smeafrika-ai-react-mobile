import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { productService } from '../../services/productService';
import { ProductListing } from '../../types/Product';

interface ProductState {
  listings: ProductListing[];
  currentListing: ProductListing | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  listings: [],
  currentListing: null,
  isLoading: false,
  error: null
};

export const fetchProductListings = createAsyncThunk(
  'products/fetchListings',
  async (page: number) => {
    return await productService.getProductListings(page);
  }
);

export const fetchProductListingById = createAsyncThunk(
  'products/fetchListingById',
  async (id: string) => {
    return await productService.getProductListingById(id);
  }
);

export const saveProductListing = createAsyncThunk(
  'products/saveListing',
  async (productData: Partial<ProductListing>) => {
    if (productData.id) {
      return await productService.updateProductListing(productData.id, productData);
    }
    return await productService.createProductListing(productData);
  }
);

export const deleteProductListing = createAsyncThunk(
  'products/deleteListing',
  async (id: string) => {
    await productService.deleteProductListing(id);
    return id;
  }
);

export const updateProductStatus = createAsyncThunk(
  'products/updateStatus',
  async ({ id, status }: { id: string; status: ProductListing['status'] }) => {
    return await productService.updateProductStatus(id, status);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload;
      })
      .addCase(fetchProductListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch product listings';
      })
      .addCase(fetchProductListingById.fulfilled, (state, action) => {
        state.currentListing = action.payload;
      })
      .addCase(saveProductListing.fulfilled, (state, action) => {
        const index = state.listings.findIndex(listing => listing.id === action.payload.id);
        if (index >= 0) {
          state.listings[index] = action.payload;
        } else {
          state.listings.push(action.payload);
        }
        state.currentListing = action.payload;
      })
      .addCase(deleteProductListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(listing => listing.id !== action.payload);
        if (state.currentListing?.id === action.payload) {
          state.currentListing = null;
        }
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        const index = state.listings.findIndex(listing => listing.id === action.payload.id);
        if (index >= 0) {
          state.listings[index] = action.payload;
        }
        if (state.currentListing?.id === action.payload.id) {
          state.currentListing = action.payload;
        }
      });
  },
});

export default productSlice.reducer; 
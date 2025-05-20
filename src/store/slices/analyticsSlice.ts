import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { analyticsService } from '../../services/analyticsService';
import { AnalyticsData, AnalyticsFilter } from '../../types/Analytics';

interface SupplierAnalyticsData {
  totalOrders: number;
  totalValue: number;
  avgOrderValue: number;
  activeOrders: number;
  onTimeDeliveryRate: number;
  qualityRating: number;
  responseTime: number;
  topProducts: { name: string; totalValue: number; units: number }[];
  issues: {
    quality: number;
    lateDeliveries: number;
    returnRate: number;
    returnValue: number;
  };
}

interface AnalyticsState {
  salesData: AnalyticsData;
  revenueData: AnalyticsData;
  trafficData: AnalyticsData;
  currentFilter: AnalyticsFilter;
  supplierAnalyticsData: SupplierAnalyticsData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  salesData: { labels: [], datasets: [] },
  revenueData: { labels: [], datasets: [] },
  trafficData: { labels: [], datasets: [] },
  currentFilter: {
    dateRange: 'week',
    category: 'all',
  },
  supplierAnalyticsData: null,
  isLoading: false,
  error: null,
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (filter: AnalyticsFilter, { rejectWithValue }) => {
    try {
      return await analyticsService.fetchAnalyticsData(filter);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSupplierAnalytics = createAsyncThunk<
  SupplierAnalyticsData,
  { supplierId: string; timeRange: string },
  { rejectValue: string }
>(
  'analytics/fetchSupplierAnalytics',
  async ({ supplierId, timeRange }, { rejectWithValue }) => {
    try {
      const result = await analyticsService.fetchSupplierAnalytics(supplierId, timeRange);
      return result as SupplierAnalyticsData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<AnalyticsFilter>) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action: PayloadAction<{
        salesData: AnalyticsData;
        revenueData: AnalyticsData;
        trafficData: AnalyticsData;
      }>) => {
        state.isLoading = false;
        state.salesData = action.payload.salesData;
        state.revenueData = action.payload.revenueData;
        state.trafficData = action.payload.trafficData;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSupplierAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSupplierAnalytics.fulfilled, (state, action: PayloadAction<SupplierAnalyticsData>) => {
        state.isLoading = false;
        state.supplierAnalyticsData = action.payload;
      })
      .addCase(fetchSupplierAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter } = analyticsSlice.actions;
export default analyticsSlice.reducer;
export const selectAnalyticsData = (state: { analytics: AnalyticsState }) => state.analytics;
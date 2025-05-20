import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { integrationService } from '../../services/integrationService';
import { Integration, SyncStatus } from '../../types/integration';

interface IntegrationState {
  integrations: Integration[];
  currentIntegration: Integration | null;
  syncStatus: SyncStatus[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IntegrationState = {
  integrations: [],
  currentIntegration: null,
  syncStatus: [],
  isLoading: false,
  error: null
};

export const fetchIntegrations = createAsyncThunk(
  'integrations/fetchAll',
  async () => {
    return await integrationService.getIntegrations();
  }
);

export const fetchIntegrationById = createAsyncThunk(
  'integrations/fetchById',
  async (id: string) => {
    return await integrationService.getIntegrationById(id);
  }
);

export const saveIntegration = createAsyncThunk(
  'integrations/save',
  async (integrationData: Partial<Integration>) => {
    if (integrationData.id) {
      return await integrationService.updateIntegration(integrationData.id, integrationData);
    }
    return await integrationService.createIntegration(integrationData);
  }
);

export const deleteIntegration = createAsyncThunk(
  'integrations/delete',
  async (id: string) => {
    await integrationService.deleteIntegration(id);
    return id;
  }
);

export const syncProduct = createAsyncThunk(
  'integrations/syncProduct',
  async ({ integrationId, productId }: { integrationId: string; productId: string }) => {
    return await integrationService.syncProduct(integrationId, productId);
  }
);

export const fetchSyncStatus = createAsyncThunk(
  'integrations/fetchSyncStatus',
  async (integrationId: string) => {
    return await integrationService.getSyncStatus(integrationId);
  }
);

const integrationSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIntegrations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIntegrations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.integrations = action.payload;
      })
      .addCase(fetchIntegrations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch integrations';
      })
      .addCase(fetchIntegrationById.fulfilled, (state, action) => {
        state.currentIntegration = action.payload;
      })
      .addCase(saveIntegration.fulfilled, (state, action) => {
        const index = state.integrations.findIndex(i => i.id === action.payload.id);
        if (index >= 0) {
          state.integrations[index] = action.payload;
        } else {
          state.integrations.push(action.payload);
        }
        state.currentIntegration = action.payload;
      })
      .addCase(deleteIntegration.fulfilled, (state, action) => {
        state.integrations = state.integrations.filter(i => i.id !== action.payload);
        if (state.currentIntegration?.id === action.payload) {
          state.currentIntegration = null;
        }
      })
      .addCase(syncProduct.fulfilled, (state, action) => {
        state.syncStatus.push(action.payload);
      })
      .addCase(fetchSyncStatus.fulfilled, (state, action) => {
        state.syncStatus = action.payload;
      });
  },
});

export default integrationSlice.reducer; 
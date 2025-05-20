import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface PurchaseOrder {
  id: string;
  vendorId: string;
  supplierId: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  deliveryDate: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface PurchaseOrderItem {
  id: string;
  productId?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface PurchaseOrderInput {
  supplier: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  deliveryDate: Date;
  shippingMethod: string;
  paymentMethod: string;
  notes?: string;
}

interface PurchaseState {
  orders: PurchaseOrder[];
  currentOrder: PurchaseOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PurchaseState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const fetchOrderById = createAsyncThunk(
  'purchase/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await new Promise<PurchaseOrder>((resolve) => {
        setTimeout(() => {
          resolve({
            id: orderId,
            vendorId: '123',
            supplierId: '456',
            items: [
              {
                id: '1',
                productId: 'prod1',
                name: 'Wireless Earbuds',
                quantity: 5,
                unitPrice: 50,
                totalPrice: 250
              }
            ],
            totalAmount: 250,
            status: 'pending',
            paymentStatus: 'pending',
            paymentMethod: 'bank_transfer',
            deliveryDate: '2024-03-15',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to fetch order');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'purchase/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return orderId;
    } catch (error) {
      return rejectWithValue('Failed to cancel order');
    }
  }
);

export const trackShipment = createAsyncThunk(
  'purchase/trackShipment',
  async (trackingNumber: string, { rejectWithValue }) => {
    try {
      return await new Promise<{ status: string; location: string; estimatedDelivery: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            status: 'in_transit',
            location: 'Distribution Center',
            estimatedDelivery: '2024-03-15'
          });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to track shipment');
    }
  }
);
export const fetchOrders = createAsyncThunk(
  'purchase/fetchOrders',
  async (page: number, { rejectWithValue }) => {
    try {
      // Simulate paginated API call
      return await new Promise<PurchaseOrder[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: `${page}-001`,
              vendorId: '123',
              supplierId: 'Supplier A',
              items: [],
              totalAmount: 100,
              status: 'pending',
              paymentStatus: 'paid',
              paymentMethod: 'Bank Transfer',
              deliveryDate: '2024-03-10',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ]);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'purchase/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      // Simulate delete
      await new Promise(resolve => setTimeout(resolve, 500));
      return orderId;
    } catch (error) {
      return rejectWithValue("Failed to delete order");
    }
  }
);

export const savePurchaseOrder = createAsyncThunk(
  'purchase/savePurchaseOrder',
  async (data: PurchaseOrderInput, { rejectWithValue }) => {
    try {
      // Simulated save
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: Date.now().toString(),
        vendorId: 'vendor123',
        supplierId: 'supplier123',
        items: data.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.quantity * item.price
        })),
        totalAmount: data.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: data.paymentMethod,
        deliveryDate: data.deliveryDate.toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as PurchaseOrder;
    } catch (error) {
      return rejectWithValue('Failed to save order');
    }
  }
);

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        if (state.currentOrder?.id === action.payload) {
          state.currentOrder.status = 'cancelled';
        }
        const orderIndex = state.orders.findIndex(order => order.id === action.payload);
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = 'cancelled';
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(savePurchaseOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(savePurchaseOrder.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(fetchOrders.fulfilled, (state, action) => {
  state.isLoading = false;
  state.orders = action.payload;
})
.addCase(fetchOrders.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload as string;
})
.addCase(deleteOrder.fulfilled, (state, action) => {
  state.orders = state.orders.filter(order => order.id !== action.payload);
  if (state.currentOrder?.id === action.payload) {
    state.currentOrder = null;
  }
})
.addCase(deleteOrder.rejected, (state, action) => {
  state.error = action.payload as string;
});
  },
});

export const { clearCurrentOrder } = purchaseSlice.actions;
export default purchaseSlice.reducer;
export const selectOrders = (state: { purchase: PurchaseState }) => state.purchase.orders;

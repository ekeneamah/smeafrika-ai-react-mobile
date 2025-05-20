import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: string;
  vendorId: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: string;
  receipt?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ExpenseSummary {
  total: number;
  byCategory: { [key: string]: number };
  count: number;
}

interface ExpensesState {
  expenses: Expense[];
  currentExpense: Expense | null;
  summary: ExpenseSummary | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  currentExpense: null,
  summary: null,
  isLoading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (_, { rejectWithValue }) => {
    try {
      // Simulated API call
      return await new Promise<Expense[]>((resolve) => {
        setTimeout(() => {
          resolve([
            // Mock expenses data
          ]);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to fetch expenses');
    }
  }
);

export const fetchExpenseSummary = createAsyncThunk(
  'expenses/fetchExpenseSummary',
  async (_, { rejectWithValue }) => {
    try {
      // Simulated API call
      return await new Promise<ExpenseSummary>((resolve) => {
        setTimeout(() => {
          resolve({
            total: 12450,
            byCategory: {
              'Inventory': 5200,
              'Marketing': 3100,
              'Operations': 2450,
              'Others': 1700
            },
            count: 85
          });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to fetch expense summary');
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      // Simulated API call
      return await new Promise<Expense>((resolve) => {
        setTimeout(() => {
          resolve({
            ...expense,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue('Failed to create expense');
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearCurrentExpense: (state) => {
      state.currentExpense = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchExpenseSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
        if (state.summary) {
          state.summary.total += action.payload.amount;
          state.summary.count += 1;
          state.summary.byCategory[action.payload.category] = 
            (state.summary.byCategory[action.payload.category] || 0) + action.payload.amount;
        }
      });
  },
});

export const { clearCurrentExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { expenseService } from '../../services/expenseService';
import { Expense, ExpenseCategory } from '../../types/expense';

interface ExpenseState {
  expenses: Expense[];
  categories: ExpenseCategory[];
  currentExpense: Expense | null;
  stats: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  categories: [],
  currentExpense: null,
  stats: null,
  isLoading: false,
  error: null
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (page: number) => {
    return await expenseService.getExpenses(page);
  }
);

export const fetchExpenseById = createAsyncThunk(
  'expenses/fetchExpenseById',
  async (expenseId: string) => {
    return await expenseService.getExpenseById(expenseId);
  }
);

export const saveExpense = createAsyncThunk(
  'expenses/saveExpense',
  async (expenseData: Partial<Expense>) => {
    if (expenseData.id) {
      return await expenseService.updateExpense(expenseData.id, expenseData);
    }
    return await expenseService.createExpense(expenseData);
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (expenseId: string) => {
    await expenseService.deleteExpense(expenseId);
    return expenseId;
  }
);

export const fetchCategories = createAsyncThunk(
  'expenses/fetchCategories',
  async () => {
    return await expenseService.getCategories();
  }
);

export const fetchExpenseStats = createAsyncThunk(
  'expenses/fetchStats',
  async () => {
    return await expenseService.getExpenseStats();
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch expenses';
      })
      .addCase(fetchExpenseById.fulfilled, (state, action) => {
        state.currentExpense = action.payload;
      })
      .addCase(saveExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(e => e.id === action.payload.id);
        if (index >= 0) {
          state.expenses[index] = action.payload;
        } else {
          state.expenses.push(action.payload);
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchExpenseStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default expenseSlice.reducer; 
import { Expense, ExpenseCategory } from '../types/expense';

const API_URL = 'https://api.example.com/expenses';

export const expenseService = {
  async getExpenses(page: number): Promise<Expense[]> {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
  },

  async getExpenseById(id: string): Promise<Expense> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch expense');
    return response.json();
  },

  async createExpense(expenseData: Partial<Expense>): Promise<Expense> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) throw new Error('Failed to create expense');
    return response.json();
  },

  async updateExpense(id: string, expenseData: Partial<Expense>): Promise<Expense> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) throw new Error('Failed to update expense');
    return response.json();
  },

  async deleteExpense(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete expense');
  },

  async getCategories(): Promise<ExpenseCategory[]> {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getExpenseStats(): Promise<any> {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) throw new Error('Failed to fetch expense stats');
    return response.json();
  }
}; 
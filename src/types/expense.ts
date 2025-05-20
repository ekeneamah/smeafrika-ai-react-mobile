export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  attachments?: string[];
  notes?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
} 
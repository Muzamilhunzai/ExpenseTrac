export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'Housing'
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Earnings'
  | 'Cyber-Hardware'
  | 'Nutrition'
  | 'Subscriptions'
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  description: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  date: string; // ISO date string
  paymentMethod?: string;
  icon?: string;
}

export interface TransactionFilters {
  category?: TransactionCategory | 'all';
  type?: TransactionType | 'all';
  dateRange?: 'last30' | 'last90' | 'year';
  search?: string;
}

export interface PaginatedTransactions {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateTransactionPayload {
  title: string;
  description?: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  date: string;
  paymentMethod?: string;
}

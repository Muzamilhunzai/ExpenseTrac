import { simulateDelay } from './api';
import { MOCK_TRANSACTIONS } from './mockData';
import type {
  Transaction,
  TransactionFilters,
  PaginatedTransactions,
  CreateTransactionPayload,
} from '@/types/transaction';

/**
 * Fetch paginated transactions with optional filters.
 * Replace body with: return apiClient.get<PaginatedTransactions>(`/transactions?page=${page}&...`);
 */
export async function getTransactions(
  filters?: TransactionFilters,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedTransactions> {
  await simulateDelay();

  let filtered = [...MOCK_TRANSACTIONS];

  if (filters?.category && filters.category !== 'all') {
    filtered = filtered.filter((t) => t.category === filters.category);
  }

  if (filters?.type && filters.type !== 'all') {
    filtered = filtered.filter((t) => t.type === filters.type);
  }

  if (filters?.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return { data, total, page, pageSize, totalPages };
}

/**
 * Create a new transaction.
 * Replace body with: return apiClient.post<Transaction, CreateTransactionPayload>('/transactions', payload);
 */
export async function createTransaction(
  payload: CreateTransactionPayload
): Promise<Transaction> {
  await simulateDelay(800);
  const newTransaction: Transaction = {
    ...payload,
    id: `txn_${Date.now()}`,
    description: payload.description ?? '',
  };
  // In real implementation, the backend would persist this
  MOCK_TRANSACTIONS.unshift(newTransaction);
  return newTransaction;
}

/**
 * Delete a transaction by ID.
 * Replace body with: return apiClient.delete<void>(`/transactions/${id}`);
 */
export async function deleteTransaction(id: string): Promise<void> {
  await simulateDelay(500);
  const index = MOCK_TRANSACTIONS.findIndex((t) => t.id === id);
  if (index !== -1) {
    MOCK_TRANSACTIONS.splice(index, 1);
  }
}

/**
 * Update an existing transaction.
 * Replace body with: return apiClient.put<Transaction>(`/transactions/${id}`, payload);
 */
export async function updateTransaction(
  id: string,
  payload: Partial<CreateTransactionPayload>
): Promise<Transaction> {
  await simulateDelay(700);
  const index = MOCK_TRANSACTIONS.findIndex((t) => t.id === id);
  if (index === -1) throw new Error('Transaction not found');

  const updated = { ...MOCK_TRANSACTIONS[index], ...payload };
  MOCK_TRANSACTIONS[index] = updated;
  return updated;
}

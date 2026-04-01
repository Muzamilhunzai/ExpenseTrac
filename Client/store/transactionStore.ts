'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Transaction, TransactionFilters } from '@/types/transaction';

interface TransactionState {
  transactions: Transaction[];
  filters: TransactionFilters;
  currentPage: number;
  totalCount: number;

  // Actions
  setTransactions: (transactions: Transaction[], total: number) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, data: Partial<Transaction>) => void;
  removeTransaction: (id: string) => void;
  setFilters: (filters: Partial<TransactionFilters>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
}

const DEFAULT_FILTERS: TransactionFilters = {
  category: 'all',
  type: 'all',
  dateRange: 'last30',
  search: '',
};

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set) => ({
      transactions: [],
      filters: DEFAULT_FILTERS,
      currentPage: 1,
      totalCount: 0,

      setTransactions: (transactions, total) =>
        set({ transactions, totalCount: total }),

      addTransaction: (transaction) =>
        set((s) => ({
          transactions: [transaction, ...s.transactions],
          totalCount: s.totalCount + 1,
        })),

      updateTransaction: (id, data) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),

      removeTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
          totalCount: s.totalCount - 1,
        })),

      setFilters: (filters) =>
        set((s) => ({
          filters: { ...s.filters, ...filters },
          currentPage: 1,
        })),

      resetFilters: () => set({ filters: DEFAULT_FILTERS, currentPage: 1 }),

      setPage: (page) => set({ currentPage: page }),
    }),
    { name: 'transaction-store' }
  )
);

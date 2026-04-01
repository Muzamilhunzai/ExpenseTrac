'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '@/services/transactionService';
import { useTransactionStore } from '@/store/transactionStore';
import { useUIStore } from '@/store/uiStore';
import type { CreateTransactionPayload } from '@/types/transaction';
import { PAGE_SIZE } from '@/constants';

export function useTransactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    transactions,
    filters,
    currentPage,
    totalCount,
    setTransactions,
    addTransaction,
    removeTransaction,
    updateTransaction: updateInStore,
    setPage,
  } = useTransactionStore();

  const { addNotification } = useUIStore();

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTransactions(filters, currentPage, PAGE_SIZE);
      setTransactions(result.data, result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage, setTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleCreate = useCallback(
    async (payload: CreateTransactionPayload) => {
      setIsSubmitting(true);
      try {
        const newTx = await createTransaction(payload);
        addTransaction(newTx);
        addNotification({ type: 'success', title: 'Transaction logged successfully' });
        return newTx;
      } catch (err) {
        addNotification({ type: 'error', title: 'Failed to create transaction' });
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [addTransaction, addNotification]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteTransaction(id);
        removeTransaction(id);
        addNotification({ type: 'success', title: 'Transaction deleted' });
      } catch {
        addNotification({ type: 'error', title: 'Failed to delete transaction' });
      }
    },
    [removeTransaction, addNotification]
  );

  const handleUpdate = useCallback(
    async (id: string, payload: Partial<CreateTransactionPayload>) => {
      setIsSubmitting(true);
      try {
        const updated = await updateTransaction(id, payload);
        updateInStore(id, updated);
        addNotification({ type: 'success', title: 'Transaction updated' });
        return updated;
      } catch {
        addNotification({ type: 'error', title: 'Failed to update transaction' });
        throw new Error('Update failed');
      } finally {
        setIsSubmitting(false);
      }
    },
    [updateInStore, addNotification]
  );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return {
    transactions,
    isLoading,
    isSubmitting,
    error,
    currentPage,
    totalPages,
    totalCount,
    setPage,
    refresh: fetchTransactions,
    create: handleCreate,
    remove: handleDelete,
    update: handleUpdate,
  };
}

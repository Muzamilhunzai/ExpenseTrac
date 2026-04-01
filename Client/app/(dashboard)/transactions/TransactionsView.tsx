'use client';

import React, { useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionStore } from '@/store/transactionStore';
import { useUIStore } from '@/store/uiStore';
import { TransactionTable } from '@/features/transactions/components/TransactionTable';
import { TransactionFilters } from '@/features/transactions/components/TransactionFilters';
import { Pagination } from '@/features/transactions/components/Pagination';
import { Button } from '@/components/ui/Button';
import { PAGE_SIZE } from '@/constants';

export function TransactionsView() {
  const {
    transactions,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    setPage,
    refresh,
    remove,
  } = useTransactions();

  const { openTransactionModal } = useUIStore();

  const handleEdit = useCallback(
    (id: string) => openTransactionModal(id),
    [openTransactionModal]
  );

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tighter">
            Transactions
          </h1>
          <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mt-1">
            System Log: All financial data-streams
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<PlusCircle size={16} />}
          onClick={() => openTransactionModal()}
        >
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <TransactionFilters totalBurnRate={totalExpenses} />

      {/* Table */}
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onDelete={remove}
        onAdd={() => openTransactionModal()}
        onRetry={refresh}
      />

      {/* Pagination */}
      {!isLoading && totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

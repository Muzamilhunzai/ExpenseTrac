'use client';

import React, { memo, useCallback } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TransactionRowSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { CATEGORY_COLORS } from '@/constants';
import type { Transaction } from '@/types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  onRetry?: () => void;
}

const COLUMN_HEADERS = ['Date', 'Title', 'Category', 'Amount', 'Type', ''];

export const TransactionTable = memo(function TransactionTable({
  transactions,
  isLoading,
  error,
  onEdit,
  onDelete,
  onAdd,
  onRetry,
}: TransactionTableProps) {
  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      onDelete?.(id);
    },
    [onDelete]
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      onEdit?.(id);
    },
    [onEdit]
  );

  if (error) {
    return <ErrorDisplay message={error} onRetry={onRetry} />;
  }

  return (
    <div className="glass-panel neon-border-primary rounded-xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            {COLUMN_HEADERS.map((h) => (
              <th
                key={h}
                className="px-6 py-4 font-headline text-xs uppercase tracking-widest text-on-surface-variant"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-label">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={6} className="p-0">
                  <TransactionRowSkeleton />
                </td>
              </tr>
            ))
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <EmptyState
                  title="No transactions found"
                  description="Try adjusting your filters or add a new transaction."
                  action={onAdd ? { label: 'Add Transaction', onClick: onAdd } : undefined}
                />
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                onEdit={(e) => handleEdit(e, tx.id)}
                onDelete={(e) => handleDelete(e, tx.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const TransactionRow = memo(function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}: TransactionRowProps) {
  const isIncome = transaction.type === 'income';
  const categoryColor = CATEGORY_COLORS[transaction.category] ?? '#5a5068';

  return (
    <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
      <td className="px-6 py-4 text-sm text-on-surface-variant">
        {formatDate(transaction.date, 'short')}
      </td>
      <td className="px-6 py-4 font-semibold text-on-surface text-sm">
        {transaction.title}
      </td>
      <td className="px-6 py-4">
        <span
          className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded"
          style={{
            color: categoryColor,
            borderColor: `${categoryColor}40`,
            backgroundColor: `${categoryColor}15`,
          }}
        >
          {transaction.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`font-headline font-bold text-sm ${
            isIncome ? 'text-secondary' : 'text-primary'
          }`}
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </span>
      </td>
      <td className="px-6 py-4">
        <Badge variant={isIncome ? 'secondary' : 'primary'} pulse>
          {transaction.type}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 text-on-surface-variant hover:text-secondary transition-colors"
            aria-label="Edit transaction"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Delete transaction"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
});

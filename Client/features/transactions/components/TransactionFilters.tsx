'use client';

import React, { memo } from 'react';
import { Filter, Calendar, CreditCard } from 'lucide-react';
import { useTransactionStore } from '@/store/transactionStore';
import { TRANSACTION_CATEGORIES, DATE_RANGE_OPTIONS } from '@/constants';
import { formatCurrency } from '@/lib/formatters';

interface TransactionFiltersProps {
  totalBurnRate?: number;
}

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  ...TRANSACTION_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

export const TransactionFilters = memo(function TransactionFilters({
  totalBurnRate = 0,
}: TransactionFiltersProps) {
  const { filters, setFilters } = useTransactionStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <FilterPanel icon={<Filter size={16} className="text-secondary" />}>
        <select
          className="bg-transparent border-none focus:ring-0 text-sm font-label text-on-surface w-full cursor-pointer"
          value={filters.category ?? 'all'}
          onChange={(e) => setFilters({ category: e.target.value as never })}
        >
          {categoryOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface">
              {o.label}
            </option>
          ))}
        </select>
      </FilterPanel>

      <FilterPanel icon={<Calendar size={16} className="text-secondary" />}>
        <select
          className="bg-transparent border-none focus:ring-0 text-sm font-label text-on-surface w-full cursor-pointer"
          value={filters.dateRange ?? 'last30'}
          onChange={(e) => setFilters({ dateRange: e.target.value as never })}
        >
          {DATE_RANGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface">
              {o.label}
            </option>
          ))}
        </select>
      </FilterPanel>

      <FilterPanel icon={<CreditCard size={16} className="text-secondary" />}>
        <select
          className="bg-transparent border-none focus:ring-0 text-sm font-label text-on-surface w-full cursor-pointer"
          value={filters.type ?? 'all'}
          onChange={(e) => setFilters({ type: e.target.value as never })}
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface">
              {o.label}
            </option>
          ))}
        </select>
      </FilterPanel>

      <div className="glass-panel neon-border-primary p-4 rounded-xl flex flex-col justify-center">
        <div className="text-[10px] text-on-surface-variant font-label uppercase tracking-widest mb-1">
          Total Burn Rate
        </div>
        <div className="text-xl font-headline font-bold text-primary neon-text-primary">
          {formatCurrency(totalBurnRate)}
        </div>
      </div>
    </div>
  );
});

function FilterPanel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel neon-border-primary p-4 rounded-xl flex items-center gap-3">
      {icon}
      {children}
    </div>
  );
}

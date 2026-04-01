'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { History, Coffee, Home, Dumbbell, Banknote, ShoppingCart } from 'lucide-react';
import { TransactionRowSkeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/types/transaction';

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  coffee: Coffee,
  home: Home,
  fitness_center: Dumbbell,
  payments: Banknote,
  shopping_cart: ShoppingCart,
};

function TxIcon({ icon }: { icon?: string }) {
  const Icon = (icon && iconMap[icon]) ? iconMap[icon] : Banknote;
  return <Icon size={18} />;
}

export const RecentTransactions = memo(function RecentTransactions({
  transactions,
  isLoading,
}: RecentTransactionsProps) {
  return (
    <div className="bg-surface-container/40 backdrop-blur-sm border border-outline-variant/30 rounded-4xl p-8 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-headline font-bold text-xl text-on-surface">Recent Logs</h4>
        <History size={18} className="text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors" />
      </div>

      <div className="space-y-5 flex-1">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <TransactionRowSkeleton key={i} />)
          : transactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between group cursor-pointer hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform',
                        isIncome
                          ? 'bg-secondary/20 border-secondary/40 text-secondary'
                          : 'bg-primary/10 border-primary/20 text-primary'
                      )}
                    >
                      <TxIcon icon={tx.icon} />
                    </div>
                    <div>
                      <p className="text-on-surface font-semibold text-sm">{tx.title}</p>
                      <p className="text-on-surface-variant text-xs font-label">{tx.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        'font-bold text-sm',
                        isIncome ? 'text-secondary' : 'text-primary'
                      )}
                    >
                      {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-outline text-[10px] font-label">
                      {formatDate(tx.date, 'relative')}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>

      <Link
        href="/transactions"
        className="w-full mt-6 py-3 text-xs font-label text-on-surface-variant hover:text-secondary border-t border-outline-variant/30 transition-colors text-center block"
      >
        VIEW ALL TRANSACTIONS →
      </Link>
    </div>
  );
});

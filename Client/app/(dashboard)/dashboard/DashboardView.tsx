'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { useUIStore } from '@/store/uiStore';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { SpendingChart } from '@/features/dashboard/components/SpendingChart';
import { RecentTransactions } from '@/features/dashboard/components/RecentTransactions';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { Button } from '@/components/ui/Button';
import { MOCK_ANALYTICS } from '@/services/mockData';

export function DashboardView() {
  const { summary, recentTransactions, isLoading, error, refresh } = useDashboard();
  const { openTransactionModal } = useUIStore();

  if (error) return <ErrorDisplay message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tighter text-on-surface uppercase">
            Executive Terminal
          </h2>
          <p className="text-on-surface-variant font-label text-sm mt-1">
            System health:{' '}
            <span className="text-secondary neon-text-secondary">OPTIMIZED</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Export CSV</Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={14} />}
            onClick={() => openTransactionModal()}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Node Liquidity"
          value={summary?.totalBalance ?? 0}
          changePercent={summary?.balanceChangePercent}
          glow="primary"
          isLoading={isLoading}
        />
        <StatCard
          label="Inbound Stream"
          value={summary?.monthlyIncome ?? 0}
          changeLabel="Direct Deposit Confirmed"
          glow="secondary"
          isLoading={isLoading}
        />
        <StatCard
          label="Outbound Burn"
          value={summary?.monthlyExpenses ?? 0}
          changeLabel="41% of monthly allocation"
          glow="tertiary"
          isLoading={isLoading}
          isWarning
        />
      </div>

      {/* Charts + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <SpendingChart
            data={MOCK_ANALYTICS.monthlyTrend}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-4">
          <RecentTransactions
            transactions={recentTransactions}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

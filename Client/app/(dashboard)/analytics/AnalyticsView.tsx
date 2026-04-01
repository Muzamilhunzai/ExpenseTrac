'use client';

import React from 'react';
import { TrendingUp, Home, ArrowRight } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import {
  MonthlyTrendChart,
  CategoryPieChart,
  TopExpendituresChart,
} from '@/features/analytics/components/AnalyticsCharts';
import { AnomalyPanel } from '@/features/analytics/components/AnomalyPanel';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import type { DateRangeFilter } from '@/types/analytics';

const DATE_FILTERS: { value: DateRangeFilter; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export function AnalyticsView() {
  const { data, anomalies, range, setRange, isLoading, error, refresh } = useAnalytics();

  if (error) return <ErrorDisplay message={error} onRetry={refresh} />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline text-3xl font-bold text-on-surface mb-1">
            Financial Analytics
          </h2>
          <p className="font-label text-on-surface-variant text-sm">
            Node ID: NL-992-X · Last update: 2m ago
          </p>
        </div>
        <div className="flex p-1 bg-surface-container rounded-lg border border-outline-variant">
          {DATE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setRange(f.value)}
              className={`px-4 py-1.5 font-label text-xs font-bold rounded-md transition-all ${
                range === f.value
                  ? 'bg-primary text-on-primary shadow-neon-primary-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          {/* Avg Spend Card */}
          <div className="bg-surface-container p-6 neon-border-primary relative overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-sm" />
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">
              Avg. Daily Spending
            </p>
            {isLoading ? (
              <Skeleton className="h-10 w-40 mb-4" />
            ) : (
              <div className="flex items-end gap-2 mb-4">
                <span className="font-headline text-4xl font-extrabold text-on-surface">
                  {formatCurrency(data?.avgDailySpending ?? 0)}
                </span>
                <span className="font-label text-secondary text-sm mb-1 neon-text-secondary">
                  {formatPercent(data?.avgDailyChangePercent ?? 0)}
                </span>
              </div>
            )}
            <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full shadow-[0_0_8px_#ff2d78] transition-all duration-700"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          {/* Highest Category */}
          <div className="bg-surface-container p-6 neon-border-secondary relative overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary rounded-sm" />
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
              Highest Category
            </p>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Home size={20} />
                </div>
                <div>
                  <span className="font-headline text-2xl font-bold text-on-surface leading-tight">
                    {data?.highestCategory}
                  </span>
                  <p className="font-label text-on-surface-variant text-xs">
                    {data?.highestCategoryPercent}% of total volume
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Top Expenditures */}
          <div className="bg-surface-container-highest/50 p-6 border border-outline-variant rounded-lg">
            <h3 className="font-headline text-sm font-bold text-on-surface mb-6 uppercase tracking-wider">
              Top Expenditures
            </h3>
            <TopExpendituresChart
              data={data?.topExpenditures ?? []}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          <MonthlyTrendChart data={data?.monthlyTrend ?? []} isLoading={isLoading} />

          <div className="grid grid-cols-2 gap-6">
            <CategoryPieChart data={data?.categoryBreakdown ?? []} isLoading={isLoading} />

            {/* Efficiency Card */}
            <div className="bg-surface-container p-6 border border-outline-variant rounded-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-headline text-sm font-bold text-primary mb-1 uppercase tracking-widest">
                  Efficiency Score
                </h3>
                {isLoading ? (
                  <Skeleton className="h-12 w-24 mb-3" />
                ) : (
                  <>
                    <p className="font-headline text-4xl font-extrabold text-on-surface mb-2">
                      {data?.efficiencyScore.toFixed(1)}
                    </p>
                    <p className="font-label text-xs text-on-surface-variant mb-6">
                      Spending is {data?.efficiencyChangePercent}% more optimized than last month.
                    </p>
                  </>
                )}
                <button className="flex items-center gap-2 text-xs font-label text-secondary hover:underline transition-colors">
                  View detailed report
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnomalyPanel anomalies={anomalies} isLoading={isLoading} />
    </div>
  );
}

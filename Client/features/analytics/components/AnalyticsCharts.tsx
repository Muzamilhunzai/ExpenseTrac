'use client';

import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import type { CategoryBreakdown, SpendingDataPoint } from '@/types/analytics';

/* ─── Monthly Trend ─── */
interface MonthlyTrendChartProps {
  data: SpendingDataPoint[];
  isLoading?: boolean;
}

export const MonthlyTrendChart = memo(function MonthlyTrendChart({
  data,
  isLoading,
}: MonthlyTrendChartProps) {
  return (
    <div className="bg-surface-container neon-border-primary p-6 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          Monthly Spending Trends
        </h3>
        <div className="flex gap-4 text-[10px] font-label text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-primary inline-block" />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-outline inline-block" />
            Forecast
          </span>
        </div>
      </div>
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff2d78" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ff2d78" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#5a5068', fontSize: 10, fontFamily: 'Space Grotesk' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#5a5068', fontSize: 10, fontFamily: 'Space Grotesk' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={40}
            />
            <Tooltip
              contentStyle={{
                background: '#0f0f1a',
                border: '1px solid rgba(255,45,120,0.3)',
                borderRadius: 8,
                fontFamily: 'Space Grotesk',
              }}
              formatter={(v: number) => [formatCurrency(v), 'Spending']}
              labelStyle={{ color: '#a098b0', fontSize: 10 }}
              itemStyle={{ color: '#ff2d78' }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#ff2d78"
              strokeWidth={2.5}
              fill="url(#trendGrad)"
              dot={{ fill: '#0a0a12', r: 4, stroke: '#ff2d78', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ff2d78' }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,45,120,0.5))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

/* ─── Category Pie ─── */
interface CategoryPieChartProps {
  data: CategoryBreakdown[];
  isLoading?: boolean;
}

export const CategoryPieChart = memo(function CategoryPieChart({
  data,
  isLoading,
}: CategoryPieChartProps) {
  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="bg-surface-container neon-border-secondary p-6 rounded-lg">
      <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2 mb-6">
        <PieIcon size={18} className="text-secondary" />
        Spending Category
      </h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-24 h-24 rounded-full border-4 border-outline-variant skeleton-shimmer" />
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 shrink-0">
            <PieChart width={128} height={128}>
              <Pie
                data={data}
                cx={60}
                cy={60}
                innerRadius={44}
                outerRadius={60}
                dataKey="amount"
                strokeWidth={0}
              >
                {data.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} style={{ filter: `drop-shadow(0 0 4px ${entry.color})` }} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-headline text-xs font-bold text-on-surface">
                ${(total / 1000).toFixed(1)}k
              </span>
              <span className="font-label text-[8px] text-on-surface-variant">TOTAL</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {data.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                />
                <span className="font-label text-xs text-on-surface-variant">
                  {item.category} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

/* ─── Top Expenditures Bar ─── */
interface TopExpendituresChartProps {
  data: Array<{ label: string; amount: number; color: string }>;
  isLoading?: boolean;
}

export const TopExpendituresChart = memo(function TopExpendituresChart({
  data,
  isLoading,
}: TopExpendituresChartProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-surface-container-high skeleton-shimmer" />
            <div className="flex-1 h-2 rounded bg-surface-container-high skeleton-shimmer" />
            <div className="w-12 h-3 rounded bg-surface-container-high skeleton-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.amount));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
              />
              <span className="font-label text-sm text-on-surface">{item.label}</span>
            </div>
            <span className="font-label font-bold text-on-surface text-sm">
              {formatCurrency(item.amount, 'USD', true)}
            </span>
          </div>
          <div className="h-1 w-full bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(item.amount / max) * 100}%`,
                background: item.color,
                boxShadow: `0 0 6px ${item.color}`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

'use client';

import React, { memo, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartSkeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/formatters';

interface SpendingChartProps {
  data: Array<{ label: string; amount: number }>;
  isLoading?: boolean;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-secondary/50 px-3 py-2 rounded-lg shadow-neon-secondary-sm">
      <p className="text-on-surface-variant text-[10px] font-label uppercase tracking-wider">{label}</p>
      <p className="text-secondary font-bold text-sm font-headline">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export const SpendingChart = memo(function SpendingChart({
  data,
  isLoading = false,
}: SpendingChartProps) {
  const chartData = useMemo(() => data, [data]);

  return (
    <div className="bg-surface-container/40 backdrop-blur-sm border border-outline-variant/30 rounded-4xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-headline font-bold text-xl text-on-surface">Spending Trends</h4>
        <select className="bg-background border border-outline text-on-surface-variant text-xs font-label rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-secondary/50">
          <option>Last 30 Cycles</option>
          <option>Last 90 Cycles</option>
          <option>Full Orbit</option>
        </select>
      </div>

      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ffcc" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00ffcc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
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
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#00ffcc"
              strokeWidth={2.5}
              fill="url(#spendingGradient)"
              dot={{ fill: '#00ffcc', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#00ffcc', stroke: '#0a0a12', strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,204,0.5))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

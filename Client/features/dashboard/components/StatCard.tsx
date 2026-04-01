import React, { memo } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { StatCardSkeleton } from '@/components/ui/Skeleton';

type GlowColor = 'primary' | 'secondary' | 'tertiary';

interface StatCardProps {
  label: string;
  value: number;
  changePercent?: number;
  changeLabel?: string;
  glow: GlowColor;
  isLoading?: boolean;
  isWarning?: boolean;
}

const glowConfig: Record<GlowColor, { border: string; blob: string; accent: string }> = {
  primary: {
    border: 'border-primary/20 hover:border-primary/40',
    blob: 'bg-primary/10 group-hover:bg-primary/20',
    accent: 'text-primary',
  },
  secondary: {
    border: 'border-secondary/20 hover:border-secondary/40',
    blob: 'bg-secondary/10 group-hover:bg-secondary/20',
    accent: 'text-secondary',
  },
  tertiary: {
    border: 'border-tertiary/20 hover:border-tertiary/40',
    blob: 'bg-tertiary/10 group-hover:bg-tertiary/20',
    accent: 'text-tertiary',
  },
};

export const StatCard = memo(function StatCard({
  label,
  value,
  changePercent,
  changeLabel,
  glow,
  isLoading = false,
  isWarning = false,
}: StatCardProps) {
  if (isLoading) return <StatCardSkeleton />;

  const config = glowConfig[glow];
  const isPositive = (changePercent ?? 0) >= 0;

  return (
    <div
      className={cn(
        'bg-surface-container/60 backdrop-blur-xl border p-6 rounded-4xl relative overflow-hidden group transition-all duration-300',
        config.border
      )}
    >
      {/* Decorative blob */}
      <div
        className={cn(
          'absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl transition-all duration-500',
          config.blob
        )}
      />

      <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-3 relative z-10">
        {label}
      </p>

      <h3 className="text-4xl font-headline font-black text-on-surface relative z-10">
        {formatCurrency(value)}
      </h3>

      {/* Footer badge */}
      <div className={cn('mt-4 flex items-center gap-2 font-label text-sm relative z-10', isWarning ? 'text-primary' : 'text-secondary')}>
        {isWarning ? (
          <AlertTriangle size={14} />
        ) : isPositive ? (
          <TrendingUp size={14} />
        ) : (
          <TrendingDown size={14} />
        )}
        <span className={isWarning ? 'neon-text-primary' : ''}>
          {changePercent !== undefined
            ? `${formatPercent(changePercent)} vs last cycle`
            : changeLabel}
        </span>
      </div>
    </div>
  );
});

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded bg-surface-container-high skeleton-shimmer',
        className
      )}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface-container/60 border border-outline-variant/30 p-6 rounded-4xl">
      <Skeleton className="h-3 w-28 mb-4" />
      <Skeleton className="h-10 w-36 mb-4" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function TransactionRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-3.5 w-16 ml-auto" />
        <Skeleton className="h-2.5 w-12 ml-auto" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="h-64 flex items-end gap-2 px-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton
          key={i}
          className="flex-1 rounded-t"
          style={{ height: `${Math.random() * 60 + 20}%` }}
        />
      ))}
    </div>
  );
}

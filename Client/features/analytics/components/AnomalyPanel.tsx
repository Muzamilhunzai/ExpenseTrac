import React, { memo } from 'react';
import { AlertTriangle, TrendingDown, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Anomaly } from '@/types/analytics';

interface AnomalyPanelProps {
  anomalies: Anomaly[];
  isLoading?: boolean;
}

const anomalyIcons = {
  warning: <AlertTriangle size={16} className="text-tertiary shrink-0" />,
  positive: <TrendingDown size={16} className="text-secondary shrink-0" />,
  info: <Info size={16} className="text-on-surface-variant shrink-0" />,
};

export const AnomalyPanel = memo(function AnomalyPanel({
  anomalies,
  isLoading,
}: AnomalyPanelProps) {
  return (
    <div className="mt-8 bg-surface-container neon-border-primary p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline text-lg font-bold text-on-surface uppercase tracking-tighter">
          Anomaly Detection
        </h3>
        <span className="px-2.5 py-1 bg-primary/10 text-primary font-label text-[10px] font-bold border border-primary/20 rounded">
          SYSTEMS NOMINAL
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 bg-surface-container-low border border-outline-variant rounded-lg space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-36" />
              </div>
            ))
          : anomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className={`flex gap-4 p-4 bg-surface-container-low border border-outline-variant rounded-lg ${
                  anomaly.type === 'info' ? 'opacity-50' : ''
                }`}
              >
                {anomalyIcons[anomaly.type]}
                <div>
                  <p className="font-label text-xs font-bold text-on-surface">{anomaly.title}</p>
                  <p className="font-label text-[10px] text-on-surface-variant mt-0.5">
                    {anomaly.description}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
});

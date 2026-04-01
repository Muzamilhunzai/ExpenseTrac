'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAnalyticsData, getAnomalies } from '@/services/analyticsService';
import type { AnalyticsData, Anomaly, DateRangeFilter } from '@/types/analytics';

export function useAnalytics(initialRange: DateRangeFilter = 'monthly') {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [range, setRange] = useState<DateRangeFilter>(initialRange);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [analyticsData, anomalyData] = await Promise.all([
        getAnalyticsData(range),
        getAnomalies(),
      ]);
      setData(analyticsData);
      setAnomalies(anomalyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, anomalies, range, setRange, isLoading, error, refresh: fetchData };
}

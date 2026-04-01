'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getDashboardSummary,
  getRecentTransactions,
} from '@/services/dashboardService';
import type { DashboardSummary } from '@/types/analytics';
import type { Transaction } from '@/types/transaction';

interface UseDashboardReturn {
  summary: DashboardSummary | null;
  recentTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useDashboard(): UseDashboardReturn {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [summaryData, txData] = await Promise.all([
        getDashboardSummary(),
        getRecentTransactions(),
      ]);
      setSummary(summaryData);
      setRecentTransactions(txData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { summary, recentTransactions, isLoading, error, refresh: fetchData };
}

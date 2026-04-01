import { simulateDelay } from './api';
import {
  MOCK_DASHBOARD_SUMMARY,
  MOCK_RECENT_TRANSACTIONS,
  MOCK_TRANSACTIONS,
} from './mockData';
import type { DashboardSummary } from '@/types/analytics';
import type { Transaction } from '@/types/transaction';

/**
 * Fetch dashboard summary stats.
 * Replace body with: return apiClient.get<DashboardSummary>('/dashboard/summary');
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  await simulateDelay();
  return MOCK_DASHBOARD_SUMMARY;
}

/**
 * Fetch recent transactions for dashboard widget.
 * Replace body with: return apiClient.get<Transaction[]>('/transactions/recent');
 */
export async function getRecentTransactions(): Promise<Transaction[]> {
  await simulateDelay(400);
  return MOCK_RECENT_TRANSACTIONS;
}

/**
 * Fetch spending trend data for chart.
 */
export async function getSpendingTrendData(): Promise<
  Array<{ label: string; amount: number }>
> {
  await simulateDelay(500);
  return MOCK_TRANSACTIONS.slice(0, 6).map((t, i) => ({
    label: `Cycle ${i + 1}`,
    amount: t.amount,
  }));
}

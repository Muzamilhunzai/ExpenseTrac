export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  balanceChangePercent: number;
  savingsGoalProgress: number;
}

export interface SpendingDataPoint {
  label: string;
  amount: number;
  month?: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface AnalyticsData {
  avgDailySpending: number;
  avgDailyChangePercent: number;
  highestCategory: string;
  highestCategoryPercent: number;
  topExpenditures: Array<{ label: string; amount: number; color: string }>;
  monthlyTrend: SpendingDataPoint[];
  categoryBreakdown: CategoryBreakdown[];
  efficiencyScore: number;
  efficiencyChangePercent: number;
}

export interface Anomaly {
  id: string;
  type: 'warning' | 'positive' | 'info';
  title: string;
  description: string;
}

export type DateRangeFilter = 'weekly' | 'monthly' | 'yearly';

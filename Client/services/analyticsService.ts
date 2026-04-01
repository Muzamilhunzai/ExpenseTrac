import { simulateDelay } from './api';
import { MOCK_ANALYTICS, MOCK_ANOMALIES } from './mockData';
import type { AnalyticsData, Anomaly, DateRangeFilter } from '@/types/analytics';

/**
 * Fetch full analytics data.
 * Replace body with: return apiClient.get<AnalyticsData>(`/analytics?range=${range}`);
 */
export async function getAnalyticsData(
  _range: DateRangeFilter = 'monthly'
): Promise<AnalyticsData> {
  await simulateDelay(700);
  return MOCK_ANALYTICS;
}

/**
 * Fetch spending anomalies.
 * Replace body with: return apiClient.get<Anomaly[]>('/analytics/anomalies');
 */
export async function getAnomalies(): Promise<Anomaly[]> {
  await simulateDelay(400);
  return MOCK_ANOMALIES;
}

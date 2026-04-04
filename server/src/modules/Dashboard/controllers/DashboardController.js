import totalnodeliquidity from '../services/totalnodeliquidityService.js';
import inboundStream from '../services/inboundStreamService.js';
import outboundStream from '../services/outboundStreamService.js';
import recentLogs from '../services/recentLogsService.js';
import SpendingTrends from '../services/spendingTrendsService.js';

export const getDashboardAnalytics = async (userId, timeRange = 'monthly') => {
  if (!userId) {
    throw new Error('userId is required for analytics');
  }

  // Run everything in parallel for maximum performance (no waterfall)
  const [totalLiquidity, inbound, outbound, logs, trends] = await Promise.all([
    totalnodeliquidity({ userId, timeRange }),
    inboundStream({ userId, timeRange }),
    outboundStream({ userId, timeRange }),
    recentLogs({ userId, timeRange }),
    SpendingTrends({ userId, timeRange }), // note: your default export name
  ]);

  // Cross-service calculations go here (single responsibility)
  const efficiencyScore = calculateEfficiencyScore(inbound, outbound);

  return {
    totalNodeLiquidity: totalLiquidity,     // normalized name for frontend
    inboundStream: inbound,
    outboundStream: outbound,
    recentLogs: logs,
    spendingTrends: trends,
    efficiencyScore,
    summary: {
      totalIncome: inbound?.total ?? 0,
      totalExpense: outbound?.total ?? 0,
      netFlow: (inbound?.total ?? 0) - (outbound?.total ?? 0),
    },
  };
};

// Small private helper — stays inside this service
function calculateEfficiencyScore(inbound, outbound) {
  const total = (inbound?.total ?? 0) + (outbound?.total ?? 0);
  return total > 0 ? Math.round(((inbound?.total ?? 0) / total) * 100) : 0;
}
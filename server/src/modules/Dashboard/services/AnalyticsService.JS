// services/AnalyticsService.js
import totalnodeliquidity from './totalnodeliquidityService.js';
import inboundStream from './inboundStreamService.js';
import outboundStream from './outboundStreamService.js';
import recentLogs from './recentLogsService.js';
import SpendingTrends from './spendingTrendsService.js';

export const getDashboardAnalytics = async (userId) => {
  if (!userId) {
    throw new Error('userId is required for analytics');
  }

  const [totalLiquidity, inboundData, outboundData, logsData, trendsData] = await Promise.all([
    totalnodeliquidity({ userId }),
    inboundStream({ userId }),
    outboundStream({ userId }),
    recentLogs({ userId }),
    SpendingTrends({ userId }),
  ]);

  const totalIncome = inboundData?.inboundStream?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
  const totalExpense = outboundData?.outboundStream?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

  const efficiencyScore = totalIncome + totalExpense > 0 
    ? Math.round((totalIncome / (totalIncome + totalExpense)) * 100) 
    : 0;

  return {
    totalNodeLiquidity: totalLiquidity,
    inboundStream: inboundData?.inboundStream || [],
    outboundStream: outboundData?.outboundStream || [],
    recentLogs: logsData?.recentLogs || [],
    spendingTrends: trendsData,
    efficiencyScore,
    summary: {
      totalIncome,
      totalExpense,
      netFlow: totalIncome - totalExpense,
    },
  };
};

export default getDashboardAnalytics;
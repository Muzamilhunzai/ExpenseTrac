export const getDashboardSummary = async (userId) => {
  const [
    spendingTrends,
    recentLogs,
    outbound,
    inbound,
    liquidity
  ] = await Promise.all([
    getSpendingTrends(userId),
    getRecentLogs(userId),
    getOutboundStream(userId),
    getInboundStream(userId),
    getTotalNodeLiquidity(userId)
  ]);

  return {
    spendingTrends,
    recentLogs,
    outbound,
    inbound,
    liquidity
  };
};
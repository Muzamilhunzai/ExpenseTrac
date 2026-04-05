
import getAvgDailySpending from './AvgDailySpendingService.js';
import getExpensesByCategory from './ExpensesByCategoryService.js';
import getHighestCategory from './HighestCategoryService.js';
import getTopExpenditures from './TopExpendituresService.js';
import getMonthlySpendChartData from './MonthlySpendChartDataService.js';

export const getDashboardAnalytics = async (userId) => {
  if (!userId) {
    throw new Error('userId is required for analytics');
  }

  // Run all services in parallel for best performance
  const [
    avgDailySpending,
    expensesByCategory,
    highestCategory,
    topExpenditures,
    monthlySpendData
  ] = await Promise.all([
    getAvgDailySpending({ userId }),
    getExpensesByCategory({ userId }),
    getHighestCategory({ userId }),
    getTopExpenditures({ userId }),
    getMonthlySpendChartData({ userId }),
  ]);

  return {
    avgDailySpending,
    expensesByCategory,
    highestCategory,
    topExpenditures,
    monthlySpendData,
  };
};

export default getDashboardAnalytics;